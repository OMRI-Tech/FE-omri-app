import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { Notify } from 'quasar'
import routes from './routes'
import { auth } from "boot/firebase";
import Store from 'src/store'
import * as API from 'src/store/Api'

export let router = null

const hasExplicitIsoOffset = value => typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i.test(value) &&
  Number.isFinite(Date.parse(value))

const editionProfileDetails = profile => {
  const possiblePackage = profile && profile.posible_paquete && typeof profile.posible_paquete === 'object'
    ? profile.posible_paquete
    : null
  const packageName = possiblePackage && possiblePackage.paquete
    ? possiblePackage.paquete.nombre_paquete
    : ''
  const isCurrentPackage = String(packageName || '').trim().toLocaleUpperCase() === 'XX OMRI'
  const enrolled = Boolean(
    (profile && (profile.omri_enrolled === true || Number(profile.omri_enrolled) === 1)) ||
    isCurrentPackage
  )
  const editionName = profile && profile.omri_edition ? profile.omri_edition : (isCurrentPackage ? packageName : '')
  const courseId = Number(profile && profile.course_id) ||
    (isCurrentPackage ? Number(possiblePackage && possiblePackage.paquete_id) : 0)
  const isEditionProfile = Boolean(enrolled || (editionName && String(editionName).trim()))
  return { editionName, courseId, enrolled, isEditionProfile }
}

const verifyTrainingAccess = profile => new Promise(resolve => {
  const profileDetails = editionProfileDetails(profile)
  if (!profileDetails.isEditionProfile) {
    resolve({ allowed: true, isOmriEdition: false })
    return
  }

  API.Request.Get(
    null,
    API.Model('Auth').getCurrentEdition,
    {},
    currentEdition => {
      const validMetadata = currentEdition && Number(currentEdition.course_id) > 0 &&
        typeof currentEdition.edition === 'string' && currentEdition.edition.trim() &&
        typeof currentEdition.timezone === 'string' && currentEdition.timezone.trim() &&
        hasExplicitIsoOffset(currentEdition.training_starts_at)
      if (!validMetadata) {
        resolve({ allowed: false, reason: 'unavailable' })
        return
      }

      const editionMatches = !profileDetails.editionName ||
        String(profileDetails.editionName).trim().toLocaleUpperCase() === currentEdition.edition.trim().toLocaleUpperCase()
      const courseMatches = profileDetails.courseId === Number(currentEdition.course_id)
      if (!profileDetails.enrolled || !editionMatches || !courseMatches) {
        resolve({ allowed: false, reason: 'not_enrolled' })
        return
      }

      resolve({
        allowed: Date.now() >= Date.parse(currentEdition.training_starts_at),
        reason: 'not_started',
        isOmriEdition: currentEdition.edition.trim().toLocaleUpperCase() === 'XX OMRI'
      })
    },
    () => resolve({ allowed: false, reason: 'unavailable' })
  )
})

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER ? createMemoryHistory : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  router = Router

  Router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      if (!Store().getters['auth/isLogged']) {
        return next({ name: 'Login' })
      }
      if (to.matched.some(record => record.meta.training)) {
        const access = await verifyTrainingAccess(Store().getters['auth/user'])
        if (!access.allowed) {
          Notify.create({
            message: access.reason === 'not_started'
              ? 'El entrenamiento todavía no inicia.'
              : access.reason === 'not_enrolled'
                ? 'No pudimos verificar tu inscripción en la edición actual.'
                : 'No pudimos verificar la fecha de inicio de la edición.',
            caption: 'Consulta el estado de tu inscripción para continuar.',
            color: 'warning',
            position: 'top'
          })
          return next({ name: 'Register' })
        }
        if (access.isOmriEdition && to.matched.some(record => record.meta.legacyContent)) {
          Notify.create({
            message: 'El contenido de la XX OMRI todavía no está disponible.',
            caption: 'Por ahora puedes consultar el estado de tu inscripción desde el menú.',
            color: 'info',
            position: 'top'
          })
          return next({ name: 'Home' })
        }
      }
      return next()
    } else {
      if (to.matched.some(record => record.meta.type === 'auth')) {
        const allowAuthenticated = to.matched.some(record => record.meta.allowAuthenticated)
        return !Store().getters['auth/isLogged'] || allowAuthenticated ? next() : next({ name: 'Home' })
      } else {
        if (to.fullPath === '/') return next({ name: 'Home' })
        return next()
      }
    }
  })

  return Router
})

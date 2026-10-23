<template>
  <q-layout class="fullscreen registro">
    <countdown-timer
      v-if="edition && edition.enrollment_open"
      :targetDateTime="edition.enrollment_closes_at"
      :countdownMessage="'Tiempo restante para el cierre de inscripciones:'"
    />
    <div class="items-center back">
      <picture>
        <source :srcset="images.cloudUpw" type="image/webp" />
        <img :src="images.cloudUp" class="cloud-up animate__animated animate__fadeInUp animate__slower" />
      </picture>
      <picture>
        <source :srcset="images.cloudDownw" type="image/webp" />
        <img :src="images.cloudDown" class="cloud-down animate__animated animate__fadeInDown animate__slower" />
      </picture>
      <div class="">
        <div class="hamburguesa">
          <q-btn
            round
            icon="menu"
            @click="muestraMenu"
            color="purple"
            size="md"
          />
        </div>
        <div class="text-center">
          <picture>
            <source :srcset="images.omriw" type="image/webp" />
            <img :src="images.omri" alt="logo omri" class="logo col-md-auto animate__animated animate__tada animate__delay-4s" />
          </picture>
        </div>
      </div>
      <div class="bottom-img-section flex items-end">
        <p class="title-account login col q-mt-lg">
          Al registrarte, estás aceptando <br/>
          <a href="https://www.omri.org.mx/aviso-de-privacidad" target="_blank">la política de privacidad</a>*
        </p>
      </div>
      <div class="fixed-center card">
        <div rounded flat class="text-center">
          <div class="q-ma-xs">
            <p v-if="step === 1 && edition" class="title-account q-mb-none q-mt-md animate__delay-1s animate__animated animate__rubberBand">
              Registro para la
              {{ versionCelular ? edition.edition : edition.course_name }}
            </p>
            <q-banner v-if="editionLoading" rounded class="bg-grey-3 q-ma-md">
              Cargando la convocatoria...
            </q-banner>
            <q-banner v-else-if="editionError" rounded class="bg-red text-white q-ma-md">
              {{ editionError }}
              <q-btn flat color="white" label="Reintentar" @click="loadEdition" />
            </q-banner>
            <q-banner v-if="edition && !edition.enrollment_open" rounded class="bg-orange text-white q-ma-md">
              La admisión para {{ edition.edition }} cerró el {{ formatDateTime(edition.enrollment_closes_at) }}.
              Solo las cuentas ya inscritas en esta edición pueden continuar para consultar su inscripción.
            </q-banner>
            <q-stepper
              v-if="edition"
              v-model="step"
              vertical
              ref="stepper"
              color="primary"
              class="no-shadow"
              animated
            >
              <q-step
                :name="1"
                title="Paso 1: Accede con tu correo"
                icon="settings"
                :done="step > 1"
              >
                <q-banner rounded class="bg-grey-3 hidden">
                  <template v-slot:avatar>
                    <img
                      src="https://cdn.quasar.dev/img/mountains.jpg"
                      style="width: 100px; height: 64px"
                    >
                  </template>

                  Si has participado en anteriores OMRI, escribe el correo con el que te registraste
                </q-banner>
                <p class="title-account or">- INICIA SESIÓN O CREA TU CUENTA -</p>
                <q-form class="form-register" align="center" @submit.prevent="registroEmail">
                  <q-badge color="green" label="Cada participante debe usar su propio correo y contraseña"></q-badge>
                  <p v-if="edition.enrollment_open" class="text-caption q-mb-none">
                    Si es tu primera vez, la cuenta se creará mientras la admisión esté abierta.
                  </p>
                  <p v-else class="text-caption q-mb-none">
                    La admisión cerró. Inicia sesión con la cuenta que ya inscribiste en esta edición.
                  </p>
                  <q-input
                    dense v-model="user.email"
                    class="q-my-sm text-button"
                    label="Correo electrónico*" color="teal"
                    autocomplete="email"
                    type="email"
                    :rules="[val => val && val.trim() !== '' || 'Campo no válido']"
                  />
                  <q-input
                    dense v-model="user.password"
                    class="q-my-sm text-button"
                    :type="isPwd ? 'password' : 'text'"
                    label="Contraseña*" color="teal"
                    autocomplete="current-password"
                    :rules="[val => val && val.trim() !== '' || 'Campo no válido']"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <p class="text-caption q-mb-none">
                    Si no recuerdas tu contraseña, usa el acceso por WhatsApp desde Iniciar sesión.
                  </p>
                  <q-btn
                    rounded
                    class="q-ma-md full-width button-submit text-button animate__animated animate__pulse animate__infinite"
                    type="submit"
                    label="Continuar"
                    :disabled = verification
                  />
                  <q-btn
                    flat
                    type="button"
                    :to="{ name: 'Login' }"
                    color="blue"
                    no-caps
                    label="Ir a Iniciar sesión / acceso por WhatsApp"
                  />
                </q-form>
              </q-step>
              <q-step
                :name="2"
                title="Paso 2: Datos escolares"
                icon="school"
                :done="step > 2"
              >
                <p class="title-account or">Escribe los siguientes datos</p>
                <q-form class="form-register" align="center" @submit.prevent="actualizacionDatos">
                  <q-input
                  dense v-model="user.name"
                  class="q-mb-sm text-button"
                  label="Nombre(s)*" color="teal"
                  :rules="[val => val.trim() !== '' || 'Campo no válido']"/>
                  <q-input dense v-model="user.lname"
                    class="q-my-sm text-button"
                    label="Apellido Paterno*" color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                  />
                  <q-input dense v-model="user.mlname" class="q-my-sm text-button" label="Apellido Materno (opcional)" color="teal" />
                  <div class="row">
                    <q-input
                      dense v-model="user.birthdate"
                      class="q-my-sm text-button col"
                      hint="Fecha de nacimiento*"
                      color="teal" type="date"
                      :rules="[val => val && val.trim() !== '' || 'Campo no válido']"
                    />
                    <q-input
                      dense v-model.number="user.telNum"
                      class="q-my-sm text-button col"
                      type="tel" mask="(###) ###-####"
                      unmasked-value
                      label="Teléfono*" color="teal"
                      :rules="[val => String(val).length >= 10 || 'Campo no válido']"
                    />
                  </div>
                  <q-input
                    dense v-model="user.email"
                    class="q-my-sm text-button hidden"
                    label="Correo electrónico*"
                    color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                    readonly
                  />
                  <q-select
                    dense
                    v-model="user.grado"
                    :options="opcionesGrado"
                    hint="Grado escolar"
                    label="Selecciona tu grado escolar"
                    :rules="[val => val || 'Campo Obligatorio']"
                  >
                  </q-select>
                  <div v-if="!muestraNuevaEscuela">
                    <q-select
                      dense
                      v-model="user.escuela"
                      :options="optionsEscuela"
                      @filter="filterEscuela"
                      @virtual-scroll="debouncedScroll"
                      use-input
                      label="Busca y selecciona tu escuela"
                      hint="Escribe letras para buscar tu escuela"
                      :loading="loading"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-italic text-grey">
                            <p class="q-mb-none q-mt-none">No conocemos tu escuela :c</p>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <q-btn @click="nuevaEscuela()" color="blue" no-caps flat dense type="button" label="No encuentro mi escuela :c"/>
                  </div>
                  <div v-else>
                    <q-input dense v-model="nuevaEscuelaModel" placeholder="Escribe el nombre de tu escuela" hint="Nombre *"/>
                    <q-btn @click="nuevaEscuela()" color="blue" no-caps flat dense type="button" label="Buscar escuela"/>
                  </div>
                  <q-btn
                    rounded
                    class="q-mx-md full-width button-submit text-button"
                    type="submit"
                    label="Guardar y continuar"
                    :disabled = verificationFull
                  />
                  <q-btn
                    rounded
                    class="q-mx-md full-width button-submit text-button bg-red"
                    type="button"
                    label="Cerrar y llenar más tarde"
                    @click="reiniciar"
                  />
                </q-form>
              </q-step>
              <q-step
                :name="3"
                title="Paso 3: Inscripción y pago"
                icon="savings"
                :done="step > 3"
              >
                <q-banner class="bg-green text-white" v-if="!inscripcionPagada">
                  <h5 class="q-my-sm">{{ paymentWindowOpen ? 'Opciones de pago disponibles' : 'Plazo de pago cerrado' }}</h5>
                  <p>La cuota de inscripción es de <strong><mark>{{ formatFee(edition.fee_mxn) }}</mark></strong>.</p>
                  <p>Puedes entrenar desde {{ formatDateTime(edition.training_starts_at) }} aunque el pago siga pendiente. Paga hasta {{ formatDateTime(edition.payment_closes_at) }}.</p>
                  <div v-if="paymentWindowOpen">
                    <p v-if="paymentLinkError" class="text-negative">{{ paymentLinkError }}</p>
                    <!-- Opción de pago en OXXO -->
                    <div>
                      <h6 class="q-my-sm">Pago en OXXO</h6>
                      <p>Haz clic en el botón de abajo para obtener una referencia de pago. Puedes pagar en cualquier sucursal de OXXO.</p>
                      <q-btn
                        v-if="link"
                        :ripple="{ color: 'yellow' }"
                        style="background: #ed358a"
                        label="Pagar en OXXO"
                        size="xl"
                        :href="link"
                        target="_blank"
                        class="animate__animated animate__pulse animate__infinite animate__slower"
                        no-caps
                      />
                      <br/>
                      <!-- Recupera o reenvía el enlace vigente del cargo -->
                      <q-btn
                        class="bg-blue q-mt-md"
                        v-if="cargoId && !inscripcionPagada"
                        rounded
                        type="button"
                        @click="recuperaLink"
                        :loading="linkLoading"
                        :label="link ? 'Reenviar enlace' : 'Recuperar enlace'"
                      ></q-btn>
                      <p class="q-pt-sm">Si no recibiste el enlace, puedes recuperarlo o reenviarlo aquí.</p>
                    </div>
                    <!-- Opción de pago por transferencia bancaria -->
                     <hr/>
                    <div>
                      <h6 class="q-my-sm">Pago por transferencia bancaria</h6>
                      <p>Realiza una transferencia por <strong><mark>{{ formatFee(edition.fee_mxn) }}</mark></strong> a la siguiente cuenta CLABE BBVA:</p>
                      <a style="font-size: 25px; color: white !important" href="tel:012540001162431420">012 540 00116243142 0</a>
                      <p>A nombre de: Olimpiada Morelense de Informática AC</p>
                      <p>Coloca en el concepto tu número de folio: <strong>{{ user.id }}</strong></p>
                      <p>Después de realizar la transferencia, envía el comprobante a <a href="mailto:info@omri.org.mx">info@omri.org.mx</a></p>
                    </div>
                  </div>
                  <p v-else class="text-negative">
                    El plazo de pago terminó el {{ formatDateTime(edition.payment_closes_at) }}. La inscripción pendiente no requiere otro paso y ya no se pueden generar links de pago.
                  </p>
                </q-banner>
                <q-banner class="bg-green text-white" v-else>
                  <h4>Pago confirmado</h4>
                </q-banner>
                <q-btn
                  rounded
                  class="q-ma-sm full-width button-submit text-button bg-red"
                  type="button"
                  label="Cerrar"
                  @click="reiniciar"
                />
              </q-step>

            </q-stepper>
            <p class="q-mb-sm" v-if="edition && step !== 2">
              Las inscripciones cierran el {{ formatDateTime(edition.enrollment_closes_at) }}.
              El entrenamiento inicia el {{ formatDateTime(edition.training_starts_at) }}.
              El pago vence el {{ formatDateTime(edition.payment_closes_at) }}.
            </p>
            <p class="q-mb-sm" v-if="step !== 2">
              Para conocer más sobre el concurso, visita <a href="https://www.omri.org.mx/#concurso">nuestro sitio web omri.org.mx</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <drawer-menu
      :model-value="menuLateral"
      @update:modelValue="menuLateral = $event"
    ></drawer-menu>
  </q-layout>
</template>

<script>
import { ref, defineComponent, reactive, computed, onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Loading, QSpinnerBall, Notify, useQuasar } from 'quasar'
import axios from 'axios'
import * as API from 'src/store/Api'
import { trackMetaCompleteRegistration, trackMetaViewContent } from 'boot/meta-tracking'
import CountdownTimer from "components/CountdownTimer.vue"
import DrawerMenu from "components/DrawerMenu.vue"
import 'animate.css'
// Importando imagenes
import cloudUp from "assets/img/cloud-up.png";
import cloudDown from "assets/img/cloud-down.png";
import cloudUpw from "assets/img/webp/cloud-up.png.webp";
import cloudDownw from "assets/img/webp/cloud-down.png.webp";
import omri from "assets/logos/omri.png";
import omriw from "assets/logos/webp/omri.png.webp";

export default defineComponent({
  components: {
    DrawerMenu,
    CountdownTimer
  },
  setup () {
    const $q = useQuasar()
    const images = {
      logoFacebook: require('assets/logos/facebook.png'),
      logoGoogle: require('assets/logos/google.png'),
      cloudUp,
      cloudDown,
      cloudUpw,
      cloudDownw,
      omri,
      omriw,
    }
    const user = ref({
      name: '',
      email: '',
      password: '',
      lname: '',
      mlname: '',
      telNum: '',
      birthdate: '',
      facebook: false,
      firebase: '',
      id: null,
      grado: null,
      escuela: null
    })
    // Opciones para grado escolar
    const opcionesGrado = [
      {value: 1, label: "1ro Primaria"},
      {value: 2, label: "2do Primaria"},
      {value: 3, label: "3ro Primaria"},
      {value: 4, label: "4to Primaria"},
      {value: 5, label: "5to Primaria"},
      {value: 6, label: "6to Primaria"},
      {value: 7, label: "1ro Secundaria"},
      {value: 8, label: "2do Secundaria"},
      {value: 9, label: "3ro Secundaria"},
      {value: 10, label: "1ro Preparatoria"},
      {value: 11, label: "2do Preparatoria"},
      {value: 12, label: "3ro Preparatoria"}
    ];
    const isPwd = ref(true)
    //const useFacebook = ref(false)
    const inscripcionPagada = ref(false)
    const edition = ref(null)
    const editionLoading = ref(true)
    const editionError = ref('')
    const omriEnrolled = ref(false)
    const omriEnrolledCourseId = ref(null)
    const paymentLinkError = ref('')
    const linkLoading = ref(false)
    const cargoId = ref(null)
    const nuevaEscuelaModel = ref('')
    const currentPage = ref(0)
    const currentFilter = ref('')
    const hasMore = ref(true)
    const loading = ref(false)
    // Controla visibilidad de agregar nueva escuela
    const muestraNuevaEscuela = ref(false)
    // Model de opciones de nueva escuela
    const optionsEscuela = ref([])
    // Manejador de mostrador de nueva escuela
    const nuevaEscuela = () => {
      user.value.escuela = null
      nuevaEscuelaModel.value = ''
      muestraNuevaEscuela.value = !muestraNuevaEscuela.value
    }
    const loadData = (q) => {
      if (hasMore.value === true) {
        loading.value = true
        API.Request.Select2(
          API.Model('Auth').selectEscuela,
          q,
          (opcionesReales, more) => {
            optionsEscuela.value = [...optionsEscuela.value, ...opcionesReales]
            hasMore.value = more
            loading.value = false
          },
          (e) => {
            console.error(e)
            API.Utils.Notifica('Ocurrió un error al buscar', 'Intenta más tarde', false, 'top');
            loading.value = false
          },
          'text',
          { page: currentPage.value }
        )
      }
    }
    // Filtro para select2 de escuela
    const filterEscuela = (val, update) => {
      if (val !== currentFilter.value) {
        currentFilter.value = val
        optionsEscuela.value = []
        currentPage.value = 0
        hasMore.value = true
        loadData(currentFilter.value)
      }
      update(() => {
        return optionsEscuela.value
      })
    }
    const onScrollSelect = ({ to }) => {
      if (optionsEscuela.value.length == 0) {
        currentPage.value = 0
      }
      if (loading.value !== true && hasMore.value && to === optionsEscuela.value.length - 1) {
        if (currentFilter.value.length < 2 && currentPage.value >= 3){
          return
        }
        currentPage.value++
        loadData(currentFilter.value)
      }
    }
    function debounce(fn, delay) {
      let timeoutID = null
      return function (...args) {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => fn(...args), delay)
      }
    }
    const debouncedScroll = debounce(onScrollSelect, 300);  // 300 ms de retraso

    const step = ref(1)
    const link = ref("")
    const now = ref(Date.now())
    let paymentWindowInterval = null
    const menuLateral = ref(false)
    const store = useStore()
    const route = useRoute()
    const verification = computed(() => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailRegex.test(user.value.email.trim()) || !user.value.password.trim();
    });
    const verificationFull = computed(() => {
      var Valid = (user.value.name !== '')
      Valid = (Valid & user.value.lname.trim() !== '')
      Valid = (Valid & (user.value.email.includes('@') & user.value.email.includes('.')))
      Valid = (Valid & (String(user.value.birthdate).length > 6))
      Valid = (Valid & (String(user.value.telNum).length >= 10))
      Valid = (Valid & (user.value.grado !== null))
      return Valid == 0
    })
    const versionCelular = computed(() => {
      return $q.screen.lt.sm
    })
    const trackCompleteRegistrationEvent = subscriptionId => {
      const courseId = edition.value && edition.value.course_id
      const userId = user.value && user.value.id
      const eventKey = `omri_complete_registration_${courseId}_${userId}`
      if (typeof window !== 'undefined') {
        try {
          if (window.sessionStorage.getItem(eventKey)) return
          window.sessionStorage.setItem(eventKey, '1')
        } catch (error) {
          // Tracking should not block registration when browser storage is unavailable.
        }
      }
      void trackMetaCompleteRegistration({
        user: user.value,
        subscriptionId
      })
    }
    const paymentWindowOpen = computed(() => {
      const closesAt = edition.value && Date.parse(edition.value.payment_closes_at)
      return Number.isFinite(closesAt) && now.value < closesAt + 1000
    })
    const formatDateTime = value => {
      if (!value) return ''
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return value
      return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: edition.value && edition.value.timezone ? edition.value.timezone : 'America/Mexico_City'
      }).format(date)
    }
    const formatFee = value => {
      const amount = Number(value)
      if (!Number.isFinite(amount)) return ''
      return `$${new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(amount)} MXN`
    }
    const apiErrorMessage = (error, fallback) => {
      const responseData = error && error.response && error.response.data
      const responseMessage = responseData && (responseData.message || responseData.msg)
      return responseMessage || fallback
    }
    const responseMessage = (response, fallback) => {
      return response && (response.msg || response.message) ? (response.msg || response.message) : fallback
    }
    const notifyError = (message, caption) => {
      Notify.create({
        message,
        caption,
        avatar: require('assets/img/entrenator.png'),
        color: 'negative'
      })
    }
    const setApiAuthorization = accessToken => {
      if (typeof accessToken !== 'string' || !accessToken.trim()) return false
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken.trim()}`
      return true
    }
    const credentialsHelpMessage = 'No pudimos validar el correo y la contraseña. Revisa tus datos o usa el acceso por WhatsApp desde Iniciar sesión.'
    const isCredentialFailure = result => {
      const status = Number(result && (result.response && result.response.status ? result.response.status : result.status))
      if (status === 401) return true
      const details = result && result.response && result.response.data ? result.response.data : result
      return Number(details && details.status) === 0 && details.verificacion === false &&
        String(details.title || '').trim().toLocaleLowerCase() === 'contraseña no verificada'
    }
    const isDuplicateAccountFailure = result => {
      const status = Number(result && (result.status || (result.response && result.response.status)))
      const details = result && result.response && result.response.data ? result.response.data : result
      const code = [details && details.error, details && details.code, details && details.title,
        details && details.msg, details && details.message, JSON.stringify(details && details.errors || {})]
        .filter(Boolean).join(' ').toLowerCase()
      return status === 409 || /(duplicate|duplicad|already.{0,24}(registered|taken|exists)|email.{0,24}(registered|taken|exists)|correo.{0,24}(registrad|existe)|already been taken)/.test(code)
    }
    const profileValue = (profile, ...keys) => {
      for (const key of keys) {
        const value = profile && profile[key]
        if (value !== null && value !== undefined && value !== '') return value
      }
      return ''
    }
    const setAuthenticatedProfile = (response, currentEdition) => {
      const profile = response && response.data && typeof response.data === 'object'
        ? (response.data.user || response.data)
        : null
      if (!profile || !profile.id || typeof response.access_token !== 'string' || !response.access_token.trim()) return false

      const responseCourseId = profileValue(response, 'course_id')
      const courseId = responseCourseId !== '' ? responseCourseId : profileValue(profile, 'course_id')
      const responseEnrollment = profileValue(response, 'omri_enrolled')
      const enrolled = responseEnrollment !== '' ? responseEnrollment : profileValue(profile, 'omri_enrolled')
      omriEnrolled.value = enrolled === true || Number(enrolled) === 1
      omriEnrolledCourseId.value = Number(courseId) || null

      if (!currentEdition.enrollment_open &&
        (!omriEnrolled.value || Number(omriEnrolledCourseId.value) !== Number(currentEdition.course_id))) {
        user.value.password = ''
        notifyError('No pudimos continuar con la inscripción', `La admisión para ${currentEdition.edition} está cerrada y esta cuenta no tiene una inscripción activa en esta edición.`)
        return true
      }
      if (!setApiAuthorization(response.access_token)) return false

      user.value.id = profile.id
      user.value.name = profileValue(profile, 'name', 'nombre')
      user.value.email = profileValue(profile, 'email') || user.value.email.trim()
      user.value.lname = profileValue(profile, 'lastname', 'last_name', 'apellidopat')
      user.value.mlname = profileValue(profile, 'mother_lastname', 'mother_last_name', 'apellidomat')
      user.value.telNum = profileValue(profile, 'telefono', 'telNum', 'phone')
      user.value.birthdate = profileValue(profile, 'fecha_nacimiento', 'birth', 'birthdate') || null
      user.value.firebase = profileValue(profile, 'firebase')
      user.value.facebook = Boolean(profileValue(profile, 'facebook'))
      const grade = profileValue(profile, 'id_grado', 'grado')
      const gradeValue = typeof grade === 'object' ? (grade.value || grade.id) : Number(grade)
      user.value.grado = opcionesGrado.find(option => Number(option.value) === Number(gradeValue)) || null
      user.value.escuela = null
      optionsEscuela.value = []
      const school = profileValue(profile, 'escuela')
      const schoolId = profileValue(profile, 'id_escuela') || (school && typeof school === 'object' && (school.id || school.value))
      const schoolName = school && typeof school === 'object'
        ? (school.nombre || school.label || profileValue(profile, 'nombre_escuela'))
        : profileValue(profile, 'nombre_escuela', 'escuela_nombre')
      if (schoolId) {
        user.value.escuela = { label: schoolName || 'Escuela', value: schoolId }
        optionsEscuela.value = [user.value.escuela]
      }
      user.value.password = ''
      cargoId.value = null
      link.value = ''
      inscripcionPagada.value = false
      step.value = 2
      void trackMetaViewContent({ user: user.value })
      return true
    }
    const loadEdition = () => new Promise(resolve => {
      editionLoading.value = true
      editionError.value = ''
      API.Request.Get(
        null,
        API.Model('Auth').getCurrentEdition,
        {},
        response => {
          const valid = response && Number(response.course_id) > 0 && Number(response.fee_mxn) > 0 &&
            typeof response.edition === 'string' && response.edition.trim() &&
            typeof response.course_name === 'string' && response.course_name.trim() && response.payment_closes_at && response.training_starts_at &&
            response.enrollment_closes_at && response.timezone && typeof response.enrollment_open === 'boolean'
          if (!valid) {
            edition.value = null
            editionError.value = 'No pudimos cargar una convocatoria válida. Intenta más tarde.'
          } else {
            edition.value = response
          }
          editionLoading.value = false
          resolve(valid ? response : null)
        },
        error => {
          edition.value = null
          const data = error && error.response && error.response.data
          editionError.value = data && ['edition_not_configured', 'omri_edition_unavailable'].includes(data.error)
            ? (data.message || 'La convocatoria todavía no está configurada.')
            : apiErrorMessage(error, 'No pudimos cargar la convocatoria. Intenta más tarde.')
          editionLoading.value = false
          resolve(null)
        }
      )
    })
    const requestPaymentLink = () => {
      if (!cargoId.value) {
        paymentLinkError.value = 'No encontramos un cargo pendiente de esta edición.'
        return
      }
      if (!paymentWindowOpen.value) {
        paymentLinkError.value = `El plazo de pago terminó el ${formatDateTime(edition.value.payment_closes_at)}.`
        link.value = ''
        return
      }
      paymentLinkError.value = ''
      linkLoading.value = true
      API.Request.Get(
        'Recuperando enlace de pago...',
        API.Model('Auth').payLink,
        { cargo_id: cargoId.value },
        response => {
          const paymentUrl = Number(response && response.status) === 1 && response.data
          if (typeof paymentUrl !== 'string' || !paymentUrl.trim()) {
            link.value = ''
            paymentLinkError.value = 'Tu inscripción está guardada, pero no pudimos obtener el link de pago. Intenta de nuevo.'
          } else {
            link.value = paymentUrl.trim()
            Notify.create({
              message: 'Enlace de pago disponible',
              caption: 'Recuperamos el enlace vigente de tu cargo. El pago sigue pendiente.',
              avatar: require('assets/img/entrenator.png'),
              color: 'positive'
            })
          }
          linkLoading.value = false
        },
        error => {
          link.value = ''
          paymentLinkError.value = apiErrorMessage(
            error,
            'Tu inscripción está guardada, pero no pudimos obtener el link de pago. Intenta de nuevo.'
          )
          linkLoading.value = false
        }
      )
    }
    const actualizacionDatos = async () => {
      if (!edition.value || !user.value.id) {
        notifyError('No pudimos continuar con la inscripción', 'Vuelve a verificar tu correo electrónico.')
        return
      }
      const currentEdition = await loadEdition()
      if (!currentEdition) return
      if (!currentEdition.enrollment_open &&
        (!omriEnrolled.value || Number(omriEnrolledCourseId.value) !== Number(currentEdition.course_id))) {
        notifyError('La admisión está cerrada', `Solo pueden continuar quienes ya estaban inscritos en ${currentEdition.edition} antes del ${formatDateTime(currentEdition.enrollment_closes_at)}.`)
        return
      }
      Loading.show({ message: 'Guardando tus datos...', spinner: QSpinnerBall })
      const formData = new FormData()
      formData.append('name', user.value.name)
      formData.append('lastname', user.value.lname)
      formData.append('mother_lastname', user.value.mlname)
      formData.append('fecha_nacimiento', user.value.birthdate)
      formData.append('telefono', user.value.telNum)
      formData.append('email', user.value.email)
      formData.append('id_status', 1)
      formData.append('id_nivel', 1)
      if (user.value.grado !== null) {
        formData.append('id_grado', user.value.grado.value)
      }
      if (user.value.escuela && typeof user.value.escuela === 'object') {
        formData.append('id_escuela', user.value.escuela.value)
      } else if (nuevaEscuelaModel.value.trim()) {
        formData.append('escuela', nuevaEscuelaModel.value.trim())
      }
      formData.append('paquete_id', currentEdition.course_id)
      formData.append('activar', 1)
      formData.append('firebase', user.value.firebase)
      if (route.params.origen && route.params.origen.length) {
        formData.append('matricula', route.params.origen)
      }
      API.Request.Post(
        'Actualizando olímpico...',
        API.Model('Auth').updateUser + user.value.id,
        formData,
        response => {
          if (Number(response && response.status) !== 1) {
            Loading.hide()
            notifyError('No pudimos guardar tus datos', responseMessage(response, 'Intenta más tarde.'))
            return
          }
          API.Request.Post(
            'Registrando inscripción...',
            API.Model('Auth').createOmriEnrollment,
            {
              user_id: user.value.id,
              course_id: currentEdition.course_id
            },
            enrollmentResponse => {
              Loading.hide()
              const enrollment = enrollmentResponse && enrollmentResponse.data
              if (Number(enrollmentResponse && enrollmentResponse.status) !== 1 || !enrollment) {
                notifyError('No pudimos confirmar tu inscripción', responseMessage(enrollmentResponse, 'Intenta más tarde.'))
                return
              }
              const paymentClosesAt = Date.parse(enrollment.payment_closes_at)
              if (Number(enrollment.course_id) !== Number(currentEdition.course_id) ||
                String(enrollment.course_name || '').trim() !== String(currentEdition.course_name).trim() ||
                Number(enrollment.fee_mxn) !== Number(currentEdition.fee_mxn) ||
                paymentClosesAt !== Date.parse(currentEdition.payment_closes_at) || !enrollment.cargo_id) {
                notifyError('No pudimos confirmar tu inscripción', 'El cargo devuelto no coincide con la convocatoria actual. Contacta a info@omri.org.mx.')
                return
              }
              cargoId.value = enrollment.cargo_id
              inscripcionPagada.value = enrollment.pagado === true || Number(enrollment.pagado) === 1
              paymentLinkError.value = ''
              link.value = typeof enrollment.payment_url === 'string' ? enrollment.payment_url : ''
              step.value = 3
              trackCompleteRegistrationEvent(enrollment.cargo_id)
              if (inscripcionPagada.value) {
                link.value = ''
                Notify.create({
                  message: 'Inscripción confirmada',
                  caption: 'El pago de esta edición ya está confirmado.',
                  avatar: require('assets/img/entrenator.png'),
                  color: 'positive'
                })
              } else {
                if (link.value) {
                  Notify.create({
                    message: 'Tu inscripción quedó guardada',
                    caption: 'El pago está pendiente; puedes comenzar el entrenamiento en la fecha indicada.',
                    avatar: require('assets/img/entrenator.png'),
                    color: 'positive'
                  })
                } else {
                  requestPaymentLink()
                }
              }
            },
            error => {
              Loading.hide()
              notifyError('No pudimos confirmar tu inscripción', apiErrorMessage(error, 'Intenta más tarde.'))
            }
          )
        },
        error => {
          Loading.hide()
          notifyError('No pudimos guardar tus datos', apiErrorMessage(error, 'Intenta más tarde.'))
        }
      )
    }
    const reiniciar = () => {
      step.value = 1
      user.value.name = ''
      user.value.email = ''
      user.value.password = ''
      user.value.lname = ''
      user.value.mlname = ''
      user.value.telNum = ''
      user.value.birthdate = ''
      user.value.facebook = false
      user.value.firebase = ''
      user.value.id = null
      user.value.grado = null
      user.value.escuela = null
      omriEnrolled.value = false
      omriEnrolledCourseId.value = null
      inscripcionPagada.value = false
      muestraNuevaEscuela.value = false
      currentPage.value = 0
      currentFilter.value = ''
      nuevaEscuelaModel.value = ''
      hasMore.value = true
      loading.value = false
      muestraNuevaEscuela.value = false
      optionsEscuela.value = []
      link.value = ''
      cargoId.value = null
      linkLoading.value = false
      paymentLinkError.value = ''
    }
    const registroEmail = async () => {
      const currentEdition = await loadEdition()
      if (!currentEdition) return
      const credentials = new FormData()
      credentials.append('email', user.value.email.trim())
      credentials.append('password', user.value.password)
      API.Request.Post(
        'Validando cuenta...',
        API.Model('Auth').login,
        credentials,
        response => {
          if (Number(response && response.status) === 1) {
            if (!setAuthenticatedProfile(response, currentEdition)) {
              notifyError('No pudimos iniciar sesión', 'El servidor no devolvió la cuenta o el token de acceso necesarios. Intenta más tarde.')
            }
            return
          }
          if (!isCredentialFailure(response)) {
            notifyError('No pudimos validar tu cuenta', responseMessage(response, 'Intenta más tarde.'))
            return
          }
          if (!currentEdition.enrollment_open) {
            notifyError('No pudimos validar tu cuenta', credentialsHelpMessage)
            return
          }
          createAccount()
        },
        error => {
          if (!isCredentialFailure(error)) {
            notifyError('No pudimos validar tu cuenta', apiErrorMessage(error, 'Intenta más tarde.'))
            return
          }
          if (!currentEdition.enrollment_open) {
            notifyError('No pudimos validar tu cuenta', credentialsHelpMessage)
            return
          }
          createAccount()
        }
      )
    }
    const createAccount = async () => {
      const currentEdition = await loadEdition()
      if (!currentEdition) return
      if (!currentEdition.enrollment_open) {
        notifyError('La admisión está cerrada', `Las inscripciones para ${currentEdition.edition} cerraron el ${formatDateTime(currentEdition.enrollment_closes_at)}.`)
        return
      }
      const formData = new FormData()
      formData.append('name', '')
      formData.append('email', user.value.email.trim())
      formData.append('password', user.value.password)
      formData.append('id_status', 1)
      formData.append('id_nivel', 1)
      if (route.params.origen && route.params.origen.length) {
        formData.append('matricula', route.params.origen)
      }
      API.Request.Post(
        'Creando cuenta...',
        API.Model('Auth').addUser,
        formData,
        response => {
          if (Number(response && response.status) !== 1) {
            notifyError('No pudimos validar tu cuenta', credentialsHelpMessage)
            return
          }
          if (!setAuthenticatedProfile(response, currentEdition)) {
            notifyError('No pudimos crear tu cuenta', 'El servidor no devolvió la cuenta o el token de acceso necesarios. Intenta más tarde.')
          }
        },
        error => {
          if (isCredentialFailure(error) || isDuplicateAccountFailure(error)) {
            notifyError('No pudimos validar tu cuenta', credentialsHelpMessage)
            return
          }
          notifyError('No pudimos crear tu cuenta', apiErrorMessage(error, 'Intenta más tarde.'))
        }
      )
    }
    const recuperaLink = () => {
      requestPaymentLink()
    }
    watch(user.value, newVal => {
      const isConTypo = newVal.email.endsWith('.con');
      if (isConTypo && !newVal.email.endsWith('.mx.con')) {
        // Corrige automáticamente el error .con a .com
        user.value.email = newVal.email.replace('.con', '.com');
      }
    });
    onBeforeMount(() => {
      Loading.show({ message: 'Cargando...', spinner: QSpinnerBall })
    });
    onMounted(() => {
      menuLateral.value = false
      loadEdition()
      void trackMetaViewContent({
        user: user.value
      })
      paymentWindowInterval = setInterval(() => {
        now.value = Date.now()
      }, 1000)
      setTimeout(() => {
        Loading.hide()
      }, 500)
    })
    onBeforeUnmount(() => {
      if (paymentWindowInterval) clearInterval(paymentWindowInterval)
    })
    const muestraMenu = () => {
      menuLateral.value = true
    }
    return {
      user,
      images,
      opcionesGrado,
      isPwd,
      verification,
      verificationFull,
      versionCelular,
      edition,
      editionLoading,
      editionError,
      loadEdition,
      formatDateTime,
      formatFee,
      paymentWindowOpen,
      menuLateral,
      nuevaEscuelaModel,
      loading,
      onScrollSelect,
      muestraNuevaEscuela,
      optionsEscuela,
      nuevaEscuela,
      debouncedScroll,
      filterEscuela,
      registroEmail,
      reiniciar,
      actualizacionDatos,
      recuperaLink,
      inscripcionPagada,
      paymentLinkError,
      linkLoading,
      cargoId,
      link,
      step,
      store,
      muestraMenu
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url(src/css/auth.sass)
  @import url(src/css/registro.sass)
</style>

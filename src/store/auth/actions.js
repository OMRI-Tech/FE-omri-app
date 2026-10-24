import { LocalStorage, Notify, Loading, QSpinnerBall } from 'quasar'
import axios from 'axios'
import * as API from 'src/store/Api'
import { auth, db, provider } from "boot/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth'
import { router } from 'src/router';

export function Login ({}, params) {
  const formData = new FormData()
  formData.append('email', params.email)
  formData.append('password', params.password)
  API.Request.Post(
    'Iniciando Sesión...',
    API.Model('Auth').login,
    formData,
    response => {
      let user = {}
      let token = null
      if (response.status === 1) {
        token = response.access_token
        user = profileWithEditionStatus(response.data, response)
        API.Utils.Notifica('¡Sesión Iniciada!', `Bienvenido ${user.name}!`, true, 'top')
      } else {
        API.Utils.Notifica('¡Contraseña Incorrecta!', `La contraseña no coincide, vuelve a intentarlo`, false, 'top')
      }
      if (token !== null) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + token
        LocalStorage.set('user_logged', user)
        LocalStorage.set('api_token', token)
        LocalStorage.set('avatar', user.avatar)
        this.$router.push({ name: 'Home' })
      }
    },
    error => {
      const status = Number(error && (error.response && error.response.status ? error.response.status : error.status))
      const noServerError = status === 422
      console.error(error)
      API.Utils.Notifica('Ocurrió un error 38', !noServerError ? 'Intenta más tarde' : 'No pudimos encontrar tu usuario', false, 'top')
    }
  )
}

export function Logout () {
  LocalStorage.clear()
  API.Utils.Notifica('Sesión cerrada', 'Tu sesión se cerró exitósamente, vuelve pronto', true, 'top')
  this.$router.push({ name: 'Login' })
}

function profileWithEditionStatus (user, response) {
  const profile = user && typeof user === 'object' ? user : {}
  const authenticatedResponse = response && typeof response === 'object' ? response : {}
  const sessionProfile = { ...profile }
  if (authenticatedResponse.omri_enrolled !== undefined) {
    sessionProfile.omri_enrolled = authenticatedResponse.omri_enrolled
  }
  if (authenticatedResponse.course_id !== undefined) {
    sessionProfile.course_id = authenticatedResponse.course_id
  }
  if (authenticatedResponse.edition !== undefined) {
    sessionProfile.omri_edition = authenticatedResponse.edition
  }
  if (authenticatedResponse.course_name !== undefined) {
    sessionProfile.course_name = authenticatedResponse.course_name
  }
  return sessionProfile
}

const notifyFirebaseLoginError = error => {
  const status = Number(error && (error.status || (error.response && error.response.status)))
  Notify.create({
    message: 'No se pudo iniciar sesión',
    caption: status === 422 ? 'Revisa el correo y la contraseña.' : 'Intenta más tarde.',
    avatar: require('assets/img/entrenator.png'),
    color: 'negative'
  })
}

const notifyFirebaseUpdateError = error => {
  const status = Number(error && (error.status || (error.response && error.response.status)))
  Notify.create({
    message: 'No se pudo actualizar la cuenta',
    caption: status === 422 ? 'No pudimos guardar los datos de acceso.' : 'Intenta iniciar sesión de nuevo más tarde.',
    avatar: require('assets/img/entrenator.png'),
    color: 'negative'
  })
}

function realLogin(commit, userDB, user, formData, loginResponse, onError, onSuccess) {
  const token = loginResponse && loginResponse.access_token
  if (typeof token !== 'string' || !token.trim() || !user || !user.id) {
    if (typeof onError === 'function') onError(new Error('El login no devolvió usuario y token.'))
    return false
  }

  const authorization = `Bearer ${token.trim()}`
  const previousAuthorization = axios.defaults.headers.common.Authorization
  axios.defaults.headers.common.Authorization = authorization
  const fail = error => {
    if (axios.defaults.headers.common.Authorization === authorization) {
      if (previousAuthorization === undefined) delete axios.defaults.headers.common.Authorization
      else axios.defaults.headers.common.Authorization = previousAuthorization
    }
    if (typeof onError === 'function') onError(error)
    else notifyFirebaseUpdateError(error)
  }

  API.Request.Post(
    'Actualizando...',
    API.Model('Auth').updateUser + user.id,
    formData,
    response => {
      if (Number(response && response.status) !== 1) {
        fail(response || new Error('No pudimos actualizar la cuenta.'))
        return
      }
      const updatedProfile = response.data && typeof response.data === 'object' ? response.data : {}
      const sessionProfile = profileWithEditionStatus({ ...user, ...updatedProfile }, loginResponse)
      LocalStorage.set('user_logged', sessionProfile)
      LocalStorage.set('api_token', token.trim())
      LocalStorage.set('avatar', sessionProfile.avatar || '')
      commit('SET_USER', userDB || auth.currentUser)
      if (typeof onSuccess === 'function') onSuccess(sessionProfile)
    },
    fail
  )
  return true
}

function authenticateFirebaseProfile(commit, userDB, details, profileFormData, onSuccess) {
  const loginFormData = new FormData()
  loginFormData.append('email', details.email)
  loginFormData.append('password', details.password)
  if (userDB && userDB.uid) loginFormData.append('firebase', userDB.uid)
  API.Request.Post(
    'Iniciando sesión...',
    API.Model('Auth').login,
    loginFormData,
    response => {
      if (Number(response && response.status) !== 1 || typeof response.access_token !== 'string') {
        notifyFirebaseLoginError(response)
        return
      }
      realLogin(
        commit,
        userDB,
        response.data,
        profileFormData,
        response,
        notifyFirebaseUpdateError,
        onSuccess
      )
    },
    notifyFirebaseLoginError
  )
}

export async function loginFirebase ({ commit }, details) {
  const formData = new FormData()
  formData.append('email', details.email)
  formData.append('password', details.password)

  Loading.show({ message: 'Iniciando sesión...', spinner: QSpinnerBall })
  /// Se verifica existencia de usuario en Firebase
  await signInWithEmailAndPassword(
    auth,
    details.email,
    details.password
  ).then((userCredential) => {
    const userDB = userCredential.user;
    formData.append('firebase', userDB.uid)
    /// forzamos acceso a sistema con user y firebase
    API.Request.Post(
      'Accediendo...',
      API.Model('Auth').login,
      formData,
      response => {
        if (Number(response && response.status) === 1) {
          const user = response.data
          /// se actualiza contraseña y firebase
          realLogin(
            commit,
            userDB,
            user,
            formData,
            response,
            notifyFirebaseUpdateError,
            sessionProfile => {
              API.Utils.Notifica('¡Sesión Iniciada!', `Bienvenido ${sessionProfile.name}!`, true, 'top')
              router.push({ name: 'Home' })
            }
          )
        } else {
          API.Utils.Notifica('¡Contraseña Incorrecta!', 'La contraseña no coincide, vuelve a intentarlo', false, 'top')
        }
      },
      error => {
        const status = Number(error && (error.response && error.response.status ? error.response.status : error.status))
        const noServerError = status === 422
        console.error(error)
        API.Utils.Notifica('Ocurrió un error 128', !noServerError ? 'Intenta más tarde' : 'No pudimos encontrar tu usuario', false, 'top')
      }
    )
  }).catch((error) => {
    switch(error.code) {
      case 'auth/user-not-found':
        /// no existe en firebase pero quizá en sistema si, con user y pass
        API.Request.Post(
          'Accediendo...',
          API.Model('Auth').login,
          formData,
          response => {
            if (Number(response && response.status) === 1) {
              /// si existe en sistema entonces
              /// se crea en firebase
              createUserWithEmailAndPassword(
                auth,
                details.email,
                details.password
              ).then((userCredential) => {
                const userDB = userCredential.user;
                formData.append('firebase', userDB.uid)
                realLogin(
                  commit,
                  userDB,
                  response.data,
                  formData,
                  response,
                  notifyFirebaseUpdateError,
                  sessionProfile => {
                    Notify.create({
                      message: '¡Sesión Iniciada!',
                      caption: `Bienvenido ${sessionProfile.name}!`,
                      avatar: require('assets/img/entrenator.png'),
                      color: 'positive'
                    })
                    router.push({ name: 'Home' })
                  }
                )
              })
              .catch((error) => {
                console.error('error codigo', error.code)
                Loading.hide()
                alert(error.message)
              });
            } else {
              Notify.create({
                message: '¡Contraseña Incorrecta!',
                caption: 'La contraseña no coincide, vuelve a intentarlo',
                avatar: require('assets/img/entrenator.png'),
                color: 'info'
              })
            }
          },
          error => {
            const status = Number(error && (error.response && error.response.status ? error.response.status : error.status))
            const noServerError = status === 422
            console.error(error)
            Notify.create({
              message: 'Ocurrió un error al iniciar sesión 174',
              caption: !noServerError ? 'Intenta más tarde' : 'No pudimos encontrar tu usuario',
              avatar: require('assets/img/entrenator.png'),
              color: !noServerError ? 'negative' : 'info',
              // classes: 'horizontal-center'
            })
          }
        )
        break
      case 'auth/wrong-password':
        Notify.create({
          message: '¡Contraseña Incorrecta!',
          caption: 'La contraseña no coincide, vuelve a intentarlo',
          avatar: require('assets/img/entrenator.png'),
          color: 'info'
        })
        Loading.hide()
        break
      default:
        alert('Algo salio mal pero no se que fue')
        console.error(error)
        Loading.hide()
    }
  })
}
export async function socialRedirect({ commit }, details) {
  Loading.show({ message: 'Iniciando sesión...', spinner: QSpinnerBall })
  if (details.facebook) {
    await signInWithRedirect(auth, provider)
  }
  Loading.hide();
}
export async function registerFirebase ({ commit }, details) {
  const { email, password } = details
  const completeLogin = sessionProfile => {
    Notify.create({
      message: '¡Sesión Iniciada!',
      caption: `Bienvenido ${sessionProfile.name}!`,
      avatar: require('assets/img/entrenator.png'),
      color: 'positive'
    })
    router.push({ name: 'Home' })
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const userDB = userCredential.user
    const profileFormData = new FormData()
    profileFormData.append('name', details.name)
    profileFormData.append('lastname', details.lname)
    profileFormData.append('mother_lastname', details.mlname)
    profileFormData.append('fecha_nacimiento', details.birthdate)
    profileFormData.append('telefono', details.telNum)
    profileFormData.append('email', email)
    profileFormData.append('id_status', 1)
    profileFormData.append('id_nivel', 1)
    profileFormData.append('firebase', userDB.uid)
    const createFormData = new FormData()
    createFormData.append('name', details.name)
    createFormData.append('lastname', details.lname)
    createFormData.append('mother_lastname', details.mlname)
    createFormData.append('fecha_nacimiento', details.birthdate)
    createFormData.append('telefono', details.telNum)
    createFormData.append('email', email)
    createFormData.append('password', password)
    createFormData.append('id_status', 1)
    createFormData.append('id_nivel', 1)
    createFormData.append('firebase', userDB.uid)
    const emailFormData = new FormData()
    emailFormData.append('email', email)
    API.Request.Post(
      'Comprobando correo...',
      API.Model('Auth').getUser,
      emailFormData,
      response => {
        if (Number(response && response.status) === 1) {
          // El login autenticado debe ocurrir antes de modificar el perfil.
          authenticateFirebaseProfile(commit, userDB, details, profileFormData, completeLogin)
          return
        }
        API.Request.Post(
          'Creando olímpico...',
          API.Model('Auth').addUser,
          createFormData,
          createResponse => {
            if (Number(createResponse && createResponse.status) === 1) {
              authenticateFirebaseProfile(commit, userDB, details, profileFormData, completeLogin)
            } else {
              Notify.create({
                message: 'Ocurrió un error al crear la cuenta',
                caption: 'Intenta más tarde.',
                avatar: require('assets/img/entrenator.png'),
                color: 'negative'
              })
            }
          },
          error => {
            const status = Number(error && (error.status || (error.response && error.response.status)))
            Notify.create({
              message: 'Ocurrió un error al crear la cuenta',
              caption: status === 422 ? 'No pudimos crear el usuario con esos datos.' : 'Intenta más tarde.',
              avatar: require('assets/img/entrenator.png'),
              color: 'negative'
            })
          }
        )
      },
      error => {
        const status = Number(error && (error.status || (error.response && error.response.status)))
        Notify.create({
          message: 'Ocurrió un error al comprobar el correo',
          caption: status === 422 ? 'Revisa el correo e inténtalo de nuevo.' : 'Intenta más tarde.',
          avatar: require('assets/img/entrenator.png'),
          color: 'negative'
        })
      }
    )
  } catch (error) {
    switch(error.code) {
      case 'auth/user-not-found':
        alert('user not found')
        break
      case 'auth/wrong-password':
        alert('wrong password')
        break
      default:
        alert('Algo salio mal pero no se que fue')
        console.error(error)
    }
    return
  }
}
export async function logoutFirebase ({ commit }) {
  await signOut(auth)
  LocalStorage.clear()
  commit('CLEAR_USER')
  API.Utils.Notifica('Sesión cerrada', 'Tu sesión se cerró exitósamente, vuelve pronto', true, 'top')

  this.$router.push({ name: 'Login' })
}
export function fetchUser ({ commit }) {
  auth.onAuthStateChanged(async user => {
    if (user === null) {
      commit('CLEAR_USER')
    } else {
      commit('SET_USER', user)
      if (this.$router.isReady() && this.$router.currentRoute.value.path === '/login') {
        this.$router.push('/')
      }
    }
  })
}

export async function searchUser ({ commit }, details) {
  const { telefono, callback } = details
  await API.Request.Get(
    'Buscando olímpico por teléfono...',
    API.Model('Auth').encuentraAlumno,
    { telefono: telefono },
    response => {
      if (response.status === 1 && response.data.length > 0) {
        callback(response.data)
      } else {
        API.Utils.Notifica('No se encontró ningun usuario con ese teléfono', 'Comprueba que escribiste bien el teléfono o inicia sesión con tu correo', false, 'top')
      }
    }
  )
}

export async function enviaOTP ({ commit }, details) {
  const { user } = details
  await API.Request.Get(
    'Enviando contraseña por WhatsApp',
    API.Model('Auth').otpLogin + user,
    { },
    response => {
      API.Utils.Notifica('Se envió la contraseña por WhatsApp', 'Revisa tu WhatsApp y escribe el código que te llegó', true, 'top')
    }
  )
}

export async function actualizaDatosPersonales ({}, details) {
  const { user, callback } = details
  const formData = new FormData()
  for (var key in user) {
    if(user[key] !== null)
      formData.append(key, user[key])
  }
  await API.Request.Post(
    'Actualizando datos del olímpico',
    API.Model('Auth').updateUser + user.id,
    formData,
    response => {
      if (response.status === 1) {
        API.Utils.Notifica('Todo está guardado', 'Tu información está actualizada', true, 'top')
        const existingProfile = LocalStorage.getItem('user_logged')
        const updatedProfile = response.data && typeof response.data === 'object' ? response.data : {}
        const sessionProfile = profileWithEditionStatus({ ...(existingProfile || {}), ...updatedProfile }, response)
        LocalStorage.set('user_logged', sessionProfile)
        LocalStorage.set('api_token', response.access_token)
        LocalStorage.set('avatar', sessionProfile.avatar || '')
        if (typeof callback === 'function') {
          callback()
        }
      }
    }
  )
}

export async function actualizaVidas ({commit}) {
  const user = LocalStorage.getItem('user_logged')
  await API.Request.Get(
    'Recuperando vidas',
    API.Model('Auth').vidas + user.id,
    {},
    response => {
      if (response.status === 1) {
        LocalStorage.set('vidas', response.vida.cnt)
      }
    }
  )
  await API.Request.Get(
    'Actualizando niveles',
    API.Model('Auth').dameProgreso,
    {
      user_id: user.id
    },
    levels => {
      if(levels.status === 1){
        console.log('--- actualizado desde 393')
        commit('SET_OLIMPICO', {levels: levels.niveles, level: levels.datosLevel})
      }
    }
  )
}

export async function marcaProgreso ({commit}, details) {
  const {step, nivel_id, user_id} = details
  await API.Request.Post(
    'Guardando progreso',
    API.Model('Auth').marcaProgreso,
    {
      step: step,
      nivel_id: nivel_id,
      user_id: user_id
    },
    response => {
      API.Request.Get(
        'Actualizando niveles',
        API.Model('Auth').dameProgreso,
        {
          user_id: user_id
        },
        levels => {
          if(response.status === 1){
            console.log('--- actualizado desde 419')
            commit('SET_OLIMPICO', {levels: levels.niveles, level: levels.datosLevel})
            API.Utils.Notifica('', 'Progreso guardado', true, 'top')
          }
        }
      )
    }
  )
}

export async function determinaStatusPago ({commit}, details) {
  const {user_id} = details
  await API.Request.Get(
    'Analizando status',
    API.Model('Auth').getMe + user_id,
    {},
    data => {
      commit('SET_STATUS_PAGO', data.data)
    }
  )
}

export function notifica({ }, details){
  const { title, msg, type } = details
  API.Utils.Notifica(title, msg, type, 'top')
}

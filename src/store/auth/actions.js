import { LocalStorage, Notify, Loading, QSpinnerBall } from 'quasar'
import axios from 'axios'
import * as API from 'src/store/Api'
import { auth, db, provider } from "boot/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth'
import router from 'src/router';

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
        user = response.data
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
      const noServerError = error.status === 422
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

function realLogin(commit, userDB, user, token, formData) {
  if (token !== null) {
    LocalStorage.set('user_logged', user)
    LocalStorage.set('api_token', token)
    LocalStorage.set('avatar', user.avatar)
    commit('SET_USER', auth.currentUser)
    commit('SET_OLIMPICO', user)
    API.Request.Post(
      'Actualizando...',
      API.Model('Auth').updateUser + user.id,
      formData,
      () => ( redirect({ path: '/home' }) )
    )
  }
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
        let user = {}
        let token = null
        if (response.status === 1) {
          token = response.access_token
          user = response.data
          /// se actualiza contraseña y firebase
          realLogin(commit, userDB, user, token, formData)
        }
        API.Utils.Notifica(token === null ? '¡Contraseña Incorrecta!' : '¡Sesión Iniciada!',
          token === null ? 'La contraseña no coincide, vuelve a intentarlo' : `Bienvenido ${user.name}!`,
          token === null, 'top')
      },
      error => {
        const noServerError = error.status === 422
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
            let user = {}
            let token = null
            if (response.status === 1) {
              /// si existe en sistema entonces
              token = response.access_token
              user = response.data
              /// se crea en firebase
              createUserWithEmailAndPassword(
                auth,
                details.email,
                details.password
              ).then((userCredential) => {
                const userDB = userCredential.user;
                realLogin(commit, userDB, user, token, formData)
              })
              .catch((error) => {
                console.error('error codigo', error.code)
                alert(error.message)
              });
            }
            Notify.create({
              message: token === null ? '¡Contraseña Incorrecta!' : '¡Sesión Iniciada!',
              caption: token === null ? 'La contraseña no coincide, vuelve a intentarlo' : `Bienvenido ${user.name}!`,
              avatar: require('assets/img/entrenator.png'),
              color: token === null ? 'info' : 'positive'
            })
          },
          error => {
            const noServerError = error.status === 422
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
  try {
    let userCredential = null
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      const userDB = userCredential.user;
      const formData = new FormData()
      formData.append('email', email)
      API.Request.Post(
        'Comprobando correo...',
        API.Model('Auth').getUser,
        formData,
        response => {
          const formData = new FormData()
          formData.append('name', details.name)
          formData.append('lastname', details.lname)
          formData.append('mother_lastname', details.mlname)
          formData.append('fecha_nacimiento', details.birthdate)
          formData.append('telefono', details.telNum)
          formData.append('email', details.email)
          formData.append('password', details.password)
          formData.append('id_status', 1)
          formData.append('id_nivel', 1)
          formData.append('firebase', userDB.uid)
          if (response.status === 1) {
            /// el usuario existe y solo se actualiza
            let user_id = response.data
            API.Request.Post(
              'Actualizando olímpico...',
              API.Model('Auth').updateUser + user_id,
              formData,
              response => {
                if (response.status === 1) {
                  let token = response.access_token
                  let user = response.data
                  realLogin(commit, userDB, user, token, formData)
                } else {
                  Notify.create({
                    message: 'Ocurrió un error al actualizar olímpico',
                    caption: !noServerError ? 'Intenta más tarde' : 'No pudimos actualizar tu usuario',
                    avatar: require('assets/img/entrenator.png'),
                    color: !noServerError ? 'negative' : 'info',
                    // classes: 'horizontal-center'
                  })
                }
              },
              error => {
                const noServerError = error.status === 422
                Notify.create({
                  message: 'Ocurrió un error',
                  caption: !noServerError ? 'Intenta más tarde' : 'No pudimos actualizar tu usuario',
                  avatar: require('assets/img/entrenator.png'),
                  color: !noServerError ? 'negative' : 'info',
                  // classes: 'horizontal-center'
                })
              }
            )
          } else {
            /// el usuario no existe y se crea
            API.Request.Post(
              'Creando olímpico...',
              API.Model('Auth').addUser,
              formData,
              response => {
                if (response.status === 1) {
                  /// el usuario fue agregado existosamente
                  let token = response.access_token
                  let user = response.data
                  realLogin(commit, userDB, user, token, formData)
                } else {
                  console.error(response)
                  /// el usuario no se agregó porque ya existe
                  Notify.create({
                    message: 'Ocurrió un error...',
                    caption: 'Intenta más tarde',
                    avatar: require('assets/img/entrenator.png'),
                    color: 'negative'
                  })
                }
              },
              error => {
                const noServerError = error.status === 422
                Notify.create({
                  message: 'Ocurrió un error',
                  caption: !noServerError ? 'Intenta más tarde' : 'No pudimos crear tu usuario',
                  avatar: require('assets/img/entrenator.png'),
                  color: !noServerError ? 'negative' : 'info',
                  // classes: 'horizontal-center'
                })
              }
            )
          }
        },
        error => {
          const noServerError = error.status === 422
          Notify.create({
            message: 'Ocurrió un error',
            caption: !noServerError ? 'Intenta más tarde' : 'No pudimos encontrar tu usuario',
            avatar: require('assets/img/entrenator.png'),
            color: !noServerError ? 'negative' : 'info',
            // classes: 'horizontal-center'
          })
        }
      )
    })
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
        LocalStorage.set('user_logged', response.data)
        LocalStorage.set('api_token', response.access_token)
        LocalStorage.set('avatar', response.data.avatar)
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
        commit('SET_OLIMPICO', levels.niveles)
      }
    }
  )
}

export async function marcaProgreso ({}, details) {
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
            commit('SET_OLIMPICO', levels.niveles)
            API.Utils.Notifica('', 'Progreso guardado', true, 'top')
          }
        }
      )
    }
  )
}

export function notifica({ }, details){
  const { title, msg, type } = details
  API.Utils.Notifica(title, msg, type, 'top')
}

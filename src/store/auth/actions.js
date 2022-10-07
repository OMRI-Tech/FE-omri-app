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
      }

      Notify.create({
        message: token === null ? '¡Contraseña Incorrecta!' : '¡Sesión Iniciada!',
        caption: token === null ? 'La contraseña no coincide, vuelve a intentarlo' : `Bienvenido ${user.name}!`,
        avatar: require('assets/img/entrenator.png'),
        color: token === null ? 'info' : 'positive'
      })
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
      Notify.create({
        message: 'Ocurrió un error 43',
        caption: !noServerError ? 'Intenta más tarde' : 'No pudimos encontrar tu usuario',
        avatar: require('assets/img/entrenator.png'),
        color: !noServerError ? 'negative' : 'info',
        // classes: 'horizontal-center'
      })
    }
  )
}

export function Logout () {
  LocalStorage.clear()
  Notify.create({
    message: 'Sesión cerrada',
    caption: 'Tu sesión se cerró exitósamente, vuelve pronto',
    avatar: require('assets/img/entrenator.png'),
    color: 'positive'
  })
  this.$router.push({ name: 'Login' })
}

function realLogin(commit, userDB, user, token, formData) {
  console.log('{{{formData}}');
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  if (token !== null) {
    /*setDoc(doc(db, 'users', userDB.uid), {
      correo: userDB.email,
      uid: userDB.uid,
      estado: true,
      user_id: user.id,
      objetito: user
    });*/
    //axios.defaults.headers.common.Authorization = 'Bearer ' + token
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
  console.log('login firebase action')
  const formData = new FormData()
  console.warn('ojo con el email y passwor', 'email', details.email,'password', details.password)
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
          message: 'Ocurrió un error al iniciar sesión 128',
          caption: !noServerError ? 'Intenta más tarde' : 'No pudimos encontrar tu usuario',
          avatar: require('assets/img/entrenator.png'),
          color: !noServerError ? 'negative' : 'info',
          // classes: 'horizontal-center'
        })
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
            console.log(response.status === 1)
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
                console.log(userCredential);
                const userDB = userCredential.user;
                console.log(userDB)
                console.log(token)
                realLogin(commit, userDB, user, token, formData)
              })
              .catch((error) => {
                console.error('error codigo', error.code)
                alert(error.message)
              });
            }
            console.log(token === null, token);
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
      console.warn('----- logueado', userDB)
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
  console.log('logout firebase action')
  await signOut(auth)
  LocalStorage.clear()
  commit('CLEAR_USER')

  Notify.create({
    message: 'Sesión cerrada',
    caption: 'Tu sesión se cerró exitósamente, vuelve pronto',
    avatar: require('assets/img/entrenator.png'),
    color: 'positive'
  })

  this.$router.push({ name: 'Login' })
}
export function fetchUser ({ commit }) {
  console.log('fetch action')
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

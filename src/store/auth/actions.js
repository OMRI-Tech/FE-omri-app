import { LocalStorage, Notify } from 'quasar'
import axios from 'axios'
import * as API from 'src/store/Api'

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
      Notify.create({
        message: 'Ocurrió un error',
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

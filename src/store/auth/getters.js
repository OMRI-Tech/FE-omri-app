import { LocalStorage } from 'quasar'

export function isLogged (state) {
  return LocalStorage.getItem('user_logged') !== null
}

export function user (state) {
  console.log('jmm no pasamos por aca');
  return LocalStorage.getItem('user_logged')
}

export function avatar (state) {
  return LocalStorage.getItem('avatar')
}

import { Notify } from 'quasar'

export default function (title, msg, type, position) {
  Notify.create({
    message: title,
    caption: msg,
    avatar: (type ? require('assets/entrenator/hablando.png') : require('assets/entrenator/error.png')),
    classes: 'entrenator-notify dialog-' + (type ? 'success' : 'error'),
    position: position
  })
}

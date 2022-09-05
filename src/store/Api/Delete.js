import axios from 'axios'
import { Dialog, Loading, QSpinnerBall } from 'quasar'

/**
 * 
 * @param {String} loadingMessage 
 * * @param {String} question 
 * @param {String} url 
 * @param {Function} response 
 * @param {Function} error 
 */

export default function (loadingMessage,  url, response, error, question) {
  if (loadingMessage !== null) Loading.show({ message: loadingMessage, spinner: QSpinnerBall })
  axios({
    method: 'delete',
    url: url
  })
    .then(r => {
      Loading.hide()
      response(r.data)
    })
    .catch(e => {
      Loading.hide()
      error(e)
    })
/*   Dialog.create({
    title: 'Confirmación de Borrado',
    message: question,
    cancel: true,
    persistent: true
  }).onOk(() => {
  }) */
}

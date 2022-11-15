import axios from 'axios'
import { Loading, QSpinnerBall } from 'quasar'

/**
 *
 * @param {String} loadingMessage
 * @param {String} url
 * @param {FormData} formData
 * @param {Function} response
 * @param {Function} error
 */

export default async function (loadingMessage, url, formData, response, error) {
  console.log('imprimiendo: ', loadingMessage)
  if (loadingMessage !== null) Loading.show({ message: loadingMessage, spinner: QSpinnerBall })
  await axios({
    method: 'POST',
    url: url,
    data: formData
  })
    .then(r => {
      Loading.hide()
      if (typeof response === 'function') {
        response(r.data)
      }
    })
    .catch(e => {
      Loading.hide()
      console.error('-----------');
      console.log(e)
      if (typeof e === 'function') {
        error(e)
      }
    })
}

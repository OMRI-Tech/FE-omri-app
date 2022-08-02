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

export default function (loadingMessage, url, formData, response, error) {
  if (loadingMessage !== null) Loading.show({ message: loadingMessage, spinner: QSpinnerBall })
  axios({
    method: 'POST',
    url: url,
    data: formData
  })
    .then(r => {
      Loading.hide()
      response(r.data)
    })
    .catch(e => {
      Loading.hide()
      error(e)
    })
}

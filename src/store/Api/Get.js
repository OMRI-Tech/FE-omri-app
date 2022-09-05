import axios from 'axios'
import { Loading, QSpinnerBall } from 'quasar'

/**
 * 
 * @param {String} loadingMessage 
 * @param {String} url 
 * @param {Object} params 
 * @param {Function} response 
 * @param {Function} error 
 */

export default function  (loadingMessage, url, params, response, error) {
  if (loadingMessage !== null) Loading.show({ message: loadingMessage, spinner: QSpinnerBall })
  axios({
    method: 'get',
    url: url,
    params: params
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

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

export default async function  (loadingMessage, url, params, response, error) {
  if (loadingMessage !== null) Loading.show({ message: loadingMessage, spinner: QSpinnerBall })
  await axios({
    method: 'get',
    url: url,
    params: params
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

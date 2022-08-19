import axios from 'axios'

/**
 * 
 * @param {String} ruta 
 * @param {String} q 
 * @param {Function} actionToresponse 
 * @param {Function} error 
 * @param {String} property 
 * @param {Object} params 
 */

export default function (ruta, q, actionToresponse, error, property = 'text', params) {
  const paramsReales = {}
  if (params !== undefined) {
    for (const prop in params) {
      paramsReales[prop] = params[prop]
    }
  }
  paramsReales.page = 0
  paramsReales.q = q
  axios.post(ruta, paramsReales)
    .then(response => {
      const opcionesReales = []
      for (let i = 0; i < response.data.data.results.length; i++) {
        opcionesReales[i] = { label: response.data.data.results[i][property], value: response.data.data.results[i].id }
        if (response.data.data.results[i].all !== undefined) opcionesReales[i].all = response.data.data.results[i].all
        if (response.data.data.results[i].scopeField !== undefined) opcionesReales[i].scopeField = response.data.data.results[i].scopeField
        if (response.data.data.results[i].color !== undefined) opcionesReales[i].color = response.data.data.results[i].color
      }
      actionToresponse(opcionesReales)
    })
    .catch(error)
}

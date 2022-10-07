/**
 *
 * @param {String} model
 * @returns
 */
 export default function (model) {
  return {
    getUser:  `api/encuentra-alumno`,
    addUser: 'api/add-alumno',
    updateUser: 'api/update-alumno/',
    updatePass: 'api/editaContra/',
    agregarInscripcion: 'api/aplica-colegiatura',
    payLink: 'api/conekta/link',
    login:  `api/${model}/login`
  }
}

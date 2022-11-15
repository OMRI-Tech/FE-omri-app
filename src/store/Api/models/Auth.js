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
    rifaLoca: 'api/guarda-boleto-rifa',
    encuentraAlumno: 'api/encuentra-alumnos-por-telefono',
    otpLogin: 'api/otp-login/',
    selectEscuela: 'api/select2-escuela',
    selectMunicipio: 'api/select2-municipio',
    vidas: 'api/get-vida/',
    login:  `api/${model}/login`,
    dameProgreso: 'api/dame-mi-progreso',
    marcaProgreso: 'api/marca-como-realizado'
  }
}

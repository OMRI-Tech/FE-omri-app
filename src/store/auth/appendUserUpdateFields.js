const { getSchoolOptionId } = require('../../utils/schoolSelection')

function appendUserUpdateFields (formData, user) {
  const source = user || {}
  Object.keys(source).forEach(key => {
    const value = source[key]
    if (key !== 'escuela' && value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })

  if (source.id_escuela === null || source.id_escuela === undefined) {
    const schoolId = getSchoolOptionId(source.escuela)
    if (schoolId !== null) formData.append('id_escuela', schoolId)
  }
}

module.exports = appendUserUpdateFields

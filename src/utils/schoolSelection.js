function getSchoolOptionId (school) {
  if (!school || typeof school !== 'object') return null
  const schoolId = school.value !== undefined ? school.value : school.id
  return schoolId === null || schoolId === undefined || schoolId === '' ? null : schoolId
}

function resolveSchoolId (selectedSchool, existingSchoolId = null) {
  const selectedSchoolId = getSchoolOptionId(selectedSchool)
  return selectedSchoolId !== null ? selectedSchoolId : existingSchoolId
}

function appendSchoolId (formData, selectedSchool, existingSchoolId = null) {
  const schoolId = resolveSchoolId(selectedSchool, existingSchoolId)
  if (schoolId !== null && schoolId !== undefined && schoolId !== '') {
    formData.append('id_escuela', schoolId)
    return schoolId
  }
  return null
}

module.exports = {
  getSchoolOptionId,
  resolveSchoolId,
  appendSchoolId
}

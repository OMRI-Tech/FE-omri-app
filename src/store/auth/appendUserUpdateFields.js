function appendUserUpdateFields (formData, user) {
  Object.keys(user || {}).forEach(key => {
    const value = user[key]
    if (key !== 'escuela' && value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })
}

module.exports = appendUserUpdateFields

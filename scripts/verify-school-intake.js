const assert = require('assert')
const appendUserUpdateFields = require('../src/store/auth/appendUserUpdateFields')
const createRequestSequence = require('../src/utils/requestSequence')
const { appendSchoolId } = require('../src/utils/schoolSelection')

function createFormDataRecorder () {
  return {
    entries: [],
    append (key, value) {
      this.entries.push([key, value])
    }
  }
}

const selectedSchool = createFormDataRecorder()
appendSchoolId(selectedSchool, { label: 'Escuela existente', value: 42 })
assert.deepStrictEqual(selectedSchool.entries, [['id_escuela', 42]])

const freeTextSchool = createFormDataRecorder()
appendSchoolId(freeTextSchool, 'Escuela escrita por el alumno')
assert.deepStrictEqual(freeTextSchool.entries, [])

const preservedSchool = createFormDataRecorder()
appendSchoolId(preservedSchool, null, 17)
assert.deepStrictEqual(preservedSchool.entries, [['id_escuela', 17]])

const newProfile = createFormDataRecorder()
appendSchoolId(newProfile, null)
assert.deepStrictEqual(newProfile.entries, [])

const sharedUpdate = createFormDataRecorder()
appendUserUpdateFields(sharedUpdate, {
  id: 9,
  name: 'Ana',
  id_escuela: 42,
  escuela: 'Escuela escrita por el alumno',
  legacy: null
})
assert.deepStrictEqual(sharedUpdate.entries, [
  ['id', 9],
  ['name', 'Ana'],
  ['id_escuela', 42]
])

const requests = createRequestSequence()
const firstSearch = requests.next()
const latestSearch = requests.next()
assert.strictEqual(requests.isCurrent(firstSearch), false)
assert.strictEqual(requests.isCurrent(latestSearch), true)
requests.invalidate()
assert.strictEqual(requests.isCurrent(latestSearch), false)

console.log('School intake payload and stale-search checks passed.')

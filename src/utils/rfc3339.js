const RFC3339_TIMESTAMP = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-](\d{2}):(\d{2}))$/i

export function isValidRfc3339Timestamp (value) {
  if (typeof value !== 'string') return false

  const parts = value.match(RFC3339_TIMESTAMP)
  if (!parts) return false

  const year = Number(parts[1])
  const month = Number(parts[2])
  const day = Number(parts[3])
  const hour = Number(parts[4])
  const minute = Number(parts[5])
  const second = Number(parts[6])
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]

  if (!daysInMonth || day < 1 || day > daysInMonth) return false
  if (hour > 23 || minute > 59 || second > 59) return false
  if (parts[9] !== undefined && (Number(parts[9]) > 23 || Number(parts[10]) > 59)) return false

  return Number.isFinite(Date.parse(value))
}

export default isValidRfc3339Timestamp

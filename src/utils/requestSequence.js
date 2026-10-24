function createRequestSequence () {
  let currentRequestId = 0

  return {
    next () {
      currentRequestId += 1
      return currentRequestId
    },
    isCurrent (requestId) {
      return requestId === currentRequestId
    },
    invalidate () {
      currentRequestId += 1
    }
  }
}

module.exports = createRequestSequence

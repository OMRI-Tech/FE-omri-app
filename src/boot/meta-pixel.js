import { boot } from 'quasar/wrappers'

const FB_SCRIPT_SRC = 'https://connect.facebook.net/en_US/fbevents.js'
const FB_SCRIPT_ID = 'meta-pixel-script'

function ensureMetaPixel(pixelId) {
  if (!pixelId || typeof window === 'undefined') {
    return
  }

  if (typeof window.fbq !== 'function') {
    /* eslint-disable */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      t.id = FB_SCRIPT_ID
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', FB_SCRIPT_SRC)
    /* eslint-enable */
  }

  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')
}

export default boot(() => {
  if (typeof window === 'undefined') {
    return
  }

  const pixelId = process.env.metaPixelId
  ensureMetaPixel(pixelId)
})

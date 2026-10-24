import axios from 'axios'

const ACTION_SOURCE = 'website'

const toStringOrEmpty = (value) => (value === null || value === undefined ? '' : String(value).trim())
const normalizeEmail = (email) => toStringOrEmpty(email).toLowerCase()
const normalizePhone = (phone) => toStringOrEmpty(phone).replace(/\D/g, '')
const normalizeBirthdate = (birthdate) => toStringOrEmpty(birthdate)
const nowInSeconds = () => Math.floor(Date.now() / 1000)
const getEventSourceUrl = () => (typeof window === 'undefined' ? '' : window.location.href)
const getUserAgent = () => (typeof navigator === 'undefined' ? '' : navigator.userAgent)

function compactObject(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

function buildEventId(prefix) {
  const random = Math.random().toString(36).slice(2, 10)
  return `${prefix}_${Date.now()}_${random}`
}

function trackBrowserEvent(eventName, customData, eventId) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return false
  }

  const options = eventId ? { eventID: eventId } : undefined
  if (options) {
    window.fbq('track', eventName, customData, options)
  } else {
    window.fbq('track', eventName, customData)
  }
  return true
}

async function sendCapiEvent(payload) {
  const proxyUrl = process.env.metaCapiProxyUrl
  if (!proxyUrl) {
    return
  }

  try {
    await axios.post(proxyUrl, payload)
  } catch (error) {
    console.error('Meta CAPI proxy call failed', error)
  }
}

function buildCommonEvent(eventName, eventId) {
  return {
    event_name: eventName,
    event_time: nowInSeconds(),
    event_source_url: getEventSourceUrl(),
    action_source: ACTION_SOURCE,
    event_id: eventId
  }
}

function buildCommonUserData(user, extra = {}) {
  const normalizedCountry = toStringOrEmpty(extra.country || user.country).toLowerCase()
  return compactObject({
    client_user_agent: getUserAgent(),
    em: normalizeEmail(user.email),
    ph: normalizePhone(user.telNum),
    client_ip_address: toStringOrEmpty(extra.client_ip_address),
    ct: toStringOrEmpty(extra.city || user.city),
    zp: toStringOrEmpty(extra.zip || user.zip),
    country: normalizedCountry,
    external_id: toStringOrEmpty(extra.external_id || user.id),
    db: normalizeBirthdate(user.birthdate)
  })
}

export async function trackMetaViewContent({ user = {}, extra = {} } = {}) {
  const eventId = buildEventId('view_content')
  const event = buildCommonEvent('ViewContent', eventId)
  const userData = buildCommonUserData(user, extra)

  const customData = compactObject({
    event_time: event.event_time,
    event_source_url: event.event_source_url,
    action_source: event.action_source,
    event_id: event.event_id,
    em: userData.em,
    ph: userData.ph,
    client_ip_address: userData.client_ip_address,
    ct: userData.ct,
    zp: userData.zp,
    country: userData.country
  })

  trackBrowserEvent('ViewContent', customData, eventId)
  await sendCapiEvent({
    ...event,
    user_data: userData
  })

  return eventId
}

export async function trackMetaCompleteRegistration({ user = {}, subscriptionId = '', extra = {} } = {}) {
  const eventId = buildEventId('complete_registration')
  const event = buildCommonEvent('CompleteRegistration', eventId)
  const userData = buildCommonUserData(user, {
    ...extra,
    external_id: subscriptionId || user.id
  })

  const normalizedSubscriptionId = toStringOrEmpty(subscriptionId || user.id)
  const customData = compactObject({
    event_time: event.event_time,
    event_source_url: event.event_source_url,
    action_source: event.action_source,
    event_id: event.event_id,
    em: userData.em,
    client_ip_address: userData.client_ip_address,
    ct: userData.ct,
    zp: userData.zp,
    country: userData.country,
    subscription_id: normalizedSubscriptionId,
    db: userData.db
  })

  trackBrowserEvent('CompleteRegistration', customData, eventId)
  await sendCapiEvent({
    ...event,
    user_data: userData,
    custom_data: {
      subscription_id: normalizedSubscriptionId
    }
  })

  return eventId
}

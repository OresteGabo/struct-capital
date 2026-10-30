import { indexingEnabled } from '../../shared/site'
import { validateContact, validContactTiming } from '../../shared/contact'
import { ContactProblem, createContactLimiter, deliverContact, readLimitedJson, validContactEndpoint } from '../services/contact'

const take = createContactLimiter()
const salt = crypto.randomUUID()
export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  const config = useRuntimeConfig(event)
  if (!indexingEnabled(config.public.contactEnabled) || !validContactEndpoint(config.contactEndpoint) || !config.contactToken.trim()) {
    throw createError({ statusCode: 503, statusMessage: 'Contact delivery is unavailable. Your message has not been sent.' })
  }
  const ip = getRequestIP(event, { xForwardedFor: false }) ?? 'unknown'
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ip))
  const key = [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, '0')).join('')
  if (!take(key, Date.now())) {
    setHeader(event, 'Retry-After', 600)
    throw createError({ statusCode: 429, statusMessage: 'Too many attempts. Please try again in ten minutes.' })
  }
  if (getHeader(event, 'origin') !== config.contactOrigin || (getHeader(event, 'sec-fetch-site') && getHeader(event, 'sec-fetch-site') !== 'same-origin')) {
    throw createError({ statusCode: 403, statusMessage: 'This contact request is not permitted.' })
  }
  if (getHeader(event, 'content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') {
    throw createError({ statusCode: 415, statusMessage: 'Send the contact form as JSON.' })
  }
  const length = getHeader(event, 'content-length')
  if (length && (!/^\d+$/.test(length) || Number(length) > 16_384)) throw createError({ statusCode: 413, statusMessage: 'The message is too large.' })
  try {
    const body = await readLimitedJson(getRequestWebStream(event))
    const result = validateContact(body)
    if (!result.message || !validContactTiming((body as Record<string, unknown>).startedAt, Date.now())) {
      throw createError({ statusCode: 400, statusMessage: 'Check the contact form and try again.', data: { errors: result.errors } })
    }
    return await deliverContact(result.message, config.contactEndpoint, config.contactToken)
  } catch (error) {
    if (error instanceof ContactProblem) throw createError({ statusCode: error.statusCode, statusMessage: error.message })
    throw error
  }
})

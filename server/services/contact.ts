import type { ContactMessage } from '../../shared/contact'

export class ContactProblem extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) { super(message); this.statusCode = statusCode }
}
export async function readLimitedJson(stream: ReadableStream<Uint8Array> | null | undefined, limit = 16_384): Promise<unknown> {
  if (!stream) throw new ContactProblem(400, 'Check the form and try again.')
  const reader = stream.getReader()
  const parts: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const result = await reader.read()
      if (result.done) break
      size += result.value.byteLength
      if (size > limit) {
        await reader.cancel()
        throw new ContactProblem(413, 'The message is too large.')
      }
      parts.push(result.value)
    }
    const bytes = new Uint8Array(size)
    let offset = 0
    for (const part of parts) { bytes.set(part, offset); offset += part.length }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) }
    catch { throw new ContactProblem(400, 'Check the form and try again.') }
  } finally { reader.releaseLock() }
}

export function validContactEndpoint(endpoint: string): boolean {
  try {
    const url = new URL(endpoint)
    // A marketing inquiry must never be routed to the inspected investor API.
    // Reject ambiguous encoded paths and URL-based credentials as well.
    return url.protocol === 'https:' && !url.username && !url.password && !url.hash && !url.search
      && !url.pathname.includes('%') && !/^\/api\/bonds(?:\/|$)/i.test(url.pathname)
  } catch { return false }
}

export function createContactLimiter(limit = 5, windowMs = 600_000, capacity = 10_000) {
  const buckets = new Map<string, { count: number, expires: number }>()
  return (key: string, now: number) => {
    const existing = buckets.get(key)
    if (existing && existing.expires > now) {
      if (existing.count >= limit) return false
      existing.count++
      return true
    }
    for (const [id, bucket] of buckets) if (bucket.expires <= now) buckets.delete(id)
    if (buckets.size >= capacity) return false
    buckets.set(key, { count: 1, expires: now + windowMs })
    return true
  }
}

export async function deliverContact(message: ContactMessage, endpoint: string, token: string, request: typeof fetch = fetch) {
  if (!validContactEndpoint(endpoint) || !token.trim()) throw new ContactProblem(503, 'Contact delivery is unavailable. Your message has not been sent.')
  let response: Response | undefined
  try {
    response = await request(endpoint, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(8000),
      cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cache-Control': 'no-store', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(message),
    })
    if (!response.ok) throw new Error('Not accepted')
    if (response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') throw new Error('Invalid acknowledgment type')
    const length = response.headers.get('content-length')
    if (length && (!/^\d+$/.test(length) || Number(length) > 2048)) throw new Error('Acknowledgment too large')
    const acknowledgment = await readLimitedJson(response.body, 2048)
    if (!acknowledgment || typeof acknowledgment !== 'object' || (acknowledgment as Record<string, unknown>).accepted !== true) throw new Error('No acknowledgment')
    return { accepted: true as const }
  } catch {
    // Never expose upstream URLs, response bodies, tokens or contact content.
    throw new ContactProblem(502, 'The contact service did not confirm acceptance. Your message has not been confirmed sent; please try again later.')
  } finally {
    // Discard rejected bodies rather than leaving an upstream connection occupied.
    void response?.body?.cancel().catch(() => {})
  }
}

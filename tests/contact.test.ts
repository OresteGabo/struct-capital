import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateContact, validContactTiming } from '../shared/contact.ts'
import { ContactProblem, createContactLimiter, deliverContact, readLimitedJson, validContactEndpoint } from '../server/services/contact.ts'
const valid = { name: 'Review Tester', email: 'review@example.test', topic: 'general', message: 'A synthetic inquiry for local testing only.', consent: true, website: '', startedAt: 1000 }

test('contact schema validates types, consent and bounded fields without coercion', () => {
  assert.ok(validateContact(valid).message)
  for (const change of [null, [], { ...valid, email: 'x\nBcc: y' }, { ...valid, consent: 'true' }, { ...valid, name: 9 }, { ...valid, topic: 'unknown' }, { ...valid, message: 'x'.repeat(4001) }, { ...valid, website: 'bot' }, { ...valid, unexpected: 'data' }]) {
    assert.equal(validateContact(change).message, undefined)
  }
  const clean = validateContact({ ...valid, name: '  Review Tester  ', message: 'Synthetic line one.\r\nSynthetic line two.' }).message!
  assert.equal(clean.name, 'Review Tester')
  assert.equal(clean.message.includes('\r'), false)
  assert.deepEqual(Object.keys(clean).sort(), ['consent', 'email', 'message', 'name', 'topic'])
})

test('anti-abuse timing rejects missing, future, instant and expired forms', () => {
  for (const start of [undefined, NaN, Infinity, 10_001, 9999, -9_000_000]) assert.equal(validContactTiming(start, 10_000), false)
  assert.equal(validContactTiming(1000, 10_000), true)
})

test('stream limit catches oversized bodies even without an honest content-length', async () => {
  await assert.rejects(readLimitedJson(new Response('x'.repeat(20)).body, 8), error => error instanceof ContactProblem && error.statusCode === 413)
  await assert.rejects(readLimitedJson(new Response('{not json}').body), error => error instanceof ContactProblem && error.statusCode === 400)
  assert.deepEqual(await readLimitedJson(new Response('{"ok":true}').body), { ok: true })
})

test('rate limiter expires buckets, rejects floods, and bounds total memory', () => {
  const take = createContactLimiter(2, 100, 1)
  assert.equal(take('client-a', 0), true)
  assert.equal(take('client-a', 1), true)
  assert.equal(take('client-a', 2), false)
  assert.equal(take('client-b', 3), false)
  assert.equal(take('client-b', 101), true)
})

test('delivery requires HTTPS configuration and explicit acceptance; never retries', async () => {
  for (const endpoint of ['', 'http://example.test/contact', 'https://user:pass@example.test/contact',
    'https://example.test/contact?token=private', 'https://example.test/contact#fragment',
    'https://example.test/api/bonds', 'https://example.test/api/bonds/auth/accounts',
    'https://example.test/api/bonds/rse/quotes', 'https://example.test/api/%62onds/purchases',
    'https://example.test/api%2fbonds/documents', 'https://example.test/x/../api/bonds/equities',
  ]) assert.equal(validContactEndpoint(endpoint), false, endpoint)
  let calls = 0
  const message = validateContact(valid).message!
  const request = async (_url: unknown, options: RequestInit) => {
    calls++
    assert.equal(options.redirect, 'error')
    assert.equal(options.method, 'POST')
    assert.equal(options.cache, 'no-store')
    assert.equal(options.credentials, 'omit')
    assert.equal(options.referrerPolicy, 'no-referrer')
    assert.ok(options.signal instanceof AbortSignal)
    assert.deepEqual(options.headers, { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cache-Control': 'no-store', 'Authorization': 'Bearer synthetic-token' })
    assert.deepEqual(JSON.parse(options.body as string), message)
    return new Response('{"accepted":true}', { status: 202, headers: { 'Content-Type': 'application/json' } })
  }
  assert.deepEqual(await deliverContact(message, 'https://contact.example.test/inquiries', 'synthetic-token', request as typeof fetch), { accepted: true })
  assert.equal(calls, 1)
  for (const response of [new Response('{}', { headers: { 'Content-Type': 'application/json' } }), new Response('{"accepted":"true"}', { headers: { 'Content-Type': 'application/json' } }), new Response('error', { status: 500 }), new Response('{"accepted":true}', { headers: { 'Content-Type': 'text/html' } }), new Response('{"accepted":true}', { headers: { 'Content-Type': 'application/json', 'Content-Length': '2049' } }), new Response(JSON.stringify({ accepted: true, padding: 'x'.repeat(3000) }), { headers: { 'Content-Type': 'application/json' } })]) {
    await assert.rejects(deliverContact(message, 'https://contact.example.test/inquiries', 'synthetic-token', (async () => response) as typeof fetch), error => error instanceof ContactProblem && error.statusCode === 502 && !error.message.includes('synthetic-token'))
  }
  await assert.rejects(deliverContact(message, '', '', request as typeof fetch), error => error instanceof ContactProblem && error.statusCode === 503)
  assert.equal(calls, 1)
})

test('inquiries are never cached; rejected responses and transport errors cannot leak upstream content', async () => {
  const message = validateContact(valid).message!
  let calls = 0
  const request = async () => {
    calls++
    return new Response('{"accepted":true,"internal":"must not propagate"}', { headers: { 'Content-Type': 'application/json' } })
  }
  for (let index = 0; index < 2; index++) assert.deepEqual(await deliverContact(message, 'https://contact.example.test/inquiries', 'synthetic-token', request as typeof fetch), { accepted: true })
  assert.equal(calls, 2)

  let cancelled = false
  const stream = new ReadableStream<Uint8Array>({ cancel() { cancelled = true } })
  const rejected = new Response(stream, { status: 503 })
  await assert.rejects(deliverContact(message, 'https://contact.example.test/inquiries', 'synthetic-token', (async () => rejected) as typeof fetch), error => error instanceof ContactProblem && error.statusCode === 502)
  assert.equal(cancelled, true)
  let failedCalls = 0
  await assert.rejects(deliverContact(message, 'https://contact.example.test/inquiries', 'synthetic-token', (async () => {
    failedCalls++
    throw new Error('private infrastructure: synthetic-token, review@example.test')
  }) as typeof fetch), error => error instanceof ContactProblem && error.statusCode === 502 && !/private infrastructure|synthetic-token|review@example/.test(error.message))
  assert.equal(failedCalls, 1)
  let blockedCalls = 0
  await assert.rejects(deliverContact(message, 'https://example.test/api/bonds/auth/accounts', 'synthetic-token', (async () => { blockedCalls++; return new Response() }) as typeof fetch), error => error instanceof ContactProblem && error.statusCode === 503)
  assert.equal(blockedCalls, 0)
})

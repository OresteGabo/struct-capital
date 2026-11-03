import assert from 'node:assert/strict'
import { test } from 'node:test'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

async function launch(configured, endpoint = 'https://contact.example.test/inquiries') {
  const probe = createServer()
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve))
  const port = probe.address().port
  await new Promise(resolve => probe.close(resolve))
  const origin = `http://127.0.0.1:${port}`
  const child = spawn(process.execPath, ['.output/server/index.mjs'], {
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1',
      NUXT_PUBLIC_CONTACT_ENABLED: configured ? 'true' : 'false',
      NUXT_CONTACT_ENDPOINT: configured ? endpoint : '',
      NUXT_CONTACT_TOKEN: configured ? 'synthetic-test-secret' : '', NUXT_CONTACT_ORIGIN: origin },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let output = ''
  child.stdout.on('data', chunk => { output += chunk })
  child.stderr.on('data', chunk => { output += chunk })
  for (let attempt = 0; attempt < 60; attempt++) {
    try { const response = await fetch(origin); if (response.ok) return { child, origin, output: () => output } } catch { /* wait for local server */ }
    if (child.exitCode !== null) throw new Error(`Server exited: ${output}`)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  child.kill()
  throw new Error('Local test server did not start')
}
async function stop(child) {
  if (child.exitCode !== null) return
  const ended = new Promise(resolve => child.once('exit', resolve))
  child.kill('SIGTERM')
  await ended
}

test('unconfigured server rejects inquiry without claiming delivery', async () => {
  const server = await launch(false)
  try {
    for (const path of ['/social-studio', '/social-studio-render', '/api/social-export', '/brand-patterns', '/brand-patterns-preview', '/api/pattern-export', '/api/brand-patterns/export']) {
      const hidden = await fetch(`${server.origin}${path}`, { method: path.startsWith('/api/') ? 'POST' : 'GET' })
      assert.equal(hidden.status, 404, path)
      assert.equal(hidden.headers.get('x-frame-options'), 'DENY', path)
      assert.match(hidden.headers.get('content-security-policy'), /frame-ancestors 'none'/, path)
    }
    const response = await fetch(`${server.origin}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Origin': server.origin }, body: '{}' })
    assert.equal(response.status, 503)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    const body = await response.text()
    assert.match(body, /not been sent/)
    assert.doesNotMatch(body, /accepted|synthetic-test-secret|contact\.example/)
  } finally { await stop(server.child) }
})

test('production routes enforce baseline headers, genuine 404s and immutable hashed assets', async () => {
  const server = await launch(false)
  try {
    const home = await fetch(server.origin)
    assert.equal(home.status, 200)
    assert.equal(home.headers.get('x-content-type-options'), 'nosniff')
    assert.equal(home.headers.get('x-frame-options'), 'DENY')
    assert.equal(home.headers.get('referrer-policy'), 'strict-origin-when-cross-origin')
    assert.match(home.headers.get('content-security-policy'), /frame-ancestors 'none'/)
    assert.equal(home.headers.get('cache-control'), 'no-cache')
    const html = await home.text()
    const script = html.match(/src="(\/_nuxt\/[^"]+\.js)"/)[1]
    const asset = await fetch(`${server.origin}${script}`)
    assert.equal(asset.status, 200)
    assert.match(asset.headers.get('cache-control'), /max-age=31536000.*immutable/)
    for (const path of ['/missing-release-test', '/learn/missing-release-test', '/learn/category/missing-release-test', ...(process.env.NUXT_DESIGN_REVIEW_ENABLED === 'true' ? [] : ['/design-system'])]) {
      const response = await fetch(`${server.origin}${path}`, { headers: { Accept: 'text/html' } })
      assert.equal(response.status, 404, path)
      const body = await response.text()
      assert.match(body, /noindex, nofollow/)
      assert.doesNotMatch(body, /stackTrace|synthetic-test-secret|contactEndpoint|contactToken/)
    }
  } finally { await stop(server.child) }
})

test('investor namespace is refused even if inquiry delivery is enabled', async () => {
  const server = await launch(true, 'https://contact.example.test/api/bonds/auth/accounts')
  try {
    const response = await fetch(`${server.origin}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Origin': server.origin }, body: '{}' })
    assert.equal(response.status, 503)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    assert.doesNotMatch(await response.text(), /accepted|synthetic-test-secret|contact\.example|api\/bonds/)
  } finally { await stop(server.child) }
})

test('configured HTTP boundary enforces origin, MIME, byte limits, schema, and rate limit before transport', async () => {
  const server = await launch(true)
  const send = async (body, headers = {}) => {
    const response = await fetch(`${server.origin}/api/contact`, { method: 'POST', headers: { 'Origin': server.origin, 'Content-Type': 'application/json', ...headers }, body })
    assert.equal(response.headers.get('cache-control'), 'no-store', `never cache contact status ${response.status}`)
    assert.equal(response.headers.get('access-control-allow-origin'), null)
    return response
  }
  try {
    assert.equal((await send('{}', { Origin: 'https://outside.example.test' })).status, 403)
    assert.equal((await send('{}', { 'Content-Type': 'text/plain' })).status, 415)
    assert.equal((await send('x'.repeat(17000))).status, 413)
    assert.equal((await send('{malformed')).status, 400)
    const invalid = await send(JSON.stringify({ name: 'Synthetic Test', email: 'review@example.test', topic: 'general', message: 'Synthetic inquiry that must never be forwarded.', consent: false, website: '', startedAt: Date.now() - 5000 }))
    assert.equal(invalid.status, 400)
    const result = await invalid.text()
    assert.match(result, /consent/)
    assert.doesNotMatch(result, /review@example|synthetic-test-secret|contact\.example/)
    const limited = await send('{}')
    assert.equal(limited.status, 429)
    assert.equal(limited.headers.get('retry-after'), '600')
    assert.doesNotMatch(server.output(), /review@example|synthetic-test-secret|Synthetic inquiry that/)
  } finally { await stop(server.child) }
})

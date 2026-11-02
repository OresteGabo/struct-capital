import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { parseSocialFormat, parseSocialPost } from '../shared/social.ts'

const [file = 'social-content/posts/clearer-picture.json', selectedFormat = 'square'] = process.argv.slice(2)
const post = parseSocialPost(JSON.parse(await readFile(file, 'utf8')))
const format = parseSocialFormat(selectedFormat)
const origin = process.env.SOCIAL_STUDIO_ORIGIN ?? 'http://localhost:3000'
const url = new URL(origin)
if (!['localhost', '127.0.0.1'].includes(url.hostname) || url.protocol !== 'http:') throw new Error('Use a local development server.')
const response = await fetch(new URL('/api/social-export', origin), {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: url.origin },
  body: JSON.stringify({ post, format }), signal: AbortSignal.timeout(60000),
})
if (!response.ok) throw new Error(await response.text())
if (!response.headers.get('content-type')?.includes('image/png')) throw new Error('The development export endpoint did not return a PNG.')
await mkdir('exports/social', { recursive: true })
const destination = `exports/social/${post.id}-${format}.png`
await writeFile(destination, Buffer.from(await response.arrayBuffer()))
console.log(destination)
if (response.headers.get('X-Social-Proof') === 'missing-photo') console.log('Draft proof only: a user-provided Kigali photograph is missing.')

import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { compileArticle } from './lib/learning.mjs'

const root = new URL('../', import.meta.url)
const taxonomy = JSON.parse(await readFile(new URL('content/learning.json', root), 'utf8'))
const files = (await readdir(new URL('content/learn/', root))).filter(file => file.endsWith('.md')).sort()
const compiled = await Promise.all(files.map(async file => compileArticle(await readFile(new URL(`content/learn/${file}`, root), 'utf8'), file, taxonomy)))
if (new Set(compiled.map(item => item.article.slug)).size !== compiled.length) throw new Error('Duplicate article slugs')
const destination = new URL('app/generated/learn/', root)
await rm(destination, { recursive: true, force: true })
await mkdir(destination, { recursive: true })
await Promise.all(compiled.map(item => writeFile(new URL(`${item.article.slug}.json`, destination), `${JSON.stringify(item.body)}\n`)))
await writeFile(new URL('shared/learning.generated.json', root), `${JSON.stringify({ ...taxonomy, articles: compiled.map(item => item.article) }, null, 2)}\n`)
console.log(`Compiled ${compiled.length} learning articles from ${fileURLToPath(new URL('content/learn/', root))}`)

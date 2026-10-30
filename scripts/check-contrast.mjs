import { readFileSync } from 'node:fs'

// Check actual CSS roles rather than a second, separately maintained palette.
const css = readFileSync(new URL('../app/assets/css/tokens.css', import.meta.url), 'utf8')
const light = Object.fromEntries([...css.split(':root[data-theme="dark"]')[0].matchAll(/(--sc-[\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]))
const darkBlock = css.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)[1]
const dark = { ...light, ...Object.fromEntries([...darkBlock.matchAll(/(--sc-[\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()])) }
function resolve(roles, key) {
  const value = roles[`--sc-${key}`]
  if (!value) throw new Error(`Unknown role: ${key}`)
  return value.startsWith('var(') ? resolve(roles, value.slice(9, -1)) : value
}
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
  return rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)
}
const pairs = [
  ['text', 'background', 4.5], ['text', 'surface', 4.5],
  ['muted', 'background', 4.5], ['muted', 'surface', 4.5], ['muted', 'surface-muted', 4.5], ['muted', 'surface-raised', 4.5],
  ['primary', 'surface', 4.5], ['on-primary', 'primary', 4.5], ['on-container', 'container', 4.5],
  ['danger', 'surface', 4.5], ['success', 'surface', 4.5], ['warning', 'surface', 4.5],
  ['coupon', 'surface', 4.5], ['maturity', 'surface', 4.5],
  ['outline', 'surface', 3], ['focus', 'background', 3], ['focus', 'surface', 3],
]
let failed = false
for (const [name, roles] of Object.entries({ light, dark })) {
  for (const [foreground, background, minimum] of pairs) {
    const values = [foreground, background].map(key => luminance(resolve(roles, key))).sort((a, b) => b - a)
    const ratio = (values[0] + 0.05) / (values[1] + 0.05)
    if (ratio < minimum) { failed = true; console.error(`${name}: ${foreground}/${background}: ${ratio.toFixed(2)} < ${minimum}`) }
  }
}
if (failed) process.exitCode = 1
else console.log(`Passed ${pairs.length * 2} semantic contrast checks across light and dark themes.`)

<script setup lang="ts">
import HomePage from './index.vue'
import { normalizeBrandPatternConfig } from '~~/shared/brand-pattern-config'
import type { WebsiteBrandPatterns } from '~~/shared/website-brand-patterns'

const route = useRoute()
const settings = ref(normalizeBrandPatternConfig(route.query))
const theme = ref<'light' | 'dark'>(route.query.theme === 'dark' ? 'dark' : 'light')
const previewPatterns = computed<WebsiteBrandPatterns>(() => ({ hero: settings.value, sections: { independence: null, product: null }, dividers: { workflow: null } }))
useHead(() => ({ title: 'Brand pattern preview · local development', htmlAttrs: { 'data-theme': theme.value }, meta: [{ name: 'robots', content: 'noindex, nofollow' }] }))
let observer: ResizeObserver | undefined
async function ready() {
  await nextTick()
  const hero = document.querySelector('.pattern-home-preview .home-hero')
  if (!hero) return
  await document.fonts.ready
  await Promise.all(Array.from(hero.querySelectorAll('img'), img => img.decode().catch(() => undefined)))
  const height = Math.ceil(hero.getBoundingClientRect().bottom + window.scrollY + 2)
  window.parent.postMessage({ type: 'sc-pattern-preview-ready', height, pattern: settings.value.pattern, config: { ...settings.value }, theme: theme.value }, window.location.origin)
}
function receive(event: MessageEvent) {
  if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'sc-pattern-preview-config') return
  settings.value = normalizeBrandPatternConfig(event.data.config)
  theme.value = event.data.theme === 'dark' ? 'dark' : 'light'
}
watch([settings, theme], ready, { deep: true })
onMounted(() => {
  window.addEventListener('message', receive)
  observer = new ResizeObserver(ready)
  const hero = document.querySelector('.pattern-home-preview .home-hero')
  if (hero) observer.observe(hero)
  void ready()
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('message', receive) })
</script>

<template>
  <div class="pattern-home-preview">
    <HomePage :patterns="previewPatterns" />
  </div>
</template>

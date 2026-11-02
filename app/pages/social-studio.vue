<script setup lang="ts">
import SocialEditorial from '../components/social/templates/SocialEditorial.vue'
import { parseSocialPost, socialSizes, type SocialFormat } from '../../shared/social'
import clearer from '../../social-content/posts/clearer-picture.json'
import calendar from '../../social-content/posts/income-calendar.json'

definePageMeta({ layout: false })
useHead({ title: 'Social studio · local development', meta: [{ name: 'robots', content: 'noindex, nofollow' }], htmlAttrs: { 'data-theme': 'light' } })
const drafts = [clearer, calendar]
const selected = ref(clearer.id)
const post = ref(parseSocialPost(clearer))
const format = ref<SocialFormat>('square')
const busy = ref(false)
const status = ref('Draft content. Review copy and assets before publishing.')
const scale = ref(0.5)
const preview = useTemplateRef('preview')
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(([entry]) => { if (entry) scale.value = Math.min(entry.contentRect.width / 1080, 0.6) })
  if (preview.value) observer.observe(preview.value)
})
onBeforeUnmount(() => observer?.disconnect())
watch(selected, (id) => { post.value = parseSocialPost(drafts.find(draft => draft.id === id)) })
async function exportPng() {
  busy.value = true
  status.value = 'Rendering PNG…'
  try {
    const validated = parseSocialPost(post.value)
    const response = await fetch('/api/social-export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ post: validated, format: format.value }) })
    if (!response.ok) throw new Error(await response.text())
    const url = URL.createObjectURL(await response.blob())
    const link = document.createElement('a')
    link.href = url
    link.download = `${validated.id}-${format.value}.png`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    status.value = 'PNG downloaded. Edits are held in memory; update the JSON file to retain them.'
  } catch (error) {
    status.value = error instanceof Error ? error.message : 'Export unavailable.'
  } finally { busy.value = false }
}
</script>

<template>
  <main class="studio sc-container sc-section">
    <header class="sc-stack">
      <p class="text-label text-brand-primary">Struct Capital / Development tools</p>
      <h1 class="text-heading">Social media studio</h1>
      <p>Editable drafts · 1080px canvas · local PNG export</p>
    </header>
    <div class="workspace">
      <form class="sc-card sc-stack" @submit.prevent="exportPng">
        <div><label class="sc-label" for="draft">Draft</label><select id="draft" v-model="selected" class="sc-input"><option v-for="draft in drafts" :key="draft.id" :value="draft.id">{{ draft.id }}</option></select></div>
        <div><label class="sc-label" for="format">Format</label><select id="format" v-model="format" class="sc-input"><option value="square">Square · 1080 × 1080</option><option value="portrait">Portrait · 1080 × 1350</option></select></div>
        <div><label class="sc-label" for="eyebrow">Eyebrow</label><input id="eyebrow" v-model="post.eyebrow" class="sc-input" maxlength="40" required></div>
        <div><label class="sc-label" for="headline">Headline</label><textarea id="headline" v-model="post.headline" class="sc-input" maxlength="100" rows="3" required /></div>
        <div><label class="sc-label" for="body">Body</label><textarea id="body" v-model="post.body" class="sc-input" maxlength="230" rows="5" required /></div>
        <div><label class="sc-label" for="visual">Approved visual</label><select id="visual" v-model="post.visual" class="sc-input"><option value="symbol">Official symbol</option><option value="calendar">Calendar excerpt</option></select></div>
        <ScButton type="submit" :disabled="busy">{{ busy ? 'Rendering…' : 'Download PNG' }}</ScButton>
        <p role="status" class="text-label" :aria-busy="busy">{{ status }}</p>
        <p class="text-label text-muted">Downloads use your browser’s download folder. Use the CLI to save to exports/social/. Changing drafts resets edits.</p>
      </form>
      <section ref="preview" aria-label="Post preview" class="preview">
        <div :style="{ width: `${1080 * scale}px`, height: `${socialSizes[format].height * scale}px` }">
          <SocialEditorial :post="post" :format="format" :style="{ transform: `scale(${scale})`, transformOrigin: 'top left' }" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.workspace { display: grid; gap: 32px; margin-top: 32px; align-items: start; }
.preview { min-width: 0; overflow: hidden; }
@media (min-width: 960px) { .workspace { grid-template-columns: 340px minmax(0, 1fr); } }
</style>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { brandPatternPreviewUrl, normalizeBrandPatternConfig, type BrandPatternConfig } from '~~/shared/brand-pattern-config'
const props = defineProps<{ config: BrandPatternConfig, theme: 'light' | 'dark', width: number, label: string }>()
const frame = useTemplateRef<HTMLIFrameElement>('frame')
const container = useTemplateRef<HTMLElement>('container')
const scale = ref(1)
const height = ref(900)
const ready = ref('')
let observer: ResizeObserver | undefined
const fullSizeUrl = computed(() => brandPatternPreviewUrl(props.config, props.theme))
function send() {
  ready.value = ''
  // Real header links may navigate inside the frame; selecting a setting returns to review.
  try {
    if (frame.value?.contentWindow && frame.value.contentWindow.location.pathname !== '/brand-patterns-preview') {
      frame.value.src = '/brand-patterns-preview'
      return
    }
  } catch { if (frame.value) { frame.value.src = '/brand-patterns-preview'; return } }
  frame.value?.contentWindow?.postMessage({ type: 'sc-pattern-preview-config', config: { ...props.config }, theme: props.theme }, window.location.origin)
}
function receive(event: MessageEvent) {
  if (event.origin !== window.location.origin || event.source !== frame.value?.contentWindow || event.data?.type !== 'sc-pattern-preview-ready') return
  if (typeof event.data.height === 'number' && Number.isFinite(event.data.height)) height.value = Math.max(240, Math.min(2400, event.data.height))
  if (JSON.stringify(normalizeBrandPatternConfig(event.data.config)) !== JSON.stringify(normalizeBrandPatternConfig(props.config)) || event.data.theme !== props.theme) {
    send()
    return
  }
  ready.value = props.config.pattern
}
function resize() {
  if (container.value) scale.value = Math.min(1, container.value.clientWidth / props.width)
}
watch(() => [props.config, props.theme], send, { deep: true })
watch(() => props.width, resize)
onMounted(() => {
  window.addEventListener('message', receive)
  observer = new ResizeObserver(resize)
  if (container.value) observer.observe(container.value)
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('message', receive) })
</script>

<template>
  <div ref="container" class="pattern-frame" :data-preview-ready="ready">
    <p class="text-label text-muted">{{ width }}px viewport · {{ Math.round(scale * 100) }}% display scale · {{ theme }}</p>
    <div class="pattern-frame__window" :style="{ width: `${width * scale}px`, height: `${height * scale}px` }">
      <iframe ref="frame" src="/brand-patterns-preview" :title="label" :width="width" :height="height" :style="{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }" @load="send" />
    </div>
    <a :href="fullSizeUrl" class="sc-link text-label" target="_blank" rel="noopener">Open {{ label }} at full size<span class="sr-only"> in a new tab</span></a>
  </div>
</template>

<style scoped>
.pattern-frame { min-width: 0; display: grid; gap: 12px; align-content: start; }
.pattern-frame__window { max-width: 100%; overflow: hidden; border: 1px solid var(--sc-border); background: var(--sc-background); }
iframe { display: block; max-width: none; border: 0; transform-origin: top left; }
</style>

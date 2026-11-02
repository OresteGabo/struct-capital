<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import { kigaliPhotos } from '../../../../shared/social-photos'
import SocialCanvas from '../SocialCanvas.vue'
const props = defineProps<{ post: SocialPost, format: SocialFormat }>()
const photo = computed(() => kigaliPhotos.find(item => item.id === props.post.photoId))
const failed = ref(false)
watch(() => props.post.photoId, () => { failed.value = false })
</script>

<template>
  <SocialCanvas :format="format" class="kigali" :class="[`kigali--${post.theme ?? 'ivory'}`, `kigali--${format}`]">
    <header class="identity">
      <img src="/brand/struct-capital-symbol.svg" alt="Struct Capital symbol" width="56" height="56">
      <span>Struct Capital</span>
    </header>
    <p class="eyebrow">{{ post.eyebrow }}</p>
    <div class="copy" data-social-text>
      <h2>{{ post.headline }}</h2>
      <p class="subtitle">{{ post.body }}</p>
    </div>
    <figure class="photograph">
      <div class="photo-window">
        <img
          v-if="photo && !failed" :src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height"
          :style="{ objectPosition: `${post.cropX}% ${post.cropY}%` }" decoding="async" loading="eager"
          @error="failed = true"
        >
        <div v-else class="missing" role="note" data-social-missing-photo :data-social-asset-error="failed ? '' : undefined">
          <span class="missing-index">PHOTO / PENDING</span>
          <strong>{{ failed ? 'Photograph unavailable.' : 'A real Kigali photograph belongs here.' }}</strong>
          <span>User-provided city image required.<br>No substitute imagery used.</span>
        </div>
      </div>
      <figcaption>{{ photo && !failed ? photo.credit : 'DRAFT PROOF · KIGALI PHOTOGRAPH MISSING' }}</figcaption>
    </figure>
    <div v-if="post.pattern !== 'none'" class="signature" :class="{ 'signature--rhythm': post.pattern === 'rhythm' }" aria-hidden="true">
      <span v-for="index in post.pattern === 'rhythm' ? 3 : 1" :key="index" />
    </div>
    <footer><span>structcapital.net</span><span>Independent software. Not a broker.</span></footer>
  </SocialCanvas>
</template>

<style scoped>
.kigali { --editorial-accent: var(--sc-ink); padding: 64px 72px; }
.kigali--olive { --editorial-accent: var(--sc-olive); }
.identity { display: flex; align-items: center; gap: 16px; font-size: 28px; font-weight: 650; }
.identity img { width: 56px; height: 56px; }
.eyebrow { margin-top: 52px; color: var(--sc-olive); text-transform: uppercase; font-size: 18px; letter-spacing: .14em; font-weight: 600; }
.copy { position: relative; z-index: 1; width: 825px; margin-top: 26px; }
h2 { color: var(--editorial-accent); font-size: 88px; line-height: 1.04; letter-spacing: -.055em; max-width: 800px; overflow-wrap: anywhere; }
.subtitle { width: 610px; margin-top: 30px; font-size: 28px; line-height: 1.5; overflow-wrap: anywhere; }
.photograph { position: absolute; left: 318px; right: 0; top: 610px; bottom: 138px; margin: 0; }
.photo-window { height: calc(100% - 32px); overflow: hidden; background: var(--sc-surface-muted); border-left: 4px solid var(--sc-olive); }
.photo-window > img { width: 100%; height: 100%; max-width: none; object-fit: cover; }
figcaption { padding-top: 10px; font-size: 12px; line-height: 1.5; letter-spacing: .08em; color: var(--sc-olive); }
.missing { display: flex; height: 100%; flex-direction: column; justify-content: center; align-items: flex-start; gap: 14px; padding: 32px 44px; color: var(--sc-ink); }
.missing-index { color: var(--sc-olive); font-size: 13px; letter-spacing: .14em; }
.missing strong { font-size: 26px; line-height: 1.2; max-width: 390px; }
.missing > span:last-child { font-size: 18px; line-height: 1.5; }
.signature { position: absolute; left: 72px; bottom: 182px; display: flex; gap: 10px; align-items: flex-end; }
.signature span { display: block; width: 64px; height: 64px; background: var(--sc-olive); mask: url('/brand/struct-capital-symbol.svg') center / contain no-repeat; }
.signature--rhythm span { width: 42px; height: 42px; }
.signature--rhythm span:nth-child(2) { opacity: .5; transform: translateY(-22px); }
.signature--rhythm span:nth-child(3) { opacity: .25; transform: translateY(-44px); }
footer { position: absolute; left: 72px; right: 72px; bottom: 56px; display: flex; justify-content: space-between; border-top: 1px solid var(--sc-olive); padding-top: 20px; font-size: 17px; color: var(--sc-olive); }
.kigali--portrait .eyebrow { margin-top: 72px; }
.kigali--portrait .copy { margin-top: 34px; }
.kigali--portrait h2 { max-width: 780px; font-size: 100px; }
.kigali--portrait .subtitle { width: 590px; }
.kigali--portrait .photograph { top: 760px; left: 238px; }
</style>

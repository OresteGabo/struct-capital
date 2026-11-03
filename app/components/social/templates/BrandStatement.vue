<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import { brandPhotos } from '../../../../shared/social-photos'
import SocialCanvas from '../SocialCanvas.vue'
const props = defineProps<{ post: SocialPost, format: SocialFormat }>()
const photo = computed(() => brandPhotos.find(item => item.id === props.post.statement?.photoId))
const failed = ref(false)
watch(() => props.post.statement?.photoId, () => { failed.value = false })
</script>

<template>
  <SocialCanvas v-if="post.statement" :format="format" class="statement" :class="[`statement--${post.statement.variation}`, `statement--${post.statement.theme}`, `statement--${format}`]">
    <header class="identity" data-statement-header>
      <img :src="post.statement.theme === 'olive' ? '/brand/struct-capital-symbol-reversed.svg' : '/brand/struct-capital-symbol.svg'" alt="Struct Capital symbol" width="56" height="56">
      <span>{{ post.statement.brand }}</span><p>{{ post.eyebrow }}</p>
    </header>
    <figure v-if="post.statement.variation === 'photography'" class="photography" data-statement-photo>
      <div class="photo-window">
        <img
          v-if="photo && !failed" :src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height"
          :style="{ objectPosition: `${post.statement.cropX}% ${post.statement.cropY}%` }" decoding="async" loading="eager" @error="failed = true"
        >
        <div v-else class="missing" role="note" data-social-missing-photo :data-social-asset-error="failed ? '' : undefined">
          <span>PHOTOGRAPH / PENDING</span>
          <strong>{{ failed ? 'Photograph unavailable.' : 'A real Rwanda photograph belongs here.' }}</strong>
          <p>User-provided Kigali or Rwanda image required.<br>No substitute imagery used.</p>
        </div>
      </div>
      <figcaption>{{ photo && !failed ? photo.credit : 'DRAFT PROOF · RWANDA PHOTOGRAPH MISSING' }}</figcaption>
    </figure>
    <div class="statement-main">
      <div class="statement-copy" data-statement-copy>
        <span v-if="post.statement.pattern === 'rule'" class="gold-rule" aria-hidden="true" />
        <h2>{{ post.headline }}</h2>
        <p class="body">{{ post.body }}</p>
      </div>
    </div>
    <footer data-statement-footer>
      <div class="footer-copy"><p>{{ post.statement.footer }}</p><p>{{ post.statement.note }}</p></div>
      <span v-if="post.statement.pattern === 'signature'" class="signature" aria-hidden="true" />
    </footer>
  </SocialCanvas>
</template>

<style scoped>
.statement { --statement-text: var(--sc-olive); --statement-body: var(--sc-ink); padding: 56px 72px; color: var(--statement-text); }
.statement.statement--olive { --statement-text: var(--sc-cream); --statement-body: var(--sc-cream); background: var(--sc-olive); }
.identity { display: flex; align-items: center; gap: 16px; }
.identity > img { width: 56px; height: 56px; flex: none; }
.identity > span { font-size: 26px; font-weight: 650; max-width: 380px; overflow-wrap: anywhere; }
.identity > p { margin-left: auto; text-align: right; max-width: 330px; font-size: 17px; letter-spacing: .06em; overflow-wrap: anywhere; }
.statement-main { display: flex; align-items: center; flex: 1; min-height: 0; padding-block: 40px; }
.statement-copy { width: 100%; }
h2 { color: var(--statement-text); font-size: 112px; line-height: 1.04; letter-spacing: -.055em; overflow-wrap: normal; }
.body { color: var(--statement-body); font-size: 32px; line-height: 1.5; max-width: 850px; margin-top: 36px; overflow-wrap: anywhere; }
.gold-rule { display: block; width: 64px; height: 4px; background: var(--sc-gold); margin-bottom: 24px; }
footer { display: flex; justify-content: space-between; gap: 32px; align-items: flex-end; }
.footer-copy { font-size: 18px; line-height: 1.5; max-width: 800px; overflow-wrap: anywhere; }
.footer-copy p + p { margin-top: 8px; }
.signature { display: block; width: 56px; height: 56px; flex: none; background: var(--statement-text); mask: url('/brand/struct-capital-symbol.svg') center / contain no-repeat; }
.photography { flex: none; margin-top: 32px; }
.photo-window { height: 350px; overflow: hidden; background: var(--sc-surface-muted); color: var(--sc-ink); }
.photo-window > img { display: block; width: 100%; height: 100%; max-width: none; object-fit: cover; }
.missing { height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 16px; padding: 40px; }
.missing > span { font-size: 14px; letter-spacing: .1em; color: var(--sc-olive); }
.missing strong { font-size: 32px; line-height: 1.25; }
.missing p { font-size: 21px; line-height: 1.5; }
figcaption { margin-top: 10px; font-size: 14px; line-height: 1.5; letter-spacing: .06em; overflow-wrap: anywhere; }
.statement--photography h2 { font-size: 76px; }
.statement--photography .statement-main { padding-block: 28px; }
.statement--photography .body { font-size: 27px; margin-top: 20px; }
.statement--portrait h2 { font-size: 128px; }
.statement--portrait .body { font-size: 36px; }
.statement--portrait .photo-window { height: 530px; }
.statement--portrait.statement--photography h2 { font-size: 88px; }
.statement--portrait.statement--photography .body { font-size: 30px; }
</style>

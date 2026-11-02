<script setup lang="ts">
import { socialSizes, type SocialFormat } from '../../../shared/social'
defineProps<{ format: SocialFormat }>()
</script>

<template>
  <article data-social-canvas data-theme="light" class="social-canvas" :style="{ width: `${socialSizes[format].width}px`, height: `${socialSizes[format].height}px` }">
    <slot />
  </article>
</template>

<style scoped>
.social-canvas {
  --sc-background: #faf8f2;
  --sc-border: #d9d5c5;
  --sc-primary: var(--sc-olive);
  --sc-text: var(--sc-ink);
  --sc-muted: #625f50;
  position: relative; display: flex; flex-direction: column; overflow: hidden;
  box-sizing: border-box; padding: 72px; background: var(--sc-background); color: var(--sc-ink);
  font-family: var(--sc-font); color-scheme: light;
}
</style>

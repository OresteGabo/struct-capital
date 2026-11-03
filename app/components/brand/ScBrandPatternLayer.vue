<script setup lang="ts">
import { computed } from 'vue'
import ScBrandPattern from './ScBrandPattern.vue'
import { normalizeBrandPatternConfig, type BrandPatternConfig } from '~~/shared/brand-pattern-config'
const props = defineProps<{ config: BrandPatternConfig }>()
const settings = computed(() => normalizeBrandPatternConfig(props.config))
</script>

<template>
  <div class="sc-pattern-layer" aria-hidden="true" inert>
    <div class="sc-pattern-layer__position" :style="{ transform: `translate(${settings.x}%, ${settings.y}%) scale(${settings.scale})` }">
      <ScBrandPattern :pattern="settings.pattern" :layout="settings.layout" :intensity="settings.intensity" />
    </div>
  </div>
</template>

<style scoped>
.sc-pattern-layer { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: -1; }
.sc-pattern-layer__position { position: absolute; bottom: 0; left: 0; width: 100%; transform-origin: bottom right; }
</style>

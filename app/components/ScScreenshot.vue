<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt: string
  width: number
  height: number
  caption: string
  srcset?: string
  sizes?: string
  priority?: boolean
  frame?: boolean
  fullSize?: boolean
}>(), { priority: false, frame: true, fullSize: false, src: undefined, srcset: undefined, sizes: undefined })
const failed = ref(false)
watch(() => props.src, () => { failed.value = false })
</script>

<template>
  <figure class="sc-stack">
    <div class="overflow-hidden" :class="frame ? 'rounded-card border border-border bg-surface-muted' : undefined" :style="{ aspectRatio: `${width} / ${height}` }">
      <img
        v-if="src && !failed" :src="src" :alt="alt" :width="width" :height="height"
        :srcset="srcset" :sizes="sizes" :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'" decoding="async" class="h-full w-full object-contain"
        @error="failed = true"
      >
      <div v-else class="flex h-full items-center justify-center p-6 text-center text-label text-muted" role="status">
        {{ failed ? 'Product screenshot unavailable.' : 'Product screenshot pending approval.' }}
      </div>
    </div>
    <figcaption class="text-label text-muted">
      {{ caption }}
      <a v-if="fullSize && src && !failed" :href="src" class="sc-link mt-2 inline-block">View full-size screenshot<span class="sr-only">: {{ alt }}</span></a>
    </figcaption>
  </figure>
</template>

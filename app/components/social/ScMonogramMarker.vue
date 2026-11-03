<script setup lang="ts">
import symbol from '../../../public/brand/struct-capital-symbol.svg?raw'
const props = defineProps<{ part: 'S-ribbon' | 'C-upper' | 'C-lower' }>()
const fragments = {
  'S-ribbon': '350 270 230 345',
  'C-upper': '490 310 170 160',
  'C-lower': '563 446 98 134',
} as const
// Read the real master instead of maintaining copied or approximate path data.
const paths = Object.fromEntries(Object.keys(fragments).map((id) => {
  const path = symbol.match(new RegExp(`<path\\b[^>]*\\bid="${id}"[^>]*\\bd="([^"]+)"`))?.[1]
  if (!path) throw new Error(`Official SC monogram fragment missing: ${id}`)
  return [id, path]
}))
</script>

<template>
  <svg :viewBox="fragments[props.part]" width="80" height="80" aria-hidden="true" focusable="false" :data-sc-fragment="part">
    <path :d="paths[props.part]" fill="currentColor" />
  </svg>
</template>

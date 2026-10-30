<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'default' | 'muted' | 'raised' | 'brand' }>(), { variant: 'default' })
</script>

<template>
  <div class="sc-card" :class="`sc-card--${variant}`">
    <slot />
  </div>
</template>

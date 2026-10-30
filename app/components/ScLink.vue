<script setup lang="ts">
withDefaults(defineProps<{
  to: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'inline'
  external?: boolean
}>(), { variant: 'inline', external: false })
</script>

<template>
  <NuxtLink :to="to" :external="external" :class="variant === 'inline' ? 'sc-link' : ['sc-button', `sc-button--${variant}`]">
    <slot />
  </NuxtLink>
</template>

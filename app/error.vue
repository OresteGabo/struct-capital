<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
useSiteSeo({ title: props.error.statusCode === 404 ? 'Page not found' : 'Page unavailable', noindex: true })
</script>

<template>
  <NuxtLayout>
    <ScContainer class="sc-section sc-stack">
      <ScSectionHeading :level="1" :title="error.statusCode === 404 ? 'Page not found' : 'This page is unavailable'" description="You can return to the homepage and try again." />
      <a href="/" class="sc-button sc-button--primary justify-self-start">Return home</a>
    </ScContainer>
  </NuxtLayout>
</template>

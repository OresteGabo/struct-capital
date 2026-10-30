<script setup lang="ts">
defineProps<{ title: string, description: string, label: string, eyebrow?: string }>()
</script>

<template>
  <div class="sc-stack pt-8 pb-12 md:pb-16">
    <ScBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label }]" />
    <ScSectionHeading :level="1" :eyebrow="eyebrow" :title="title" :description="description" />
  </div>
</template>

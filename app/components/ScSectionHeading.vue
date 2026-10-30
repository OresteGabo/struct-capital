<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  eyebrow?: string
  description?: string
  level?: 1 | 2 | 3
  id?: string
}>(), { level: 2, eyebrow: undefined, description: undefined, id: undefined })
</script>

<template>
  <div class="sc-stack sc-reading">
    <p v-if="eyebrow" class="text-label font-semibold text-brand-primary">{{ eyebrow }}</p>
    <component :is="`h${level}`" :id="id" :class="level === 1 ? 'text-display' : 'text-heading'">{{ title }}</component>
    <p v-if="description" :class="level === 1 ? 'text-lead text-muted' : 'text-muted'">{{ description }}</p>
  </div>
</template>

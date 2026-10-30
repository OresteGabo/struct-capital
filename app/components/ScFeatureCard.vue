<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  level?: 2 | 3
  to?: string
  linkLabel?: string
}>(), { level: 3, to: undefined, linkLabel: undefined })
</script>

<template>
  <article class="h-full">
    <ScCard class="sc-stack h-full">
      <div v-if="$slots.icon" class="text-brand-primary" aria-hidden="true"><slot name="icon" /></div>
      <component :is="`h${level}`" class="text-title">{{ title }}</component>
      <p class="text-muted">{{ description }}</p>
      <ScLink v-if="to && linkLabel" :to="to" class="justify-self-start self-end">{{ linkLabel }}</ScLink>
    </ScCard>
  </article>
</template>

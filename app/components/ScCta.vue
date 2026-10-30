<script setup lang="ts">
defineProps<{ title: string, description: string, to: string, label: string }>()
const headingId = useId()
</script>

<template>
  <section :aria-labelledby="headingId" class="sc-card sc-card--brand grid items-center gap-6 p-6 md:grid-cols-[1fr_auto] md:p-10">
    <div class="sc-stack sc-reading">
      <h2 :id="headingId" class="text-heading">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <ScLink :to="to" variant="primary" class="justify-self-start">{{ label }}</ScLink>
  </section>
</template>

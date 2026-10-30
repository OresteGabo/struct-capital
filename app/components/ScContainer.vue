<script setup lang="ts">
withDefaults(defineProps<{ narrow?: boolean }>(), { narrow: false })
</script>

<template>
  <div class="sc-container" :class="{ 'sc-container--narrow': narrow }"><slot /></div>
</template>

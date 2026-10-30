<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), { variant: 'primary', type: 'button', disabled: false })
</script>

<template>
  <button :type="type" :disabled="disabled" class="sc-button" :class="`sc-button--${variant}`">
    <slot />
  </button>
</template>

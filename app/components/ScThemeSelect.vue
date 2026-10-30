<script setup lang="ts">
const theme = useState<'system' | 'light' | 'dark'>('sc-theme', () => 'system')
const id = useId()
useHead(() => ({ htmlAttrs: { 'data-theme': theme.value === 'system' ? undefined : theme.value } }))
</script>

<template>
  <div>
    <label :for="id" class="sc-label">Appearance</label>
    <select :id="id" v-model="theme" class="sc-input">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>
</template>

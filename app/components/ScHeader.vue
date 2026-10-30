<script setup lang="ts">
import { navigation, isNavigationCurrent } from '~~/shared/site'

const route = useRoute()
const disclosure = useTemplateRef<HTMLDetailsElement>('disclosure')
const menuId = useId()
function closeMenu(restoreFocus = false) {
  if (!disclosure.value?.open) return
  disclosure.value.open = false
  if (restoreFocus) disclosure.value.querySelector('summary')?.focus()
}
watch(() => route.fullPath, () => closeMenu())
function isCurrent(to: string) {
  return isNavigationCurrent(route.fullPath, to)
}
</script>

<template>
  <header class="border-b border-border bg-surface">
    <ScContainer class="flex items-center justify-between gap-4 py-5">
      <NuxtLink to="/" aria-label="Struct Capital home" class="min-w-0"><ScBrand /></NuxtLink>
      <nav aria-label="Primary" class="hidden gap-2 lg:flex">
        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to" class="sc-nav-link" :aria-current="isCurrent(item.to) ? (item.to.includes('#') ? 'location' : 'page') : undefined">{{ item.label }}</NuxtLink>
      </nav>
      <details ref="disclosure" class="sc-mobile-nav lg:hidden" @keydown.esc.prevent.stop="closeMenu(true)">
        <summary class="sc-button sc-button--outline" :aria-controls="menuId">Menu</summary>
        <nav :id="menuId" aria-label="Mobile primary" class="sc-mobile-nav-panel">
          <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to" class="sc-nav-link" :aria-current="isCurrent(item.to) ? (item.to.includes('#') ? 'location' : 'page') : undefined" @click="closeMenu()">{{ item.label }}</NuxtLink>
        </nav>
      </details>
    </ScContainer>
  </header>
</template>

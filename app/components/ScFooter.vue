<script setup lang="ts">
import { footerNavigation, legalNavigation, isNavigationCurrent } from '~~/shared/site'
const route = useRoute()
</script>

<template>
  <footer class="border-t border-border bg-surface py-10">
    <ScContainer class="grid gap-8 md:grid-cols-2">
      <div class="sc-stack">
        <ScBrand />
        <p class="sc-reading text-label text-muted">Independent portfolio management software. Struct Capital is not a broker, exchange, or custodian. It does not execute trades or hold investment funds.</p>
        <p class="text-caption text-muted">Struct Capital · A clearer view, across brokers.</p>
      </div>
      <div class="sc-stack md:justify-items-end">
        <nav aria-label="Footer" class="flex flex-wrap gap-2">
          <NuxtLink v-for="item in footerNavigation" :key="item.to" :to="item.to" class="sc-nav-link" :aria-current="isNavigationCurrent(route.fullPath, item.to) ? (item.to.includes('#') ? 'location' : 'page') : undefined">{{ item.label }}</NuxtLink>
        </nav>
        <nav aria-label="Legal drafts" class="flex flex-wrap gap-5 text-label">
          <ScLink v-for="item in legalNavigation" :key="item.to" :to="item.to">{{ item.label }}</ScLink>
        </nav>
        <ScThemeSelect />
      </div>
    </ScContainer>
  </footer>
</template>

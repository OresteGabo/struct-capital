<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#main" class="sc-skip">Skip to content</a>
    <ScHeader />
    <main id="main" tabindex="-1" class="flex-1"><slot /></main>
    <ScFooter />
  </div>
</template>

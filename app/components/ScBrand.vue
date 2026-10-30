<template>
  <span class="inline-flex items-center gap-3 font-semibold text-lg sm:text-title">
    <span class="sc-brand-mark" aria-hidden="true" />
    <span>Struct Capital</span>
  </span>
</template>

<style scoped>
.sc-brand-mark {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background: var(--sc-primary);
  mask: url('/brand/struct-capital-symbol.svg') center / contain no-repeat;
}
@media (min-width: 40rem) { .sc-brand-mark { width: 2.5rem; height: 2.5rem; } }
</style>

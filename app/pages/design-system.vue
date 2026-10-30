<script setup lang="ts">
useSiteSeo({ title: 'Design system', description: 'Internal review of Struct Capital website components and brand tokens.', noindex: true })
const exampleName = ref('')
const exampleMessage = ref('')
const exampleChoice = ref('general')
const exampleChecked = ref(false)
const simulatedFailure = ref(true)
const buttonStatus = ref('Choose a specimen to check its interaction state.')
const swatches = [
  { label: 'Olive', value: '#6D5E0F', color: 'var(--sc-olive)' },
  { label: 'Cream', value: '#F2E6A7', color: 'var(--sc-cream)' },
  { label: 'Ink', value: '#252317', color: 'var(--sc-ink)' },
  { label: 'Gold', value: '#ECC75F', color: 'var(--sc-gold)' },
  { label: 'Sage', value: '#739A87', color: 'var(--sc-sage)' },
]
</script>

<template>
  <div>
    <ScContainer>
      <div class="pt-8"><ScBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Design system' }]" /></div>
      <section id="identity" class="sc-section sc-stack">
        <p class="text-label font-semibold text-brand-primary">Design foundation · Internal review</p>
        <h1 class="text-display sc-reading">A familiar identity.<br>Room to grow on the web.</h1>
        <p class="text-lead text-muted sc-reading">
          Struct Capital’s mobile palette, rounded surfaces, and clear typography translated into a reusable website foundation.
        </p>
        <p class="text-label text-muted sc-reading">
          This is a component review, not the finished marketing website. Struct Capital is independent portfolio management software, not a broker, exchange, or custodian.
        </p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <ScCard v-for="swatch in swatches" :key="swatch.label">
            <div class="mb-4 h-16 rounded-control border border-outline" :style="{ backgroundColor: swatch.color }" />
            <p class="font-semibold">{{ swatch.label }}</p>
            <p class="text-label text-muted sc-financial">{{ swatch.value }}</p>
          </ScCard>
        </div>
      </section>
      <section id="surfaces" class="sc-section sc-stack border-t border-border">
        <h2 class="text-heading">Surfaces with a clear hierarchy</h2>
        <p class="text-muted sc-reading">Quiet backgrounds, warm containers, and 24-pixel panel corners drawn from the application.</p>
        <div class="grid gap-5 md:grid-cols-2">
          <ScCard><h3 class="text-title">Default panel</h3><p class="mt-3 text-muted">Primary content on the base surface.</p></ScCard>
          <ScCard variant="muted"><h3 class="text-title">Muted panel</h3><p class="mt-3 text-muted">Supporting context with a quieter background.</p></ScCard>
          <ScCard variant="raised"><h3 class="text-title">Raised panel</h3><p class="mt-3 text-muted">Restrained elevation for grouped content.</p></ScCard>
          <ScCard variant="brand"><h3 class="text-title">Brand container</h3><p class="mt-3">Cream and olive retain their relationship in either appearance.</p></ScCard>
        </div>
      </section>
      <section id="controls" class="sc-section sc-stack border-t border-border">
        <h2 class="text-heading">Controls, type, and data</h2>
        <p class="text-muted sc-reading">Buttons update a local review message only; they do not submit information or invoke product actions.</p>
        <div class="flex flex-wrap gap-3">
          <ScButton @click="buttonStatus = 'Primary specimen activated.'">Primary</ScButton>
          <ScButton variant="secondary" @click="buttonStatus = 'Secondary specimen activated.'">Secondary</ScButton>
          <ScButton variant="outline" @click="buttonStatus = 'Outlined specimen activated.'">Outlined</ScButton>
          <ScButton variant="text" @click="buttonStatus = 'Text specimen activated.'">Text action</ScButton>
          <ScButton disabled>Disabled</ScButton>
        </div>
        <p role="status" class="text-label text-muted">{{ buttonStatus }}</p>
        <div class="grid gap-5 md:grid-cols-2">
          <ScCard class="sc-stack">
            <h3 class="text-title">Form specimen</h3>
            <div>
              <label for="sample-field" class="sc-label">Example text field</label>
              <input id="sample-field" class="sc-input" placeholder="Disabled review specimen" disabled aria-describedby="field-note">
              <p id="field-note" class="mt-2 text-label text-muted">No information is collected or submitted.</p>
            </div>
            <div>
              <label for="sample-error" class="sc-label">Error treatment</label>
              <input id="sample-error" class="sc-input" value="Example value" readonly aria-invalid="true" aria-describedby="example-error">
              <p id="example-error" class="mt-2 text-label text-danger">Example validation message.</p>
            </div>
          </ScCard>
          <ScCard class="sc-stack">
            <h3 class="text-title">Chart and status conventions</h3>
            <p class="text-muted">Use labels and patterns alongside color. Gold and sage identify categories, not gains or losses.</p>
            <ul class="grid gap-3 text-label">
              <li class="flex items-center gap-3"><span class="size-4 rounded-full border border-outline bg-chart-shares" />Shares · Gold</li>
              <li class="flex items-center gap-3"><span class="size-4 rounded-full border border-outline bg-chart-bonds" />Bonds · Sage</li>
              <li class="text-chart-coupon">Coupons · Blue</li>
              <li class="text-chart-maturity">Maturities · Green</li>
            </ul>
            <p class="sc-financial text-title">0123456789 <span class="text-label text-muted">Tabular number specimen</span></p>
          </ScCard>
        </div>
      </section>
      <section class="sc-section sc-stack border-t border-border" aria-labelledby="patterns-heading">
        <ScSectionHeading id="patterns-heading" title="Reusable content patterns" description="Component specimens only. No platform statistics or private screenshots are published." />
        <div class="grid gap-5 md:grid-cols-2">
          <ScFeatureCard title="Feature card" description="A reusable content card with an optional, clearly named link." to="/#questions" link-label="Read product questions" />
          <ScStatistic label="Platform statistic" state="unavailable" />
        </div>
        <ScFaq :items="[{ question: 'Can this accordion work without JavaScript?', answer: 'Yes. It uses native details and summary elements with keyboard support.' }]" />
        <div class="grid items-start gap-8 md:grid-cols-2">
          <div class="sc-stack">
            <ScInput v-model="exampleName" label="Name specimen" autocomplete="off" hint="Local preview only. Nothing is submitted." />
            <ScInput v-model="exampleMessage" label="Message specimen" multiline error="Example error: check this field." />
            <ScSelect v-model="exampleChoice" label="Topic specimen" :options="[{ label: 'General', value: 'general' }, { label: 'Feedback', value: 'feedback' }]" />
            <ScCheckbox v-model="exampleChecked" label="Checkbox specimen" hint="This is not a consent request." />
            <ScState v-if="simulatedFailure" kind="error" title="Example unavailable state" description="The retry button clears this local demonstration." retryable @retry="simulatedFailure = false" />
            <ScState v-else kind="empty" title="Demonstration cleared" description="No network request was made." />
            <ScState kind="loading" title="Loading specimen" description="A static demonstration of a busy region." />
          </div>
          <ScScreenshot alt="Approved mobile product screenshot" :width="1408" :height="2974" caption="Placeholder: original screenshots remain private until reviewed and redacted." class="mx-auto w-full max-w-72" />
        </div>
        <ScCta title="Call-to-action pattern" description="Use a real destination and an action label that explains where it leads." to="/" label="Return to overview" />
      </section>
    </ScContainer>
  </div>
</template>

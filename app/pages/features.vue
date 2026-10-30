<script setup lang="ts">
useSiteSeo({ title: 'Investment portfolio features', description: 'Explore Struct Capital’s bond and share records, supported PDF imports, income schedules, investment history, and reports—with clear limitations.' })
const features = [
  { title: 'Treasury bond records', description: 'Keep purchase terms, principal, coupon details, maturity dates, and broker references together. For example, return to the confirmed terms behind a bond’s expected income.' },
  { title: 'Share purchases & history', description: 'Organize share quantities, purchase costs, recorded fees, and investment history. Keep purchases from different intermediaries in context without placing trades in the app.' },
  { title: 'Supported PDF imports', description: 'Start with a supported financial document and review the extracted details before saving. A document layout must be supported; scanned or unfamiliar PDFs may not import successfully.' },
  { title: 'Income schedules', description: 'Follow expected coupon dates and maturities. Confirmed dates, estimates, and recorded receipts should be read as different kinds of information—not guaranteed payments.' },
  { title: 'Allocation & estimated values', description: 'Review portfolio composition, recorded costs, and valuation information when prices are available. Missing or dated prices limit what an estimate can tell you.' },
  { title: 'Portfolio & annual PDF reports', description: 'Bring investment records into reports with supporting assumptions and date context. A report is not a broker statement, tax filing, or independently audited valuation.' },
]
</script>

<template>
  <ScContainer>
    <ScPageIntro label="Features" eyebrow="Inside Struct Capital" title="Keep the detail. See the picture." description="Tools for understanding Treasury bonds, shares, income, and investment documents across brokers." />
    <section class="pb-14" aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading" class="sr-only">Existing application capabilities</h2>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><ScFeatureCard v-for="feature in features" :key="feature.title" :title="feature.title" :description="feature.description" /></div>
    </section>
    <section class="sc-page-section border-t border-border" aria-labelledby="examples-heading">
      <ScSectionHeading id="examples-heading" title="A real look at the details" description="Captured app views, cropped to exclude account identity and financial balances. Dates shown are not a live schedule." />
      <div class="mt-8 grid items-start gap-8 md:grid-cols-2">
        <ScScreenshot src="/product/calendar-detail-700.png" :width="700" :height="934" alt="Actual Struct Capital calendar with subscription dates and labeled coupon and maturity events." caption="Calendar · Captured dates, not current market guidance." full-size class="mx-auto w-full max-w-sm" />
        <div class="sc-stack">
          <ScScreenshot src="/product/reports-detail-900.png" :width="900" :height="397" alt="Actual annual report card in the app document library." caption="Annual report · Document library excerpt." full-size />
          <ScCard variant="muted" class="sc-stack"><h3 class="text-title">A practical example</h3><p class="text-muted">After recording a supported bond purchase, you can review its terms, follow its coupon schedule, and return to the source document. For shares, review purchase quantities and fees alongside available valuation information.</p><p class="text-label text-muted">This is a workflow example, not sample financial data or a promise of returns.</p></ScCard>
        </div>
      </div>
    </section>
    <section class="sc-page-section border-t border-border" aria-labelledby="limits-heading">
      <ScSectionHeading id="limits-heading" title="Useful tools. Honest boundaries." />
      <ul class="sc-prose-list mt-6"><li>Manual entry and document imports are limited to the investment records and formats supported by the app.</li><li>Supporting documents from an institution does not establish a partnership or account connection.</li><li>Official download links have not been published here. This page does not establish public app-store availability.</li><li>Struct Capital does not execute trades, hold investment funds, or guarantee valuations or income.</li></ul>
    </section>
    <div class="pb-14"><ScCta title="Start with your records" description="See how supported entry and imports become an organized portfolio view." to="/how-it-works" label="See how it works" /></div>
  </ScContainer>
</template>

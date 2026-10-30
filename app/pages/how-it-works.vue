<script setup lang="ts">
useSiteSeo({ title: 'How it works', description: 'Learn how to add supported investments, import financial PDFs, review extracted data, and follow holdings and income without connecting a broker account.' })
const steps = [
  { title: 'Start with your own investment records', description: 'You continue investing through your chosen licensed intermediary. Use the app’s available bond and share entry tools to record supported purchases, or choose a supported PDF.' },
  { title: 'Import a supported document', description: 'Select the appropriate investment document in the app. Import support depends on the type, layout, and readability of the file; a PDF extension alone does not establish compatibility.' },
  { title: 'Review before saving', description: 'Compare extracted amounts, dates, quantities, fees, and instrument identifiers with your original document. Resolve missing or inconsistent information before saving. An import may fail or require correction.' },
  { title: 'Keep holdings and evidence together', description: 'Organize recorded purchases and supporting documents. A PDF import records information; it does not establish continuous access to a brokerage account.' },
  { title: 'Follow income and investment information', description: 'Review holdings, investment history, coupon schedules, reports, and available valuation information. Distinguish estimated values and expected income from confirmed records.' },
]
</script>

<template>
  <ScContainer>
    <ScPageIntro label="How it works" eyebrow="From records to perspective" title="A clearer picture starts with the details." description="Add supported investments, review their source information, and keep everything in context." />
    <div class="grid items-start gap-12 pb-14 lg:grid-cols-[1fr_0.7fr]">
      <ol class="grid gap-8">
        <li v-for="(step, index) in steps" :key="step.title" class="border-t border-border pt-6"><span class="text-label font-semibold text-brand-primary">Step {{ index + 1 }}</span><h2 class="mt-3 text-title">{{ step.title }}</h2><p class="mt-3 text-muted">{{ step.description }}</p></li>
      </ol>
      <ScCard variant="muted" class="sc-stack"><h2 class="text-title">Clear feedback, including limits</h2><ScScreenshot src="/product/import-detail-700.png" :width="700" :height="665" alt="Actual app receipt explaining that a document is already in the library." caption="Existing-document receipt · This capture does not demonstrate a new successful import." full-size /><p class="text-label text-muted">An existing-document receipt, an extracted-data review, and a failed import are different states. Always read the feedback shown for your file.</p></ScCard>
    </div>
    <section id="documents" class="sc-page-section border-t border-border" aria-labelledby="documents-heading">
      <ScSectionHeading id="documents-heading" title="Document types, not universal compatibility" description="The app contains workflows for supported bond allocation/confirmation documents, share purchase contracts, and statements." />
      <p class="sc-reading mt-6 text-muted">Support varies by issuer, document version, and layout. The website does not yet publish a verified issuer-by-issuer compatibility catalog. Do not assume every document from a broker is supported because one format works.</p>
      <p class="sc-reading mt-4 text-muted">If an import is unsupported, available manual entry can help with supported bond or share records. Do not upload investment PDFs through the website contact form; describe the document type without names, account numbers, or balances.</p>
      <ScLink to="/contact" class="mt-6 inline-block">Ask about a format</ScLink>
    </section>
    <div class="pb-14"><ScCta title="Your broker remains your broker" description="No commercial partnership is needed for supported entry and import tools. Trades and custody stay with the appropriate intermediaries." to="/faq" label="Read the FAQ" /></div>
  </ScContainer>
</template>

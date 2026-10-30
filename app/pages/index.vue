<script setup lang="ts">
useSiteSeo()
const features = [
  { title: 'Treasury bonds, in view', description: 'Keep purchase terms, principal, maturity dates, and coupon details together. Distinguish confirmed schedules from estimates.', number: '01' },
  { title: 'Shares & transaction history', description: 'Organize share purchases, quantities, fees, and investment history. Return to the records behind your holdings.', number: '02' },
  { title: 'Documents that do more', description: 'Import supported financial PDFs, review the extracted details, and keep the source document with your records. Format support varies.', number: '03' },
  { title: 'Know what’s coming up', description: 'See coupon schedules and maturity dates in context. Follow expected income while keeping estimates separate from confirmed receipts.', number: '04' },
  { title: 'Understand the bigger picture', description: 'Explore allocation, recorded costs, and estimated investment values. Valuations depend on available price information; they are not live quotes.', number: '05' },
  { title: 'Records worth keeping', description: 'Bring investment information into portfolio and annual PDF reports, with the records and assumptions that give the figures context.', number: '06' },
]
const steps = [
  { title: 'Add your investments', description: 'Record supported bond or share purchases manually, or start with a supported investment PDF.' },
  { title: 'Review the details', description: 'Check extracted amounts, dates, and instrument details against your document before saving.' },
  { title: 'Bring records together', description: 'Organize holdings and their source documents in one portfolio experience.' },
  { title: 'Follow the picture over time', description: 'Review investment history, income schedules, and available valuation information.' },
]
const questions = [
  { question: 'Is Struct Capital a broker?', answer: 'No. Struct Capital is independent investment portfolio management software. You continue buying and selling securities through your chosen licensed broker. Struct Capital does not execute trades or hold investment funds.' },
  { question: 'Does my broker need to partner with Struct Capital?', answer: 'No partnership is required for supported manual-entry and document-import workflows. You can record supported investments and import supported PDFs without connecting a brokerage account. Supporting a broker’s document format does not imply a partnership.' },
  { question: 'Can I import any financial PDF?', answer: 'No. Import support depends on the document type and layout. The app includes workflows for supported bond allocation/confirmation documents, share purchase contracts, and statements. Always review extracted details; an unsupported or unreadable file may not import successfully. Available manual-entry tools provide an alternative for supported investment records.' },
  { question: 'Does importing a PDF connect my broker account?', answer: 'No. Document extraction and direct account synchronization are different. A PDF import does not authorize ongoing access to your brokerage account. Direct broker synchronization is not presented as a current feature.' },
  { question: 'How does this website handle my investment information?', answer: 'This marketing website does not ask you to upload investment PDFs, enter holdings, or connect a brokerage account. App data handling is separate. App privacy details are separate from this marketing website. The website privacy draft is available, but it is not an approved app policy.' },
  { question: 'Are portfolio values and income estimates guaranteed?', answer: 'No. Estimates depend on recorded investment terms and available price information. They are not guaranteed returns or live market quotes. Check your original records and distinguish expected income from confirmed receipts.' },
  { question: 'Where can I download the application?', answer: 'Official download links are not published here yet. You can explore real app screens and the workflow on this page.' },
]
</script>

<template>
  <div class="sc-home">
    <ScContainer>
      <section class="home-hero" aria-labelledby="hero-heading">
        <div class="home-hero-copy">
          <p class="home-eyebrow"><span aria-hidden="true" class="home-dot" /> Independent by design · Built for Rwanda</p>
          <h1 id="hero-heading" class="home-title">All your investments.<br><span>One clear picture.</span></h1>
          <p class="home-lead">Track Treasury bonds, shares, income, and documents across brokers. One independent portfolio management app, built around your records.</p>
          <div class="home-actions">
            <ScLink to="#product" variant="primary">Explore the app <span aria-hidden="true">↗</span></ScLink>
            <ScLink to="#how-it-works" variant="outline">How it works <span aria-hidden="true">↓</span></ScLink>
          </div>
          <p class="home-boundary"><span aria-hidden="true">↳</span> Portfolio software, not a stockbroker.<br>No broker partnership needed for supported imports or manual entry.</p>
        </div>
        <div class="home-product-stage">
          <div class="home-stage-label"><span>The investor’s view</span><span aria-hidden="true">SC / 01</span></div>
          <img src="/brand/struct-capital-symbol.svg" alt="" aria-hidden="true" class="home-watermark" width="320" height="320">
          <ScScreenshot
            src="/product/calendar-560.png" srcset="/product/calendar-560.png 560w, /product/calendar-840.png 840w"
            sizes="(min-width: 1024px) 264px, (min-width: 640px) 280px, 230px" :width="560" :height="1183"
            alt="Struct Capital mobile app showing the Calendar, with subscription dates and labeled coupon and maturity events."
            caption="Actual app · Calendar" :frame="false" priority class="home-hero-phone"
          />
          <div class="home-record-excerpt">
            <p class="home-excerpt-label">A record behind every view</p>
            <img src="/product/reports-detail-900.png" alt="A cropped view of the app’s annual report document card." width="900" height="397" decoding="async">
          </div>
          <p class="home-stage-note">Your records. In context.</p>
        </div>
      </section>
      <div class="home-topic-line" aria-label="Investment information organized in the app">
        <span>Treasury bonds</span><span aria-hidden="true">/</span><span>Listed shares</span><span aria-hidden="true">/</span><span>Investment income</span><span aria-hidden="true">/</span><span>Source documents</span>
      </div>
      <section class="home-section home-problem" aria-labelledby="problem-heading">
        <div>
          <p class="home-eyebrow">01 / The challenge</p>
          <h2 id="problem-heading" class="text-heading">Your investments are connected.<br><span class="text-muted">Your paperwork isn’t.</span></h2>
        </div>
        <div class="sc-stack">
          <p class="home-body">A bond allocation here. A share contract there. Different brokers, different statements, different dates to remember.</p>
          <p class="text-muted">The more your portfolio grows, the harder it becomes to answer a simple question: <strong class="font-semibold text-ink">what does it all look like together?</strong></p>
          <ul class="home-document-list" aria-label="Records investors work with"><li>Allocation results</li><li>Contract notes</li><li>Account statements</li></ul>
        </div>
      </section>
    </ScContainer>

    <section id="overview" class="home-solution" aria-labelledby="solution-heading">
      <ScContainer>
        <div class="home-solution-heading">
          <div><p class="home-eyebrow">02 / A clearer perspective</p><h2 id="solution-heading">Many records.<br>One organized experience.</h2></div>
          <p>Struct Capital brings holdings, income schedules, investment history, and supporting documents into the same picture—so you can follow your investments with context.</p>
        </div>
        <div class="home-pillars">
          <div><span class="home-pillar-index">A</span><h3>What you own</h3><p>Bonds and shares, organized around your records.</p></div>
          <div><span class="home-pillar-index">B</span><h3>What’s ahead</h3><p>Income schedules and dates that deserve your attention.</p></div>
          <div><span class="home-pillar-index">C</span><h3>What’s behind it</h3><p>The documents and details that help explain each figure.</p></div>
        </div>
      </ScContainer>
    </section>

    <ScContainer>
      <section id="features" class="home-section sc-stack" aria-labelledby="features-heading">
        <div class="home-section-top"><ScSectionHeading id="features-heading" eyebrow="03 / Inside Struct Capital" title="The detail you need. The clarity you want." description="Purposeful tools for keeping investment information together, without turning record keeping into another full-time job." /><ScLink to="#product" class="self-end">See the real app <span aria-hidden="true">↘</span></ScLink></div>
        <div class="home-features">
          <ScFeatureCard v-for="feature in features" :key="feature.number" :title="feature.title" :description="feature.description">
            <template #icon><span class="home-feature-index">{{ feature.number }}</span></template>
          </ScFeatureCard>
        </div>
        <p class="text-caption text-muted">PDF compatibility varies by document format. Portfolio values are estimates based on recorded information and available prices.</p>
      </section>

      <section id="how-it-works" class="home-section border-t border-border" aria-labelledby="workflow-heading">
        <ScSectionHeading id="workflow-heading" eyebrow="04 / How it works" title="Start with what you already have." description="Your broker handles the transaction. Struct Capital helps you organize the information that follows." />
        <ol class="home-workflow">
          <li v-for="(step, index) in steps" :key="step.title"><span class="home-step-number" aria-hidden="true">0{{ index + 1 }}</span><h3 class="text-title">{{ step.title }}</h3><p class="text-muted">{{ step.description }}</p></li>
        </ol>
      </section>

      <section class="home-independence" aria-labelledby="independence-heading">
        <div class="home-independence-mark" aria-hidden="true"><span class="home-symbol" /></div>
        <div class="sc-stack"><p class="home-eyebrow">05 / Your broker. Your choice.</p><h2 id="independence-heading" class="text-heading">Independent of partnerships.<br>Centered on you.</h2><p class="home-body">Your broker doesn’t need to partner with Struct Capital for you to use supported manual-entry and document-import features.</p><p class="text-muted">Keep investing through your chosen licensed intermediary. Use Struct Capital to organize supported records from one broker or several. Document support is format-dependent; it is not a broker integration or an affiliation.</p><ScLink to="#questions" class="justify-self-start">Understand the distinction <span aria-hidden="true">↗</span></ScLink></div>
      </section>

      <section id="product" class="home-section sc-stack" aria-labelledby="product-heading">
        <ScSectionHeading id="product-heading" eyebrow="06 / A closer look" title="The app, as it is." description="A closer look at the calendar, document library, and import feedback in the existing application." />
        <div class="home-product-grid">
          <article class="home-screen-card home-screen-calendar"><div class="home-screen-description"><h3 class="text-title">Dates in context</h3><p class="text-muted">Subscription windows, coupon dates, and maturities in a calendar view.</p></div><ScScreenshot src="/product/calendar-detail-700.png" :width="700" :height="934" alt="Cropped calendar from the actual app, showing an October 2026 subscription window and event legend." caption="Calendar excerpt · Captured dates, not a live schedule." full-size /></article>
          <div class="sc-stack">
            <article class="home-screen-card"><div class="home-screen-description"><h3 class="text-title">Records with a paper trail</h3><p class="text-muted">Reports and source documents live in the app’s document library.</p></div><ScScreenshot src="/product/reports-detail-900.png" :width="900" :height="397" alt="Actual annual report card from the Struct Capital document library." caption="Document library · Annual report excerpt." full-size /></article>
            <article class="home-screen-card"><div class="home-screen-description"><h3 class="text-title">Clear import feedback</h3><p class="text-muted">Know when a supported document is already in your library.</p></div><ScScreenshot src="/product/import-detail-700.png" :width="700" :height="665" alt="Actual app receipt stating that an issuance report is already in the library." caption="Import history · An existing document in the library." full-size /></article>
          </div>
        </div>
        <p class="text-caption text-muted">Cropped app screenshots show captured states, not current market information. Issuer details identify documents, not partnerships.</p>
      </section>

      <section class="home-section home-trust border-t border-border" aria-labelledby="trust-heading">
        <ScSectionHeading id="trust-heading" eyebrow="07 / Trust through clarity" title="Clear about what we do. Clear about what we don’t." />
        <div class="home-trust-grid"><div><span class="home-trust-label">Struct Capital helps you</span><ul><li>Organize supported investment records</li><li>Review holdings, income schedules, and documents</li><li>Understand estimates in their original context</li></ul></div><div><span class="home-trust-label">Your broker remains your broker</span><ul><li>Trades stay with your licensed intermediary</li><li>Struct Capital does not hold investment funds</li><li>Importing a PDF does not connect your account</li></ul></div></div>
        <p class="text-label text-muted">Portfolio information supports record keeping. It is not personalized investment advice or a promise of returns.</p>
      </section>

      <section id="questions" class="home-section home-faq border-t border-border" aria-labelledby="questions-heading">
        <ScSectionHeading id="questions-heading" eyebrow="08 / Good questions" title="A little clarity, before you begin." />
        <ScFaq :items="questions" />
      </section>

      <div id="explore" class="home-final">
        <ScCta title="Get to know your portfolio. And the app behind it." description="See how Struct Capital brings investment records into one clearer picture, without changing how you invest through your broker." to="#product" label="Take a closer look" />
        <p class="mt-4 text-center text-caption text-muted">Explore the app here. Official download links are not published yet.</p>
      </div>
    </ScContainer>
  </div>
</template>

<style scoped>
.home-hero { display: grid; gap: 3rem; align-items: center; padding-block: 3.5rem 2.5rem; }
.home-hero-copy { display: grid; justify-items: start; gap: 1.5rem; }
.home-eyebrow { display: flex; align-items: center; gap: 0.6rem; color: var(--sc-primary); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
.home-dot { width: 0.4rem; height: 0.4rem; flex: none; background: currentColor; border-radius: 50%; }
.home-title { font-size: clamp(2.65rem, 5.4vw, 4.75rem); line-height: 1.04; letter-spacing: -0.055em; max-width: 12ch; }
.home-title span { color: var(--sc-primary); }
.home-lead { max-width: 39ch; font-size: clamp(1.05rem, 1.7vw, 1.25rem); line-height: 1.65; }
.home-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; margin-block: 0.25rem; width: 100%; }
.home-actions :deep(.sc-button) { gap: 0.5rem; padding-inline: 0.5rem; font-size: 0.875rem; }
.home-actions :deep(.sc-button > span[aria-hidden]) { display: none; }
.home-boundary { color: var(--sc-muted); font-size: 0.75rem; max-width: 55ch; line-height: 1.8; }
.home-boundary > span { color: var(--sc-primary); }
.home-product-stage { position: relative; padding: 3.5rem 1rem 2rem; background: var(--sc-surface-muted); border-radius: 2px 2px var(--sc-radius-feature) var(--sc-radius-feature); isolation: isolate; }
.home-stage-label { position: absolute; top: 1.25rem; inset-inline: 1.25rem; display: flex; justify-content: space-between; gap: 1rem; font-size: 0.6rem; color: var(--sc-muted); text-transform: uppercase; letter-spacing: 0.12em; }
.home-watermark { position: absolute; top: 7rem; right: 0; width: 70%; opacity: 0.055; z-index: -1; }
.home-hero-phone { width: 230px; margin-inline: auto; filter: drop-shadow(0 14px 18px rgb(0 0 0 / 14%)); }
.home-hero-phone :deep(figcaption) { text-align: center; font-size: 0.7rem; }
.home-record-excerpt { position: relative; width: min(85%, 300px); background: var(--sc-surface); border: 1px solid var(--sc-border); border-radius: 14px; padding: 0.75rem; box-shadow: var(--sc-shadow); margin: -3.5rem 0 0; }
.home-record-excerpt img { border-radius: 0.75rem; }
.home-excerpt-label { color: var(--sc-muted); font-size: 0.65rem; margin-bottom: 0.5rem; }
.home-stage-note { font-size: 0.7rem; text-align: right; color: var(--sc-muted); margin-top: 1rem; }
.home-topic-line { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem 1.25rem; padding-block: 1.5rem; border-block: 1px solid var(--sc-border); color: var(--sc-muted); font-size: 0.75rem; }
.home-topic-line [aria-hidden] { color: var(--sc-outline); }
.home-section { padding-block: clamp(3.5rem, 7vw, 6.5rem); }
.home-problem { display: grid; gap: 2rem; }
.home-problem h2 { margin-top: 1.25rem; }
.home-body { font-size: 1.15rem; line-height: 1.65; }
.home-document-list { display: grid; gap: 0.65rem; font-size: 0.8rem; color: var(--sc-muted); border-left: 1px solid var(--sc-outline); padding-left: 1.25rem; }
.home-solution { background: var(--sc-ink); color: #f3f1e8; padding-block: clamp(3rem, 6vw, 5rem); }
.home-solution .home-eyebrow { color: var(--sc-cream); }
.home-solution-heading { display: grid; gap: 2rem; }
.home-solution h2 { font-size: clamp(1.9rem, 4vw, 3.25rem); line-height: 1.12; margin-top: 1.25rem; }
.home-solution-heading > p { color: #c5c7ba; max-width: 42ch; align-self: end; }
.home-pillars { display: grid; gap: 2rem; margin-top: 3rem; }
.home-pillars > div { border-top: 1px solid #625f50; padding-top: 1.25rem; }
.home-pillar-index { color: var(--sc-cream); font-size: 0.7rem; }
.home-pillars h3 { font-size: 1.2rem; margin-block: 0.75rem 0.5rem; }
.home-pillars p { color: #c5c7ba; font-size: 0.85rem; max-width: 32ch; }
.home-section-top { display: grid; gap: 1.5rem; margin-bottom: 1.25rem; }
.home-features { display: grid; gap: 1rem; }
.home-features :deep(.sc-card) { padding: 1.5rem; box-shadow: none; }
.home-feature-index { font-size: 0.7rem; font-variant-numeric: tabular-nums; }
.home-features :deep(h3) { font-size: 1.15rem; letter-spacing: -0.02em; }
.home-features :deep(p) { font-size: 0.9rem; }
.home-workflow { display: grid; gap: 2rem; margin-top: 3rem; }
.home-workflow li { display: grid; gap: 1rem; align-content: start; border-top: 1px solid var(--sc-outline); padding-top: 1.25rem; }
.home-workflow h3 { font-size: 1.1rem; }
.home-workflow p { font-size: 0.9rem; }
.home-step-number { color: var(--sc-primary); font-size: 0.8rem; font-variant-numeric: tabular-nums; }
.home-independence { display: grid; gap: 2rem; align-items: center; background: var(--sc-surface-muted); border: 1px solid var(--sc-border); border-radius: var(--sc-radius-feature); padding: clamp(1.5rem, 4vw, 3.5rem); }
.home-independence-mark { display: grid; place-items: center; width: 100%; }
.home-symbol { display: block; width: 110px; height: 110px; background: var(--sc-primary); mask: url('/brand/struct-capital-symbol.svg') center / contain no-repeat; }
.home-product-grid { display: grid; gap: 1.5rem; margin-top: 1.5rem; }
.home-screen-card { padding: 1.25rem; border: 1px solid var(--sc-border); border-radius: var(--sc-radius-card); background: var(--sc-surface-muted); min-width: 0; }
.home-screen-description { display: grid; gap: 0.5rem; margin-bottom: 1.5rem; }
.home-screen-description p { font-size: 0.85rem; }
.home-screen-card :deep(figcaption) { font-size: 0.7rem; }
.home-screen-card :deep(img) { background: #faf8f2; }
.home-trust { display: grid; gap: 2.5rem; }
.home-trust-grid { display: grid; gap: 2rem; }
.home-trust-label { display: block; color: var(--sc-primary); font-weight: 600; margin-bottom: 1rem; }
.home-trust-grid ul { display: grid; gap: 0.75rem; color: var(--sc-muted); font-size: 0.9rem; }
.home-trust-grid li { padding-left: 1rem; border-left: 2px solid var(--sc-border); }
.home-faq { display: grid; align-items: start; gap: 2.5rem; }
.home-final { padding-bottom: clamp(3rem, 6vw, 5rem); }
@media (min-width: 40rem) {
  .home-actions :deep(.sc-button > span[aria-hidden]) { display: inline; }
  .home-actions { display: flex; flex-wrap: wrap; width: auto; gap: 0.75rem; }
  .home-actions :deep(.sc-button) { padding-inline: 1.25rem; font-size: 1rem; gap: 1rem; }
  .home-hero-phone { width: 280px; }
  .home-features, .home-trust-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-workflow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-pillars { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (min-width: 64rem) {
  .home-hero { grid-template-columns: 1.1fr 1fr; gap: 4rem; padding-block: 3rem; }
  .home-product-stage { margin-left: 1rem; }
  .home-hero-phone { width: 264px; margin-right: 2rem; }
  .home-record-excerpt { position: absolute; left: -1.5rem; bottom: 2.5rem; width: 265px; margin: 0; }
  .home-stage-note { margin-top: 0.5rem; }
  .home-problem, .home-solution-heading { grid-template-columns: 1.1fr 1fr; gap: 5rem; }
  .home-section-top { grid-template-columns: 1fr auto; }
  .home-features { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .home-workflow { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .home-independence { grid-template-columns: 0.35fr 1fr; gap: 3rem; }
  .home-symbol { width: 160px; height: 160px; }
  .home-product-grid { grid-template-columns: 0.95fr 1fr; align-items: start; gap: 2rem; }
  .home-screen-card { padding: 2rem; }
  .home-faq { grid-template-columns: 0.7fr 1fr; gap: 5rem; }
}
</style>

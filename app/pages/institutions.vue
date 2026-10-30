<script setup lang="ts">
import { indexingEnabled } from '~~/shared/site'

useSiteSeo({
  title: 'For institutions — explore potential collaboration',
  description: 'Explore potential document-processing, reporting and consent-based integration opportunities with Struct Capital. Independent investor software today; no institutional offering or partnership is implied.',
})
const contactEnabled = indexingEnabled(useRuntimeConfig().public.contactEnabled)
const questions = [
  { title: 'From documents to usable records', description: 'Could differences in document layouts create repeated interpretation or manual-entry work? Which formats and exceptions would matter most?' },
  { title: 'From separate records to a clear account', description: 'Could comparing transaction records and statements reveal a useful reconciliation problem? What would staff need to review before trusting a result?' },
  { title: 'From information to explanation', description: 'Could clearer portfolio reports help answer recurring investor questions? What evidence would show a meaningful improvement?' },
]
const foundations = [
  { title: 'Supported PDF import and review', description: 'The investor application has document-import orchestration and extracted-data review before saving. This is a starting point for investigation, not proof of every issuer’s format or institutional-scale processing.' },
  { title: 'Investment records and schedules', description: 'Bond and share entry, transaction history, and coupon/maturity schedule views exist in the app. They organize investor records; they do not administer an institution’s bond allocations or settle transactions.' },
  { title: 'Portfolio and annual reports', description: 'Portfolio and annual PDF report generation exist in the app. These reporting foundations are not an institutional reporting service, regulatory filing product or assurance of audited results.' },
]
const opportunities = [
  { title: 'A document-workflow pilot', description: 'Potential financial document processing, client statement interpretation and investment transaction reconciliation for a narrowly defined workflow. Begin with permission-cleared examples and agreed review criteria.' },
  { title: 'A reporting or investor-software project', description: 'Potential portfolio reporting, bond allocation administration or investor-facing software shaped around a validated institutional need. Each would require its own product scope and readiness assessment.' },
  { title: 'An authorized integration', description: 'Potential account synchronization, institutional APIs or broker-specific integrations only where the institution agrees and the customer gives appropriate authorization. No direct account connection is offered today.' },
]
</script>

<template>
  <ScContainer>
    <ScPageIntro label="For institutions" eyebrow="Independent foundations. Possible collaboration." title="A clearer investment picture. Room to collaborate." description="Struct Capital is currently independent investment portfolio management software for investors in Rwanda. Its document and portfolio technology may become a foundation for carefully scoped institutional collaboration." />

    <div class="grid items-start gap-6 pb-14 lg:grid-cols-[1.2fr_1fr]">
      <ScCard variant="brand" class="sc-stack">
        <h2 class="text-title">Investor usefulness comes first.</h2>
        <p>Investors can organize supported records through manual entry and document imports without a broker partnership. That independent path must remain useful whether or not an institution chooses to collaborate.</p>
        <ScLink to="/how-it-works" class="justify-self-start">Understand the independent workflow</ScLink>
      </ScCard>
      <div class="sc-stack px-1 py-2">
        <p class="text-label font-semibold text-brand-primary">Current positioning</p>
        <p>Struct Capital is not a broker, exchange or custodian. It does not execute trades or hold investment funds.</p>
        <p class="text-muted">No broker partnership, institutional client or commercial integration is asserted on this page. The opportunities below are exploratory, not available institutional products.</p>
        <ScLink to="#collaboration" class="justify-self-start">Explore possible collaboration models</ScLink>
      </div>
    </div>

    <section class="sc-page-section border-t border-border" aria-labelledby="questions-heading">
      <ScSectionHeading id="questions-heading" eyebrow="Questions to validate" title="Start with the work, not an assumed solution." description="These are hypotheses for discussion, not findings from verified customer research. A useful collaboration would begin by learning where, if anywhere, the real friction lies." />
      <div class="mt-8 grid gap-5 md:grid-cols-3"><ScFeatureCard v-for="question in questions" :key="question.title" v-bind="question" /></div>
    </section>

    <section class="sc-page-section border-t border-border" aria-labelledby="foundations-heading">
      <div class="grid items-start gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div class="sc-stack">
          <ScSectionHeading id="foundations-heading" eyebrow="Present in the investor app" title="Existing technology. A starting point to evaluate." description="Import, recordkeeping and report-generation implementations provide concrete foundations to examine." />
          <p class="text-label text-muted">Their presence in source code does not establish public release availability, parser accuracy across formats, production readiness for institutions or service-level commitments.</p>
          <ScLink to="/features" class="justify-self-start">See the investor application’s features</ScLink>
        </div>
        <div class="grid gap-6">
          <article v-for="(foundation, index) in foundations" :key="foundation.title" class="border-b border-border pb-6 last:border-b-0">
            <p class="mb-2 text-caption font-semibold text-brand-primary" aria-hidden="true">0{{ index + 1 }}</p>
            <h3 class="text-title">{{ foundation.title }}</h3>
            <p class="mt-3 text-muted">{{ foundation.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="collaboration" class="sc-page-section border-t border-border" aria-labelledby="collaboration-heading">
      <ScSectionHeading id="collaboration-heading" eyebrow="Potential future models · Not current products" title="A defined problem. An agreed scope." description="These are possible ways to collaborate if demand, feasibility and appropriate agreements are established. They are not a service catalog, pilot commitment or delivery promise." />
      <div class="mt-8 grid gap-5 md:grid-cols-3"><ScFeatureCard v-for="opportunity in opportunities" :key="opportunity.title" v-bind="opportunity" /></div>
    </section>

    <section class="sc-page-section border-t border-border" aria-labelledby="data-heading">
      <ScSectionHeading id="data-heading" eyebrow="Principles for any future collaboration" title="Define permission before access." description="These are requirements to establish before an integration or pilot, not a claim that institutional controls or legal approvals already exist." />
      <dl class="mt-8 grid gap-8 md:grid-cols-2">
        <div class="sc-stack"><dt class="text-title font-semibold">Explicit purpose and authorization</dt><dd class="text-muted">Agree what the work is for, who may provide the data, and the applicable legal basis. Any future account connection would require institutional agreement and appropriate customer authorization, with a clear scope and revocation process.</dd></div>
        <div class="sc-stack"><dt class="text-title font-semibold">Limited data and access</dt><dd class="text-muted">Define necessary fields, permitted recipients, access boundaries, retention, deletion and processing locations before any customer-data exchange. Start evaluation with synthetic or properly anonymized, permission-cleared material.</dd></div>
        <div class="sc-stack"><dt class="text-title font-semibold">Reviewable results</dt><dd class="text-muted">Agree how people would check extracted records, handle exceptions and correct errors. Evaluate accuracy against the particular formats and workflow rather than assuming every statement or PDF is compatible.</dd></div>
        <div class="sc-stack"><dt class="text-title font-semibold">Dedicated readiness review</dt><dd class="text-muted">Assess security, privacy, operational responsibilities and applicable requirements with the appropriate reviewers before a pilot. No security certification, blanket encryption promise or regulatory approval is claimed here.</dd></div>
      </dl>
    </section>

    <section class="sc-page-section border-t border-border" aria-labelledby="independence-heading">
      <ScCard variant="muted" class="sc-stack">
        <ScSectionHeading id="independence-heading" title="Collaboration is optional. Independence is foundational." />
        <p class="sc-reading">A broker may choose not to collaborate. Investors must still be able to use the supported manual-entry and document-import workflows without changing brokers or waiting for an agreement.</p>
        <p class="sc-reading text-muted">Uploading a broker-issued PDF does not create a partnership, connect a brokerage account or grant access to a broker’s customer database. Document-format support and a commercial relationship are separate things. Unsupported PDFs may require an available manual workflow.</p>
        <ScLink to="/faq" class="justify-self-start">Read the broker-independence FAQ</ScLink>
      </ScCard>
    </section>

    <section class="sc-page-section border-t border-border" aria-labelledby="roadmap-heading">
      <ScSectionHeading id="roadmap-heading" eyebrow="Direction, not a delivery schedule" title="Progress depends on evidence." description="Institutional opportunities are optional future paths. There are no promised launch dates or automatic steps into brokerage or trading." />
      <ol class="mt-8 grid gap-8 md:grid-cols-3">
        <li class="sc-stack"><p class="text-label font-semibold text-brand-primary">01 · Current focus</p><h3 class="text-title">Strengthen independent investor tools</h3><p class="text-muted">Prioritize record clarity, reliable imports, understandable reports and investor feedback. Public-release readiness is a separate gate.</p></li>
        <li class="sc-stack"><p class="text-label font-semibold text-brand-primary">02 · Potential next step</p><h3 class="text-title">Validate a specific institutional need</h3><p class="text-muted">Establish the problem and willingness to pursue a scoped pilot. Proceed only with agreed evaluation criteria, responsibilities and readiness reviews.</p></li>
        <li class="sc-stack"><p class="text-label font-semibold text-brand-primary">03 · Only if justified</p><h3 class="text-title">Consider a repeatable service</h3><p class="text-muted">Evaluate reporting, processing or authorized integrations only with demonstrated demand, appropriate agreements and support capacity. Preserve the independent investor workflow.</p></li>
      </ol>
    </section>

    <div class="sc-stack pb-14">
      <ScCta title="Bring a workflow worth understanding." description="Describe a potential collaboration in general terms: the document or reporting task, where review is needed, and what a useful outcome would mean. An inquiry creates no partnership or service commitment." to="/contact" :label="contactEnabled ? 'Discuss a potential collaboration' : 'View inquiry availability'" />
      <p class="text-label text-muted">Choose “Institutional inquiry” on the contact page. Do not send customer records, investment PDFs, credentials or confidential commercial information.</p>
      <p v-if="!contactEnabled" class="text-label text-muted">Website inquiry delivery is not available yet. The contact page explains the current limitation; no message can be sent at this time.</p>
    </div>
  </ScContainer>
</template>

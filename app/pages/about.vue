<script setup lang="ts">
useSiteSeo({ title: 'About', description: 'Our mission is a clearer view of investments across brokers. Learn about Struct Capital’s independent software positioning and carefully separated future ambitions.' })
</script>

<template>
  <ScContainer>
    <ScPageIntro label="About" eyebrow="Independent by design" title="One place to understand what you own." description="Struct Capital’s mission is to help investors in Rwanda make sense of investment records across brokers." />
    <div class="grid items-start gap-10 pb-14 lg:grid-cols-2">
      <section class="sc-prose" aria-labelledby="mission-heading"><h2 id="mission-heading" class="text-heading">The investor comes first</h2><p>Bond allocations, share purchase contracts, statements, and income dates often arrive separately. Struct Capital brings supported investment information into an organized view so that the original records are easier to understand together.</p><p>The focus starts with individual investors in Rwanda who hold Treasury bonds and listed shares. You should not have to change brokers or wait for an institutional partnership to use supported manual-entry and document-import tools.</p><ScLink to="/features">Explore the existing app</ScLink></section>
      <ScCard variant="brand" class="sc-stack"><h2 class="text-title">Software, with clear boundaries</h2><p>Struct Capital is independent investment portfolio management software. It is not currently a stockbroker, exchange, custodian, bank, trading venue, or investment adviser.</p><p>It does not execute orders or hold client investment funds. Supporting an institution’s document format does not imply a partnership or endorsement.</p></ScCard>
    </div>
    <section class="sc-page-section border-t border-border" aria-labelledby="principles-heading">
      <ScSectionHeading id="principles-heading" title="What guides the product" />
      <div class="mt-8 grid gap-5 md:grid-cols-3"><ScFeatureCard title="Independent first" description="Keep supported record-keeping workflows useful without depending on a direct broker integration." /><ScFeatureCard title="Evidence in context" description="Keep source information visible and distinguish confirmed records from estimates and incomplete data." /><ScFeatureCard title="Understandable by design" description="Use clear language and familiar records to help investors follow their holdings, income schedules, and costs." /></div>
    </section>
    <section class="sc-page-section border-t border-border" aria-labelledby="future-heading">
      <ScSectionHeading id="future-heading" eyebrow="Future possibilities · Not current services" title="Grow from demonstrated needs." description="The longer-term vision is a sustainable software business shaped by investor and institutional demand." />
      <p class="sc-reading mt-6 text-muted">Areas that may be explored include additional document formats, reporting tools, institutional software, and customer-authorized broker integrations. These require validated demand, appropriate agreements, and dedicated privacy and security review. They are not presented here as available products or signed partnerships.</p>
      <p class="sc-reading mt-4 text-muted">A separately authorized brokerage would require a distinct strategic and regulatory decision. It is not a current Struct Capital service or a promised destination.</p>
      <ScLink to="/institutions" class="mt-6 inline-block">Explore potential institutional collaboration</ScLink>
    </section>
  </ScContainer>
</template>

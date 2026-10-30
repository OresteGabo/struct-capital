# Institutional positioning — 2026-10-30

## Page and scope

`/institutions` is a marketing page for prospective brokers and financial institutions, not an institutional product or portal. It preserves Struct Capital's current independent investment portfolio software positioning. The owner's current route choice supersedes the former suggested `/for-institutions` path in README/specification. No such page existed or had links, so no legacy redirect or duplicate page was added.

Eight content areas: introduction/current boundaries; questions for discovery; existing app foundations; potential collaboration models; future data/consent requirements; investor independence; inquiry CTA; conditional roadmap. Institutional workflow problems are explicitly hypotheses, not customer research findings. An institution may decline collaboration. Supported manual/import workflows must remain useful without partnerships.

## Evidence and wording boundaries

Existing implementation evidence is summarized in [Homepage evidence](HOMEPAGE_EVIDENCE.md). A read-only source recheck found import/review functions in `PurchasePdfImport.kt` and `PurchaseReviewState.kt`, and report-generation paths in `PortfolioReport.kt` and `AnnualReport.kt` under the separate mobile project's `app/shared/src/commonMain/kotlin/dev/orestegabo/portfolio/investments/`. Existing `PurchaseForms.kt`, `InvestmentHistoryScreen.kt`, `CalendarEvents.kt` and `CalendarScreen.kt` support the record/schedule description. These remain SOURCE_CONFIRMED, not newly tested mobile calculations/parsers or verified public releases. No mobile file was changed, and no mobile build/test was run.

The page describes reusable code foundations for evaluation, not institutional readiness, a licensed technology package, throughput/accuracy guarantees, an active commercial offering or SLA. Specific issuer parser coverage, client-statement interpretation and transaction reconciliation are not elevated to current institutional capabilities. PDF import is never described as account access or a broker relationship.

| Content | Present status | Evidence/approval needed before stronger claims |
| --- | --- | --- |
| Independent records, supported import/review, schedules and PDF reports | Source-confirmed investor-app foundations | Executed mobile/parser/calculation tests, precise format coverage and release verification before availability/accuracy promises |
| Institutional document processing, statement interpretation, transaction reconciliation | Potential collaboration only | Actual customer discovery, permitted specimens, feasibility/accuracy evaluation, scoped contract and product readiness |
| Institutional portfolio reporting, allocation administration, investor-facing software | Potential collaboration only | Validated workflow, explicit product approval, reviewed responsibilities and tested implementation |
| Account synchronization, institutional APIs, broker-specific integrations | Potential future work only | Institution agreement, appropriate customer authorization, scoped access/revocation, legal/security/operational review and implemented/tested integration |
| Named partner/client/logo, endorsement, active pilot | No such relationship asserted | Verified active agreement and explicit approval to name or show the institution |
| Measurable efficiency gains or customer pain points | Discovery hypotheses | Accountable customer research and defensible measurement; no invented results |
| Institutional data-protection controls/compliance | Principles/requirements for future evaluation | Verified actual controls, legal basis, consent process, retention/deletion/locations/vendors, security review and qualified legal review |
| Dates, pricing, guaranteed outcomes or service commitments | Omitted | Explicit commercial/product approval and supporting evidence |

No BNR/BK Capital or other institutional partnership, trading, custody, automatic account connection or access to a broker's customer database is claimed. Uploading a broker-issued PDF does not create a partnership. No broker CRM, portal, financial backend, upload flow, customer account, pricing or institutional API was built.

## Inquiry boundary

The CTA links to existing `/contact`, which already offers the validated `institutions` topic. No separate contact form or transport is added. When `public.contactEnabled` is off (the default), the institutional page explicitly says inquiry delivery is unavailable and labels its CTA “View inquiry availability.” The destination has disabled fields and no simulated success. When an approved contact-enabled server build is configured, the CTA invites discussion. Availability is a build-time public flag, not evidence that the receiving service is operational; its real configuration/acceptance must be verified before enablement.

Visitors are told to choose “Institutional inquiry” and give a general workflow description, without customer records, investment PDFs, credentials or confidential commercial information. Existing validation, consent and abuse controls remain unchanged. No messages were sent. See [Contact Integration](CONTACT_INTEGRATION.md).

## Design, navigation and SEO

The existing page intro, headings, cards, links, CTA, container and default layout compose the page; there are no new design tokens, assets, libraries, interactions or external requests. The brand-surface introduction anchors the current investor-first position. Discovery hypotheses and future models have explicit status labels, while current code foundations use a separate reading layout. Data requirements use a semantic definition list; the roadmap uses an ordered list, with no promised deadlines. Existing focus, theme and reduced-motion rules apply.

`/institutions` is in the public route registry, so it is prerendered and eligible for the sitemap only in a reviewed indexing-enabled build. It has a unique title/description, canonical and matching social metadata through `useSiteSeo`. No Product, partnership, customer, review or financial-service structured data is fabricated. The global footer adds “For institutions” using a shared footer navigation list; the main header stays focused on the existing investor routes. About's future-direction link now leads to this page. Preview indexing remains off; publication is not authorized.

## Content and launch review

The owner should review the proposed positioning and assign commercial/legal/privacy reviewers before publication. Source-confirmed technical foundations can be described within the limits above; naming a partner, promising an institutional service, asserting implemented controls or presenting hypotheses as customer findings requires separate evidence and approval. The staged roadmap has no fixed dates or implied inevitable transition into brokerage. Deferred institutional functionality remains in ROADMAP.md, not production feature code.

## Verification results

Node 24.15.0: lint, TypeScript, 15 existing unit/content tests, 34 light/dark semantic contrast checks, production build and static generation passed. Nine generated-output checks passed against both production prerender output and final static output, covering all 25 page routes, unique metadata, landmarks, internal links/anchors, crawler defaults and private-data boundaries. No new test suite mirroring static copy was added.

Browser checks at 320, 768, 1024 and 1280px found no horizontal overflow and retained one H1/main landmark and correct current footer link. Keyboard section-anchor navigation, mobile Menu/Escape focus restoration, dark theme, About discovery, footer return navigation and the contact destination/disabled form were exercised. No browser warning/error logs were observed. The temporary browser/server were closed and viewport override reset. No message was sent, mobile tests were not rerun, and no public release or publication was certified. Assistive-technology/real-device and hosting-specific review remain launch work.

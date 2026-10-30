# Feature Inventory and Truth Register

**Status:** Website design foundation implemented; investor feature verification remains outstanding. A read-only mobile visual audit does not establish feature correctness or release availability. This website repository cannot establish the precise implementation state of the separate KMP and Spring Boot repositories. Verify against code, tests, and actual releases before updating status or publishing claims.

## Status vocabulary
- `VERIFIED_LIVE`: implemented, tested, and available to the intended audience.
- `VERIFIED_INTERNAL`: implemented and tested but not publicly released.
- `PARTIAL`: present but incomplete or with known limitations.
- `SOURCE_CONFIRMED`: implementation found in source (and tests where noted), but tests/release availability not verified in this task. This is not VERIFIED_LIVE or VERIFIED_INTERNAL.
- `UNVERIFIED`: described in product history; current code/release status not confirmed.
- `PLANNED`: approved for future work, not available now.
- `EXPLORATORY`: idea requiring validation.

## Investor capabilities to verify
| Capability | Initial status | Verification required |
|---|---|---|
| Treasury bond portfolio tracking | SOURCE_CONFIRMED | KMP screens, backend domain, tests |
| Equity portfolio tracking | SOURCE_CONFIRMED | KMP screens, transaction APIs |
| BNR bond result PDF extraction | UNVERIFIED | Parser tests and supported formats |
| BK Capital equity contract extraction | UNVERIFIED | Parser fixtures and import UI |
| BK Capital client statement extraction | UNVERIFIED | Statement parser and reconciliation |
| Multi-broker consolidated view | UNVERIFIED | Data model, UI, cross-broker tests |
| Manual transaction/holding entry | SOURCE_CONFIRMED | Actual supported workflow |
| Coupon schedule and income calculations | SOURCE_CONFIRMED | Calculation tests and UI |
| Dividend tracking | UNVERIFIED | Verified flows and data sources |
| Fees, cost basis, performance analytics | SOURCE_CONFIRMED | Calculations and screen behavior |
| Document provenance and duplicate prevention | UNVERIFIED | Storage and idempotency tests |
| Notifications and reports | UNVERIFIED | Mobile implementations |
| Offline mode and sync | UNVERIFIED | Platform-specific tests |
| Public app-store distribution | UNVERIFIED | Confirm live store listings |

**Note:** The founder reports substantial existing functionality. `UNVERIFIED` is not a claim that a feature is missing.

## Website capabilities
| Capability | Status at documentation creation | Notes |
|---|---|---|
| Nuxt design foundation | Implemented; local checks recorded in DESIGN_SYSTEM.md | Nuxt/Vue/TypeScript, Tailwind semantic light/dark tokens, foundational components, internal noindex review route |
| Shared application layout and component library | Implemented locally | Header/mobile disclosure, footer, containers/headings, links, cards, statistics, FAQ, CTA, screenshot, breadcrumbs, forms and states |
| Nuxt marketing pages | PARTIAL | Homepage plus features/how-it-works/about/FAQ/contact and legal drafts implemented locally; launch dependencies remain |
| SEO and static discovery output | Implemented locally | Page metadata, canonical URLs, branded social image, prerendered robots/sitemap with indexing disabled by default |
| Internal component review | Implemented locally | `/design-system`, always noindex; original specimens preserved |
| Product explanations and FAQ | Implemented on homepage | Homepage preview plus fifteen searchable/categorized FAQ answers; unknown pricing, release and security details are qualified |
| Educational articles | Implemented; factual limits explicit | Eight source-checked short guides, two noindex editorial outlines, four categories, search/topics, reading time, sources/dates and related guides; no current rates/fees or personalized advice |
| Public product screenshots | Implemented selected exports | Calendar, annual-report and existing-document receipt exports exclude account email and dashboard balances; originals remain non-public |
| Public aggregate statistics | EXPLORATORY | Optional; no fabricated counts |
| Institutional positioning page | Implemented locally | `/institutions`: current software foundations, research hypotheses, potential models, data/consent principles and independence; no institutional product or partner asserted |
| Contact/institution inquiry boundary | PARTIAL | Form + validated server adapter implemented/tested; real delivery is off until approved endpoint/credentials are configured; no partnership claim |
| Website legal pages | Draft only | `/privacy` and `/terms` visibly marked unapproved, noindex, excluded from sitemap; app privacy details still require review |
| Store download links | PLANNED | Display only when verified |

## Future-only capabilities
Direct broker sync, institution-facing SaaS, paid subscriptions, brokerage execution, custody, and licensing-related services are **not current website features**. See [Roadmap](ROADMAP.md).

## Verification checklist for Codex
For each public claim record: feature name, code/test evidence, release availability, supported institutions/formats, known limitations, reviewer, and verification date. Update this register after repository inspection.

## Homepage evidence audit — 2026-10-30

Read-only mobile inspection confirms the app UI and domain implementations behind homepage copy: PurchaseForms.kt (bond/share manual entry), PortfolioDashboard.kt / InvestmentChart.kt (allocation and estimated valuation), PurchasePdfImport.kt / PurchaseImportScreens.kt / PurchaseReviewState.kt (supported import/review), CalendarEvents.kt / CalendarScreen.kt (income/maturity schedules), InvestmentHistoryScreen.kt (investment records), and DocumentsScreen.kt / PortfolioReport.kt / AnnualReport.kt (document library and PDF reports).

`PortfolioReportTest.kt`, `AnnualReportTest.kt`, and `PurchasePdfImportTest.kt` were inspected for scope, but were **not run**. The latter uses a mocked engine and does not prove real parser-format accuracy. Individual issuer parser support, calculation correctness, data release state and live store distribution are not newly certified. Reports are source-confirmed as a distinct capability; the broader notifications capability remains unverified. Multi-broker record keeping is evidenced by broker fields and aggregate views, not a newly tested cross-broker integration.

Source-confirmed does not mean publicly released. Homepage wording describes the existing app's functions without download badges or live availability assertions. See [Homepage evidence](HOMEPAGE_EVIDENCE.md) for precise limits and screenshot provenance.

## Supporting-page verification — 2026-10-30

All seven requested supporting routes are implemented with shared UI and source-confirmed product wording. The FAQ has fifteen categorized/searchable answers; pricing, document compatibility, public release and app-security details are qualified where unverified. The website contact boundary is implemented and tested, but actual delivery remains PARTIAL until approved configuration/server hosting is supplied. Privacy/terms are explicit drafts, never approved policies. Website checks passed: lint, TypeScript, 34 contrast checks, 11 unit tests, 2 HTTP tests, production build, static generation, and 8 generated-output tests (preview and launch modes). Mobile calculation/parser tests and public release availability were not newly verified.

## Learning scope — 2026-10-30

The website now covers twelve educational topic labels across eight short explainers and two evidence-pending outlines. Source-checked is an editorial evidence status, not professional approval, verified mobile-release status or publication authorization. BNR allocation fields and current brokerage fee schedules still require factual review. No new app capability, market-data integration or document parser is claimed. [Editorial workflow](EDITORIAL_WORKFLOW.md) records sources, jurisdiction limits and maintenance requirements.

Learning verification passed: lint, TypeScript, production build, static generation, 15 unit/content tests, 2 local HTTP regression tests, 9 generated-output checks across 24 page routes (launch and preview modes), and 34 semantic contrast checks. Four representative learning page types were browser-checked at 320/768/1280px, including keyboard controls and dark theme. These checks verify website behavior, not financial advice suitability, app release availability, or current broker-document compatibility.

## Institutional positioning — 2026-10-30

The `/institutions` marketing page is implemented; institutional document processing, reconciliation, allocation administration, APIs and account integrations remain EXPLORATORY. Existing app import/review/record/report code is described only as a foundation to evaluate, not institutional production readiness or release certification. Contact delivery remains PARTIAL/default off, with an honest availability notice and existing institutional topic. No mobile capabilities, backend contracts or partnerships changed. See [Institutional positioning](INSTITUTIONAL_POSITIONING.md).

## Backend inspection and integration limits — 2026-10-30

Read-only inspection of the actual `gabo-portfolio-api` Spring source (HEAD `7c9a16c`, working tree) found no public marketing statistics, format/release/capability catalog, public announcement or website contact contract. No new Spring integration is enabled, no counts are published and no private/customer endpoint is reused. Public market/operational endpoints are unsuitable substitutes. The optional contact adapter remains PARTIAL/default off, with investor-namespace exclusion, no-store/no-cookie forwarding, bounded JSON acknowledgment and sanitized failures. Backend changes and any public-data DTO remain deferred to an explicitly scoped task in that repository. [API integration audit](API_INTEGRATION.md) records evidence and configuration requirements; no mobile feature or public-release status is newly certified.

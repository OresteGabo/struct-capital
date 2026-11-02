# Architecture and Product Decision Log

Record significant decisions with date, status (`proposed`, `accepted`, `superseded`), context, alternatives, rationale, and consequences. The entries below are **documented intentions** and must be verified against actual repository code.

## ADR-001 — Nuxt for the public website
- **Status:** Accepted and implemented for the design foundation, 2026-10-30.
- **Context:** Public marketing and educational site needs SEO, performance, and Vue developer ergonomics.
- **Decision:** Use Nuxt (Vue 3 + TypeScript), with Tailwind CSS if consistent with the current project.
- **Alternatives:** Plain Vue SPA, other SSR/static frameworks.
- **Rationale:** Nuxt provides routing and static/SSR options suitable for public discoverability.
- **Consequence:** Avoid unnecessary application-server complexity; prerender most pages.

## ADR-002 — Reuse Spring Boot, not a second financial backend
- **Status:** Intended.
- **Decision:** Consume minimal, approved public endpoints from the existing backend only for dynamic public information.
- **Rationale:** Prevent duplicate financial business logic and extra operations.
- **Consequence:** Website must remain useful when optional statistics are unavailable.

## ADR-003 — Broker-independent investor experience
- **Status:** Core product principle.
- **Decision:** Supported PDF imports and verified manual workflows should not require a broker partnership.
- **Consequence:** Do not gate the marketing proposition on future integrations.

## ADR-004 — No implied brokerage or partnership
- **Status:** Core communications constraint.
- **Decision:** State clearly that Struct Capital is independent software; document-format support does not imply a formal broker relationship.
- **Consequence:** All partner logos, integrations, licensing, and transaction claims require verification.

## ADR-005 — Keep future capabilities documented, not implemented
- **Status:** Core delivery rule.
- **Decision:** Defer institutional SaaS, trading, custody, broker sync, and paid billing until separately approved and validated.
- **Consequence:** Maintain a staged roadmap without overbuilding.

## Decision template
```markdown
## ADR-NNN — Title
- Date:
- Status: proposed | accepted | superseded
- Context:
- Decision:
- Alternatives:
- Rationale:
- Consequences:
- Evidence/links:
```

## ADR-006 — Derive the web foundation from the existing mobile brand
- **Date:** 2026-10-30.
- **Status:** Accepted within the owner-requested design foundation scope; web additions remain reviewable.
- **Context:** Repository initially contained documentation and screenshots; the separate mobile app already has custom palette/component overrides and official V2 SVG masters.
- **Decision:** Preserve verified mobile olive/cream/ink, light/dark surfaces, symbol geometry, rounded panels and motion timing. Use CSS semantic tokens and Tailwind 4 mappings in a minimal Nuxt 4 scaffold. Use native system sans-serif; distinguish custom source values from inherited Material defaults and new web decisions.
- **Alternatives:** Invent a new fintech brand; blindly copy every Material default; build full marketing pages during the foundation task.
- **Rationale:** Recognizable brand continuity with accessible web layouts and a bounded implementation.
- **Consequences:** Internal noindex component review only; full pages and launch SEO deferred. Screenshots remain non-public until personal-data review. No mobile modifications, backend integration or publishing.
- **Evidence:** [Design System](DESIGN_SYSTEM.md), `app/assets/css/`, `app/components/`, `nuxt.config.ts`.

## ADR-007 — Shared native components and static SEO foundation
- **Date:** 2026-10-30.
- **Status:** Accepted within the requested architecture phase.
- **Context:** Existing mobile-derived tokens and base components must remain authoritative; the website needs reusable layouts/content patterns without becoming a second app.
- **Decision:** Add an idiomatic Nuxt default layout and focused components. Use native disclosure/FAQ/form controls, a single navigation/public-route registry, in-memory SSR-safe theme state, and route-aware SEO defaults. Prerender metadata handlers and marketing content; keep indexing disabled until a launch build explicitly enables it. Preserve the prior review at `/design-system`.
- **Alternatives:** Large UI/SEO/form libraries, JavaScript-only accordions/modal navigation, a separate financial service, publishing unfinished placeholder routes, indexing the component review.
- **Rationale:** Lower dependency and JavaScript cost, keyboard/no-JavaScript usability, accurate site discovery, and clear product boundaries.
- **Consequences:** New content pages must call the shared SEO helper for overrides and enter the sitemap registry intentionally. Static indexing changes require regeneration. Forms remain UI-only; statistics need explicit source/date/value input; private screenshots remain excluded. The root overview is partial, not a completed launch site.
- **Evidence:** `app/layouts/default.vue`, `app/components/`, `shared/site.ts`, `app/composables/useSiteSeo.ts`, metadata handlers, unit/generated-output tests.

## ADR-008 — Product-led homepage using authentic, privacy-conscious app excerpts
- **Date:** 2026-10-30.
- **Status:** Accepted within the requested homepage scope.
- **Context:** A real mobile brand/component foundation exists. Supplied dashboard and header captures include financial balances/account identity; there are no verified store URLs or public-release claims.
- **Decision:** Build the ten-section marketing homepage with source-confirmed capability copy and existing components/tokens. Use the full calendar and selected deterministic calendar/report/import crops, excluding emails and balances; link CTAs to actual page sections and screenshots rather than unverified stores. Keep source implementation evidence distinct from test/release verification.
- **Alternatives:** Invent a dashboard; expose original investor screenshots; make up app-store links; use a generic fintech theme; declare features publicly released from source inspection alone.
- **Rationale:** A concrete, distinctive product story that respects evidence, privacy, accessibility, and the marketing/app boundary.
- **Consequences:** Originals remain unchanged/non-public. Asset generation is optional/local; committed exports require no Swift runtime on the host. Store links, app privacy details and publication remain separately gated by real content. No mobile changes or financial backend are introduced.
- **Evidence:** `app/pages/index.vue`, `scripts/prepare-product-images.swift`, [Homepage evidence](HOMEPAGE_EVIDENCE.md).

## ADR-009 — Supporting pages, legal drafts, and explicit contact acceptance
- **Date:** 2026-10-30.
- **Status:** Accepted within the requested supporting-page scope.
- **Context:** Homepage/components already exist; seven routes are missing and no approved public inquiry endpoint is configured. Product release, issuer compatibility, pricing and app-security policy details are not established by this repository.
- **Decision:** Reuse the existing layout/tokens and compose focused supporting pages. Render categorized FAQ content with optional client search. Publish legal text only as explicit, noindex drafts. Add a default-off same-origin contact adapter with shared validation, bounded reads, origin/timing/spam/rate checks and server-private destination/credentials. Treat only explicit upstream acceptance as acceptance, with no automatic retry or delivery fiction.
- **Alternatives:** Duplicate the homepage/components; claim universal imports/partnerships/free pricing; invent legal approvals; use fake form success; expose private endpoint/token in the browser; add a second financial backend.
- **Rationale:** Clear product boundaries, accurate copy, accessible interaction, and a concrete integration contract without unauthorized external delivery.
- **Consequences:** Actual inquiries require approved provider configuration and server deployment. Edge/distributed rate controls, policy approval, operator/provider details and verified pricing/release/format data remain launch work. Drafts stay outside the sitemap. No live test message or mobile change was made.
- **Evidence:** New pages, shared/site.ts, contact validation/adapter, [Contact Integration](CONTACT_INTEGRATION.md), unit/HTTP/generated-output tests.

## ADR-010 — Build-time Markdown education with explicit evidence status
- **Date:** 2026-10-30.
- **Status:** Accepted within the requested learning scope; publication remains separate.
- **Decision:** Use MarkdownIt/YAML at build time, a shared generated metadata manifest, lazy per-article HTML payloads, four curated category views and optional local search. Keep eight source-checked explainers distinct from two visible noindex outlines. Enforce source dates/review intervals before builds; use Article schema only for completed source-checked content. Preserve brand tokens and existing components.
- **Alternatives:** Nuxt Content with its content query/storage layer, a hosted/database CMS, a hand-written Markdown parser, unsourced complete-looking guides, or current fee/rate tables from snippets.
- **Rationale:** Repository ownership and ten short resources justify a small static pipeline; no dynamic financial service or CMS is required. Established parsers avoid custom Markdown syntax/security code. Explicit scope and dates make uncertainty inspectable.
- **Consequences:** npm hooks generate ignored artifacts; direct Nuxt commands need content generation first and dev Markdown edits need restart. The compiler checks structure, not factual truth. An already deployed static page does not expire automatically: editorial calendar/scheduled CI and owner publication review remain required. Qualified local review is needed before operational/legal/tax material. See [Editorial workflow](EDITORIAL_WORKFLOW.md).

## ADR-011 — Institutional positioning without an institutional product claim
- **Date:** 2026-10-30.
- **Status:** Accepted within the requested positioning-page scope; publication remains separate.
- **Decision:** Implement `/institutions` as a static marketing page; distinguish source-confirmed investor technology, hypothetical problems and potential commercial models. Express data/consent safeguards as requirements for future evaluation, preserve partnership-independent workflows, and reuse the existing contact boundary with availability-aware copy. Discover through About and footer rather than expand the primary header.
- **Alternatives:** Retain the older documentation-only `/for-institutions` suggestion; duplicate the contact form; imply enterprise readiness or partnerships; build a broker portal/API from roadmap ideas; present data principles as implemented certifications.
- **Rationale:** The owner chose the current route and explicitly requested positioning rather than institutional functionality. Existing technical foundations justify a conversation, not unsupported availability or commercial claims.
- **Consequences:** Future service/partner/efficiency/control claims need evidence and responsible approval. No redirect is needed for the unimplemented earlier suggestion. Inquiry delivery remains off until approved configuration and deployment are provided. [Institutional positioning](INSTITUTIONAL_POSITIONING.md) records current evidence and review needs.

## ADR-012 — No speculative Spring integration; strengthen the existing inquiry boundary
- **Date:** 2026-10-30.
- **Status:** Accepted within the requested API audit/integration scope; no backend mutation/publication authorized here.
- **Evidence:** Read-only source of sibling `gabo-portfolio-api` (HEAD `7c9a16c`), particularly SecurityConfig, AuthController, PortfolioController, MarketController/MarketService and notification controllers. The mobile server module is only a Ktor sample. Existing proposed `/api/public/...` contracts are absent.
- **Decision:** Select no dynamic metric until a real reviewed public contract exists. Keep static content and no fabricated fallbacks. Do not use owner/account/session/portfolio endpoints, private notifications, operational jobs or market readers as substitutes. Retain the existing default-off contact adapter and harden its URL/response/cache/credential handling; document actual contracts and required separate backend work.
- **Alternatives:** Guess a public route/schema; expose authenticated APIs; count full account lists; introduce an unused configurable proxy/cache; poll market or health data merely to show dynamic content; silently edit the backend outside this workspace.
- **Rationale:** Current backend contracts do not meet the marketing need. Avoiding an unnecessary integration prevents privacy, query-cost and service-dependency risks. Contact is the existing explicitly scoped dynamic website boundary and must never claim unconfirmed delivery.
- **Consequences:** A maintained format/release catalog may justify a later narrow informational read or simply reviewed static content. Any public count requires definition/disclosure/privacy approval and controlled snapshot/cache behavior. A Spring inquiry service requires separate implementation and review. No new runtime base URL or external dependency is needed now; private contact configuration remains empty. See [API integration audit](API_INTEGRATION.md).

## ADR-013 — Isolate review/demo output and prepare an evidence-based release
- **Date:** 2026-10-30.
- **Status:** Accepted within the production-readiness review; human launch approval remains outstanding.
- **Decision:** Exclude the component review route/bundle/prerender output unless explicitly enabled for local review. Allow launch crawlers to read permanent draft noindex tags. Add baseline Nitro/static-host response policies, explicit cache boundaries and a bounded body-read deadline. Align lint/Node dev types with the installed tooling; retain the tested Nuxt version while documenting the unpatched low deepmerge advisory. Prepare a provider-neutral runbook and record concrete verification rather than advertise certification.
- **Alternatives:** Ship an unlinked demo page relying on noindex, disallow draft crawling so noindex cannot be read, apply long-lived public cache globally, silently enable contact/tracking/hosting, force a framework downgrade or claim a clean vulnerability audit.
- **Rationale:** Real release defects should be fixed without a redesign, guessed legal claims or backend expansion. Deployment still requires owner-approved facts, policy, provider/DNS settings and actual receiving-service readiness where applicable.
- **Consequences:** Default route count is 24; local review requires its private flag and remains noindex. Static hosts must apply/verify supported headers and proper 404/redirect/cache behavior. Contact defaults off; no live service was contacted. Qualified policy/content/rights review, risk acceptance or remediation, and post-host/device/assistive checks are separate human actions. See [Release review](RELEASE_REVIEW.md) and [Launch checklist](LAUNCH_CHECKLIST.md).

## ADR-014 — Retain Vercel Git deployment and add repository quality guards
- **Date:** 2026-10-30.
- **Status:** Accepted within the owner’s automatic-deployment request.
- **Evidence:** Existing Git connection to `OresteGabo/struct-capital`, Ready production `02a285b` on `structcapital.net`, successful Vercel GitHub status, no existing Actions workflow, and native Nuxt project settings.
- **Decision:** Keep Vercel as deployment owner, pin Node 24, add a native Vercel build command with quality/artifact checks and an independent read-only push/PR Actions workflow. Inspect the real Vercel output rather than a stale Node output directory.
- **Alternatives:** Add a redundant token-based deploy job; leave the broad engine range selecting Node 26; assume Actions automatically gates Vercel; impose unrequested branch restrictions or paid deployment checks.
- **Consequences:** Main pushes automatically reach production after successful Vercel build checks; Actions provides broader independent checks. No deploy token, new host, DNS mutation, backend integration or content approval is implied. Low dependency findings stay visible; legal/indexing/contact review remains separate. See [CI/CD](CI_CD.md).

## ADR-015 — Development-only Vue social templates with browser capture
- **Date:** 2026-11-02.
- **Status:** Accepted within owner-requested Phase 01.
- **Decision:** Reuse Vue components/tokens/assets and JSON drafts; add development-only Playwright PNG capture for square and portrait formats. Remove studio routes and omit handler registration in all production builds. Save CLI exports outside public assets and Git.
- **Alternatives:** Extend the macOS-only Swift Open Graph generator; duplicate layouts in canvas; use DOM-to-image serialization with potential font/SVG discrepancies.
- **Rationale:** Native browser capture keeps preview and export on one layout implementation. Existing Swift tools retain their distinct fixed Open Graph/screenshot preparation roles.
- **Consequences:** A development browser dependency and one-time Chromium installation are required. System font rendering depends on OS. Editor changes are temporary until saved in source JSON; publication remains manual and separately authorized.

## ADR-016 — Evidence-gated Kigali photography
- **Date:** 2026-11-02.
- **Status:** Accepted within the requested Kigali Editorial phase.
- **Decision:** Add a configurable Vue editorial template and a local approved-photo registry. With no standalone Kigali photo present, export clearly labeled missing-photo proofs rather than substitute imagery. Reuse official SC geometry for the small configurable signature.
- **Alternatives:** Extract photography from the app screenshot; source unrequested stock photography; generate city imagery; silently omit the missing photograph label.
- **Rationale:** The owner requires real user-provided assets and explicitly requests a missing-asset state when unavailable.
- **Consequences:** Final image cropping/location/rights review requires a supplied photograph. Preview and export remain development-only; no new public route, dependency or publishing feature.

## ADR-017 — A shared education template with editable editorial presets
- **Date:** 2026-11-02.
- **Status:** Accepted within the requested Investor Education phase.
- **Decision:** Use one Vue template with concept, myth/fact, did-you-know and terminology variants. Keep all rendered text editable, retain a visible source/note, and reuse one official SC signature with restrained gold details.
- **Alternatives:** Four duplicated templates; illustration-led finance graphics; invented performance examples; hardcoded source and disclaimer text that cannot be edited in the studio.
- **Rationale:** Shared rendering keeps both sizes maintainable, while source-backed presets demonstrate editorial structure without financial advice or unsupported returns.
- **Consequences:** Content edits still need factual review; layout validation rejects text that intrudes on header/source notes. Production isolation, current dependencies and marketing pages remain unchanged.

## ADR-018 — An illustrative bond timeline, not a financial calculator
- **Date:** 2026-11-02.
- **Status:** Accepted within the requested Treasury Bond Explainer phase.
- **Decision:** Use text-based ledger/timeline events, with principal first, editable coupon rows, maturity last, and a permanent illustrative-example marker. Keep all editorial/date/value/footnote fields editable while checking bounds and layout.
- **Alternatives:** Imply current BNR terms, compute coupon/yield schedules, conflate principal with income, or add generic infographic assets.
- **Rationale:** The requested learning references support an explanation of bond cash-flow categories, not live issue terms or a duplicate financial engine. Hypothetical units make the authoring example concrete without suggesting an actual offer.
- **Consequences:** Authors must review chronology, economic consistency and source claims themselves; export guards prevent clipping and overlap but cannot certify financial content. Production, dependencies and marketing pages remain unchanged.

## ADR-019 — Reuse approved screenshot derivatives for product social artwork
- **Date:** 2026-11-02.
- **Status:** Accepted within the requested Product Showcase phase.
- **Decision:** Use a fixed registry of the four existing public screenshot views, ScScreenshot contain rendering and native-size export guards. Adapt the report-card layout to its wide aspect ratio; retain capture-specific captions and optional official SC geometry.
- **Alternatives:** Expose raw screenshots with account identity/balances; duplicate files; synthesize cleaner app UI; enlarge the smaller calendar derivative; add a second device frame or crop away important states.
- **Rationale:** The existing Swift outputs already cover this phase with reviewed privacy crops and sufficient pixels. Reuse protects authenticity and avoids another image pipeline.
- **Consequences:** New views need source/privacy review and an entry in the existing preparation pipeline if necessary. Screenshot dates/receipts/report cards are not live offers, successful new imports or official filings. No asset duplication, production endpoint, dependency or release claim is added.

## ADR-020 — Restrained brand statements with evidence-gated photography
- **Date:** 2026-11-02.
- **Status:** Accepted within the requested Brand Statement phase.
- **Decision:** Provide typography/photo-panel variants using existing tokens and official light/reversed symbols. Extend the existing photo registry for approved Rwanda locations while keeping Kigali-only filtering. Export clearly labeled proofs when a real photograph is missing.
- **Alternatives:** Reuse a dashboard’s embedded city picture without separate provenance, download stock imagery, generate a city image, duplicate the registry, or label a non-Kigali location as Kigali.
- **Rationale:** The owner requires real local photography and restrained branding. No suitable standalone photograph exists in the repository.
- **Consequences:** Typography can be exported now; completed photographic artwork awaits a user-provided approved image. Theme/pattern/text controls are local-only, with no new dependency, publication or production endpoint.

## ADR-021 — Use exact monogram fragments for three connected steps
- **Date:** 2026-11-02.
- **Status:** Accepted within the requested Three-Step Guide scope.
- **Decision:** Read the official SVG’s S-ribbon, C-upper and C-lower paths for decorative markers, connect them with one quiet line, and validate exactly three editable stages.
- **Alternatives:** Generic numbered circles/icons; hand-redrawn approximate geometry; copied path data that drifts from the master; a new full-background pattern or dependency.
- **Rationale:** The owner explicitly requests SC-derived geometry and negative space. Existing supported workflow copy can explain the app without inventing capabilities.
- **Consequences:** Source path changes require review. Fixed generous spacing may require shortening edited copy; export detects collisions/overflow. Production isolation and official brand masters remain unchanged.

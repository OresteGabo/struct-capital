# Website Architecture

## Scope
This document describes **structcapital.net** and its boundaries with the existing KMP app and Spring Boot backend. It does not replace backend or mobile architectural documentation.

## Implemented website foundation (2026-10-30)

Nuxt 4 / Vue 3 / TypeScript with Tailwind 4 through `@tailwindcss/vite`. The extracted mobile tokens remain in `app/assets/css/tokens.css`; utilities and foundational styling are in `main.css`. No new client dependencies were added in this phase. Native system fonts avoid third-party requests.

```text
app/app.vue                    global SEO defaults, route announcer, NuxtLayout/NuxtPage
app/layouts/default.vue        skip link, ScHeader, one main landmark, ScFooter
app/pages/index.vue            marketing homepage; scoped composition using existing tokens/components
app/pages/design-system.vue    original review plus reusable-pattern specimens; always noindex
app/error.vue                  branded 404/general error recovery; always noindex
app/components/                presentational components and native interactive controls
app/composables/useSiteSeo.ts  route-level metadata and canonical defaults
shared/site.ts                 intended origin, implemented route registry, navigation, crawler policy
server/routes/robots.txt.ts    metadata only; prerendered for static hosting
server/routes/sitemap.xml.ts   metadata only; prerendered for static hosting
public/brand/                  official SVG masters and branded 1200×630 social image
scripts/                       contrast check and optional macOS social-image generator/source icon
tests/                         native Node tests plus generated-output assertions
```

The two server routes generate website discovery files, not a financial/backend service. There are no investor-account calls, financial calculations, cookies or analytics. A contact-only submission adapter now exists, disabled by default, with an explicitly configured private upstream rather than a new financial backend. `screenshots/` remains unmodified, non-public source material. Selected exports under `public/product/` exclude account identity and financial balances; provenance is recorded in HOMEPAGE_EVIDENCE.md.

### Composition and interaction

Use `ScContainer` for page width, `ScSectionHeading` for a deliberate heading level, and the existing `ScCard`/`ScButton` tokens. `ScLink` adds matching link variants while preserving anchor semantics. Content patterns compose these primitives rather than creating a second styling system. See [Design System](DESIGN_SYSTEM.md) for component APIs.

Header/footer navigation shares one typed list in `shared/site.ts` and references existing destinations only. Mobile navigation is a native non-modal details disclosure, not an ARIA menu. It works without JavaScript; enhancement closes it on navigation or Escape and restores summary focus on Escape. Native FAQ disclosures also work without JavaScript. There is no focus trap because the disclosure is not a modal. Current-link state compares the full destination including hash, avoiding the router's same-page anchor ambiguity.

The OS preference remains the default theme. The footer selector uses SSR-safe Nuxt `useState` and a root attribute; it persists across client route navigation in memory only. No cookie/localStorage policy or initialization script is introduced. IDs come from Vue `useId` for SSR/hydration stability. Form wrappers forward field attributes to native controls and explicitly link labels, hints, errors, invalid states, and required flags. They do not submit or validate on a server.

### SEO, static output, and launch flag

`useSiteSeo()` is installed globally and reused for page overrides. It sets site/page titles, descriptions, Open Graph and Twitter defaults, the real local social image, canonical URL, and robots metadata. Canonical URLs use `https://structcapital.net`, remove queries/fragments/trailing slashes, and cannot change origin based on supplied paths. Root retains its trailing slash. Canonical policy is a metadata convention; the eventual host should implement matching redirect rules. No false organization/address/store/review schema or social account handle is invented.

`npm run build` creates production Nuxt output. `npm run generate` prerenders `/`, `/design-system`, `/robots.txt`, and `/sitemap.xml` into `.output/public`, without requiring a runtime server. The crawler discovers only implemented links. The public sitemap registry currently contains only `/`; future content routes must be added intentionally after implementation and review. No fabricated modification dates, empty planned routes, or legal placeholders are added.

Default: `siteIndexable=false`, page metadata `noindex, nofollow`, robots disallows all, and sitemap has no entries. For a reviewed launch artifact, run `NUXT_PUBLIC_SITE_INDEXABLE=true npm run generate`. That build enables root indexing and a root sitemap entry, while `/design-system` and error pages remain noindex. The review route is excluded from the sitemap and disallowed in robots. Robots/noindex are crawler instructions, not access control. Regenerate when changing this flag; runtime environment changes cannot update already emitted static files. No hosting is configured or publication performed.

### Performance and asset handling

Native details/summary eliminate accordion/menu dependencies; no UI framework, icon bundle, image service, or font package was added. `ScScreenshot` requires dimensions and reserves aspect ratio, lazily loads/decode-async by default, accepts `srcset`/`sizes`, and offers explicit priority for the one above-fold image if needed. Its missing/failed state does not invent a screenshot. Callers must provide optimized approved image variants and useful alt/caption text; the component does not automatically transcode images. No unredacted account-identity/dashboard screenshot is bundled; selected public exports retain original source content. `public/brand/social-preview.png` is 1200×630, generated locally from existing official artwork and system type, with no financial data.

### Verification

Use Node 24.15.0 from `.nvmrc` (the pre-existing Node 25 host is outside current Nuxt support). Run lint, typecheck, contrast checks, `npm test`, production build, generation, and `npm run test:generated`. Tests exercise canonical origin/query boundaries, preview/launch crawler gates, generated semantic landmarks/metadata, no private assets, unique form IDs and linked labels. Browser verification covers responsive menu, keyboard Escape/FAQ, local form interaction and recovery, and theme changes. Real-device/screen-reader review and hosting-specific redirects/cache/security headers remain launch work. Prior dependency audit findings are recorded in DESIGN_SYSTEM.md; this phase does not upgrade or downgrade dependencies.

## Proposed components
```text
Visitors / search engines
         |
         v
structcapital.net — Nuxt (Vue 3 + TypeScript)
  |  static/prerendered pages, content, SEO, UI
  |  optional server-side/public fetch
         v
api.structcapital.net — existing Spring Boot backend
  |  carefully scoped read-only public endpoints
         v
existing services/database — aggregated, non-identifying data

KMP mobile application ------> existing authenticated Spring Boot APIs
```

## Frontend
- Nuxt for routing, metadata, prerendering/SSR where justified.
- Vue 3 and TypeScript for typed, maintainable components.
- Tailwind CSS/design tokens for visual consistency.
- Repository Markdown compiled at build time for articles; no runtime content database/CMS. See ADR-010.
- Static hosting/CDN initially where deployment constraints permit.

## Boundaries
- The website does not calculate holdings, parse investment PDFs, or maintain investor accounts.
- The Spring Boot backend remains authoritative for financial domain logic and authenticated user data.
- Public website endpoints must not reuse authenticated investor endpoints by simply disabling authorization.
- No public direct database connection, secrets, broker credentials, or investor documents.

## Suggested project layout (adapt to actual repo)
```text
app/ or pages/         # Nuxt route and UI organization (version-dependent)
components/            # Reusable presentational components
composables/            # Client-side reusable logic
content/                # Educational Markdown and topic/category taxonomy
public/                 # Approved static assets
server/                 # Only when necessary; never financial business logic
assets/                 # Styles and local assets
nuxt.config.ts
README.md
AGENTS.md
docs/
```

## Deployment and runtime
- Use environment-specific public API base URL; never expose private credentials in `runtimeConfig.public`.
- Pre-render marketing routes; keep public stats optional and resilient to API outages.
- Protect contact forms against spam and abuse.
- Maintain separate website and backend deployment pipelines; coordinate API changes via contracts.

## Quality attributes
SEO, accessibility, low hosting cost, privacy, predictable caching, observability without PII, resilience when API is unavailable, and maintainable design components.

## Architectural decisions to validate
Hosting provider, API caching strategy, consent/analytics approach, and localization priorities. Build-time Markdown was selected for the current educational section (ADR-010). Record accepted decisions in [Decisions](DECISIONS.md).

## Homepage phase

Homepage section content is local typed data plus semantic Vue markup; its layout rules are scoped to `app/pages/index.vue`. It reuses ScContainer, ScLink, ScSectionHeading, ScFeatureCard, ScFaq, ScCta, and ScScreenshot. No general section-rendering engine, chart library, backend fetch, new font or client dependency is added. Navigation now targets the app overview, how-it-works, and questions anchors.

ScScreenshot adds optional `frame=false` for supplied device-frame captures and `fullSize` for native links to the published image. Default behavior remains compatible with the original design review. Its dimensions, aspect-ratio reservation, priority/lazy behavior, and missing/error fallback remain intact. Only the hero calendar uses high fetch priority; below-fold images lazy load.

`scripts/prepare-product-images.swift` is an optional macOS asset export utility. It reads supplied screenshots, crops selected safe regions and resizes with CoreGraphics, writes only to `public/product/`, and never reconstructs app UI or changes original files. Committed exports are used by all platforms; Swift is not a website build dependency. The user explicitly requested real screenshot reuse; no generated financial data or dashboard mockups were introduced.

The source-only mobile inspection did not run its build/tests or write to that project. Capability evidence and release uncertainty remain separate from website verification. See [Homepage evidence](HOMEPAGE_EVIDENCE.md). Business API architecture and publication boundaries are unchanged.

## Supporting routes and contact boundary

Seven new pages reuse the default layout and established components. ScPageIntro composes breadcrumbs and section heading without introducing a content engine. Native FAQ answers are stored in `app/data/faq.ts`; filtering is a small computed client view, while the full categorized content is server-rendered. Clearing empty results restores search focus. Navigation handles trailing slashes, tracking queries and section destinations consistently through the shared route helper. The desktop header breakpoint moves to 1024px to fit five real page links.

Privacy/terms are explicit drafts with permanent noindex metadata and sitemap exclusion. Public-route registration drives prerendering; drafts/review are added for static output but not public discovery. Every new page supplies unique SEO title/description, inherited social image, and matching social metadata through useSiteSeo.

`shared/contact.ts` holds bounded field validation used on client/server. `server/api/contact.post.ts` enforces configuration/origin/MIME/size/timing/spam/rate checks; `server/services/contact.ts` handles limited streaming, memory rate limits and one authenticated HTTPS forwarding request. Only an explicit upstream acknowledgment becomes acceptance. No database, queue, email provider, investor API or financial service is added. Public config contains an enable boolean only; target URL/token stay private. See [Contact Integration](CONTACT_INTEGRATION.md) for the exact contract and limitations.

Pure static output keeps contact off. A real form requires the Node/Nitro build (or reviewed equivalent server adapter), approved private service configuration and an accurate reviewed notice. Prerendered public flags must be set at build time. Internal rate limits are bounded/per-process, not a distributed control; proxy/edge protections and host security/logging review remain operational dependencies.

### Supporting-page verification record

- Node 24.15.0: lint and TypeScript passed; 34 semantic contrast checks passed.
- Eleven policy/validation/filter/transport tests and two real localhost HTTP-boundary tests passed. Positive transport is mocked; no live message was sent.
- Production build passed. Eight generated-output tests passed under launch indexing and again under default preview configuration. Final static output restores contact delivery and public indexing off; draft pages remain noindex in either mode.
- Generated tests cover all nine page routes, unique titles/descriptions/social metadata, canonical URLs, semantic landmarks, unique control IDs/labels, every internal page link and anchor, privacy exclusions, and unavailable-contact/draft states.
- Browser matrix covered every requested page at 320px, 768px and 1280px without horizontal overflow. Search/category/reset, native disclosure keyboard controls, menu Escape, dark-mode navigation, first-invalid-field focus, preserved unsent input and restored failure-feedback focus were checked. The expected 503 from an unconfigured local contact test was deliberately exercised; no real provider delivery was attempted.
- Hosting-specific headers/redirects, real provider configuration/acceptance, distributed/edge abuse controls, real-device/assistive-technology audits and legal approval remain distinct launch dependencies.

## Markdown learning section

`/learn`, `/learn/category/[category]` (four curated categories), and `/learn/[slug]` (eight source-checked guides and two outlines) reuse the shared layout/brand. ScLearningIndex owns small optional client search/topic state; ScArticleCard shares metadata treatment. Article templates provide breadcrumbs, TOC, source scope/dates, related guides and a real product CTA. Body typography is a web editorial extension, not a replacement brand.

A build-time MarkdownIt + YAML compiler (`scripts/build-learning.mjs`, `scripts/lib/learning.mjs`) validates content, disables HTML/executable content and generates an ignored shared metadata manifest plus per-slug HTML/TOC JSON. Nuxt Content was considered; its content query/database layer is unnecessary for ten repository-owned articles. No database, runtime content endpoint or parser reaches the browser. Generated JSON imports work in Nuxt and native Node tests using import attributes. npm lifecycle hooks compile before Nuxt consumes the manifest; direct Nuxt commands require `npm run content:build` first. Markdown edits require dev restart.

`shared/learning.ts` holds pure discovery, related-article and safe schema helpers. `shared/site.ts` derives learning sitemap entries from source-checked content; outlines are prerendered explicitly but remain noindex and outside the sitemap. Preview indexing remains off. Article bodies load per route through Vite's lazy JSON imports and Nuxt payloads. Unknown slugs/categories return 404 rather than a placeholder article. DateModified is supported by actual content metadata; no initial publication date is invented. No public business API contract changes. See [Editorial workflow](EDITORIAL_WORKFLOW.md) for source review, static-expiry limits, authoring and exact lifecycle commands.

### Learning verification record — 2026-10-30

- Node 24.15.0: lint, TypeScript, 15 unit/content/validation tests and 34 light/dark contrast checks passed.
- Production build with launch indexing enabled passed. Nine generated-output checks passed for all 24 content/review/draft page routes, including internal links/anchors, unique SEO/social metadata, Article schema, source dates and draft exclusions. Both real localhost contact HTTP tests passed; no external message was sent.
- Static generation and the same nine generated checks passed with default preview indexing disabled. Final output retains `Disallow: /`, an empty preview sitemap and contact delivery off; nothing was deployed.
- Browser matrix: learning index, bond category, source-checked article and BNR outline at 320/768/1280px had no horizontal overflow. Search/topic/reset, focus restoration, native contents disclosure/heading anchors, dark theme, mobile Menu/Escape and client article navigation were exercised; no browser console warnings/errors were observed. Valid learning routes returned HTTP 200 and unknown slugs/categories returned 404 from the production Nuxt server. Static hosting must preserve appropriate 404 status behavior.
- Live source-link monitoring, scheduled review CI, qualified Rwanda operational/legal/tax review, real-device/assistive-technology audits and hosting checks remain editorial/launch responsibilities; they were not represented as automated certifications.

## Institutional positioning route

`app/pages/institutions.vue` is a prerendered presentation page composed from the existing layout, ScPageIntro, ScContainer, ScCard, ScSectionHeading, ScFeatureCard, ScLink and ScCta. Local arrays hold bounded editorial content; no new component framework, dependency, data source, CSS token or interactive business feature is introduced. `shared/site.ts` registers `/institutions` for generation/launch discovery and exports `footerNavigation` as the existing primary list plus the institution destination. ScFooter uses it; the header stays unchanged. About links to the new page.

The inquiry CTA reads only the existing public contact-enabled boolean and points to `/contact`. It advertises current unavailability when disabled. The existing validated institutional topic and private transport contract are unchanged. No query-prefill state, contact endpoint, document submission, institutional backend or portal is added. The earlier documentation-only route suggestion `/for-institutions` is replaced, with no alias for a never-implemented route. See [Institutional positioning](INSTITUTIONAL_POSITIONING.md) for evidence/status and review requirements.

Institutional phase verification: lint/typecheck, 15 unit/content tests, 34 contrast checks, production build, static generation and 9 generated-output checks across 25 pages passed. Browser checks covered 320/768/1024/1280px, keyboard anchors/menu, dark theme, About/footer discovery and the honestly disabled contact destination. No new dependencies, external requests or test messages; final static indexing/contact flags remain off. See INSTITUTIONAL_POSITIONING.md for limits.

## Backend contract audit and contact hardening

The separate Spring backend was inspected read-only; `portfolio/server` is a Ktor sample, not the financial API. No suitable public marketing-data/contact contract exists in the inspected Spring controllers. No generic proxy, API-base config, user-count query, market-data fetch, service-health polling, metric cache or second backend was added. Static marketing/learning pages remain independent of backend availability. See [API integration audit](API_INTEGRATION.md) for actual security/routes, market-cache side effects and rejected candidate data.

The existing optional contact transport explicitly rejects the inspected `/api/bonds` namespace, URL query/userinfo/fragment and percent-encoded paths. Requests use no-store cache policy, no cookies/referrer, bounded timeout/response and one narrow private credential. A 2xx JSON MIME acknowledgment with boolean acceptance is required; failed/oversized bodies cannot become acceptance and unused bodies are cancelled. Public responses retain no-store even on failures/rate limits. The current endpoint remains empty and the UI remains disabled. Configured endpoint ownership/network-egress approval is still an operational requirement, not established by URL syntax.

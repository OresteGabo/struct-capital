# Website architecture

Current release review: 30 October 2026. This document describes the Nuxt marketing/education website, not the separate KMP investor application or Spring financial backend. Earlier phased implementation rationale is retained in [Decisions](DECISIONS.md).

## Stack and boundaries

Nuxt 4.6.3, Vue 3, TypeScript, Tailwind 4 via Vite, native system fonts and the existing mobile-derived semantic tokens. ESLint 10 aligns with the installed Nuxt lint plugins; Node 24 type declarations make build-time configuration type-safe. Use Node 24.15.0 from `.nvmrc` and the committed lockfile. No customer database, portfolio calculations, investor login, broker portal, tracking, third-party fonts or financial API proxy is introduced.

The actual financial API is the separate `gabo-portfolio-api` Spring repository. Read-only inspection found no appropriate public marketing DTO/contact contract. The mobile repository's `server` is a Ktor sample. Website static content does not request either backend, market data, operational health or investor endpoints. See [API integration audit](API_INTEGRATION.md).

## Source map

| Source | Responsibility |
| --- | --- |
| `app/app.vue`, `app/layouts/default.vue` | Route SEO defaults, announcer, skip link, shared header/footer, one main landmark |
| `app/error.vue` | Branded 404/unavailable recovery, noindex, no exception details shown |
| `app/components/` | Shared buttons, cards, links, navigation, headings, forms, FAQ, screenshots, states and learning patterns |
| `app/assets/css/tokens.css`, `main.css` | Extracted mobile colors and explicit web type/layout roles; keyboard focus, forced colors and reduced motion |
| `app/pages/` | Existing marketing, educational and clearly labeled draft pages |
| `app/composables/useSiteSeo.ts` | Unique titles/descriptions, canonical origin, Open Graph/Twitter image and indexing gate |
| `shared/site.ts` | Intended public origin, page/navigation registries, canonical/crawler policy |
| `content/learn/*.md`, `content/learning.json` | Repository educational articles and curated taxonomy |
| `scripts/build-learning.mjs`, `scripts/lib/learning.mjs` | Validated build-time Markdown, source dates, review expiry and safe HTML/TOC generation |
| `shared/learning.ts` | Local discovery/search, related guides, reading metadata, safe Article JSON-LD |
| `server/routes/` | Prerenderable local robots/sitemap metadata only |
| `shared/contact.ts`, `server/api/contact.post.ts`, `server/services/contact.ts` | Existing optional inquiry validation/transport boundary, default off |
| `public/brand`, `public/product` | Official SVG masters/social image and approved screenshot derivatives |
| `public/_headers`, `nuxt.config.ts` | Static-host example and Nitro response security/cache policies |
| `tests/` | Native Node validation/policy/content tests, production localhost HTTP checks and generated-output checks |

## Routes and composition

The public registry contains 20 routes: Home, Features, How It Works, About, FAQ, Contact, Institutions, Learn, four learning categories and eight source-checked guides. Four additional routes are deliberately noindex and outside sitemap: Privacy draft, Terms draft and two editorial outlines. Default production output therefore has **24 page routes**. Error/fallback HTML and JSON payloads are not additional content pages.

`/design-system` remains a local component review, but is excluded from routing, client bundles and prerender output by default. Enable only for local work with `NUXT_DESIGN_REVIEW_ENABLED=true npm run dev`; it always remains noindex and is never a public sitemap entry. Keep that flag false on every hosted build. This replaces the earlier practice of shipping an unlinked review page with noindex alone.

Marketing pages compose focused components, not a new section engine. Header/mobile navigation stays investor-focused; the footer adds Institutions, and About links there. FAQ/native contents/menu disclosures work with keyboard semantics and optional client enhancements. There is no modal focus trap. Escape closes the mobile menu and restores summary focus. Filtering needs JavaScript; all initial article/FAQ content and category links are server-rendered. Form labels/errors use Vue-generated stable IDs and native controls.

Theme defaults to the OS preference. The footer's explicit light/dark selection lives in SSR-safe Nuxt memory state, survives client route navigation and intentionally resets on a full reload. No cookie/localStorage initialization or third-party font request is needed. Brand SVGs match mobile masters byte-for-byte. Source screenshots stay outside public assets; only existing privacy-conscious derivatives are served. See [Design system](DESIGN_SYSTEM.md) and [Homepage evidence](HOMEPAGE_EVIDENCE.md).

## Rendering and content pipeline

`npm run build` emits a Node/Nitro server plus prerendered marketing pages. `npm run generate` emits pure static `.output/public`, without a contact runtime. npm hooks compile Markdown before install preparation, development, typecheck, tests and either build. Direct Nuxt invocations need `npm run content:build` first. Markdown edits need a dev-server restart; no custom file watcher/CMS/database was added.

MarkdownIt/YAML are build-only. Raw HTML is escaped, body images require an approved asset workflow, links are limited, headings receive unique anchors, and Article JSON-LD escapes `<`. Ignored metadata/per-article HTML JSON outputs are regenerated, with article bodies loaded per slug. Reading time is an estimate at 200 words/minute. Source-checked guides require dated evidence and a review deadline no more than 180 days away; overdue reviews fail the next build. A deployed static artifact does not expire itself: schedule review/build checks before the current 28 April 2027 deadline. The compiler validates structure, not truth or professional approval. See [Editorial workflow](EDITORIAL_WORKFLOW.md).

## SEO and discovery

Canonicals use `https://structcapital.net`, remove query/fragment/trailing slash and cannot accept a caller-supplied origin. Header/social metadata includes the real branded 1200×630 image; each implemented page overrides its title/description. Source-checked educational articles have factual Article data with an organization author/publisher and actual modified date/citations; drafts never have Article schema. No invented initial publication date, partner, ratings, corporate address, license or store schema.

Indexing is opt-in at build time: `NUXT_PUBLIC_SITE_INDEXABLE=false` gives noindex metadata, all-disallow robots and an empty sitemap. A reviewed launch build with true enables the 20 public routes. Legal/editorial drafts remain noindex and excluded from sitemap. Launch robots permits crawling their noindex tags instead of blocking those pages; API paths remain disallowed. Robots/noindex are not access controls for preview hosts or confidential material. Canonical redirects, preview authentication and final search verification belong to the selected host/release process.

## Security, response policy and caching

Nitro route rules set nosniff, frame denial, a restrictive Permissions-Policy, referrer policy and a limited CSP for base/object/frame/form boundaries. This is not a complete script-XSS CSP: a strict script nonce/hash policy needs separate host-aware review with Nuxt hydration/JSON-LD. HSTS is deliberately not asserted before TLS/hostname readiness is verified. Reverse-proxy headers, TLS, request/time limits, logging and edge abuse controls must be checked at the chosen deployment.

Node HTML/payload metadata responses revalidate (`no-cache`). Fingerprinted `/_nuxt/` assets use one-year immutable caching; unversioned brand/product assets use one-hour revalidation. `/api/` is no-store. `public/_headers` supplies equivalent baseline/security and asset/metadata examples for compatible static hosts; HTML revalidation remains a host requirement/default to verify. It is not automatically enforced by arbitrary static servers or on Pages Functions. Never cache HTML/payloads for a year or apply public caching to inquiries. Retain old fingerprinted assets through deployment transitions or reload clients safely.

Contact is the sole optional website write boundary. Public config contains an enable boolean only; its private fixed service URL/token and allowed Origin stay server-side. It is not a Spring contact implementation. Size/timing/honeypot/schema/MIME/Origin/rate checks, an eight-second body-read deadline, bounded acknowledgment, no retry, no-store/no-cookie/no-referrer transport and inspected investor-namespace exclusion are implemented. Only explicit acceptance becomes success; ambiguous failure preserves text. In-process bounded/salted rate counters are not distributed protection. No actual service is configured and no real message has been sent. See [Contact Integration](CONTACT_INTEGRATION.md).

## Performance and quality

No new animation, image, chart/font/UI dependency or redesign was added during release review. Native controls minimize custom JavaScript. Screenshot dimensions reserve layout space; only the hero calendar is high priority, other screenshot components lazy-load. A small above-fold report excerpt is intentional. All product PNGs together are about 766 KiB; the browser chooses one hero srcset size rather than both. Optional Swift tools reproduce existing crops/artwork and are not deployment dependencies.

The launch-profile homepage references approximately 88.7 KiB gzip JavaScript and 5.5 KiB CSS; the entire emitted JS set is approximately 130.3 KiB gzip. These are local file measurements, not Lighthouse scores, real-network transfer guarantees or field Core Web Vitals. No source maps are emitted. Standard Nuxt prefetch/hydration remains for routing, theme, forms and filters; there is no blanket client-only render path.

Release checks and measured limits are recorded in [Release review](RELEASE_REVIEW.md). Deployment commands, DNS/TLS, environment flags, manual approvals and smoke/rollback actions are in [Launch checklist](LAUNCH_CHECKLIST.md). No publication, DNS change, purchase, provider account creation or backend mutation was performed.

## Verified hosting and continuous delivery — 2026-10-30

The existing Vercel Git integration serves `structcapital.net` from `main`. `vercel.json` selects native Nuxt output and runs repository quality checks before promotion. Node is restricted to the tested 24 line. Independent GitHub Actions verifies Node/static builds, artifact metadata/links, HTTP boundaries and dependency advisories; it does not itself deploy or gate Vercel promotion. Contact/indexing/review flags remain off by default. See [CI/CD](CI_CD.md) for exact configuration and operational boundaries; the earlier release review records the pre-hosting audit.

## Local social studio — 2026-11-02

Development registers `/social-studio`, `/social-studio-render` and `POST /api/social-export` only in Nuxt dev mode. Production removes both pages and never registers the handler (which lives outside server auto-discovery). Reusable Vue social components and repository JSON drafts share validation in `shared/social.ts`; development-only Playwright captures actual browser rendering. The CLI saves ignored PNGs under `exports/social/`. No marketing layout or financial integration changes. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Kigali Editorial — Phase 02 (2026-11-02)

The social studio now dispatches through SocialTemplate.vue to the original editorial template or KigaliEditorial.vue. The empty social-content/photos.json registry supplies validated local-only photo metadata through shared/social-photos.ts. Shared post validation carries template/theme/pattern/focal-point choices. No new production route or dependency is added; missing-photo proofs are explicitly marked and export rejects overlapping text or broken selected assets. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

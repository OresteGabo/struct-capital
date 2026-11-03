# Struct Capital — Official Website

**A clearer view of your investments, across brokers.**

This repository contains the public website for **Struct Capital**, an independent investment portfolio management application focused initially on Rwanda's capital markets. The website is hosted at **https://structcapital.net** through the existing Vercel GitHub integration.

> **For AI coding assistants:** This README is the product and implementation brief for the **website**, not a request to rebuild the mobile app or backend. Inspect the repository before changing anything. Treat roadmap items as planned, not released. Never invent broker partnerships, licensing, statistics, testimonials, or app capabilities.

## Local development — design foundation

The repository contains a Nuxt 4 / Vue 3 / TypeScript foundation with Tailwind 4, a shared responsive layout, reusable content/form components, and static SEO output. `/` is the marketing homepage, with product positioning, features, workflow, broker independence, real screenshot excerpts, trust boundaries, FAQ, and exploration CTAs. The component review at `/design-system` is local opt-in only and is excluded from production routes/output by default. Supporting product, workflow, about, searchable FAQ, contact, and clearly marked legal-draft routes are implemented. Contact delivery remains disabled until an approved server-side service is configured. The Markdown-based `/learn` section contains eight source-checked explainers, four categories, search/topic filters and two clearly labeled editorial outlines. The `/institutions` positioning page separates existing investor-app foundations from potential collaborations; inquiry delivery remains explicitly unavailable until configured. Production indexing is enabled through a Production-only Vercel setting; preview/local builds remain non-indexable by default. See [Design System](docs/DESIGN_SYSTEM.md) for the extracted mobile values, evidence, and web-specific decisions.

Use a Node version supported by `package.json` and the checked-in `.nvmrc`, then:

```sh
npm ci
npm run dev
```

Validation and local output:

```sh
npm run lint
npm run typecheck
npm run check:contrast
npm test
npm run build
npm run test:server
npm run generate
npm run test:generated
```

`build` creates a production Nuxt output; `generate` creates static files in `.output/public`. Vercel automatically deploys `main` to production and creates branch/PR previews. See [CI/CD](docs/CI_CD.md) for build guards, GitHub checks, and rollback. No environment variables or backend access are needed for local browsing. Real contact delivery requires the explicit private configuration in [Contact Integration](docs/CONTACT_INTEGRATION.md); it is off by default and does not work on pure static hosting without a server adapter. `NUXT_PUBLIC_SITE_INDEXABLE=true` enables public indexing when generating a reviewed launch build; `/design-system` is excluded by default; local review builds must explicitly set `NUXT_DESIGN_REVIEW_ENABLED=true` and never use that flag on the public deployment. Static output must be regenerated when this flag changes. See [Architecture](docs/ARCHITECTURE.md) for routes, components, and the launch SEO workflow. `screenshots/` contains unmodified reference material and is not served publicly. Selected calendar/report/import exports in `public/product/` exclude account identity and dashboard balances. See [Homepage evidence](docs/HOMEPAGE_EVIDENCE.md) for sources, crops, capabilities, and unresolved launch content.

## 1. What Struct Capital is

Investors can own Rwandan Treasury bonds and listed shares through different licensed brokers and receive separate documents, contract notes, allocation results, and statements. Keeping a clear consolidated view can be difficult.

**Struct Capital aims to give investors one place to organize and understand their investments regardless of which broker they use.** The mobile app can use supported financial PDFs to extract structured information, reducing manual entry. Users should also be able to manage investments from brokers that have **no partnership** with Struct Capital, subject to supported document formats and available manual-entry functionality.

Struct Capital is **not a stockbroker, securities exchange, custodian, or trading venue**. It does not currently execute trades or hold client investment funds. Investors continue to transact through their chosen authorized financial intermediaries.

**No broker partnerships or direct broker account connections should be claimed unless independently confirmed by the project owner.** Potential collaborations are a future possibility, not a dependency for the app's core value.

## 2. Purpose of this repository

Build a credible, fast, accessible, responsive, search-engine-friendly **marketing and educational website** that:

1. Explains the problem Struct Capital solves in plain language.
2. Clearly distinguishes Struct Capital from brokers.
3. Shows how investors can consolidate holdings across different brokers.
4. Explains supported PDF import and extraction workflows, with limitations.
5. Demonstrates **verified, currently available** mobile app functionality using real approved screenshots.
6. Builds trust through clear privacy, security, and data-control explanations.
7. Educates visitors about bonds, equities, coupons, dividends, and portfolio tracking in Rwanda.
8. Offers app-store links when approved and published.
9. Makes it easy for users to ask questions, submit feedback, and for institutions to express interest.
10. Optionally displays accurate, privacy-safe aggregate platform statistics from the existing backend.

**Primary audience:** Individual investors in Rwanda, including people who use one or multiple brokers. **Secondary audience:** Prospective institutional partners, brokers, and financial educators.

## 3. Technology and architecture

- **Website:** Nuxt, Vue 3, TypeScript.
- **Styling:** Tailwind CSS, using the project's actual brand tokens and existing conventions.
- **Content:** Local Markdown/content files or Nuxt Content if justified; no CMS required initially.
- **Mobile application:** Existing Kotlin Multiplatform (KMP) project, maintained separately.
- **API:** Existing Spring Boot backend, reused for appropriate public data when necessary.
- **Deployment:** Prefer pre-rendered/static pages on CDN-backed hosting; use server rendering only where it provides clear value.
- **SEO:** Metadata, canonical URLs, Open Graph images, sitemap, robots.txt, structured data where relevant, semantic HTML, and accessible navigation.

**Do not create a second general-purpose backend, database, login system, broker API, or portfolio engine for the marketing website.** Most marketing pages should work without a live API connection.

Suggested domains (subject to actual infrastructure):

- `structcapital.net` — public website.
- `api.structcapital.net` — existing Spring Boot API, if configured.
- Future partner portal — **not in scope**.

## 4. Product messaging

### Core value proposition

**All your investments. One clearer picture.**

Track and understand your Rwandan Treasury bonds and shares across brokers, with financial documents helping you organize your portfolio in one place.

### Key messages

- **Broker-independent:** The app's usefulness should not depend on a broker partnership.
- **Multi-broker view:** Consolidate investments from different brokers in a single portfolio experience.
- **Document-driven:** Import supported allocation results, contract notes, and statements to extract relevant investment data.
- **Investor-focused:** Understand holdings, transactions, investment income, and performance using verified features.
- **Transparent:** Struct Capital does not execute trades, act as a broker, or hold customer investment funds.
- **Partnership-ready, not partnership-dependent:** Direct authorized broker synchronization may be explored later with suitable agreements and customer permissions.

### Approved explanatory copy

> **Is Struct Capital another broker?**
>
> No. Struct Capital is an independent investment portfolio management software platform. You continue buying and selling securities through your chosen licensed broker. Struct Capital helps you organize and monitor your investments in one place.

> **Does my broker need to partner with Struct Capital?**
>
> No partnership is required to use supported document-import workflows. If your broker's PDF format is supported, Struct Capital can extract relevant information for your review. Other workflows may depend on the app's current capabilities; never promise universal PDF compatibility or automatic synchronization.

> **Can Struct Capital connect directly to my broker account?**
>
> Direct broker integrations are a possible future feature, subject to broker cooperation, appropriate authorization, privacy safeguards, and user consent. Do not describe them as currently available.

## 5. Website information architecture

### `/` — Home

Create a polished, high-trust landing page with:

- Strong hero message and concise explanation of the product.
- Prominent **not a broker** clarification near the introductory content.
- Actual mobile screenshots or approved placeholders until screenshots are supplied.
- Three-step explanation: invest through your broker → import supported documents / enter information using available app tools → review your consolidated portfolio.
- Key feature highlights based on verified mobile capabilities.
- Clear privacy and data-control messaging.
- Download links only when official store URLs exist; otherwise use a truthful coming-soon or beta status.
- FAQ preview and educational content preview.
- Contact/feedback call to action.

### `/features` — Product features

Explain supported features with realistic examples. Candidate sections include:

- Multiple broker portfolios in one view.
- Treasury bond holdings and allocation details.
- Shareholdings and acquisition records.
- Supported PDF document imports and extraction previews.
- Coupon schedules and investment income.
- Transaction history, fees, and portfolio analytics.
- Document traceability and reconciliation, **only if implemented**.
- Reports, reminders, and exports, **only if implemented**.

For each feature, verify current support before displaying it as live. Planned features must be labeled **Planned** or omitted.

### `/how-it-works`

Explain that brokers execute investment transactions, while Struct Capital helps users record and monitor them. Illustrate the difference between BNR bond allocation results and broker-issued equity contract notes/statements. Show a review-before-save workflow if the current app supports it. Explain unsupported PDF formats and manual alternatives accurately.

### `/faq`

Cover at least:

- Is Struct Capital a broker?
- Can I buy or sell shares through Struct Capital?
- Can I use it with any broker?
- What happens if my broker does not collaborate with Struct Capital?
- Which PDFs and institutions are supported?
- Does importing a PDF automatically connect my brokerage account?
- How is my financial information handled?
- Is Struct Capital free?
- Does Struct Capital provide investment advice?
- How can I report an import problem?

Answer without exaggerating current features or security assurances.

### `/learn` and `/learn/[slug]`

Educational, SEO-friendly content covering subjects such as:

- How Rwanda Treasury bonds work.
- Coupon rate versus yield to maturity.
- Bond allocation results and maturity dates.
- Understanding brokerage contract notes.
- Shares, dividends, and transaction fees.
- How to organize investments across multiple brokers.

Content should be informational, carefully sourced, dated where necessary, and not personalized investment advice. Do not invent current market prices, yields, tax rules, or regulatory requirements.

### `/institutions`

A modest, accurate page inviting conversations with licensed brokers and institutions about potential software solutions: document processing, reconciliation, reporting, and future customer-authorized integrations. **Do not claim an existing B2B product, client, integration, or partnership.** Present unbuilt offerings as areas of exploration.

### `/about`, `/contact`, `/privacy`, `/terms`

- About: mission, product scope, and honest development stage.
- Contact: validated contact details or a working, abuse-protected inquiry mechanism.
- Privacy: a real, reviewed policy describing actual processing and providers; never fabricate legal commitments.
- Terms: reviewed terms appropriate to the released service; do not invent legal approvals.

Optional later pages: changelog, status, supported document formats, accessibility statement, press resources.

## 6. Live platform statistics (optional, not launch-blocking)

The existing Spring Boot backend was inspected read-only and currently exposes no marketing statistics, supported-format catalog, release manifest or contact contract. Do not treat the previously suggested public endpoint names as implemented APIs. A separately reviewed future contract could return **approved aggregate or informational data** such as:

- Number of registered users, if suitable for public disclosure.
- Number of supported document formats.
- Number of supported institutions/document issuers, **not** number of partner brokers.
- Last-updated timestamp.

Rules:

- Never invent statistics or display sample values as real.
- Do not publish individual investment holdings, financial balances, uploaded documents, customer identities, or confidential broker data.
- Prefer precomputed/cached statistics over expensive live queries.
- Apply authorization boundaries, rate limits, and privacy review.
- Hide the statistics component gracefully when the API or approved data is unavailable.
- Do not create a public endpoint solely to make the landing page appear more impressive.

## 7. Design direction

Create a **distinctive, trustworthy financial technology brand**: modern, premium, approachable, and appropriate for Rwanda without visual clichés.

- Follow existing Struct Capital logos, colors, fonts, and design assets if present.
- If no design tokens exist, propose a restrained palette and document it before widespread use.
- Use generous whitespace, strong typography, clear data visualizations, and thoughtful motion.
- Prefer authentic mobile app screenshots over invented dashboards.
- Do not fabricate testimonials, press mentions, ratings, badges, partner logos, or security certifications.
- Ensure excellent mobile, tablet, and desktop layouts.
- Support accessible contrast, keyboard navigation, reduced motion, and semantic markup.
- Structure content for future localization; do not claim translations exist until implemented.

## 8. Security, privacy, and trust

- The website is public; it should not require investment-account authentication.
- Keep financial account data and uploaded PDFs out of the marketing website.
- Never expose Spring Boot credentials or private keys in Nuxt public runtime configuration.
- Treat public contact forms as untrusted input; validate and protect against spam and abuse.
- Use HTTPS, secure headers, and sensible content security policies.
- Minimize tracking and third-party scripts; respect applicable privacy/consent requirements.
- Do not state that user data is encrypted, deleted, retained, or shared in a particular way unless verified in the actual system.
- Do not imply financial regulatory approval, broker affiliation, or guaranteed investment outcomes.

## 9. Implementation plan for AI coding assistants

### Phase 1 — Inspect and plan

1. Inspect the existing Nuxt repository and any available shared brand assets.
2. Identify installed dependencies, current pages, components, styling, and deployment setup.
3. Preserve existing working code and conventions.
4. Create or update an implementation checklist in repository documentation.
5. Separate confirmed product facts from assumptions requiring owner confirmation.

### Phase 2 — Build the public website

1. Establish reusable layout, header, footer, navigation, and responsive components.
2. Implement Home, Features, How It Works, FAQ, About, and Contact pages.
3. Use real app screenshots if provided; otherwise use clearly labeled temporary placeholders.
4. Implement truthful feature-status and app-download states.
5. Make all calls to action functional; avoid dead buttons and placeholder links presented as live.

### Phase 3 — Content and discoverability

1. Implement educational article templates and local content authoring.
2. Add metadata, Open Graph, sitemap, canonical links, and structured data where appropriate.
3. Optimize accessibility, page speed, image delivery, and static generation.
4. Add institution-interest content without suggesting partnerships already exist.

### Phase 4 — Optional backend enhancements

1. Inspect existing Spring Boot APIs before adding endpoints.
2. Add approved, cached, aggregate statistics only if justified and authorized.
3. Implement a secure contact/feedback submission workflow only if needed.
4. Keep the website functional when backend-powered enhancements are unavailable.

### Phase 5 — Verification and release

1. Run lint, type checks, tests, and production builds.
2. Verify responsive behavior and accessibility.
3. Review every statement about product capabilities, brokers, security, and legal status.
4. Check for broken links, exposed secrets, fake statistics, and misleading calls to action.
5. Document deployment configuration and manual release steps.
6. Do not deploy, purchase services, or publish legal claims without explicit owner approval.

## 10. Future roadmap — document only

The following are **not requirements for the first marketing website release**:

- Direct, customer-consented brokerage account synchronization.
- Formal broker integrations and partnerships.
- Institutional SaaS dashboards and reconciliation products.
- Broker document-processing APIs.
- Premium investor subscriptions and billing.
- Multilingual expansion beyond implemented languages.
- Live market-data integrations.
- White-label investor portals.
- Securities order placement or execution.
- A separately licensed Struct Capital brokerage business.

Keep future concepts in repository Markdown roadmap files, with prerequisites and validation questions. Do not build them without explicit authorization.

## 11. Definition of done

The website is ready for an initial launch when:

- Visitors understand what Struct Capital does within seconds.
- It clearly states that Struct Capital is **not a broker**.
- It explains how investors can use supported document imports even without broker partnerships.
- Every advertised feature is confirmed as available or clearly marked as planned.
- No fictitious users, testimonials, partnerships, integrations, or statistics appear.
- Navigation, forms, links, and responsive layouts work.
- SEO metadata, accessibility basics, privacy review, and production builds are complete.
- The site can operate largely independently of the Spring Boot backend.
- The code remains understandable and inexpensive to maintain.

## 12. Working rules for Codex and other AI agents

1. **Inspect before implementing.** Never assume the project is empty.
2. **Do not rebuild the mobile app or Spring Boot backend.** This repository is for the website.
3. **Do not invent product features or external relationships.** Ask for verification or use explicitly labeled placeholders.
4. **Do not equate document-format support with broker collaboration.** They are different concepts.
5. **Do not promise that every broker PDF works.** Support is format-dependent.
6. **Do not imply automatic account syncing from a PDF upload.** Document extraction and live account connections are different.
7. **Do not build regulated financial services.** Struct Capital currently presents itself as portfolio management software.
8. **Prefer static content over backend dependencies** when information rarely changes.
9. **Reuse existing code and design assets.** Avoid unnecessary rewrites and dependencies.
10. **Test changes and summarize results.** Report implemented, existing, blocked, and deferred items separately.

---

**Struct Capital:** One place to understand your investments, no matter which broker you use.

## Learning authoring

Edit `content/learn/*.md` and `content/learning.json`; npm hooks generate the static registry and safe per-article HTML before development, build, generation, type checking and tests. Markdown edits need a dev-server restart. Run `npm run content:build` before invoking Nuxt directly. See [Editorial workflow](docs/EDITORIAL_WORKFLOW.md) for schema, source dates, status, review expiry, content inventory and outstanding fee/BNR research. No CMS or database is needed; drafts never enter the sitemap or Article schema.

## Institutional positioning

`/institutions` presents current investor-app foundations, discovery hypotheses and potential collaboration models without claiming a partner or institutional product. Footer/About links provide discovery; inquiries reuse the existing default-off contact experience. See [Institutional positioning](docs/INSTITUTIONAL_POSITIONING.md) for evidence, approval boundaries and content review needs.

## Verified backend integration status

The actual Spring application is the separate `gabo-portfolio-api` repository, not the mobile project’s Ktor sample. No suitable public marketing contract exists in the inspected backend, so no investor/market/health data is fetched and no metric is fabricated. The existing contact adapter remains off; it now explicitly rejects the inspected investor API namespace and uses bounded JSON, no-store transport and safe errors. See [API integration audit](docs/API_INTEGRATION.md) for real routes/security, data-selection decisions, configuration and required backend follow-up. Backend/mobile source and production services were not modified or queried.

## Release review and deployment

The existing site has been reviewed rather than rebuilt. Default production output contains 24 content/draft routes, including eight source-checked guides and four permanently noindex drafts. [Release review](docs/RELEASE_REVIEW.md) records fixes, tests, browser coverage, performance measurements and the remaining low-severity dependency advisory. [Launch checklist](docs/LAUNCH_CHECKLIST.md) contains static/Node commands, environment settings, DNS/TLS/redirect/cache requirements, human approvals and rollback steps. Public launch remains conditional on those gates; no deployment or DNS change was performed.

For local component work only: `NUXT_DESIGN_REVIEW_ENABLED=true npm run dev`. Leave that private build flag false on hosted builds. The checked-in static `_headers` example applies only on compatible hosts; verify equivalent policies on the actual provider. Contact remains off without a dedicated approved service; no Spring marketing API, live statistic or store link was invented.

## Local social media studio

The development-only Vue preview and PNG export at `/social-studio` includes the original editorial template, Kigali Editorial (with an explicit missing-photo state), four editable Investor Education styles, an illustrative Treasury Bond Explainer timeline, a Product Showcase using real app screenshots, Brand Statement variants (photography awaits an approved image), and an editable Three-Step Guide. See [Social media system](docs/SOCIAL_MEDIA_SYSTEM.md) for setup, editable JSON drafts, 1080×1080 / 1080×1350 exports and verification. Generated posts stay outside public assets.

The studio now has an explicit template gallery and native-size preview link. With dev running, `npm run social:audit` exports every preset at both sizes and writes pixel-parity/dimension evidence to ignored `exports/social/audit/`. See the Phase 08 status table in the workflow above for the two photography limitations.

## Reusable website pattern assets

The 24-composition SVG collection is available through `app/components/brand/ScBrandPattern.vue` and the typed registry in `shared/brand-patterns.ts`. It supports theme tokens and distinct mobile geometry; the homepage uses a configured fold hero and small arc divider. Run `npm run patterns:review` (after installing Playwright Chromium) to render the collection without starting the website. Evidence stays in ignored `exports/brand-patterns/`. See [Brand patterns](docs/BRAND_PATTERNS.md) for IDs, props, usage and verification scope.

The development-only gallery is available at `/brand-patterns` during `npm run dev`. It previews actual homepage content with family browsing, widths/themes, bounded adjustments, comparison and copied configuration. With dev running, use `npm run test:pattern-gallery` (set `PATTERN_GALLERY_ORIGIN` if needed). See the [gallery workflow](docs/BRAND_PATTERNS.md#development-only-gallery). Gallery and preview routes are excluded from production.

To change website artwork, edit **`shared/website-brand-patterns.ts`**: `hero.pattern` selects the hero ID, `sections.product` / `sections.independence` enable optional accents, and `dividers.workflow` controls the small divider. Set a slot to `null` to disable it. Default: `structural-fold-01` at `.75` intensity, `capital-arc-04` divider at `.65`, section accents off. No layout edits or public settings are needed. See [manual switching](docs/BRAND_PATTERNS.md#change-website-artwork-manually); run `npm run test:website-patterns` with the dev server available.

For the complete final pattern audit, run `npm run patterns:review`, then `npm run patterns:audit` with dev running (set `PATTERN_GALLERY_ORIGIN` to match). The [final audit record](docs/BRAND_PATTERNS.md#final-audit--2026-11-03) contains the 24-ID catalog links, selected defaults, exact commands, local example PNGs and remaining review limits. Audit evidence is never placed in public assets.

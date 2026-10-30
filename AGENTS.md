# AI Development Rules — Struct Capital Website

> Applies to this Nuxt website repository. Read `README.md` and relevant `docs` files before changing code.

## Source of truth and priority
1. Explicit instructions from the project owner for the current task.
2. Verified code, tests, configuration, and API contracts in the repositories.
3. `docs/FEATURES.md` for verified capability status and `docs/DECISIONS.md` for accepted decisions.
4. The product intent in `docs/VISION.md`, `docs/PRODUCT_LIFECYCLE.md`, and `docs/PRODUCT_STRATEGY.md`.
5. Ideas in `docs/ROADMAP.md` are **not** authorization to implement.

If documents disagree with actual code, report the discrepancy and propose a documentation update; do not silently invent functionality.

## Mandatory workflow
1. Inspect the current repository, dependencies, and conventions.
2. Identify existing, partial, absent, and deferred functionality.
3. State a small implementation plan; avoid broad rewrites.
4. Implement only the explicitly requested/current approved scope.
5. Run appropriate type checks, lint, tests, and build; report what could not run.
6. Update affected documentation and summarize changed files, limitations, and remaining work.

## Hard product boundaries
- This repository is the **marketing and educational website**, not a second portfolio management app.
- The existing **KMP mobile app** and **Spring Boot backend** are separate products/systems.
- Struct Capital is **not currently a brokerage, exchange, custodian, or trading venue**.
- Never claim current broker partnerships, direct broker synchronization, regulatory approvals, user numbers, app-store availability, live market data, or security certifications without verification.
- Supporting a broker-issued PDF is **not** a partnership with that broker.
- Core use must remain possible without broker partnerships, subject to supported imports and manual workflows actually implemented.
- Do not implement trading, custody, broker CRM, institutional multi-tenancy, subscriptions, or account syncing unless separately approved.

## Website engineering
- Prefer Nuxt, Vue 3, TypeScript, Tailwind CSS, and static/prerendered pages where appropriate.
- Use accessible semantic HTML, responsive layouts, SEO metadata, sitemap, and structured data only when factually appropriate.
- Use existing design tokens and components; do not replace branding arbitrarily.
- Use approved screenshots, text, testimonials, logos, and statistics only. Use clearly labeled placeholders in development.
- Never expose credentials, internal endpoints, investor records, or private financial data in public runtime config.
- Use backend APIs only for genuinely dynamic public data; do not duplicate backend financial logic.
- Handle loading, unavailable, and stale statistics gracefully; never fake a successful result.

## Documentation responsibilities
- Update `docs/FEATURES.md` when capability status is verified or changes.
- Update `docs/WEBSITE_SPECIFICATION.md` for approved page/content changes.
- Update `docs/ARCHITECTURE.md` and `docs/API_INTEGRATION.md` for technical changes.
- Record consequential decisions in `docs/DECISIONS.md` with rationale and alternatives.
- Keep deferred ideas in `docs/ROADMAP.md`, not in production code.
- Do not state that an unverified legal obligation is satisfied; mark for legal review.

## Definition of done
Working code, tests/checks where possible, accurate claims, accessible responsive UI, no exposed secrets, documentation updates, and a concise report of actual changes. Do not publish, purchase services, or contact external parties without approval.

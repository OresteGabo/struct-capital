# Website Specification — structcapital.net

## Foundation scope implemented (2026-10-30)

- `/`: implemented marketing homepage with hero, problem, solution, source-confirmed features, four-step workflow, multi-broker independence, authentic app excerpts, trust boundaries, seven FAQ answers, and final exploration CTA. No unverified downloads, investor balances, or platform statistics.
- `/design-system`: original design audit review preserved and extended with content, form, state, breadcrumb, CTA, and screenshot-placeholder specimens; always noindex.
- Default layout: responsive header/native mobile disclosure, shared existing-destination navigation, footer, theme selector, skip link and semantic main.
- Error view: branded not-found/unavailable recovery to home, without exposing raw error details.
- `/robots.txt` and `/sitemap.xml`: prerendered metadata, controlled by the explicit launch indexing flag. Defaults exclude the unfinished site; only implemented public pages enter the launch sitemap.

Reusable components cover the requested foundation. The features, how-it-works, about, categorized/searchable FAQ, contact, privacy draft, and terms draft routes are now implemented. The learning index, article templates and four category views are implemented with source-checked guides and explicit outlines. Contact delivery configuration, reviewed legal notices, verified download links, hosting and publication remain deferred. The homepage now uses privacy-conscious exports of the supplied screenshots; originals remain unmodified and non-public. See [Architecture](ARCHITECTURE.md) and [Design System](DESIGN_SYSTEM.md).

## Purpose and constraints
Build a fast, professional, SEO-friendly public marketing and educational website for Struct Capital. This is **not** the authenticated portfolio application. Use Nuxt/Vue/TypeScript and the existing Spring Boot backend only where dynamic public data is justified.

## Primary goals
1. Explain the product and its cross-broker value in seconds.
2. Explain clearly: **Struct Capital is not a broker**.
3. Explain supported PDF imports and how investors can participate without broker partnerships.
4. Showcase real, verified app functionality.
5. Answer trust, privacy, and compatibility questions.
6. Offer verified download links and feedback/contact paths.
7. Invite institutional conversations without claiming signed partners.

## Information architecture
| Route (suggested) | Core content | Primary action |
|---|---|---|
| `/` | Hero, problem, cross-broker workflow, proof, features, FAQs | Explore features / download when live |
| `/features` | Verified mobile app features and limitations | Learn how it works |
| `/how-it-works` | Import supported PDFs, review extracted data, manage portfolio | See supported formats |
| `/supported-documents` | Verified issuer/broker document formats, limitations | Request a format |
| `/learn` and `/learn/[slug]` | Bond/equity educational articles | Read related guides |
| `/faq` | Brokerage distinction, security, compatibility, imports | Contact |
| `/institutions` | Current independent positioning, verified app foundations, hypotheses and exploratory collaboration models | View inquiry availability / discuss through existing contact |
| `/about` | Mission, independent software positioning | Explore vision |
| `/contact` | Support, feedback, institutional inquiries | Send inquiry |
| `/privacy`, `/terms` | Approved legal texts | — |

Do not publish placeholder legal policies as if legally approved.

## Hero copy direction
**Headline:** One clearer view of your investments, across brokers.

**Supporting copy:** Organize and understand your Rwandan Treasury bonds and shares in one place. Import supported investment documents and follow your portfolio without requiring your broker to integrate with Struct Capital.

**Trust clarification:** Struct Capital is independent portfolio management software—not a broker, exchange, or custodian. It does not execute trades or hold investment funds.

## Essential FAQ answers
- **Are you a broker?** No. The app is for organizing and monitoring investments; trades remain with authorized intermediaries.
- **Must my broker partner with you?** No, for supported document imports and verified manual workflows.
- **Does support for a broker's PDFs mean partnership?** No.
- **Can I trade in the app?** Not as a current capability.
- **Can you connect directly to my broker account?** Do not claim this unless a real, authorized integration is live.
- **What if a PDF is unsupported?** Explain limits and a safe request/feedback path; never guarantee parsing of arbitrary documents.
- **Are balances and projections guaranteed?** No; distinguish user records, estimates, and verified market data.

## Content rules
- No invented testimonials, user statistics, partner logos, store links, or financial returns.
- Use approved screenshots from the actual app, not fabricated UI presented as real.
- Mark future features as planned/exploratory, not “coming soon” without owner approval.
- Include clear disclaimers near claims that could imply brokerage or advisory services.

## UX, SEO, accessibility
Mobile-first, readable typography, responsive navigation, keyboard support, semantic landmarks, strong contrast, reduced-motion respect, meaningful alt text, route-level metadata, canonical URLs, sitemap, robots rules, and optimized images. Prefer prerendered/static pages; fetch dynamic data only when necessary.

## Forms and analytics
Collect minimal information. Add consent and anti-spam protections as appropriate. Never send investor PDFs or personal financial data to marketing analytics. Public metrics are optional and must be verified, aggregated, cached, and safe to disclose.

## Acceptance criteria
All routes work; no dead CTAs; accessible layouts; clear broker distinction; accurate claims; fast builds; no exposed secrets; no unapproved publishing; tests/checks run and documented.

## Homepage implementation

- Hero: “All your investments. One clear picture.” explains independent investment portfolio management immediately. Primary action links to `#product`; secondary to `#how-it-works`.
- Problem/solution: fragmented records followed by a fixed dark brand panel grouping holdings, expected income, and source documents.
- Features: six cards cover bonds; shares/transaction history; supported imports; coupon dates; allocation/estimated values; portfolio/annual PDF reports. Wording does not promise live prices, all-format parsing, guaranteed returns, or public release availability.
- Workflow: add/import → review → organize → monitor. Broker execution remains separate from software record keeping.
- Independence: explicit support for supported manual/import workflows without broker partnerships; no account synchronization implication.
- Product views: full calendar plus calendar, annual-report and existing-document receipt excerpts. Account headers and dashboard balances are excluded. Full-size links aid inspection.
- Trust/FAQ: broker distinction, document compatibility, account connections, estimate limits, website/app privacy separation, and unavailable official download links.
- Final CTA: explore the real app screens. There is no fake store badge, waitlist, success submission, testimonial, or platform statistic.

The header/footer link to real homepage anchors. Light/dark roles, focus and reduced-motion conventions remain intact. The original review route is preserved. See [Homepage evidence](HOMEPAGE_EVIDENCE.md) for source verification and launch dependencies. Default indexing remains disabled; implementation is not publication approval.

## Supporting pages — implemented scope

| Route | Content / behavior |
|---|---|
| `/features` | Source-confirmed bond/share records, imports, income dates, estimates and PDF reports; safe actual app excerpts; non-numerical workflow example and explicit limits |
| `/how-it-works` | Add/manual entry → supported import → review → organize → monitor; document categories and compatibility limits; link for format questions without collecting investment PDFs |
| `/about` | Investor-focused mission, independent software boundaries and clearly labeled future possibilities |
| `/faq` | Fifteen answers in three categories, client text/category filtering with result count and clear/reset feedback; all answers rendered for native/no-JavaScript disclosure access |
| `/contact` | Accessible inquiry form and same-origin server integration boundary; off by default, no fabricated acceptance, no attachments; see CONTACT_INTEGRATION.md |
| `/privacy` | Explicit noindex draft covering known website processing and unresolved operator/provider/retention/app-policy review |
| `/terms` | Explicit noindex draft covering product/information boundaries and unresolved contractual provisions |

All routes use shared layout, breadcrumbs, tokens and distinct title/description/social metadata. Primary/footer navigation now links to real page routes; legal links are labeled drafts. Only the six public marketing routes (including `/`) enter a launch sitemap. Drafts and the internal design review never enter it. The homepage sections remain intact; no confidential original screenshot is added.

## Implemented learning experience — 2026-10-30

`/learn` lists eight short source-checked explainers and a clearly separate editorial-outline section. Four real category routes (`bonds`, `equities`, `documents`, `portfolio`) organize twelve topic labels; title/description/topic search and a topic selector refine the listing. All resources are rendered without JavaScript, with a visible filter limitation notice. Individual `/learn/[slug]` pages include reading time, breadcrumbs, native disclosure TOC, source scope/check and update dates, related completed guides, and relevant links to existing product/workflow pages.

BNR allocation-document and brokerage-fee pages are explicit outlines requiring evidence, never completed guidance or fee quotes. Draft pages remain noindex and outside sitemap/Article structured data; source-checked articles/categories are eligible only under the existing launch-indexing opt-in. No current rate, commission, tax rule, return guarantee or broker partnership is added. Unknown slugs/categories use 404. Content sources, workflow and unresolved factual review are recorded in [Editorial workflow](EDITORIAL_WORKFLOW.md).

## Institutional positioning implemented — 2026-10-30

The owner-selected `/institutions` route replaces the earlier suggested `/for-institutions` name; no previous route existed. Eight sections cover introduction, hypothetical institutional friction, source-confirmed app foundations, three potential collaboration models, future data/consent requirements, independence, inquiry CTA and an evidence-gated roadmap. All nine proposed capability areas remain explicitly future opportunities at institutional scope. No partnership, customer research finding, database access, service availability, integration or SLA is asserted. A broker can decline collaboration while supported investor manual/import workflows remain viable.

The CTA reuses `/contact` and its existing institutional topic. With delivery disabled, both the label and notice explain availability; no new contact system or confidential-upload channel exists. Footer/About discovery, unique SEO/social/canonical metadata, public-route prerender registration and the launch-indexing gate are included. [Institutional positioning](INSTITUTIONAL_POSITIONING.md) records the claim evidence and approvals still needed.

## Dynamic-data selection after backend inspection — 2026-10-30

No suitable public informational contract was found in the existing Spring backend, so no dynamic metric/release/announcement widget is introduced. Optional data cannot justify calling authenticated investor APIs, republishing account notifications, polling operational jobs or adding an expensive market reader. Static content and existing unavailable-statistic behavior remain. Contact uses only the existing optional dedicated-service boundary; it stays off pending approved service configuration. See [API integration audit](API_INTEGRATION.md) for real contracts and the separate backend requirements, not speculative endpoint names.

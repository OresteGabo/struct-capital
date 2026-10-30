# Homepage evidence and content dependencies

Audit date: 2026-10-30. Homepage at `/`; not deployed. Mobile inspected read-only at `/Users/muhirwagabooreste/AndroidStudioProjects/portfolio`, commit `0d2bf2c`. No source, tests, configuration or data in that project was modified. Website build/UX verification is separate from mobile release verification.

## Capability evidence

`K/` below is `app/shared/src/commonMain/kotlin/dev/orestegabo/portfolio/investments/` in the mobile project. `T/` is the corresponding commonTest package.

| Homepage topic | Source inspected | Scope and limit |
|---|---|---|
| Bond tracking/manual entry | `K/PurchaseForms.kt:16–94`, `K/PortfolioDashboard.kt` | PurchaseEditor records terms, broker, dates, confirmed/estimated schedules. No universal securities support claim |
| Equity records/manual entry | `K/PurchaseForms.kt:96+`, `K/InvestmentHistoryScreen.kt` | EquityEditor records share purchases, fees and broker details; history lists/searches purchases. No trading execution |
| Supported PDF import/review | `K/PurchasePdfImport.kt`, `K/PurchaseImportScreens.kt:55–113`, `K/PurchaseReviewState.kt`, `T/PurchasePdfImportTest.kt` | Import orchestration and review-before-save exist. Inspected tests use mock engines; real parser coverage/issuer compatibility is not certified by this audit |
| Coupon/maturity dates | `K/CalendarEvents.kt:32+`, `K/CalendarScreen.kt` | App event categories and schedule presentation; distinguish expected/estimated from confirmed. Screenshot dates are captured, not live |
| Allocation and valuation | `K/PortfolioDashboard.kt`, `K/InvestmentChart.kt`, `K/PortfolioReport.kt` | Estimated values, recorded costs and allocation exist. No live-market, forecast accuracy or guaranteed return claim |
| Document library/reports | `K/DocumentsScreen.kt:37–172`, `K/PortfolioReport.kt`, `K/AnnualReport.kt`, `T/PortfolioReportTest.kt`, `T/AnnualReportTest.kt` | Existing annual/portfolio PDF generation paths and test cases inspected. No CSV, tax-filing or regulatory report promise |
| Broker independence | Broker fields in `K/PurchaseForms.kt`, import path and aggregate views above; owner product brief | Supported manual/import workflows do not require a direct broker integration. This is not a tested universal cross-broker data contract or a partnership claim |

These are SOURCE_CONFIRMED capabilities, not newly executed mobile tests or verified public releases. Mobile tests/builds were not run to preserve read-only scope. Existing website FEATURES.md issuer-specific parsing/release entries remain unverified where evidence is insufficient. No unsupported future function is presented as currently live.

## Screenshot provenance

User explicitly requested actual `screenshots/` images for the homepage. All four supplied images were visually reviewed. Only safe exports are served; originals remain unchanged in the non-public directory. `portfolio-dashboard.png` is not exported because it shows portfolio amounts/allocation. Header regions of the document/import captures contain an email address and are excluded.

Exports use source pixels with cropping/resizing only. No generated UI, synthesized numbers, painted replacement content, or hidden unredacted copy is placed in public assets. Bounds below use original 1408×2974 pixel coordinates from the top-left. The exporter refuses sources whose dimensions changed; crop safety must be visually rechecked whenever the source captures are replaced, even at the same dimensions. Reproduce on macOS from the repository root:

```sh
swift -module-cache-path /tmp/struct-image-cache scripts/prepare-product-images.swift
```

| Public asset | Original | Crop `(x,y,width,height)` | Output |
|---|---|---|---|
| `calendar-560.png` | `coupon-calendar.png` | Full capture | 560×1183 |
| `calendar-840.png` | `coupon-calendar.png` | Full capture | 840×1774 |
| `calendar-detail-700.png` | `coupon-calendar.png` | `(110,438,1188,1585)` | 700×934 |
| `reports-detail-900.png` | `documents-and-reports.png` | `(115,1450,1180,520)` | 900×397 |
| `import-detail-700.png` | `pdf-import.png` | `(190,745,990,940)` | 700×665 |

The calendar has no account identity or investment balances. The report crop shows only the annual-report card, not its contents or the email header. The import crop is the complete existing-document receipt. The original also contains a separate failed statement import; the crop is not evidence of a new successful import or universal PDF compatibility. Homepage wording specifically describes an existing document and supports failure limitations in FAQ.

The receipt includes document issuer branding already present in the supplied capture. It identifies the issuer, not Struct Capital endorsement, regulatory approval, or partnership. Public copy explains that distinction. Final asset-rights/content review still applies before publication.

Hero calendar has width-based srcset, accurate dimensions and high fetch priority. Gallery crops are lazy-loaded/async-decoded and have native full-size image links. Total committed PNG assets are approximately 770KB; a typical initial hero requests the 177KB or 316KB calendar plus the 59KB report excerpt, not all originals. Optional export tooling is not a deployment/build dependency.

## Public-content boundaries

- No user counts, assets under management, investment balances, testimonials, ratings, awards, partnerships, licensing or store badges.
- No portfolio calculator, upload field, investor login, trading flow, account sync or financial backend added to the website.
- Primary/secondary/final CTAs have real in-page exploration destinations. There is no waitlist/contact submission disguised as success.
- Homepage privacy answer describes only this marketing website's absence of investor-data collection. It does not certify app storage, encryption, retention or sharing.
- Educational market facts, current prices, tax rates and legal obligations are not introduced. Captured dates do not function as current market guidance.

## Unresolved launch dependencies

1. Real approved App Store/Google Play URLs and public-release status. No deadline or “coming soon” badge is invented.
2. Reviewed public app privacy policy and terms; no placeholder legal route is published.
3. Detailed supported-format catalog and parser/release verification before stronger issuer-specific claims.
4. Final rights/content review of the supplied captures and embedded issuer artwork before publication.
5. Hosting, production redirect/status/security-header configuration, and explicit launch indexing/publication decision.

Existing robots/noindex defaults stay off for public discovery until a reviewed launch artifact opts in. This task implements a homepage; it does not authorize publication.

## Website verification

- ESLint: passed without warnings; Nuxt/TypeScript: passed.
- Four policy/unit tests and six generated-output tests passed. Homepage checks include local image existence/dimensions, high-priority hero versus lazy gallery, valid anchor destinations, one main/H1, canonical/social metadata, unique IDs and privacy/store-link boundaries.
- All 34 established light/dark semantic contrast checks passed. Browser-measured fixed solution-panel contrast was 13.94:1 for its heading and 9.20:1 for secondary text.
- Production Nuxt build and static generation passed using Node 24.15.0. No dependencies changed. Default crawler exclusion remains active.
- Responsive review at 320px, 768px and 1280px found no horizontal overflow. Responsive/keyboard browser review: native mobile menu and Escape focus, hero actions, FAQ expansion, screenshot loading/full-size links, and theme behavior. Browser warning/error log was empty. This is not a full assistive-technology, legal, or real-device certification.

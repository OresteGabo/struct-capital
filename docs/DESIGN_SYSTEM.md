# Struct Capital web design system

Inspected 2026-10-30. Mobile source: `/Users/muhirwagabooreste/AndroidStudioProjects/portfolio`, commit `0d2bf2c` (clean working tree during inspection). Mobile files were read only. Website began as documentation and four screenshots, with no Nuxt scaffold or installed dependencies.

## Identity and product context

Struct Capital helps individual investors in Rwanda understand investments across brokers. Its identity is the sculpted SC ribbon inside an outlined hexagon, olive and cream, warm backgrounds, dark green surfaces, gold details, clear sans-serif type, and generous rounded panels. It is independent portfolio management software, not a broker, exchange, custodian, or trading venue. Institutional tools and broker synchronization remain future possibilities; this foundation adds no product claims or integrations.

The earlier document described olive/gold/cream as unconfirmed. Inspection resolves the palette from actual mobile code and SVG masters. No replacement brand is proposed.

## Exact source map

Paths below are relative to the mobile project. `K/` abbreviates `app/shared/src/commonMain/kotlin/dev/orestegabo/portfolio/investments/`.

| Source | Evidence |
|---|---|
| `K/InvestmentApp.kt:47–49,184–187` | `BrandOlive`, `BrandCream`, `Ink`; explicit light/dark color overrides; `Typography()` with no custom font family; no custom Material shapes passed |
| `K/InvestmentApp.kt:284–299,380–393` | 24dp navigation icons, outlined/filled selection, cream indicator; PageTitle hierarchy; Panel 24dp corners, 20dp padding, 12dp gaps, 1dp tonal elevation |
| `K/PortfolioDashboard.kt:42–43,149–193,214–218,279–298,334–341` | Gold/sage allocation colors, Kigali photo treatment, Imigongo line motif, 28dp wealth card, 26dp insight cards, theme-specific insight colors |
| `K/OnboardingScreen.kt:59–60,89,117–124` | Dark onboarding surfaces, 32dp illustration frame, 18dp button corners, 56dp button target, special dark CTA colors |
| `K/CalendarScreen.kt:259–260,414–415` | Semantic subscription status, coupon blue and maturity green in both schemes |
| `K/InvestmentChart.kt:75–77,155` | Primary chart series, outlineVariant grid at 50% alpha, muted labels, 10sp chart-label override |
| `K/AppMotion.kt` | 240ms content motion, 180ms fade-in, 140ms fade-out, FastOutSlowIn easing, reduced-motion bypass |
| `K/LocalizedComponents.kt` | Reactive AppText/AppIcon wrappers; Material icon tinting; language switch 12dp track / 8dp selection, 52dp height, 2dp shadow and spring movement |
| `K/StructBrand.kt` | Theme-aware `struct_mark_light` / `struct_mark_dark` Compose resources |
| `K/EmptyState.kt` | Shared EmptyState/EmptyArtwork/EmptyStateAction, 24/28dp panel, 20/24/32dp spacing, themed outlined illustrations, contextual optional actions |
| `branding/README.md` | Canonical V2 asset inventory, outlined logo typography, legacy Gabo assets, onboarding artwork provenance |
| `branding/struct-capital/` | Final SVG masters, reversed variants, launcher exports, calendar and document-processing illustration packs |
| `gradle/libs.versions.toml:12,17` | Compose 1.11.1 and Material3 1.11.0-alpha07 |

For inherited defaults, inspected the locally cached dependency source archive `org.jetbrains.compose.material3/material3-iosarm64/1.11.0-alpha07/*/material3-iosarm64-1.11.0-alpha07-sources.jar`. Relevant members: `commonMain/androidx/compose/material3/tokens/{ColorLightTokens,ColorDarkTokens,PaletteTokens,TypeScaleTokens,TypefaceTokens,ShapeTokens}.kt`. These are dependency defaults, not custom Struct Capital tokens; platform font rendering may differ.

## Extracted colors

| Role explicitly set by app | Light | Dark |
|---|---|---|
| Primary / secondary | `#6D5E0F` | `#F2E6A7` |
| On primary | `#FFFFFF` | `#252317` |
| Primary / secondary container | `#F2E6A7` | `#514716` |
| On primary / secondary container | `#252317` | `#F2E6A7` |
| Background | `#FAF8F2` | `#11150F` |
| Surface | `#FFFFFF` | `#1D2219` |
| On surface | `#252317` | `#F3F1E8` |
| On surface variant | inherited | `#C5C7BA` |
| Outline variant | inherited | `#414735` |

Inherited, verified Material roles: light onSurfaceVariant `#49454F`, outline `#79747E`, outlineVariant `#CAC4D0`; dark outline `#938F99`. Tertiary is **not customized**: light `#7D5260`, dark `#EFB8C8`. OnBackground is also inherited (`#1D1B20` / `#E6E0E9`), rather than derived from custom onSurface. OnSecondary is inherited white / `#332D41`. Errors inherit `#B3261E` / `#F2B8B5`. Do not treat these purple/pink defaults as a second brand palette. No website tertiary utility is introduced until there is a semantic use.

Other custom mobile values:

- DashboardGold `#ECC75F`; AllocationGreen `#739A87`; shares use gold (with `#F6DC87` highlight), bonds sage.
- Insight accents: allocation `#9A731B` / `#ECC75F`; income `#63732E` / `#D5CC7D`; payment `#386D71` / `#ACCECB` (light/dark).
- Insight gradient pairs: allocation `#F8F0D8 → #F3F5EC` / `#303021 → #1C2119`; income `#F1F1D9 → #E8F0E3` / `#303025 → #20251A`; payment `#E4F0EB → #F2F0DF` / `#263334 → #1B2423`. Insight text `#252C24` / `#F4F1E6`.
- Onboarding dark background `#181F18`, art surface `#272B1B`, CTA `#E6D787` on `#242915`. These are contextual exceptions, not the global dark primary.
- Coupon `#246C9F` / `#9DCBFD`; maturity / open subscription `#22705D` / `#8DDBB7`; closing today `#875000` / `#FFD180`.
- Wealth panel uses custom translucent dark olive gradient stops `#F02E321C`, `#F24D4117`, `#FA20251B` (Kotlin AARRGGBB), a gold 24% border and 7.5% motif. Preserve context if used later; do not apply a random gradient across the website.

## Screenshot inspection and discrepancies

All four supplied images were visually inspected. They confirm warm off-white canvases, olive icons and headings, white rounded cards, cream actions/chips, gold/sage allocation, and strong financial number hierarchy. They contain device frames and system bars; do not add another phone frame around them.

- `portfolio-dashboard.png`: dark wealth card on a light page, local photo and fine geometric lines, horizontal insight cards. Values are personal/sample portfolio records, not platform statistics.
- `coupon-calendar.png`: selected-day olive circles, cream subscription window, labeled blue/green event categories.
- `documents-and-reports.png`: document cards, outlined search/chips, a document illustration, email identity and report metadata.
- `pdf-import.png`: conversational cream/white import states, an email identity, and a visible failed import. It is not evidence of universal successful PDF parsing.

Current source navigation specifies a Material cream selection indicator, whereas these screenshots show a short olive bar above the active icon. Capture date/build cannot be inferred reliably from the screen clock/date. The web uses a labeled link with an olive/cream active underline as an explicit web adaptation, not a pixel-identical reconstruction. No dark screenshot was supplied; dark values are source-verified but visual parity remains to be reviewed.

Original images remain in `screenshots/`, outside Nuxt public assets, and were not edited. The homepage phase now serves selected safe calendar/report/import exports, excluding email headers and dashboard balances. A new successful-import capture would still be needed to illustrate a new-import success flow; the current excerpt only shows an existing-document receipt. See HOMEPAGE_EVIDENCE.md.

## Web tokens and decisions

Canonical implementation: `app/assets/css/tokens.css`; utility mapping, type scale and components: `app/assets/css/main.css`. Tailwind 4 uses CSS-first `@theme inline` so colors update with the active scheme; no competing Tailwind JS palette. Examples: `bg-background`, `bg-surface`, `text-brand-primary`, `text-muted`, `border-outline`, `rounded-card`, `text-display`.

The custom mobile roles above are copied exactly. The following are **new web-specific decisions**, reviewable and reversible:

| Addition | Light / dark values | Rationale |
|---|---|---|
| Muted text | `#625F50` / extracted `#C5C7BA` | Warm secondary text rather than inherited purple-gray |
| Muted surface | `#F1EEE3` / mobile onboarding `#181F18` | Quiet supporting regions |
| Raised surface | `#FFFFFF` / mobile onboarding `#272B1B` | Restrained depth |
| Decorative border | `#D9D5C5` / extracted `#414735` | Warm dividers; not a control outline |
| Control outline | `#81795C` / `#999B87` | At least 3:1 against surface |
| Danger | mobile light `#B3261E` / new `#FFB4AB` | Readable web errors; dark differs from inherited mobile default |
| Success / warning | Calendar open / closing colors | Reuse semantic source colors |
| Focus | Active primary | 3px visible ring with 4px offset |
| Elevation | `0 4px 16px` ink 6% / black 16% | CSS approximation, not Compose tonal elevation |

No invented tertiary brand, external font request, glassmorphism, stock image, synthetic investment chart, or public statistic is included.

### Typography

Mobile uses `Typography()` and dependency `TypefaceTokens.Brand/Plain = FontFamily.SansSerif`. No custom UI font files were found. Bundled LiberationSans files belong to the PDF engine, not the UI; do not copy them as the brand font. Outlined wordmark lettering is artwork, not a reusable font.

Verified inherited mobile type (size/line-height in sp): display 57/64, 45/52, 36/44; headline 32/40, 28/36, 24/32; title 22/28 regular, 16/24 medium, 14/20 medium; body 16/24, 14/20, 12/16 regular; labels 14/20, 12/16, 11/16 medium. Screens override titles/financial values to semibold 600 and bold 700. Default regular is 400, medium 500. AppText does not replace the font family.

Web uses a system sans-serif stack to preserve native familiarity without a third-party font dependency. **New web scale**: caption 12px/1.5, label 14px/1.5, body 16px/1.65, lead 20px/1.5, title 24px/1.3, heading fluid 28–40px/1.15, display fluid 36–64px/1.08. All use rem equivalents; headings use 700 and -0.025em tracking. Financial values use tabular lining numbers. Web headings are intentionally larger than mobile screen headings, and body text does not use the mobile 12–14sp density.

### Spacing, radii, layout

Mobile repeatedly uses 4, 8, 12, 16, 20, 24, 32dp; Panel specifically 20dp padding/12dp gap and dashboard sections 20dp. No centralized mobile spacing object was found. Web adopts a new 4px (`0.25rem`) base compatible with Tailwind spacing utilities, including these increments; section spacing grows 40–80px. Do not claim dp equals CSS px on every device.

Radii: 8px small, 18px control (onboarding), 24px card (Panel), 28px feature (wealth/empty), full circle for chips/markers. Mobile also has local 14/15/20/26/30/32dp overrides. Default Material shape sizes are 4/8/12/16/28dp, but these do not replace the explicit component overrides.

New web responsive rules: 320px minimum review width; 16px side gutters, 32px from 768px; container maximum 1200px; prose maximum 65ch; breakpoints 640/768/1024/1280px. Cards stack on phones and use two columns from 768px; the palette grid progresses 2/3/5 columns. Navigation wraps and never depends on hover. No mobile bottom-tab bar is copied onto desktop.

### Foundation APIs and conventions

- `ScButton`: native button; `variant="primary|secondary|outline|text"`, `type`, `disabled`, default slot. 48px minimum height, 18px radius, 600 weight. Default type is button. Use native links with `.sc-button` classes for navigation, preserving correct semantics. Never style a dead link as a working CTA.
- `ScCard`: presentational div with `variant="default|muted|raised|brand"`. Caller supplies appropriate section/article semantics and heading hierarchy. No nested interactive card behavior is imposed.
- `ScBrand`: unmodified official symbol paths used as a CSS mask with active primary tint, paired with live text. Full outlined logo masters are available separately. Do not substitute an invented monogram.
- `.sc-nav-link`: 48px minimum target, labeled links; active link uses `aria-current="page"` (or `location` for tracked page sections), active weight plus underline. Shared header/footer links now compare full destinations including hashes; the old specimen anchors did not assert an active section.
- `.sc-label`, `.sc-input`: explicit labels, 48px targets, outline token, visible focus, invalid border via `aria-invalid`; connect helper/error text using `aria-describedby`. The read-only error specimen remains a demonstration. The new contact page separately composes these controls with shared client/server validation and a default-off delivery adapter.
- Icons: mobile uses Material outlined icons, filled for selection, typically 24dp. Web `.sc-icon` is 24px; retain this treatment when real icons are added, with decorative SVGs hidden from assistive technology and icon-only controls named. No icon library is installed for speculative use.
- Charts: series use primary; grid outline variant; categorical shares gold/bonds sage, coupon blue/maturity green. Gold/sage are not small text colors and require contrasting boundaries, labels, and patterns when adjacent. Never communicate only by hue or fabricate data. No chart engine or example financial series is installed.
- Empty states: reuse the app's plain heading, explanation, outline icon, and contextual action approach. Native Compose canvas drawings cannot be directly shipped to browsers. Future SVG adaptations should preserve geometry and be clearly illustrative.

### Theme and motion behavior

Default follows `prefers-color-scheme` entirely in CSS, avoiding a theme flash from client-only initialization. `data-theme="light|dark"` explicitly overrides it; review selector removes the attribute for system mode. The shared footer selector uses SSR-safe Nuxt state to retain the choice during client navigation only. No disk persistence/cookies are added. Preference persistence across reloads is a separate decision. Dark branding uses cream; never invert photos or app screenshots with CSS filters.

Motion tokens mirror app 140/180/240ms and FastOutSlowIn `cubic-bezier(0.4,0,0.2,1)`. Foundation buttons transition background/shadow only, with no scroll reveals or decorative looping motion. `prefers-reduced-motion: reduce` suppresses animation/transition and smooth scrolling. Keyboard focus remains visible; forced-color mode uses native outlines and semantic controls.

## Assets and reuse restrictions

Copied unchanged into `public/brand/`: `struct-capital-symbol.svg`, `struct-capital-symbol-reversed.svg`, `struct-capital-logo-transparent.svg`, `struct-capital-logo-transparent-reversed.svg`. Original geometry and artwork colors remain intact. The full transparent logo has a large square master canvas; it is not a pre-cropped horizontal header asset. ScBrand uses the symbol and readable live text rather than altering the master.

Not used as standalone public UI assets: historical Gabo branding; OS-masked app launchers; preview/design-concept files; unredacted private screenshots; broker/issuer logo badges; mobile PDF fonts; Compose XML vectors and native canvas drawings. The later social-image generator retains a source launcher icon separately, and a homepage receipt crop includes its original document issuer artwork, with no affiliation claim. The onboarding illustration packs contain reusable SVG/PNG art, but native captions/localization and target-size selection need a dedicated content decision. Kigali imagery requires confirmed web-use rights; it is not assumed approved for reuse from a mobile resource.

## Verification and remaining review

Run `npm run lint`, `npm run typecheck`, `npm run check:contrast`, `npm run build`, and `npm run generate`. Contrast script reads actual light/dark CSS roles and checks normal text at 4.5:1 and focus/control outlines at 3:1. This is a focused check, not an accessibility certification; decorative borders and disabled controls are not text contrast targets.

The original root review now lives at `/design-system` and always remains noindex. `/` is now the implemented marketing homepage; supporting pages and release content remain pending. SEO defaults and prerendered robots/sitemap now exist with indexing disabled by default. Legal draft pages and a default-off contact adapter now exist. No approved legal policy, store links, financial integration/logic, hosting, or publication is included.

Remaining decisions: final publication/rights review for selected screenshot exports (original balances remain excluded); confirm whether current navigation or screenshot treatment should guide future app parity; review dark mode against a real capture; approve a horizontal logo export if needed. A custom web font is optional, not a prerequisite; current native sans-serif is evidence-based. Supporting-page composition, remaining approved content, and hosting remain separately scoped; the SEO foundation is now implemented.

### Validation results — 2026-10-30

- Passed ESLint, Nuxt TypeScript check, 34 semantic color contrast checks, production build, and static generation on Node 24.15.0. Rebuilt and regenerated after the final component changes.
- Browser review of generated static output at 320px and 1280px: no horizontal overflow; light/dark selector, anchor navigation, local button status feedback and visible keyboard focus verified. No browser warning/error logs observed. No full assistive-technology audit or real-device dark screenshot comparison was performed.
- Existing host Node 25.2.1 is outside Nuxt 4.6.3's supported engine range. `.nvmrc` pins 24.15.0; `package.json` records Nuxt's supported range. Validation used a temporary runtime without changing the user's installed Node.
- npm audit reports seven low-severity dependency entries in the Nuxt/Nitro chain, rooted in the deepmerge prototype-poisoning advisory; no moderate/high/critical findings. Automatic remediation proposes a Nuxt downgrade, which was not applied. Recheck dependency advisories before launch. No production service has been deployed.

## Shared website foundation — second phase

The extracted palette and all original token values remain unchanged. `ScBrand` now scales its mark/type at the small breakpoint to fit the shared 320px header. Existing ScButton/ScCard were reused; the original review content is preserved at `/design-system`.

| Component | API / convention |
|---|---|
| ScHeader / ScFooter | Shared navigation to implemented destinations only; responsive native mobile disclosure; clear software/broker distinction |
| ScContainer | Default 1200px container; optional `narrow` applies reading width |
| ScSectionHeading | `title`, optional `eyebrow`, `description`, `id`, `level=1|2|3`; explicit hierarchy, existing responsive type |
| ScLink | `to`, `variant=inline|primary|secondary|outline|text`, optional `external`; same tokens as ScButton, real anchor behavior, no forced new tabs |
| ScFeatureCard | `title`, `description`, optional `level=2|3`, `to` + `linkLabel`, decorative `icon` slot; composes ScCard |
| ScStatistic | `label`, optional numeric `value`, `source`, `asOf`, `state=ready|loading|error|unavailable`, `stale`; ready values require finite number and valid source/date, otherwise em dash + unavailable text. Valid zero is supported; missing data is never converted to zero. Stale values visibly identify age/source. No fetching or invented fixtures |
| ScFaq | `items` containing plain-text `question`/`answer`; native details/summary, supports multiple open answers, plus marker changes shape, no JS dependency |
| ScCta | `title`, `description`, required `to`/`label`; accessible section with generated heading ID and a real link |
| ScScreenshot | Required `alt`, `width`, `height`, `caption`; optional approved `src`, `srcset`, `sizes`, `priority`; aspect ratio reserved, lazy/async by default, explicit missing/error fallback. No unapproved source files are served |
| ScBreadcrumbs | `items` with `label` and optional `to`; last item is plain text with `aria-current=page`; no breadcrumb required on root |
| ScFormField | `id`, `label`, optional `hint`, `error`, `required`; slot exposes `describedBy` and `invalid` for native control composition |
| ScInput | Required string `v-model`/`label`; text/email/tel/url/search or `multiline`; native attributes forwarded to field, labels/ARIA wired; no server submission |
| ScSelect | Required string `v-model`, `label`, `options` of label/value; same field/hint/error conventions |
| ScCheckbox | Required boolean `v-model`/`label`, optional hint/error/required; native checkbox with full clickable label target |
| ScState | `kind=loading|error|empty`, `title`, optional `description`; errors use alert, others status/busy. `retryable` + `@retry` provide an explicit recovery action |
| ScThemeSelect | Shared system/light/dark state, unique generated label ID, no cookie/storage dependency |

New CSS in `main.css` is limited to container variants, inline links, mobile disclosure positioning, native FAQ markers, resizeable textarea, scroll margins and forced-color control boundaries. Responsive spacing, focus, reduced motion and all established role colors are retained. No new icon dependency, decorative motion, or UI framework was introduced.

### Social preview asset

`public/brand/social-preview.png` is a new **web-specific composition**, 1200×630, approximately 57KB. It uses the official mobile `struct-capital-icon-light-192.png` monogram, existing off-white/olive/ink values, native sans-serif, and approved positioning language; it contains no financial statistics or private data. The source icon is preserved unchanged in `scripts/assets/`, copied from the previously inspected mobile branding directory. On macOS, reproduce from the repository root with:

```sh
swift -module-cache-path /tmp/struct-social-cache scripts/generate-social-preview.swift
```

This optional generator is not a build dependency; the pre-generated PNG works on static hosts and non-macOS build machines. Social defaults use the intended production URL, not a claim that the domain is already serving this artifact.

### Second-phase verification

- Passed lint with no warnings, TypeScript, all 34 existing contrast checks, four native Node policy tests, production build and static generation.
- Four generated-output tests passed with launch indexing enabled and again with preview defaults. Final output restores indexing disabled. These assert canonical/social metadata, one main/H1, native disclosure markup, static metadata files, unique field IDs, connected labels, and exclusion of private screenshots.
- Browser review at 320px, 768px, and 1280px showed no horizontal overflow. Verified menu keyboard open/close, Escape focus restoration, navigation closure, FAQ keyboard expansion, current-link state, local input/textarea/select/checkbox bindings, retry recovery, dark/light switching, client-navigation theme continuity, route title/canonical updates, and the branded error recovery view. No browser warning/error logs observed.
- No full screen-reader, real-device or automated accessibility audit was performed. Screenshot redaction, approved launch content, host redirects/status handling/security headers, and the previously recorded dependency advisory review remain separate launch work.

## Homepage composition — third phase

The homepage preserves all extracted tokens and the existing shared components. Its local editorial choices are new web-specific adaptations: oversized tightly set sans-serif hero, one olive emphasis line, a warm paper-like screenshot stage, numbered narrative sections, a fixed dark ink solution panel, and a compact actual-document excerpt. There are no new fonts, random gradients, charts, stock photographs, testimonial logos, or decorative animation loops.

The fixed dark panel uses extracted mobile ink `#252317`, dark foreground `#F3F1E8` and muted `#C5C7BA` regardless of the surrounding theme, mirroring the app's dark wealth-panel-on-light-page pattern. This avoids using the active page background as text in dark mode. The decorative monogram uses official geometry and active primary tint; screenshots retain their authentic captured light appearance in either scheme. The hero source already includes a phone frame, so ScScreenshot uses `frame=false` rather than adding another one.

Hero CTAs link to real app views/workflow. At narrow widths the two controls (48px minimum height) share a row; content and galleries stack. From 640px features use two columns; from 1024px the hero uses two columns, features three, and workflow four. The native FAQ and shared mobile disclosure retain keyboard/no-JavaScript operation. Full-size screenshot links provide inspection without a carousel/lightbox dependency.

ScScreenshot now accepts optional `frame` (default true) and `fullSize` (default false). Existing review specimens remain unchanged. Product assets are source-derived crops/resizes, not AI-generated screenshot reconstructions. See [Homepage evidence](HOMEPAGE_EVIDENCE.md) for crop bounds, dimensions and restrictions.

No additional motion was necessary: existing hover/focus transitions and reduced-motion rules are sufficient. Public copy avoids implementation-audit language and does not claim store release, privacy certification, guaranteed outcomes or universal imports. The app's full privacy policy, official download links, and remaining supporting-page content are unresolved launch dependencies.

## Supporting pages and accessible forms — fourth phase

Features, workflow, about, categorized/searchable FAQ, contact and legal-draft pages reuse all established tokens and shared components. No new palette, typeface, UI framework, or client dependency is introduced. ScPageIntro is a small composition of ScBreadcrumbs and ScSectionHeading, with `label`, `title`, `description`, optional `eyebrow`; it preserves one H1 and deliberate page hierarchy.

New `main.css` utilities are limited to section spacing, readable prose/list spacing and a brand-container draft notice. Drafts are prominently labeled, use the existing on-container contrast pair, and are not approved-policy badges. The primary navigation moves to full page routes and the desktop breakpoint becomes 1024px to fit the expanded list. Footer legal links explicitly say draft; current-route matching normalizes trailing slashes without incorrectly marking every section destination current.

FAQ filtering announces result count, supports category and term matching, renders all answers initially, and keeps native keyboard disclosures. The clear button restores search focus when the empty-state button disappears. No-JavaScript visitors can read categorized answers.

The contact page uses the existing native field wrappers and state components. Required/invalid/hint relationships remain explicit. Validation focuses the first invalid field. Pending requests disable repeat submission. Unavailable/ambiguous failures retain text; after re-enabling controls, focus moves to field errors or feedback. Only confirmed service acceptance clears inquiry fields. Contact is disabled by default, without attachments, tracking, local draft storage or fictitious delivery. See [Contact Integration](CONTACT_INTEGRATION.md).

Privacy/terms use narrow reading containers and visibly marked, noindex review drafts. No new legal guarantee or claim about app security is inferred from website styling or implementation.

## Learning typography extension — web-specific, 2026-10-30

The learning section retains all extracted mobile colors, theme roles, fonts and radii. New editorial rules in `main.css`: body `clamp(1.0625rem, 1rem + .2vw, 1.1875rem)`, line-height 1.85, maximum 68ch; H2 `clamp(1.5rem, 1.25rem + .65vw, 2rem)` with 1.3 line-height and -.02em tracking; H3 1.25rem/1.4. Paragraph spacing 1.25rem, section spacing 2.5rem; list indentation 1.5rem and .65rem item spacing. Evidence notes use existing muted surfaces, primary 3px border and card radius. TOC sits above reading on narrow screens and at the side at 64rem, with native disclosure; no reading animation. Existing focus/reduced-motion/theme rules apply. No new font, illustration or chart palette.

## Release-review note — 2026-10-30

The olive/cream/ink and light/dark roles were rechecked against InvestmentApp.kt, and public SVG master hashes match the mobile branding files. No palette/component redesign occurred. The review route described historically above is now a local opt-in via `NUXT_DESIGN_REVIEW_ENABLED=true`; default production routing/output excludes it. See RELEASE_REVIEW.md for browser/contrast evidence and LAUNCH_CHECKLIST.md for human release gates.

## Kigali Editorial — Phase 02 (2026-11-02)

KigaliEditorial.vue reuses the actual SC symbol SVG and current ivory, ink, olive and muted-surface tokens. It pairs left-aligned oversized text with a right-edge asymmetric photograph window; the SC-inspired signature uses official SVG geometry. Ink/olive theme choices preserve ivory negative space. Photography is currently missing; only labeled proofs can be reviewed until a real user-provided Kigali image arrives. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Investor Education — Phase 03 (2026-11-02)

InvestorEducation.vue uses olive display type on ivory, ink body text, short 5px gold rules and a single 64px official SC SVG signature. Square and portrait have deliberate display sizes; myth/fact separates a smaller ink myth from an olive fact, while terminology enlarges the term. Gold stays decorative, not small text. No new palette, font, full-background pattern or generic financial illustration is added. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

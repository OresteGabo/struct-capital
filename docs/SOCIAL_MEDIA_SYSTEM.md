# Social media studio — Phase 01

A local authoring tool in this existing Nuxt repository. No marketing page changes, publishing, scheduling, accounts or backend integration.

## Run

Use the Node 24 version required by package.json, then:

```sh
npm ci
npx playwright install chromium
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:3000/social-studio`. Choose a draft, format and approved visual; edit the eyebrow, headline and body; download the PNG. Browser downloads follow your browser settings. Draft switching resets edits; edits are in memory only. Persist reviewed copy by editing the JSON files in `social-content/posts/` and restarting development. Both included posts are editorial drafts, not publication approval.

To write into the gitignored `exports/social/` directory while the development server is running:

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/clearer-picture.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/income-calendar.json portrait
npm run test:social
```

The CLI defaults to localhost:3000 and the clearer-picture square draft. Set `SOCIAL_STUDIO_ORIGIN` for another loopback port. It overwrites an existing matching export filename. Files are 1080×1080 or 1080×1350 at device scale 1. Nothing is written into `public/`. The endpoint returns PNG bytes without writing files or retaining edits.

## Sources and rendering

- `shared/social.ts`: format registry, typed post schema and shared text/length/visual validation.
- `app/components/social/SocialCanvas.vue`: fixed-size light canvas, existing olive/cream/ink identity and system font stack. Light roles are pinned so OS/editor dark mode cannot change exports.
- `app/components/social/templates/SocialEditorial.vue`: first reusable editorial template; shared ScBrand, official SVG geometry and optional ScScreenshot calendar excerpt. No new geometric pattern was found in the repository; existing homepage masking and the official symbol are reused rather than inventing one.
- `social-content/posts/*.json`: editable, versioned local drafts. Visuals are allowlisted, not arbitrary paths or uploads. Original screenshots stay private; only the existing privacy-conscious public calendar crop is used.
- `app/pages/social-studio.vue`: responsive editor and scaled preview.
- `app/pages/social-studio-render.vue`: unscaled render surface used by capture.
- `studio/export-handler.ts`: local development-only Chromium capture with fonts/images ready, external requests blocked and serialized exports. Broken assets and canvas overflow fail visibly.
- `scripts/export-social.mjs`: optional disk export client.

The Swift AppKit generator remains unchanged: it creates the site's fixed 1200×630 Open Graph asset in `public/brand/social-preview.png`. The screenshot preparation script also remains unchanged. Neither is the right editable-template engine: extending AppKit would duplicate Vue layout rules and require macOS. Native browser capture reuses actual Vue/CSS/logo/screenshot rendering and runs on Playwright-supported systems. Playwright is the sole new development dependency; no runtime image or DOM-to-canvas library is shipped to visitors. Install its matching Chromium once per environment. System fonts vary across operating systems; use the same OS/browser version for repeatable artwork.

## Development boundary

Nuxt registers the export handler only when `nuxt.options.dev` is true and removes both studio routes during every production build, regardless of review flags. The handler lives outside auto-scanned `server/api/`; no production export endpoint exists. No private runtime flag, broker API, database, credential or financial calculation is added. Loopback host and exact same-origin checks reject remote browser origins; use a loopback-bound dev server. This tool is not designed to be hosted or used with confidential data.

## Verification and limits

`npm run check`, `npm run build`, `npm run test:server`, `npm run generate`, and `npm run test:generated` cover existing checks and production route/bundle exclusion. With development running, `npm run test:social` checks origin/schema failures, both drafts at both PNG sizes, editor updates/download and a 320px viewport. Inspect final artwork manually before publication: length limits and overflow detection cannot judge editorial quality, text wrapping or screenshot cropping. Screenshot space is an intentional excerpt region, not an invented app view. No publishing or export endpoint is exposed in production.

Phase 01 intentionally has one template, two formats and two drafts. Batch export, extra templates, custom fonts, persistence UI, asset uploads and publishing remain outside this phase. Do not treat draft copy or existing screenshots as new approval to publish.

### Phase verification record — 2026-11-02

Final verification used Node 24.22.2 (obtained through `npm exec --package=node@24` because the shell default and installed older Node 24 did not match the project engine).

- Typecheck, including an explicit `studio/tsconfig.json` check for the handler outside Nuxt server auto-discovery: passed. Its DOM type library covers the browser-evaluated capture callback.
- ESLint: passed; 17 existing unit/content tests and 34 semantic contrast checks: passed.
- Social browser suite: all 3 tests passed, covering 4 draft/format PNG combinations, edit/download, origin/schema rejection and 320px layout.
- Production Node build and all 4 HTTP tests: passed, including 404 responses for studio/render/export paths.
- Static generation and all 10 generated-artifact tests: passed, including absence of studio bundles, draft text, export endpoint references and export files. Node build artifact tests also passed.
- Square exports visually inspected; calendar image fitting corrected to preserve the entire existing crop and its caption. PNG dimensions checked for both formats. Full screen-reader and real-device testing was not performed.
- `npm install` reported 40 dependency advisories (2 low, 38 moderate). This differs from older release-review snapshots; no broad dependency remediation was attempted in this authoring phase. Treat older audit counts as historical, not current assurance.

No push, merge, deployment or publication performed. Edits remain memory-only in the studio; final editorial and asset publication approval is still required.

## Phase 02 — Kigali Editorial

`KigaliEditorial.vue` adds a second template selected through `SocialTemplate.vue`. Choose the `kigali-editorial` draft in the existing studio. Headline and subtitle are editable. The two themes keep an ivory canvas and use either ink or olive headline text, all from existing CSS tokens. The small decorative signature masks the official SC SVG; choose a single signature, a three-mark rhythm or none. The identity uses the actual `public/brand/struct-capital-symbol.svg`, with live brand text. No new logo or fictional city illustration is introduced.

The composition is asymmetric: copy begins at the left inset, while a wide photograph region extends to the right edge and starts farther right than the copy. Portrait gives the headline a larger three-line treatment and a deeper image region. Image rendering uses `object-fit: cover`; `cropX` / `cropY` select a focal point with CSS `object-position` percentages. The exporter rejects copy entering the photo region, including the required 24px clearance. Long edits may require shortening rather than automatic type shrinking.

### Missing photography and required asset

Repository inspection found **no standalone user-provided Kigali photographs**, including no `public/brand/photos/kigali/` directory or other photo location. Available raster assets are brand output and app screenshots. The city imagery embedded in an app screenshot was not extracted or repurposed. No photograph directory was created, and no imagery was generated or downloaded.

The default draft therefore has `photoId: ""`. Both preview and PNG show a plainly labeled missing-photo panel and `DRAFT PROOF · KIGALI PHOTOGRAPH MISSING`. The endpoint marks these exports with `X-Social-Proof: missing-photo`; browser status and CLI output identify them as proofs. These are actual dimensioned PNG files, **not completed photographic posts**. A selected but unreadable registered photo is an export error, not a silent successful fallback.

Required to finish the photographic composition: an original, real Kigali city photograph supplied by the user, permission to use it publicly, location confirmation, descriptive alt text, photographer/credit wording and preferably a focal-point preference. A landscape original around 1700px wide or larger provides useful crop headroom; inspect the actual image in both formats. Final photographic cropping and editorial approval remain pending that asset.

Once provided and reviewed:

1. Place the actual photograph in `public/brand/photos/kigali/` (create the folder then). This public location makes the approved source a website asset; do not add confidential images.
2. Add its real metadata to `social-content/photos.json`. The registry starts empty. Entry fields are `id` (lowercase slug), `src` (for example `/brand/photos/kigali/your-approved-file.jpg`), `alt`, `credit`, and original pixel `width` / `height`. The example filename is a schema example, not an existing photograph. Supported extensions: jpg, jpeg, png, webp, avif; filenames use letters, digits and hyphens. Remote URLs and unknown photo IDs are rejected.
3. Restart dev, select the photograph, adjust both crop sliders and inspect square and portrait. Save the resulting `photoId`, `cropX` and `cropY` in the draft JSON to retain them.
4. Export and review before publication. Photo rights/location are reviewed by a person, not certified by schema validation.

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/kigali-editorial.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/kigali-editorial.json portrait
```

Both write to ignored `exports/social/`. Export setup and production isolation are unchanged. The draft supports `template: "kigali"`, `photoId`, numeric `cropX` / `cropY` (0–100), `pattern: "none" | "signature" | "rhythm"`, `theme: "ivory" | "olive"`; `body` is shown as Subtitle in this template. Legacy drafts retain their original rendering without schema migration.

### Phase 02 verification — 2026-11-02

Using Node 24.22.2: type checks (Nuxt plus export handler), ESLint, 17 unit/content tests, 34 contrast checks, production build, all 4 production HTTP tests, static generation and all 10 generated-output tests passed. All 5 browser tests passed, including six draft/format PNG renders, Kigali proof headers, invalid crop/photo/theme/pattern rejection, long-copy collision rejection, live theme/signature/subtitle controls and 320px overflow checks. Production still returns 404 for studio/render/export paths and its public output excludes Kigali draft content.

Actual files exported and visually inspected: `exports/social/kigali-editorial-square.png` (1080×1080) and `exports/social/kigali-editorial-portrait.png` (1080×1350). Both are ignored by Git and explicitly show missing-photo proof labels. Reviewed headline/subtitle spacing, asymmetric photo-region placement, official logo and SC signature, ivory/ink/olive consistency. Final portrait spacing and studio note wrapping were corrected during review. **Actual photographic cropping cannot be verified until the required real photograph is supplied.** No external image request, photo generation, publishing or dependency addition occurred in this phase.

## Phase 03 — Investor Education

`InvestorEducation.vue` is the third template. It uses existing olive/ivory/ink tokens, large system-font editorial type, short gold rules and exactly one small official `struct-capital-symbol.svg` at the footer. There is no full-background motif, repeated hexagon, stock graphic, return chart or generated image. The original and Kigali templates retain their behavior.

Four local presets are available from the studio Draft selector:

| Draft | Content style | Rendering |
| --- | --- | --- |
| `education-concept` | Financial concept | Large olive statement and explanatory paragraph |
| `education-myth-fact` | Myth versus fact | Explicit Myth heading and Fact explanation, separated by a restrained gold rule |
| `education-did-you-know` | Did you know? | Question-led label and large observation |
| `education-terminology` | Investor terminology | Oversized term followed by a definition |

All visible text is editable in the studio: eyebrow, headline, body, primary label, Fact label (visible for myth/fact), source credit, education note, footer and brand text. The official geometric SVG remains unchanged. Content style changes the typographic treatment and the visibility of the Fact label; it intentionally preserves the text you are editing. Choose a preset for matching initial copy/labels, or edit them explicitly after changing style. In myth/fact the Headline contains the myth and Body contains the fact. No user text is interpreted as HTML.

Save reviewed changes in `social-content/posts/education-*.json`; studio edits remain in memory. Each draft uses `template: "education"` plus an `education` object with `style` (`concept`, `myth-fact`, `did-you-know`, `terminology`), `primaryLabel`, `secondaryLabel`, `source`, `disclaimer`, `footer`, and `brand`. Shared validation requires bounded nonempty strings and rejects unknown styles. Export checks both overall canvas overflow and text clearance from the header and source notes; shorten copy if it does not fit, rather than silently shrinking or clipping it.

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/education-concept.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/education-concept.json portrait
```

The same commands work for the other three draft files. All PNGs stay in ignored `exports/social/`. Preview/export routes remain development-only; no new dependency, marketing-page change, production endpoint, financial calculation or publishing service is introduced.

### Editorial evidence and limits

The four examples adapt the repository’s source-checked `content/learn/portfolio-diversification.md`. Its primary [Investor.gov diversification source](https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/diversify-your-investments) was rechecked on 2026-11-02. Concept and terminology paraphrase the general principle and retain loss/guarantee limits. The myth/fact and two-account examples apply that principle to identical underlying holdings; this is an explanatory inference, not a sourced claim about investor behavior. The myth is labeled as a myth, never presented alone as advice.

No allocation target, actual investment return, current rate, Rwanda-specific legal rule or personalized recommendation is included. Source credit and education note are visible and editable; edits require renewed factual/editorial review. Schema and layout checks cannot establish financial truth or publication approval.

### Phase 03 verification — 2026-11-02

Node 24.22.2: Nuxt/export-handler type checks, ESLint, all 17 unit/content tests and 34 contrast checks passed. All 7 browser tests passed: 14 draft/format PNG renders (including 8 education renders), every visible education text field edited and observed in preview, four style selections at both sizes, education download, invalid style/field rejection, text collision rejection, single official SVG verification and 320px overflow checks. The production build, all 4 production HTTP tests, static generation and all 10 artifact checks passed; studio routes/export remain absent from production.

All eight `exports/social/education-{concept,myth-fact,did-you-know,terminology}-{square,portrait}.png` files were actually exported and visually inspected. Verified typography/wrapping, content/source separation, olive/ivory consistency, decorative gold usage and a single small SC signature. Exports remain ignored by Git. No new dependencies or marketing-page changes; no push, deployment or publication. Editable copy remains subject to editorial review; no full assistive-technology or real-device audit was performed.

## Phase 04 — Treasury Bond Explainer

`TreasuryBondExplainer.vue` adds a fourth template. Select `treasury-bond-explainer` in the existing local studio. It presents a restrained editorial ledger/timeline in existing olive/ivory/ink tokens: one official SC symbol, plain date/event/value columns, a thin connecting line, and a small gold illustrative-example accent. It uses no stock infographic artwork, external font, live data or financial engine.

The headline, introduction, eyebrow, brand text, timeline heading, column headings, dates, row labels, displayed amounts, assumptions note, footnote, source credit and footer are editable. `TreasuryBondFields.vue` provides the nested editor. Add or remove coupon rows within 3–6 events; principal remains first and maturity last with at least one coupon between. An immutable **Illustrative example** marker remains visible on every export. Amounts and dates are text, not parsed as official terms or calculated cash flows. The editor does not infer direction from a value: include signs and units explicitly when useful.

The draft uses `template: "treasury-bond"` and a `bond` object containing `brand`, `exampleNote`, `timelineHeading`, `dateHeading`, `eventHeading`, `valueHeading`, `footnote`, `source`, `footer`, and `events`. Each event has `kind` (`principal`, `coupon`, `maturity`), `date`, `label`, and `value`. Event kinds preserve the basic explanatory order; dates are authored strings. Rows are equally spaced for reading and explicitly not a time-proportional chart. The final scheduled coupon and principal repayment can share a date while remaining distinct records. Dense timelines use tighter row spacing; export rejects copy that overlaps the introduction or footnotes. Long edits may require shorter text or fewer coupon rows.

### Editorial reference and example limits

All four requested local guides were read first:

- `content/learn/rwanda-treasury-bonds.md`: issue-specific terms, face value versus price, lending to government, risk and original-document review.
- `content/learn/bond-coupon-payments.md`: coupon schedules versus receipts and security-specific payment terms.
- `content/learn/bond-maturity.md`: principal due at maturity versus sale proceeds or coupon income.
- `content/learn/coupon-rates-versus-yields.md`: coupon rate is not yield or total performance; no yield calculation is added to this authoring tool.

Their general [Investor.gov bond reference](https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds) and [MoneySense explanation](https://www.moneysense.gov.sg/understanding-bonds/) were rechecked on 2026-11-02. Foreign market rules are not used as Rwanda issue terms.

The default timeline is an explicitly hypothetical 100-unit principal, two 3-unit scheduled coupons, and 100 units of principal due at maturity. Relative dates are Day 0, Month 6, Month 12 and Month 12. The example assumes purchase at face value, payments made as promised, and no costs or taxes. It is **not an actual BNR security**, a current rate, offer, payment confirmation, yield forecast or promise of repayment. It deliberately separates principal from coupon income and retains a visible schedule/receipt/guarantee limitation. Check an actual issue’s official documents separately; publishing edited copy still needs factual review. Schema checks validate shape/length/order, not economic consistency, chronology or investment suitability.

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/treasury-bond-explainer.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/treasury-bond-explainer.json portrait
```

Files go to ignored `exports/social/`. Persist studio edits in the draft JSON as in earlier phases. Marketing pages, production isolation, existing dependencies and Swift generators remain unchanged.

### Phase 04 verification — 2026-11-02

Node 24.22.2: Nuxt and export-handler type checks, ESLint, all 17 unit/content tests, 34 contrast checks, production build, all 4 production HTTP tests, static generation and all 10 artifact tests passed. All 9 browser tests passed: 16 draft/format PNG renders, bond timeline/label/date/value/footnote edits, add/remove coupon controls, square and portrait downloads, 3-event and 6-event rendering in both formats, invalid structure/text rejection and deliberate overlap rejection. The studio remains excluded from production routes, API registration and public artifacts. No checks were blocked.

Exported and visually inspected `exports/social/treasury-bond-explainer-square.png` (1080×1080) and `exports/social/treasury-bond-explainer-portrait.png` (1080×1350). Verified official logo, date/event/value alignment, timeline markers, separate final coupon/principal rows, persistent illustrative label, hypothetical assumptions, footnote clearance and brand consistency. Both files are gitignored. No financial calculation, live BNR data, new dependency, marketing-page change, push or publication. Full real-device and assistive-technology audits were not performed.

## Phase 05 — Product Showcase

`ProductShowcase.vue` adds a fifth template. Select `product-showcase` in the local studio. The headline/subtitle sit beside tall app captures; the annual-report card uses a wider composition so its original text stays legible. Olive editorial typography, an ivory canvas, a short gold rule and official SC artwork preserve the existing identity. Choose no geometry, a small SC signature or a subtle SC structure. Both geometric treatments reuse the actual symbol SVG, stay behind the image and do not redraw app UI or add a second phone frame.

Editable fields include eyebrow, headline, subtitle, screenshot selection, geometry, brand text, footer and note. Persist edits in `social-content/posts/product-showcase.json`. The schema uses `template: "product-showcase"` plus `showcase: { screenshot, pattern, brand, footer, note }`; allowed patterns are `none`, `signature`, `structure`. The asset caption is selected with the screenshot and retains its capture/capability qualification. Arbitrary paths, remote URLs and raw account screenshots are rejected by shared validation.

### Asset inspection and reuse

All nine requested raster files were visually inspected alongside `ScScreenshot.vue`, `prepare-product-images.swift` and the existing homepage evidence. `shared/social-product.ts` registers only existing public derivatives:

| Selection | Served file | Native size | Intended use |
| --- | --- | --- | --- |
| `calendar` | `/product/calendar-840.png` | 840×1774 | Full authentic app capture, including its existing device frame |
| `calendar-detail` | `/product/calendar-detail-700.png` | 700×934 | Full existing calendar crop |
| `import` | `/product/import-detail-700.png` | 700×665 | Complete existing-document receipt |
| `reports` | `/product/reports-detail-900.png` | 900×397 | Complete annual-report card crop |

The 560px calendar was inspected but is not a separate social selection: the existing 840px version provides more source pixels for PNG capture. Raw `portfolio-dashboard.png` contains portfolio amounts; `pdf-import.png` and `documents-and-reports.png` include account identity. They remain outside public assets and the selection registry. Raw `coupon-calendar.png` is already represented by the existing calendar derivatives. No original was modified or exposed, and no new copy or derivative was needed.

The Swift pipeline’s reviewed crops, source-dimension assertions and high-quality interpolation remain the canonical image preparation path. This phase reuses its outputs unchanged. If a genuinely new view is approved later, inspect/redact the source and add a crop/resizing entry there rather than copying a raw screenshot into `public/` or rebuilding its UI. See [Homepage evidence](HOMEPAGE_EVIDENCE.md) for the existing crop coordinates and issuer-artwork/publication limits.

`ScScreenshot` is reused with eager loading and `frame=false`. Images retain their full derivative aspect ratio using contain rendering, no rotation/filter, no additional crop and no upscaling. The full calendar is displayed at 320px (square) / 400px (portrait), detail/receipt at 440px, and report at 900px on the 1080px output canvas. Sharpness checks compare the unscaled capture’s rendered dimensions against the decoded image’s native dimensions. Missing images show the existing unavailable state; exports fail rather than silently capture it. Layout checks protect the header/footer and prevent screenshot/caption clipping. Headlines keep words and punctuation together; copy that exceeds its column is rejected. Long edits may need shortening.

### Copy and capability limits

The default wording uses the owner’s “Your investments. One clear picture.” example without announcing a public release, download availability, broker partnership or live data. Calendar dates are captured, not a current offer. The receipt is an existing-document state, not evidence of a newly successful import or universal PDF support. The annual-report card does not imply a tax/regulatory filing. These qualifications accompany the corresponding real images; issuer artwork within the receipt is not a partnership or regulatory-approval badge. The dashboard’s personal/sample amounts are not platform statistics.

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/product-showcase.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/product-showcase.json portrait
```

PNG files remain under ignored `exports/social/`. Studio edits remain memory-only until written to the JSON draft. No new dependencies, marketing-page edits, production route/API, image downloads/generation or publishing service are introduced.

### Phase 05 verification — 2026-11-02

Node 24.22.2: Nuxt/export-handler type checks, ESLint, all 17 unit/content tests, 34 contrast checks, production build, all 4 production HTTP tests, static generation and all 10 artifact checks passed. All 11 browser tests passed, including 18 repository draft/format renders, all four product screenshot choices in both sizes, registry/native PNG dimension checks, arbitrary/private/remote-source rejection, text and geometry editing, missing-image recovery, download and 320px layout. The exporter checks native pixel bounds, full screenshot/caption containment and copy clearance; a regression check keeps the sample headline’s word and punctuation on one line. Production still excludes the entire studio and export endpoint.

All eight product PNGs were exported and visually reviewed in `exports/social/`: `product-showcase-{square,portrait}.png` (full calendar), plus `product-showcase-{calendar-detail,import,reports}-{square,portrait}.png`. Square is 1080×1080; portrait is 1080×1350. Review checked sharpness, complete derivative content, captions, logo/geometry, typography and contrast. A portrait punctuation break was corrected, the PNG set regenerated, and affected portraits rechecked. All exports are gitignored. Existing `public/product/` files, raw screenshots, ScScreenshot and the Swift pipeline are unchanged; no duplicated/new public screenshot or dependency was needed. No push or publication; full real-device and assistive-technology audits were not performed.

## Phase 06 — Brand Statement

`BrandStatement.vue` is the sixth template, with two editable presets:

- `brand-statement-typography`: variation A, oversized editorial copy with an optional small SC signature.
- `brand-statement-photography`: variation B, a broad photograph panel above a compact copy treatment. **The real-photo asset is currently missing, so this preset exports labeled draft proofs.**

Choose a preset or change Statement variation in the existing studio. Headline, supporting text, eyebrow, brand text, footer and note are editable. Choose ivory/olive or olive/cream; the latter uses the existing official reversed SC logo. Theme changes affect the graphic, not the studio. Both use `--sc-font` and current tokens. Geometry choices are none, one small official SC signature, or one short decorative gold rule. The identity always retains an official logo; there is no repeated pattern or financial stock artwork.

`BrandStatementFields.vue` edits the nested configuration. Drafts use `template: "brand-statement"` plus `statement: { variation, theme, pattern, photoId, cropX, cropY, brand, footer, note }`. Allowed variations are `typography`, `photography`; themes are `ivory`, `olive`; patterns are `none`, `signature`, `rule`. Crop percentages run from 0 to 100. The photo uses cover rendering with the selected focal position and its registry credit; it is never filtered or generated. Headline words stay intact, and export rejects text that exceeds its column or overlaps the header/footer, photograph or credit. Long copy needs shortening. As in earlier phases, edits remain in memory until saved in JSON.

### Photography status and requirements

A fresh repository search found no standalone Kigali/Rwanda photograph; only brand output and app screenshots exist, and `social-content/photos.json` remains empty. No source image was generated, downloaded, extracted from a dashboard or copied into a new photo folder. Variation B has a visible missing-photo panel and `DRAFT PROOF · RWANDA PHOTOGRAPH MISSING`; the existing `X-Social-Proof: missing-photo` response header and browser/CLI feedback identify it as a proof. A selected but broken image remains an export error. Variation A exports normally without the missing-photo marker.

The existing photo registry is extended, not duplicated: `brandPhotos` accepts reviewed files under `/brand/photos/kigali/` or `/brand/photos/rwanda/`. `kigaliPhotos` remains a filtered subset, so Kigali Editorial cannot accidentally label another Rwanda location as Kigali. Entry metadata is unchanged: id, local src, descriptive alt, photographer/credit and original width/height. Location, rights and accuracy require human review; a valid path is not evidence of location. No folder or photo file was created in this phase.

To finish variation B, supply an original real Kigali/Rwanda photograph with location confirmation, permission for public use, alt text and credit. Add the reviewed file and registry entry using the Phase 02 workflow (the Rwanda path is now also supported), restart dev, select it, adjust the crop and review both formats. Prefer a landscape source at least 1080px wide, with headroom for the broad crop. Actual photographic quality/crop verification and a completed photography-led PNG remain pending this asset; missing-photo proofs are not publication artwork.

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/brand-statement-typography.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/brand-statement-typography.json portrait
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/brand-statement-photography.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/brand-statement-photography.json portrait
```

All PNGs stay under ignored `exports/social/`. No public marketing page, production route/API, asset master or dependency is changed. The example is the owner’s brand statement and supporting recordkeeping copy, not an investment return or release claim.

### Phase 06 verification — 2026-11-02

Node 24.22.2: Nuxt/export-handler type checks, ESLint, all 17 unit/content tests, 34 existing contrast checks, production build, all 4 production HTTP tests, static generation and all 10 artifact checks passed. All 13 browser tests passed, including 22 repository draft/format PNG renders, both statement variations in both themes, computed headline/body contrast of at least 4.5:1, official reversed-logo selection, text/variation/pattern controls, keyboard crop controls, missing-photo header/download feedback, malformed configuration rejection, overflow rejection and 320px layout. Production excludes the studio, drafts and export endpoint.

Exported and visually inspected all eight `brand-statement-{typography,photography}[-olive]-{square,portrait}.png` files in ignored `exports/social/` (1080×1080 / 1080×1350). Checked type wrapping, whitespace, color/logo consistency, restrained signature and proof visibility. Four typography PNGs are complete renderings; four photography PNGs are intentionally labeled missing-asset proofs. **Actual photo quality/cropping and a finished variation B remain pending a real user-provided photograph.** No fake/downloaded/stock image, new photo folder, asset-master change, dependency, marketing-page edit, push or publication. Full real-device/assistive-technology audits were not performed.

## Three-Step Guide

`ThreeStepGuide.vue` adds a seventh template. Choose `three-step-guide` in the existing studio. It uses the shared SocialCanvas, existing olive/ivory/system-font tokens, official SC identity and three spacious numbered stages. The default wording is the owner’s Record → Track → Understand example. Eyebrow, headline, supporting copy, brand text, all three numbers/labels/descriptions, footer and note are editable through `ThreeStepGuideFields.vue`. Persist edits in `social-content/posts/three-step-guide.json`; studio edits remain in memory.

The schema uses `template: "three-step-guide"` plus `guide: { brand, footer, note, steps }`. Exactly three steps are required, each with bounded nonempty `number`, `label`, and `description`. Labels and descriptions do not interpret HTML. Generous fixed row spacing preserves a deliberate layout at each canvas size; export rejects copy that overflows a row, intrudes on another step or collides with the introduction/footer. Character limits protect input size, not guaranteed visual fit—shorten long labels or descriptions when needed.

### Monogram-derived geometry

`ScMonogramMarker.vue` reads the actual `public/brand/struct-capital-symbol.svg` through a local raw import and extracts its named `S-ribbon`, `C-upper`, and `C-lower` paths. Each step uses one fragment in a measured viewBox, preserving the original path data. These are decorative fragments, not replacements for the official identity shown in the header. No source SVG is copied or altered, and no generic circle, icon, stock arrow, repeated hexagon or new public asset is introduced. Missing/renamed source paths fail visibly instead of falling back to invented geometry.

One subdued 1px SVG path connects the centers of the three markers. Its extent follows the same row-height variables as the layout, in both formats. A semantic ordered list carries the text; the connector and markers are decorative and hidden from assistive technology. Shape/color are not the sole indications of sequence.

### Capability evidence

The copy was checked against the existing `app/pages/how-it-works.vue` and `docs/HOMEPAGE_EVIDENCE.md`: supported document imports and available manual entry; bond/share records and expected schedules; report summaries and calendar timelines. It does not claim universal PDF support, live prices, account synchronization, trading, public app availability or guaranteed income. The visible note retains format/review limits and separates expected income from confirmed payment. No new mobile/backend feature was implemented or independently release-certified; edited copy still needs factual review.

```sh
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/three-step-guide.json square
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run social:export -- social-content/posts/three-step-guide.json portrait
```

PNG outputs stay in ignored `exports/social/`. No dependency, public marketing page or production endpoint is added. Earlier templates and the official logo masters remain unchanged.

### Three-Step Guide verification — 2026-11-02

Node 24.22.2: Nuxt/export-handler type checks, ESLint, all 17 unit/content tests, 34 contrast checks, production build, all 4 production HTTP tests, static generation and all 10 artifact checks passed. All 15 browser tests passed, including 24 repository draft/format PNG renders, edits to every guide number/label/description, exact marker path comparison against the official SVG, a single connector whose ends align with first/third marker centers at both sizes, invalid step counts/text rejection, row-overflow rejection, two downloads and 320px layout. Production isolation remains intact.

Exported and visually inspected `exports/social/three-step-guide-square.png` (1080×1080) and `exports/social/three-step-guide-portrait.png` (1080×1350). Verified the three distinct monogram fragments, continuous subtle connector, typography, generous spacing and qualification note. Exports are gitignored; official brand masters are unchanged. No unsupported capability, new dependency, marketing-page edit, push or publication. Full real-device and assistive-technology audits were not performed.

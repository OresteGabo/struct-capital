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

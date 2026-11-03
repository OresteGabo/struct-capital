# Website brand patterns — collection and composition plan

Date: 2026-11-03. Status: **24 SVG variants implemented and audited**, with a development-only gallery and configured public homepage. See the [final audit](#final-audit--2026-11-03) for current results, resolved issues and limitations.

This collection is for decorative marketing-website artwork, separate from the local social-image studio. The asset phase adds a reusable renderer, geometry modules, typed registry and local review command. It changes no public page, existing component, global token, official logo, dependency or Nuxt runtime configuration. The integration phase now applies one restrained hero and one small divider through `shared/website-brand-patterns.ts`; the gallery auditions the same homepage implementation without persisting edits.

## Implemented assets and usage

`app/components/brand/ScBrandPattern.vue` is the rendering entry point. It composes native SVG paths, token-based gradients and clipping from six focused modules in `app/components/brand/artwork/`. Geometry is authored once there, not duplicated in standalone public SVGs or bitmap backgrounds. The inline SVG output is the artwork; no raster asset is required at runtime.

`shared/brand-patterns.ts` exports `brandPatternFamilies`, `brandPatterns`, `getBrandPattern`, and typed ID/family/placement/theme/layout definitions. All catalog IDs below are implemented. Each registry entry supplies its name, intended placements, supported themes, desktop/mobile viewBox, mobile treatment and default settings (`layout: 'auto'`, `intensity: 1`).

Reusable renderer example:

```vue
<script setup lang="ts">
import ScBrandPattern from '~/components/brand/ScBrandPattern.vue'
</script>

<template>
  <ScBrandPattern pattern="structural-fold-01" />
  <ScBrandPattern pattern="capital-arc-04" layout="desktop" :intensity="0.75" />
</template>
```

| Prop | Contract |
| --- | --- |
| `pattern` | Required `BrandPatternId`; unknown IDs throw an explicit error rather than silently displaying another composition |
| `layout` | `'auto'` default, or explicit `'desktop'` / `'mobile'` for review; auto uses the component's container width, mobile at ≤1023px |
| `intensity` | Default 1; finite values clamp to 0–1, non-finite values fall back to 1; attenuates the entire composition |

Normal artwork uses 1200×600 desktop and 400×360 mobile viewBoxes. Dividers use 1200×160 and 400×100. Width is fluid with the native aspect ratio; the component does not position itself over page content. An integrating wrapper must provide isolation, layering and content-safe placement. Mobile geometry is separately authored, not a transformed desktop crop. Automatic layout uses CSS container queries and needs no client script.

Theme inherits the existing CSS tokens/`data-theme`/system preference; there is no separate theme prop or competing theme state. Gradients retain the same restrained alpha ranges in both schemes while `--sc-primary` changes from olive to cream. Stops, fills and fine lines were reviewed against both backgrounds. Do not apply CSS inversion. Gradient/clip IDs use Vue's SSR-stable `useId`, separately suffixed for each view; repeated variants in one app do not collide. Stroke gradients use user-space coordinates so purely horizontal paths remain visible. Strokes retain their CSS-pixel width while artwork scales.

The root is inert, `aria-hidden`, non-interactive and clipped. SVGs are non-focusable. Forced-color mode hides the decoration while reserving its layout space; no motion, filters, scripts, external references, text or embedded images are authored into the SVG. The official monogram was used as geometric evidence only; no shared/social component or logo master needed modification.

### Render and review locally

Use the repository's Node 24 version (`^24.15.0`), then:

```sh
npm ci
npx playwright install chromium
npm run patterns:review
```

No development server is needed. The review script uses the existing Vite/Vue SSR compiler and Playwright from the lockfile, without adding a route, endpoint or dependency. It renders the actual component in an isolated local harness and saves 96 PNGs, self-contained HTML specimens, six family contact sheets and `report.json` under gitignored `exports/brand-patterns/`. Example: `exports/brand-patterns/structural-fold-01-desktop-light.png`. Contact sheets are `<family>-contact-sheet.png`; their labels/background framing belong only to review HTML. The command overwrites matching files.

The report records dimensions, resolved colors, paint/clip reference validity, SVG paths, nonblank pixel counts and PNG hashes. It also checks unique IDs across repeated instances, distinct images for all 24 variants per layout/theme, responsive behavior at 320/390/768/1023/1024/1280/1440px, bounded intensity, system theme changes, forced colors, no horizontal overflow and no-JavaScript SVG visibility. These are component specimens, not evidence of completed integration behind real website text/screenshots.

## Inspection and branch

Read `AGENTS.md`, `README.md`, `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, the actual CSS tokens, homepage, ScBrand, ScScreenshot, design-system specimens, social template geometry and monogram-marker component, Nuxt configuration and the contents of `public/brand/`.

The working tree was clean on `feature/social-media-studio` at `da427a5`. Created `feature/website-brand-patterns` from that current verified work: it includes the recent reusable monogram fragments and preserves all seven social phases and their audit. Local `main` is the earlier `f2d7b98`; this choice avoids losing or recreating the newer components. No push, merge or deployment is part of this phase.

Capabilities and gaps at planning inspection (before the asset implementation above):

| Area | Verified state | Treatment in this plan |
| --- | --- | --- |
| Identity | Official symbol and full-logo SVGs, each with reversed variant | Keep masters unchanged; use them as geometric evidence |
| Homepage | Two-column hero from 1024px, stacked below; calendar capture, report excerpt, faint symbol watermark and masked independence symbol | Design around these real elements, preserving copy, links and screenshot proportions |
| Social decoration | Kigali signature/rhythm, Product Showcase signature/structure, Brand Statement rule/signature, three-step monogram fragments | Reuse evidence and conventions; these are template-local treatments, not a website pattern library |
| Design-system route | Existing opt-in component specimens; “content patterns” means UI compositions | No decorative collection/selector exists there today |
| Public brand directory | Four official SVG masters and fixed `social-preview.png` | No standalone arc/fold/horizon/contour collection exists |
| Dependencies | Nuxt/Vue/TypeScript/Tailwind; development Playwright | No illustration or animation library needed for this plan |
| Theme | CSS system preference plus explicit light/dark override | Plan both themes without client-only theme initialization |

Some early paragraphs in `DESIGN_SYSTEM.md` retain historical statements that supporting pages or hosting were pending. Actual routes/configuration and later architecture/feature records show they exist. Treat those paragraphs as phase history, not current capability restrictions. Its original no-gradient homepage description records the existing composition; the gradients proposed here are explicitly new decorative work, not extracted mobile artwork.

## Reference interpretation

The seven owner-supplied attachments were visually studied as design references. Their typography, screenshot reconstructions and embedded product text are not approved website copy or source UI assets. Do not copy those screenshots into `public/`.

| Reference attachment | Direction to retain | Adaptation |
| --- | --- | --- |
| Struct Capital Brand Accents Board.png | Six related visual ideas; plenty of ivory; small divider accents | Expand into distinct compositions, not a single board image |
| Struct Capital Folded Planes Hero.png | Broad diagonal layers and gentle overlapping depth | Reduce dominance near text; preserve the real product stage |
| Capital Arc Investment Overview.png | Fine parallel curves flowing beneath/behind the product | Keep line work outside the copy and boundary note |
| Capital Cartography_ One Clear Picture.png | Layered landscape-like curves, selective path markers | Abstract contours only; remove the appearance of a measured rising investment chart |
| Struct Capital Investment Dashboard.png | Staggered upright ribbon cuts over a low sweep | Vary heights irregularly; no bar-chart reading or fabricated dashboard |
| Struct Capital Investment Clarity.png | Few large folded cuts, fine edges and quiet gradients | Prefer fewer well-spaced planes over many bright layers |
| Struct Capital Contour Portfolio Hero.png | Nested angular contours around the phone | Use an open, off-centre crop; avoid a target or repeated hexagon wallpaper |

Names such as Capital Arc and Investment Horizon are internal art-direction labels. They must not appear as return promises, chart legends or product capability claims. No real geography, local craft provenance or financial data is asserted by this abstract artwork.

## Brand constraints from actual sources

### Palette and theme

Canonical values remain in `app/assets/css/tokens.css`. Do not sample replacement colors from reference PNGs or introduce a second global palette.

| Token | Verified value / behavior | Planned decorative use |
| --- | --- | --- |
| `--sc-olive` | `#6d5e0f` | Structural edge or restrained plane shading |
| `--sc-cream` | `#f2e6a7` | Soft fill/highlight, especially against dark surfaces |
| `--sc-gold` | `#ecc75f` | Sparse edge/marker detail; never substitute for readable small text |
| `--sc-ink` | `#252317` | Existing ink roles; occasional low-opacity depth |
| `--sc-background` | `#faf8f2` light / `#11150f` dark | Transparent artwork composites onto the real page background |
| `--sc-surface-muted` | `#f1eee3` light / `#181f18` dark | Quiet depth and supporting planes |
| `--sc-primary` | Olive light / cream dark | Theme-aware fine lines and SC-derived accents |
| `--sc-border` | `#d9d5c5` light / `#414735` dark | Quiet supporting contours |

Proposed starting ranges, subject to rendered review: broad tonal layers 4–16% opacity, structural edges 12–28%, isolated accents up to 45% only away from copy. Use opacity and token-to-transparent gradients; no white fade baked over a dark surface. Dark compositions need independent stop-opacity review, not inversion filters. Preserve semantic text, outline and focus colors. Sage, coupon blue, maturity green and status colors remain available for their existing meanings, not extra pattern palettes.

### Geometry and logo integrity

The official `struct-capital-symbol.svg` has `viewBox="0 0 512 512"`, a translated source group and named paths `hexagon`, `S-ribbon`, `C-upper`, `C-lower`. For example, the S segment `(565,312) → (425,392)` has an 80:140 slope, about 29.7° to the horizontal. The outline segment `(518,222) → (684,318)` is about 30.0°. These are source observations, not a claim that every logo edge is mathematically identical.

Use approximately ±30° diagonals, verticals, and 60°/120° relationships where consistent with the master. Preserve its balance of long diagonal runs, vertical returns and softened joins. Curved families may use free Bézier paths but should meet structural fragments with related tangents. Do not force the logo itself into a new angle grid.

New folds/contours are derived artwork, not alternate logos. Never alter the master paths, stretch the official symbol, redraw its lettering, or replace ScBrand with a decorative fragment. If an exact monogram fragment is needed, reuse the source-extraction approach already in ScMonogramMarker rather than maintaining copied path data. Allow one quiet signature, not repeating badge wallpaper.

## Composition catalog — six families × four variants

IDs below are the stable registry identifiers. Each variant changes path topology, arrangement or visual balance, not just color. “Hero” means the product/right side and lower edge of the existing hero; “section” means one supporting accent; “divider” means a shallow ornament outside readable content. Placements are registry recommendations, not proof that a pattern has already been placed on a page.

### 1. Capital Arc

| ID / composition | Distinct construction | Intended desktop use | Mobile treatment |
| --- | --- | --- | --- |
| `capital-arc-01` — Low sweep | Five nearly parallel Bézier lines sweep down along the bottom before lifting at the far right; no arrowheads | Hero lower edge, with most curvature below the product stage | Three lines beneath the stacked screenshot; do not cross the boundary note |
| `capital-arc-02` — Open fan | Six curves share a loose lower-right origin and separate into a broad vertical fan behind the phone | Hero product backdrop; empty left half | Crop to the outer three curves on the right of the screenshot |
| `capital-arc-03` — Paired banks | Two unequal curve groups enter from opposite edges but leave a generous central gap; endpoints do not connect | Wide section header or transition with a clear central content region | Retain one short edge group; discard the opposite bank |
| `capital-arc-04` — Tangent interval | Three shallow arcs meet a short straight horizontal run, interrupted by a deliberate empty interval | Shallow section divider; no data points or ticks | Single shallow arc with the same central break; no compressed dense lines |

### 2. Structural Fold

| ID / composition | Distinct construction | Intended desktop use | Mobile treatment |
| --- | --- | --- | --- |
| `structural-fold-01` — Crossing planes | Two broad diagonal planes cross once; a narrow return face establishes the fold without a heavy shadow | Hero product area; highest depth kept behind the phone | One plane and its return face under the product, no crossing behind copy |
| `structural-fold-02` — Upright return | One tall folded strip has a vertical return and an offset rear plane; mostly open centre | Right-edge hero frame or product section accent | Keep the upper/right return; remove rear plane if it crowds the screen |
| `structural-fold-03` — Offset canopy | Two unequal overhanging planes enter from the upper-right, leaving an open pocket beneath | Upper corner of a supporting section; avoid enclosing content in a new card | One clipped corner plane, entirely outside the heading |
| `structural-fold-04` — Flat seam | A long low folded strip exposes a thin contrasting underside and terminates asymmetrically | Low divider between sections | Short edge-anchored seam; maintain face width instead of shrinking the full strip |

### 3. SC Cut

| ID / composition | Distinct construction | Intended desktop use | Mobile treatment |
| --- | --- | --- | --- |
| `sc-cut-01` — Staggered blades | Three unequal upright ribbon cuts with rounded returns; irregular spacing, no ascending sequence | Hero right edge, behind the real screenshot | Two cropped cuts with clear space between them |
| `sc-cut-02` — Open elbow | A single broad angular ribbon turns through one return, making an off-centre open notch | Product/independence section edge; never a replacement logo | Keep one elbow around an empty corner, not a border around copy |
| `sc-cut-03` — Detached facets | Two separated diagonal fragments face across an ivory gap; one long, one compact | Small section accent beside an eyebrow or screenshot | Retain the compact facet, aligned outside the text measure |
| `sc-cut-04` — Balance tabs | Three short oblique tabs with unequal widths sit between two fine interrupted rules | Minimal divider, informed by the board’s Balance Mark | Preserve three legible tabs at fixed small size; shorten rules |

### 4. Investment Horizon

| ID / composition | Distinct construction | Intended desktop use | Mobile treatment |
| --- | --- | --- | --- |
| `investment-horizon-01` — Quiet saddle | Two shallow layers form a dip and gentle shoulder, with neither a steadily rising profile nor markers | Low hero backdrop beneath the product | One broad shallow layer below the screenshot |
| `investment-horizon-02` — Offset disc | A partly concealed soft disc sits behind an off-centre ridge; no glow or implied sunrise promise | Supporting section illustration; pair with neutral existing copy | Smaller clipped disc and single ridge on one edge |
| `investment-horizon-03` — Open valley | Opposing low banks leave an open valley/negative-space channel near the centre-right | Wide product section background with content outside the banks | Keep one bank only; do not place the headline inside a narrow valley |
| `investment-horizon-04` — Distant strata | Three nearly horizontal tonal bands end at different positions with generous vertical separation | Shallow section transition; flat enough to avoid a performance curve | Two bands, cropped ends, ample gap; no tiny stacked lines |

### 5. Guided Path

| ID / composition | Distinct construction | Intended desktop use | Mobile treatment |
| --- | --- | --- | --- |
| `guided-path-01` — Side passage | One line bends around the product area with two quiet non-directional markers at unequal intervals | Hero product-side accent; does not connect to screenshot controls | One bend and one small marker beside the product |
| `guided-path-02` — Three turns | A predominantly horizontal path alternates rounded turns above/below its centreline; no upward progression | Supporting workflow-section decoration, separate from real step labels | A short vertical meander beside the stacked region; no implied reading order |
| `guided-path-03` — Angular detour | A precise open path combines ±30° segments and a vertical return with one SC-derived facet at the turn | Section corner or screenshot accompaniment | Keep a single turn/facet; avoid cropping it into an arrowhead |
| `guided-path-04` — Interrupted link | Two thin rule segments are bridged by a small offset path with one restrained marker | Low divider; no timeline dates, chart axes or hover behavior | Shorten straight segments, retain the recognisable offset bridge |

Markers are decorative, not product states, investment milestones, interactive controls or payment confirmations. Prefer a small monogram-derived facet or a quiet ring where appropriate to the family; do not turn every path into a generic dotted infographic. No animation along the line is planned.

### 6. Capital Contour

| ID / composition | Distinct construction | Intended desktop use | Mobile treatment |
| --- | --- | --- | --- |
| `capital-contour-01` — Open chamber | Five nested, open angular contours wrap the far side of the product; unequal cutoffs avoid closed concentric badges | Hero right/product backdrop, inspired by the contour reference | Three open contour returns at the screenshot’s outer edge |
| `capital-contour-02` — Corner terrace | Four L-like stepped contours combine a vertical return and diagonal shoulder, entering from one corner | Section corner with a large empty interior | Two corner returns; preserve spacing rather than scaling all four down |
| `capital-contour-03` — Broken isobands | Three asymmetrically bent bands have staggered breaks and no common centre; unrelated to a map | Wide supporting-section accent | One broken band with two deliberate terminal cuts |
| `capital-contour-04` — Contour gate | Two unequal angular brackets flank a broad unoutlined interval; no full hexagon | Horizontal divider or compact product-stage footer accent | One bracket and a short opposite stroke, with clear central space |

## Placement and responsive rules

- **Hero:** keep the headline, lead, CTA row, broker-boundary note, stage labels and screenshot captions free of strong artwork. Initial review guide: the left approximately 55% of a wide hero is the copy-safe region; actual rendered content bounds take priority. Background forms may extend only into an isolated, clipped decorative wrapper, never produce page overflow. Test 1024px carefully: the existing two-column layout begins there and has less spare space than reference mockups.
- **Section:** use one local accent at an edge or behind a product image. The existing dark solution panel needs a deliberate theme treatment; do not assume light-page artwork is suitable there. Do not decorate every card or place translucent fills over screenshots.
- **Divider:** shallow ornaments live in their own spacing and cannot replace a meaningful heading, link, border or workflow explanation. Never add meaningless ARIA announcements.
- **Mobile:** below the existing 1024px hero split, move artwork to the stacked product region. At 320–639px use the simplified treatments in the catalog; 640–1023px can retain more geometry only after inspection. Do not shrink a desktop composition indiscriminately or hide essential content to make room for it.
- **Density:** one dominant composition per viewport, with optional small supporting accents. No tiled hexagons, repeating logos, stock finance icons, coins, arrows, glossy 3D decoration, heavy glows or chart-like rising sequences. Start with static artwork; no parallax, timers or automatic pattern rotation.

## Reuse and original implementation plan

The following reuse inventory and design rationale guided implementation. Current delivered paths/API are documented above; a gallery, standalone public exports and website configuration are still deferred.

| Existing source | Reuse / boundary |
| --- | --- |
| `app/assets/css/tokens.css`, `main.css` | Current palette, theme, spacing, focus, forced-color and reduced-motion conventions; preserve global tokens |
| `public/brand/struct-capital-symbol.svg` and reversed master | Authoritative geometry and official identity; keep byte-identical |
| Full-logo transparent/reversed SVGs | Preserve as masters; square artwork canvas is not a ready horizontal-header asset |
| `app/components/ScBrand.vue` | Keep official masked symbol plus live readable brand text |
| `app/components/social/ScMonogramMarker.vue` | Existing exact S/C-fragment extraction is evidence and a potential shared primitive; investigate extraction to a neutral location only when needed, retaining social behavior |
| `app/components/social/templates/{KigaliEditorial,ProductShowcase,BrandStatement}.vue` | Existing mask/opacity/rule treatments inform consistency; do not copy their fixed social-canvas layout into the website |
| `app/components/ScScreenshot.vue`, `public/product/*` | Authentic calendar/report/import derivatives, reserved aspect ratio and error handling; never regenerate UI or add a second phone frame |
| `app/pages/index.vue`, ScContainer, ScSectionHeading | Preserve real hero boundaries, content hierarchy, widths and current breakpoints |
| `app/pages/design-system.vue`, `nuxt.config.ts` | Consider existing specimens and route-exclusion conventions for a later local gallery; no public editing controls |
| `scripts/prepare-product-images.swift`, `scripts/generate-social-preview.swift` | Existing screenshot/OG responsibilities remain separate; neither needs replacement for vector decoration |

Implemented shape: `app/components/brand/ScBrandPattern.vue` renders a selected composition; family geometry lives beside it in focused TypeScript modules. `shared/brand-patterns.ts` holds stable IDs and placement/theme metadata. Native inline SVG provides runtime CSS-variable theming, unique gradient/clip IDs for repeated instances and explicit viewBox geometry. Standalone optimized SVG exports, if later needed, would be derived from this same source rather than hand-maintained duplicates in `public/brand/patterns/`.

Use SVG gradients, paths and clipping rather than bitmap traces, screenshot backgrounds, large blur filters, canvas or an added drawing dependency. SVG decorations must be `aria-hidden`, non-focusable, non-interactive and `pointer-events: none`; content remains semantic HTML above them. Hide nonessential artwork in forced-color mode. Theme/variant choices must be deterministic and SSR-safe. No public settings screen, storage service or new endpoint is planned.

Manual switching uses the typed `shared/website-brand-patterns.ts` configuration described below. The public website stays independent of social draft content and the development studio catalog.

## Delivery sequence and acceptance criteria

1. **Planning phase (completed):** repository inspection and the 24-composition plan. Its historical verification record is below.
2. **Asset phase (implemented):** six families/four distinct variants, both theme treatments and simplified mobile geometry. Component-rendering evidence is recorded below. No raster output is deployed.
3. **Gallery phase (implemented):** `/brand-patterns` provides local family/variant selection, actual homepage/screenshot previews, viewport/theme comparison and copied configuration. Both gallery/preview routes are excluded from every production build, independently of the design-system review flag. See the gallery workflow and verification below.
4. **Integration phase (implemented):** reviewed fold hero and small arc divider use one typed website configuration. Optional independence/product accents default off. Marketing wording, screenshot identity, CTA destinations, SEO and product behavior are preserved.
5. **Audit phase:** inspect rendered desktop/mobile PNGs for every family, all 24 variants in the gallery, both supported themes, and relevant actual page compositions. Review 320/390/768/1024/1280/1440px widths, clipping, contrast, focus visibility, click targets, SVG ID collisions and CSS theme behavior. Check no-JavaScript/static output and production gallery exclusion. Save review images outside deployed public assets in an ignored directory. Run typecheck/lint, unit/content/contrast checks, production/static builds and artifact tests appropriate to changed surfaces. Do not claim these later checks occurred during planning.

For final acceptance, all 24 IDs must represent recognisably different compositions; switching IDs must preserve layout/content; decorative geometry must remain clear of readable regions; mobile adaptations must be intentional; dark artwork must use the existing theme roles. Record results and limitations before committing the implementation. No push, merge or deployment without the owner's separate instruction.

## Planning-phase verification (historical)

Checked catalog count/uniqueness and family distribution, links to existing repository sources, whitespace, and the final Git diff. Only this document is added; public pages and official assets remain unchanged. Runtime tests, build and rendered-PNG review are not applicable to this documentation-only phase and were not run. No pattern assets, gallery or integration have been generated yet.

## Asset-phase verification — 2026-11-03

Verified on macOS with Node 24.22.2 and the installed Playwright Chromium:

- `npm run patterns:review`: 96 nonblank rendered specimens passed (24 variants × desktop/mobile × light/dark). Every SVG path parsed; paint/clip references resolved; IDs stayed unique across repeated instances. All 24 images were distinct within each layout/theme. Automatic layout was checked on a repeated-fold specimen at seven widths; all variants received explicit desktop/mobile checks. System theme, forced colors, intensity bounds, no-JavaScript visibility and horizontal overflow checks passed. No browser runtime errors were observed.
- Human review: inspected all six contact sheets covering all 96 specimens, plus native-size structural-fold-01 desktop/light, capital-contour-01 desktop/dark, capital-arc-01 desktop/light, sc-cut-01 mobile/light, investment-horizon-02 desktop/light and guided-path-02 mobile/dark. The artwork retains quiet negative space, distinct family geometry and restrained token colors. Contact sheets show dividers at their native shallow ratio within taller review cells; that surrounding space is not part of the artwork.
- `npm run check`: Nuxt/studio typechecks, ESLint, all 17 unit/content tests and all 34 semantic contrast checks passed. Contrast checks cover existing token roles; they do not certify future text-over-pattern combinations.
- `npm run build`: production Node/Nitro build passed. `npm run test:server` passed all 4 existing HTTP regressions; `npm run test:generated` passed all 10 artifact checks against this build. No new routes or endpoints were added.
- Existing public-page source, official brand assets, product derivatives and reference screenshots were compared byte-for-byte with HEAD; all unchanged. Logo hashes and a source comparison record are saved with the ignored review evidence. No dependency or lockfile changes.

Evidence lives in ignored `exports/brand-patterns/`; regenerate it on another checkout. Patterns are reusable inline SVG assets, not a delivered interactive gallery or live website redesign. Full website content/cropping review, browser/device coverage beyond this Chromium run, future gallery isolation and final integration remain later phases. The social browser suite was not rerun because social components/configuration were unchanged. No push, merge or deployment occurred.

## Development-only gallery

Start the existing website with the Node 24 version required by `package.json`:

```sh
npm ci
npx playwright install chromium
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:3000/brand-patterns`. If the website is already running at `http://localhost:3000`, use that origin instead; no second server is required. No design-review flag is needed.

The gallery provides:

- All 24 named pattern cards with family and intended hero/section/divider use, plus a family filter. Cards are native buttons with pressed state; the select controls provide an alternative keyboard path.
- Actual homepage content through `app/pages/index.vue`, imported into `/brand-patterns-preview`, with the existing default layout, ScHeader/ScBrand, real text/links and ScScreenshot. No headline or screenshot is baked into artwork or copied into another component. Both the calendar phone and approved report excerpt remain the actual homepage derivatives.
- Desktop 1440px, tablet 768px, mobile 390px and small-mobile 320px iframe viewports. Frames retain those actual CSS-pixel widths, scaled to fit the available gallery column; full-size links open independent previews. Preview heights follow the real hero's layout.
- Light/dark themes isolated inside the frames; the gallery controls stay light. Both comparison panels share viewport/theme/adjustments so variants can be judged under equal conditions.
- Scale 0.75–1.25, horizontal offset −10–10%, vertical offset −15–15%, and intensity 0–1. Offsets are relative to the artwork's box, scaling is anchored bottom-right and the layer clips to its host. Reset preserves the selected pattern. Automatic/desktop/mobile artwork can be selected explicitly; automatic follows the renderer's container-width rule.
- A second independently selected variant shown beside the primary one on wide screens and stacked on narrow gallery screens. It uses the same settings except its pattern ID.
- Exact TypeScript configuration, a Copy button, and a selectable read-only textarea. If clipboard permission is unavailable, the UI focuses/selects the code and explains how to copy with the keyboard. No edits are persisted or applied to the public website.

The preview imports the integrated homepage and supplies its optional typed pattern prop. There is no longer a preview-only Teleport or CSS override: gallery and public page use the same rendering/layout path. The preview disables non-hero accents while auditioning the selected hero. Real screenshot colors, aspect ratios, captions, buttons and brand identity remain intact. All patterns may be auditioned here, but section/divider metadata remains the placement recommendation; the public configuration validates intended placements.

The actual navigation and CTA links remain interactive inside each frame. Changing a setting restores the preview if a header link has navigated that frame to another page. Full-size links capture the current pattern/layout/scale/position/intensity/theme as validated URL parameters; subsequent gallery edits do not alter an already-open independent tab.

### Reuse the copied configuration

The reusable layer and gallery share `shared/brand-pattern-config.ts`, including `BrandPatternConfig`, `defaultBrandPatternConfig`, `brandPatternLimits`, the bounded normalizer and preview URL serializer. A copied object can be passed directly to `ScBrandPatternLayer`:

```vue
<script setup lang="ts">
import ScBrandPatternLayer from '~/components/brand/ScBrandPatternLayer.vue'
import type { BrandPatternConfig } from '~~/shared/brand-pattern-config'

const heroPattern = {
  pattern: 'structural-fold-01',
  layout: 'auto',
  scale: 1,
  x: 0,
  y: 0,
  intensity: 1,
} satisfies BrandPatternConfig
</script>

<template>
  <section class="pattern-host">
    <ScBrandPatternLayer :config="heroPattern" />
    <!-- Existing semantic headline, buttons and approved screenshot components. -->
  </section>
</template>

<style scoped>
.pattern-host { position: relative; isolation: isolate; }
</style>
```

The layer is absolute and non-interactive with z-index −1 inside the isolated host, keeping real content above it. It does not select a public page or place itself in a hero automatically. The example explains the contract; no production page was edited in this phase. Theme and review viewport are intentionally absent from the copied object: the layer inherits its host's theme and width.

### Development and production boundary

`nuxt.config.ts` removes every `/brand-patterns*` page when Nuxt is not in dev mode, including when `NUXT_DESIGN_REVIEW_ENABLED=true`. Neither gallery nor preview enters the public registry or sitemap. A dedicated route is used because the older design-system review flag can opt its page into production builds.

Only in dev mode, `/brand-patterns-preview` receives `frame-ancestors 'self'` and `X-Frame-Options: SAMEORIGIN`, allowing the gallery's same-origin frames. All other pages retain the existing frame denial. Production never registers that header exception; both removed routes return genuine 404s with frame denial. There is no editing/export API or server-side capture endpoint for this gallery.

Frame updates use browser postMessage, validating both exact origin and expected window source. Configuration accepts registry IDs only and clamps numerical controls. Frames acknowledge the full configuration and theme after fonts/images/layout are ready, preventing startup timing from leaving the comparison at the wrong variant. These messages do not write files or call a financial backend.

### Check the gallery

With dev running, use another terminal:

```sh
PATTERN_GALLERY_ORIGIN=http://127.0.0.1:3000 npm run test:pattern-gallery
# For an existing localhost server:
PATTERN_GALLERY_ORIGIN=http://localhost:3000 npm run test:pattern-gallery
```

The suite checks config/URL bounds, all 24 selections, family filtering and keyboard selection, actual homepage headline/lead equality, real logo/screenshot sources, comparison, bounded sliders/reset, exact clipboard content and fallback selection, viewport/theme changes, rejected foreign-origin messages, and narrow-screen overflow. It saves 12 native homepage preview PNGs (one variant per family at desktop/light and mobile/dark), a comparison PNG and report under ignored `exports/brand-patterns/gallery/`. These are browser previews; this gallery does not add a PNG export button or production export service.

### Gallery-phase verification — 2026-11-03 (before public integration)

- Used the already-running local Nuxt server at localhost:3000 for browser checks. To avoid changing its generated files during type/build work, copied the current tracked/untracked source into a temporary verification snapshot, reusing installed dependencies with a separate generated cache. Verified that snapshot's gallery/runtime/test files were byte-identical to the working tree.
- `PATTERN_GALLERY_ORIGIN=http://localhost:3000 npm run test:pattern-gallery`: all 3 tests passed. They exercise all 24 pattern selections, six family filters, keyboard selection, copied config and fallback, frame state synchronization, comparison, real source content/assets, rejected foreign-origin messages, all four viewport choices and narrow gallery layout. No page runtime errors were observed in the passing run.
- `npm run check`: Nuxt/studio typechecks, ESLint, 17 unit/content tests and 34 contrast checks passed in the snapshot. Existing token contrast checks do not certify arbitrary artwork positioning; this gallery is for that review.
- `NUXT_DESIGN_REVIEW_ENABLED=true npm run build`, followed by the same flag with `npm run test:server` and `npm run test:generated`: passed (4 HTTP tests, 10 artifact tests). Both gallery and preview returned 404 with X-Frame-Options DENY and frame-ancestors none. No gallery controls, preview message code or pattern preset IDs appeared in the scanned production artifacts.
- Default `npm run generate` and `npm run test:generated`: passed (10 artifact checks), with gallery/preview routes and editing code excluded.
- Human visual review: inspected the side-by-side comparison, Structural Fold at desktop/light, tablet/light and mobile/dark; Capital Arc, SC Cut and Guided Path at desktop/light; Capital Contour and Investment Horizon at mobile/dark. Checked readable real text, official identity, authentic screenshot fitting, generous margins and decoration below/behind content. Automated native captures cover one variant per family at desktop/light and mobile/dark; this phase does not claim a new human review of every pattern/theme combination or a full screen-reader audit.
- All 29 existing page, public-brand/product and reference screenshot files were byte-compared against HEAD and are unchanged. Previous uncommitted pattern-asset work was preserved. No dependency/lockfile changes, public editing API, push, merge or deployment.

The dev-only framing exception and complete-state handshake resolve the two issues found during initial browser verification: denied iframe embedding and a comparison frame initially retaining its default variant. Final passing evidence is in `exports/brand-patterns/gallery/report.json`, `verification.json`, the native PNGs and `comparison-desktop.png`. The extra tablet capture is `structural-fold-01-768-light.png`.

## Change website artwork manually

**Edit `shared/website-brand-patterns.ts`.** This is the only website artwork-selection file. No layout markup, visitor settings, storage or runtime API needs to change. The gallery initializes from the current hero configuration; its Reset button still returns the selected artwork to registry defaults.

The shipped choices are:

| Configuration field | Default | Purpose |
| --- | --- | --- |
| `hero.pattern` | `structural-fold-01` | Crossing Planes, selected against Capital Arc in the gallery |
| `hero.intensity` | `0.75` | Subdued folds behind the real product screenshot |
| `hero.layout` | `auto` via defaults | Desktop artwork in the two-column hero; mobile artwork in the stacked product stage |
| `hero.scale`, `hero.x`, `hero.y` | `1`, `0`, `0` via defaults | Original geometry and position |
| `sections.independence` | `null` | Optional compact accent in the independence section |
| `sections.product` | `null` | Optional compact accent in the real-app section |
| `dividers.workflow.pattern` | `capital-arc-04` | Tangent Interval as one small workflow-edge ornament |
| `dividers.workflow.intensity` | `0.65` | Quiet supporting detail, not another large background |

For an arc-led hero, change just the ID, retaining the other values:

```ts
hero: {
  ...defaultBrandPatternConfig,
  pattern: 'capital-arc-01',
  intensity: .75,
},
```

Hero-compatible IDs currently are `capital-arc-01`, `capital-arc-02`, `structural-fold-01`, `structural-fold-02`, `sc-cut-01`, `investment-horizon-01`, `guided-path-01` and `capital-contour-01`. Family variants ending `-04` are dividers. Other variants are primarily section accents; use each registry entry's placements, not its name alone. `defineWebsiteBrandPatterns` rejects a mismatched placement early; TypeScript checks stable IDs and the configuration shape.

To enable a compact section accent, replace the relevant `null` with a complete configuration (or the matching object copied from the gallery):

```ts
sections: {
  independence: null,
  product: {
    ...defaultBrandPatternConfig,
    pattern: 'sc-cut-03',
    intensity: .35,
  },
},
```

For the independence slot, an example is `capital-contour-02` at `.3` intensity. Section accents are clipped to a small lower-right corner (up to 360×180px), and are off by default to preserve negative space. Review each enabled accent against its real section copy in both themes.

To change the divider, replace `dividers.workflow.pattern` with another divider ID, for example `sc-cut-04`. To remove it, set `dividers.workflow: null`. All four slots are independent and accept `null`. Setting `hero: null` disables hero artwork and restores the earlier muted screenshot stage and faint official-symbol watermark; it does not disable other slots. A changed source configuration updates in dev and takes effect in production only after the usual reviewed build/deployment workflow.

### Integration behavior

`app/pages/index.vue` consumes this config. Its optional `patterns` prop exists for the dev preview; public routing does not derive artwork from query parameters, visitors, timers or random values. The homepage text, semantic sections, links, metadata helper and approved screenshot sources/dimensions are preserved.

The hero has two static decorative hosts with identical settings and unique SVG IDs. CSS shows one: the whole isolated hero at ≥1024px, or the isolated product stage below that breakpoint. For hero `layout: auto`, each host explicitly selects the artwork matching the existing page breakpoint, avoiding container-width ambiguity at 1024px. Explicit desktop/mobile overrides are still honored. Generic ScBrandPattern/ScBrandPatternLayer auto layout elsewhere continues to use container width.

With a hero enabled, the old watermark is omitted and the product stage is transparent so folds appear behind authentic imagery. Decorative hosts are absolute, clipped, inert, aria-hidden and pointer-events none; negative stacking stays inside isolated parents. No content is shifted or covered by an interactive layer. The optional section accents and small workflow divider are absolute too, preserving existing section spacing. Official logos and original screenshots are unchanged.

Patterns inherit the existing light/dark/system token behavior. No new animation is used. Existing reduced-motion behavior remains intact, and forced-color mode hides the vector decoration. The page remains server-rendered and works without client JavaScript, including responsive artwork selection.

### Run and verify integration

```sh
npm run dev -- --host 127.0.0.1
# Another terminal, with the same origin as the running dev server:
PATTERN_GALLERY_ORIGIN=http://127.0.0.1:3000 npm run test:website-patterns
PATTERN_GALLERY_ORIGIN=http://127.0.0.1:3000 npm run test:pattern-gallery
```

Open `/` to inspect the integrated page and `/brand-patterns` to audition alternatives. Use `http://localhost:3000` instead in those commands if an existing server is bound there.

`test:website-patterns` captures the actual page at 320/390/768/1023/1024/1280/1440px in both themes, checks active artwork/layout, non-interception of real CTA clicks, optional-slot structure, SVG IDs, no overflow, system theme, reduced motion, forced colors and no-JavaScript rendering. Its local pre-integration `baseline.json`, if present, additionally compares page text, links, screenshot attributes and SEO. Historical geometry differences are constrained to the audit’s caption-clearance fix: a small stacked-stage expansion and the corresponding downstream shift; other coordinates remain unchanged. That baseline is ignored evidence, not a mandatory fresh-checkout fixture. Results and screenshots go to `exports/brand-patterns/integration/`. The test adapts to supported config changes rather than requiring the shipped pattern IDs.

### Integration verification — 2026-11-03

- Compared structural-fold-01 and capital-arc-01 side by side in the live gallery at .75 intensity before choosing the fold. The selection capture is `exports/brand-patterns/integration/gallery-selection.png`.
- `test:website-patterns`: both tests passed, covering placement validation/nullable optional slots and 14 actual public-page viewport/theme cases. At 12 saved pre-change baseline cases, normalized main copy, all link destinations/text, screenshot attributes, SEO metadata and heading/action/stage geometry matched (geometry tolerance <0.1 CSS px). The 1023px cases additionally check the immediate pre-split layout. Public query parameters do not select artwork. Real CTA clicks, existing system theme, no overflow, non-interactive layers, SVG ID uniqueness, reduced motion, forced colors and no-JavaScript visibility passed.
- Human inspection of actual homepage PNGs: 320/light, 390/dark, 768/dark, 1023/light, 1024/light, 1280/dark and 1440/light, plus the workflow divider at desktop/light and mobile/dark. Headlines/actions remain clear and the new artwork stays subordinate to the real imagery. This is not a full assistive-technology or cross-browser certification, nor visual approval of every future optional accent/configuration.
- `test:pattern-gallery`: all 3 tests passed after moving previews onto the integrated rendering path and initializing from website config. Comparison checks are scoped to the appropriate frame so future matching pattern IDs are supported. All 24 selections, copy/fallback, widths/themes and frame guards remain covered.
- `patterns:review`: all 96 SVG specimens passed again after the import adjustment. No geometry or official logo edits were needed.
- `npm run check`: Nuxt/studio typechecks, ESLint, 17 unit/content tests and 34 semantic contrast checks passed. Final workspace lint passed after the last test-only selector adjustment.
- `NUXT_DESIGN_REVIEW_ENABLED=true npm run build`: passed. With that same flag, `test:server` passed all 4 tests and `test:generated` passed all 11 artifact checks. Gallery/preview routes remain 404 with frame denial. Rendering modules and preset IDs are now intentionally public; editor controls/message code remain excluded.
- Default `npm run generate` and `npm run test:generated`: passed (11 checks), including server-rendered configured artwork and unique IDs. Production shared-import resolution was corrected by using the repository's Nuxt root alias convention in Vue files; the isolated review harness resolves the same alias. The final build and runtime snapshot match the working source.
- Verification builds ran in a temporary source snapshot with separate generated cache, preserving the user's existing interactive dev server. Official assets, screenshots, other existing pages, navigation/brand/screenshot components and SEO sources were byte-compared with HEAD and are unchanged. Only the homepage receives decorative integration; marketing data/copy and existing functionality are preserved. No dependency/lockfile changes, rotation, public editor, new API, push, merge or deployment.

Passing reports and renders are ignored under `exports/brand-patterns/integration/`. The pre-change baseline is local evidence and is not committed; fresh runs still perform the invariant checks and record whether a baseline was available. Review new pattern choices in both themes and relevant widths after editing configuration. Optional section choices are validated and implemented, but remain disabled in the shipped selection.

## Final audit — 2026-11-03

This section is the final verification record. Earlier phase records above are historical snapshots. The complete 24-ID catalog and recommended hero/section/divider/mobile uses remain in [Composition catalog](#composition-catalog--six-families--four-variants). All six families have four implemented, deterministic variants.

### Current status and examples

| Family | Implemented IDs | Rendering/switch audit | Desktop example | Mobile example |
| --- | --- | --- | --- | --- |
| Capital Arc | `capital-arc-01` through `capital-arc-04` | 4/4 verified | [PNG](../exports/brand-patterns/final-audit/capital-arc-01-1440-light.png) | [PNG](../exports/brand-patterns/final-audit/capital-arc-01-390-dark.png) |
| Structural Fold | `structural-fold-01` through `structural-fold-04` | 4/4 verified | [PNG](../exports/brand-patterns/final-audit/structural-fold-01-1440-light.png) | [PNG](../exports/brand-patterns/final-audit/structural-fold-01-390-dark.png) |
| SC Cut | `sc-cut-01` through `sc-cut-04` | 4/4 verified | [PNG](../exports/brand-patterns/final-audit/sc-cut-01-1440-light.png) | [PNG](../exports/brand-patterns/final-audit/sc-cut-01-390-dark.png) |
| Investment Horizon | `investment-horizon-01` through `investment-horizon-04` | 4/4 verified | [PNG](../exports/brand-patterns/final-audit/investment-horizon-01-1440-light.png) | [PNG](../exports/brand-patterns/final-audit/investment-horizon-01-390-dark.png) |
| Guided Path | `guided-path-01` through `guided-path-04` | 4/4 verified | [PNG](../exports/brand-patterns/final-audit/guided-path-01-1440-light.png) | [PNG](../exports/brand-patterns/final-audit/guided-path-01-390-dark.png) |
| Capital Contour | `capital-contour-01` through `capital-contour-04` | 4/4 verified | [PNG](../exports/brand-patterns/final-audit/capital-contour-01-1440-light.png) | [PNG](../exports/brand-patterns/final-audit/capital-contour-01-390-dark.png) |

Example PNG links refer to local ignored evidence. Run the commands below to regenerate them on another checkout. Representative `-01` variants are pictured behind the real homepage for consistent comparison; the catalog's recommended placement still governs section/divider variants.

Selected website default: `hero.pattern = 'structural-fold-01'`, `hero.intensity = .75`; small `dividers.workflow.pattern = 'capital-arc-04'`, intensity `.65`; `sections.product` and `sections.independence` are `null`. Change those values in **`shared/website-brand-patterns.ts`**. The [manual switching examples](#change-website-artwork-manually) show an arc hero, optional accent and disabled slots. No page-layout edits, visitor settings, timers, rotation or public administration are involved.

### Repeatable workflow

Use Node 24 satisfying `package.json` (`^24.15.0`). From the repository root:

```sh
npm ci
npx playwright install chromium
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:3000/brand-patterns` for the gallery and `http://127.0.0.1:3000/` for the public page. Leave dev running and use another terminal:

```sh
npm run patterns:review
PATTERN_GALLERY_ORIGIN=http://127.0.0.1:3000 npm run patterns:audit
PATTERN_GALLERY_ORIGIN=http://127.0.0.1:3000 npm run test:pattern-gallery
PATTERN_GALLERY_ORIGIN=http://127.0.0.1:3000 npm run test:website-patterns
SOCIAL_STUDIO_ORIGIN=http://127.0.0.1:3000 npm run test:social
```

If an existing server is bound to localhost, replace those origins with `http://localhost:3000`. No review flag is needed for the gallery. `patterns:review` also works without a dev server. It verifies 96 isolated vector specimens and saves native markup/complexity metrics. `patterns:audit` captures all 24 variants at 1440/light and 390/dark (48 actual page PNGs), compares content/links/screenshots/SEO/geometry between variants, requires distinct visible results, and samples the configured hero's rendered background contrast at both widths in both themes.

Build checks, in a separate verification session with dev stopped or in an isolated source snapshot:

```sh
npm run check
npm run build:vercel
NUXT_DESIGN_REVIEW_ENABLED=true npm run build
NUXT_DESIGN_REVIEW_ENABLED=true npm run test:server
NUXT_DESIGN_REVIEW_ENABLED=true npm run test:generated
npm run generate
npm run test:generated
```

These commands build/validate local artifacts only; none deploys. Gallery/preview routes and export/editing paths must remain absent with design review enabled as well as with production defaults.

### Visual findings and correction

Personally inspected all 12 fresh `-01` native page PNGs linked above: every family at desktop/light and mobile/dark. Reviewed headline/action readability, ivory/olive theme consistency, margins, photograph-free abstract geometry, real screenshot framing, official identity, cropping and non-interactive layering. The isolated 96-specimen run additionally covers every variant in both widths/themes; it does not substitute for the stated human inspection.

Found an existing report-callout overlap with the small calendar caption: measured intersecting text/callout regions at 390px and 1024px. Corrected the responsive CSS in `app/pages/index.vue`: stacked layouts now place the report card after the caption with a 1rem gap; two-column layouts right-align the caption within the existing phone width. Copy and image files are unchanged. The stacked stage grows by 72px compared with the older local baseline; this is an intentional readability fix, not a pattern-switch layout shift. New regression checks require zero caption/callout intersection at all seven tested widths in both themes. Before captures are retained in `final-audit/before-caption-*.png` as local evidence.

### Scope and remaining limitations

- The repeatable audit checks all 24 variants at desktop/light and mobile/dark against the same post-fix page geometry. Content, links, approved screenshot attributes and SEO stay identical between variants; geometry tolerance is <0.1 CSS px. The public default additionally receives seven-width light/dark checks, real CTA interaction, system-theme, reduced-motion, forced-color and no-JavaScript checks.
- Rendered contrast sampling covers five hero copy regions at 64 background points each, at 1440/390px in both themes. Minimum measured ratio was 6.04:1. This supplements the 34 existing semantic token checks. It is not a certification of every text pixel, hover state, future composition, optional section choice or arbitrary transform combination.
- SVG review measured a maximum of 9 artwork paths, 410 path-data characters and 4,526 bytes of native SVG markup per view, including definitions/scoping. Guard budgets are 12 artwork paths and 16 KiB markup per view. All paths parsed and paint/clip references resolved; IDs stayed unique across repeated instances. No embedded image, SVG text, foreignObject, animation, script or filter is authored into artwork. Website screenshots are ordinary approved image components outside the decorative SVGs.
- No dependencies or lockfile entries were added relative to the pre-pattern branch baseline. Vite/Vue compilation and Playwright are existing development tooling. Native system fonts can differ across operating systems; these renders were made on macOS with Chromium, not a full browser/device or assistive-technology matrix.
- Optional section accents are implemented and placement-validated but off by default; review each new selection in its actual section. Public configuration rejects inappropriate hero/section/divider IDs. Gallery hero audition is not approval to use every section/divider composition as a hero.
- Generated PNGs/HTML/reports remain gitignored under `exports/brand-patterns/`, outside public deployment assets. The four official logo masters, source screenshots and existing approved product derivatives are unchanged; repository hashes/source comparisons support that authenticity check. No fictional UI, photo, geography, market chart or financial claim was introduced.

### Final command results

Validated using Node 24.22.2 and the installed Playwright Chromium on macOS. To preserve the user's interactive dev server, type/build checks ran in a temporary source snapshot with separate generated cache; final runtime/test sources were byte-compared with the working tree.

| Check | Result |
| --- | --- |
| `patterns:review` | Passed: 96 nonblank, distinct SVG specimens; geometry/paint references and complexity budgets |
| `patterns:audit` | Passed: 48 distinct actual-page PNGs, switch-invariant content/layout, sampled default contrast |
| `test:pattern-gallery` | Passed: 3 tests |
| `test:website-patterns` | Passed: 2 tests, 14 public viewport/theme cases, caption clearance and constrained historical spacing changes |
| `test:social` | Passed: all 16 existing social browser tests |
| `npm run check` | Passed: Nuxt/studio typechecks, ESLint, 17 unit/content tests, 34 semantic contrast checks |
| `npm run build:vercel` | Passed: local Vercel production build and 11 artifact checks; no deployment |
| Node build with design review enabled | Passed: build, 4 HTTP tests and 11 artifact checks |
| Default static generation | Passed: generation and 11 artifact checks |

Production HTTP tests confirm 404 plus unchanged frame denial for `/brand-patterns`, `/brand-patterns-preview`, `/social-studio`, `/social-studio-render`, `/api/social-export`, `/api/pattern-export` and `/api/brand-patterns/export`. Artifact scans exclude the gallery controls/message code, editor routes, source maps and local export files. Existing contact behavior remains covered by its normal tests.

Repository verification confirms all 14 existing brand/product/reference image files byte-identical to pre-pattern HEAD, with hashes recorded in `exports/brand-patterns/final-audit/repository-report.json`. Dependencies, engines, lockfile and both Swift asset scripts are unchanged. All review PNGs are ignored and outside `public/`. Final evidence includes 96 isolated specimens, 48 switch captures, the public-default viewport captures, and reports. No unresolved pattern rendering defect remains in the reviewed cases; the scope limits above still apply. No push, merge, deployment or publication was performed.

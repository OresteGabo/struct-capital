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

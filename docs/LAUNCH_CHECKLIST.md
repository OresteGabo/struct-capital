# Launch checklist and deployment runbook

Prepared 30 October 2026. This runbook is reviewable preparation, not permission to publish, change DNS, buy services or send a real message. The current checked-in/default artifact remains a preview with indexing/contact off. See [Release review](RELEASE_REVIEW.md) for evidence and unresolved decisions.

## Human release gates

- [ ] Product owner approves the copy, SOURCE_CONFIRMED app capability limits, actual access/release/pricing positioning and information-only release if store links/contact remain absent. Do not invent dates, user counts, partnerships or availability.
- [ ] Owner/rights reviewer approves the official artwork and supplied screenshot crops, including issuer artwork. Originals/emails/dashboard balances remain non-public.
- [ ] Qualified reviewer approves the actual website privacy notice/terms, operator identity, responsible contacts, providers/locations/logging/retention and applicable obligations. Current Privacy/Terms are visibly unapproved drafts, not launch-ready legal assurances. App policies are separate.
- [ ] Editorial owner reviews the eight explainers and assigns ongoing source checks. BNR allocation/fee outlines remain labeled noindex drafts unless separately verified. Decide whether to keep those outlines browsable for launch; do not present them as completed guides.
- [ ] Security/release owner reviews the seven low npm findings from the unpatched deepmerge advisory chain; accept/document the residual risk or hold for a suitable upstream fix. Do not run `npm audit fix --force` or downgrade Nuxt blindly.
- [ ] Select and approve hosting/region/logging, domain/DNS access, rollback procedure and deployment type. No host/provider account or actual DNS target is assumed here.
- [ ] If live contact is required, approve/configure a dedicated receiving service and reviewed notice, verify actual acceptance/delivery, and put distributed/edge abuse and trusted-proxy controls in place. The current adapter alone cannot send messages.
- [ ] Perform real-device and assistive-technology review (e.g. VoiceOver/NVDA), target browser/network checks and post-host security/redirect checks. Automated local checks are not a WCAG/security certification.

## Choose the deployment type

**Recommended current mode: static.** All marketing/learning content works without Spring or a database. Publish only `.output/public`; leave contact off and its honest unavailable state visible. The framework emits 404/fallback files: configure genuine 404 status for unknown paths and never rewrite every unknown URL to the homepage with HTTP 200. Do not include repository source, docs, screenshots, scripts, `.env`, node_modules, `.nuxt`, or a stale `dist` directory in an upload.

**Hybrid/Node mode only when needed for approved contact.** Deploy the entire `.output` from a Node production build and run `node .output/server/index.mjs` under the selected host's process manager/health/TLS setup. The platform supplies `HOST`/`PORT`; TLS should terminate at the approved edge/proxy. Marketing pages remain prerendered; only the narrow contact handler is dynamic. Do not deploy pure generated output expecting `/api/contact` to execute. Never proxy the investor API through this site or provision database/admin/job credentials here.

## Install and quality gates

Use Node 24.15.0 (`.nvmrc`) and the committed package-lock. Build environments need dev dependencies for Nuxt/Tailwind/Markdown/lint/types. Installation hooks compile content and prepare Nuxt; do not copy a local node_modules folder between hosts.

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run check:contrast
npm audit
```

`npm audit` currently exits nonzero for the documented seven low findings; it is not a clean security gate. Review the exact report and current advisory again at release. All other commands must pass. A source review past its deadline fails content generation; perform the actual review or demote the article rather than advance dates cosmetically.

Build and check the server profile before generating static output (generation replaces `.output`):

```sh
NUXT_PUBLIC_SITE_INDEXABLE=true NUXT_PUBLIC_CONTACT_ENABLED=false NUXT_DESIGN_REVIEW_ENABLED=false npm run build
NUXT_PUBLIC_SITE_INDEXABLE=true NUXT_DESIGN_REVIEW_ENABLED=false npm run test:generated
npm run test:server
```

The HTTP tests use only temporary localhost ports/synthetic data. Positive delivery tests use mocked fetch; they do not send a provider message. Port binding may require local sandbox permission. Use identical indexing/review/contact flags between a build and generated-output tests; those tests validate the actual selected artifact.

## Static release artifact

Only after human review approves launch indexing:

```sh
NUXT_PUBLIC_SITE_INDEXABLE=true NUXT_PUBLIC_CONTACT_ENABLED=false NUXT_DESIGN_REVIEW_ENABLED=false npm run generate
NUXT_PUBLIC_SITE_INDEXABLE=true NUXT_DESIGN_REVIEW_ENABLED=false npm run test:generated
```

The deploy directory is `.output/public`, not the repository root. Review this exact artifact before any manual upload. For a preview/staging build, leave `NUXT_PUBLIC_SITE_INDEXABLE=false`; regenerated metadata/payloads are required whenever flags change. Protect private previews with host access controls; robots/noindex are crawler signals, not confidentiality protections.

`public/_headers` is copied into static output for compatible hosts such as Cloudflare Pages; configure equivalent rules on other hosts. Verify actual headers after deployment. The file does not configure DNS, redirects, TLS or runtime functions. Host HTML must revalidate (no-cache or equivalent max-age=0/must-revalidate); do not add a broad long-lived “cache everything” rule. Use long immutable cache only for fingerprinted `/_nuxt/` files, one-hour cache/revalidation for unversioned product/brand assets, and revalidation for payload/robots/sitemap. Compatible-host behavior is described in [Cloudflare headers](https://developers.cloudflare.com/pages/configuration/headers/) and [Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/); no provider has been selected or configured by this task.

## Contact-enabled Node artifact, if later approved

Supply an actual approved service implementing [Contact Integration](CONTACT_INTEGRATION.md); no such Spring endpoint currently exists. Preserve static pages if the service is unavailable.

```sh
NUXT_PUBLIC_SITE_INDEXABLE=true NUXT_PUBLIC_CONTACT_ENABLED=true NUXT_DESIGN_REVIEW_ENABLED=false npm run build
NUXT_PUBLIC_SITE_INDEXABLE=true NUXT_PUBLIC_CONTACT_ENABLED=true npm run test:generated
node .output/server/index.mjs
```

Set private values through the host's secret/configuration facility, never public build arguments, source files or browser runtime config. Required server settings: `NUXT_CONTACT_ENDPOINT`, `NUXT_CONTACT_TOKEN`, `NUXT_CONTACT_ORIGIN=https://structcapital.net`. The endpoint must be an approved dedicated HTTPS service, with a plain path and no URL userinfo/query/fragment/encoded segments or `/api/bonds` namespace. The token must be issued for inquiries, never an investor/admin/cron secret. Enable flag is a build-time public boolean; it is not proof the service works. Rebuild if toggling UI availability. Pure static builds always keep it false.

Configure upstream/server-to-server authentication and Origin rules deliberately; the website's server request is not an investor browser session. Verify the actual service's acknowledgment, processing, delivery, logging and retention with authorized synthetic content before public enablement. Do not send a real test inquiry to an external party without explicit authorization. On failure: preserve unsent text and show unconfirmed/unavailable feedback, never a fabricated success.

## DNS, HTTPS and canonical domain — manual actions

| Name | Required action | Value |
| --- | --- | --- |
| `structcapital.net` (apex) | Add the host-required A/AAAA or supported ALIAS/flattened target after binding the custom domain | Provider-assigned verified target; do not guess IPs |
| `www.structcapital.net` | Bind hostname/TLS and, if used, set the host-required CNAME | Provider-assigned target; permanent redirect to apex |
| Existing MX/TXT/email and mobile/API host records | Preserve unless separately reviewed | Do not repurpose them or infer a backend domain cutover |

Confirm ownership/access, existing records and certificates before changes. Complete host domain binding and TLS issuance; test both names. Redirect HTTP to HTTPS and www to `https://structcapital.net`, preserving paths/queries. Align trailing-slash and `/index.html` redirects with the canonical convention (root keeps `/`, other page paths do not). Avoid loops and multiple hops. Unknown paths must retain 404 status. Keep preview/provider hostnames noindex or redirected/access-controlled, as appropriate.

No DNS lookup, nameserver change, purchase or certificate provisioning was performed. Host-specific redirect/header configuration is still required. Enable HSTS only after HTTPS is verified for the intended scope; do not automatically include all subdomains. Consider a strict script nonce/hash CSP after testing Nuxt hydration, payloads, Article JSON-LD and the selected hosting model; the checked-in CSP is only a baseline for base/object/frame/form restrictions.

## Post-deployment smoke check — owner/release engineer

- [ ] Root and all 24 content/draft routes load directly and on client navigation; refresh/deep links work. `/design-system`, unknown slugs and unknown categories return 404. Confirm the review flag was false at build time.
- [ ] Canonicals/social images use the apex HTTPS origin. `robots.txt`/sitemap match approved launch mode and the sitemap excludes all four drafts. Drafts remain noindex; launch robots allows crawling their tags. [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explains why blocking those URLs would prevent reading the directive.
- [ ] Check actual security/cache headers for HTML, error pages, hashed JS/CSS, product image, payload, robots/sitemap and contact failures. Static `_headers` is not an assurance that every platform applies it. Contact must remain no-store; avoid permissive CORS or copied browser cookies/Authorization.
- [ ] Test 320/390px, tablet, laptop/desktop, keyboard focus/menu/FAQ/search/reset/TOC, theme, images and reduced-motion preference. Check browser consoles/network for errors and the social-image preview at real URLs.
- [ ] Contact stays honestly unavailable in static mode. If enabled in hybrid mode, test failures/rate/timeout behavior and approved actual service acceptance without claiming human receipt.
- [ ] Measure performance under realistic device/network conditions; local gzip sizes are not Core Web Vitals. Verify compression, image selection, layout stability and stale-asset behavior across an atomic redeploy.
- [ ] After approval and publication, an authorized owner can verify Search Console and submit the real sitemap. Recheck source links, review dates, content correctness and no private data in the deployed artifact.

## Rollback and ongoing review

Keep an immutable copy/version of the previous successful artifact plus the non-secret build flags and deployment configuration. For Node, keep private credentials in the host rather than the artifact. Roll back the site artifact and affected routing/cache configuration together; restore prior flags by rebuilding when needed. Keep old fingerprinted assets available during transition and verify old open tabs/client navigation. Disable inquiry UI through a rebuilt flag-off artifact if delivery needs withdrawing; do not overwrite a failure with a success state. Purge only the relevant stale CDN content after validating the corrected deployment.

Assign owners for dependency monitoring, host/logging review, broken links and educational source reviews. Current next article review date is **28 April 2027**, with earlier review on material changes. Scheduled CI/link checking is a proposed improvement, not an implemented monitor. No observability, analytics or paid service is silently enabled.

## Existing Vercel connection verified — 2026-10-30

The owner subsequently requested automatic deployment setup. The existing Git integration already deployed `main` to `structcapital.net` (Ready production commit `02a285b` at inspection). Node 24 was saved in the project settings; repository build guards and GitHub quality checks are now configured. Follow [CI/CD](CI_CD.md). No DNS changes or purchases were necessary. Earlier provider-neutral instructions remain reference material, not evidence of missing hosting. Search indexing/contact remain off and policy/content/asset reviews above remain outstanding.

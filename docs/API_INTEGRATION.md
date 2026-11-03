# Website ↔ backend integration

## Verified status — 2026-10-30

**No Spring marketing-data integration is enabled or implemented.** The inspected backend does not currently expose the required public-information or contact contracts. The website therefore makes no investor, account, market, health, database or Spring contact request. Static content remains independent of Spring availability. No registered-user count, format count, release badge or announcement is fabricated.

The website's existing same-origin `POST /api/contact` is an optional default-off transport boundary, not a Spring endpoint. Its configured destination must implement the explicit acceptance contract in [Contact Integration](CONTACT_INTEGRATION.md). No approved destination or credential is supplied. Metadata handlers for robots/sitemap and the Markdown compiler are local website functions, not integrations.

Earlier versions of this document listed illustrative `/api/public/...` routes and an example statistics payload. Inspection found no such controllers; those examples have been removed to avoid mistaking proposals for actual contracts. No guessed endpoint or schema is consumed in code.

## Which backend was inspected

Read-only working-tree audit of `/Users/muhirwagabooreste/AndroidStudioProjects/gabo-portfolio-api`, HEAD `7c9a16c`, Kotlin/Spring Boot, JVM 21. This is the actual financial backend identified by the mobile architecture documentation and transport. The mobile repo's `portfolio/server` module is a Ktor greeting sample and is not used. No backend/mobile files, data, secrets, services, security rules, migrations or configuration were changed. No backend build/database/live API call was made.

Website documentation's `api.structcapital.net` was a proposed domain, not verified live configuration. The inspected mobile `PortfolioApi.DEFAULT_ORIGIN` still points to its existing legacy web transport host. Neither is installed as a new website API base URL; domain cutover/deployment verification is separate. Property values and private credentials were not copied into the website.

## Actual contracts and security boundaries

Source paths below are under backend `src/main/kotlin/dev/orestegabo/portfolio/` unless noted.

| Source / route | Observed contract and policy | Marketing decision |
| --- | --- | --- |
| `SecurityConfig.kt` | `/api/bonds/**` authenticated except session/login/register and `/api/bonds/rse/**`; `/actuator/health` allowed; all other requests denied. Custom session filter, exact configured CORS origins, credentialed CORS, bounded mutations/Origin checks | Do not broaden security or expose investor routes |
| `AuthController.kt` `/api/bonds/auth/session` | `{authenticated, user}`; account publicInfo contains id/email/isOwner if session supplied | Publicly reachable is not public marketing data; never fetch or forward a visitor's account cookie |
| `AuthController.kt` `/api/bonds/auth/accounts` and registration controls | Owner-restricted account/invitation operations; account view combines financial information | Never derive counts from this response or reuse owner credentials |
| `PortfolioController.kt` purchases/equities/mobile-overview/documents/statement-items | Authenticated, account-scoped financial records and reconciliation | Never use for marketing data or PDF uploads |
| `PriceNotifications.kt`, `LifecycleNotifications.kt` `/api/bonds/notifications...` | Authenticated/account-scoped notifications, preferences, devices and receipts | Not a public announcement feed |
| `MarketController.kt` `/api/bonds/rse/quotes`, `/market`, `/equity-history` | Public market records, source/status metadata and validated query arguments; equity quotes/market paths can write market history | Not product statistics or approved marketing market-data rights; not integrated |
| `MarketController.kt` `/api/bonds/rse/daily`, `/snapshot` | Controller-enforced bearer secrets despite public family matcher; daily triggers processing/push work; snapshot forces market refresh | Operational jobs, never marketing endpoints; secrets stay outside website configuration |
| Actuator health | Operational status, not a product release or full service-availability contract | No public polling/status badge |

There is no controller for public registered-user aggregates, supported-format catalog, release manifest, capability manifest, public service announcements, or website contact in the inspected sources. A backend Gradle snapshot version is not mobile release availability. Auth/session and operational endpoints are not alternative sources for those missing contracts.

### Existing caching and limits

`MarketService.kt` uses a per-process `ConcurrentHashMap` with synchronized fixed-key loads: successful results live 900 seconds; failed results 60 seconds; selected quote failures can retain older data marked stale for up to 86,400 seconds. A public `refresh` query can bypass the normal fresh-result reuse. `MarketController` can record history after reads and the market load may fetch multiple external pages and perform history work. This is neither an inexpensive public product-statistics API nor evidence of a distributed cache/rate control.

The Spring security filter sets `Cache-Control: private, no-store, max-age=0` and `Vary: Origin, Cookie` on `/api/` responses. Do not override those headers by putting authenticated/session responses in a public website cache. `AuthService.rateLimit` is called for specific authentication/account actions, backed by its attempt records; a marketing-read limiter was not found in the public market controller. Do not interpret CORS, synchronized loading or a TTL as comprehensive anonymous rate limiting.

`application.properties` and `application-cloudrun.properties` identify private datasource/migration environment variables, session/security settings, configured allowed origins and private job secrets. None belongs in `NUXT_PUBLIC_*`. Cloud Run container/configuration files exist; live infrastructure, deployed version and production headers were not verified.

## Data selection

No candidate currently satisfies a verified contract, established publication scope and practical website need:

- **Registered users:** defer. No public aggregate; invite-oriented accounts include distinct configured/admin identities. Define what is counted, exclusion rules, disclosure approval and small-cohort privacy before implementing a count. Never fetch all accounts to count in Nuxt.
- **Supported formats:** first candidate to reconsider if a maintained catalog is genuinely needed. Parser/fixture evidence is spread through the separate application; no current public backend catalog or universal compatibility is established. A reviewed static catalog may be sufficient if changes are infrequent. Format support is not a partnership.
- **Release information/capabilities:** keep carefully qualified repository content. No authoritative release/store manifest exists in Spring. Separate source-confirmed functionality from public availability.
- **Announcements:** defer until an approved public editorial source exists; private investor notifications cannot be republished.
- **Market quotes/operational health:** outside the selected marketing need and not a substitute for the above.

There is consequently no new data-fetch composable, unused API-base config, proxy, loading widget, read cache or fabricated fallback statistic. Existing ScStatistic remains presentational and requires actual source/date/value inputs; it displays loading/unavailable/stale states honestly. No fetch is attached to it.

## Current website configuration and contact transport

| Variable | Location | Use |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_INDEXABLE` | Public boolean, default false | Reviewed launch discovery only |
| `NUXT_PUBLIC_CONTACT_ENABLED` | Public boolean, default false | Build-time contact UI availability; pure static builds keep false |
| `NUXT_CONTACT_ENDPOINT` | Private server, empty | Explicitly approved separate HTTPS contact service; no userinfo, query, fragment, encoded path or `/api/bonds` namespace |
| `NUXT_CONTACT_TOKEN` | Private server, empty | Credential specifically issued for that service; never an investor session/admin/job token |
| `NUXT_CONTACT_ORIGIN` | Server policy | Exact permitted website origin; defaults to intended site origin |

Contact uses one no-store POST, no cookies/referrer forwarding, a specific bearer header, redirects refused, 8-second fetch/response deadline, bounded JSON acknowledgment and no automatic retries. HTTP 2xx with `Content-Type: application/json` and boolean `accepted: true` is required. No receipt means unconfirmed acceptance; no fake successful delivery. All website contact responses remain `Cache-Control: no-store`, including configuration/validation/rate/transport failures; messages and acknowledgments are never a shared cache resource. Existing bounded/timed/honeypot/origin/MIME/schema/rate controls remain. Private URLs/credentials/upstream content do not appear in public errors. See [Contact Integration](CONTACT_INTEGRATION.md) for the full contract, deployment and limitations.

A valid URL is not proof of endpoint approval. The private operator must verify that the destination is a dedicated inquiry service, not another authenticated/customer service or internal metadata destination. The code blocks the inspected investor namespace and ambiguous paths, but is not a general network-egress policy or institutional security certification.

## Required backend work before a future read integration

This is a specification for a separate backend change, **not an implemented API**. No path or response DTO has been invented for frontend consumption.

1. Approve one useful informational dataset and its public labels. Prefer an approved format/release catalog over investor aggregates. Assign the source owner and review/update process; establish any rights and privacy restrictions.
2. Locate/reuse its actual service/source, or maintain a small curated configuration when appropriate. Avoid a database aggregate on every page view, portfolio queries, user lists and total investment values. If counts are ever approved, define exclusions/small-cohort policy and precompute/copy a minimal approved snapshot on a controlled schedule.
3. Implement a purpose-specific minimal typed DTO/controller in Spring, explicitly allow only that safe read method, and preserve authentication on all existing investor routes. Output only approved informational fields and a meaningful source/review/update timestamp—never user/customer identifiers, emails, internal URLs, errors or infrastructure metadata. Do not use a universal authenticated API proxy.
4. Establish finite freshness and expiry behavior, cache only validated public DTOs, coalesce concurrent loads, bound response size/time and apply per-instance plus appropriate edge/distributed rate controls. Do not expose a public refresh bypass. Specify whether expired data is omitted or clearly labeled; failed reads must not invent zeros or extend a stale value indefinitely.
5. Test unauthorized access to adjacent investor routes, exact DTO/schema, no private fields, cache expiry/concurrency/upstream failures, rate limiting and safe error semantics. Confirm actual deployed path, schema, security and cache headers through review before wiring Nuxt.
6. Only then implement a narrow Nuxt adapter with a private configured fixed target (or an approved public origin if direct reads are justified). Never forward browser cookies or caller-supplied URLs/paths/Authorization. Use a bounded fetch, explicit validation/projection, no credentials in public config and a source timestamp. Keep pages static and optional data isolated; pure static deployments need an explicitly designed build-time refresh or public read strategy, not a nonexistent Nitro runtime endpoint.

### Contact backend follow-up

No current Spring contact controller/service was found. The website's documented adapter cannot be enabled by pointing it at an account or registration endpoint. If Spring is selected to receive inquiries, separately approve a dedicated service/controller with the existing website input bounds/topic enum/permission semantics, appropriate authentication for the chosen server-to-server boundary, rate and body controls, an actual delivery/storage mechanism, reviewed retention/privacy and explicit acceptance semantics. A transport acknowledgment is not proof of human delivery. Review ingress/Origin policy for server-to-server calls; do not disable authenticated investor security/CORS to make contact work. No new endpoint is added outside this workspace by this task.

## Verification and limits

Run website lint/typecheck/unit tests, production build, `npm run test:server`, static generation and `npm run test:generated`. Contact tests use synthetic data and injected transports; HTTP tests reject before any real forwarding. They verify blocked investor destinations, no-store policies, no credential/content leakage, invalid/oversized acknowledgments, safe failures, rate/body/origin/schema checks and no retry/cached acceptance. No Spring deployment, live provider delivery, production database, aggregate query or public-metric cache was tested because no such integration is enabled. Future cache-contract tests require the real reviewed read contract.

### Verification record — 2026-10-30

Node 24.15.0: lint/typecheck and 16 unit/content tests passed. The production build and 3 real localhost contact-boundary tests passed, including fail-closed investor-namespace configuration, no-store error/rate responses and no permissive CORS. Nine generated-output checks passed across all 25 page routes, including private-data exclusions and default-off contact/indexing states. The final static generation and output checks also passed. These are website/mocked-boundary checks, not a live Spring/provider integration test. No external message or production/database request was sent and no backend/mobile file was modified. No public read cache exists to test; prospective read-cache requirements remain explicitly deferred until a real contract exists.

### Release-review follow-up

The contact reader now bounds stalled request/acknowledgment streams to eight seconds as well as bytes. Release tests verify baseline security headers, contact no-store behavior, real HTML 404s and public/private artifact boundaries. No new backend integration, metrics cache or credential was added. See RELEASE_REVIEW.md for final checks and LAUNCH_CHECKLIST.md for deployment-specific requirements; API/property names in this audit remain evidence, not authorization to expose investor data.

## Development-only artwork export — 2026-11-02

`POST /api/social-export` is a local authoring boundary registered only by Nuxt dev mode, not a Spring integration or production API. It accepts a bounded text-only post with an allowlisted visual and square/portrait format, requires loopback/same-origin access, and returns PNG bytes. No external API, credentials, uploaded financial records or retained data. Production builds omit the handler entirely. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Kigali Editorial — Phase 02 (2026-11-02)

The existing development-only social export accepts validated Kigali template fields and registry photo IDs, rejecting arbitrary paths/remote URLs. It marks intentional missing-photo proofs with X-Social-Proof: missing-photo and checks text/photo clearance. Broken selected images fail export. No public/backend integration is added. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Investor Education — Phase 03 (2026-11-02)

The existing development-only export request can include template=education and a validated education object (style, labels, source, education note, footer and brand text). It still returns PNG bytes and rejects overlapping or overflowing copy. This is local authoring only, with no financial API, public production endpoint or external data fetching at runtime. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Treasury Bond Explainer — Phase 04 (2026-11-02)

The existing development export accepts template=treasury-bond with bounded bond text and 3–6 events. It validates event order and layout, returns PNG bytes and never calculates or fetches bond rates/terms. The example marker is always present. Production export remains absent; no Spring, BNR or financial-data API is called. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Product Showcase — Phase 05 (2026-11-02)

The existing development-only PNG export accepts validated product-showcase fields (screenshot ID, pattern, brand, footer, note). Screenshot IDs resolve only to four existing approved local derivatives; no arbitrary file path, upload or external URL is supported. Capture fails on missing, enlarged or clipped screenshots. No production API or financial integration is added. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Brand Statement — Phase 06 (2026-11-02)

The existing development-only export accepts validated brand-statement configuration. Typography exports normally; missing photography exports are explicitly marked by the existing X-Social-Proof header. Image IDs must resolve through the local approved registry, not arbitrary paths or URLs. No production API or financial integration is added. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Three-Step Guide (2026-11-02)

The existing dev-only export accepts validated three-step-guide content with exactly three bounded number/label/description entries. It returns PNG bytes after row/layout checks. Marker geometry is local official SVG data, not an external request. No production API, backend feature or financial calculation is added. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

## Social studio final audit — 2026-11-03

No API contract changes. The new `social:audit` client calls the existing loopback development capture endpoint sequentially and records pixel/dimension evidence in ignored exports. Production HTTP and artifact checks continue to enforce absence of editing/render/export surfaces. See [Social media system](SOCIAL_MEDIA_SYSTEM.md).

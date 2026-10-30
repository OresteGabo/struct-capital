# Website contact integration

## Current status and boundary

The `/contact` page and `POST /api/contact` integration boundary are implemented. No approved public contact service URL/credentials were supplied or configured. A read-only audit of the actual sibling `gabo-portfolio-api` Spring controllers/security confirms no current website inquiry contract; see [API integration audit](API_INTEGRATION.md). No authenticated investor endpoint was reused or made public. No new database, email provider, financial backend, or account system was created.

Default delivery is **off**. The UI displays an unavailable notice and disabled fields/send control. The server returns 503 without accepting the body for delivery. It never returns a simulated success. No real messages or financial data were sent during development; positive acceptance tests use an injected mocked transport, and HTTP tests reject requests before forwarding.

## Configuration required for actual delivery

Pure static hosting has no contact handler. Keep `NUXT_PUBLIC_CONTACT_ENABLED=false` for `npm run generate`. To support real inquiries, deploy the Nuxt server from `npm run build` (or provide the equivalent reviewed same-origin server adapter) and configure:

| Variable | Visibility | Requirement |
|---|---|---|
| `NUXT_PUBLIC_CONTACT_ENABLED` | Public boolean only | Set `true` when building a contact-enabled server deployment |
| `NUXT_CONTACT_ENDPOINT` | Private server | Owner-approved dedicated HTTPS inquiry endpoint; not the inspected `/api/bonds` namespace or any customer API; no userinfo, query, fragment or percent-encoded path |
| `NUXT_CONTACT_TOKEN` | Private server secret | Bearer credential for that service, injected by the host; never committed or serialized to the client |
| `NUXT_CONTACT_ORIGIN` | Server policy | Exact browser origin allowed to submit; defaults to `https://structcapital.net` |

The page is prerendered, so changing its public enable flag requires rebuilding. Private URL/token are read by the server; the browser posts only to `/api/contact`. Directly enabling a static form without a same-origin server adapter is unsupported and cannot deliver messages. `node .output/server/index.mjs` runs the built server; its process environment must contain the private configuration. `.env.example` has safe empty/off defaults.

Before enabling delivery, confirm provider approval, authenticated endpoint behavior, receiving-side input handling/access/retention, operator identity, an accurate reviewed privacy notice, and host-level abuse controls. The draft legal pages are not approved policies or guarantees. This is an operational configuration requirement, not an automatic legal-compliance determination.

## Upstream contract

One authenticated request, without automatic retries:

```http
POST <private configured HTTPS endpoint>
Content-Type: application/json
Authorization: Bearer <private token>
```

```json
{
  "name": "Synthetic Example",
  "email": "example@example.test",
  "topic": "general",
  "message": "A synthetic inquiry, not an actual message.",
  "consent": true
}
```

Only these normalized inquiry fields are forwarded. The hidden spam field, form timestamp, network address/rate key, cookies, and arbitrary input fields are not forwarded. No attachments are accepted. The receiving service must safely process plain text; this adapter does not create HTML email.

A successful 2xx response must explicitly contain:

```json
{ "accepted": true }
```

A successful acknowledgment must have `Content-Type: application/json` (optional charset accepted). An empty 200, wrong MIME, malformed response, `accepted: false`, non-2xx result, redirect, timeout, or transport failure is **not** success. Upstream redirects are refused, requests time out after 8 seconds, and acknowledgment bodies are limited to 2KiB. Provider rejection/body/URLs/tokens are not exposed in errors. Request cache mode and Cache-Control are no-store, credentials are omitted and no referrer/browser cookies are forwarded. Each submission performs its own request; acceptance is not cached. Unused/rejected response streams are cancelled. Declared and streamed acknowledgment sizes are bounded. The UI confirms service acceptance only, never human reading or inbox delivery. An ambiguous timeout is labeled unconfirmed; the text remains, and retrying can produce duplicates. Durable idempotency/reconciliation would need an agreed provider contract, not an invented local queue.

## Validation and abuse protections

- Shared TypeScript field validation on client and server: name 2–100 characters, reply email up to 254, enumerated topic, message 20–4,000 characters, explicit permission-to-reply boolean. Unexpected fields/types, control characters, and a non-empty/missing honeypot are rejected.
- POST-only route; exact Origin policy; a conflicting Sec-Fetch-Site is rejected; only JSON content type is accepted. No permissive CORS is enabled.
- 16KiB request limit enforced both from Content-Length and while reading the stream. This accommodates bounded Unicode text and rejects dishonest/missing length headers as the stream grows.
- Form timing must be between 2 seconds and 2 hours. This and the hidden field are simple bot friction, not strong authentication or a universal anti-bot guarantee.
- Five attempts per socket network address per ten-minute window. Stored keys are salted hashes; counters are memory-only, expire on access/sweep, and are capped at 10,000 keys. Full capacity fails closed. No message body is stored/logged by the handler.
- The limiter is **per process**, resets on restart, and does not trust forwarded IP headers. Behind a proxy, multiple users may share a bucket. Configure trusted edge/proxy rate limits and request-size/time limits before public enablement; this in-memory limiter is not a distributed abuse-control service.
- Responses use `Cache-Control: no-store`; 429 includes `Retry-After: 600`. Credentials and destination configuration remain server-only.

Host/proxy/provider logging and data processing are outside this handler and require review. The absence of handler-level persistence is not a platform-wide deletion or privacy assurance.

## UX and failure semantics

The existing ScInput/ScSelect/ScCheckbox/ScButton/ScState components are reused. Labels, required states, hints and errors are linked with IDs/ARIA. Client validation focuses the first invalid field. Delivery failures preserve the text and focus feedback after re-enabling the controls. Pending state disables repeated submission. Only explicit acceptance clears inquiry fields. No localStorage, background submission, tracking, or fake success is added.

Permission to reply is not a marketing subscription or acceptance of draft legal terms. The form instructs visitors not to send investment PDFs, account details, balances, credentials, or identity documents. Native fallback uses POST, not a query-string submission; no-JavaScript text explains that interactive validation/feedback requires JavaScript.

## Verification commands

Use Node 24.15.0, then:

```sh
npm test
npm run lint
npm run typecheck
npm run check:contrast
npm run build
npm run test:server
npm run generate
npm run test:generated
```

`test:server` starts/stops temporary localhost servers against the production build; it needs local socket permission. Its configured test destination is a reserved `.test` URL, but all HTTP requests are rejected before transport. Provider success/failure cases are tested through an injected fake fetch, not a real external service. Browser QA separately exercised validation, unavailable delivery, retained inputs, and focus handling with synthetic text. No live contact was made.

## Inspected investor API exclusion

The actual Spring investor namespace is `/api/bonds`; URL validation rejects it (including case variations/normalized dot paths), all percent-encoded paths and query-based configuration before transport. This prevents accidental reuse of the inspected account/portfolio/market routes as an inquiry service. It does not prove an arbitrary other URL is approved or safe: private configuration still needs explicit endpoint/provider review and deployment-level egress policy. No Spring contact service was added, and private investor/admin/job credentials must never be used as contact credentials.

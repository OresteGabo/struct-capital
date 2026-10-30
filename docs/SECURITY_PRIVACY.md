# Security and Privacy — Website Scope

## Context
Struct Capital handles sensitive investment information in its wider ecosystem. The public marketing site must minimize the personal data it collects and must never expose mobile/backend investor records.

## Website threat model
| Risk | Control direction |
|---|---|
| Exposure of private API or investor data | Strict public endpoint separation; least privilege |
| Secrets in frontend bundle | No credentials in public runtime config or committed files |
| Contact-form spam and abuse | Input validation, rate limits, anti-spam controls |
| XSS/content injection | Escape content, avoid unsafe HTML, sanitize any user-generated content |
| Tracking without proper disclosure | Minimize analytics; review consent requirements |
| Sensitive data in logs | Redaction, retention limits, restricted access |
| Dependency compromise | Lockfile, automated checks, timely updates |
| Misleading security claims | Publish only independently verified controls |

## Rules
- Use HTTPS and secure hosting/deployment defaults.
- Keep API credentials, database passwords, JWT secrets, and signing keys outside Git and public bundles.
- Do not collect financial statements or investment PDFs via website contact forms.
- Do not display individual user holdings, financial amounts, or private account information.
- Keep public aggregate stats optional, privacy-reviewed, and resistant to inference from small cohorts.
- Publish a privacy notice only after its actual data flows and retention are reviewed.
- Provide appropriate channels for user privacy requests through the authorized product systems.

## Relationship to mobile/backend
The authenticated app and backend need their own threat model, authorization tests, financial data retention rules, encryption/storage review, incident response, and data export/deletion procedures. Do not copy a marketing-site security checklist and declare the whole platform secure.

## Operational checklist
Review forms, analytics, cookies, CDN logs, error monitoring, third-party fonts/assets, CSP/security headers, dependency updates, backups of website content, and incident escalation.

## Future institutional requirements
Broker data isolation, contractual access controls, consent evidence, audit trails, penetration testing, disaster recovery objectives, and vendor risk reviews are future work requiring dedicated design and, where relevant, professional advice.

See [Compliance](COMPLIANCE.md) and [API Integration](API_INTEGRATION.md).

## Website API boundary audit — 2026-10-30

The actual separate Spring API is source-inspected only. No database/live deployment/customer endpoint was queried. No backend/mobile configuration or source was changed. The website does not forward user cookies/credentials or expose account/portfolio DTOs; no approved public data source exists to integrate yet. Existing Spring auth/session/market/operational routes are not interchangeable with public marketing contracts. Raw upstream errors, internal IDs/URLs and secrets must not enter public runtime configuration or client responses.

Contact transport now blocks the inspected `/api/bonds` namespace and ambiguous/configuration-token URL paths, uses explicit no-store/no-cookie/no-referrer behavior, requires bounded JSON acknowledgment and cancels rejected bodies. These controls are tested with synthetic local/mocked traffic and do not certify arbitrary configured destinations, host/provider logging, distributed rate limiting or legal compliance. A dedicated approved service, private credential and server deployment remain necessary; delivery is off by default. See API_INTEGRATION.md and CONTACT_INTEGRATION.md.

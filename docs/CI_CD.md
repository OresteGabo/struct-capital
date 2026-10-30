# GitHub quality checks and Vercel deployments

## Verified setup — 30 October 2026

The existing Vercel project `struct-capital` in `orestegabos-projects` is connected to `OresteGabo/struct-capital`. Its production source is `main`, with `https://structcapital.net` attached. Before this change, commit `02a285b` was already Ready in Production and had a successful Vercel commit status. This is an existing deployment connection, not a newly provisioned host. No DNS change, paid feature, deploy hook or Vercel token was needed.

Pushes to `main` trigger production builds automatically. Other branches and pull requests use Vercel preview deployments, subject to Vercel account/author permissions. Successful builds become available after the platform finishes building and promoting them; deployment is automatic rather than instantaneous. Follow [Vercel's GitHub integration](https://vercel.com/docs/git/vercel-for-github).

## Repository configuration

- `.nvmrc` selects Node 24.15.0 for local/CI checks. `package.json` allows the compatible Node 24 line only. The Vercel project setting was saved as 24.x; Vercel manages minor/patch updates within that line. The prior deployment used 26.x because the previous engine range allowed it.
- `vercel.json` uses the native Nuxt framework preset, installs the lockfile with development build dependencies, and runs `npm run build:vercel`. No custom output-directory override is needed.
- `build:vercel` runs TypeScript, lint, unit/content tests and semantic contrast checks, builds the native Nitro Vercel preset, then validates the actual `.vercel/output/static` artifact. Failed build checks prevent that deployment from becoming the new production version.
- `STRUCT_PUBLIC_OUTPUT` is a test-only artifact location override. Node/static verification defaults to `.output/public`. It is not browser runtime configuration.
- `.vercel/` is ignored because generated output and local provider linkage do not belong in source control.

## GitHub Actions

`.github/workflows/quality.yml` runs on pushes to `main`, pull requests and manual dispatch. It uses read-only repository permissions, commit-pinned official checkout/setup-node actions, locked installation and a 15-minute limit. Obsolete runs for the same ref are cancelled. No deployment credentials or customer/backend secrets are required.

Checks include dependency advisories, typecheck/lint, 17 unit/content tests, 34 semantic contrast checks, an indexable Node build, ten generated-page checks, four local production HTTP tests, and a non-indexable static build with artifact checks. Contact delivery and design review stay disabled. Tests use local fixtures rather than a real receiving service.

The audit fails at moderate severity and above. The documented seven low findings in the unpatched Nuxt/Nitro/deepmerge chain remain visible and require maintenance/risk review; this is not a clean audit claim.

Vercel and GitHub Actions run independently. Vercel does not wait for the entire Actions job; critical website checks run inside its own build command. Broader HTTP/static/audit verification appears separately in GitHub. Branch protection with required checks or Vercel deployment checks can be considered separately if stricter promotion controls are wanted. No branch restrictions or paid deployment-check features were enabled.

## Configuration and operations

No environment variables are needed for the default deployment. Preserve `NUXT_PUBLIC_SITE_INDEXABLE=false`, `NUXT_PUBLIC_CONTACT_ENABLED=false`, and `NUXT_DESIGN_REVIEW_ENABLED=false` until their respective reviews are complete. Automatic deployment does not approve legal drafts, enable search indexing, approve asset rights or configure inquiry delivery. Private contact settings belong only in Vercel's server-side environment configuration; see [Contact integration](CONTACT_INTEGRATION.md).

After pushing, inspect the commit's Website quality run and Vercel status in GitHub, then verify the Vercel deployment is Ready, Production, and points to the expected commit/domain. Failed builds retain the previous successful production deployment. For a bad successful release, use Vercel's rollback controls for an eligible known-good deployment and revert/fix the source in Git so the next push preserves the correction. Do not repeatedly redeploy a broken commit. Recheck flags, headers, deep links, genuine 404s and robots after release.

For equivalent local validation under Node 24:

```sh
npm ci --include=dev
npm run build:vercel
NITRO_PRESET=node-server NUXT_PUBLIC_SITE_INDEXABLE=true npm run build
NUXT_PUBLIC_SITE_INDEXABLE=true npm run test:generated
npm run test:server
NITRO_PRESET=static NUXT_PUBLIC_SITE_INDEXABLE=false npm run generate
npm run test:generated
```

Scheduled editorial/link monitoring and stricter script CSP remain deferred. This workflow checks source review dates when it runs; it is not a scheduled monitor.

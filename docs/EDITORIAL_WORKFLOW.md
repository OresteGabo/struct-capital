# Learning content and factual review

Implemented 2026-10-30. This is an editorial workflow, not legal approval or a claim of professional financial review. Website indexing remains off by default; no publication is authorized by this implementation.

## Authoring and generation

Write one `content/learn/<slug>.md` per resource. Frontmatter uses YAML (the seed files use JSON syntax, also valid YAML). `content/learning.json` owns four categories and twelve supported topic labels. Use existing topics or intentionally update that taxonomy. No database, content API, external editor service, MDX, or executable Vue is involved.

Required fields: `slug` matching filename, `title`, `description`, `category`, nonempty `topics`, `status` (`draft` or `source-checked`), and ISO `updatedAt`. Source-checked content also requires `reviewedAt`, `reviewDue` and at least one source with `title`, HTTPS `url`, `scope`, and `checkedAt`. All source check dates must match the actual review date. Never advance dates just to make a build pass. Source scope must state jurisdictional limits and what the evidence actually supports. A source check is an evidence check, not an assertion that its author recently updated it.

Use H2/H3 headings; the page template owns H1. Ordinary Markdown paragraphs, lists, links, emphasis, code and tables work. Raw HTML is escaped, remote/local Markdown images are rejected pending an approved asset workflow, and unsafe link protocols are rejected or rendered inert. Body links must be HTTPS, local paths or heading anchors. Keep confidential documents and financial records out of both prose and frontmatter. JSON-LD escapes `<` to keep titles/text inert.

`npm run content:build` validates and compiles frontmatter, safe HTML, deterministic unique heading IDs, TOC, word count and reading time (body words / 200, rounded up, minimum one minute). npm hooks run it before dev, build, generate, typecheck and tests, and before Nuxt prepare during install. Generated `shared/learning.generated.json` and `app/generated/learn/*.json` are ignored outputs; commit Markdown, taxonomy and compiler instead. Run the content command before calling Nuxt directly. Restart `npm run dev` after editing Markdown/taxonomy: this intentionally simple pipeline does not add a custom filesystem watcher.

The shared metadata manifest drives index, categories, discovery, sitemap and prerender registration. Article HTML uses a lazy import per slug and is included in the rendered page payload; Markdown/YAML parsers are build-only dev dependencies and never browser dependencies. Search filters titles, descriptions and topics, not a remote index or every article body. Articles, categories, sources, TOC and links remain usable without JavaScript; interactive filters require it.

## Review before changing status

1. Check each factual sentence against a primary source (BNR, CMA, RSE, issuer, applicable authority). Use dated source material rather than snippets for current operational rules. Prefer direct permanent URLs; record effective dates for rules/schedules separately from the day you checked them.
2. Confirm the source is current and applicable to the exact security, document, transaction and jurisdiction. Foreign government investor-education sources may support general concepts only; do not transplant US or Singapore rules, protections, product terms or tax treatment to Rwanda.
3. Distinguish concept explanations, editorial checklists, actual product support and current market facts. Verify app claims against `FEATURES.md`/code. PDF support is format-specific and never evidence of a commercial partnership.
4. Do not publish unverified rates, minimum amounts, taxes, fees, deadlines, listed-company counts or return projections. Mark unresolved pages `draft` and write research questions instead of confident claims. Hypothetical calculations, if later approved, must be explicitly labeled and independently tested.
5. Ask the owner to assign an accountable human factual reviewer and retain review evidence in the change review. Legal/tax/regulated advice needs appropriate qualified review. No named or credentialed reviewer has been invented for these seed articles.
6. Check dates, source scope, accessibility, links, metadata, relevant feature CTA and related suggestions. Run the checks below. Publication remains a separate owner decision.

## Status, discovery and maintenance

Source-checked guides have a visible check date, update date, next review date, sources/scope and educational-risk notice. They receive Article JSON-LD (organization author/publisher, actual title, word count, modified date, canonical and citations); no invented initial publication date, expert credentials or review rating. Current seed dates are 30 October 2026, with next review 28 April 2027. The build rejects impossible/future update dates, inconsistent evidence dates, review intervals longer than 180 days and overdue source reviews. Sensitive operational content should use a shorter review interval.

Drafts are clearly labeled on index/cards/article, separated from completed guides, always noindex/nofollow, excluded from sitemap and omitted from Article JSON-LD. Their routes are intentionally browsable to make incomplete coverage honest. Do not put confidential/internal-only research in them. Source-checked related-article suggestions exclude drafts. Category pages are real static views; no thin autogenerated tag routes or internal-search result URLs are indexed. The site's existing launch opt-in controls all public indexing.

A static site cannot change itself when evidence becomes stale. Configure a scheduled CI content build/source audit before launch, especially before `reviewDue`, and monitor source changes/broken links. Until automation exists, the owner must calendar those checks. Recheck sooner when an authority changes guidance, a source moves, product support changes, or an error is reported. Correct an unsafe page immediately, demote it to draft and rebuild if evidence is unresolved. Update dates only after actual work. Retain meaningful corrections in version history and a visible correction note where needed. The compiler validates metadata, not truth, source availability or professional approval; tests never call live authorities.

## Initial content inventory and limits

Eight short explainers: Rwanda Treasury bonds; coupon payments; coupon rates versus yields; maturity; RSE/shares/dividends; contract notes; diversification; recordkeeping. All twelve requested topic labels are represented across these and two outlines. Content deliberately contains no current market quotes, rates, fee tables, tax percentages, legal retention periods or trade instructions. Editorial checklists are labeled as such, not mandatory Rwanda document fields.

Two outlines still need evidence:

- **BNR bond allocation documents:** an authentic public/reuse-approved anonymized allocation specimen, document-type verification and a field-by-field review. A publicly available issue prospectus is not an investor allocation. BNR's [March 2026 reopening prospectus](https://www.bnr.rw/documents/PROSPECTUS_OF_15-YEAR_BOND-REOPEN_ON_MARCH_16th_2026.pdf) was accessible during research; no terms/rates were copied or represented as current. This does not verify personal allocation fields or universal import support.
- **Brokerage commissions and fees:** a verified currently effective official schedule plus broker-specific terms, effective dates and qualified tax review. RSE source retrieval was unreliable during research; search snippets and older rulebooks were insufficient to publish fee values. No current fee schedule is asserted.

Primary general concept sources checked: [CMA Rwanda FAQ](https://www.cma.rw/faq), Investor.gov [bonds](https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds), [stocks](https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks), [current yield](https://www.investor.gov/introduction-investing/investing-basics/glossary/current-yield), [bond bulletin](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/what-are), [diversification](https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/diversify-your-investments), [statements](https://www.investor.gov/better-understanding-your-brokerage-account-statement), [recordkeeping](https://www.investor.gov/introduction-investing/investing-basics/glossary/broker-dealers-record-keeping-requirements), and [MoneySense bonds](https://www.moneysense.gov.sg/understanding-bonds/). Exact evidence/scope lives with each Markdown article. Current-yield definition is separately sourced from the broader YTM explanation.

## Checks and possible later work

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run check:contrast`, `npm run build`, `npm run test:server`, `npm run generate`, `npm run test:generated`. Generated-output tests check every route/link/anchor plus unique metadata, dated sources, Article data and draft exclusions. Preview and launch indexing modes must both be checked when discovery changes. Browser-check narrow/wide layouts, keyboard filters/reset/TOC, theme contrast and source wrapping.

Future-only ideas: reviewed illustrative coupon/yield tools, document-reading diagrams with fictional labels, quizzes, localization and scheduled link checks. These need separate scope approval, tested assumptions and clear separation from personalized recommendations, real quotes and application financial logic. See ROADMAP.md; no calculator or advisory backend is implemented here.

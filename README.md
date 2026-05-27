# Allure 3 multi-framework demo

**Live report:** [https://todti.github.io/allure-3-tests/](https://todti.github.io/allure-3-tests/)

Demonstration repository for [Allure Report 3](https://allurereport.org/docs/v3/) and official [allure-js](https://github.com/allure-framework/allure-js) adapters. Each framework runs the same shared Allure feature showcase (metadata, steps, attachments, async patterns, labels).

## Repository layout

```
packages/
  shared/          # @allure-tests/shared — common Allure runtime scenarios
  playwright/      # allure-playwright
  mocha/           # allure-mocha
  cucumber/        # allure-cucumberjs
  webdriverio/     # @wdio/allure-reporter
  vitest/          # allure-vitest
  jest/            # allure-jest
  jasmine/         # allure-jasmine
  cypress/         # allure-cypress
  codeceptjs/      # allure-codeceptjs
  newman/          # newman-reporter-allure
  bun/             # allure-mocha on Bun runtime
allurerc.mjs       # Allure 3 plugins + web summary (publish: true)
```

## Frameworks

| Framework | Package | Command | `framework` label |
|-----------|---------|---------|-------------------|
| Playwright | `@allure-tests/playwright` | `pnpm test:playwright` → `playwright test` | `playwright` |
| Mocha | `@allure-tests/mocha` | `pnpm test:mocha` → `mocha` | `mocha` |
| Cucumber | `@allure-tests/cucumber` | `pnpm test:cucumber` → `cucumber-js` | `cucumber` |
| WebdriverIO | `@allure-tests/webdriverio` | `pnpm test:webdriverio` → `wdio run` | `webdriverio` |
| Vitest | `@allure-tests/vitest` | `pnpm test:vitest` → `vitest run` | `vitest` |
| Jest | `@allure-tests/jest` | `pnpm test:jest` → `jest` | `jest` |
| Jasmine | `@allure-tests/jasmine` | `pnpm test:jasmine` → `jasmine` | `jasmine` |
| Cypress | `@allure-tests/cypress` | `pnpm test:cypress` → `cypress run` | `cypress` |
| CodeceptJS | `@allure-tests/codeceptjs` | `pnpm test:codeceptjs` → `codeceptjs run` | `codeceptjs` |
| Newman | `@allure-tests/newman` | `pnpm test:newman` → `newman run` (Postman collection) | `newman` |
| Bun | `@allure-tests/bun` | `pnpm test:bun` → `bun mocha` | `bun` |

## Allure features in shared suite

Each framework runs **14 independent domain tests** — each in its own spec/feature file with a unique business scenario:

| Domain | Spec file | What it covers |
|--------|-----------|----------------|
| Authentication | `auth/oauth-login` | OAuth token flow, masked credentials |
| Catalog | `catalog/product-search` | Filters, pagination, JSON results |
| Checkout | `checkout/tax-calculation` | 5-level nested steps, VAT |
| Payments | `payments/flaky-gateway` | Flaky gateway + retries |
| Inventory | `inventory/flaky-sync` | Random flaky stock sync |
| Notifications | `notifications/email-webhook` | Async webhook fan-out |
| Reporting | `reporting/export-attachments` | HTML/JSON/CSV/PNG bundle |
| Reliability | `reliability/cache-retry` | Fail once, pass after retry |
| Compliance | `compliance/audit-statuses` | passed / skipped / broken steps |
| Analytics | `analytics/known-regression` | Stable red test |
| API | `api/health-check` | HTTP smoke (+ browser where supported) |
| Users | `users/profile-params` | Masked & hidden parameters |
| Journeys | `journeys/password-reset` | Behavior-tree journey |
| Baseline | `baseline/metadata` | Adapter metadata parity |

Shared code lives in `packages/shared/src/domains/*` — **one module per domain**, not one mega-scenario.
Regenerate adapter specs: `python3 scripts/generate-domain-specs.py`

## Quality gates, global errors & global attachments

[`allurerc.mjs`](allurerc.mjs) defines:

- **Global quality gate** — `maxFailures: 20`, `minTestsCount: 100`, `successRate: 0.7`
- **Per-framework gates** (`gate-playwright`, `gate-mocha`, …) — filtered by `framework` label
- **`globalAttachments`** — globs `./allure-global/**` and `./packages/*/allure-global/**`

Each adapter wires [`runGlobalSetup` / `runGlobalTeardown`](packages/shared/src/globals.ts) through **native framework lifecycle hooks** (Playwright `globalSetup`, Jest `globalSetup`, Cucumber `BeforeAll`, Mocha root `before`, Cypress support hooks, etc.):

- `allure.globalAttachment` / `globalAttachmentPath` — JSON context + runner logs
- `allure.globalError` — demo global warnings (visible in **Global Errors** tab)
- Files on disk for report-level **Global Attachments** tab via `allurerc.mjs` globs

CI runs `allure quality-gate ./allure-results` after report generation.

## Allure features demonstrated
- HTTP smoke via `fetch` (no browser)
- Optional browser smoke (Playwright, WebdriverIO, CodeceptJS)
- Labels: `framework`, `os`, `language`, `runner`

## Environments (Allure 3)

[`allurerc.mjs`](allurerc.mjs) defines native Allure 3 **environments** ([docs](https://allurereport.org/docs/environments/)):

- **`linux` / `macos` / `windows`** — matchers on the `os` label (`Linux`, `macOS`, `Windows`)
- **`variables`** — global report metadata + per-environment overrides
- **`allowedEnvironments`** — validates environment IDs at report generation

Each test sets `os` via shared `applyFrameworkLabels()`. Newman uses Postman annotations (`// @allure.label.os:{{ALLURE_OS}}`) with `--env-var ALLURE_OS=…`.

CI wraps test runs with `allure run --environment=<os_slug>` so results are assigned even when label matching is skipped.

## Quick start

Requirements: Node.js 22+, pnpm 10+.

```bash
corepack enable
pnpm install

# One framework
pnpm test:playwright
pnpm --filter @allure-tests/playwright exec playwright install chromium

# All frameworks (continues on failures)
pnpm test

# Allure 3 report (Awesome plugins + summary index)
pnpm report:generate
pnpm report:open
```

Set a custom results directory (used in CI):

```bash
ALLURE_RESULTS_DIR=allure-results-playwright-linux pnpm test:playwright
```

Environment info is **not** written via legacy `environmentInfo` / `environment.properties` — use Allure 3 `environments` + `variables` in [`allurerc.mjs`](allurerc.mjs) instead.

## Allure 3 configuration

[`allurerc.mjs`](allurerc.mjs) defines:

- `awesomeAll` — combined report for all frameworks
- `awesome-<framework>` — per-framework filtered reports
- `dashboard` — dashboard plugin
- `environments` — Linux / macOS / Windows switcher on the combined report
- `publish: true` on Awesome plugins — generates the **summary** landing page (`@allurereport/web-summary`) linking to each published report

## Latest reports

- [Summary](https://todti.github.io/allure-3-tests/)
- [All tests](https://todti.github.io/allure-3-tests/awesomeAll/)
- [Dashboard](https://todti.github.io/allure-3-tests/dashboard/)

Per-framework reports: open **Summary** — it links to each generated view.

## CI and GitHub Pages

[`.github/workflows/allure-report.yml`](.github/workflows/allure-report.yml):

1. Matrix job runs each framework on **Linux, macOS, and Windows** via native CLI wrapped in `allure run --environment=<os>`
2. Each run tags tests with the `os` label (`Linux` / `macOS` / `Windows`)
3. Uploads `allure-results-<framework>-<host>` artifacts and merges them into `./allure-results`
4. Report job runs `allure generate` — combined report includes the **Environments** dropdown (Linux / macOS / Windows)
5. [allure-framework/allure-action](https://github.com/allure-framework/allure-action) comments on PRs
6. Publishes `./allure-report` to `gh-pages` (includes summary index)

Switch environments on the **All tests** (`awesomeAll`) report home page — no separate per-OS plugin views.

## Limitations

- **Bun**: no official Allure adapter for `bun test`; this package runs **Mocha + allure-mocha** on the Bun runtime (`bun ./node_modules/mocha/bin/mocha.js`).
- **Newman**: Postman collection with 14 HTTP requests; `pretest`/`posttest` run global Allure hooks, `newman run` executes the collection.
- **Cypress**: browser navigation uses Cypress commands after the shared API block; nested `allure.step` inside `cy` chains has runner-specific constraints.

## References

- [Allure Report 3 docs](https://allurereport.org/docs/v3/)
- [allure-js integrations](https://github.com/allure-framework/allure-js)
- [allure3-demo](https://github.com/allure-framework/allure3-demo)

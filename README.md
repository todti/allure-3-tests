# Allure 3 multi-framework demo

**Live report:** [https://todti.github.io/allure-3-tests/master/](https://todti.github.io/allure-3-tests/master/)

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

Per [Allure 3 globals docs](https://allurereport.org/docs/global-errors-and-attachments/) and [Quality Gate docs](https://allurereport.org/docs/quality-gate/):

1. **`allure run -- <test>`** — captures process-level **stdout/stderr**, exit codes, and global errors (on by default; disable with `--ignore-logs`). Applies `fastFail` quality gate rules while tests run; validates all rules when the run finishes.
2. **`globalAttachments` in [`allurerc.mjs`](allurerc.mjs)** — globs for custom files on disk (`./packages/*/allure-global/**`), picked up at report generation.
3. **Runtime API** — `allure.globalAttachment`, `allure.globalAttachmentPath`, `allure.globalError` in [`packages/shared/src/globals.ts`](packages/shared/src/globals.ts), wired through native framework hooks.

[`allurerc.mjs`](allurerc.mjs) defines **quality gates** with multiple rule sets:

| Rule set | Rules | Notes |
|----------|-------|-------|
| `critical-blocker-fast-fail` | `maxFailures: 0`, `fastFail: true` | Fails the run immediately on any `critical` / `blocker` test failure |
| `global-gate` | `maxFailures`, `minTestsCount`, `successRate`, `environmentsTested` | Merged report across all frameworks and OS environments |
| `gate-<framework>` | per-framework thresholds + `filter` | One gate per adapter label |
| `gate-os-<os>` | per-OS thresholds + `filter` | Linux / macOS / Windows slices |

Matrix jobs set `ALLURE_STAGE=matrix` to skip aggregate quality gates during per-framework dumps ([multistage builds](https://allurereport.org/docs/multistage-builds/)). Full gate rules apply on a complete local run:

```bash
pnpm exec allure run -- pnpm test
pnpm exec allure quality-gate "./**/allure-results"
```

### CI: failures in the report, not hidden

Matrix jobs use **`continue-on-error: true`** so a red test run in one framework/OS does not block the rest. Each job still:

1. Runs **`allure run --dump=…`** — records real results (failed, broken, retries, stdout/stderr, global errors) into a dump archive even when the wrapped test command exits non-zero.
2. Uploads the dump with **`if: always()`** when the archive exists.
3. The **report job** (`needs: test`, `if: always()`) merges every uploaded dump via `allure generate --dump="allure-dumps/*.zip"` and publishes to GitHub Pages.

So the dashboard is the source of truth: flaky retries appear in the **Flaky** filter, `known-regression` stays **broken**, critical payment timeouts show as **failed** until runner retries pass. A matrix slice that never produced a dump is simply missing from the merge (partial report), not silently faked as green.

Per-framework runners configure retries where needed (Mocha/Cypress/Playwright/Jest/Vitest `retry: 2`, Cucumber `retry: 2`, CodeceptJS `retry: 2`). Shared flaky helpers use the runner attempt counter + in-process cache so Allure sees intermediate failures before the passing retry.

Each adapter writes setup/teardown artifacts to `packages/<framework>/allure-global/` and calls the globals API when the reporter is active. File names include the framework prefix so merged **Global Attachments** stay distinguishable.

## Allure features demonstrated
- HTTP smoke via `fetch` (no browser)
- Optional browser smoke (Playwright, WebdriverIO, CodeceptJS)
- **Playwright trace** — [`playwright.config.ts`](packages/playwright/playwright.config.ts) enables `trace` (`retain-on-failure` locally, `on-first-retry` in CI); browser scenarios use the `{ page }` fixture and `allure-playwright` maps `trace.zip` to the in-report Playwright trace viewer
- Labels: `framework`, `os`, `language`, `runner`

## Environments (Allure 3)

[`allurerc.mjs`](allurerc.mjs) defines native Allure 3 **environments** ([docs](https://allurereport.org/docs/environments/)):

- **`linux` / `macos` / `windows`** — matchers on the `os` label (`Linux`, `macOS`, `Windows`)
- **`variables`** — global report metadata + per-environment overrides
- **`allowedEnvironments`** — validates environment IDs at report generation

Each test sets `os` via shared `applyFrameworkLabels()`. Newman uses Postman annotations (`// @allure.label.os:{{ALLURE_OS}}`) with `--env-var ALLURE_OS=…`.

CI wraps test runs with `allure run --environment=<os_slug>` so results are assigned even when label matching is skipped.

## Quick start

Requirements: Node.js 24+, pnpm 10+.

```bash
corepack enable
pnpm install

# One framework
pnpm test:playwright
pnpm --filter @allure-tests/playwright exec playwright install chromium

# All frameworks (continues on failures)
pnpm test

# Allure 3 report (requires prior test run; use allure run for globals)
pnpm exec allure run -- pnpm test:mocha
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
- `awesome-<framework>` — per-framework filtered reports with `options.reportName` per [plugin config](https://allurereport.org/docs/getting-started-configuration/) (see `pnpm.patchedDependencies` — upstream `plugin-awesome` ignored `options.reportName` until patched)
- `dashboard` — dashboard plugin
- `environments` — Linux / macOS / Windows switcher on the combined report
- `publish: true` on Awesome plugins — generates the **summary** landing page (`@allurereport/web-summary`) linking to each published report

## Latest reports

- [Summary](https://todti.github.io/allure-3-tests/master/)
- [All tests](https://todti.github.io/allure-3-tests/master/awesomeAll/)
- [Dashboard](https://todti.github.io/allure-3-tests/master/dashboard/)

Per-framework reports: open **Summary** — it links to each generated view.

## CI and GitHub Pages

[`.github/workflows/allure-report.yml`](.github/workflows/allure-report.yml):

1. Matrix job runs `allure run --dump=…` per framework × OS (globals + stdout/stderr included)
2. Report job merges dump archives with `allure generate --dump="allure-dumps/*.zip"`
3. [allure-framework/allure-action](https://github.com/allure-framework/allure-action) comments on PRs
4. Publishes `./allure-report` to GitHub Pages (includes summary index)

Switch environments on the **All tests** (`awesomeAll`) report home page — no separate per-OS plugin views.

## Limitations

- **Bun**: no official Allure adapter for `bun test`; this package runs **Mocha + allure-mocha** on the Bun runtime (`bun ./node_modules/mocha/bin/mocha.js`).
- **Newman**: Postman collection with 14 HTTP requests; `pretest`/`posttest` run global Allure hooks, `newman run` executes the collection.
- **Cypress**: browser navigation uses Cypress commands after the shared API block; nested `allure.step` inside `cy` chains has runner-specific constraints.

## References

- [Allure Report 3 docs](https://allurereport.org/docs/v3/)
- [allure-js integrations](https://github.com/allure-framework/allure-js)
- [allure3-demo](https://github.com/allure-framework/allure3-demo)

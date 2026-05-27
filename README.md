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
| Playwright | `@allure-tests/playwright` | `pnpm test:playwright` | `playwright` |
| Mocha | `@allure-tests/mocha` | `pnpm test:mocha` | `mocha` |
| Cucumber | `@allure-tests/cucumber` | `pnpm test:cucumber` | `cucumber` |
| WebdriverIO | `@allure-tests/webdriverio` | `pnpm test:webdriverio` | `webdriverio` |
| Vitest | `@allure-tests/vitest` | `pnpm test:vitest` | `vitest` |
| Jest | `@allure-tests/jest` | `pnpm test:jest` | `jest` |
| Jasmine | `@allure-tests/jasmine` | `pnpm test:jasmine` | `jasmine` |
| Cypress | `@allure-tests/cypress` | `pnpm test:cypress` | `cypress` |
| CodeceptJS | `@allure-tests/codeceptjs` | `pnpm test:codeceptjs` | `codeceptjs` |
| Newman | `@allure-tests/newman` | `pnpm test:newman` | `newman` |
| Bun | `@allure-tests/bun` | `pnpm test:bun` | `bun` |

## Allure features in shared suite

- Metadata: `description`, `owner`, `tags`, `severity`, `issue`, `tms`, `link`, `testCaseId`
- Behavior hierarchy: `epic`, `feature`, `story`
- Suite hierarchy: `parentSuite`, `suite`, `subSuite`
- Steps: nested `allure.step`, `logStep`, step parameters
- Attachments: text, JSON, hook attachments (same / unique names)
- Parameters: visible and `excluded`
- Async: `Promise.all`, microtasks, `setTimeout` inside steps
- HTTP smoke via `fetch` (no browser)
- Optional browser smoke (Playwright, WebdriverIO, CodeceptJS)
- Labels: `framework`, `language`, `runner`

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
ALLURE_RESULTS_DIR=allure-results-playwright pnpm test:playwright
```

## Allure 3 configuration

[`allurerc.mjs`](allurerc.mjs) defines:

- `awesomeAll` — combined report for all frameworks
- `awesome-<framework>` — per-framework filtered reports
- `dashboard` — dashboard plugin
- `publish: true` on Awesome plugins — generates the **summary** landing page (`@allurereport/web-summary`) linking to each published report

## Latest reports

<!-- ALLURE_REPORTS:BEGIN -->

- [Summary](https://todti.github.io/allure-3-tests/)
- [All tests](https://todti.github.io/allure-3-tests/awesomeAll/)
- [Dashboard](https://todti.github.io/allure-3-tests/dashboard/)

Per-framework reports: open **Summary** — it links to each generated view.
<!-- ALLURE_REPORTS:END -->

## CI and GitHub Pages

[`.github/workflows/allure-report.yml`](.github/workflows/allure-report.yml):

1. Matrix job runs each framework, uploads `allure-results-<framework>.zip`
2. Report job merges artifact zips into `./allure-results` and runs `allure generate`
3. [allure-framework/allure-action](https://github.com/allure-framework/allure-action) comments on PRs
4. Publishes `./allure-report` to `gh-pages` (includes summary index)

## Limitations

- **Bun**: there is no official `bun test` adapter. This repo runs **Mocha + allure-mocha** on the Bun runtime (`bun run runner.mjs`).
- **Newman**: Postman/Newman does not expose the full `allure-js-commons` runtime API; the collection demonstrates HTTP checks and Newman reporter integration.
- **Cypress**: browser navigation uses Cypress commands after the shared API block; nested `allure.step` inside `cy` chains has runner-specific constraints.

## References

- [Allure Report 3 docs](https://allurereport.org/docs/v3/)
- [allure-js integrations](https://github.com/allure-framework/allure-js)
- [allure3-demo](https://github.com/allure-framework/allure3-demo)

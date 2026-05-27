#!/usr/bin/env python3
"""Generate one spec file per domain test for each JS/TS framework adapter."""

from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DOMAINS = [
    ("auth", "oauth-login", "testAuthLogin", "Authentication", False, False),
    ("catalog", "product-search", "testCatalogSearch", "Catalog", False, False),
    ("checkout", "tax-calculation", "testCheckoutTax", "Checkout", False, False),
    ("payments", "flaky-gateway", "testFlakyPayment", "Payments", True, False),
    ("inventory", "flaky-sync", "testFlakyInventory", "Inventory", True, False),
    ("notifications", "email-webhook", "testEmailWebhook", "Notifications", False, False),
    ("reporting", "export-attachments", "testExportAttachments", "Reporting", False, False),
    ("reliability", "cache-retry", "testCacheRetry", "Reliability", True, False),
    ("compliance", "audit-statuses", "testAuditStatuses", "Compliance", False, False),
    ("analytics", "known-regression", "testKnownRegression", "Analytics", False, False),
    ("api", "health-check", "testApiHealth", "API", False, True),
    ("users", "profile-params", "testUserProfile", "Users", False, False),
    ("journeys", "password-reset", "testPasswordReset", "Customer journeys", False, False),
    ("baseline", "metadata", "testMetadataShowcase", "Adapter parity", False, False),
]

TITLES = {
    "testAuthLogin": "OAuth login grants access token",
    "testCatalogSearch": "Product search applies filters and pagination",
    "testCheckoutTax": "Checkout tax engine calculates VAT in nested steps",
    "testFlakyPayment": "Payment gateway may timeout before authorization",
    "testFlakyInventory": "Inventory shard lock causes intermittent sync failures",
    "testEmailWebhook": "Email provider webhook fan-out completes asynchronously",
    "testExportAttachments": "Reporting export bundles multiple attachment formats",
    "testCacheRetry": "Distributed cache misses on cold start then recovers after retry",
    "testAuditStatuses": "Audit pipeline records passed, skipped, and broken steps",
    "testKnownRegression": "Known regression remains red for dashboard analytics",
    "testApiHealth": "Public API health endpoint responds with 200",
    "testUserProfile": "User profile stores masked and hidden parameters",
    "testPasswordReset": "Password reset journey sends token and confirms delivery",
    "testMetadataShowcase": "Allure metadata baseline documents runtime API surface",
}


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def mocha_like(framework: str, runner: str, ext: str, package: str) -> None:
    suites = ROOT / "packages" / package / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        ctx = f'{{ framework: "{framework}", runner: "{runner}"'
        if browser and package == "cypress":
            ctx += ", skipHttpSmoke: true"
        ctx += " }"
        hints = ""
        call = f"await {fn}({ctx}{hints});"
        if flaky:
            hints = ", { attempt: this.currentTest?.currentRetry() ?? 0 }"
            call = f"await {fn}({ctx}{hints});"
            body = f"""import {{ describe, it }} from "mocha";
import {{ {fn} }} from "@allure-tests/shared";

describe("{suite}", function () {{
  this.retries(2);

  it("{title}", async function () {{
    this.timeout(30_000);
    {call}
  }});
}});
"""
        else:
            body = f"""import {{ describe, it }} from "mocha";
import {{ {fn} }} from "@allure-tests/shared";

describe("{suite}", () => {{
  it("{title}", async function () {{
    this.timeout(30_000);
    {call}
  }});
}});
"""
        write(suites / folder / f"{slug}.spec.{ext}", body)


def vitest_suite() -> None:
    suites = ROOT / "packages" / "vitest" / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        ctx = '{ framework: "vitest", runner: "node" }'
        retry = ", { timeout: 30_000, retry: 2 }" if flaky else ", 30_000"
        if flaky:
            body = f"""import {{ describe, it }} from "vitest";
import {{ {fn} }} from "@allure-tests/shared";

describe("{suite}", () => {{
  it("{title}", async () => {{
    await {fn}({ctx});
  }}{retry});
}});
"""
        else:
            body = f"""import {{ describe, it }} from "vitest";
import {{ {fn} }} from "@allure-tests/shared";

describe("{suite}", () => {{
  it("{title}", async () => {{
    await {fn}({ctx});
  }}, 30_000);
}});
"""
        write(suites / folder / f"{slug}.spec.ts", body)


def playwright_suite() -> None:
    suites = ROOT / "packages" / "playwright" / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        retry_block = "    test.describe.configure({ retries: 2 });\n\n" if flaky else ""
        attempt = ", { attempt: test.info().retry }" if flaky else ""
        if browser:
            ctx = """{
      framework: "playwright",
      runner: "node",
      attach: async (name, body, contentType) => {
        await test.info().attach(name, { body, contentType });
      },
      browser: {
        goto: (url) => page.goto(url),
        getTitle: () => page.title(),
      },
    }"""
            sig = "{ page }"
        else:
            ctx = '{ framework: "playwright", runner: "node" }'
            sig = "{}"
        body = f"""import {{ test }} from "@playwright/test";
import {{ {fn} }} from "@allure-tests/shared";

test.describe("{suite}", () => {{
{retry_block}  test("{title}", async ({sig}) => {{
    await {fn}({ctx}{attempt});
  }});
}});
"""
        write(suites / folder / f"{slug}.spec.ts", body)


def webdriverio_suite() -> None:
    suites = ROOT / "packages" / "webdriverio" / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        if browser:
            ctx = """{
      framework: "webdriverio",
      runner: "node",
      browser: {
        goto: (url) => browser.url(url),
        getTitle: () => browser.getTitle(),
      },
    }"""
        else:
            ctx = '{ framework: "webdriverio", runner: "node" }'
        body = f"""import {{ {fn} }} from "@allure-tests/shared";

describe("{suite}", () => {{
  it("{title}", async () => {{
    await {fn}({ctx});
  }});
}});
"""
        write(suites / folder / f"{slug}.spec.ts", body)


def cypress_suite() -> None:
    base = ROOT / "packages" / "cypress" / "cypress" / "e2e"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        body = f"""import {{ {fn} }} from "@allure-tests/shared";

describe("{suite}", () => {{
  it("{title}", () => {{
    cy.then(async () => {{
      await {fn}({{ framework: "cypress", runner: "node", skipHttpSmoke: true }});
    }});
  }});
}});
"""
        write(base / folder / f"{slug}.cy.ts", body)


def jasmine_suite() -> None:
    suites = ROOT / "packages" / "jasmine" / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        ctx = '{ framework: "jasmine", runner: "node" }'
        if flaky:
            body = f"""import {{ fileURLToPath }} from "node:url";
import {{ {fn} }} from "@allure-tests/shared";
import {{ describe, it, registerSpecTitles }} from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "{title}",
]);

describe("{suite}", () => {{
  it("{title}", async () => {{
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {{
      try {{
        await {fn}({ctx}, {{ attempt }});
        return;
      }} catch (error) {{
        lastError = error;
      }}
    }}
    throw lastError;
  }}, 30_000);
}});
"""
        else:
            body = f"""import {{ fileURLToPath }} from "node:url";
import {{ {fn} }} from "@allure-tests/shared";
import {{ describe, it, registerSpecTitles }} from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "{title}",
]);

describe("{suite}", () => {{
  it("{title}", async () => {{
    await {fn}({ctx});
  }}, 30_000);
}});
"""
        write(suites / folder / f"{slug}.spec.mjs", body)


def jest_suite() -> None:
    suites = ROOT / "packages" / "jest" / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        retry = "jest.retryTimes(2, { logErrorsBeforeRetry: true });\n\n" if flaky else ""
        body = f"""import {{ describe, it, jest }} from "@jest/globals";
import {{ {fn} }} from "@allure-tests/shared";

{retry}describe("{suite}", () => {{
  it("{title}", async () => {{
    await {fn}({{ framework: "jest", runner: "node" }});
  }});
}});
"""
        write(suites / folder / f"{slug}.spec.mjs", body)


def codeceptjs_suite() -> None:
    suites = ROOT / "packages" / "codeceptjs" / "suites"
    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        extra = ""
        if fn == "testApiHealth":
            extra = """
  I.amOnPage("https://playwright.dev");
  I.seeInTitle("Playwright");
"""
        body = f"""import {{ {fn} }} from "@allure-tests/shared";

Feature("{suite}");

Scenario("{title}", async () => {{
  await {fn}({{ framework: "codeceptjs", runner: "node" }});
{extra}}});
"""
        write(suites / folder / f"{slug}_test.ts", body)


def cucumber_features() -> None:
    features = ROOT / "packages" / "cucumber" / "features"
    steps_dir = ROOT / "packages" / "cucumber" / "steps"
    step_imports = set()
    step_defs = []

    for folder, slug, fn, suite, flaky, browser in DOMAINS:
        title = TITLES[fn]
        feature_name = title.split(" ")[0:3]
        feature_title = title
        write(
            features / folder / f"{slug}.feature",
            f"""@allure.label.framework:cucumber
Feature: {suite}

  Scenario: {feature_title}
    When the {slug.replace("-", " ")} flow runs for cucumber
    Then the cucumber flow completes
""",
        )
        step_imports.add(fn)
        step_defs.append(
            f"""When("the {slug.replace("-", " ")} flow runs for cucumber", async () => {{
  await {fn}({{ framework: "cucumber", runner: "node" }});
}});"""
        )

    step_imports_str = ", ".join(sorted(step_imports))
    content = f"""import {{ When, Then }} from "@cucumber/cucumber";
import * as allure from "allure-js-commons";
import {{ {step_imports_str} }} from "@allure-tests/shared";

"""
    content += "\n\n".join(step_defs)
    content += """

Then("the cucumber flow completes", async () => {
  await allure.parameter("cucumber_flow", "completed");
});
"""
    write(steps_dir / "domain-flows.steps.mjs", content)


def newman_collection() -> None:
    # Hand-maintained expansion is clearer for Newman; keep JSON in repo via template
    pass


def remove_legacy() -> None:
    legacy = [
        ROOT / "packages/mocha/suites/allure-features.spec.mjs",
        ROOT / "packages/bun/suites/allure-features.spec.mjs",
        ROOT / "packages/jest/suites/allure-features.spec.mjs",
        ROOT / "packages/jasmine/suites/allure-features.spec.mjs",
        ROOT / "packages/vitest/suites/allure-features.spec.ts",
        ROOT / "packages/playwright/suites/allure-features.spec.ts",
        ROOT / "packages/webdriverio/suites/allure-features.spec.ts",
        ROOT / "packages/cypress/cypress/e2e/allure-features.cy.ts",
        ROOT / "packages/codeceptjs/suites/allure_features_test.ts",
        ROOT / "packages/cucumber/features/allure_features.feature",
        ROOT / "packages/cucumber/steps/allure_features.steps.mjs",
    ]
    for path in legacy:
        if path.exists():
            path.unlink()


def main() -> None:
    remove_legacy()
    mocha_like("mocha", "node", "mjs", "mocha")
    mocha_like("bun", "bun", "mjs", "bun")
    jasmine_suite()
    jest_suite()
    vitest_suite()
    playwright_suite()
    webdriverio_suite()
    cypress_suite()
    codeceptjs_suite()
    cucumber_features()
    print("Generated domain-based spec files.")


if __name__ == "__main__":
    main()

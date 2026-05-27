import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testCacheRetry } from "@allure-tests/shared";

test.describe("Reliability", () => {
    test.describe.configure({ retries: 2 });

  test("Distributed cache misses on cold start then recovers after retry", async ({ page }) => {
    await testCacheRetry({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    }, { attempt: test.info().retry });
  });
});

import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testKnownRegression } from "@allure-tests/shared";

test.describe("Analytics", () => {
  test("Known regression remains red for dashboard analytics", async ({ page }) => {
    await testKnownRegression({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    });
  });
});

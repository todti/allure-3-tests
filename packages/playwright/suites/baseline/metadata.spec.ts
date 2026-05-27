import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testMetadataShowcase } from "@allure-tests/shared";

test.describe("Adapter parity", () => {
  test("Allure metadata baseline documents runtime API surface", async ({ page }) => {
    await testMetadataShowcase({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    });
  });
});

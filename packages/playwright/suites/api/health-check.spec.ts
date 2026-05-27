import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testApiHealth } from "@allure-tests/shared";

test.describe("API", () => {
  test("Public API health endpoint responds with 200", async ({ page }) => {
    await testApiHealth({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    });
  });
});

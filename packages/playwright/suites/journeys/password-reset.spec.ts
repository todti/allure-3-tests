import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testPasswordReset } from "@allure-tests/shared";

test.describe("Customer journeys", () => {
  test("Password reset journey sends token and confirms delivery", async ({ page }) => {
    await testPasswordReset({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    });
  });
});

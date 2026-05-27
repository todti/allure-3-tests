import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testFlakyPayment } from "@allure-tests/shared";

test.describe("Payments", () => {
    test.describe.configure({ retries: 2 });

  test("Payment gateway may timeout before authorization", async ({ page }) => {
    await testFlakyPayment({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    }, { attempt: test.info().retry });
  });
});

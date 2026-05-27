import { test } from "@playwright/test";
import { playwrightShowcaseExtras } from "../../support/playwright-browser.js";
import { testFlakyInventory } from "@allure-tests/shared";

test.describe("Inventory", () => {
    test.describe.configure({ retries: 2 });

  test("Inventory shard lock causes intermittent sync failures", async ({ page }) => {
    await testFlakyInventory({
      framework: "playwright",
      runner: "node",
      ...playwrightShowcaseExtras(page),
    }, { attempt: test.info().retry });
  });
});

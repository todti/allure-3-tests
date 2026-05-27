import { test } from "@playwright/test";
import * as allure from "allure-js-commons";
import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

test.describe("Allure 3 feature showcase", () => {
  test.beforeEach(async () => {
    await runHookStyleAttachments("before", true);
  });

  test.afterEach(async () => {
    await runHookStyleAttachments("after", true);
  });

  test("demonstrates Allure runtime API with Playwright", async ({ page }) => {
    await runAllureFeatureShowcase({
      framework: "playwright",
      runner: "node",
      attach: async (name, body, contentType) => {
        await test.info().attach(name, { body, contentType });
      },
      browser: {
        goto: (url) => page.goto(url),
        getTitle: () => page.title(),
      },
    });

    await allure.step("Playwright-native step", async () => {
      await page.goto("https://playwright.dev/");
    });
  });
});

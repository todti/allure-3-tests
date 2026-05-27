import { test } from "@playwright/test";
import * as allure from "allure-js-commons";
import type { ShowcaseContext } from "@allure-tests/shared";
import {
  runHookAttachmentsForScenario,
  scenarioAsyncFanOut,
  scenarioAttachmentGallery,
  scenarioBehavioralGrouping,
  scenarioDeepNestedSteps,
  scenarioFlakyInventorySync,
  scenarioFlakyPayment,
  scenarioKnownFailure,
  scenarioMetadataBaseline,
  scenarioParameterMatrix,
  scenarioRetryThenPass,
  scenarioStepStatuses,
} from "@allure-tests/shared";

function ctx(page: import("@playwright/test").Page): ShowcaseContext {
  return {
    framework: "playwright",
    runner: "node",
    attach: async (name, body, contentType) => {
      await test.info().attach(name, { body, contentType });
    },
    browser: {
      goto: (url) => page.goto(url),
      getTitle: () => page.title(),
    },
  };
}

test.describe("Allure 3 extended showcase (Playwright)", () => {
  test.beforeEach(async () => {
    await runHookAttachmentsForScenario("before", true);
  });

  test.afterEach(async () => {
    await runHookAttachmentsForScenario("after", true);
  });

  test("metadata baseline", async ({ page }) => {
    await scenarioMetadataBaseline(ctx(page));
    await allure.step("Playwright-native navigation", async () => {
      await page.goto("https://playwright.dev/");
    });
  });

  test("deep nested steps", async ({ page }) => {
    await scenarioDeepNestedSteps(ctx(page));
  });

  test("attachment gallery", async ({ page }) => {
    await scenarioAttachmentGallery(ctx(page));
  });

  test("parameter matrix", async ({ page }) => {
    await scenarioParameterMatrix(ctx(page));
  });

  test("step statuses", async ({ page }) => {
    await scenarioStepStatuses(ctx(page));
  });

  test("async fan-out", async ({ page }) => {
    await scenarioAsyncFanOut(ctx(page));
  });

  test("behavior tree grouping", async ({ page }) => {
    await scenarioBehavioralGrouping(ctx(page));
  });

  test.describe("Flaky & retries", () => {
    test.describe.configure({ retries: 2 });

    test("flaky payment gateway", async ({ page }, testInfo) => {
      await scenarioFlakyPayment(ctx(page), { attempt: testInfo.retry });
    });

    test("flaky inventory sync", async ({ page }, testInfo) => {
      await scenarioFlakyInventorySync(ctx(page), { attempt: testInfo.retry });
    });

    test("retry then pass", async ({ page }, testInfo) => {
      await scenarioRetryThenPass(ctx(page), { attempt: testInfo.retry });
    });
  });

  test("known failure (dashboard demo)", async ({ page }) => {
    await scenarioKnownFailure(ctx(page));
  });
});

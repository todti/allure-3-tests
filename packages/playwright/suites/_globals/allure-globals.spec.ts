import { test } from "@playwright/test";
import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

test.describe("Allure global hooks", () => {
  test.beforeAll(async () => {
    await runGlobalSetup({ framework: "playwright", runner: "node" });
  });

  test.afterAll(async () => {
    await runGlobalTeardown({ framework: "playwright", runner: "node" });
  });

  test("registers global errors and attachments for the worker", async () => {
    // Intentionally empty — global side effects live in hooks above.
  });
});

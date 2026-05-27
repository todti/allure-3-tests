import { test } from "@playwright/test";
import { testAuditStatuses } from "@allure-tests/shared";

test.describe("Compliance", () => {
  test("Audit pipeline records passed, skipped, and broken steps", async ({}) => {
    await testAuditStatuses({ framework: "playwright", runner: "node" });
  });
});

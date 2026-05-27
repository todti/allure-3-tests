import { test } from "@playwright/test";
import { testExportAttachments } from "@allure-tests/shared";

test.describe("Reporting", () => {
  test("Reporting export bundles multiple attachment formats", async ({}) => {
    await testExportAttachments({ framework: "playwright", runner: "node" });
  });
});

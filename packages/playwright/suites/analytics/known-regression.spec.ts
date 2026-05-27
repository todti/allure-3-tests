import { test } from "@playwright/test";
import { testKnownRegression } from "@allure-tests/shared";

test.describe("Analytics", () => {
  test("Known regression remains red for dashboard analytics", async ({}) => {
    await testKnownRegression({ framework: "playwright", runner: "node" });
  });
});

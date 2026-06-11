import { test } from "@playwright/test";
import { testSettlementReport } from "@allure-tests/shared";

test.describe("Payments", () => {
  test("Daily settlement report is generated and submitted to acquiring bank", async ({}) => {
    await testSettlementReport({ framework: "playwright", runner: "node" });
  });
});

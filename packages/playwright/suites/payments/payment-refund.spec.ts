import { test } from "@playwright/test";
import { testPaymentRefund } from "@allure-tests/shared";

test.describe("Payments", () => {
  test("Captured payment is fully refunded to the card", async ({}) => {
    await testPaymentRefund({ framework: "playwright", runner: "node" });
  });
});

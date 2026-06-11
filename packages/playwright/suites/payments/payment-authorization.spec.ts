import { test } from "@playwright/test";
import { testPaymentAuthorization } from "@allure-tests/shared";

test.describe("Payments", () => {
  test("Payment intent is authorized against card token", async ({}) => {
    await testPaymentAuthorization({ framework: "playwright", runner: "node" });
  });
});

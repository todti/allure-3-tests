import { test } from "@playwright/test";
import { testSubscriptionBilling } from "@allure-tests/shared";

test.describe("Payments", () => {
  test("Recurring subscription cycle charges stored payment method", async ({}) => {
    await testSubscriptionBilling({ framework: "playwright", runner: "node" });
  });
});

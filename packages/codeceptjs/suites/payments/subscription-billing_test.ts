import { testSubscriptionBilling } from "@allure-tests/shared";

Feature("Payments");

Scenario("Recurring subscription cycle charges stored payment method", async () => {
  await testSubscriptionBilling({ framework: "codeceptjs", runner: "node" });
});

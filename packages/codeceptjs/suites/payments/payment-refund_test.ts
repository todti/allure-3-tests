import { testPaymentRefund } from "@allure-tests/shared";

Feature("Payments");

Scenario("Captured payment is fully refunded to the card", async () => {
  await testPaymentRefund({ framework: "codeceptjs", runner: "node" });
});

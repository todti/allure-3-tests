import { testFlakyPayment } from "@allure-tests/shared";

Feature("Payments");

Scenario("Payment gateway may timeout before authorization", async () => {
  await testFlakyPayment({ framework: "codeceptjs", runner: "node" });
});

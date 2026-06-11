import { testPaymentAuthorization } from "@allure-tests/shared";

Feature("Payments");

Scenario("Payment intent is authorized against card token", async () => {
  await testPaymentAuthorization({ framework: "codeceptjs", runner: "node" });
});

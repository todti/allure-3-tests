import { testFraudScore } from "@allure-tests/shared";

Feature("Payments");

Scenario("Fraud model scores transaction and auto-approves low-risk payment", async () => {
  await testFraudScore({ framework: "codeceptjs", runner: "node" });
});

import { testSettlementReport } from "@allure-tests/shared";

Feature("Payments");

Scenario("Daily settlement report is generated and submitted to acquiring bank", async () => {
  await testSettlementReport({ framework: "codeceptjs", runner: "node" });
});

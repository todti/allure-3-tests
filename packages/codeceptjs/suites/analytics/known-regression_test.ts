import { testKnownRegression } from "@allure-tests/shared";

Feature("Analytics");

Scenario("Known regression remains red for dashboard analytics", async () => {
  await testKnownRegression({ framework: "codeceptjs", runner: "node" });
});

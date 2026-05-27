import { testAuditStatuses } from "@allure-tests/shared";

Feature("Compliance");

Scenario("Audit pipeline records passed, skipped, and broken steps", async () => {
  await testAuditStatuses({ framework: "codeceptjs", runner: "node" });
});

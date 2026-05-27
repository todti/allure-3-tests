import { testExportAttachments } from "@allure-tests/shared";

Feature("Reporting");

Scenario("Reporting export bundles multiple attachment formats", async () => {
  await testExportAttachments({ framework: "codeceptjs", runner: "node" });
});

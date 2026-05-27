import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

Feature("Allure global hooks (CodeceptJS)");

BeforeSuite(async () => {
  await runGlobalSetup({ framework: "codeceptjs", runner: "node" });
});

AfterSuite(async () => {
  await runGlobalTeardown({ framework: "codeceptjs", runner: "node" });
});

Scenario("registers global errors and attachments", async () => {
  // Intentionally empty — side effects are in suite hooks above.
});

import { testEmailWebhook } from "@allure-tests/shared";

Feature("Notifications");

Scenario("Email provider webhook fan-out completes asynchronously", async () => {
  await testEmailWebhook({ framework: "codeceptjs", runner: "node" });
});

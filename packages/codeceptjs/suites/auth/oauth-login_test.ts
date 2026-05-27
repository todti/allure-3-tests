import { testAuthLogin } from "@allure-tests/shared";

Feature("Authentication");

Scenario("OAuth login grants access token", async () => {
  await testAuthLogin({ framework: "codeceptjs", runner: "node" });
});

import { testUserProfile } from "@allure-tests/shared";

Feature("Users");

Scenario("User profile stores masked and hidden parameters", async () => {
  await testUserProfile({ framework: "codeceptjs", runner: "node" });
});

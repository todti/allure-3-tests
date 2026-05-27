import { testPasswordReset } from "@allure-tests/shared";

Feature("Customer journeys");

Scenario("Password reset journey sends token and confirms delivery", async () => {
  await testPasswordReset({ framework: "codeceptjs", runner: "node" });
});

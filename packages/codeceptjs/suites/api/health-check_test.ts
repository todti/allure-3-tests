import { testApiHealth } from "@allure-tests/shared";

Feature("API");

Scenario("Public API health endpoint responds with 200", async () => {
  await testApiHealth({ framework: "codeceptjs", runner: "node" });

  I.amOnPage("https://playwright.dev");
  I.seeInTitle("Playwright");
});

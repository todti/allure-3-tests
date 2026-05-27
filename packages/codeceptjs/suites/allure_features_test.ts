import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

Feature("Allure 3 feature showcase (CodeceptJS)");

Before(async () => {
  await runHookStyleAttachments("before", true);
});

After(async () => {
  await runHookStyleAttachments("after", true);
});

Scenario("demonstrates Allure runtime API with CodeceptJS", async ({ I }) => {
  await runAllureFeatureShowcase({
    framework: "codeceptjs",
    runner: "node",
  });

  I.amOnPage("https://playwright.dev");
  I.seeInTitle("Playwright");
});

import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

BeforeAll({ timeout: 30_000 }, async () => {
  await runGlobalSetup({ framework: "cucumber", runner: "node" });
});

AfterAll({ timeout: 30_000 }, async () => {
  await runGlobalTeardown({ framework: "cucumber", runner: "node" });
});

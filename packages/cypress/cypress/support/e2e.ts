import "allure-cypress";
import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

before(async () => {
  await runGlobalSetup({ framework: "cypress", runner: "node" });
});

after(async () => {
  await runGlobalTeardown({ framework: "cypress", runner: "node" });
});

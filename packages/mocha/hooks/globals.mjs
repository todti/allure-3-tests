import { after, before } from "mocha";
import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

const ctx = { framework: "mocha", runner: "node" };

before("global Allure setup", async function () {
  this.timeout(30_000);
  await runGlobalSetup(ctx);
});

after("global Allure teardown", async function () {
  this.timeout(30_000);
  await runGlobalTeardown(ctx);
});

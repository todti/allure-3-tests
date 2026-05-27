import { afterAll, beforeAll } from "@jest/globals";
import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

beforeAll(async () => {
  await runGlobalSetup({ framework: "jest", runner: "node" });
});

afterAll(async () => {
  await runGlobalTeardown({ framework: "jest", runner: "node" });
});

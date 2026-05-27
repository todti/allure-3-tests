import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

const ctx = { framework: "bun", runner: "bun" };

export const mochaHooks = {
  async beforeAll() {
    this.timeout(30_000);
    await runGlobalSetup(ctx);
  },
  async afterAll() {
    this.timeout(30_000);
    await runGlobalTeardown(ctx);
  },
};

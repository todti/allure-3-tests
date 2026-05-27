import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

export default async function setup() {
  await runGlobalSetup({ framework: "vitest", runner: "node" });

  return async () => {
    await runGlobalTeardown({ framework: "vitest", runner: "node" });
  };
}

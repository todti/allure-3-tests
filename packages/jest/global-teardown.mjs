import { runGlobalTeardown } from "@allure-tests/shared";

export default async function globalTeardown() {
  await runGlobalTeardown({ framework: "jest", runner: "node" });
}

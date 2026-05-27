import { runGlobalTeardown } from "@allure-tests/shared";

export default async function globalTeardown() {
  await runGlobalTeardown({ framework: "playwright", runner: "node" });
}

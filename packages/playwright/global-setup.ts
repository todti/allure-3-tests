import { runGlobalSetup } from "@allure-tests/shared";

export default async function globalSetup() {
  await runGlobalSetup({ framework: "playwright", runner: "node" });
}

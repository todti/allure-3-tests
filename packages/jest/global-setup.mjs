import { runGlobalSetup } from "@allure-tests/shared";

export default async function globalSetup() {
  await runGlobalSetup({ framework: "jest", runner: "node" });
}

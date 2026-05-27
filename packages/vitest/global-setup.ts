import { runGlobalSetupFiles, runGlobalTeardownFiles } from "@allure-tests/shared";

export default async function globalSetup() {
  runGlobalSetupFiles({ framework: "vitest" });
  return async () => {
    runGlobalTeardownFiles({ framework: "vitest" });
  };
}

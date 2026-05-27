import { buildEnvironmentInfo, runGlobalSetup } from "@allure-tests/shared";

await runGlobalSetup({ framework: "newman", runner: "node" });

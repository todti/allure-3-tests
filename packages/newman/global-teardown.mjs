import { runGlobalTeardown } from "@allure-tests/shared";

await runGlobalTeardown({ framework: "newman", runner: "node" });

import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { runGlobalSetup, runGlobalTeardown, runHookStyleAttachments } from "@allure-tests/shared";

beforeAll(async () => {
  await runGlobalSetup({ framework: "vitest", runner: "node" });
});

afterAll(async () => {
  await runGlobalTeardown({ framework: "vitest", runner: "node" });
});

beforeEach(async () => {
  await runHookStyleAttachments("before", true);
});

afterEach(async () => {
  await runHookStyleAttachments("after", true);
});

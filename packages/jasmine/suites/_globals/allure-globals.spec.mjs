import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";
import { beforeAll, afterAll, describe, expect, it, registerSpecTitles } from "../../helpers/spec-api.mjs";
import { fileURLToPath } from "node:url";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "registers global errors and attachments",
]);

describe("Allure globals", () => {
  beforeAll(async () => {
    await runGlobalSetup({ framework: "jasmine", runner: "node" });
  });

  afterAll(async () => {
    await runGlobalTeardown({ framework: "jasmine", runner: "node" });
  });

  it("registers global errors and attachments", () => {
    expect(true).toBe(true);
  });
});

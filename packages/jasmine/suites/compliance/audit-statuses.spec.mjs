import { fileURLToPath } from "node:url";
import { testAuditStatuses } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Audit pipeline records passed, skipped, and broken steps",
]);

describe("Compliance", () => {
  it("Audit pipeline records passed, skipped, and broken steps", async () => {
    await testAuditStatuses({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

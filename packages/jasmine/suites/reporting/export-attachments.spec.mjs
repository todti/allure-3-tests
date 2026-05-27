import { fileURLToPath } from "node:url";
import { testExportAttachments } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Reporting export bundles multiple attachment formats",
]);

describe("Reporting", () => {
  it("Reporting export bundles multiple attachment formats", async () => {
    await testExportAttachments({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

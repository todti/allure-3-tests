import { fileURLToPath } from "node:url";
import { testMetadataShowcase } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Allure metadata baseline documents runtime API surface",
]);

describe("Adapter parity", () => {
  it("Allure metadata baseline documents runtime API surface", async () => {
    await testMetadataShowcase({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

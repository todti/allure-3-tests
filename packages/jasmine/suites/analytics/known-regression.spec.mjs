import { fileURLToPath } from "node:url";
import { testKnownRegression } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Known regression remains red for dashboard analytics",
]);

describe("Analytics", () => {
  it("Known regression remains red for dashboard analytics", async () => {
    await testKnownRegression({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

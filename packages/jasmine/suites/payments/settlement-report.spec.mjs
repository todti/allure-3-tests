import { fileURLToPath } from "node:url";
import { testSettlementReport } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Daily settlement report is generated and submitted to acquiring bank",
]);

describe("Payments", () => {
  it("Daily settlement report is generated and submitted to acquiring bank", async () => {
    await testSettlementReport({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

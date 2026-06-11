import { fileURLToPath } from "node:url";
import { testFraudScore } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Fraud model scores transaction and auto-approves low-risk payment",
]);

describe("Payments", () => {
  it("Fraud model scores transaction and auto-approves low-risk payment", async () => {
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await testFraudScore({ framework: "jasmine", runner: "node" }, { attempt });
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }, 30_000);
});

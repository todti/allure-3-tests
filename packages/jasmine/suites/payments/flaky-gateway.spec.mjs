import { fileURLToPath } from "node:url";
import { testFlakyPayment } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Payment gateway may timeout before authorization",
]);

describe("Payments", () => {
  it("Payment gateway may timeout before authorization", async () => {
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await testFlakyPayment({ framework: "jasmine", runner: "node" }, { attempt });
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }, 30_000);
});

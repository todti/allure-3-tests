import { fileURLToPath } from "node:url";
import { testPaymentRefund } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Captured payment is fully refunded to the card",
]);

describe("Payments", () => {
  it("Captured payment is fully refunded to the card", async () => {
    await testPaymentRefund({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

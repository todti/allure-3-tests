import { fileURLToPath } from "node:url";
import { testPaymentAuthorization } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Payment intent is authorized against card token",
]);

describe("Payments", () => {
  it("Payment intent is authorized against card token", async () => {
    await testPaymentAuthorization({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

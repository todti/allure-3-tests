import { fileURLToPath } from "node:url";
import { testCheckoutTax } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Checkout tax engine calculates VAT in nested steps",
]);

describe("Checkout", () => {
  it("Checkout tax engine calculates VAT in nested steps", async () => {
    await testCheckoutTax({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

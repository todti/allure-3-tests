import { fileURLToPath } from "node:url";
import { testCardTokenization } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Card number is tokenized via PCI vault",
]);

describe("Payments", () => {
  it("Card number is tokenized via PCI vault", async () => {
    await testCardTokenization({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

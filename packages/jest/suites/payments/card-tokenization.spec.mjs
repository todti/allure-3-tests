import { describe, it } from "@jest/globals";
import { testCardTokenization } from "@allure-tests/shared";

describe("Payments", () => {
  it("Card number is tokenized via PCI vault", async () => {
    await testCardTokenization({ framework: "jest", runner: "node" });
  });
});

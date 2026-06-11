import { describe, it } from "mocha";
import { testCardTokenization } from "@allure-tests/shared";

describe("Payments", () => {
  it("Card number is tokenized via PCI vault", async function () {
    this.timeout(30_000);
    await testCardTokenization({ framework: "bun", runner: "bun" });
  });
});

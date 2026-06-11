import { describe, it } from "vitest";
import { testCardTokenization } from "@allure-tests/shared";

describe("Payments", () => {
  it("Card number is tokenized via PCI vault", async () => {
    await testCardTokenization({ framework: "vitest", runner: "node" });
  }, 30_000);
});

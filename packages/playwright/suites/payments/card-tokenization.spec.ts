import { test } from "@playwright/test";
import { testCardTokenization } from "@allure-tests/shared";

test.describe("Payments", () => {
  test("Card number is tokenized via PCI vault", async ({}) => {
    await testCardTokenization({ framework: "playwright", runner: "node" });
  });
});

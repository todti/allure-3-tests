import { test } from "@playwright/test";
import { testMetadataShowcase } from "@allure-tests/shared";

test.describe("Adapter parity", () => {
  test("Allure metadata baseline documents runtime API surface", async ({}) => {
    await testMetadataShowcase({ framework: "playwright", runner: "node" });
  });
});

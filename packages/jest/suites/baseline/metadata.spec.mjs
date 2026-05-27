import { describe, it } from "@jest/globals";
import { testMetadataShowcase } from "@allure-tests/shared";

describe("Adapter parity", () => {
  it("Allure metadata baseline documents runtime API surface", async () => {
    await testMetadataShowcase({ framework: "jest", runner: "node" });
  });
});

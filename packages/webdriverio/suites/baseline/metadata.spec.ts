import { testMetadataShowcase } from "@allure-tests/shared";

describe("Adapter parity", () => {
  it("Allure metadata baseline documents runtime API surface", async () => {
    await testMetadataShowcase({ framework: "webdriverio", runner: "node" });
  });
});

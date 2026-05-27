import { describe, it } from "mocha";
import { testMetadataShowcase } from "@allure-tests/shared";

describe("Adapter parity", () => {
  it("Allure metadata baseline documents runtime API surface", async function () {
    this.timeout(30_000);
    await testMetadataShowcase({ framework: "jasmine", runner: "node" });
  });
});

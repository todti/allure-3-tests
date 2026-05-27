import { describe, it } from "vitest";
import { testMetadataShowcase } from "@allure-tests/shared";

describe("Adapter parity", () => {
  it("Allure metadata baseline documents runtime API surface", async () => {
    await testMetadataShowcase({ framework: "vitest", runner: "node" });
  }, 30_000);
});

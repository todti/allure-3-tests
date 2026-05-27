import { describe, it } from "vitest";
import { testExportAttachments } from "@allure-tests/shared";

describe("Reporting", () => {
  it("Reporting export bundles multiple attachment formats", async () => {
    await testExportAttachments({ framework: "vitest", runner: "node" });
  }, 30_000);
});

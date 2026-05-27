import { describe, it, jest } from "@jest/globals";
import { testExportAttachments } from "@allure-tests/shared";

describe("Reporting", () => {
  it("Reporting export bundles multiple attachment formats", async () => {
    await testExportAttachments({ framework: "jest", runner: "node" });
  });
});

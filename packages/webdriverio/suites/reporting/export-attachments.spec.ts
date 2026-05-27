import { testExportAttachments } from "@allure-tests/shared";

describe("Reporting", () => {
  it("Reporting export bundles multiple attachment formats", async () => {
    await testExportAttachments({ framework: "webdriverio", runner: "node" });
  });
});

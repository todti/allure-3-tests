import { describe, it } from "mocha";
import { testExportAttachments } from "@allure-tests/shared";

describe("Reporting", () => {
  it("Reporting export bundles multiple attachment formats", async function () {
    this.timeout(30_000);
    await testExportAttachments({ framework: "bun", runner: "bun" });
  });
});

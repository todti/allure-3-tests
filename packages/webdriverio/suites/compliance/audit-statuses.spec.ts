import { testAuditStatuses } from "@allure-tests/shared";

describe("Compliance", () => {
  it("Audit pipeline records passed, skipped, and broken steps", async () => {
    await testAuditStatuses({ framework: "webdriverio", runner: "node" });
  });
});

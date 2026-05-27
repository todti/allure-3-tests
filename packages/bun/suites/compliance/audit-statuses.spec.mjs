import { describe, it } from "mocha";
import { testAuditStatuses } from "@allure-tests/shared";

describe("Compliance", () => {
  it("Audit pipeline records passed, skipped, and broken steps", async function () {
    this.timeout(30_000);
    await testAuditStatuses({ framework: "bun", runner: "bun" });
  });
});

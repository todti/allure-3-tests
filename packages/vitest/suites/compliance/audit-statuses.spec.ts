import { describe, it } from "vitest";
import { testAuditStatuses } from "@allure-tests/shared";

describe("Compliance", () => {
  it("Audit pipeline records passed, skipped, and broken steps", async () => {
    await testAuditStatuses({ framework: "vitest", runner: "node" });
  }, 30_000);
});

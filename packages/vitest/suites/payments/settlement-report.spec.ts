import { describe, it } from "vitest";
import { testSettlementReport } from "@allure-tests/shared";

describe("Payments", () => {
  it("Daily settlement report is generated and submitted to acquiring bank", async () => {
    await testSettlementReport({ framework: "vitest", runner: "node" });
  }, 30_000);
});

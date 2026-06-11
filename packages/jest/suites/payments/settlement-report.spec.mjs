import { describe, it } from "@jest/globals";
import { testSettlementReport } from "@allure-tests/shared";

describe("Payments", () => {
  it("Daily settlement report is generated and submitted to acquiring bank", async () => {
    await testSettlementReport({ framework: "jest", runner: "node" });
  });
});

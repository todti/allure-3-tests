import { testSettlementReport } from "@allure-tests/shared";

describe("Payments", () => {
  it("Daily settlement report is generated and submitted to acquiring bank", async () => {
    await testSettlementReport({ framework: "webdriverio", runner: "node" });
  });
});

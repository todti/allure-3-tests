import { describe, it } from "mocha";
import { testSettlementReport } from "@allure-tests/shared";

describe("Payments", () => {
  it("Daily settlement report is generated and submitted to acquiring bank", async function () {
    this.timeout(30_000);
    await testSettlementReport({ framework: "mocha", runner: "node" });
  });
});

import { describe, it } from "vitest";
import { testFraudScore } from "@allure-tests/shared";

describe("Payments", () => {
  it("Fraud model scores transaction and auto-approves low-risk payment", async () => {
    await testFraudScore({ framework: "vitest", runner: "node" });
  }, { timeout: 30_000, retry: 2 });
});

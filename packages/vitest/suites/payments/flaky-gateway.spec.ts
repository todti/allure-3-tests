import { describe, it } from "vitest";
import { testFlakyPayment } from "@allure-tests/shared";

describe("Payments", () => {
  it("Payment gateway may timeout before authorization", async () => {
    await testFlakyPayment({ framework: "vitest", runner: "node" });
  }, { timeout: 30_000, retry: 2 });
});

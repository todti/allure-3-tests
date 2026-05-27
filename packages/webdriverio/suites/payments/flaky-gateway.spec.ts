import { testFlakyPayment } from "@allure-tests/shared";

describe("Payments", () => {
  it("Payment gateway may timeout before authorization", async () => {
    await testFlakyPayment({ framework: "webdriverio", runner: "node" });
  });
});

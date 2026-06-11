import { describe, it } from "mocha";
import { testSubscriptionBilling } from "@allure-tests/shared";

describe("Payments", () => {
  it("Recurring subscription cycle charges stored payment method", async function () {
    this.timeout(30_000);
    await testSubscriptionBilling({ framework: "mocha", runner: "node" });
  });
});

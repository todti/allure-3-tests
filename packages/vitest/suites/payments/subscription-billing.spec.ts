import { describe, it } from "vitest";
import { testSubscriptionBilling } from "@allure-tests/shared";

describe("Payments", () => {
  it("Recurring subscription cycle charges stored payment method", async () => {
    await testSubscriptionBilling({ framework: "vitest", runner: "node" });
  }, 30_000);
});

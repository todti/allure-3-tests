import { fileURLToPath } from "node:url";
import { testSubscriptionBilling } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Recurring subscription cycle charges stored payment method",
]);

describe("Payments", () => {
  it("Recurring subscription cycle charges stored payment method", async () => {
    await testSubscriptionBilling({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

import { testSubscriptionBilling } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Recurring subscription cycle charges stored payment method", () => {
    cy.then(async () => {
      await testSubscriptionBilling({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

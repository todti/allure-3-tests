import { testPaymentRefund } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Captured payment is fully refunded to the card", () => {
    cy.then(async () => {
      await testPaymentRefund({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

import { testPaymentAuthorization } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Payment intent is authorized against card token", () => {
    cy.then(async () => {
      await testPaymentAuthorization({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

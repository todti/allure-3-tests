import { testFlakyPayment } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Payment gateway may timeout before authorization", () => {
    cy.then(async () => {
      await testFlakyPayment({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

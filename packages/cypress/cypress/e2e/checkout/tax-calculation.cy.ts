import { testCheckoutTax } from "@allure-tests/shared";

describe("Checkout", () => {
  it("Checkout tax engine calculates VAT in nested steps", () => {
    cy.then(async () => {
      await testCheckoutTax({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

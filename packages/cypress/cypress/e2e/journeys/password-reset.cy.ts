import { testPasswordReset } from "@allure-tests/shared/domains";

describe("Customer journeys", () => {
  it("Password reset journey sends token and confirms delivery", () => {
    cy.then(async () => {
      await testPasswordReset({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

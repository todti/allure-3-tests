import { testUserProfile } from "@allure-tests/shared";

describe("Users", () => {
  it("User profile stores masked and hidden parameters", () => {
    cy.then(async () => {
      await testUserProfile({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

import { testCardTokenization } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Card number is tokenized via PCI vault", () => {
    cy.then(async () => {
      await testCardTokenization({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

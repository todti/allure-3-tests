import { testCatalogSearch } from "@allure-tests/shared";

describe("Catalog", () => {
  it("Product search applies filters and pagination", () => {
    cy.then(async () => {
      await testCatalogSearch({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});

import { testCatalogSearch } from "@allure-tests/shared";

Feature("Catalog");

Scenario("Product search applies filters and pagination", async () => {
  await testCatalogSearch({ framework: "codeceptjs", runner: "node" });
});

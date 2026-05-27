import { test } from "@playwright/test";
import { testCatalogSearch } from "@allure-tests/shared";

test.describe("Catalog", () => {
  test("Product search applies filters and pagination", async ({}) => {
    await testCatalogSearch({ framework: "playwright", runner: "node" });
  });
});

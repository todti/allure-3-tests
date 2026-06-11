import { describe, it } from "@jest/globals";
import { testCatalogSearch } from "@allure-tests/shared";

describe("Catalog", () => {
  it("Product search applies filters and pagination", async () => {
    await testCatalogSearch({ framework: "jest", runner: "node" });
  });
});

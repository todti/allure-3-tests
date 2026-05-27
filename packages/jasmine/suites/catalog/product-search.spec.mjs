import { describe, it } from "mocha";
import { testCatalogSearch } from "@allure-tests/shared";

describe("Catalog", () => {
  it("Product search applies filters and pagination", async function () {
    this.timeout(30_000);
    await testCatalogSearch({ framework: "jasmine", runner: "node" });
  });
});

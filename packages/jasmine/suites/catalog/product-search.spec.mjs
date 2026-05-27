import { fileURLToPath } from "node:url";
import { testCatalogSearch } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Product search applies filters and pagination",
]);

describe("Catalog", () => {
  it("Product search applies filters and pagination", async () => {
    await testCatalogSearch({ framework: "jasmine", runner: "node" });
  }, 30_000);
});

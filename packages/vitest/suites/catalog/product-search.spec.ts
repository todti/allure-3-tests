import { describe, it } from "vitest";
import { testCatalogSearch } from "@allure-tests/shared";

describe("Catalog", () => {
  it("Product search applies filters and pagination", async () => {
    await testCatalogSearch({ framework: "vitest", runner: "node" });
  }, 30_000);
});

import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkLabels } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

export async function testCatalogSearch(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName("Product search applies filters and pagination");
  await allure.testCaseId(`${ctx.framework}-catalog-search`);
  await allure.epic("Commerce");
  await allure.feature("Catalog");
  await allure.story("Search");
  await allure.tag("catalog");
  await allure.severity("normal");

  const filters = { category: "books", minPrice: 10, maxPrice: 50, inStock: true };

  await allure.step("Build search query", async (step) => {
    await step.parameter("query", "playwright");
    await step.parameter("page", "1");
    await step.parameter("page_size", "20");
  });

  await allure.step("Apply filters", async (step) => {
    for (const [key, value] of Object.entries(filters)) {
      await step.parameter(key, String(value));
    }
  });

  await allure.step("Fetch results", async () => {
    const results = [
      { sku: "BK-1", title: "Testing with Playwright", price: 29 },
      { sku: "BK-2", title: "Allure Reporting Guide", price: 39 },
    ];
    await allure.attachment("search-results", JSON.stringify(results, null, 2), ContentType.JSON);
    await allure.parameter("total_hits", String(results.length));
  });
}

import { describe, it } from "vitest";
import { runAllureFeatureShowcase } from "@allure-tests/shared";

describe("Allure 3 feature showcase (Vitest)", () => {
  it("demonstrates Allure runtime API with Vitest", async () => {
    await runAllureFeatureShowcase({
      framework: "vitest",
      runner: "node",
    });
  }, 30_000);
});

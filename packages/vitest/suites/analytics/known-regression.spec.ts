import { describe, it } from "vitest";
import { testKnownRegression } from "@allure-tests/shared";

describe("Analytics", () => {
  it("Known regression remains red for dashboard analytics", async () => {
    await testKnownRegression({ framework: "vitest", runner: "node" });
  }, 30_000);
});

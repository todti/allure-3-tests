import { describe, it } from "@jest/globals";
import { testKnownRegression } from "@allure-tests/shared";

describe("Analytics", () => {
  it("Known regression remains red for dashboard analytics", async () => {
    await testKnownRegression({ framework: "jest", runner: "node" });
  });
});

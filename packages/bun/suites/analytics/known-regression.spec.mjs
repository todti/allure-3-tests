import { describe, it } from "mocha";
import { testKnownRegression } from "@allure-tests/shared";

describe("Analytics", () => {
  it("Known regression remains red for dashboard analytics", async function () {
    this.timeout(30_000);
    await testKnownRegression({ framework: "bun", runner: "bun" });
  });
});

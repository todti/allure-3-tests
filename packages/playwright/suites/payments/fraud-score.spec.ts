import { test } from "@playwright/test";
import { testFraudScore } from "@allure-tests/shared";

test.describe("Payments", () => {
  test.describe.configure({ retries: 2 });

  test("Fraud model scores transaction and auto-approves low-risk payment", async ({}) => {
    await testFraudScore({ framework: "playwright", runner: "node" }, { attempt: test.info().retry });
  });
});

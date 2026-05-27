import { test } from "@playwright/test";
import { testFlakyPayment } from "@allure-tests/shared";

test.describe("Payments", () => {
    test.describe.configure({ retries: 2 });

  test("Payment gateway may timeout before authorization", async () => {
    await testFlakyPayment({ framework: "playwright", runner: "node" }, { attempt: test.info().retry });
  });
});

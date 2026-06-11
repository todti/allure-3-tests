import { testFlakyPayment } from "@allure-tests/shared";

describe("Payments", function () {
  it("Payment gateway may timeout before authorization", async function () {
    await testFlakyPayment(
      {
        framework: "webdriverio",
        runner: "node",
        browser: {
          goto: (url) => browser.url(url),
          getTitle: () => browser.getTitle(),
        },
      },
      { attempt: this.currentTest?.currentRetry() ?? 0 },
    );
  });
});

import { testKnownRegression } from "@allure-tests/shared";

describe("Analytics", () => {
  it("Known regression remains red for dashboard analytics", async () => {
    await testKnownRegression({
      framework: "webdriverio",
      runner: "node",
      browser: {
        goto: (url) => browser.url(url),
        getTitle: () => browser.getTitle(),
      },
    });
  });
});

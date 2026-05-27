import {
  scenarioAsyncFanOut,
  scenarioAttachmentGallery,
  scenarioBehavioralGrouping,
  scenarioDeepNestedSteps,
  scenarioFlakyInventorySync,
  scenarioFlakyPayment,
  scenarioKnownFailure,
  scenarioMetadataBaseline,
  scenarioParameterMatrix,
  scenarioRetryThenPass,
  scenarioStepStatuses,
} from "@allure-tests/shared";

const baseCtx = { framework: "webdriverio", runner: "node" as const };

describe("Allure 3 extended showcase (WebdriverIO)", () => {
  it("metadata baseline", async () => {
    await scenarioMetadataBaseline({
      ...baseCtx,
      browser: {
        goto: (url) => browser.url(url),
        getTitle: () => browser.getTitle(),
      },
    });
  });

  it("deep nested steps", async () => {
    await scenarioDeepNestedSteps(baseCtx);
  });

  it("attachment gallery", async () => {
    await scenarioAttachmentGallery(baseCtx);
  });

  it("parameter matrix", async () => {
    await scenarioParameterMatrix(baseCtx);
  });

  it("step statuses", async () => {
    await scenarioStepStatuses(baseCtx);
  });

  it("async fan-out", async () => {
    await scenarioAsyncFanOut(baseCtx);
  });

  it("behavior tree grouping", async () => {
    await scenarioBehavioralGrouping(baseCtx);
  });

  describe("Flaky & retries", () => {
    it("flaky payment gateway", async () => {
      await scenarioFlakyPayment(baseCtx);
    });

    it("flaky inventory sync", async () => {
      await scenarioFlakyInventorySync(baseCtx);
    });

    it("retry then pass", async () => {
      await scenarioRetryThenPass(baseCtx);
    });
  });

  it("known failure (dashboard demo)", async () => {
    await scenarioKnownFailure(baseCtx);
  });
});

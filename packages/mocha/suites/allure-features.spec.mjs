import { afterEach, beforeEach, describe, it } from "mocha";
import {
  runHookAttachmentsForScenario,
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

const baseCtx = { framework: "mocha", runner: "node" };

describe("Allure 3 extended showcase (Mocha)", () => {
  beforeEach(async () => {
    await runHookAttachmentsForScenario("before", false);
  });

  afterEach(async () => {
    await runHookAttachmentsForScenario("after", false);
  });

  it("metadata baseline", async function () {
    this.timeout(30_000);
    await scenarioMetadataBaseline(baseCtx);
  });

  it("deep nested steps", async function () {
    this.timeout(30_000);
    await scenarioDeepNestedSteps(baseCtx);
  });

  it("attachment gallery", async function () {
    this.timeout(30_000);
    await scenarioAttachmentGallery(baseCtx);
  });

  it("parameter matrix", async function () {
    this.timeout(30_000);
    await scenarioParameterMatrix(baseCtx);
  });

  it("step statuses", async function () {
    this.timeout(30_000);
    await scenarioStepStatuses(baseCtx);
  });

  it("async fan-out", async function () {
    this.timeout(30_000);
    await scenarioAsyncFanOut(baseCtx);
  });

  it("behavior tree grouping", async function () {
    this.timeout(30_000);
    await scenarioBehavioralGrouping(baseCtx);
  });

  describe("Flaky & retries", function () {
    this.retries(2);

    it("flaky payment gateway", async function () {
      this.timeout(30_000);
      await scenarioFlakyPayment(baseCtx, { attempt: this.currentTest?.currentRetry() ?? 0 });
    });

    it("flaky inventory sync", async function () {
      this.timeout(30_000);
      await scenarioFlakyInventorySync(baseCtx, { attempt: this.currentTest?.currentRetry() ?? 0 });
    });

    it("retry then pass", async function () {
      this.timeout(30_000);
      await scenarioRetryThenPass(baseCtx, { attempt: this.currentTest?.currentRetry() ?? 0 });
    });
  });

  it("known failure (dashboard demo)", async function () {
    this.timeout(30_000);
    await scenarioKnownFailure(baseCtx);
  });
});

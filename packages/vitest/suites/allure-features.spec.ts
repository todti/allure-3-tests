import { describe, it } from "vitest";
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

const baseCtx = { framework: "vitest", runner: "node" as const };
const timeout = 30_000;

describe("Allure 3 extended showcase (Vitest)", () => {
  it("metadata baseline", async () => {
    await scenarioMetadataBaseline(baseCtx);
  }, timeout);

  it("deep nested steps", async () => {
    await scenarioDeepNestedSteps(baseCtx);
  }, timeout);

  it("attachment gallery", async () => {
    await scenarioAttachmentGallery(baseCtx);
  }, timeout);

  it("parameter matrix", async () => {
    await scenarioParameterMatrix(baseCtx);
  }, timeout);

  it("step statuses", async () => {
    await scenarioStepStatuses(baseCtx);
  }, timeout);

  it("async fan-out", async () => {
    await scenarioAsyncFanOut(baseCtx);
  }, timeout);

  it("behavior tree grouping", async () => {
    await scenarioBehavioralGrouping(baseCtx);
  }, timeout);

  describe("Flaky & retries", () => {
    it("flaky payment gateway", async () => {
      await scenarioFlakyPayment(baseCtx);
    }, { timeout, retry: 2 });

    it("flaky inventory sync", async () => {
      await scenarioFlakyInventorySync(baseCtx);
    }, { timeout, retry: 2 });

    it("retry then pass", async () => {
      await scenarioRetryThenPass(baseCtx);
    }, { timeout, retry: 2 });
  });

  it("known failure (dashboard demo)", async () => {
    await scenarioKnownFailure(baseCtx);
  }, timeout);
});

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

const baseCtx = { framework: "cypress", runner: "node" as const, skipHttpSmoke: true };

describe("Allure 3 extended showcase (Cypress)", () => {
  const run = (fn: () => Promise<void>) => {
    cy.then(async () => {
      await fn();
    });
  };

  it("metadata baseline", () => {
    run(() => scenarioMetadataBaseline(baseCtx));
    cy.visit("/");
    cy.title().should("include", "Playwright");
  });

  it("deep nested steps", () => run(() => scenarioDeepNestedSteps(baseCtx)));
  it("attachment gallery", () => run(() => scenarioAttachmentGallery(baseCtx)));
  it("parameter matrix", () => run(() => scenarioParameterMatrix(baseCtx)));
  it("step statuses", () => run(() => scenarioStepStatuses(baseCtx)));
  it("async fan-out", () => run(() => scenarioAsyncFanOut(baseCtx)));
  it("behavior tree grouping", () => run(() => scenarioBehavioralGrouping(baseCtx)));

  describe("Flaky & retries", () => {
    it("flaky payment gateway", () => run(() => scenarioFlakyPayment(baseCtx)));
    it("flaky inventory sync", () => run(() => scenarioFlakyInventorySync(baseCtx)));
    it("retry then pass", () => run(() => scenarioRetryThenPass(baseCtx)));
  });

  it("known failure (dashboard demo)", () => run(() => scenarioKnownFailure(baseCtx)));
});

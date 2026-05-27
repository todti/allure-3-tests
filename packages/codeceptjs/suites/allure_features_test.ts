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

const baseCtx = { framework: "codeceptjs", runner: "node" as const };

Feature("Allure 3 extended showcase (CodeceptJS)");

Before(async () => {
  await runHookAttachmentsForScenario("before", true);
});

After(async () => {
  await runHookAttachmentsForScenario("after", true);
});

Scenario("metadata baseline", async ({ I }) => {
  await scenarioMetadataBaseline(baseCtx);
  I.amOnPage("https://playwright.dev");
  I.seeInTitle("Playwright");
});

Scenario("deep nested steps", async () => {
  await scenarioDeepNestedSteps(baseCtx);
});

Scenario("attachment gallery", async () => {
  await scenarioAttachmentGallery(baseCtx);
});

Scenario("parameter matrix", async () => {
  await scenarioParameterMatrix(baseCtx);
});

Scenario("step statuses", async () => {
  await scenarioStepStatuses(baseCtx);
});

Scenario("async fan-out", async () => {
  await scenarioAsyncFanOut(baseCtx);
});

Scenario("behavior tree grouping", async () => {
  await scenarioBehavioralGrouping(baseCtx);
});

Scenario("flaky payment gateway", async () => {
  await scenarioFlakyPayment(baseCtx);
});

Scenario("flaky inventory sync", async () => {
  await scenarioFlakyInventorySync(baseCtx);
});

Scenario("retry then pass", async () => {
  await scenarioRetryThenPass(baseCtx);
});

Scenario("known failure (dashboard demo)", async () => {
  await scenarioKnownFailure(baseCtx);
});

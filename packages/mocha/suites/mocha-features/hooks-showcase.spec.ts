import { describe, it, before, beforeEach, after, afterEach } from "mocha";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "mocha", runner: "node" };

describe("Mocha · Lifecycle hooks", function () {
  this.timeout(30_000);

  let suiteStartTime: number;
  let testStartTime: number;

  before(async function () {
    suiteStartTime = Date.now();
    await allure.attachment("suite-before", `Suite started at ${new Date().toISOString()}`, ContentType.TEXT);
  });

  after(async function () {
    const elapsed = Date.now() - suiteStartTime;
    await allure.attachment("suite-after", `Suite finished, total elapsed: ${elapsed}ms`, ContentType.TEXT);
  });

  beforeEach(async function () {
    testStartTime = Date.now();
    await allure.attachment("test-before", `Test "${this.currentTest?.title}" starting`, ContentType.TEXT);
  });

  afterEach(async function () {
    const elapsed = Date.now() - testStartTime;
    const state = this.currentTest?.state ?? "unknown";
    await allure.attachment("test-after", `Test "${this.currentTest?.title}" ${state} in ${elapsed}ms`, ContentType.TEXT);
  });

  it("demonstrates before/beforeEach hook data in report", async function () {
    await applyFrameworkFeatureLabels(ctx, "Lifecycle hooks", "before/beforeEach/afterEach/after");

    await allure.step("Perform test logic", async () => {
      const session = { id: "sess-001", user: "demo", createdAt: new Date().toISOString() };
      await allure.attachment("session", JSON.stringify(session, null, 2), ContentType.JSON);
      await allure.parameter("session_id", session.id);
    });
  });

  it("uses this.retries() for flake tolerance", async function () {
    await applyFrameworkFeatureLabels(ctx, "Lifecycle hooks", "this.retries() mocha-native retry");
    this.retries(2);

    await allure.step("Operation that succeeds on any attempt", async () => {
      const result = { attempt: 1, ok: true };
      await allure.attachment("result", JSON.stringify(result), ContentType.JSON);
      await allure.parameter("ok", String(result.ok));
    });
  });

  it("shows this.timeout() override", async function () {
    await applyFrameworkFeatureLabels(ctx, "Lifecycle hooks", "this.timeout() per-test override");
    this.timeout(5_000);

    await allure.step("Short-running task with tight deadline", async () => {
      await new Promise((r) => setTimeout(r, 10));
      await allure.attachment("timing", "completed within 5s deadline", ContentType.TEXT);
    });
  });
});

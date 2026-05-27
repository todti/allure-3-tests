import AllureJasmineReporter from "allure-jasmine";
import { buildEnvironmentInfo, runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";
import { resolveRegisteredSpecFile } from "./spec-file-registry.mjs";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

const reporter = new AllureJasmineReporter({
  resultsDir,
  environmentInfo: buildEnvironmentInfo("jasmine"),
});

function applySpecFile(spec) {
  const filename = resolveRegisteredSpecFile(spec.description);
  if (filename) {
    spec.filename = filename;
  }
}

const originalSpecStarted = reporter.specStarted.bind(reporter);
reporter.specStarted = (spec) => {
  applySpecFile(spec);
  return originalSpecStarted(spec);
};

const originalSpecDone = reporter.specDone.bind(reporter);
reporter.specDone = (spec) => {
  applySpecFile(spec);
  return originalSpecDone(spec);
};

jasmine.getEnv().addReporter(reporter);

jasmine.getEnv().addReporter({
  jasmineStarted() {
    void runGlobalSetup({ framework: "jasmine", runner: "node" });
  },
  jasmineDone() {
    void runGlobalTeardown({ framework: "jasmine", runner: "node" });
  },
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30_000;

#!/usr/bin/env node
/**
 * Merge Allure dump archives, validate quality gates, and generate the HTML report.
 * See https://allurereport.org/docs/quality-gate/
 */
import { exit } from "node:process";
import {
  AllureReport,
  convertQualityGateResultsToTestErrors,
  readConfig,
  stringifyQualityGateResults,
} from "@allurereport/core";
import { glob } from "glob";
import { red } from "yoctocolors";

const cwd = process.cwd();
const dumpPattern = process.argv.find((arg) => arg.startsWith("--dump="))?.slice("--dump=".length) ?? "allure-dumps/*.zip";
const configPath = process.argv.find((arg) => arg.startsWith("--config="))?.slice("--config=".length) ?? "./allurerc.mjs";
const output = process.argv.find((arg) => arg.startsWith("--output="))?.slice("--output=".length) ?? "./allure-report";

const config = await readConfig(cwd, configPath, { output });

if (!config.qualityGate?.rules?.length) {
  console.error(red("Quality gate is not configured in Allure config."));
  console.error(red("Set qualityGate.rules in allurerc.mjs or unset ALLURE_DISABLE_QUALITY_GATE."));
  exit(1);
}

const dumpFiles = await glob(dumpPattern, {
  nodir: true,
  absolute: true,
  dot: true,
  windowsPathsNoEscape: true,
  cwd,
});

if (dumpFiles.length === 0) {
  console.error(red(`No dump archives found matching pattern: ${dumpPattern}`));
  exit(1);
}

console.info(`Restoring ${dumpFiles.length} dump archive(s) before quality gate validation…`);

const allureReport = new AllureReport(config);
await allureReport.restoreState(dumpFiles);
await allureReport.start();

const knownIssues = await allureReport.store.allKnownIssues();
const allTrs = await allureReport.store.allTestResults({ includeHidden: false });
const { results: qualityGateFailures } = await allureReport.validate({
  trs: allTrs,
  knownIssues,
});

if (qualityGateFailures.length > 0) {
  allureReport.realtimeDispatcher.sendQualityGateResults(qualityGateFailures);
  for (const error of convertQualityGateResultsToTestErrors(qualityGateFailures)) {
    allureReport.realtimeDispatcher.sendGlobalError(error);
  }
  console.error(stringifyQualityGateResults(qualityGateFailures));
} else {
  console.info("Quality gate validation passed.");
}

await allureReport.done();

exit(qualityGateFailures.length > 0 ? 1 : 0);

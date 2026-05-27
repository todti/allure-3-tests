import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveHostName } from "@allure-tests/shared";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";
const collection = path.join(__dirname, "collections/demo.postman_collection.json");
const runtimeCollection = path.join(__dirname, ".collection.runtime.json");
const newmanBin = path.join(__dirname, "node_modules/newman/bin/newman.js");
const osName = resolveHostName();

writeFileSync(
  runtimeCollection,
  readFileSync(collection, "utf8").replaceAll("{{ALLURE_OS}}", osName),
);

const result = spawnSync(
  process.execPath,
  [
    newmanBin,
    "run",
    runtimeCollection,
    "-r",
    "cli,allure",
    "--reporter-allure-resultsDir",
    path.resolve(__dirname, resultsDir),
  ],
  {
    stdio: "inherit",
    cwd: __dirname,
    env: process.env,
  },
);

process.exit(result.status ?? 1);

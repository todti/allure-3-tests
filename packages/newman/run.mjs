import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEnvironmentInfo } from "@allure-tests/shared";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";
const collection = path.join(__dirname, "collections/demo.postman_collection.json");
const newmanBin = path.join(__dirname, "node_modules/newman/bin/newman.js");

const result = spawnSync(
  process.execPath,
  [
    newmanBin,
    "run",
    collection,
    "-r",
    "cli,allure",
    "--reporter-allure-resultsDir",
    path.resolve(__dirname, resultsDir),
    "--reporter-allure-environmentInfo",
    JSON.stringify(buildEnvironmentInfo("newman")),
  ],
  {
    stdio: "inherit",
    cwd: __dirname,
    env: process.env,
  },
);

process.exit(result.status ?? 1);

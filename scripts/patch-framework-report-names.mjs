#!/usr/bin/env node
/**
 * Allure Awesome plugin currently injects the global config `name` into every
 * per-framework report title. Patch generated HTML/history to use framework names.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FRAMEWORK_REPORT_NAMES } from "@allure-tests/shared";

const reportDir = process.argv[2] ?? "./allure-report";

function patchJsonName(filePath, reportName) {
  const payload = JSON.parse(readFileSync(filePath, "utf8"));
  if ("name" in payload) {
    payload.name = reportName;
    writeFileSync(filePath, `${JSON.stringify(payload)}\n`, "utf8");
  }
}

for (const [framework, reportName] of Object.entries(FRAMEWORK_REPORT_NAMES)) {
  const dir = join(reportDir, `awesome-${framework}`);
  const indexPath = join(dir, "index.html");

  try {
    readFileSync(indexPath);
  } catch {
    continue;
  }

  let html = readFileSync(indexPath, "utf8");
  html = html.replace(/<title>.*?<\/title>/, `<title> ${reportName} </title>`);
  html = html.replace(/"reportName":"[^"]*"/, `"reportName":${JSON.stringify(reportName)}`);
  writeFileSync(indexPath, html, "utf8");

  const historyDir = join(dir, "data", "history");
  try {
    for (const file of readdirSync(historyDir)) {
      if (file.endsWith(".json")) {
        patchJsonName(join(historyDir, file), reportName);
      }
    }
  } catch {
    // no history yet
  }

  console.log(`Patched report title: awesome-${framework} -> ${reportName}`);
}

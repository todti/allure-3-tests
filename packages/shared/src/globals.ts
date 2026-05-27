import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import type { ShowcaseContext } from "./types.js";

export type GlobalPhase = "setup" | "teardown";

function globalArtifactsDir(framework: string): string {
  const base = process.env.ALLURE_GLOBAL_DIR ?? "allure-global";
  const dir = path.resolve(base, framework);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function writeGlobalFile(framework: string, name: string, body: string): string {
  const filePath = path.join(globalArtifactsDir(framework), name);
  fs.writeFileSync(filePath, body, "utf8");
  return filePath;
}

export function writeGlobalArtifacts(framework: string, phase: GlobalPhase): {
  jsonPath: string;
  logPath: string;
  gatePath: string;
} {
  const payload = {
    framework,
    phase,
    node: process.version,
    platform: os.platform(),
    arch: os.arch(),
    cwd: process.cwd(),
    timestamp: new Date().toISOString(),
    ci: Boolean(process.env.CI),
    runId: process.env.GITHUB_RUN_ID ?? "local",
  };

  const jsonPath = writeGlobalFile(framework, `${phase}-context.json`, JSON.stringify(payload, null, 2));
  const logPath = writeGlobalFile(
    framework,
    `${phase}-runner.log`,
    [
      `[${framework}] ${phase} started`,
      `node=${process.version}`,
      `platform=${os.platform()}/${os.arch()}`,
      `memory=${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
    ].join("\n"),
  );
  const gatePath = writeGlobalFile(
    framework,
    "quality-gate-profile.json",
    JSON.stringify(
      {
        framework,
        profile: `gate-${framework}`,
        maxFailures: 2,
        minTestsCount: 12,
        successRate: 0.75,
      },
      null,
      2,
    ),
  );

  return { jsonPath, logPath, gatePath };
}

async function emitGlobalRuntimeMessages(framework: string, phase: GlobalPhase): Promise<void> {
  const artifacts = writeGlobalArtifacts(framework, phase);

  await allure.globalAttachment(
    `${framework}-${phase}-context`,
    fs.readFileSync(artifacts.jsonPath, "utf8"),
    ContentType.JSON,
  );
  await allure.globalAttachmentPath(`${framework}-${phase}-log`, artifacts.logPath, ContentType.TEXT);
  await allure.globalAttachmentPath(`${framework}-${phase}-context-file`, artifacts.jsonPath, ContentType.JSON);

  if (phase === "setup") {
    await allure.globalError({
      message: `[${framework}] Demo global warning: shared config cache is stale`,
      trace: [
        "GlobalSetupWarning: simulated infrastructure notice (non-fatal demo)",
        `    at runGlobalSetup (${framework})`,
      ].join("\n"),
    });
    await allure.globalError({
      message: `[${framework}] Demo global notice: quality gate telemetry enabled`,
      trace: "QualityGateBootstrap: collecting framework-scoped metrics before tests start",
    });
  } else {
    await allure.globalError({
      message: `[${framework}] Demo global info: teardown completed with pending dashboard sync`,
      trace: "GlobalTeardownInfo: background upload queue drained",
    });
  }
}

/** Writes files for allurerc `globalAttachments` (works without Allure runtime). */
export function runGlobalSetupFiles(ctx: Pick<ShowcaseContext, "framework">): void {
  writeGlobalArtifacts(ctx.framework, "setup");
}

export function runGlobalTeardownFiles(ctx: Pick<ShowcaseContext, "framework">): void {
  writeGlobalArtifacts(ctx.framework, "teardown");
}

/** Uses globals runtime API — call from framework hooks after Allure reporter is active. */
export async function runGlobalSetup(ctx: Pick<ShowcaseContext, "framework" | "runner">): Promise<void> {
  await emitGlobalRuntimeMessages(ctx.framework, "setup");
}

export async function runGlobalTeardown(ctx: Pick<ShowcaseContext, "framework" | "runner">): Promise<void> {
  await emitGlobalRuntimeMessages(ctx.framework, "teardown");
}

import * as fs from "node:fs";
import * as path from "node:path";

const attemptCache = new Map<string, number>();

/** Combines in-process retry counter with persisted attempts across reruns. */
export function resolveAttempt(testId: string, runtimeAttempt = 0): number {
  const fromRuntime = runtimeAttempt + 1;
  const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";
  const marker = path.join(resultsDir, `.flaky-${testId}.attempt`);

  let persisted = 0;
  try {
    persisted = Number.parseInt(fs.readFileSync(marker, "utf8"), 10) || 0;
  } catch {
    persisted = 0;
  }

  const attempt = Math.max(fromRuntime, persisted + 1);
  attemptCache.set(testId, attempt);

  fs.mkdirSync(resultsDir, { recursive: true });
  fs.writeFileSync(marker, String(attempt));

  return attempt;
}

export function randomRoll(seedSuffix: string): number {
  const seed = `${seedSuffix}:${Date.now()}:${Math.random()}`;
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return (hash % 10_000) / 10_000;
}

export function shouldSimulateTransientFailure(
  testId: string,
  runtimeAttempt: number,
  failUntilAttempt: number,
  randomFailRate = 0,
): boolean {
  const attempt = resolveAttempt(testId, runtimeAttempt);

  if (attempt < failUntilAttempt) {
    return true;
  }

  if (randomFailRate > 0 && randomRoll(`${testId}:${attempt}`) < randomFailRate) {
    return true;
  }

  return false;
}

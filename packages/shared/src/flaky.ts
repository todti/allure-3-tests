const attemptCache = new Map<string, number>();

/** Tracks flaky attempts in-process (works in Node runners and Cypress browser bundles). */
export function resolveAttempt(testId: string, runtimeAttempt = 0): number {
  const fromRuntime = runtimeAttempt + 1;
  const cached = attemptCache.get(testId) ?? 0;
  const attempt = Math.max(fromRuntime, cached + 1);
  attemptCache.set(testId, attempt);
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

  const effectiveRandomFailRate = process.env.CI ? 0 : randomFailRate;
  if (effectiveRandomFailRate > 0 && randomRoll(`${testId}:${attempt}`) < effectiveRandomFailRate) {
    return true;
  }

  return false;
}

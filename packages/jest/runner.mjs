import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

function resolveJestBin() {
  const candidates = [
    path.join(packageRoot, "node_modules/jest/bin/jest.js"),
    path.join(packageRoot, "../../node_modules/jest/bin/jest.js"),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error("Unable to locate jest binary");
}

const result = spawnSync(
  process.execPath,
  ["--experimental-vm-modules", resolveJestBin()],
  {
    stdio: "inherit",
    env: process.env,
    cwd: packageRoot,
  },
);

process.exit(result.status ?? 1);

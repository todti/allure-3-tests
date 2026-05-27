import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BEGIN = "<!-- ALLURE_REPORTS:BEGIN -->";
const END = "<!-- ALLURE_REPORTS:END -->";

const LINKS = [
  { dir: "", label: "Summary" },
  { dir: "awesomeAll", label: "All tests" },
  { dir: "dashboard", label: "Dashboard" },
];

async function main() {
  const baseUrl = process.env.PAGES_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    throw new Error("PAGES_BASE_URL is required");
  }

  const reportDir = path.join(root, "allure-report");
  const entries = await readdir(reportDir, { withFileTypes: true });
  const available = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));

  const lines = LINKS.filter(({ dir }) => dir === "" || available.has(dir)).map(({ dir, label }) => {
    const href = dir ? `${baseUrl}/${dir}/` : `${baseUrl}/`;
    return `- [${label}](${href})`;
  });

  const generated = [
    BEGIN,
    "",
    ...lines,
    "",
    "Per-framework reports: open **Summary** — it links to each generated view.",
    END,
  ].join("\n");

  const readmePath = path.join(root, "README.md");
  const readme = await readFile(readmePath, "utf8");

  if (!readme.includes(BEGIN) || !readme.includes(END)) {
    throw new Error(`README.md must contain ${BEGIN} and ${END}`);
  }

  const updated = readme.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), generated);
  await writeFile(readmePath, updated);
}

await main();

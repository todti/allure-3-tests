import { glob } from "glob";
import Mocha from "mocha";
import { fileURLToPath } from "node:url";
import { buildEnvironmentInfo, runGlobalTeardown } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";
const framework = process.env.ALLURE_FRAMEWORK ?? "mocha";

const mocha = new Mocha({
  reporter: "allure-mocha",
  retries: 2,
  reporterOptions: {
    resultsDir,
    environmentInfo: buildEnvironmentInfo("mocha"),
  },
});

mocha.addFile(fileURLToPath(new URL("./hooks/globals.mjs", import.meta.url)));

for (const file of glob.sync("suites/**/*.spec.{js,mjs,ts}")) {
  mocha.addFile(file);
}

await mocha.loadFilesAsync();
mocha.run(async (failures) => {
  await runGlobalTeardown({ framework, runner: "node" });
  process.exit(failures ? 1 : 0);
});

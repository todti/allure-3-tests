import { glob } from "glob";
import Mocha from "mocha";
import { buildEnvironmentInfo, runGlobalTeardown } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";
const framework = "bun";

const mocha = new Mocha({
  reporter: "allure-mocha",
  retries: 2,
  reporterOptions: {
    resultsDir,
    environmentInfo: buildEnvironmentInfo("bun", {
      Runner: "bun",
    }),
  },
});

mocha.addFile(new URL("./hooks/globals.mjs", import.meta.url).pathname);

for (const file of glob.sync("suites/**/*.spec.{js,mjs,ts}")) {
  mocha.addFile(file);
}

await mocha.loadFilesAsync();
mocha.run(async (failures) => {
  await runGlobalTeardown({ framework, runner: "bun" });
  process.exit(failures ? 1 : 0);
});

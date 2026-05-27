import { glob } from "glob";
import Mocha from "mocha";
import { buildEnvironmentInfo, runGlobalSetupFiles, runGlobalTeardownFiles } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";
const framework = process.env.ALLURE_FRAMEWORK ?? "mocha";

runGlobalSetupFiles({ framework });

const mocha = new Mocha({
  reporter: "allure-mocha",
  retries: 2,
  reporterOptions: {
    resultsDir,
    environmentInfo: buildEnvironmentInfo("mocha"),
  },
});

mocha.addFile(new URL("./hooks/globals.mjs", import.meta.url).pathname);

for (const file of glob.sync("suites/**/*.spec.{js,mjs,ts}")) {
  mocha.addFile(file);
}

await mocha.loadFilesAsync();
mocha.run((failures) => {
  runGlobalTeardownFiles({ framework });
  process.exit(failures ? 1 : 0);
});

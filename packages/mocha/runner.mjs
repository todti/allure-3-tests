import { glob } from "glob";
import Mocha from "mocha";
import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

const mocha = new Mocha({
  reporter: "allure-mocha",
  retries: 2,
  reporterOptions: {
    resultsDir,
    environmentInfo: {
      framework: "mocha",
      node_version: process.version,
      os_platform: os.platform(),
    },
  },
});

for (const file of glob.sync("suites/**/*.spec.{js,mjs,ts}")) {
  mocha.addFile(file);
}

await mocha.loadFilesAsync();
mocha.run((failures) => process.exit(failures ? 1 : 0));

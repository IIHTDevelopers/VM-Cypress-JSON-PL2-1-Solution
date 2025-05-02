const { defineConfig } = require("cypress");
const CustomReporter = require("./custom-reporter"); // Adjust the path as needed
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  retries : 2,
  reporterOptions: {
    charts: true,
    reportPageTitle: "Yaksha Automation Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Attach mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      const reporter = new CustomReporter();

      // Custom Reporter Events
      on("after:spec", async (spec, results) => {
        if (results && results.tests) {
          for (const test of results.tests) {
            const status = test.state; // 'passed', 'failed', or 'skipped'
            const error = test.displayError || "";
            await reporter.logTestResult(test, status, error);
          }
        }
      });

      on("after:run", async () => {
        await reporter.onEnd();
      });

      // 🧹 Custom task to delete a specific file before download
      on("task", {
        deleteFile(filePath) {
          const fullPath = path.resolve(filePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`🗑️ Deleted existing file: ${fullPath}`);
          } else {
            console.log(`⚠️ File not found, skipping delete: ${fullPath}`);
          }
          return null;
        },
      });

      // ✅ Force Chrome to download to cypress/TestImage folder
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.preferences.default = {
            download: {
              default_directory: path.resolve("cypress/TestImage"),
              prompt_for_download: false,
              directory_upgrade: true,
            },
          };
        }
        return launchOptions;
      });

      return config;
    },
    defaultCommandTimeout: 120000,
  },
});

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        deleteFile(filePath) {
          if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
            return null;
          } else {
            return `File not found or not a file: ${filePath}`;
          }
        },
      });
    },
    // other Cypress config options...
  },
});

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        listDownloads() {
          const downloadDir = path.join(__dirname, "cypress", "downloads");
          if (fs.existsSync(downloadDir)) {
            return fs.readdirSync(downloadDir); // returns array of file names
          }
          return [];
        },
      });
    },
  },
};

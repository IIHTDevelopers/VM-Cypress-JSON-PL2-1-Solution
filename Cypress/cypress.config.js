const { defineConfig } = require('cypress');


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    
    setupNodeEvents(on, config) {
      // Register Mochawesome plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // Register custom task
      on('task', {
        logMessage(message) {
          console.log('LOG FROM TEST:', message);
          return null;
        }
      });

      return config;
    },
  },
});
// This configuration sets up Cypress with Mochawesome reporter for generating test reports.
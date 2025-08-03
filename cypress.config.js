const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,

  reporter: 'cypress-mochawesome-reporter',
  video: true,

  reporterOptions: {
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    saveAllAttempts: false,
    html: true,
    overwrite: true,
    timestamp: 'dd/mm/yyyy HH:MM:ss',
    reportDir: 'cypress/reports/mochawesome-report',
    screenshotsFolder: 'cypress/reports/mochawesome-report/assets',
  },
  

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return on ('file:preprocessor', cucumber())

      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile:false
  },
});
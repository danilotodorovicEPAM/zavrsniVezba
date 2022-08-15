const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      "validEmail": "danilo.todorovic@vivifyideas.com",
      "validPassword": "test1234"  
    },
    baseUrl: 'https://gallery-app.vivifyideas.com'
  },
});

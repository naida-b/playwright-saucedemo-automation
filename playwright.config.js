const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,

  expect: {
    timeout: 10_000,
  },

  reporter: 'html',

  use: {
    baseURL: 'https://www.saucedemo.com',
    browserName: 'chromium',
    headless: true,
    screenshot : 'only-on-failure',
    trace: 'only-on-failure',
  },
});
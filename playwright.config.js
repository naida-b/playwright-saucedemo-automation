import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  //wait for components - default 30 seconds - check playwright docs
  timeout: 30 *1000,
  //wait for assertion validations
    expect : {
      timeout: 5000
    },
  reporter: 'html',  
  use: {
    browserName: 'chromium',
    headless: false
    
    
  },
});

module.exports = config;
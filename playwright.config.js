// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import * as dotenv from 'dotenv'
import * as fs from 'fs';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// Load environment variables from .env file
dotenv.config();

const env = process.env.ENV || 'production';
const envFile = `.env.${env}`;

// Check if the environment-specific file exists and load it
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  throw new Error(`Environment file ${envFile} not found`);
}

module.exports = defineConfig({
  timeout: 60000, // Global test timeout
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 4,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://api.zluri.com',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Collect trace when test fails
    trace: 'on-first-retry',
    
    // Record video and screenshot on failure
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ],
        }
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          firefoxUserPrefs: {
            'toolkit.telemetry.enabled': false,
          },
        }
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
      },
    }
  ],
  
  
  // Output folders for artifacts
  outputDir: 'test-results/',
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],
});

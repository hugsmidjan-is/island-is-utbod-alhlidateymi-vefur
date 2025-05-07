import type {
  PlaywrightTestConfig,
  ReporterDescription,
} from '@playwright/test'

import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 20000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ...((process.env.CI
      ? [
          ['line'],
          [
            'playwright-tesults-reporter',
            {
              'tesults-target': process.env.TESULTS_TOKEN,
              'tesults-build-name': process.env.COMMIT_INFO,
              'tesults-build-result': 'pass',
              'tesults-build-reason': 'Always succeed 💯',
              'tesults-build-description': process.env.COMMIT_INFO_MESSAGE,
            },
          ],
        ]
      : [['dot']]) as ReporterDescription[]),
    ['html', { open: 'never' }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4242',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure our test targets */
  projects: [
    {
      name: 'everything',
      testMatch: 'tests/*.spec.[tj]s',
      use: {
        browserName: 'chromium',
        channel: 'chrome', // Use the latest installed Chrome/Chromium
        headless: true,
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'dist/test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
}

export default config

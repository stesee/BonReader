import { test, expect } from '@playwright/test';

// Used hints from https://blog.jarrodwatts.com/how-to-set-up-nextjs-with-jest-react-testing-library-and-playwright to integrate playwright tests into existing project with jstest... main hint was to use the playwright wizard, dont forge to restart vs code and use https://marketplace.visualstudio.com/items?itemName=sakamoto66.vscode-playwright-test-runner

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle("BonReader");
});

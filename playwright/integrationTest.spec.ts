import { test, expect, chromium } from "@playwright/test";
import { waitFor } from "@testing-library/dom";

// Used hints from https://blog.jarrodwatts.com/how-to-set-up-nextjs-with-jest-react-testing-library-and-playwright to integrate playwright tests into existing project with jstest... main hint was to use the playwright wizard, dont forge to restart vs code and use https://marketplace.visualstudio.com/items?itemName=sakamoto66.vscode-playwright-test-runner

test("basic test", async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("BonReader");
});

test.describe('chromium only', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Test setup for fake webcam is chrome only');

test("should scan", async ({ page }) => {
  await page.goto('/');
 
  const locator = page.locator("div#sum");
  await locator.waitFor();
  while ((await locator.innerText()) == "" ) {
    // wait till inner text appears
  }

  await expect(locator).toHaveText("🤑 11,10");
});
});

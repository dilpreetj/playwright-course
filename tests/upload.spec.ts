import { test, expect } from '@playwright/test';
const path = require('path');

test.describe('Upload File', () => {
  test('should upload a test file', async ({ page }) => {
    // Open url
    await page.goto("https://practice.automationbro.com/cart/");

    // provide test file path
    const filePath = path.join(__dirname, '../data/logotitle.png');
    
    // upload test file
    await page.setInputFiles('input#upfile_1', filePath);

    // click the submit button
    await page.locator('#upload_1').click();

    // assertion
    await expect(page.locator('#wfu_messageblock_header_1_1'))
      .toContainText('uploaded successfully');
  })

  test('should upload a test file on a hidden input field', async ({ page }) => {
    // Open url
    await page.goto("https://practice.automationbro.com/cart/");

    // provide test file path
    const filePath = path.join(__dirname, '../data/logotitle.png');
    
    // DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector('input#upfile_1');
      if (selector) {
        selector.className = ''
      }
    })

    // upload test file
    await page.setInputFiles('input#upfile_1', filePath); // throws error

    // click the submit button
    await page.locator('#upload_1').click();

    // assertion
    await expect(page.locator('#wfu_messageblock_header_1_1'))
      .toContainText('uploaded successfully');
  })
})

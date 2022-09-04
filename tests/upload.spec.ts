import { test, expect } from '@playwright/test';
import CartPage from '../pages/cart.page';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

test.describe('Upload File', () => {
  let cartPage: CartPage;

  const fileName = ['logotitle.png', '3mb-file.pdf']

  for (const name of fileName) {
    test(`should upload a ${name} file`, async ({ page }) => {
      cartPage = new CartPage(page);
  
      // Open url
      await page.goto("https://practice.automationbro.com/cart/");
  
      // provide test file path
      const filePath = path.join(__dirname, `../data/${name}`);
      
      // upload test file
      cartPage.uploadComponent().uploadFile(filePath);
  
      // assertion
      await expect(cartPage.uploadComponent().successTxt)
        .toContainText('uploaded successfully', {timeout: 10000});
    })
  }

  

  test.skip('should upload a test file on a hidden input field', async ({ page }) => {
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

import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
  let homePage;

  test('Open HomePage and verify title', async ({ page }) => {
    homePage = new HomePage(page);

    // open url
    await page.goto('https://practice.automationbro.com/');

    // verify title
    await expect(page).toHaveTitle('E-Commerce Site – Automation Bro');
  })

  test('Open About page and verify title', async ({ page }) => {
    // open url
    await page.goto('https://practice.automationbro.com/about');

    // verify title
    await expect(page).toHaveTitle('About – Practice E-Commerce Site');
  })

  test('Click get started button using CSS Selector', async ({ page }) => {
    // open url
    await page.goto('https://practice.automationbro.com');
    
    await expect(page).not.toHaveURL(/.*#get-started/);

    // click the button
    await page.locator('#get-started').click();

    // verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  })

  test('Verify heading text is visible using text selector', async ({ page }) => {
    // open url
    await page.goto('https://practice.automationbro.com');

    // find the text locator
    const headingText = page.locator('text=Think different. Make different.')

    // verify heading text is visible
    await expect(headingText).not.toBeHidden();
    await expect(headingText).toBeVisible();
  })

  test('Verify home link is enabled using text and css selector', async ({ page }) => {
    // open url
    await page.goto('https://practice.automationbro.com');

    // find the home text
    // const homeText = await page.locator('#primary-menu >> text=Home')
    const homeText = page.locator('#primary-menu:has-text("Home")')

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  })

  test('Verify search icon is visible using xpath selector', async ({ page }) => {
    // open url
    await page.goto('https://practice.automationbro.com');

    // find the search icon
    const searchIcon = page.locator('//*[@id="primary-menu"]//*[@class="tg-icon tg-icon-search"]')

    // verify search icon is visible
    await expect(searchIcon).toBeVisible();
  })

  test('Verify text of all nav links', async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    // open url
    await page.goto('https://practice.automationbro.com');

    // find the nav links
    const navLinks = page.locator('#primary-menu li[id*=menu]')

    // print out all the links
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent());
    }

    // verify nav links text
    // expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);
  })
})

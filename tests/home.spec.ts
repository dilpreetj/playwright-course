import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate()
  })

  test('Open HomePage and verify title', async ({ page }) => {
    // verify title
    await expect(page).toHaveTitle('Practice E-Commerce Site – Automation Bro');
  })

  test.skip('Open About page and verify title', async ({ page }) => {
    // open url
    await page.goto('https://practice.automationbro.com/about');

    // verify title
    await expect(page).toHaveTitle('About – Practice E-Commerce Site');
  })

  test('Click get started button using CSS Selector', async ({ page }) => {
    await expect(page).not.toHaveURL(/.*#get-started/);

    // click the button
    await homePage.getStartedBtn.click()
    
    // verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  })

  test('Verify heading text is visible using text selector', async ({ page }) => {
    // find the text locator
    const headingText = await homePage.headingText

    // verify heading text is visible
    await expect(headingText).not.toBeHidden();
    await expect(headingText).toBeVisible();
  })

  test('Verify home link is enabled using text and css selector', async ({ page }) => {
    // find the home text
    const homeText = await homePage.homeLink

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  })

  test('Verify search icon is visible using xpath selector', async ({ page }) => {
    // find the search icon
    const searchIcon = await homePage.searchIcon

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

    // verify nav links text
    expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
  })
})

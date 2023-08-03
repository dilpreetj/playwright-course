import { test, expect, APIRequestContext } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import { faker } from '@faker-js/faker';

test.describe('Contact', () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/'
    });

    const response = await fakerApi.get('users');
    console.log(await response.json());
  })


  test('Fill contact form and verify success message', async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate()

    //  fill out the input fields and submit
    await contactPage.submitForm(faker.name.findName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));

    // verify success message
    await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
  })
})

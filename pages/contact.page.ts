import { Locator, Page } from '@playwright/test';

class ContactPage {
  private page: Page;
  nameInput: Locator;
  emailInput: Locator;
  phoneInput: Locator;
  messageTextArea: Locator;
  submitBtn: Locator;
  successTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('.contact-name input')
    this.emailInput = page.locator('.contact-email input')
    this.phoneInput = page.locator('.contact-phone input')
    this.messageTextArea = page.locator('.contact-message textarea')
    this.submitBtn = page.locator('button[type=submit]')
    this.successTxt = page.locator('div[role="alert"]')
  }

  async navigate() {
    await this.page.goto('/contact');
  }

  async submitForm(name: string, email: string, phone: string, message: string) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.phoneInput.fill(phone)
    await this.messageTextArea.fill(message)
    await this.submitBtn.click()
  }
}

export default ContactPage;
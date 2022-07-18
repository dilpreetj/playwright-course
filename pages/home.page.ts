class HomePage {
  page: any;
  getStartedBtn: any;
  headingText: any;
  homeLink: any;
  searchIcon: any;
  navLinks: any;
  
  constructor(page) {
    this.page = page;
    this.getStartedBtn = page.locator('#get-started')
    this.headingText = page.locator('text=Think different. Make different.')
    this.homeLink = page.locator('#primary-menu:has-text("Home")')
    this.searchIcon = page.locator('//*[@id="primary-menu"]//*[@class="tg-icon tg-icon-search"]')
    this.navLinks = page.locator('#primary-menu li[id*=menu]')
  }
}

export default HomePage;
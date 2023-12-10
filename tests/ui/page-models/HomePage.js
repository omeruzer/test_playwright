// page-models/HomePage.js
class HomePage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.grimelange.com.tr/');
  }

  async closePopup() {
    await this.page.locator('.persona-popup-close').click();
  }

  async hoverOverCategory(categoryName) {
    const categoryLink = await this.page.getByRole('link', { name: categoryName, exact: true }).first();
    await categoryLink.hover();
    await this.page.waitForTimeout(500);
  }

  async goToSubCategory(subCategoryName) {
    await this.page.getByRole('link', { name: subCategoryName, exact: true }).click();
    await this.page.waitForTimeout(500);
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = HomePage;

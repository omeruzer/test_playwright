const { expect } = require("@playwright/test");

// page-models/ProductPage.js
class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async selectSortingOption(optionValue) {
    const selectbox = await this.page.locator('#filterOrderSelect');
    await selectbox.selectOption(optionValue);
    await this.page.waitForTimeout(500);
    await expect(selectbox).toHaveValue(optionValue);
  }

  async selectRandomProduct() {
    const productCount = await this.page.locator('.productItem').count();
    const randomProductIndex = Math.floor(Math.random() * productCount);
    const productToClick = await this.page.locator('.productItem').nth(randomProductIndex);
    await productToClick.click();
    await this.page.waitForTimeout(500);
  }

  async selectRandomColor() {
    const colorCount = await this.page.locator('.ulUrunSlider .productItem').count();
    const randomColorIndex = Math.floor(Math.random() * colorCount);
    const colorToClick = await this.page.locator('.productItem').nth(randomColorIndex);
    await colorToClick.click();
    await this.page.waitForTimeout(500);
  }
  async addCart() {
    await this.page.getByRole('button', { name: 'Sepete Ekle', exact: true }).click();

  }

}

module.exports = ProductPage;

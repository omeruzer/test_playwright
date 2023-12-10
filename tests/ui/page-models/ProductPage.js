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
  
  async selectRandomSize() {
    await this.page.waitForTimeout(1000);
    const containerDiv = await this.page.$('.eksecenekLine.kutuluvaryasyon');

    // Container içindeki '.size_box' sınıfına sahip öğeleri seç
    const sizeElements = await containerDiv.$$('.size_box');

    // 'data-stock' özniteliği 0'dan büyük olan öğeleri filtrele
    const validSizeElements = [];
    for (const sizeElement of sizeElements) {
      const dataStock = await sizeElement.getAttribute('data-stock');
      if (dataStock && parseInt(dataStock) > 0) {
        validSizeElements.push(sizeElement);
      }
    }

    // Eğer geçerli öğeler varsa rastgele birini seç
    if (validSizeElements.length > 0) {
      const randomIndex = Math.floor(Math.random() * validSizeElements.length);
      const selectedSizeElement = validSizeElements[randomIndex];

      await selectedSizeElement.click();
    } else {
      console.error('Uygun beden bulunamadı veya stokta yok.');
    }

  }

  async addCart() {
    await this.page.getByRole('button', { name: 'Sepete Ekle', exact: true }).click();

  }

}

module.exports = ProductPage;

const { expect } = require("@playwright/test");

// page-models/CartPage.js
class CartPage {
    constructor(frame) {
      this.frame = frame;
    }
  
    async getCartItemPrice() {
      const cartItemPriceElement = await this.frame.$('.sepetItemB3_2');
      return cartItemPriceElement.innerText();
    }
  
    async increaseQuantity() {
      const inputElement = await this.frame.$('input[type="number"]');
      const oldQuantity = await inputElement.inputValue();
      const newQuantity = parseInt(oldQuantity) + 1;
      await inputElement.fill(newQuantity.toString());
      await expect((parseInt(oldQuantity) + 1).toString()).toBe(newQuantity.toString());
    }
  
    async updateQuantity() {
      const updateButton = await this.frame.$('a.AdetGuncelle');
      await updateButton.click();
      await this.frame.waitForTimeout(2000);
    }
  
    async getCartItemNewPrice() {
      const cartItemNewPriceElement = await this.frame.$('span.sepetItemB4_2');
      return cartItemNewPriceElement.innerText();
    }
  
    async clearCart() {
      await this.frame.getByRole('link', { name: 'Sepeti Temizle' }).click();
      await this.frame.waitForTimeout(2000);
      await this.frame.getByRole('button', { name: 'Evet' }).click();
      await this.frame.waitForTimeout(3000);
    }
  }
  
  module.exports = CartPage;
  
// @ts-check
const { test, expect } = require('@playwright/test');
const HomePage = require('./page-models/HomePage');
const ProductPage = require('./page-models/ProductPage');
const CartPage = require('./page-models/CartPage');

test('UI Case', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.closePopup();
  await homePage.hoverOverCategory('ERKEK');
  await homePage.goToSubCategory('Pantolon');
  await expect(await homePage.getCurrentUrl()).toBe('https://www.grimelange.com.tr/pantolon');

  await productPage.selectSortingOption('2');
  await productPage.selectRandomProduct();
  await productPage.selectRandomColor();
  await productPage.addCart();

  const iframeElement = await page.waitForSelector('.fancybox-iframe');
  const frame = await iframeElement.contentFrame();
  const cartPage = new CartPage(frame);

  const productPrice = await cartPage.getCartItemPrice();
  await cartPage.increaseQuantity();
  await cartPage.updateQuantity();

  const cartItemNewPrice = await cartPage.getCartItemNewPrice();
  await expect(productPrice).not.toBe(cartItemNewPrice);

  await cartPage.clearCart();
});
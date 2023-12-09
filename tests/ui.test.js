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

// const { test, expect } = require('@playwright/test');


// test('UI Case', async ({ page }) => {

//   await page.goto('https://www.grimelange.com.tr/');

//   // modalı kapat
//   await page.locator('.persona-popup-close').click()

//   // erkek menüsünün üstüne hover yap ve pantolon sayfasına git
//   await page.waitForTimeout(500);
//   const erkekLink = await page.getByRole('link', { name: 'ERKEK', exact: true }).first();
//   await erkekLink.hover()
//   await page.waitForTimeout(500);

//   // // await erkekLink.waitFor('a:has-text("Pantolon")');
//   await page.getByRole('link', { name: 'Pantolon', exact: true }).click();

//   await page.waitForTimeout(500);

//   // url'i kontrol et
//   const currentUrl = page.url()
//   await expect(currentUrl).toBe('https://www.grimelange.com.tr/pantolon');

//   // sıralama select'ini al ve değerini "fiyata göre (artan)" yap ve değerini kontrol et
//   const selectbox = await page.locator('#filterOrderSelect');
//   await selectbox.selectOption('2')
//   await expect(selectbox).toHaveValue('2')

//   await page.waitForTimeout(500);

//   // rastgele bir ürün seç ve o ürüne git
//   const productCount = await page.locator('.productItem').count();
//   const randomProductIndex = Math.floor(Math.random() * productCount);
//   const productToClick = await page.locator(`.productItem`).nth(randomProductIndex);
//   await productToClick.click();

//   await page.waitForTimeout(500);

//   // rastgele bir renk seç
//   const colorCount = await page.locator('.ulUrunSlider .productItem').count();
//   const randomColorIndex = Math.floor(Math.random() * colorCount);
//   const colorToClick = await page.locator(`.productItem`).nth(randomColorIndex);
//   await colorToClick.click();

//   await page.waitForTimeout(500);

//   //rastgele beden seç
//   const sizeBox = await page.$('.kutuluvaryasyon');
//   const sizeElements = await sizeBox.$$('.size_box');

//   // 'data-stock' değeri 0'dan büyük olanları al ve rastgele birini seç
//   const validSizeElements = [];
//   for (const sizeElement of sizeElements) {
//     const dataStock = await sizeElement.getAttribute('data-stock');
//     if (dataStock && parseInt(dataStock) > 0) {
//       validSizeElements.push(sizeElement);
//     }
//   }

//   const randomIndex = await Math.floor(Math.random() * validSizeElements.length);
//   const selectedSizeElement = await validSizeElements[randomIndex];
//   await selectedSizeElement.click();

//   await page.waitForTimeout(500);

//   // Ürünün Fiyatını Al
//   const productPriceElement = await page.locator('#fiyat2')
//   const productPrice = await productPriceElement.innerText();

//   // Sepete Ekle
//   await page.getByRole('button', { name: 'Sepete Ekle', exact: true }).click();

//   // modal iframe içinde açılıyor. Iframe'ı seç ve içindeki sayfaya geçiş yap
//   const iframeElement = await page.waitForSelector('.fancybox-iframe');
//   const frame = await iframeElement.contentFrame();

//   const cartItemElement = await frame.$$('.sepetItem');

//   // Sepette tek bir ürün var onun için içinde ki ilk elemanı alıp eski değerini tutup 1 ekleriz
//   const firstCartItem = cartItemElement[0];

//   // ürünün sepetteki fiyatı
//   const cartItemPriceElement = await firstCartItem.$('.sepetItemB3_2');
//   const cartItemPrice = await cartItemPriceElement.innerText();

//   // Ürünün sepetteki fiyatıyla kendi fiyatı aynı mı değil mi diye bakıyoruz
//   await expect(productPrice).toBe(cartItemPrice);

//   // ürünün adedini 1 arttır
//   const inputElement = await firstCartItem.$('input[type="number"]');
//   const oldQuantity = await inputElement.inputValue();
//   const newQuantity = parseInt(oldQuantity) + 1;

//   // Yeni değeri input öğesine yaz
//   await inputElement.fill(newQuantity.toString());


//   // Ürünün adedi arttı mı diye kontrol ediyoruz
//   await expect((parseInt(oldQuantity) + 1).toString()).toBe(newQuantity.toString());

//   // Fiyatı güncellemek için güncelle butonuna basılır
//   const updateButton = await firstCartItem.$('a.AdetGuncelle');
//   await updateButton.click();

//   await page.waitForTimeout(2000);

//   // Sepette tek bir ürün var onun için içinde ki ilk elemanı alıp eski değerini tutup 1 ekleriz
//   const cartItemElement2 = await frame.$$('.sepetItem');
//   const firstCartItem2 = cartItemElement2[0];
//   const cartItemNewPriceElement = await firstCartItem2.$('span.sepetItemB4_2');
//   const cartItemNewPrice = await cartItemNewPriceElement.innerText();

//   // fiyat eski fiyatından farklı olduğunu kontrol ediyoruz
//   await expect(cartItemPrice).not.toBe(cartItemNewPrice);


//   // Sepeti sil ve temizle
//   await frame.getByRole('link', { name: 'Sepeti Temizle' }).click()
//   await frame.waitForTimeout(2000);
//   await frame.getByRole('button', { name: 'Evet' }).click()

//   await frame.waitForTimeout(3000);

// })


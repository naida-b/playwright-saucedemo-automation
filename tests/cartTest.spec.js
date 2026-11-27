const {expect} = require('@playwright/test');
const loginDataSet = require('../testdata/loginTestData.json');
const inventoryDataSet = require('../testdata/inventoryTestData.json');
const InventoryAssertions = require('../utils/assertions/InventoryAssertions');
const {CartPage} = require('../pageobjects/CartPage');
const CartAssertions = require('../utils/assertions/CartAssertions');
const { test } = require('../fixtures/inventory.fixture');

test('TC-CART-001 Verify cart badge quantity',async ({inventoryPage})=>{
    await InventoryAssertions.expectProductToExist(inventoryPage, inventoryDataSet.productNameForSelection);
    await inventoryPage.addProductToCartByName(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectItemIsAddedToCart(inventoryPage, inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectCartBadgeDisplayed(inventoryPage, inventoryDataSet.numberOfProductsAdded);
});

test('TC-CART-002 Verify cart item matches selected inventory product', async ({ inventoryPage, page }) => {
    await InventoryAssertions.expectProductToExist(inventoryPage, inventoryDataSet.productNameForSelection);
    await inventoryPage.addProductToCartByName(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectItemIsAddedToCart(inventoryPage, inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectCartBadgeDisplayed(inventoryPage, inventoryDataSet.numberOfProductsAdded);
    const inventoryDetails = await inventoryPage.getProductDetails(inventoryDataSet.productNameForSelection);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await CartAssertions.expectOneCartItemVisible(cartPage);
    const cartDetails = await cartPage.getCartProductDetails();
    await CartAssertions.expectCartItemToMatchInventory(inventoryDetails,cartDetails);
});

test('TC-CART-003 Add two different products by name', async ({ inventoryPage, page }) => {
    await InventoryAssertions.expectProductsToExist(inventoryPage, inventoryDataSet.productsToAdd);
    await inventoryPage.addProductsToCartByName(inventoryDataSet.productsToAdd);
    await InventoryAssertions.expectItemsAreAddedToCart(inventoryPage, inventoryDataSet.productsToAdd);
    await InventoryAssertions.expectCartBadgeDisplayed(inventoryPage, inventoryDataSet.productsToAddCount);
    const inventoryDetails = await inventoryPage.getProductsDetails(inventoryDataSet.productsToAdd);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await CartAssertions.expectCartItemsToBeVisible(cartPage, inventoryDataSet.productsToAddCount);
    const cartDetails = await cartPage.getCartProductsDetails();
    await CartAssertions.expectCartItemsToMatchInventory(inventoryDetails,cartDetails);
});

test('TC-CART-004 Handle non-existing product', async ({ inventoryPage, page }) => {
    const nonExistingProductName = "Non-Existing Product";
    await InventoryAssertions.expectCartIconToBeVisible(inventoryPage);
    await InventoryAssertions.expectCartBadgeEmpty(inventoryPage);
    await expect(inventoryPage.addProductToCartByName(nonExistingProductName)).
        rejects.toThrow(`Product with name "${nonExistingProductName}" not found.`);
    await InventoryAssertions.expectCartBadgeEmpty(inventoryPage);
    await InventoryAssertions.expectCartToBeEmpty(inventoryPage);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await CartAssertions.expectCartItemsToBeVisible(cartPage, 0);
});
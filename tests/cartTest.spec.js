const {expect} = require('@playwright/test');
const loginDataSet = require('../testdata/loginTestData.json');
const inventoryDataSet = require('../testdata/inventoryTestData.json');
const InventoryAssertions = require('../utils/assertions/InventoryAssertions');
const {CartPage} = require('../pageobjects/CartPage');
const CartAssertions = require('../utils/assertions/CartAssertions');
const { test } = require('../fixtures/inventory.fixture');

test('TC-CART-001 Verify cart badge quantity',async ({inventoryPage})=>{
    const matchedItem = await inventoryPage.getProduct(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectProductToExist(matchedItem);
    await inventoryPage.addProductToCartByName(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectItemIsAddedToCart(matchedItem);
    await InventoryAssertions.expectCartBadgeDisplayed(inventoryPage, inventoryDataSet.numberOfProductsAdded);
});

test('TC-CART-002 Verify cart item matches selected inventory product', async ({ inventoryPage, page }) => {
    const matchedItem = await inventoryPage.getProduct(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectProductToExist(matchedItem);
    await inventoryPage.addProductToCartByName(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectItemIsAddedToCart(matchedItem);
    await InventoryAssertions.expectCartBadgeDisplayed(inventoryPage, inventoryDataSet.numberOfProductsAdded);
    const inventoryDetails = await inventoryPage.getProductDetails(inventoryDataSet.productNameForSelection);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await CartAssertions.expectCartItemToBeVisible(cartPage);
    await CartAssertions.expectOneCartItemVisible(cartPage);
    const cartDetails = await cartPage.getCartProductDetails();
    await CartAssertions.expectCartItemToMatchInventory(inventoryDetails,cartDetails);
});
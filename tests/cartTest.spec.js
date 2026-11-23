const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const loginDataSet = require('../testdata/loginTestData.json');
const inventoryDataSet = require('../testdata/inventoryTestData.json');
const {InventoryPage} = require('../pageobjects/InventoryPage');
const LoginAssertions = require('../utils/assertions/LoginAssertions');
const InventoryAssertions = require('../utils/assertions/InventoryAssertions');
const {CartPage} = require('../pageobjects/CartPage');
const CartAssertions = require('../utils/assertions/CartAssertions');

test('TC-CART-001 Verify cart badge quantity',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const matchedItem = await inventoryPage.getProduct(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectProductToExist(matchedItem);
    await inventoryPage.addProductToCart(matchedItem);
    await InventoryAssertions.expectItemIsAddedToCart(matchedItem);
    await InventoryAssertions.expectCartBadgeDisplayed(inventoryPage, inventoryDataSet.numberOfProductsAdded);
});

test('TC-CART-002 Verify cart item matches selected inventory product', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const matchedItem = await inventoryPage.getProduct(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectProductToExist(matchedItem);
    await inventoryPage.addProductToCart(matchedItem);
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
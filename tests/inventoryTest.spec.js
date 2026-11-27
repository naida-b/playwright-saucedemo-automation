const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const loginDataSet = require('../testdata/loginTestData.json');
const inventoryDataSet = require('../testdata/inventoryTestData.json');
const {InventoryPage} = require('../pageobjects/InventoryPage');
const LoginAssertions = require('../utils/assertions/LoginAssertions');
const InventoryAssertions = require('../utils/assertions/InventoryAssertions');



test('TC-INV-001 Verify that inventory page displays exactly six products',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
});

test('TC-INV-002 Verify that all inventory products have names and prices',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    await InventoryAssertions.expectProductsAndPricesToHaveExpectedCountAndValidContent(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
});

test('TC-INV-003 Verify that a product can be added to cart by matching its name',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const matchedItem = await inventoryPage.getProduct(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectProductToExist(inventoryPage, inventoryDataSet.productNameForSelection);
    await inventoryPage.addProductToCartByName(inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectItemIsAddedToCart(inventoryPage, inventoryDataSet.productNameForSelection);
    await InventoryAssertions.expectNumberOfItemsAddedToCart(inventoryPage, 1);
});

test('TC-INV-004 sorting by Name (A to Z)',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const initialProductList = await inventoryPage.getProductNames();
    await inventoryPage.selectSortOption('az');
    const sortedProductList = await inventoryPage.getProductNames();
    InventoryAssertions.expectProductsToBeSortedByNameAZ(initialProductList, sortedProductList);
});

test('TC-INV-005 sorting by Name (Z to A)',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const initalProductList = await inventoryPage.getProductNames();
    await inventoryPage.selectSortOption('za');
    const sortedProductList = await inventoryPage.getProductNames();
    InventoryAssertions.expectProductsToBeSortedByNameZA(initalProductList, sortedProductList);
});

test('TC-INV-006 sorting by Price (low to high)',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const initalProductList = await inventoryPage.getProductPrices();
    await inventoryPage.selectSortOption('lohi');
    const sortedProductList = await inventoryPage.getProductPrices();
    InventoryAssertions.expectProductsToBeSortedByPriceLowToHigh(initalProductList, sortedProductList);
});

test('TC-INV-007 sorting by Price (high to low)',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    const initalProductList = await inventoryPage.getProductPrices();
    await inventoryPage.selectSortOption('hilo');
    const sortedProductList = await inventoryPage.getProductPrices();
    InventoryAssertions.expectProductsToBeSortedByPriceHighToLow(initalProductList, sortedProductList);
});
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

test.only('TC-INV-002 Verify that all inventory products have names and prices',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
    await InventoryAssertions.expectProductsAndPricesToHaveExpectedCountAndValidContent(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
});
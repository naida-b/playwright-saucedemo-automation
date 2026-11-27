const { test: base } = require('@playwright/test');

const { LoginPage } = require('../pageobjects/LoginPage');
const { InventoryPage } = require('../pageobjects/InventoryPage');
const  LoginAssertions  = require('../utils/assertions/LoginAssertions');
const  InventoryAssertions  = require('../utils/assertions/InventoryAssertions');
const loginDataSet = require('../testdata/loginTestData.json');
const inventoryDataSet = require('../testdata/inventoryTestData.json');

const test = base.extend({

    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await LoginAssertions.expectLoginFormVisible(loginPage);
        await loginPage.login(loginDataSet.standardUsername, loginDataSet.standardPassword);
        const inventoryPage = new InventoryPage(page);
        await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);

        await use(inventoryPage);
    }

});

module.exports = { test };
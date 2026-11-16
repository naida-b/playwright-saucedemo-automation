const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const loginDataSet = require('../utils/loginTestData.json');
const {InventoryPage} = require('../pageobjects/InventoryPage');

test('TC-LOGIN-001 Login with valid credentials - standard user',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.heading).toHaveText("Products");
    await expect(inventoryPage.inventoryList).toHaveCount(6);
    await expect(inventoryPage.inventoryList.first()).toBeVisible();
});

test('TC-LOGIN-002 Login with invalid username', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(loginDataSet.invalidUsername,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.invalidUsernameAndPasswordAlert).toBeVisible();
    await expect(loginPage.invalidUsernameAndPasswordAlert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-003 Login with invalid password', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.invalidPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.invalidUsernameAndPasswordAlert).toBeVisible();
    await expect(loginPage.invalidUsernameAndPasswordAlert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const loginDataSet = require('../utils/loginTestData.json');
const {InventoryPage} = require('../pageobjects/InventoryPage');

test('TC-LOGIN-001 Login with valid credentials - standard user',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(loginDataSet.standard_username,loginDataSet.standard_password);
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.heading).toHaveText("Products");
    await expect(inventoryPage.inventoryList.first()).toBeVisible();
});

test('TC-LOGIN-002 Login with invalid username', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsernameTextInput(loginDataSet.invalid_username);
    await loginPage.fillPasswordTextInput(loginDataSet.standard_password);
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidUsernameAndPasswordAlert).toBeVisible();
    await expect(loginPage.invalidUsernameAndPasswordAlert).toHaveText('Epic sadface: Username and password do not match any user in this service');
    
});
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const loginDataSet = require('../testdata/loginTestData.json');
const inventoryDataSet = require('../testdata/inventoryTestData.json');
const {InventoryPage} = require('../pageobjects/InventoryPage');
const LoginAssertions = require('../utils/assertions/LoginAssertions');
const InventoryAssertions = require('../utils/assertions/InventoryAssertions');

test('TC-LOGIN-001 Login with valid credentials - standard user',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);
});

test('TC-LOGIN-002 Login with invalid username', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.invalidUsername,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-003 Login with invalid password', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.invalidPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-004 Login with empty username', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login("",loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.usernameRequiredAlert);
});

test('TC-LOGIN-005 Login with empty password', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,"");
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.passwordRequiredAlert);

});

test('TC-LOGIN-006 Login with both fields empty', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login("","");
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.usernameRequiredAlert);
});

test('TC-LOGIN-007 Login with username containing trailing space', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsernameWithSpace,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.invalidUsernameAndPasswordAlert);

});

test('TC-LOGIN-008 Login with username in incorrect letter case', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsernameWithWrongCase,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.invalidUsernameAndPasswordAlert);

});

test('TC-LOGIN-009 Login with password containing trailing space', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPasswordWithSpace);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.invalidUsernameAndPasswordAlert);

});

test('TC-LOGIN-010 Submit login using Enter key',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.fillUsernameTextInput(loginDataSet.standardUsername);
    await loginPage.fillPasswordTextInput(loginDataSet.standardPassword);
    await loginPage.passwordInput.press('Enter');
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);

});

test('TC-LOGIN-011 Verify password is masked',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.fillPasswordTextInput(loginDataSet.standardPassword);
    await expect(loginPage.passwordInput).toHaveAttribute('type','password');
});

test('TC-LOGIN-012 Verify login page remains accessible after failed login', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.invalidUsername,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.invalidUsernameAndPasswordAlert);
    await loginPage.clearLoginForm();
    await LoginAssertions.expectLoginFormEmpty(loginPage);
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await InventoryAssertions.expectInventoryPageToBeOpenAndLoaded(inventoryPage, inventoryDataSet.inventoryPageItemListCount);

});

test('TC-LOGIN-013 Verify direct access to inventory without login',async ({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.goTo(loginDataSet.inventoryPageURL);
    await expect(page).toHaveURL('/');
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.inventoryAccessDeniedAlert);

});

test('TC-LOGIN-018 Login with locked out user', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await LoginAssertions.expectLoginFormVisible(loginPage);
    await loginPage.login(loginDataSet.lockedOutUserUsername,loginDataSet.lockedOutUserPassword);
    await expect (page).toHaveURL("/");
    await LoginAssertions.expectLoginError(loginPage,loginDataSet.lockedOutUserAlert);
});
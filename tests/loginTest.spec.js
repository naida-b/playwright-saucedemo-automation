const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const loginDataSet = require('../utils/loginTestData.json');
const {InventoryPage} = require('../pageobjects/InventoryPage');

test('TC-LOGIN-001 Login with valid credentials - standard user',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.heading).toHaveText("Products");
    await expect(inventoryPage.inventoryList).toHaveCount(6);
    for (let i = 0; i < loginDataSet.inventoryPageItemListCount; i++) {
        await expect(inventoryPage.inventoryList.nth(i)).toBeVisible();
    } 
});

test('TC-LOGIN-002 Login with invalid username', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.invalidUsername,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-003 Login with invalid password', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.invalidPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-004 Login with empty username', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login("",loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.usernameRequiredAlert);
});

test('TC-LOGIN-005 Login with empty password', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.standardUsername,"");
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.passwordRequiredAlert);
});

test('TC-LOGIN-006 Login with both fields empty', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login("","");
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.usernameRequiredAlert);
});

test('TC-LOGIN-007 Login with username containing trailing space', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.standardUsernameWithSpace,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-008 Login with username in incorrect letter case', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.standardUsernameWithWrongCase,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-009 Login with password containing trailing space', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPasswordWithSpace);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
});

test('TC-LOGIN-010 Submit login using Enter key',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.fillUsernameTextInput(loginDataSet.standardUsername);
    await loginPage.fillPasswordTextInput(loginDataSet.standardPassword);
    await loginPage.passwordInput.press('Enter');
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.heading).toHaveText("Products");
    await expect(inventoryPage.inventoryList).toHaveCount(6);
    for (let i = 0; i < loginDataSet.inventoryPageItemListCount; i++) {
        await expect(inventoryPage.inventoryList.nth(i)).toBeVisible();
    } 
});

test('TC-LOGIN-011 Verify password is masked',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.fillPasswordTextInput(loginDataSet.standardPassword);
    await expect(loginPage.passwordInput).toHaveAttribute('type','password');
    await expect(loginPage.passwordInput).toHaveValue(loginDataSet.standardPassword);
});

test('TC-LOGIN-012 Verify login page remains accessible after failed login', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.invalidUsername,loginDataSet.standardPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.invalidUsernameAndPasswordAlert);
    await loginPage.resetUsernameTextInput();
    await loginPage.resetPasswordTextInput();
    await loginPage.login(loginDataSet.standardUsername,loginDataSet.standardPassword);
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.heading).toHaveText("Products");
    await expect(inventoryPage.inventoryList).toHaveCount(6);
    for (let i = 0; i < loginDataSet.inventoryPageItemListCount; i++) {
        await expect(inventoryPage.inventoryList.nth(i)).toBeVisible();
    } 
});

test('TC-LOGIN-013 Verify direct access to inventory without login',async ({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.goTo(loginDataSet.inventoryPageURL);
    await expect(loginPage.page).toHaveURL('/');
    await expect(loginPage.alert).toContainText(loginDataSet.inventoryAccessDeniedAlert);
});

test('TC-LOGIN-018 Login with locked out user', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo("/");
    await loginPage.login(loginDataSet.lockedOutUserUsername,loginDataSet.lockedOutUserPassword);
    await expect (page).toHaveURL("/");
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toHaveText(loginDataSet.lockedOutUserAlert);
});
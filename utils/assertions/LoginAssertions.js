const {expect} = require('@playwright/test');

class LoginAssertions{
    static async expectLoginError(loginPage, expectedMessage){
        await expect(loginPage.alert).toBeVisible();
        await expect(loginPage.alert).toHaveText(expectedMessage);
    }

    static async expectLoginFormVisible(loginPage){
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    }
}

module.exports = LoginAssertions;
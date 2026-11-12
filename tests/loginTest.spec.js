const {test, expect} = require('@playwright/test');
//login standard_user / secret_sauce
//getByRole and getByPlaceholder

test('Successful login using getByRole locators',async ({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole("textbox",{name: 'Username'}).fill("standard_user");
    await page.getByRole('textbox',{name: 'Password'}).fill("secret_sauce");
    await page.getByRole('button',{name: 'Login'}).click();
    await expect(page).toHaveTitle("Swag Labs");
});

test('Successful login using getByPlaceholder locators',async ({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username",{name: 'Username'}).fill("standard_user");
    await page.getByPlaceholder('Password',{name: 'Password'}).fill("secret_sauce");
    await page.getByRole('button',{name: 'Login'}).click();
    await expect(page).toHaveTitle("Swag Labs");
});
const {expect} = require('@playwright/test');

class CartAssertions{

    static async expectCartItemToBeVisible(cartPage) {
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItemName).toBeVisible();
        await expect(cartPage.cartItemPrice).toBeVisible();
    }

    static async expectOneCartItemVisible(cartPage) {
       await expect(cartPage.cartItemName).toHaveCount(1);
    }

    static async expectCartItemToMatchInventory(inventoryDetails, cartDetails) {
        expect(cartDetails.name).toBe(inventoryDetails.name);
        expect(cartDetails.price).toBe(inventoryDetails.price);
    }
}
module.exports = CartAssertions;
const {expect} = require('@playwright/test');

class CartAssertions{

    static async expectCartItemsToBeVisible(cartPage, count = 1) {
        await expect(cartPage.cartItems).toHaveCount(count);
        for (let i = 0; i < count; i++) {
        const cartItem = cartPage.cartItems.nth(i);

        await expect(cartItem.locator('.inventory_item_name')).toBeVisible();
        await expect(cartItem.locator('.inventory_item_price')).toBeVisible();
    }
    }

    static async expectOneCartItemVisible(cartPage) {
       await expect(cartPage.cartItemName).toHaveCount(1);
    }

    static async expectCartItemToMatchInventory(inventoryDetails, cartDetails) {
        expect(cartDetails.name).toBe(inventoryDetails.name);
        expect(cartDetails.price).toBe(inventoryDetails.price);
    }

    static async expectCartItemsToMatchInventory(inventoryDetails, cartDetails) {
       for(const inventoryDetail of inventoryDetails) {
            const cartDetail = cartDetails.find(cartItem => cartItem.name === inventoryDetail.name);
            expect(cartDetail).toBeDefined();
            expect(cartDetail.price).toBe(inventoryDetail.price);
        }
    }
}
module.exports = CartAssertions;
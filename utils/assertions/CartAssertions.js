const {expect} = require('@playwright/test');

class CartAssertions{
    static async expectCartItemToMatchInventory(inventoryDetails, cartDetails) {
        expect(cartDetails.name).toBe(inventoryDetails.name);
        expect(cartDetails.price).toBe(inventoryDetails.price);
    }
}
module.exports = CartAssertions;
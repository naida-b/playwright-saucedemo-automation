const {expect} = require('@playwright/test');

class InventoryAssertions{

    static async expectInventoryPageToBeOpenAndLoaded(inventoryPage, expectedItemCount){
        await expect(inventoryPage.page).toHaveURL(/\/inventory\.html$/);
        await expect(inventoryPage.heading).toBeVisible();
        await expect(inventoryPage.heading).toHaveText("Products");
        await expect(inventoryPage.inventoryItems).toHaveCount(expectedItemCount);
        for (let i = 0; i < expectedItemCount; i++) {
            await expect(inventoryPage.inventoryItems.nth(i)).toBeVisible();
        } 
    }
}
module.exports = InventoryAssertions;
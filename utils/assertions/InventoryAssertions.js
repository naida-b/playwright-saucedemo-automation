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

    static async expectProductsAndPricesToHaveExpectedCountAndValidContent(inventoryPage, expectedItemCount){
        await expect(inventoryPage.inventoryItemsName).toHaveCount(expectedItemCount);
        await expect(inventoryPage.inventoryItemsPrice).toHaveCount(expectedItemCount);
        for (const item of await inventoryPage.inventoryItems.all()) {
            const name = await item.locator('.inventory_item_name').textContent();
            const price = await item.locator('.inventory_item_price').textContent();
            expect(name.trim()).not.toBe('');
            expect(price.trim()).toMatch(/^\$\d+\.\d{2}$/);
        }
    }
}
module.exports = InventoryAssertions;
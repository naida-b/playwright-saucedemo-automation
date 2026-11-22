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

    static async expectProductToExist(matchedItem){
        await expect(matchedItem).toHaveCount(1);
    }

    static async expectItemIsAddedToCart(matchedItem){
        expect(await matchedItem.locator('.btn_inventory')).toHaveText("Remove");
    }

    static async expectCartBadgeDisplayed(inventoryPage, numberOfItems){
        await expect(inventoryPage.cartBadge).toBeVisible();
        await expect(inventoryPage.cartBadge).toHaveText(String(numberOfItems));
    }

    static async expectOneItemIsAddedToCart(inventoryPage){
        await expect(inventoryPage.removeButtons).toHaveCount(1);
    }
}
module.exports = InventoryAssertions;
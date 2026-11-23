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
        
        const names = await inventoryPage.inventoryItemsName.allTextContents();
        const prices = await inventoryPage.inventoryItemsPrice.allTextContents();
        expect(names).toHaveLength(expectedItemCount);
        expect(prices).toHaveLength(expectedItemCount);
        for (const name of names) {
            expect(name.trim()).not.toBe('');
        }

        for (const price of prices) {
            expect(price.trim()).toMatch(/^\$\d+\.\d{2}$/);
        }
    }

    static async expectProductToExist(matchedItem){
        await expect(matchedItem).toHaveCount(1);
    }

    static async expectItemIsAddedToCart(matchedItem){
        await expect(matchedItem.locator('.btn_inventory')).toHaveText("Remove");
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
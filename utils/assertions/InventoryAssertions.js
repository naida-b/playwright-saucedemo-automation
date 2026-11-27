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

    static async expectProductToExist(inventoryPage, productName){
        const matchedItem = inventoryPage.getProduct(productName);
        await expect(matchedItem).toHaveCount(1);
    }

    static async expectProductsToExist(inventoryPage, productsNames){
        for (const productName of productsNames) {
            const matchedItem = inventoryPage.getProduct(productName);
            await expect(matchedItem).toHaveCount(1);
        }
    }

    static async expectItemIsAddedToCart(inventoryPage, productName) {
        const matchedItem = inventoryPage.getProduct(productName);

        await expect( matchedItem.locator('.btn_inventory')).toHaveText('Remove');
    }

    static async expectItemsAreAddedToCart(inventoryPage, productsNames){
        for (const productName of productsNames) {
            const matchedItem = inventoryPage.getProduct(productName);
            await expect(matchedItem.locator('.btn_inventory')).toHaveText("Remove");
        }
    }

    static async expectCartBadgeDisplayed(inventoryPage, numberOfItems){
        await expect(inventoryPage.cartBadge).toBeVisible();
        await expect(inventoryPage.cartBadge).toHaveText(String(numberOfItems));
    }

    static async expectNumberOfItemsAddedToCart(inventoryPage, count){
        await expect(inventoryPage.removeButtons).toHaveCount(count);
    }

    static async expectCartBadgeEmpty(inventoryPage){
        await expect(inventoryPage.cartBadge).toHaveCount(0);
    }

    static async expectCartIconToBeVisible(inventoryPage){
        await expect(inventoryPage.cartIcon).toBeVisible();
    }

    static async expectCartToBeEmpty(inventoryPage){
        await expect(inventoryPage.cartIcon).toHaveAttribute('aria-label', 'Cart, empty');
    }

    static async expectProductsToBeSortedByNameAZ(initalProductList, sortedProductList){
        const initialNames = await initalProductList.locator('.inventory_item_name').allTextContents();
        const sortedNames = await sortedProductList.locator('.inventory_item_name').allTextContents();
        const expectedSortedNames = [...initialNames].sort((a, b) => a.localeCompare(b));
        expect(sortedNames).toEqual(expectedSortedNames);
    }

    static async expectProductsToBeSortedByNameZA(initalProductList, sortedProductList){
        const initialNames = await initalProductList.locator('.inventory_item_name').allTextContents();
        const sortedNames = await sortedProductList.locator('.inventory_item_name').allTextContents();
        const expectedSortedNames = [...initialNames].sort((a, b) => b.localeCompare(a));
        expect(sortedNames).toEqual(expectedSortedNames);
    }

    static async expectProductsToBeSortedByPriceLowToHigh(initalProductList, sortedProductList){
        const initialPrices = await initalProductList.locator('.inventory_item_price').allTextContents();
        const sortedPrices = await sortedProductList.locator('.inventory_item_price').allTextContents();
        const expectedSortedPrices = [...initialPrices].sort((a, b) => parseFloat(a) - parseFloat(b));
        expect(sortedPrices).toEqual(expectedSortedPrices);
    }

    static async expectProductsToBeSortedByPriceHighToLow(initalProductList, sortedProductList){
        const initialPrices = await initalProductList.locator('.inventory_item_price').allTextContents();
        const sortedPrices = await sortedProductList.locator('.inventory_item_price').allTextContents();
        const expectedSortedPrices = [...initialPrices].sort((a, b) => parseFloat(b) - parseFloat(a));
        expect(sortedPrices).toEqual(expectedSortedPrices);
    }
}
module.exports = InventoryAssertions;
class InventoryPage{
    constructor(page){
        this.page = page;
        this.heading = page.locator(".title");
        this.inventoryItems = page.locator(".inventory_item");
        this.inventoryItemsName = page.locator('.inventory_item_name');
        this.inventoryItemsPrice = page.locator('.inventory_item_price');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.removeButtons = page.getByRole('button', { name: 'Remove' })
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
    }

    async addProductToCartByName(productName){
        const matchedItem = this.getProduct(productName);
        const count = await matchedItem.count();
        if (count === 0) {
            throw new Error(`Product with name "${productName}" not found.`);
        }

        if (count > 1) {
            throw new Error(`Multiple products with name "${productName}" found.`);
        }

        await matchedItem.locator('.btn_inventory').click();
    }

    async addProductsToCartByName(productNames){
        for (const productName of productNames) {
            await this.addProductToCartByName(productName);
        }
    }

    getProduct(productName){
        const matchedItem = this.inventoryItems.filter({
            has: this.page.getByText(productName, { exact: true })
        });

        return matchedItem;
    }

    async getProductDetails(productName) {
        const selectedProduct = this.getProduct(productName);
        const count = await selectedProduct.count();
        if (count !== 1) {
            throw new Error(`Expected exactly one product with name "${productName}", but found ${count}.`);
        }
        return {
            name: await selectedProduct.locator('.inventory_item_name').textContent(),
            price: await selectedProduct.locator('.inventory_item_price').textContent()
        };
    }

    async getProductsDetails(productNames) {
    return Promise.all(
        productNames.map(productName => this.getProductDetails(productName))
    );
}

    async goToCart(){
       await this.cartIcon.click();
    }

    async selectSortOption(optionText){
        await this.sortDropdown.selectOption({ value: optionText });
    }
}
module.exports = {InventoryPage};
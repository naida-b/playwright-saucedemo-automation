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
    }

    async addProductToCart(product){
        await product.locator('.btn_inventory').click();
    }

    getProduct(productName){
        const matchedItem = this.inventoryItems.filter({
            has: this.page.getByText(productName, { exact: true })
        });

        return matchedItem;

    }

    async getProductDetails(productName) {
        const selectedProduct = this.getProduct(productName);

        return {
            name: await selectedProduct.locator('.inventory_item_name').textContent(),
            price: await selectedProduct.locator('.inventory_item_price').textContent()
        };
    }

    async goToCart(){
       await this.cartIcon.click();
    }

}
module.exports = {InventoryPage};
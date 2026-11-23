class CartPage{
    constructor (page){
        this.cartItemName = page.locator('.inventory_item_name');
        this.cartItemPrice = page.locator('.inventory_item_price');
    }

    async getCartProductDetails() {
        return {
            name: await this.cartItemName.textContent(),
            price: await this.cartItemPrice.textContent()
        };
    }
}
module.exports = {CartPage};
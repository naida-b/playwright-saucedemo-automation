class CartPage{
    constructor (page){
        this.cartItems = page.locator('.cart_item');
        this.cartItemName = this.cartItems.locator('.inventory_item_name');
        this.cartItemPrice = this.cartItems.locator('.inventory_item_price');
    }

    async getCartProductDetails() {
        return {
            name: await this.cartItemName.textContent(),
            price: await this.cartItemPrice.textContent()
        };
    }
}
module.exports = {CartPage};
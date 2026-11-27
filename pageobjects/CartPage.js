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

    async getCartProductsDetails() {
        const count = await this.cartItems.count();

        return Promise.all(
            Array.from({ length: count }, async (_, index) => {
                 const item = this.cartItems.nth(index);

                 const name = await item.locator('.inventory_item_name').textContent();
                 const price = await item.locator('.inventory_item_price').textContent();

                 return { name, price };
            })
        );
    }

}
module.exports = {CartPage};
class InventoryPage{
    constructor(page){
        this.page = page;
        this.heading = page.locator(".title");
        this.inventoryItems = page.locator(".inventory_item");
        this.inventoryItemsName = page.locator('.inventory_item_name');
        this.inventoryItemsPrice = page.locator('.inventory_item_price');
    }



}
module.exports = {InventoryPage};
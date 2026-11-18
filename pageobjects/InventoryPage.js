class InventoryPage{
    constructor(page){
        this.page = page;
        this.heading = page.locator(".title");
        this.inventoryItems = page.locator(".inventory_item");
    }



}
module.exports = {InventoryPage};
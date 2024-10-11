export class VendorsPage{
    constructor(page){
        this.page = page;
        this.clickOnVendors = "//span[normalize-space()='Vendors']";
    }

    async goToVendors(){
        await this.page.locator(this.clickOnVendors).click();
    }
}
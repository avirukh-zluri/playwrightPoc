export class Spends{
    constructor(page){
        this.page = page;
        this.clickOnSpends = "//span[normalize-space()='Spends']";
        this.clickOnUnrecognised = "//a[normalize-space()='Unrecognised']";
        this.clickOnArchived = "//a[normalize-space()='Archived']";
        this.clickOnPaymentMethods = "//a[normalize-space()='Payment Methods']";
        this.clickOnUploads = "//a[normalize-space()='Uploads']";
    }

    async goToSpends(){
        await this.page.locator(this.clickOnSpends).click();
    }
    async navigateTransaction(){
        await this.page.locator(this.clickOnUnrecognised).click();
        await this.page.locator(this.clickOnArchived).click();
        await this.page.locator(this.clickOnPaymentMethods).click();
        await this.page.locator(this.clickOnUploads).click();
    }
}
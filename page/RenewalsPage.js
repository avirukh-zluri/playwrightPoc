export class RenewalsPage{
    constructor(page){
        this.page = page;
        this.clickOnRenewals = "//span[normalize-space()='Renewals']";
    }

    async goToRenewals(){
        await this.page.locator(this.clickOnRenewals).click();
    }
}
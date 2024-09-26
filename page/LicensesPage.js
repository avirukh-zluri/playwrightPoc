export class LicensePage{
    constructor(page){
        this.page = page;
        this.clickOnLicenses = "//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]";
        this.clickOnSubscriptions = "//a[@href='/licenses#allSubscriptions']";
        this.clickOnContracts = "//a[@href='/licenses#allContracts']";
        this.clickOnPerpetual = "//a[@href='/licenses#allPerpetualContracts']";
        this.clickOnRenewals = "//span[normalize-space()='Renewals']";
        this.clickOnVendors = "//span[normalize-space()='Vendors']";
    }

    async goToLicenses(){
        await this.page.locator(this.clickOnLicenses).click();
    }
    async navigateLicenses(){
        await this.page.locator(this.clickOnSubscriptions).click();
        await this.page.locator(this.clickOnContracts).click();
        await this.page.locator(this.clickOnPerpetual).click();
    }
    async navigateRenewals(){
        await this.page.locator(this.clickOnRenewals);
    }
    async navigateVendors(){
        await this.page.locator(this.clickOnVendors).click();
    }
}
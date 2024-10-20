const { expect } = require('@playwright/test');

export class LicensePage{
    constructor(page){
        this.page = page;
        this.clickOnLicenses = "//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]";
        this.clickOnSubscriptions = "//a[@href='/licenses#allSubscriptions']";
        this.clickOnContracts = "//a[@href='/licenses#allContracts']";
        this.clickOnPerpetual = "//a[@href='/licenses#allPerpetualContracts']";
        this.clickOnUploads = "//a[@href='/licenses#uploads']";

        this.clickOnRenewals = "//span[normalize-space()='Renewals']";
        this.clickOnListView = "//div[@class='renewals__header pl-5 pr-5 pt-2 mt-3 mb-4']//div//button[@class='z__button  normal']";
        this.clickOnGridView = "//div[@class='renewals__header pl-5 pr-5 pt-2 mt-3 mb-4']//div//button[2]"; 
        this.clickOnVendors = "//span[normalize-space()='Vendors']";


    }

    async waitForSomeTime(timeout = 3000) {
        await this.page.waitForTimeout(timeout);
    }
    async goToLicenses(){
        await this.page.locator(this.clickOnLicenses).click();
        await this.waitForSomeTime();
    };

    async navigateLicenses(){
        await this.page.locator(this.clickOnSubscriptions).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnContracts).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnPerpetual).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnUploads).click();
        await this.waitForSomeTime();
    };

    async goToRenewals(){
        await this.page.locator(this.clickOnRenewals).click();
        await this.waitForSomeTime();
    };

    async navigateRenewals(){
        //List view
        await this.page.locator(this.clickOnListView).click();
        await this.waitForSomeTime();

    };
    async goToVendors(){
        await this.page.locator(this.clickOnVendors).click();
        await this.waitForSomeTime();
    };


}
const { test, expect } = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

export class ApplicationsPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.managedApplicationCount = "//div[contains(text(),'Managed Applications')]//..//..//span/..";
        this.ApplicationsButton = "//span[contains(text(),'Applications')]";
        this.clickonManagedapps = "//div[normalize-space()='Managed']";
        this.clickOnUnmanaged = "//div[contains(text(),'Unmaaanaged')]| //div[normalize-space()='Unmanaged']";
        this.clickOnRestricted = "//div[contains(text(),'Restricted')]";
        this.clickOnNeedReviews = "//div[contains(text(),'Needs Review')]";
        this.clickOnAllApp = "//div[contains(text(),'All Apps')]";

        this.clickonAutomation="//span[contains(text(),'Automation')]";
        this.clickonRunLogs="//div[contains(text(),'Run Logs')]";
        this.clickonAutomationRules="//div[contains(text(),'Automation Rules')]";


    }

   async gotoApplications(){
    await this.page.locator(this.ApplicationsButton).click();
    await this.page.waitForTimeout(1000);
   };

   async navigateApplications(){
    await this.page.locator(this.clickonManagedapps).first().click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.clickOnUnmanaged).first().click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.clickOnRestricted).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.clickOnNeedReviews).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.clickOnAllApp).click(); 
    await this.page.waitForTimeout(3000);  
   };
   async goToAutomations(){
    await this.page.locator(this.clickonAutomation).click();
    await this.page.waitForTimeout(3000);
    }

    async navigateAutomations(){
        await this.page.locator(this.clickonRunLogs).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.clickonAutomationRules).click();
        await this.page.waitForTimeout(3000);
    };
}
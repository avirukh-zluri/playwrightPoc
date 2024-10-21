export class SettingsPage {
    constructor(page){
        this.page = page;
        this.clickOnOverView = "//span[normalize-space()='Settings']";
        this.clickOnAccount = "//span[normalize-space()='Account']";
        this.clickOnYourOrganization = "//span[normalize-space()='Your Organization']";
        this.clickOnDirectoryManagement = "//span[normalize-space()='Directory Management']";
        this.clickOnAppCatalog="//span[normalize-space()='App Catalog']";
        this.clickOnAdministration ="//span[normalize-space()='Administration']";
        this.clickOnsso="//span[normalize-space()='SSO']";
        
        this.clickOnCustomFields="//span[normalize-space()='Custom Fields']";
        this.clickOnScheduledExports="//span[normalize-space()='Scheduled Exports']";
        this.clickOnCustomApps="//span[normalize-space()='Custom Apps']";
        this.clickOnbilling="//span[normalize-space()='Billing']";
        this.clickOnNotifications="//span[normalize-space()='Notifications']";
        this.clickOnWorkflows="//span[normalize-space()='Workflow Settings']";
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToSettings(){
        await this.page.locator(this.clickOnOverView).click();
        await this.waitForSomeTime();
    }

    async navigateSeetings(){
        await this.page.locator(this.clickOnYourOrganization).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnDirectoryManagement).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnAppCatalog).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnAdministration).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnsso).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnCustomFields).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnScheduledExports).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnCustomApps).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnbilling).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnNotifications).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflows).click();
        await this.waitForSomeTime();
    }
}
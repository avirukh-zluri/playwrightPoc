export class ReportsPage{
    constructor(page){
        this.page = page;
        this.clickOnReports = "//span[normalize-space()='Reports']";
        this.clickOnOrganizationData = "//li[normalize-space()='Organization Data']";
        this.clickOnWorkableInsights = "//li[normalize-space()='Workable Insights']";
        this.clickOnSpendReports = "//li[normalize-space()='Spend Reports']";
        this.clickOnUsageReports = "//li[normalize-space()='Usage Reports']";
    }

    async waitForSomeTime(timeout = 1000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToReports(){
        await this.page.locator(this.clickOnReports).click();
        await this.waitForSomeTime();
    }
    async navigateOrganizationData(){
        await this.page.locator(this.clickOnOrganizationData).click();
        await this.waitForSomeTime();
    }
    async navigateWorkableInsights(){
        await this.page.locator(this.clickOnWorkableInsights).click();
        await this.waitForSomeTime();
    }
    async navigateSpendsReports(){
        await this.page.locator(this.clickOnSpendReports).click();
        await this.waitForSomeTime();
    }
    async navigateUsageReports(){
        await this.page.locator(this.clickOnUsageReports).click();
        await this.waitForSomeTime();
    }
   

}
export class ReportsPage{
    constructor(page){
        this.page = page;
        this.clickOnReports = "//span[normalize-space()='Reports']";
        this.clickOnOrganizationData = "//li[normalize-space()='Organization Data']";
        this.clickOnWorkableInsights = "//li[normalize-space()='Workable Insights']";
        this.clickOnSpendReports = "//li[normalize-space()='Spend Reports']";
        this.clickOnUsageReports = "//li[normalize-space()='Usage Reports']";
    }

    async goToReports(){
        await this.page.locator(this.clickOnReports).click();
    }
    async navigateOrganizationData(){
        await this.page.locator(this.clickOnOrganizationData).click();
    }
    async navigateWorkableInsights(){
        await this.page.locator(this.clickOnWorkableInsights).click();
    }
    async navigateSpendsReports(){
        await this.page.locator(this.clickOnSpendReports).click();
    }
    async navigateUsageReports(){
        await this.page.locator(this.clickOnUsageReports).click();
    }
   

}
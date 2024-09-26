export class SecurityPage {
    constructor(page){
        this.page = page;
        this.clickOnSecurity = "//span[normalize-space()='Security']";
        this.clickOnCriticalUsers = "//a[normalize-space()='Critical Users']";
    }
    async navigateToSecurity(){
        await this.page.locator(this.clickOnSecurity).click();
        await this.page.locator(this.clickOnCriticalUsers).click();
    }
}
export class SecurityPage {
    constructor(page){
        this.page = page;
        this.clickOnSecurity = "//span[normalize-space()='Security']";
        this.clickOnCriticalUsers = "//a[normalize-space()='Critical Users']";
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }
    

    async goToSecurity(){
        await this.page.locator(this.clickOnSecurity).click();
        await this.waitForSomeTime();
    }
    async navigateToSecurity(){
        
      
        await this.page.locator(this.clickOnCriticalUsers).click();
        await this.waitForSomeTime();
    }
}
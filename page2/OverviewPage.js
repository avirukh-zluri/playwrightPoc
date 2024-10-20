export class OverviewPage {
    constructor(page){
        this.page = page;
        this.clickOnOverView = "//span[normalize-space()='Overview']"
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToOveriew(){
        await this.page.locator(this.clickOnOverView).click();
        await this.waitForSomeTime();
    }
}
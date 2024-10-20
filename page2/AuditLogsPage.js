export class AuditLogsPage {
    constructor(page){
        this.page = page;
        this.clickOnOverView = "//span[normalize-space()='Audit Logs']"
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToAuditLog(){
        await this.page.locator(this.clickOnOverView).click();
        await this.waitForSomeTime();
    }
}


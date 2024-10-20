export class Spends{
    constructor(page){
        this.page = page;
        this.clickOnSpends = "//span[normalize-space()='Spends']";
        this.clickOnUnrecognised = "//a[normalize-space()='Unrecognised']";
        this.clickOnArchived = "//a[normalize-space()='Archived']";
        this.clickOnPaymentMethods = "//a[normalize-space()='Payment Methods']";
        this.clickOnUploads = "//a[normalize-space()='Uploads']";

        this.clickonTransactions = "//span[normalize-space()='Transactions']";
        this.clickOnAutomation ="//span[normalize-space()='Automation']"
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToSpends(){
        await this.page.locator(this.clickOnSpends).click();
        await this.waitForSomeTime();
    }
    async navigateTransaction(){
        await this.page.locator(this.clickonTransactions).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnUnrecognised).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnArchived).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnPaymentMethods).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnUploads).click();
        await this.waitForSomeTime();
    }

    async goToAutomation(){
        await this.page.locator(this.clickOnAutomation).click();
        await this.waitForSomeTime();
    }
}
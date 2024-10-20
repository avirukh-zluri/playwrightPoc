export class OptimizationPage{
    constructor(page){
        this.page = page;
        this.clickOnOptimization = "//span[normalize-space()='Optimization']";
    }

    async waitForSomeTime(timeout = 1000) {
        await this.page.waitForTimeout(timeout);
    }
    async goToOptimization(){
        await this.page.locator(this.clickOnOptimization).click();
        await this.waitForSomeTime();
    }
}


export class OptimizationPage{
    constructor(page){
        this.page = page;
        this.clickOnOptimization = "//span[normalize-space()='Optimization']";
    }

    async goToOptimization(){
        await this.page.locator(this.clickOnOptimization).click();
    }
}
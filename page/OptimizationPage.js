const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

export class OptimizationPage{
    constructor(page){
        this.page = page;
        this.clickOnOptimization = "//span[normalize-space()='Optimization']";
        this.OptimizationHeading = "//div[@class='NavH border-bottom']//div[@class='ins-1']";
    }

    async goToOptimization(){
        await this.page.locator(this.clickOnOptimization).click();
    }

    //Optimization Heading validation
    async validateOptimisationHeading(){        
    const OptimizationHeadElement = await this.page.locator(this.OptimizationHeading);
    const text_optimization = await OptimizationHeadElement.textContent(); 
    expect(text_optimization).toBe("Optimization Summary",'Optimization page heading does not match');
    }


}


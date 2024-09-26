const { test, expect } = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
export class ApplicationOverviewPage{
    constructor(page){
        this.page = page;
        this.overview = "//a[normalize-space()='Overview']";
        this.users = "//a[normalize-space()='Users']";
        this.licenses = "//a[normalize-space()='Licenses']";
        this.spends = "//a[normalize-space()='Spends']";
        this.optimization = "//a[normalize-space()='Optimization']";
        this.appInsights = "//a[normalize-space()='App Insights']";
        this.automation = "//a[normalize-space()='Automation']";
        this.addButton = "//span[@id='te' and text()='Add']";
        this.addActionButton = "//button[normalize-space()='Add an action']";
    }

    async clickOnOverview(){
        await this.page.locator(this.overview).click();
    }

    async clickOnUsers(){
        await this.page.locator(this.users).click();
    }

    async clickOnLicenses(){
        await this.page.locator(this.licenses).click();
    }

    async clickOnSpends(){
        await this.page.locator(this.spends).click();
    }

    async clickOnOptimization(){    
        await this.page.locator(this.optimization).click();
    }

    async clickOnAppInsights(){
        await this.page.locator(this.appInsights).click();
    }   

    async clickOnAutomation(){
        await this.page.locator(this.automation).click();
    }

    async clickOnAddButton(){
        await this.page.locator(this.addButton).click();
    }

    async clickOnAddActionButton(){
        await this.page.waitForSelector(this.addActionButton);
        await this.page.locator(this.addActionButton).click();
    }


}
export class DirectoryPage {

    constructor(page){
        this.page = page;
        this.clickOnDirectory = "//span[normalize-space()='Directory']";
        this.clickOnUser="//span[text()='Users']";
        this.user_head="//div[@class='ins-1']";

        this.Employee_count="div.d-flex align-items-center justify-content-center"
        this.clickOnGroup = "//a[@href='/users#group']";
        this.clickOnService = "//a[@href='/users#service']";
        this.clickOnExternal = "//a[@href='/users#external']";

        this.clickonGroups="//span[text()='Groups']";
        this.clickonDepartments="//span[text()='Departments']";
        this.clickonCostCenters="//span[text()='Cost Centers']";

       // this.clickOnMarkedForOnboarding = "//a[@href='/users#marked_for_onboarding']";
       // this.clickOnDepartment = "//span[normalize-space()='Departments']";
       // this.clickOnMarkedForOnboarding = "//a[@href='/users#marked_for_onboarding']";   

    }

    async goToDirectory(){
        await this.page.locator(this.clickOnDirectory).click();
        await this.page.waitForTimeout(2000);
    }

    async goToUser(){
        await this.page.locator(this.clickOnUser).click();
        await this.page.waitForTimeout(2000);
    }


    async navigateUsers(){
        await this.page.locator(this.clickOnService).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.clickOnExternal).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.clickOnGroup).click();
        await this.page.waitForTimeout(3000);

    }

    async goToGroups(){
        await this.page.locator(this.clickonGroups).click();
        await this.page.waitForTimeout(3000);
    }
    async goToDepartments(){
        await this.page.locator(this.clickonDepartments).click();
        await this.page.waitForTimeout(3000);
    }

    async goToCostCenters(){
        await this.page.locator(this.clickonCostCenters).click();
        await this.page.waitForTimeout(3000);
    }


}
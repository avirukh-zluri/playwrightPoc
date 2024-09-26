export class DirectoryPage {
    constructor(page){
        this.page = page;
        this.clickOnDirectory = "//span[normalize-space()='Directory']";
        this.clickOnGroup = "//a[@href='/users#group']";
        this.clickOnService = "//a[@href='/users#service']";
        this.clickOnExternal = "//a[@href='/users#external']";
        this.clickOnMarkedForOnboarding = "//a[@href='/users#marked_for_onboarding']";
        this.clickOnDepartment = "//span[normalize-space()='Departments']";
        this.clickOnMarkedForOnboarding = "//a[@href='/users#marked_for_onboarding']";
        

    }
    async goToDirectory(){
        await this.page.locator(this.clickOnDirectory).click();
    }

    async navigateUsers(){
        await this.page.locator(this.clickOnGroup).click();
        await this.page.locator(this.clickOnService).click();
        await this.page.locator(this.clickOnExternal).click();
        await this.page.locator(this.clickOnMarkedForOnboarding).click();
    }
    async navigateDepartment(){
        await this.page.locator(this.clickOnDepartment).click();
    }

}
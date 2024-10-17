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
        this.clickOnMarkedForOnboarding = "//a[@href='/users#marked_for_onboarding']";
        this.clickOnDepartment = "//span[normalize-space()='Departments']";
        this.clickOnMarkedForOnboarding = "//a[@href='/users#marked_for_onboarding']";
        

    }
    async goToDirectory(){
        await this.page.locator(this.clickOnDirectory).click();
    }

    async goToUser(){
        await this.page.locator(this.clickOnUser).click();
    }


    
    
    //function to count list length
    async employee_list_length(){
        
    }
    async navigateUsers(){
        await this.page.locator(this.clickOnGroup).click();
        await this.page.locator(this.clickOnService).click();
        await this.page.locator(this.clickOnExternal).click();
       // await this.page.locator(this.clickOnMarkedForOnboarding).click();
    }
    async navigateDepartment(){
        await this.page.locator(this.clickOnDepartment).click();
    }

}
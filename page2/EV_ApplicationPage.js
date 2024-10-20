export class EV_Application{
    constructor(page){
        this.page = page;
        this.clickOnApplication = "//div[@class='sidebar__list-upper app-flex-col center']//li[1]//button[1]";
        this.clickOnAppInDebt = "//li[normalize-space()='Apps in Dept']";
        this.clickOnYourApp = "//li[normalize-space()='Your Apps']";
    }
    async goToEVApplication(){
        await this.page.getByRole('button', { name: 'Applications Applications' }).click();
    }
    async navigateEVApplication(){
        await this.page.locator(this.clickOnAppInDebt).click();
        await this.page.locator(this.clickOnYourApp).click();
    }
}
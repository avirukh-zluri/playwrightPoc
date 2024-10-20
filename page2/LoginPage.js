export class LoginPage {

    constructor(page){
        this.page = page;
        this.enterEmail = "//input[@placeholder='Enter Email Address']";
        this.button = "//button[normalize-space()='Continue']";
        this.enterPassword = "//input[@id='password']";
        this.enter_slug= "//input[@placeholder='eg. zluri']"
        this.slug_submit = "//button[normalize-space()='Submit']"
        this.continueButton = "//button[normalize-space()='Continue']";
    }

    async goToLoginPage(page){
        await this.page.goto('https://app.zluri.dev');
    }
    async login (page){
        await this.page.locator(this.enterEmail).fill('zluri_newdev_user4@zluri.dev');
        await this.page.locator(this.button).click();
        
        await this.page.locator(this.enter_slug).fill('testtemplate-6');
        await this.page.locator(this.slug_submit).click();

        await this.page.waitForSelector(this.enterPassword);
        await this.page.locator(this.enterPassword).focus(); 
        await this.page.locator(this.enterPassword).fill('test@123'); 
        await this.page.locator(this.continueButton).click();
        
    }
}
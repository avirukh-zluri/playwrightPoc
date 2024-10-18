export class LoginPage {

    constructor(page){
        this.page = page;
        this.enterEmail = "//input[@placeholder='Enter Email Address']";
        this.button = "//button[normalize-space()='Continue']";
        this.enterPassword = "//input[@id='password']";
        this.continueButton = "//button[normalize-space()='Continue']";
        // Slug
        this.slugCheck = "//h3[normalize-space()='Enter Organization Slug']";
        this.enterSlug = "//input[@placeholder='eg. zluri']";
        this.clickOnSubmit = "//button[normalize-space()='Submit']";
    }

    async goToLoginPage(page){
        await this.page.goto('https://app.zluri.dev/login');
    }
    async login (page){
        await this.page.locator(this.enterEmail).fill('zluri_newdev_user4@zluri.dev');
        await this.page.locator(this.button).click();
        await this.page.locator(this.enterSlug).fill('testtemplate-6')
        await this.page.locator(this.clickOnSubmit).click();
        await this.page.locator(this.enterPassword).fill('test@123');
        await this.page.locator(this.continueButton).click();
    }
}
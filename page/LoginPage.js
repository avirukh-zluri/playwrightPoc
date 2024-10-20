export class LoginPage {

    constructor(page){
        this.page = page;
        this.enterEmail = "//input[@placeholder='Enter Email Address']";
        this.button = "//button[normalize-space()='Continue']";
        this.enterPassword = "//input[@id='password']";
        this.enter_slug= "//input[@placeholder='eg. zluri']"
        this.slug_submit = "//button[normalize-space()='Submit']"
        this.continueButton = "//button[normalize-space()='Continue']";
        // Slug
        this.slugCheck = "//h3[normalize-space()='Enter Organization Slug']";
        this.enterSlug = "//input[@placeholder='eg. zluri']";
        this.clickOnSubmit = "//button[normalize-space()='Submit']";
    }

    async goToLoginPage(page){
        await this.page.goto('https://app.zluri.com');
        //https://app-release.zluri.com
    }
    async login (slugData){
        // const {
        //     slug
        // } = slugData;
        await this.page.locator(this.enterEmail).fill('pod4_automation_prod@zluri.dev');
       // await this.page.locator(this.enterEmail).fill('stacichadwick@zluri.dev')
       // await this.page.locator(this.enterEmail).fill('zluri_prod_test3@zluri.dev');
        await this.page.locator(this.button).click();
        // if(slug){
        //     await this.page.locator(this.enterSlug).fill(slug)
        //     await this.page.locator(this.clickOnSubmit).click();
        // }
        await this.page.locator(this.enterPassword).fill('test@123');
        await this.page.locator(this.continueButton).click();
        
    }
}
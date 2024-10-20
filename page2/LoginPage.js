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
    async login (loginData){
        const {
            userName,
            password,
            slug
        } = loginData;
        await this.page.locator(this.enterEmail).fill(userName);
        await this.page.locator(this.button).click();
        
        if(slug){
            await this.page.locator(this.enter_slug).fill(slug);
            await this.page.locator(this.slug_submit).click();
        }
        await this.page.waitForSelector(this.enterPassword);
        await this.page.locator(this.enterPassword).focus(); 
        await this.page.locator(this.enterPassword).fill(password); 
        await this.page.locator(this.continueButton).click();
        
    }
}

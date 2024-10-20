import { faker } from '@faker-js/faker';
const {test , expect} = require('@playwright/test');

function generateCustomPhoneNumber() {
    const firstDigits = ['6', '7', '8', '9'];
    const firstDigit = firstDigits[Math.floor(Math.random() * firstDigits.length)];
    const restOfNumber = faker.string.numeric(9); // Generates 9 random digits
    return firstDigit + restOfNumber;
}

const first_Name = faker.person.firstName();
const last_Name = faker.person.lastName();
const number = generateCustomPhoneNumber();;
const company = faker.company.name();
const countryCode = "91";

const email = faker.internet.email({ 
    firstName: first_Name, 
    lastName: last_Name, 
    provider: 'zluri.dev',
    allowSpecialCharacters: true 
});

const phoneNumber = `${countryCode}${number}`;

export class SignUpPage {

    constructor(page , context){
        this.page = page;
        this.context = context;
        this.enterMail = "//input[@placeholder='name@company.com']";
        this.clickToContinue = "//button[normalize-space()='Continue']";
        this.enterFirstName = "//input[@id='first_name']";
        this.enterLastName = "//input[@id='last_name']";
        this.enterCompany = "//input[@id='company']";
        this.enterNumber = "//input[@placeholder='Enter phone number']";
        this.requestInvite = "//button[normalize-space()='Request Invite']";

        // Negative Testing 
        this.emailErrorMessage = "//p[@class='font-12 red mt-1 ml-0']";
        this.firstNameErrorMessage = "div[class='d-flex justify-content-between'] div[class='mb-2 me-2 form-group col'] div[class='font-12 ps-0 invalid-feedback']";
        this.lastNameErrorMessage = "div[class='mb-2 form-group col'] div[class='font-12 ps-0 invalid-feedback']";
        this.companyErrorMessage = "div[class=' d-flex justify-content-between'] div[class='font-12 ps-0 invalid-feedback']";
        this.phoneErrorMessage = "//p[@class='font-12 red mt-1']";

        // Login
        this.logInButton = "//a[normalize-space()='Log in']";

        // Privacy Policy
        this.privacyPolicyButton = "//footer[@class='p-2 d-none d-md-block']//a[@class='text-reset text-decoration-none'][normalize-space()='Privacy Policy']";

        // T/C
        this.termsAndConditionButton = "//footer[@class='p-2 d-none d-md-block']//a[@class='text-reset text-decoration-none'][normalize-space()='Terms and Conditions']";

        // Mian page
        this.mainPage = "//a[@class='d-none d-md-block']//img";
    }

    
    async goToSignUp(page){
        await this.page.goto('https://signup.zluri.com/');
        await this.page.locator(this.enterMail).fill(email);
        await this.page.locator(this.clickToContinue).click();
        await this.page.locator(this.enterFirstName).fill(first_Name);
        await this.page.locator(this.enterLastName).fill(last_Name);
        await this.page.locator(this.enterCompany).fill(company);
        await this.page.locator(this.enterNumber).fill(phoneNumber);
        await this.page.locator(this.requestInvite).click();
    }

    async loginRedirection(page){
        await this.page.goto('https://signup.zluri.com/');
        const baseURLFE = process.env.BASE_URL_FE;
        await this.page.locator(this.logInButton).click();
        
        //Url Check
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/`);
    }

    async privacyPolicyAndT_CRedirection(page){
        // Privacy Policy Redirection 
        await this.page.goto('https://signup.zluri.com/');
        const privacyPolicy = process.env.PRIVACY_POLICY_URL;

        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.page.click(this.privacyPolicyButton)
        ]);
        await newPage.waitForLoadState();

        // Now you can interact with the new page
        const title = await newPage.title();
        console.log('New page title:', title);

        //Url Check
        const currentUrl = newPage.url();
        expect(currentUrl).toBe(`${privacyPolicy}`);
        await newPage.close();


        // T/C Redirection 
        await this.page.goto('https://signup.zluri.com/');
        const T_C = process.env.TERMS_AND_CONDITIONS_URL;

        const [newPage1] = await Promise.all([
            this.context.waitForEvent('page'),
            this.page.click(this.termsAndConditionButton) // Replace with your actual selector
        ]);
        await newPage1.waitForLoadState();

        // Now you can interact with the new page
        const title1 = await newPage1.title();
        console.log('New page title:', title1);

        //Url Check
        const currentUrl1 = newPage1.url();
        expect(currentUrl1).toBe(`${T_C}`);
        await newPage1.close();

        // Main Page Reirection 
        await this.page.goto('https://signup.zluri.com/');
        await this.page.locator(this.mainPage).click();
        expect(this.page.url()).toBe('https://www.zluri.com/');
        await this.page.goto('https://signup.zluri.com/');

    }

    async negativeTestingSignup(formData) {
        await this.page.goto('https://signup.zluri.com/');
        
        await this.page.locator(this.enterMail).fill(formData.Email);
        await this.page.locator(this.clickToContinue).click();
        
        let errorMessage = await this.getErrorMessage(this.emailErrorMessage);
        if (errorMessage) return errorMessage;

        await this.page.locator(this.enterFirstName).fill(formData.First_Name);
        await this.page.locator(this.enterLastName).fill(formData.Last_Name);
        await this.page.locator(this.enterCompany).fill(formData.Company);
        await this.page.locator(this.enterNumber).fill(formData.Phone_Number);

        await this.page.locator(this.requestInvite).click();
        
        errorMessage = await this.getErrorMessage(this.firstNameErrorMessage);
        if (errorMessage) return errorMessage;

        errorMessage = await this.getErrorMessage(this.lastNameErrorMessage);
        if (errorMessage) return errorMessage;

        errorMessage = await this.getErrorMessage(this.companyErrorMessage);
        if (errorMessage) return errorMessage;

        errorMessage = await this.getErrorMessage(this.phoneErrorMessage);
        if (errorMessage) return errorMessage;

        return null;
    }

    async getErrorMessage(selector) {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
            return await this.page.locator(selector).innerText();
        } catch (error) {
            return null;
        }
    }
};
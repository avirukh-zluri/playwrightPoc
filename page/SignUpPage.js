import { faker } from '@faker-js/faker';

const first_Name = faker.person.firstName();
const last_Name = faker.person.lastName();
const number = faker.phone.number('########');
const company = faker.company.name();
const countryCode = "91";

const email = faker.internet.email({ 
    firstName: first_Name, 
    lastName: last_Name, 
    provider: 'zluri.dev',
    allowSpecialCharacters: true 
});

const phoneNumber = `${countryCode} ${number}`;

export class SignUpPage {

    constructor(page){
        this.page = page;
        this.enterMail = "//input[@placeholder='name@company.com']";
        this.clickToContinue = "//button[normalize-space()='Continue']";
        this.enterFirstName = "//input[@id='first_name']";
        this.enterLastName = "//input[@id='last_name']";
        this.enterCompany = "//input[@id='company']";
        this.enterNumber = "//input[@placeholder='Enter phone number']";
        this.requestInvite = "//button[normalize-space()='Request Invite']";
    }

    // async makeid(length) {
    //     let result = '';
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    //     const charactersLength = characters.length;
        
    //     let counter = 0;
    //     while (counter < length) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //       counter += 1;
    //     }
    //     return result;
    // }
    
    // async generateRandomNumber() {
    //     const startingDigits = ['6', '7', '8', '9'];
    //     let randomNumber = startingDigits[Math.floor(Math.random() * startingDigits.length)];
    //     for (let i = 0; i < 9; i++) {
    //         const randomDigit = Math.floor(Math.random() * 10);
    //         randomNumber += randomDigit;
    //     }
    //     return randomNumber;
    // }

    async goToSignUp(page){
        await this.page.goto('https://signup.zluri.com/');

        // const firstName = await this.makeid(5);
        // const lastName = await this.makeid(7);
        // const email = firstName + "@zluri.dev";
        // const companyName = await this.makeid(8);
        // const company = companyName + "@company.com";
        // const number = "91"+await this.generateRandomNumber();

        // await this.page.locator(this.enterMail).fill(email);
        // await this.page.locator(this.clickToContinue).click();

        // await this.page.locator(this.enterFirstName).fill(firstName);
        // await this.page.locator(this.enterLastName).fill(lastName);

        // await this.page.locator(this.enterCompany).fill(company);

        // await this.page.locator(this.enterNumber).fill(number);
        // await this.page.locator(this.requestInvite).click();


        // using faker library
        // const firstName = await this.makeid(5);
        // const lastName = await this.makeid(7);
        // const email = firstName + "@zluri.dev";
        // const companyName = await this.makeid(8);
        // const company = companyName + "@company.com";
        // const number = "91"+await this.generateRandomNumber();

        await this.page.locator(this.enterMail).fill(email);
        await this.page.locator(this.clickToContinue).click();

        await this.page.locator(this.enterFirstName).fill(first_Name);
        await this.page.locator(this.enterLastName).fill(last_Name);

        await this.page.locator(this.enterCompany).fill(company);

        await this.page.locator(this.enterNumber).fill(phoneNumber);
        await this.page.locator(this.requestInvite).click();
    }
};
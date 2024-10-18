const { expect } = require('@playwright/test');
import { disconnect } from 'process';
import { setTimeout } from 'timers/promises';


export class LicensePage{
    constructor(page){
        this.page = page;
        this.clickOnLicenses = "//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]";
        this.clickOnLicenses2 = " //button[@class='sidebar__item sidebar__list-upper__interiorbutton btn btn-primary']//span[contains(text(),'Licenses')]";
        this.clickOnSubscriptions = "//a[@href='/licenses#allSubscriptions']";
        this.clickOnContracts = "//a[@href='/licenses#allContracts']";
        this.clickOnPerpetual = "//a[@href='/licenses#allPerpetualContracts']";
        this.clickOnRenewals = "//span[normalize-space()='Renewals']";
        this.clickOnVendors = "//span[normalize-space()='Vendors']";

        // Create Contract
        this.clickOnAdd = "//button[@class='appsad mr-3']";
        // Proper xpath needed
        //this.defaultName = "div[class='plan__header__wrapper card'] div:nth-child(4)";

        this.newLicenseNameButtton = "//img[@class='ml-2 cursor-pointer']";
        this.clickToAddNewLicenseName = "//input[@value='Untitled']";
        this.clickToAddName = "//div[@class='d-flex align-items-center pl-2']//img[1]";

        this.contractAppName = "//input[@placeholder='Enter App Name']";
        this.clickToSelectApp = "//div[@class='row suggestion_menu_application_name_row']";

        this.description = "//textarea[contains(@placeholder,'Description...')]";

        this.fillVendorName = "//input[@placeholder='Enter Vendor Name']";
        this.clickToAddVendorName = "//div[@class='row suggestion_menu_application_name_row']";

        this.fillPrimaryOwner = "//input[contains(@placeholder,'Add Primary Owner')]";
        this.clickToAddPrimaryOwner = "//div[@class='d-flex w-100 mt-3']//button[1]";

        this.fillFinanceOwner = "//input[contains(@placeholder,'Add Finance Owner')]";
        this.clickToAddFinanceOwner = "//div[@class='d-flex w-100 mt-3']//button[1]";

        this.fillITOwner = "//input[contains(@placeholder,'Add IT Owner')]";
        this.clickToAddITOwner = "//div[@class='d-flex w-100 mt-3']//button[1]";

        this.fillNegotiationOwner = "//input[@placeholder='Add Negotiation Owner']";
        this.clickToAddNegotiationOwner = "//div[@class='d-flex w-100 mt-3']//button[1]";

        this.clickOnStartDate = "//div[contains(@class,'position-relative d-flex flex-row border-1 border-radius-4 font-12 align-items-center pl-1 pr-2 cursor-pointer')]//div[contains(text(),'Start Date')]";
        const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        this.startDate = `//abbr[contains(@aria-label,'${today}')]`;

        this.clickOnEndDate = "//div[contains(@class,'position-relative d-flex flex-row border-1 border-radius-4 font-12 align-items-center pl-1 pr-2 cursor-pointer')]//div[contains(text(),'End Date')]";
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 10);
        const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        this.endDate = `//abbr[contains(@aria-label,'${formattedEndDate}')]`;

        this.clickOnRenewByDate = "//div[contains(text(),'Renew by Date')]";
        const renewDate = new Date();
        renewDate.setDate(renewDate.getDate() + 7);
        const formattedRenewDate = renewDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        this.reviewDate = `//abbr[contains(@aria-label,'${formattedRenewDate}')]`;

        this.paymentDate = "//div[contains(text(),'PIA')]";

        this.clickOnNext1 = "//div[contains(@class,'d-flex flex-column')]//button[contains(@class,'z__button mt-4')][normalize-space()='Next']";
        this.clickOnNext2 = "//div[contains(@class,'rah-static rah-static--height-auto')]//div//button[contains(@class,'z__button mt-4')][normalize-space()='Next']";
        this.clickOnNext3 = "(//button[contains(@class,'z__button undefined')])[1]";
        this.clickOnAddContract = "//button[normalize-space()='Add contract']";

        this.getName = "(//div[@class='bold-600 font-18 ml-1'])[1]";
        this.goBackToContractsPage = "//button[normalize-space()='Contracts']";
        this.clickOnSearch = "//input[@placeholder='Search']";

        this.appNameValidation = "a[class='custom__app__name__css text-decoration-none'] div[class='truncate_10vw']";
        this.vendorNameValidation = "div[class='d-flex align-items-center'] a[class='custom__app__name__css text-decoration-none']";
        this.primaryOwnerNameValidation = "//div[4]//div[2]//div[1]//div[1]//div[1]//a[1]//div[1]//div[1]//div[1]";
        this.financeOwnerNameValidation = "//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[1]/div[3]/div[5]/div[2]/div[1]/div[1]/div[1]/a[1]/div[1]/div[1]/div[1]";

        // Create Subscription 
        this.clickOnDropDownRenewalTermsValue = "//select[@class='recurring_frequency_input form-control']";
        this.clickOnDropDownRenewalTerms = "//select[@class='recurring_interval_dropdown form-control text-capitalize']";
        this.clickOnNext4 = "//div[@class='d-flex flex-column']//button[@class='z__button mt-4'][normalize-space()='Next']";
        this.clickOnNext5 = "(//button[@class='z__button mt-4'][normalize-space()='Next'])[2]";
        this.clickToAddBasePrice = "//input[@class='form-check-input position-static']";
        this.addBasePrice = "//input[@placeholder='Add Base Price']";
        this.addOneTimeFee = "//div[@class='stepper__step__card active card']//div[@class='d-flex flex-wrap']//div[2]";
        this.addFee = "//input[@placeholder='Enter Amount']";
        this.clickToAddLicense = "//div[@class='add_license_button']";
        this.clickToEnterLicenseName = "//div[@class='d-flex mb-0 form-group']//input[@placeholder='Enter Name']";
        this.addCost = "//input[@placeholder='Cost']";
        this.clickToAddTenure = "//select[@class='form-control']";
        this.addLicenseDescription = "//input[@placeholder='Enter Description']";
        this.addQuantity = "//input[@placeholder='Enter Quantity']";
        this.addDiscount = "//input[@placeholder='Discount']";
        this.clickToSaveLicense = "//button[normalize-space()='Save']";
        this.clickOnNext6 = "(//button[@class='z__button undefined'])[1]";
        this.clickToAddSubscription = "(//button[normalize-space()='Add subscription'])[1]";
        this.goBackToSubscriptionPage = "//button[normalize-space()='Subscriptions']";

        // Create Perpetuals 
        this.clickToAddPerpetuals = "//button[normalize-space()='Add Perpetual Contract']";
        this.goBackToPerpetualPage = "//button[normalize-space()='Perpetuals']";

        // Vendor Count
        this.vendorCount = "tbody tr:nth-child(1) td:nth-child(5)";
    }

    async goToLicenses(){
        await this.page.locator(this.clickOnLicenses).click();
    }

    async checkCountOfTheContractt(vendorData){
        console.log('vendorData:', vendorData);
        if (!vendorData || typeof vendorData !== 'object') {
            throw new Error('vendorData must be a non-null object');
        }
        const { vendorName } = vendorData;
        console.log('vendorName:', vendorName);
        if (vendorName === undefined) {
            throw new Error('vendorName is missing from vendorData');
        }
        if (typeof vendorName !== 'string') {
            throw new Error('vendorName must be a string');
        }
        await this.page.locator(this.clickOnSearch).fill(vendorName);
        await this.page.waitForTimeout(5000); 
        const count = await this.page.locator(this.vendorCount).textContent();
        return count;
    }

    async createContract(licensesData){
        const {
            newName,
            appName,
            descName,
            vendorName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            basePrice,
            oneTimeFee,
            licenseName,
            cost,
            tenure,
            discount,
            descriptionLicense,
            quantity
        } = licensesData;

        if(vendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:vendorName
            });
            console.log(`No. of Contracts with ${vendorName} as the Vendor before creating a contract:`, count);
        }

        const baseURLFE = process.env.BASE_URL_FE;
        if(vendorName){
            await this.page.locator(this.clickOnLicenses2).click();
        }
        await this.page.locator(this.clickOnContracts).click();
        

        await this.page.locator(this.clickOnAdd).click();

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();
        

        //Url Check 
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/contract/new`);

        // Default Contract Name check 
        // const currentDefaultContractName = await this.page.locator(this.defaultName).textContent();
        // expect(currentDefaultContractName).toBe("Untitled");

        // All row visibility(Not a P0 Validation )
        await this.page.waitForSelector('text=Checklist', { state: 'visible', timeout: 250 });
        const row2Visibility = await this.page.getByText("Checklist").isVisible();
        expect(row2Visibility).toBe(true);

        await this.page.waitForSelector('text=License Details', { state: 'visible', timeout: 250 });
        const row3Visibility = await this.page.getByText("License Details").isVisible();
        expect(row3Visibility).toBe(true);

        await this.page.waitForSelector('text=Review', { state: 'visible', timeout: 250 });
        const row4Visibility = await this.page.getByText("Review").isVisible();
        expect(row4Visibility).toBe(true);
        
        // Checkbox-1 Check
        const checkbox1 = this.page.locator("//div[contains(@class,'d-flex align-items-center')]//div//input[contains(@type,'checkbox')]");
        await checkbox1.waitFor({ state: 'visible', timeout: 500 });
        const checkbox1Visibility = await checkbox1.isVisible();
        expect(checkbox1Visibility).toBe(true);
        const initialChecked1 = await checkbox1.isChecked();
        expect(initialChecked1).toBe(false);
        await checkbox1.click();
        await setTimeout(1000);
        const finalChecked1 = await checkbox1.isChecked();
        expect(finalChecked1).toBe(true);
        await checkbox1.click();

        // Checkbox-2 Check
        const checkbox2 = this.page.locator("//body/div[@id='root']/div/div[contains(@class,'large-screen-only')]/div/div[contains(@class,'createplan__wrapper')]/div[contains(@class,'create_stepper_screen_wrapper')]/div[contains(@class,'create_stepper_screen_wrapper_form_display')]/div[contains(@class,'create_stepper_redux_stepper_container')]/div[contains(@class,'stepper__wrapper')]/div[contains(@class,'stepper__step create_stepper_redux_stepper_step')]/div[contains(@class,'stepper__step__card active card')]/div[contains(@class,'rah-static rah-static--height-auto')]/div/div[contains(@class,'step__collapse card-body')]/div[contains(@class,'d-flex flex-column')]/div[contains(@class,'form-check')]/input[1]");
        await checkbox2.waitFor({ state: 'visible', timeout: 500 });
        const checkbox2Visibility = await checkbox2.isVisible();
        expect(checkbox2Visibility).toBe(true);
        const initialChecked2 = await checkbox2.isChecked();
        expect(initialChecked2).toBe(false);
        await checkbox2.click();
        await setTimeout(1000);
        const finalChecked2 = await checkbox2.isChecked();
        expect(finalChecked2).toBe(true);
        await checkbox2.click();

        // App Name
        await this.page.locator(this.contractAppName).fill(appName);
        await this.page.locator(this.clickToSelectApp).nth(0).click();
        // Description
        await this.page.locator(this.description).fill(descName);
        // Vendor Name
        if(vendorName){
            await this.page.locator(this.fillVendorName).fill(vendorName);
            await this.page.locator(this.clickToAddVendorName).nth(0).click();
        }
        // Primary Owner
        await this.page.locator(this.fillPrimaryOwner).fill(primaryOwner);
        await this.page.locator(this.clickToAddPrimaryOwner).nth(0).click();
        //Finance Owner
        await this.page.locator(this.fillFinanceOwner).fill(financeOwner);
        await this.page.locator(this.clickToAddFinanceOwner).nth(0).click();
        //Negotiation Owner
        await this.page.locator(this.fillNegotiationOwner).fill(negotiationOwner);
        await this.page.locator(this.clickToAddNegotiationOwner).nth(0).click();
        // IT Owner
        await this.page.locator(this.fillITOwner).fill(ItOwner);
        await this.page.locator(this.clickToAddITOwner).nth(0).click();
        // Start Date
        await this.page.locator(this.clickOnStartDate).click();
        await this.page.locator(this.startDate).click();
        // console.log(this.startDate);

        // xpath needed
        // const defaultContractNameAfterStartDate = await this.page.locator(this.defaultName).inputValue();
        // expect(defaultContractNameAfterStartDate).toBe(`${appName} Contract - ${this.startDate}`);

        // End Date
        await this.page.locator(this.clickOnEndDate).click();
        await this.page.locator(this.endDate).click();
        // Renew Date 
        await this.page.locator(this.clickOnRenewByDate).click();
        await this.page.locator(this.reviewDate).click();
        // Payment Date
        await this.page.locator(this.paymentDate).click();
        
        await this.page.locator(this.clickOnNext1).click();
        await this.page.locator(this.clickOnNext2).click();

        if (licenseName && cost && tenure && descriptionLicense && quantity && discount && oneTimeFee && basePrice) {
            // Add License
            if(basePrice){
                await this.page.locator(this.clickToAddBasePrice).check();
                await this.page.locator(this.addBasePrice).fill(basePrice);
            }
            if(oneTimeFee){
                await this.page.locator(this.addOneTimeFee).click();
                await this.page.locator(this.addFee).fill(oneTimeFee);
            }
            await this.page.locator(this.clickToAddLicense).click();  
            if (licenseName) {
                await this.page.locator(this.clickToEnterLicenseName).fill(licenseName);
            }
            if (cost) {
                await this.page.locator(this.addCost).fill(cost);
            }
            if (tenure) {
                // Locator needs to be improved 
                await this.page.locator('div').filter({ hasText: /^per termper lic\. termper monthper quarterper year$/ }).getByRole('combobox').selectOption(tenure);
            }
            if (descriptionLicense) {
                await this.page.locator(this.addLicenseDescription).fill(descriptionLicense);
            }
            if (quantity) {
                await this.page.locator(this.addQuantity).fill(quantity);
            }
            if(discount){
                await this.page.locator(this.addDiscount).fill(discount)
            }
            await this.page.locator(this.clickToSaveLicense).click();
        }

        await this.page.locator(this.clickOnNext3).click();
        await this.page.locator(this.clickOnAddContract).click();

        const contractName = await this.page.locator(this.getName).textContent();

        await this.page.locator(this.goBackToContractsPage).click();
        await this.page.locator(this.clickOnSearch).fill(contractName);
        await this.page.getByText(contractName).nth(0).click();

        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        const expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        if(vendorName){
            expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        }
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());

        if(vendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:vendorName
            });
            console.log(`No. of Contracts with ${vendorName} as the Vendor after contract is created:`, count);
        }
        
        
    }

    async createSubscription (licensesData){
        const {
            newName,
            appName,
            descName,
            vendorName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            renewalTermValue,
            renewalTerm,
            basePrice,
            oneTimeFee,
            licenseName,
            cost,
            tenure,
            discount,
            descriptionLicense,
            quantity
        } = licensesData;
        await this.page.locator(this.clickOnSubscriptions).click();
        await this.page.locator(this.clickOnAdd).click();

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        //Url Check 
        const baseURLFE = process.env.BASE_URL_FE;
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/subscription/new`);

        // Default Contract Name check (locator needed)
        // const currentDefaultContractName = await this.page.locator(this.defaultName).textContent();
        // expect(currentDefaultContractName).toBe("Untitled");

        // All row visibility
        await this.page.waitForSelector('text=Checklist', { state: 'visible', timeout: 500 });
        const row2Visibility = await this.page.getByText("Checklist").isVisible();
        expect(row2Visibility).toBe(true);

        await this.page.waitForSelector('text=License Details', { state: 'visible', timeout: 500 });
        const row3Visibility = await this.page.getByText("License Details").isVisible();
        expect(row3Visibility).toBe(true);

        await this.page.waitForSelector('text=Review', { state: 'visible', timeout: 500 });
        const row4Visibility = await this.page.getByText("Review").isVisible();
        expect(row4Visibility).toBe(true);

        // Checkbox-1 Check
        const checkbox1 = this.page.locator("//div[contains(@class,'d-flex align-items-center')]//div//input[contains(@type,'checkbox')]");
        await checkbox1.waitFor({ state: 'visible', timeout: 500 });
        const checkbox1Visibility = await checkbox1.isVisible();
        expect(checkbox1Visibility).toBe(true);
        const initialChecked1 = await checkbox1.isChecked();
        expect(initialChecked1).toBe(false);
        await checkbox1.click();
        await setTimeout(1000);
        const finalChecked1 = await checkbox1.isChecked();
        expect(finalChecked1).toBe(true);
        await checkbox1.click();

        // App Name
        await this.page.locator(this.contractAppName).fill(appName);
        await this.page.locator(this.clickToSelectApp).nth(0).click();
        // Description
        await this.page.locator(this.description).fill(descName);
        // Vendor Name
        await this.page.locator(this.fillVendorName).fill(vendorName);
        await this.page.locator(this.clickToAddVendorName).nth(0).click();
        // Primary Owner
        await this.page.locator(this.fillPrimaryOwner).fill(primaryOwner);
        await this.page.locator(this.clickToAddPrimaryOwner).nth(0).click();
        //Finance Owner
        await this.page.locator(this.fillFinanceOwner).fill(financeOwner);
        await this.page.locator(this.clickToAddFinanceOwner).nth(0).click();
        //Negotiation Owner
        await this.page.locator(this.fillNegotiationOwner).fill(negotiationOwner);
        await this.page.locator(this.clickToAddNegotiationOwner).nth(0).click();
        // IT Owner
        await this.page.locator(this.fillITOwner).fill(ItOwner);
        await this.page.locator(this.clickToAddITOwner).nth(0).click();
        // Start Date
        await this.page.locator(this.clickOnStartDate).click();
        await this.page.locator(this.startDate).click();
        // Renewal Term
        await this.page.locator(this.clickOnDropDownRenewalTermsValue).click();
        await this.page.getByRole('combobox').first().selectOption(renewalTermValue);
        await this.page.locator(this.clickOnDropDownRenewalTerms).click();
        await this.page.getByText(renewalTerm).nth(1).click();

        await this.page.locator(this.clickOnNext4).click();
        await this.page.locator(this.clickOnNext5).click();

        // Add License
        if (licenseName && cost && tenure && descriptionLicense && quantity && discount && oneTimeFee && basePrice) {
            if(basePrice){
                await this.page.locator(this.clickToAddBasePrice).check();
                await this.page.locator(this.addBasePrice).fill(basePrice);
            }
            if(oneTimeFee){
                await this.page.locator(this.addOneTimeFee).click();
                await this.page.locator(this.addFee).fill(oneTimeFee);
            }
            await this.page.locator(this.clickToAddLicense).click();
            if (licenseName) {
                await this.page.locator(this.clickToEnterLicenseName).fill(licenseName);
            }
            if (cost) {
                await this.page.locator(this.addCost).fill(cost);
            }
            if (tenure) {
                // Locator needs to be improved 
                await this.page.locator('div').filter({ hasText: /^per termper monthper quarterper year$/ }).getByRole('combobox').selectOption(tenure);
            }
            if (descriptionLicense) {
                await this.page.locator(this.addLicenseDescription).fill(descriptionLicense);
            }
            if (quantity) {
                await this.page.locator(this.addQuantity).fill(quantity);
            }
            if(discount){
                await this.page.locator(this.addDiscount).fill(discount)
            }
            await this.page.locator(this.clickToSaveLicense).click();
            
        }
        await this.page.locator(this.clickOnNext6).click();
        await this.page.locator(this.clickToAddSubscription).click();

        const subscriptionName = await this.page.locator(this.getName).textContent();

        await this.page.locator(this.goBackToSubscriptionPage).click();
        await this.page.locator(this.clickOnSearch).fill(subscriptionName);
        await this.page.getByText(subscriptionName).nth(0).click();

        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        const expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());
        

    }
    async createPerpetuals(licensesData){
        const {
            newName,
            appName,
            descName,
            vendorName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            oneTimeFee,
            licenseName,
            cost,
            discount,
            descriptionLicense,
            quantity
        } = licensesData;
        await this.page.locator(this.clickOnPerpetual).click();
        await this.page.locator(this.clickOnAdd).click();

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        //Url Check 
        const baseURLFE = process.env.BASE_URL_FE;
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/perpetual/new`);

        // All row Visiblity
        await this.page.waitForSelector('text=Checklist', { state: 'visible', timeout: 250 });
        const row2Visibility = await this.page.getByText("Checklist").isVisible();
        expect(row2Visibility).toBe(true);

        await this.page.waitForSelector('text=License Details', { state: 'visible', timeout: 250 });
        const row3Visibility = await this.page.getByText("License Details").isVisible();
        expect(row3Visibility).toBe(true);

        await this.page.waitForSelector('text=Review', { state: 'visible', timeout: 250 });
        const row4Visibility = await this.page.getByText("Review").isVisible();
        expect(row4Visibility).toBe(true);

        // Checkbox-1 Check

        //const startTime = performance.now();

        const checkbox1 = this.page.locator("//div[contains(@class,'d-flex align-items-center')]//div//input[contains(@type,'checkbox')]");
        await checkbox1.waitFor({ state: 'visible' });
        
        //const endTime = performance.now();
        //console.log("Start time : " ,startTime);
        //console.log("End Time : " , endTime);
        
        const checkbox1Visibility = await checkbox1.isVisible();
        expect(checkbox1Visibility).toBe(true);
        const initialChecked1 = await checkbox1.isChecked();
        expect(initialChecked1).toBe(false);
        await checkbox1.click();
        await setTimeout(1000);
        const finalChecked1 = await checkbox1.isChecked();
        expect(finalChecked1).toBe(true);
        await checkbox1.click();

        // App Name
        await this.page.locator(this.contractAppName).fill(appName);
        await this.page.locator(this.clickToSelectApp).nth(0).click();
        // Description
        await this.page.locator(this.description).fill(descName);
        // Vendor Name
        await this.page.locator(this.fillVendorName).fill(vendorName);
        await this.page.locator(this.clickToAddVendorName).nth(0).click();
        // Primary Owner
        await this.page.locator(this.fillPrimaryOwner).fill(primaryOwner);
        await this.page.locator(this.clickToAddPrimaryOwner).nth(0).click();
        //Finance Owner
        await this.page.locator(this.fillFinanceOwner).fill(financeOwner);
        await this.page.locator(this.clickToAddFinanceOwner).nth(0).click();
        //Negotiation Owner
        await this.page.locator(this.fillNegotiationOwner).fill(negotiationOwner);
        await this.page.locator(this.clickToAddNegotiationOwner).nth(0).click();
        // IT Owner
        await this.page.locator(this.fillITOwner).fill(ItOwner);
        await this.page.locator(this.clickToAddITOwner).nth(0).click();
        // Start Date
        await this.page.locator(this.clickOnStartDate).click();
        await this.page.locator(this.startDate).click();
        // Payment Date
        await this.page.locator(this.paymentDate).click();

        await this.page.locator(this.clickOnNext4).click();
        await this.page.locator(this.clickOnNext5).click();

        // Add License
        if (licenseName && cost && descriptionLicense && quantity && discount && oneTimeFee ) {
            if(oneTimeFee){
                await this.page.locator(this.addOneTimeFee).click();
                await this.page.locator(this.addFee).fill(oneTimeFee);
            }
            await this.page.locator(this.clickToAddLicense).click();
            if (licenseName) {
                await this.page.locator(this.clickToEnterLicenseName).fill(licenseName);
            }
            if (cost) {
                await this.page.locator(this.addCost).fill(cost);
            }
            if (descriptionLicense) {
                await this.page.locator(this.addLicenseDescription).fill(descriptionLicense);
            }
            if (quantity) {
                await this.page.locator(this.addQuantity).fill(quantity);
            }
            if(discount){
                await this.page.locator(this.addDiscount).fill(discount)
            }
            await this.page.locator(this.clickToSaveLicense).click();
        }
        await this.page.locator(this.clickOnNext6).click();
        await this.page.locator(this.clickToAddPerpetuals).click();
        
        const perpetualName = await this.page.locator(this.getName).textContent();
        await this.page.locator(this.goBackToPerpetualPage).click();
        await this.page.locator(this.clickOnSearch).fill(perpetualName);
        await this.page.getByText(perpetualName).nth(0).click();

        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        const expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());

    }
    async navigateRenewals(){
        await this.page.locator(this.clickOnRenewals);
    }
    async navigateVendors(){
        await this.page.locator(this.clickOnVendors).click();
    }
    
}
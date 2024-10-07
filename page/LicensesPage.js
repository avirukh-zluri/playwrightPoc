const { expect } = require('@playwright/test');

export class LicensePage{
    constructor(page){
        this.page = page;
        this.clickOnLicenses = "//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]";
        this.clickOnSubscriptions = "//a[@href='/licenses#allSubscriptions']";
        this.clickOnContracts = "//a[@href='/licenses#allContracts']";
        this.clickOnPerpetual = "//a[@href='/licenses#allPerpetualContracts']";
        this.clickOnRenewals = "//span[normalize-space()='Renewals']";
        this.clickOnVendors = "//span[normalize-space()='Vendors']";

        // Create Contract
        this.clickOnAdd = "//button[@class='appsad mr-3']";

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

        this.getContractName = "(//div[@class='bold-600 font-18 ml-1'])[1]";
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
        this.clickOnNext6 = "(//button[@class='z__button undefined'])[1]";
        this.clickToAddSubscription = "(//button[normalize-space()='Add subscription'])[1]";

        // Create Perpetuals 
        this.clickToAddPerpetuals = "//button[normalize-space()='Add Perpetual Contract']";
    }

    async goToLicenses(){
        await this.page.locator(this.clickOnLicenses).click();
    }
    async createContract(licensesData){
        const {
            appName,
            descName,
            vendorName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner
        } = licensesData;
        await this.page.locator(this.clickOnContracts).click();

        await this.page.locator(this.clickOnAdd).click();
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
        await this.page.locator(this.clickOnNext3).click();
        await this.page.locator(this.clickOnAddContract).click();

        const contractName = await this.page.locator(this.getContractName).textContent();

        await this.page.locator(this.goBackToContractsPage).click();
        await this.page.locator(this.clickOnSearch).fill(contractName);
        await this.page.getByText(contractName).nth(0).click();

        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        const expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());
        
    }

    async createSubscription (licensesData){
        const {
            appName,
            descName,
            vendorName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            renewalTermValue,
            renewalTerm
        } = licensesData;
        await this.page.locator(this.clickOnSubscriptions).click();
        await this.page.locator(this.clickOnAdd).click();
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
        await this.page.locator(this.clickOnNext6).click();
        await this.page.locator(this.clickToAddSubscription).click();
        

    }
    async createPerpetuals(licensesData){
        const {
            appName,
            descName,
            vendorName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
        } = licensesData;
        await this.page.locator(this.clickOnPerpetual).click();
        await this.page.locator(this.clickOnAdd).click();
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
        await this.page.locator(this.clickOnNext6).click();
        // await this.page.locator(this.clickToAddPerpetuals).click();

    }
    async navigateRenewals(){
        await this.page.locator(this.clickOnRenewals);
    }
    async navigateVendors(){
        await this.page.locator(this.clickOnVendors).click();
    }
}
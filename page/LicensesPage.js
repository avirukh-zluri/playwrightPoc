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
        endDate.setDate(endDate.getDate() + 3);
        const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        this.endDate = `//abbr[contains(@aria-label,'${formattedEndDate}')]`;

        this.clickOnRenewByDate = "//div[contains(text(),'Renew by Date')]";
        const renewDate = new Date();
        renewDate.setDate(renewDate.getDate() + 2);
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
        this.licenseCost = "//div[contains(@class,'rah-static rah-static--height-auto')]//div//div[contains(@class,'step__collapse card-body')]//div//div[contains(@class,'d-flex align-items-center font-12')]";
        this.clickOnUsageBasedLicense = "//div[contains(@class,'deselected_license_type')]";
        this.licenseAmount = "//div[contains(@class,'d-flex justify-content-between')]//div[contains(@class,'grey font-14')]";

        this.clickOnNext6 = "(//button[@class='z__button undefined'])[1]";
        this.clickToAddSubscription = "(//button[normalize-space()='Add subscription'])[1]";
        this.goBackToSubscriptionPage = "//button[normalize-space()='Subscriptions']";

        // Create Perpetuals 
        this.clickToAddPerpetuals = "//button[normalize-space()='Add Perpetual Contract']";
        this.goBackToPerpetualPage = "//button[normalize-space()='Perpetuals']";

        // Vendor Count
        this.vendorCount = "tbody tr:nth-child(1) td:nth-child(5)";

        // Custom Fields 
        this.cfApp = "//div[@class='row suggestion_menu_application_name_row']"; 
        this.cfUser = "//div[@class='row suggestion_menu_application_name_row']";

        // Renewal Validation
        this.clickOnListView = "//button[contains(@class,'z__button')]";
        this.contractNameRenewalsPage = "//tbody/tr[1]/td[4]"

        // Add New Application 
        this.clickToSelectAppOwner = "//div[@class='addappsmodal__middle']//button[1]";
        this.clickOnAddApplication = "//button[normalize-space()='Add Application']";

        // New vendor
        this.clickToAddVendorOwner = "//div[@class='addContractModal__body_upper_inner']//button[1]";

        // Renewing an existing contract 
        this.enterContractName = "//input[@placeholder='Enter Old Contract Name']";
        this.selectOldContract = "//div[@class='stepper__step__card active card']//button[1]";
        this.startDateChange = "//div[@class='w-50 d-flex flex-column pr-1']//div[@class='position-relative d-flex flex-row border-1 border-radius-4 font-12 align-items-center pl-1 pr-2 cursor-pointer']";
        this.endDateChange = "//div[@class='w-50 d-flex flex-column pl-1']//div[@class='position-relative d-flex flex-row border-1 border-radius-4 font-12 align-items-center pl-1 pr-2 cursor-pointer']";
        this.payementDateChange = "//div[contains(@class,'d-flex flex-column w-50 mt-2')]//div//div[contains(@class,'position-relative d-flex flex-row border-1 border-radius-4 font-12 align-items-center pl-1 pr-2 cursor-pointer')]";

        // Custom field validation 
        this.cf1Vlaidation = "//div[contains(text(),'CF1')]//..//div[@class='schedule-name-inline-edit']";
        this.cf2Vlaidation = "//div[contains(text(),'CF2')]//..//div[@class='schedule-name-inline-edit']";
        this.cf2Boolean = "//div[contains(text(),'CF_Boolean')]//..//div[@class='schedule-name-inline-edit']";
        this.cfApp1 = "//div[contains(text(),'CF_App')]//..//div[@class='schedule-name-inline-edit']";
        this.cfUser1 = "//div[contains(text(),'CF_User')]//..//div[@class='schedule-name-inline-edit']";

        // Contract Overview Page Validation 
        this.licenseInfo = "//div[contains(@class,'app_details_header_text')]";
    }

    async goToLicenses(){
        await this.page.locator(this.clickOnLicenses).click();
    }

    async pollForSearchResult(searchName, totalDurationSec = 300, intervalSec = 20) {
        const startTime = Date.now();
        const endTime = startTime + (totalDurationSec * 1000);
        const intervalMs = intervalSec * 1000;
        let attemptCount = 0;
    
        while (Date.now() < endTime) {
            attemptCount++;    
            try {
                // Refresh page and switch to list view at the start of each attempt (except first attempt)
                if (attemptCount > 1) {
                    await this.page.reload({ waitUntil: 'networkidle' });
                    
                    const listViewButton = this.page.locator(this.clickOnListView).first();
                    await listViewButton.waitFor({ state: 'visible' });
                    await listViewButton.click();
                    
                    await this.page.waitForTimeout(3000);
                }
    
                const searchInput = this.page.getByPlaceholder('Search');
                await searchInput.fill(searchName);
                await this.page.waitForTimeout(3000);
                await this.page.locator(this.contractNameRenewalsPage)
                    .waitFor({ state: 'visible', timeout: 10000 });
                    
                const nameElement = this.page.locator(this.contractNameRenewalsPage);
                const nameText = await nameElement.textContent();
                // console.log("newName: ",nameText);
               if (nameText === searchName) {
                    expect(nameText).toEqual(searchName);
                    return true; 
                }
    
            } catch (error) {
                expect.soft(true).toBeTruthy(`Attempt ${attemptCount} failed: ${error.message}`);
            }
            const remainingTime = endTime - Date.now();
            if (remainingTime > intervalMs) {
                await this.page.waitForTimeout(intervalMs);
            }
        }
        throw new Error(`Failed to find "${searchName}" after ${attemptCount} attempts (${totalDurationSec} seconds)`);
    }

    async renewalValidation(testName){
        const {
            newName
        } = testName;
        // await this.page.reload({ waitUntil: 'domcontentloaded' });
        // await this.navigateRenewals();
        // await this.page.locator(this.clickOnListView).first().click();
        // // await this.page.getByPlaceholder('Search').fill(newName);
        // // await this.page.locator(this.contractNameRenewalsPage).waitFor({state: 'visible'});
        // // const nameContract = await this.page.locator(this.contractNameRenewalsPage).textContent(); 

        // // expect(nameContract).toEqual(newName);
        // try {
        //     await this.pollForSearchResult(newName, 300, 20);
        // } catch (error) {
        //     console.error('Polling failed:', error.message);
        // }
        try {
            // Wait for page load after reload
            await this.page.reload({ waitUntil: 'networkidle' });
            
            // Navigate and wait for list view
            await this.navigateRenewals();
            const listViewButton = this.page.locator(this.clickOnListView).first();
            await listViewButton.waitFor({ state: 'visible' });
            await listViewButton.click();
            
            // Execute polling with try-catch
            await this.pollForSearchResult(newName)
                .catch(async (error) => {
                    await expect.soft(true).toBeTruthy(`Initial polling failed: ${error.message}`);
                    // Optional: Add recovery steps here if needed
                    throw error; // Re-throw to be caught by outer try-catch
                });
                
        } catch (error) {
            await expect.soft(true).toBeTruthy(`Renewal validation failed: ${error.message}`);
            throw error; // Re-throw to fail the test
        }
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

    async validateNotification(expectedText, timeout = 30000) {
        const notification = await this.page.waitForSelector("//div[@class='notification_title']", { 
            state: 'visible',
            timeout 
        });
        const notificationText = await notification.textContent();
        expect(notificationText.toLowerCase()).toContain(expectedText.toLowerCase());
    }

    async createContract(licensesData){
        const {
            newName,
            appName,
            newAppName,
            appOwner,
            category,
            descName,
            newVendorName,
            vendorName,
            vendorOwner,
            websiteName,
            vendorContactName,
            jobTitle,
            vendorContactEmail,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            basePrice,
            oneTimeFee,
            licenseName,
            licenseNameUsageBased,
            cost,
            tenure,
            discount,
            descriptionLicense,
            quantity, 
            CF1,
            CF_APP,
            CF_USER,
            usageBased,
            quantityUsageBased,
            costUsageBased
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
        if(!newAppName){
            await this.page.locator(this.contractAppName).fill(appName);
            await this.page.locator(this.clickToSelectApp).nth(0).click();
        }
        if(newAppName){
            await this.page.locator(this.contractAppName).fill(newAppName);
            await this.page.getByRole('button', { name: '+ Add a new application' }).click();
            await this.page.getByPlaceholder('Application').click();
            await this.page.getByPlaceholder('Add Category').click();
            await this.page.getByRole('button', { name: `${category}` }).click();
            await this.page.getByPlaceholder('Add Owner').click();
            await this.page.getByPlaceholder('Add Owner').fill(appOwner);
            await this.page.locator(this.clickToSelectAppOwner).first().click();
            await this.page.locator(this.clickOnAddApplication).click();
        }
        // Description
        await this.page.locator(this.description).fill(descName);
        // Vendor Name
        if(vendorName){
            await this.page.locator(this.fillVendorName).fill(vendorName);
            await this.page.locator(this.clickToAddVendorName).nth(0).click();
        }
        // New Vendor Name 
        if(newVendorName){
            await this.page.locator(this.fillVendorName).fill(newVendorName);
            await this.page.getByRole('button', { name: '+ Add New Vendor' }).click();
            await this.page.getByPlaceholder('Vendor Name', { exact: true }).click();
            await this.page.getByPlaceholder('Vendor Name', { exact: true }).fill(newVendorName);
            await this.page.getByPlaceholder('Add Owner').click();
            await this.page.getByPlaceholder('Add Owner').fill(vendorOwner);
            await this.page.locator(this.clickToAddVendorOwner).first().click();
            await this.page.getByPlaceholder('Website').click();
            await this.page.getByPlaceholder('Website').fill(websiteName);
            await this.page.getByPlaceholder('Name', { exact: true }).click();
            await this.page.getByPlaceholder('Name', { exact: true }).fill(vendorContactName);
            await this.page.getByPlaceholder('Job Title').click();
            await this.page.getByPlaceholder('Job Title').fill(jobTitle);
            await this.page.getByPlaceholder('Email').click();
            await this.page.getByPlaceholder('Email').fill(vendorContactEmail);
            await this.page.getByRole('button', { name: 'Add Vendor' }).click();
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

        if(CF1 &&  CF_APP && CF_USER){
            if(CF1){
                await this.page.getByPlaceholder('Enter CF1').click();
                await this.page.getByPlaceholder('Enter CF1').fill(CF1);
            }
            await setTimeout(2000);
            // CF_2
            await this.page.getByText('Select CF2').click();
            await this.page.locator('.z__select--options__container--option').first().click();
            await setTimeout(2000);
            //CF_BOOLEAN
            await this.page.getByText('Select CF_Boolean').click();
            await this.page.locator('.z__select--options__container--option').first().click();

            if(CF_APP){
                await this.page.getByPlaceholder('CF_App').click();
                await this.page.getByPlaceholder('CF_App').fill(CF_APP);
                await this.page.locator(this.cfApp).first().click();
                await setTimeout(2000);
            }
            if(CF_USER){
                await this.page.getByPlaceholder('CF_User').click();
                await this.page.getByPlaceholder('CF_User').fill(CF_USER);
                await this.page.locator(this.cfUser).first().click();
                await setTimeout(2000);
            }
        }
        
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
            await this.page.waitForTimeout(2000);
            var licenesCosttotalSeatBased = await this.page.locator(this.licenseCost).nth(17).textContent();

            if(usageBased){
                await this.page.locator(this.clickToAddLicense).click();
                await this.page.locator(this.clickOnUsageBasedLicense).click();
                await this.page.locator(this.clickToEnterLicenseName).fill(licenseNameUsageBased);
                await this.page.locator(this.addCost).fill(cost);
                await this.page.locator('div').filter({ hasText: /^per termper lic\. termper monthper quarterper year$/ }).getByRole('combobox').selectOption(tenure);
                await this.page.locator(this.addLicenseDescription).fill(descriptionLicense);
                await this.page.locator(this.addQuantity).fill(quantityUsageBased);
                await this.page.locator(this.addDiscount).fill(costUsageBased)
                await this.page.locator(this.clickToSaveLicense).click();
                var licenesCosttotalUsageBased = await this.page.locator(this.licenseCost).nth(38).textContent();

            }
            var totalLicenseAmount = await this.page.locator(this.licenseAmount).textContent();
        }

        await this.page.locator(this.clickOnNext3).click();
        await this.page.locator(this.clickOnAddContract).click();

        await this.validateNotification("contract has been successfully added");

        const contractName = await this.page.locator(this.getName).textContent();

        await this.page.locator(this.goBackToContractsPage).click();
        await this.page.locator(this.clickOnSearch).fill(contractName);
        await this.page.getByText(contractName).nth(0).click();
        var expectedVendorName = null
        if(vendorName){
            expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        }
        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        if(!newAppName){
            expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        }
        if(newAppName){
            expect(newAppName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        }
        if(vendorName){
            expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        }
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());
        if(CF1 &&  CF_APP && CF_USER){
            const expectedCF1 = await this.page.locator(this.cf1Vlaidation).textContent();
            const expectedcfApp = await this.page.locator(this.cfApp1).textContent();
            const expectedcfUser = await this.page.locator(this.cfUser1).textContent();

            expect(CF1.toLowerCase()).toEqual(expectedCF1.toLowerCase());
            expect(CF_APP.toLowerCase()).toEqual(expectedcfApp.toLowerCase());
            expect(CF_USER.toLowerCase()).toEqual(expectedcfUser.toLowerCase());
        }

        if(vendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:vendorName
            });
            console.log(`No. of Contracts with ${vendorName} as the Vendor after contract is created:`, count);
        }
        if(newVendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:newVendorName
            });
            console.log(`No. of Contracts with ${newVendorName} as the Vendor after contract is created:`, count);
        }

        // Overview Page validaitons 
        if(licenseName && cost && tenure && descriptionLicense && quantity && discount && oneTimeFee && basePrice){
            if(!usageBased){
                const expectedTotalCostSeatBased = await this.page.locator(this.licenseInfo).first().textContent();
                expect(expectedTotalCostSeatBased).toEqual(totalLicenseAmount);

                const numberOfSeatBasedLicense = await this.page.locator(this.licenseInfo).nth(1).textContent();
                expect(numberOfSeatBasedLicense).toEqual(quantity)

                const numberOfUsageBased = await this.page.locator(this.licenseInfo).nth(4).textContent();
                expect(Number(numberOfUsageBased)).toEqual(0);
            }
            else{
                // licenseInfo 11 -- 10 -- 11 -- 10 and cost at every 7th element 2nd row
                const expectedTotalCostSeatBased = await this.page.locator(this.licenseInfo).first().textContent();
                expect(expectedTotalCostSeatBased).toEqual(totalLicenseAmount);

                const numberOfSeatBasedLicense = await this.page.locator(this.licenseInfo).nth(1).textContent();
                expect(numberOfSeatBasedLicense).toEqual(quantity)

                const numberOfUsageBased = await this.page.locator(this.licenseInfo).nth(4).textContent();
                expect(numberOfUsageBased).toEqual(quantityUsageBased);

                // License Div at Bottom 
                // 9 -- 8 -- 9 -- 8 and cost at every 8th element 2nd row
                const expectedCostTotalSeatBased = await this.page.locator("//div[contains(@class, 'group_row')]//div[contains(@class, 'd-flex align-items-center font-12')]").nth(16).textContent();
                expect(expectedCostTotalSeatBased).toEqual(licenesCosttotalSeatBased);

                const expectedCostTotalUsageBased = await this.page.locator("//div[contains(@class, 'group_row')]//div[contains(@class, 'd-flex align-items-center font-12')]").nth(33).textContent();
                expect(expectedCostTotalUsageBased).toEqual(licenesCosttotalUsageBased);
            }
        }
    }

    async createContractWithNoApplication(licensesData){
        const {
            newName,
            descName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            contractFromVendor
        } = licensesData;
        const baseURLFE = process.env.BASE_URL_FE;
        if(!contractFromVendor){
            await this.page.locator(this.clickOnContracts).click();
            await this.page.locator(this.clickOnAdd).click();
        }
        

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/contract/new`);

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

        // Description
        await this.page.locator(this.description).fill(descName);
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

        await this.validateNotification("contract has been successfully added");

        const contractName = await this.page.locator(this.getName).textContent();

        await this.page.locator(this.goBackToContractsPage).click();
        await this.page.locator(this.clickOnSearch).fill(contractName);
        await this.page.getByText(contractName).nth(0).click();

        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());
    }
    
    async renewContractWithExistingContract(licensesData){
        const {
            oldContractName,
            newData,
            newName,
            CF1,
            CF_APP,
            CF_USER
        } = licensesData;
        const baseURLFE = process.env.BASE_URL_FE;

        await this.page.locator(this.clickOnContracts).click();
        await this.page.locator(this.clickOnAdd).click();

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/contract/new`);

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

        // Checkbox - renewing an existing contract
        const checkbox2 = this.page.locator("//body/div[@id='root']/div/div[contains(@class,'large-screen-only')]/div/div[contains(@class,'createplan__wrapper')]/div[contains(@class,'create_stepper_screen_wrapper')]/div[contains(@class,'create_stepper_screen_wrapper_form_display')]/div[contains(@class,'create_stepper_redux_stepper_container')]/div[contains(@class,'stepper__wrapper')]/div[contains(@class,'stepper__step create_stepper_redux_stepper_step')]/div[contains(@class,'stepper__step__card active card')]/div[contains(@class,'rah-static rah-static--height-auto')]/div/div[contains(@class,'step__collapse card-body')]/div[contains(@class,'d-flex flex-column')]/div[contains(@class,'form-check')]/input[1]");
        await checkbox2.waitFor({ state: 'visible', timeout: 500 });
        const checkbox2Visibility = await checkbox2.isVisible();
        expect(checkbox2Visibility).toBe(true);
        const initialChecked2 = await checkbox2.isChecked();
        expect(initialChecked2).toBe(false);
        await checkbox2.click();

        await this.page.locator(this.enterContractName).fill(oldContractName);
        await this.page.locator(this.selectOldContract).click();
        
        if(newData){

            // Start Date
            await this.page.locator(this.startDateChange).first().click();
            await this.page.waitForTimeout(5000);
            const currentstartDate = await this.page.locator(this.startDateChange).first().textContent();
            // Parse the date
            const [day, month, year] = currentstartDate.split(' ');
            const currentDate = new Date(`${month} ${day}, ${year}`);
            // Add one day
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 1);
            // Format the next date in the same format
            const nextDayStart = nextDate.getDate();
            // const nextMonth = nextDate.toLocaleString('en-US', { month: 'short' });
            // const nextYear = nextDate.getFullYear();
            // const formattedNextDate = `${nextDayStart} ${nextMonth} ${nextYear}`;
            // Find and click the next date
            await this.page.locator(`text="${nextDayStart}"`).click();
            await this.page.waitForTimeout(2000);


            // End Date
            await this.page.locator(this.endDateChange).first().click();
            await this.page.waitForTimeout(5000);
            const currentendDate = await this.page.locator(this.endDateChange).first().textContent();
            // Parse the date
            const [dayE, monthE, yearE] = currentendDate.split(' ');
            const currentDateE = new Date(`${monthE} ${dayE}, ${yearE}`);
            // Add one day
            const nextDateE = new Date(currentDateE);
            nextDateE.setDate(currentDateE.getDate() + 1);
            const nextDayEnd = nextDateE.getDate();
            // Find and click the next date
            await this.page.locator(`text="${nextDayEnd}"`).click();
            await this.page.waitForTimeout(5000);



            // Payment Date
            await this.page.locator(this.payementDateChange).click();
            await this.page.waitForTimeout(5000);
            const currentendDateP = await this.page.locator(this.payementDateChange).textContent();
            // Parse the date
            const [dayP, monthP, yearP] = currentendDateP.split(' ');
            const currentDateP = new Date(`${monthP} ${dayP}, ${yearP}`);
            // Add one day
            const nextDateP = new Date(currentDateP);
            nextDateP.setDate(currentDateP.getDate() + 1);
            const nextDayPayment = nextDateP.getDate();
            // Find and click the next date
            await this.page.locator(`text="${nextDayPayment}"`).click();
            


            // Custom Fields
            if(CF1 &&  CF_APP && CF_USER){
                if(CF1){
                    await this.page.getByPlaceholder('Enter CF1').click();
                    await this.page.getByPlaceholder('Enter CF1').fill(CF1);
                }
                await setTimeout(2000);
                // CF_2
                await this.page.getByText('Select CF2').click();
                await this.page.locator('.z__select--options__container--option').first().click();
                await setTimeout(2000);
                //CF_BOOLEAN
                await this.page.getByText('Select CF_Boolean').click();
                await this.page.locator('.z__select--options__container--option').first().click();
    
                if(CF_APP){
                    await this.page.getByPlaceholder('CF_App').click();
                    await this.page.getByPlaceholder('CF_App').fill(CF_APP);
                    await this.page.locator(this.cfApp).first().click();
                    await setTimeout(2000);
                }
                if(CF_USER){
                    await this.page.getByPlaceholder('CF_User').click();
                    await this.page.getByPlaceholder('CF_User').fill(CF_USER);
                    await this.page.locator(this.cfUser).first().click();
                    await setTimeout(2000);
                }
            }


        }
        await this.page.locator(this.clickOnNext1).click();
        await this.page.locator(this.clickOnNext2).click();

        await this.page.locator(this.clickOnNext3).click();
        await this.page.locator(this.clickOnAddContract).click();

        await this.validateNotification("contract has been successfully added");
        
        if(newData){
            const contractName = await this.page.locator(this.getName).textContent();

            await this.page.locator(this.goBackToContractsPage).click();
            await this.page.locator(this.clickOnSearch).fill(contractName);
            await this.page.getByText(contractName).nth(0).click();
            
            if(CF1 &&  CF_APP && CF_USER){
                const expectedCF1 = await this.page.locator(this.cf1Vlaidation).textContent();
                const expectedcfApp = await this.page.locator(this.cfApp1).textContent();
                const expectedcfUser = await this.page.locator(this.cfUser1).textContent();

                expect(CF1.toLowerCase()).toEqual(expectedCF1.toLowerCase());
                expect(CF_APP.toLowerCase()).toEqual(expectedcfApp.toLowerCase());
                expect(CF_USER.toLowerCase()).toEqual(expectedcfUser.toLowerCase());
            }
        }

    }

    async createSubscription (licensesData){
        const {
            newName,
            appName,
            newAppName,
            appOwner,
            category,
            descName,
            newVendorName,
            vendorName,
            vendorOwner,
            websiteName,
            vendorContactName,
            jobTitle,
            vendorContactEmail,
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
            quantity,
            CF1,
            CF_APP,
            CF_USER,
            usageBased,
            licenseNameUsageBased,
            quantityUsageBased,
            costUsageBased
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

        await this.page.locator(this.clickOnSubscriptions).click();
        await this.page.locator(this.clickOnAdd).click();

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        //Url Check 
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
        if(!newAppName){
            await this.page.locator(this.contractAppName).fill(appName);
            await this.page.locator(this.clickToSelectApp).nth(0).click();
        }
        if(newAppName){
            await this.page.locator(this.contractAppName).fill(newAppName);
            await this.page.getByRole('button', { name: '+ Add a new application' }).click();
            await this.page.getByPlaceholder('Application').click();
            await this.page.getByPlaceholder('Add Category').click();
            await this.page.getByRole('button', { name: `${category}` }).click();
            await this.page.getByPlaceholder('Add Owner').click();
            await this.page.getByPlaceholder('Add Owner').fill(appOwner);
            await this.page.locator(this.clickToSelectAppOwner).first().click();
            await this.page.locator(this.clickOnAddApplication).click();
        }
        // Description
        await this.page.locator(this.description).fill(descName);
        // Vendor Name
        if(vendorName){
            await this.page.locator(this.fillVendorName).fill(vendorName);
            await this.page.locator(this.clickToAddVendorName).nth(0).click();
        }
        // New Vendor Name 
        if(newVendorName){
            await this.page.locator(this.fillVendorName).fill(newVendorName);
            await this.page.getByRole('button', { name: '+ Add New Vendor' }).click();
            await this.page.getByPlaceholder('Vendor Name', { exact: true }).click();
            await this.page.getByPlaceholder('Vendor Name', { exact: true }).fill(newVendorName);
            await this.page.getByPlaceholder('Add Owner').click();
            await this.page.getByPlaceholder('Add Owner').fill(vendorOwner);
            await this.page.locator(this.clickToAddVendorOwner).first().click();
            await this.page.getByPlaceholder('Website').click();
            await this.page.getByPlaceholder('Website').fill(websiteName);
            await this.page.getByPlaceholder('Name', { exact: true }).click();
            await this.page.getByPlaceholder('Name', { exact: true }).fill(vendorContactName);
            await this.page.getByPlaceholder('Job Title').click();
            await this.page.getByPlaceholder('Job Title').fill(jobTitle);
            await this.page.getByPlaceholder('Email').click();
            await this.page.getByPlaceholder('Email').fill(vendorContactEmail);
            await this.page.getByRole('button', { name: 'Add Vendor' }).click();
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
        // Renewal Term
        await this.page.locator(this.clickOnDropDownRenewalTermsValue).click();
        await this.page.getByRole('combobox').first().selectOption(renewalTermValue);
        await this.page.locator(this.clickOnDropDownRenewalTerms).click();
        await this.page.getByText(renewalTerm).nth(1).click();

        if(CF1 &&  CF_APP && CF_USER){
            if(CF1){
                await this.page.getByPlaceholder('Enter CF1').click();
                await this.page.getByPlaceholder('Enter CF1').fill(CF1);
            }
            await setTimeout(2000);
            // CF_2
            await this.page.getByText('Select CF2').click();
            await this.page.locator('.z__select--options__container--option').first().click();
            await setTimeout(2000);
            //CF_BOOLEAN
            await this.page.getByText('Select CF_Boolean').click();
            await this.page.locator('.z__select--options__container--option').first().click();

            if(CF_APP){
                await this.page.getByPlaceholder('CF_App').click();
                await this.page.getByPlaceholder('CF_App').fill(CF_APP);
                await this.page.locator(this.cfApp).first().click();
                await setTimeout(2000);
            }
            if(CF_USER){
                await this.page.getByPlaceholder('CF_User').click();
                await this.page.getByPlaceholder('CF_User').fill(CF_USER);
                await this.page.locator(this.cfUser).first().click();
                await setTimeout(2000);
            }
        }

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
            await this.page.waitForTimeout(5000);
            var licenesCosttotalSeatBased = await this.page.locator(this.licenseCost).nth(17).textContent();

            if(usageBased){
                await this.page.locator(this.clickToAddLicense).click();
                await this.page.locator(this.clickOnUsageBasedLicense).click();
                await this.page.locator(this.clickToEnterLicenseName).fill(licenseNameUsageBased);
                await this.page.locator(this.addCost).fill(costUsageBased);
                await this.page.locator('div').filter({ hasText: /^per termper monthper quarterper year$/ }).getByRole('combobox').selectOption(tenure);                await this.page.locator(this.addLicenseDescription).fill(descriptionLicense);
                await this.page.locator(this.addQuantity).fill(quantityUsageBased);
                await this.page.locator(this.addDiscount).fill(discount)
                await this.page.locator(this.clickToSaveLicense).click();
                var licenesCosttotalUageBased = await this.page.locator(this.licenseCost).nth(38).textContent();

            }
            var totalLicenseAmount = await this.page.locator(this.licenseAmount).textContent();
            
        }
        await this.page.locator(this.clickOnNext6).click();
        await this.page.locator(this.clickToAddSubscription).click();

        await this.validateNotification("subscription has been successfully added");

        const subscriptionName = await this.page.locator(this.getName).textContent();

        await this.page.locator(this.goBackToSubscriptionPage).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.clickOnSearch).fill(subscriptionName);
        await this.page.getByText(subscriptionName).nth(0).click();


        var expectedVendorName = null
        if(vendorName){
            expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        }
        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        if(!newAppName){
            expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        }
        if(newAppName){
            expect(newAppName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        }
        if(vendorName){
            expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        }
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());
        if(CF1 &&  CF_APP && CF_USER){
            const expectedCF1 = await this.page.locator(this.cf1Vlaidation).textContent();
            const expectedcfApp = await this.page.locator(this.cfApp1).textContent();
            const expectedcfUser = await this.page.locator(this.cfUser1).textContent();

            expect(CF1.toLowerCase()).toEqual(expectedCF1.toLowerCase());
            expect(CF_APP.toLowerCase()).toEqual(expectedcfApp.toLowerCase());
            expect(CF_USER.toLowerCase()).toEqual(expectedcfUser.toLowerCase());
        }

        if(vendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:vendorName
            });
            console.log(`No. of Contracts with ${vendorName} as the Vendor after contract is created:`, count);
        }
        if(newVendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:newVendorName
            });
            console.log(`No. of Contracts with ${newVendorName} as the Vendor after contract is created:`, count);
        }
        // Overview Page validaitons 
        if(licenseName && cost && tenure && descriptionLicense && quantity && discount && oneTimeFee && basePrice){
            if(!usageBased){
                const expectedTotalCostSeatBased = await this.page.locator(this.licenseInfo).first().textContent();
                expect(expectedTotalCostSeatBased).toEqual(licenesCosttotalUsageBased);

                const numberOfSeatBasedLicense = await this.page.locator(this.licenseInfo).nth(1).textContent();
                expect(numberOfSeatBasedLicense).toEqual(quantity)

                const numberOfUsageBased = await this.page.locator(this.licenseInfo).nth(4).textContent();
                expect(Number(numberOfUsageBased)).toEqual(0);
            }
            else{
                const expectedTotalCostSeatBased = await this.page.locator(this.licenseInfo).first().textContent();
                expect(expectedTotalCostSeatBased).toEqual(totalLicenseAmount);

                const numberOfSeatBasedLicense = await this.page.locator(this.licenseInfo).nth(1).textContent();
                expect(numberOfSeatBasedLicense).toEqual(quantity)

                const numberOfUsageBased = await this.page.locator(this.licenseInfo).nth(4).textContent();
                expect(numberOfUsageBased).toEqual(quantityUsageBased);

                const expectedCostTotalSeatBased = await this.page.locator("//div[contains(@class, 'group_row')]//div[contains(@class, 'd-flex align-items-center font-12')]").nth(16).textContent();
                expect(expectedCostTotalSeatBased).toEqual(licenesCosttotalSeatBased);

                const expectedCostTotalUsageBased = await this.page.locator("//div[contains(@class, 'group_row')]//div[contains(@class, 'd-flex align-items-center font-12')]").nth(33).textContent();
                expect(expectedCostTotalUsageBased).toEqual(licenesCosttotalUageBased);
            }
            
        }
    }

    async createSubscriptionWithNoApplication(licensesData){
        const {
            newName,
            descName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            renewalTermValue,
            renewalTerm,
            subscriptionFromVendor
        } = licensesData;
        const baseURLFE = process.env.BASE_URL_FE;
        if(!subscriptionFromVendor){
            await this.page.locator(this.clickOnSubscriptions).click();
            await this.page.locator(this.clickOnAdd).click();
        }
        

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        //Url Check 
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(`${baseURLFE}/subscription/new`);

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

        // Description
        await this.page.locator(this.description).fill(descName);
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

        await this.validateNotification("Subscription has been successfully added");

        const subscriptionName = await this.page.locator(this.getName).textContent();

        await this.page.locator(this.goBackToSubscriptionPage).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.clickOnSearch).fill(subscriptionName);
        await this.page.getByText(subscriptionName).nth(0).click();

        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());

    }

    async createPerpetuals(licensesData){
        const {
            newName,
            appName,
            newAppName,
            appOwner,
            category,
            descName,
            newVendorName,
            vendorName,
            vendorOwner,
            websiteName,
            vendorContactName,
            jobTitle,
            vendorContactEmail,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            oneTimeFee,
            licenseName,
            cost,
            discount,
            descriptionLicense,
            quantity,
            CF1,
            CF_APP,
            CF_USER,
            licenseNameUsageBased,
            usageBased,
            basePrice,
            quantityUsageBased,
            costUsageBased
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

        await this.page.locator(this.clickOnPerpetual).click();
        await this.page.locator(this.clickOnAdd).click();

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        //Url Check 
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
        if(!newAppName){
            await this.page.locator(this.contractAppName).fill(appName);
            await this.page.locator(this.clickToSelectApp).nth(0).click();
        }
        if(newAppName){
            await this.page.locator(this.contractAppName).fill(newAppName);
            await this.page.getByRole('button', { name: '+ Add a new application' }).click();
            await this.page.getByPlaceholder('Application').click();
            await this.page.getByPlaceholder('Add Category').click();
            await this.page.getByRole('button', { name: `${category}` }).click();
            await this.page.getByPlaceholder('Add Owner').click();
            await this.page.getByPlaceholder('Add Owner').fill(appOwner);
            await this.page.locator(this.clickToSelectAppOwner).first().click();
            await this.page.locator(this.clickOnAddApplication).click();
        }
        // Description
        await this.page.locator(this.description).fill(descName);
        // Vendor Name
        if(vendorName){
            await this.page.locator(this.fillVendorName).fill(vendorName);
            await this.page.locator(this.clickToAddVendorName).nth(0).click();
        }
        // New Vendor Name 
        if(newVendorName){
            await this.page.locator(this.fillVendorName).fill(newVendorName);
            await this.page.getByRole('button', { name: '+ Add New Vendor' }).click();
            await this.page.getByPlaceholder('Vendor Name', { exact: true }).click();
            await this.page.getByPlaceholder('Vendor Name', { exact: true }).fill(newVendorName);
            await this.page.getByPlaceholder('Add Owner').click();
            await this.page.getByPlaceholder('Add Owner').fill(vendorOwner);
            await this.page.locator(this.clickToAddVendorOwner).first().click();
            await this.page.getByPlaceholder('Website').click();
            await this.page.getByPlaceholder('Website').fill(websiteName);
            await this.page.getByPlaceholder('Name', { exact: true }).click();
            await this.page.getByPlaceholder('Name', { exact: true }).fill(vendorContactName);
            await this.page.getByPlaceholder('Job Title').click();
            await this.page.getByPlaceholder('Job Title').fill(jobTitle);
            await this.page.getByPlaceholder('Email').click();
            await this.page.getByPlaceholder('Email').fill(vendorContactEmail);
            await this.page.getByRole('button', { name: 'Add Vendor' }).click();
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
        // Payment Date
        await this.page.locator(this.paymentDate).first().click();

        // Custom Feilds
        if(CF1 &&  CF_APP && CF_USER){
            if(CF1){
                await this.page.getByPlaceholder('Enter CF1').click();
                await this.page.getByPlaceholder('Enter CF1').fill(CF1);
            }
            await setTimeout(2000);
            // CF_2
            await this.page.getByText('Select CF2').click();
            await this.page.locator('.z__select--options__container--option').first().click();
            await setTimeout(2000);
            //CF_BOOLEAN
            await this.page.getByText('Select CF_Boolean').click();
            await this.page.locator('.z__select--options__container--option').first().click();

            if(CF_APP){
                await this.page.getByPlaceholder('CF_App').click();
                await this.page.getByPlaceholder('CF_App').fill(CF_APP);
                await this.page.locator(this.cfApp).first().click();
                await setTimeout(2000);
            }
            if(CF_USER){
                await this.page.getByPlaceholder('CF_User').click();
                await this.page.getByPlaceholder('CF_User').fill(CF_USER);
                await this.page.locator(this.cfUser).first().click();
                await setTimeout(2000);
            }
        }

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
            await this.page.waitForTimeout(2000);
            var licenesCosttotalSeatBased = await this.page.locator(this.licenseCost).nth(17).textContent();

            if(usageBased){
                await this.page.locator(this.clickToAddLicense).click();
                await this.page.locator(this.clickOnUsageBasedLicense).click();
                await this.page.locator(this.clickToEnterLicenseName).fill(licenseNameUsageBased);
                await this.page.locator(this.addCost).fill(cost);
                await this.page.locator(this.addLicenseDescription).fill(descriptionLicense);
                await this.page.locator(this.addQuantity).fill(quantityUsageBased);
                await this.page.locator(this.addDiscount).fill(costUsageBased)
                await this.page.locator(this.clickToSaveLicense).click();
                var licenesCosttotalUsageBased = await this.page.locator(this.licenseCost).nth(38).textContent();

            }
            var totalLicenseAmount = await this.page.locator(this.licenseAmount).textContent();
        }
        await this.page.locator(this.clickOnNext6).click();
        await this.page.locator(this.clickToAddPerpetuals).click();

        await this.validateNotification("Perpetual has been successfully added");
        
        const perpetualName = await this.page.locator(this.getName).textContent();
        await this.page.locator(this.goBackToPerpetualPage).click();
        await this.page.locator(this.clickOnSearch).fill(perpetualName);
        await this.page.getByText(perpetualName).nth(0).click();

        var expectedVendorName = null
        if(vendorName){
            expectedVendorName = await this.page.locator(this.vendorNameValidation).textContent();
        }
        const expectedAppName = await this.page.locator(this.appNameValidation).textContent();
        
        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();

        if(!newAppName){
            expect(appName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        }
        if(newAppName){
            expect(newAppName.toLowerCase()).toEqual(expectedAppName.toLowerCase());
        }
        if(vendorName){
            expect(vendorName.toLowerCase()).toEqual(expectedVendorName.toLowerCase());
        }
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());

        if(CF1 &&  CF_APP && CF_USER){
            const expectedCF1 = await this.page.locator(this.cf1Vlaidation).textContent();
            const expectedcfApp = await this.page.locator(this.cfApp1).textContent();
            const expectedcfUser = await this.page.locator(this.cfUser1).textContent();

            expect(CF1.toLowerCase()).toEqual(expectedCF1.toLowerCase());
            expect(CF_APP.toLowerCase()).toEqual(expectedcfApp.toLowerCase());
            expect(CF_USER.toLowerCase()).toEqual(expectedcfUser.toLowerCase());
        }

        if(vendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:vendorName
            });
            console.log(`No. of Contracts with ${vendorName} as the Vendor after contract is created:`, count);
        }
        if(newVendorName){
            await this.navigateVendors();
            const count = await this.checkCountOfTheContractt({
                vendorName:newVendorName
            });
            console.log(`No. of Contracts with ${newVendorName} as the Vendor after contract is created:`, count);
        }
        // Overview Page validaitons 
        if(licenseName && cost && descriptionLicense && quantity && discount && oneTimeFee && basePrice){
            if(!usageBased){
                const expectedTotalCostSeatBased = await this.page.locator(this.licenseInfo).first().textContent();
                expect(expectedTotalCostSeatBased).toEqual(totalLicenseAmount);

                const numberOfSeatBasedLicense = await this.page.locator(this.licenseInfo).nth(1).textContent();
                expect(numberOfSeatBasedLicense).toEqual(quantity)

                const numberOfUsageBased = await this.page.locator(this.licenseInfo).nth(4).textContent();
                expect(Number(numberOfUsageBased)).toEqual(0);
            }
            else{
                // licenseInfo 11 -- 10 -- 11 -- 10 and cost at every 7th element 2nd row
                const expectedTotalCostSeatBased = await this.page.locator(this.licenseInfo).first().textContent();
                expect(expectedTotalCostSeatBased).toEqual(totalLicenseAmount);

                const numberOfSeatBasedLicense = await this.page.locator(this.licenseInfo).nth(1).textContent();
                expect(numberOfSeatBasedLicense).toEqual(quantity)

                const numberOfUsageBased = await this.page.locator(this.licenseInfo).nth(4).textContent();
                expect(numberOfUsageBased).toEqual(quantityUsageBased);

                // License Div at Bottom 
                // 9 -- 8 -- 9 -- 8 and cost at every 8th element 2nd row
                const expectedCostTotalSeatBased = await this.page.locator("//div[contains(@class, 'group_row')]//div[contains(@class, 'd-flex align-items-center font-12')]").nth(16).textContent();
                expect(expectedCostTotalSeatBased).toEqual(licenesCosttotalSeatBased);

                const expectedCostTotalUsageBased = await this.page.locator("//div[contains(@class, 'group_row')]//div[contains(@class, 'd-flex align-items-center font-12')]").nth(33).textContent();
                expect(expectedCostTotalUsageBased).toEqual(licenesCosttotalUsageBased)
            }
            
        }
    }

    async createPerpetualsWithNoApplication(licensesData){
        const {
            newName,
            descName,
            primaryOwner,
            financeOwner,
            ItOwner,
            negotiationOwner,
            perpetualFromVendor
        } = licensesData;
        const baseURLFE = process.env.BASE_URL_FE;

        if(!perpetualFromVendor){
            await this.page.locator(this.clickOnPerpetual).click();
            await this.page.locator(this.clickOnAdd).click();
        }

        await this.page.locator(this.newLicenseNameButtton).click();
        await this.page.locator(this.clickToAddNewLicenseName).click();
        await this.page.locator(this.clickToAddNewLicenseName).clear();
        await this.page.getByRole('textbox').first().fill(newName);
        // await this.page.locator(this.clickToAddNewLicenseName).first().fill(newName);
        await this.page.locator(this.clickToAddName).click();

        //Url Check 
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

        // Checkbox-1 Check
        const checkbox1 = this.page.locator("//div[contains(@class,'d-flex align-items-center')]//div//input[contains(@type,'checkbox')]");
        await checkbox1.waitFor({ state: 'visible' });
        const checkbox1Visibility = await checkbox1.isVisible();
        expect(checkbox1Visibility).toBe(true);
        const initialChecked1 = await checkbox1.isChecked();
        expect(initialChecked1).toBe(false);
        await checkbox1.click();

        // Description
        await this.page.locator(this.description).fill(descName);
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
        await this.page.locator(this.paymentDate).first().click();

        await this.page.locator(this.clickOnNext4).click();
        await this.page.locator(this.clickOnNext5).click();

        await this.page.locator(this.clickOnNext6).click();
        await this.page.locator(this.clickToAddPerpetuals).click();

        await this.validateNotification("Perpetual has been successfully added");
        
        const perpetualName = await this.page.locator(this.getName).textContent();
        await this.page.locator(this.goBackToPerpetualPage).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.clickOnSearch).fill(perpetualName);
        await this.page.getByText(perpetualName).nth(0).click();

        const expectedPrimaryOwnerName = await this.page.locator(this.primaryOwnerNameValidation).textContent();
        const expectedFinanceOwnerName = await this.page.locator(this.financeOwnerNameValidation).textContent();
        expect(primaryOwner.toLowerCase()).toEqual(expectedPrimaryOwnerName.toLowerCase());
        expect(financeOwner.toLowerCase()).toEqual(expectedFinanceOwnerName.toLowerCase());
    }

    async navigateRenewals(){
        await this.page.locator(this.clickOnRenewals).click();
    }
    async navigateVendors(){
        await this.page.locator(this.clickOnVendors).click();
    }
    
}
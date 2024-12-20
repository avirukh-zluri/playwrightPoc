import { setTimeout } from 'timers/promises';

const {test , expect} = require('@playwright/test');


export class AccessReviewsPage{
    constructor(page){
        this.page = page;
        this.textArray = [];
        this.clickOnAccessReviewsOngoing = "//span[normalize-space()='Access Reviews']";
        this.clickOnAccessReviewsUpcoming = "//div[normalize-space()='Upcoming']";
        this.clickOnAccessReviewsCompleted = "//div[normalize-space()='Completed']";

        this.clickOnCertificate = "//div[@class='d-flex align-items-center justify-content-center']";

        // Name and Desc
        this.certificateName = "(//input[@type='text'])[1]";
        this.certificateOwner = "//div[@class='position-relative z_field_wrapper z_field_wrapper-default z-select-search flex-fill']//input[@type='text']";
        this.clickForCertOwner = "//div[@class='d-flex justify-content-between']";
        this.certificateDescription = "//textarea[@class='ant-input css-1fumvat ant-input-outlined z_textarea_field w-100 font-11 bold-400 access-cert-textarea font-family-sora']";
        this.switchHandle = "//div[@class='react-switch-handle']";
        this.addPrimaryReviewer = "(//input[@type='text'])[3]";
        this.clickOnPrimaryReviewer = "(//div[contains(@class,'d-flex justify-content-between align-items-center')])[1]";
        this.addSecReviewer = "(//input[contains(@type,'text')])[4]";
        this.clickOnSecReviewer = "//div[contains(@class,'d-flex justify-content-between align-items-center')]";
        this.clickOnNext1 = "(//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px undefined ht-32px undefined'])[1]";

        // Add app
        this.addApp = "//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ w-100 w-100']//div[1]";
        this.searchApp = "(//input[contains(@type,'text')])[1]";
        this.clickToAddApp = "(//div[normalize-space()='Asana'])[1]";
        this.clickOnNext2 = "(//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px undefined ht-32px undefined'])[1]";

        this.clickOnNext3 = "(//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px undefined ht-32px undefined'])[1]";

        // Update Column
        this.clickOnCheckBox = "//div[contains(@class,'column-item-checkbox align-items-center d-flex p-2')]//input[contains(@type,'checkbox')]";
        this.clickOnUpdateColumn = "//button[contains(@class,'sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ modify__columns__extended__buttons modify__columns__extended__buttons')]";
        this.clickOnNext4 = "(//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px undefined ht-32px undefined'])[1]";

        // Add Playbook
        this.playbookActionRevoked = "(//input[contains(@type,'text')])[2]";
        this.selectRevokedPlaybook = "(//div[contains(@class,'d-flex justify-content-between')])[3]";
        this.playbookActionModified = "(//input[contains(@type,'text')])[3]";
        this.selectModifiedPlaybook = "(//div[contains(@class,'d-flex justify-content-between')])[3]";
        this.clickOnAddPlaybook = "(//button[contains(@class,'sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px undefined ht-32px undefined')])[1]";
        this.clickOnNext5 = "(//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px undefined ht-32px undefined'])[1]";

        // Date 
        this.clickOnStartDate = "//div[contains(text(),'Review Start Date')]";
        const today = new Date().toISOString().split('T')[0];
        this.startDate = `//td[contains(@title,'${today}')]`;
        this.clickToApply = "//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ z_date_picker_footer_apply_btn z_date_picker_footer_apply_btn']";

        this.clickOnReviewDate = "//div[contains(text(),'Review End Date')]";
        const currReviewDate = new Date();
        currReviewDate.setDate(currReviewDate.getDate() + 3);
        const setReviewDate = currReviewDate.toISOString().split('T')[0];
        this.reviewDate = `(//td[contains(@title,'${setReviewDate}')])[2]`;
        this.clickToApply2 = "(//div[contains(text(),'Apply')])[2]";

        this.clickOnRemediationDate = "//div[contains(text(),'Remediation End Date')]";
        const currRemediationDate = new Date();
        currRemediationDate.setDate(currRemediationDate.getDate() + 10);
        const setRemediationDate = currRemediationDate.toISOString().split('T')[0];
        this.remediationDate = `(//td[contains(@title,'${setRemediationDate}')])[3]`;
        this.clickToApply3 = "(//div[contains(text(),'Apply')])[3]";
        this.createCertificateButton = "//button[contains(@class,'sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ ht-32px create__cert__btn ht-32px create__cert__btn')]"

        // validation 
        this.clickOnReview = "//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ']";

        // Archieve Certificate 
        this.clickOnEllipsis = "//div[contains(@class,'w-100 access-review-ongoing-reviews flex-1 position-relative background-color-white flex flex-column')]//div[1]//div[8]//div[1]//button[1]";
        this.clickOnArchieve = "//span[normalize-space()='Archive']";
        this.clickOnArchieveButton = "(//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ljkNdu ht-32px undefined ht-32px undefined'])[1]";
        this.clickOnReviewButton = "//button[@class='sc-gEvEer sc-eqUAAy ciQCaY ijlMsJ'][normalize-space()='Review']";
    }
    async goToAccessReviewsOngoing(){
        await this.page.locator(this.clickOnAccessReviewsOngoing).click();
    }

    async goToAccessReviewsUpcoming(){
        await this.page.locator(this.clickOnAccessReviewsUpcoming).click();
    }

    async goToAccessReviewsCompleted(){
        await this.page.locator(this.clickOnAccessReviewsCompleted).click();
    }

    async createCertificate(certificateData){
        const { 
            certName, 
            certOwner, 
            certDescription, 
            primaryReviewer, 
            secondaryReviewer, 
            appName 
        } = certificateData;
        await this.page.locator(this.clickOnCertificate).click();

        // Cert Name 
        await this.page.locator(this.certificateName).fill(certName);
        // Cert Owner 
        await this.page.locator(this.certificateOwner).fill(certOwner);
        await setTimeout(2000);
        await this.page.locator(this.clickForCertOwner).nth(0).click();
        // Cert Description
        await this.page.locator(this.certificateDescription).fill(certDescription);
        await this.page.locator(this.switchHandle).click();
        // Primary Reviewer
        await this.page.locator(this.addPrimaryReviewer).fill(primaryReviewer);
        await setTimeout(2000);
        await this.page.locator(this.clickOnPrimaryReviewer).click();
        // Secondary Reviewer
        await this.page.locator(this.addSecReviewer).fill(secondaryReviewer);
        await setTimeout(2000);
        await this.page.locator(this.clickOnSecReviewer).click();
        await this.page.locator(this.clickOnNext1).click();

        await this.page.locator(this.addApp).click();
        // App Name
        await this.page.locator(this.searchApp).fill(appName);
        await this.page.locator(this.clickToAddApp).click();
        await this.page.locator(this.clickOnNext2).click();

        await this.page.locator(this.clickOnNext3).click();
        await setTimeout(3000);

        // Update Column
        await this.page.locator(this.clickOnCheckBox).click();
        await this.page.locator(this.clickOnUpdateColumn).click();

        const elements = await this.page.locator("(//ul)[3]//li//span[not(@color='secondary_grey_1')]");

        const count = await elements.count();
        for (let i = 0; i < count; i++) {
            const text = await elements.nth(i).textContent();
            this.textArray.push(text.trim()); 
        }

        console.log("Text Array:",this.textArray);
        await this.page.locator(this.clickOnNext4).click();

        // Add playbook 
        await this.page.locator(this.playbookActionRevoked).click();
        await this.page.locator(this.selectRevokedPlaybook).click();
        await this.page.locator(this.playbookActionModified).click();
        await this.page.locator(this.selectModifiedPlaybook).click();
        await this.page.locator(this.clickOnAddPlaybook).click();
        await this.page.locator(this.clickOnNext5).click();

        // Date 
        await this.page.locator(this.clickOnStartDate).click();
        await this.page.locator(this.startDate).click();
        await this.page.locator(this.clickToApply).click();

        await this.page.locator(this.clickOnReviewDate).click();
        await this.page.locator(this.reviewDate).click();
        await this.page.locator(this.clickToApply2).click();
        
        await this.page.locator(this.clickOnRemediationDate).click();
        await this.page.locator(this.remediationDate).click();
        await this.page.locator(this.clickToApply3).click();
        
        await this.page.locator(this.createCertificateButton).click();
    }
    async certValidation(certificateData){
        // validation 
        const { 
            certName
        } = certificateData;
        const certElement = this.page.locator(`//span[normalize-space()='${certName}']`);
        await certElement.waitFor({ state: 'visible', timeout: 5000 });
        await certElement.click();
        await this.page.waitForTimeout(5000);

        const isReviewButtonVisible = async () => {
            // await this.page.waitForTimeout(3000);
            await this.page.reload();
            await this.page.waitForTimeout(2000);
            const button = await this.page.$('button:has-text("Review"):not([disabled])');
            if (!button) return false;
            
            return await button.isVisible() && 
                   !(await this.page.$('text="Data Processing In Progress"'));
        };

        // Polling function with timeout
        const pollForElement = async (checkFn, timeout = 300000, interval = 15000) => {
            const startTime = Date.now();
            
            while (Date.now() - startTime < timeout) {
                try {
                    const result = await checkFn();
                    if (result) return true;
                    await this.page.waitForTimeout(15000);
                } catch (error) {
                    await this.page.waitForTimeout(15000);
                }
            }
            throw new Error(`Review button not found after ${timeout/1000} seconds`);
        };
        try {
            const buttonFound = await pollForElement(isReviewButtonVisible, 600000, 30000);
            expect(buttonFound).toBe(true);
            await this.page.locator(this.clickOnReviewButton).click();
            
            const headerSelector = '//div[contains(@class, "InovuaReactDataGrid__column-header")]//span[@color="secondary_grey_2" and contains(@class, "typography--variant-dataLabel_small_semibold")]';
            const newElements = await this.page.locator(headerSelector);
            
            // const textArray1 = [];
            // const count = await newElements.count();
            // for (let i = 1; i < count - 3; i++) {
            //     const text = await newElements.nth(i).textContent();
            //     textArray1.push(text.trim());
            // }
            // console.log("Text Array 1:",textArray1);
            // expect(textArray1).toEqual(this.textArray);
            
        } catch (error) {
            throw new Error(`Certificate validation failed: ${error.message}`);
        }       
    }

    async archieveCert(){
        // Archieve certificate 
        await this.page.locator(this.clickOnEllipsis).click();
        await this.page.locator(this.clickOnArchieve).click();
        await this.page.locator(this.clickOnArchieveButton).click();
    }
}
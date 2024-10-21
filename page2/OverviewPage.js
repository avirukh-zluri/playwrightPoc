export class OverviewPage {
    constructor(page){
        this.page = page;
        this.clickOnOverView = "//span[normalize-space()='Overview']";

        //managed apps
        this.clickOnOverviewUnmanaged = "//div[normalize-space()='Unmanaged']";
        this.clickOnOverviewRestricted = "//div[normalize-space()='Restricted']";
        this.clickOnOverviewNeedsReviews = "//div[normalize-space()='Needs Review']";
        this.ClickOnOverviewTotalApplications = "//div[normalize-space()='Total Applications']";

        //active employees
        this.clickonOverviewGroup= "//div[normalize-space()='Group']";
        this.ClickonOverviewServices = "//div[normalize-space()='Service']";
        this.ClickonOverviewExternal = "//div[normalize-space()='External']";
        this.ClickonOverviewTotalActiveUser = "//div[normalize-space()='Total Active Users']";

        //Average usage 
        this.clickOnaverage_usage_ele1 = "//div[@class='apex-card-container rounded'][3]/div[3]/div[1]";
        this.clickOnaverage_usage_ele2 = "//div[@class='apex-card-container rounded'][3]/div[3]/div[2]";
        this.clickOnaverage_usage_ele3 = "//div[@class='apex-card-container rounded'][3]/div[3]/div[3]";
        this.clickOnaverage_usage_ele4 = "//div[@class='apex-card-container rounded'][3]/div[3]/div[4]";


        //total spends

        this.clickOntotal_spends_ele1 = "//div[@class='apex-card-container rounded'][4]/div[3]/div[1]";
        this.clickOntotal_spends_ele2 = "//div[@class='apex-card-container rounded'][4]/div[3]/div[2]";
        this.clickOntotal_spends_ele3 = "//div[@class='apex-card-container rounded'][4]/div[3]/div[3]";
        this.clickOntotal_spends_ele4 = "//div[@class='apex-card-container rounded'][4]/div[3]/div[4]";

        //bottom elements
        this.clickonViewDepartment = "//span[normalize-space()='View Departments']";

        //budget per department
        this.clickonNextarrow = "//div[@class='w-full px-3']//div[contains(@class,'d-flex dtable_nav')]//div[@class='d-flex']//div//i[@class='ov_arrow ov_right']";
    
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToOveriew(){
        await this.page.locator(this.clickOnOverView).click();
        await this.waitForSomeTime();
    }

    async navigateOverview(){

        //manages apps
        await this.page.locator(this.clickOnOverviewUnmanaged).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.clickOnOverviewRestricted).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.clickOnOverviewNeedsReviews).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.ClickOnOverviewTotalApplications).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        //..active employees
        await this.page.locator(this.clickonOverviewGroup).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.ClickonOverviewServices).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.ClickonOverviewExternal).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.ClickonOverviewTotalActiveUser).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();


    //average usage
    await this.page.locator(this.clickOnaverage_usage_ele1).click();
    await this.page.waitForTimeout(timeout);
    await page.goBack();

    await this.page.locator(this.clickOnaverage_usage_ele2).click();
    await this.page.waitForTimeout(timeout);
    await page.goBack();

    await this.page.locator(this.clickOnaverage_usage_ele3).click();
    await this.page.waitForTimeout(timeout);
    await page.goBack();

    await this.page.locator(this.clickOnaverage_usage_ele4).click();
    await this.page.waitForTimeout(timeout);
    await page.goBack();


        //total spends
        await this.page.locator(this.clickOntotal_spends_ele1).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.clickOntotal_spends_ele2).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.clickOntotal_spends_ele3).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        await this.page.locator(this.clickOntotal_spends_ele4).click();
        await this.page.waitForTimeout(timeout);
        await page.goBack();

        //contract renewals


    //View Departmets
    await this.page.locator(this.clickonViewDepartment).scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(timeout);
    await this.page.locator(this.clickonViewDepartment).click();

        //budget per department
        let i;
        for(i=0;i<4;i++){
            await this.page.locator(this.clickonNextarrow).click();
            await this.page.waitForTimeout(1000); // Wait after clicking
            i++;
        }

    }
}
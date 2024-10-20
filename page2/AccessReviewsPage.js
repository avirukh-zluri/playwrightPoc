export class AccessReviewsPage{
    constructor(page){
        this.page = page;
        this.clickOnaccessreviews = "//span[normalize-space()='Access Reviews']";
        this.clickOnOngoing = "//div[@class='nav-data']//div[1]//a[1]//div[@class='d-flex align-items-center'][1]";
        this.clickOnUpcoming = "//div[@class='nav-data']//div[2]//a[1]//div[@class='d-flex align-items-center'][1]";
        this.clickOnCompleted = "//div[@class='nav-data']//div[3]//a[1]//div[@class='d-flex align-items-center'][1]";

        this.clickOnCertificate = "//div[@class='d-flex align-items-center justify-content-center']";
    }


    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToAccessReviews(){
        await this.page.locator(this.clickOnaccessreviews).click();
        await this.waitForSomeTime();
    }


    async navigateAccessReviews(){
        await this.page.locator(this.clickOnUpcoming).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnCompleted).click();
        await this.waitForSomeTime();
    }

}
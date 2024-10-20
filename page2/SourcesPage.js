export class SourcesPage{
    constructor(page){
        this.page = page;
        this.clickOnSources = "//span[normalize-space()='Sources']";
        this.clickOnRecommended = "//li[normalize-space()='Recommended']";
        this.clickOnConnected = "//li[normalize-space()='Connected']";
        this.clickOnConnectionRequest = "//li[normalize-space()='Connection Requests']";
        this.clickOnAgents = "//span[normalize-space()='Agents']";
        this.clickOnOverviews = "//a[normalize-space()='Overview']";
        this.clickOnUsers = "//a[normalize-space()='Users']";
        this.clickOnDesktopAgents = "//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[2]/ul[1]/div[3]/a[1]/span[1]";
    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }
    async goToSources(){
        await this.page.locator(this.clickOnSources).click();
        await this.waitForSomeTime();
    }
    async navigateIntegration(){
        await this.page.locator(this.clickOnRecommended).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnConnected).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnConnectionRequest).click();
        await this.waitForSomeTime();
    }
    async goToAgents(){
        await this.page.locator(this.clickOnAgents).click();
        await this.waitForSomeTime();
    }
    async navigateSourcesAgents(){
        await this.page.locator(this.clickOnOverviews).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnUsers).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnDesktopAgents).click();
        await this.waitForSomeTime();
    }
}
export class SourcesPage{
    constructor(page){
        this.page = page;
        this.clickOnSources = "//span[normalize-space()='Sources']";
        this.clickOnConnected = "//li[normalize-space()='Connected']";
        this.clickOnConnectionRequest = "//li[normalize-space()='Connection Requests']";
        this.clickOnAgents = "//span[normalize-space()='Agents']";
        this.clickOnUsers = "//a[normalize-space()='Users']";
        this.clickOnDesktopAgents = "//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[2]/ul[1]/div[3]/a[1]/span[1]";
    }
    async goToSourcesIntegraton(){
        await this.page.locator(this.clickOnSources).click();
    }
    async navigateSourcesIntegration(){
        await this.page.locator(this.clickOnConnected).click();
        await this.page.locator(this.clickOnConnectionRequest).click();
    }
    async goToSourcesAgents(){
        await this.page.locator(this.clickOnAgents).click();
    }
    async navigateSourcesAgents(){
        await this.page.locator(this.clickOnUsers).click();
        await this.page.locator(this.clickOnDesktopAgents).click();
    }
}
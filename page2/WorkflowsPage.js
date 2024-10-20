export class WorkflowPage{
    constructor(page){
        this.page = page;
        this.clickOnWorkflows = "//span[normalize-space()='Workflows']";
        this.clickOnWorkflowsOnboardingDraft = "//a[normalize-space()='Draft']";
        this.clickOnWorkflowsOnboardingPlaybooks = "//a[normalize-space()='Playbooks']";
        this.clickOnWorkflowsOnboardingRunLogs = "//a[normalize-space()='Run logs']";
        this.clickOnWorkflowsOnboardingSecheduledRuns = "//a[normalize-space()='Scheduled Runs']";
        this.clickOnWorkflowsOnboardingAutomationRules = "//a[normalize-space()='Automation Rules']";
        this.clickOnOffboarding = "//span[normalize-space()='Offboarding']";
        this.clickOnWorkflowsOffboardingDraft = "//a[normalize-space()='Draft']";
        this.clickOnWorkflowsOffboardingPlaybooks = "//a[normalize-space()='Playbooks']";
        this.clickOnWorkflowsOffboardingRunLogs = "//a[normalize-space()='Run logs']";
        this.clickOnWorkflowsOffboardingSecheduledRuns = "//a[normalize-space()='Scheduled Runs']";
        this.clickOnWorkflowsOffboardingAutomationRules = "//a[normalize-space()='Automation Rules']";
        this.clickOnWorkflowsAccessRequest = "//span[normalize-space()='Access Requests']";
        this.clickOnWorkflowsAccessRequestCompleted = "//div[contains(text(),'Completed')]";
        this.clickOnWorkflowsAccessRequestAutomationRules = "//div[contains(text(),'Automation Rules')]";

    }

    async waitForSomeTime(timeout = 2000) {
        await this.page.waitForTimeout(timeout);
    }

    async goToWorkflows(){
        await this.page.locator(this.clickOnWorkflows).click();
        await this.waitForSomeTime();
    }

    async clickOnOnboarding(){
        await this.page.locator(this.onboardingButton).click();  
        await this.waitForSomeTime(); 
    }

    async navigateOnBoarding(){
        await this.page.locator(this.clickOnWorkflowsOnboardingDraft).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOnboardingPlaybooks).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOnboardingRunLogs).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOnboardingSecheduledRuns).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOnboardingAutomationRules).click();
        await this.waitForSomeTime();

    }

    async goToWorkflowsOffboarding(){
        await this.page.locator(this.clickOnOffboarding).click();
        await this.waitForSomeTime();
    }

    async navigateWorkflowsOffboarding(){
        await this.page.locator(this.clickOnWorkflowsOffboardingDraft).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOffboardingPlaybooks).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOffboardingRunLogs).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOffboardingSecheduledRuns).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsOffboardingAutomationRules).click();
        await this.waitForSomeTime();
    }

    async goToWorkflowsAccessRequest(){
        await this.page.locator(this.clickOnWorkflowsAccessRequest).click();
        await this.waitForSomeTime();
    }

    async navigateWorkflowsAccessRequest(){
        await this.page.locator(this.clickOnWorkflowsAccessRequestCompleted).click();
        await this.waitForSomeTime();
        await this.page.locator(this.clickOnWorkflowsAccessRequestAutomationRules).click();
        await this.waitForSomeTime();
    }


}
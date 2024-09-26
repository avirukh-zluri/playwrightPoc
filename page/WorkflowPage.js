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
        
        // Add playbook
        this.clickOnAddPlaybook = "//button[normalize-space()='New Playbook']";
        this.clickToAddZluri = "(//div[contains(text(),'Add')])[3]"
        this.clickToEditTask = "//button[normalize-space()='Edit Task']";
        this.addAssignee = "//input[contains(@placeholder,'Select an assignee')]";
        this.clickToAddAssignee = "div div div div div div div div div div div div div div div div div div div div div div div div div div:nth-child(1) button:nth-child(1)";
        this.clickToSaveTask = "//button[normalize-space()='Save Task']";
        this.clickToPublish = "//button[normalize-space()='Publish Playbook']";
        // delete playbook
        this.clickToOpenDelete = "//div[@class='cursor-pointer']//img";
        this.clickToDelete = "//div[contains(text(),'Delete Playbook')]";
        this.finalDelete = "//button[normalize-space()='Delete Playbook']";
    }

    async goToWorkflows(){
        await this.page.locator(this.clickOnWorkflows).click();
    }

    async navigateWorkflowsOnboarding(){
        // await this.page.locator(this.clickOnWorkflowsOnboardingDraft).click();
        await this.page.locator(this.clickOnWorkflowsOnboardingPlaybooks).click();
        // await this.page.locator(this.clickOnWorkflowsOnboardingRunLogs).click();
        // await this.page.locator(this.clickOnWorkflowsOnboardingSecheduledRuns).click();
        // await this.page.locator(this.clickOnWorkflowsOnboardingAutomationRules).click();


          
             
    }
    async createPlaybook(){
        // Add Playbook
        await this.page.locator(this.clickOnAddPlaybook).click();
        await this.page.locator(this.clickToAddZluri).click();
        await this.page.locator(this.clickToEditTask).click();
        await this.page.locator(this.addAssignee).click();
        await this.page.locator(this.clickToAddAssignee).click();
        await this.page.locator(this.clickToSaveTask).click();      
        await this.page.locator(this.clickToPublish).click();    
    }
    
    // Function to click on "Drafts" in the workflow onboarding
    async navigateToWorkflowsOnboardingDraft() {
        await this.page.locator(this.clickOnWorkflowsOnboardingDraft).click();
    }

    // Function to click on "Playbooks" in the workflow onboarding
    async navigateToWorkflowsOnboardingPlaybooks() {
        await this.page.locator(this.clickOnWorkflowsOnboardingPlaybooks).click();
    }

    // Function to click on "Run Logs" in the workflow onboarding
    async navigateToWorkflowsOnboardingRunLogs() {
        await this.page.locator(this.clickOnWorkflowsOnboardingRunLogs).click();
    }

    // Function to click on "Scheduled Runs" in the workflow onboarding
    async navigateToWorkflowsOnboardingScheduledRuns() {
        await this.page.locator(this.clickOnWorkflowsOnboardingSecheduledRuns).click();
    }

    // Function to click on "Automation Rules" in the workflow onboarding
    async navigateToWorkflowsOnboardingAutomationRules() {
        await this.page.locator(this.clickOnWorkflowsOnboardingAutomationRules).click();
    }

    async deletePlaybook(){
        await this.page.locator(this.clickToOpenDelete).click();      
        await this.page.locator(this.clickToDelete).click();      
        await this.page.locator(this.finalDelete).click(); 
    }
    
    async goToWorkflowsOffboarding(){
        await this.page.locator(this.clickOnOffboarding).click();
    }

    async navigateWorkflowsOffboarding(){
        await this.page.locator(this.clickOnWorkflowsOffboardingDraft).click();
        await this.page.locator(this.clickOnWorkflowsOffboardingPlaybooks).click();
        await this.page.locator(this.clickOnWorkflowsOffboardingRunLogs).click();
        await this.page.locator(this.clickOnWorkflowsOffboardingSecheduledRuns).click();
        await this.page.locator(this.clickOnWorkflowsOffboardingAutomationRules).click();
    }

    async goToWorkflowsAccessRequest(){
        await this.page.locator(this.clickOnWorkflowsAccessRequest).click();
    }

    async navigateWorkflowsAccessRequest(){
        await this.page.locator(this.clickOnWorkflowsAccessRequestCompleted).click();
        await this.page.locator(this.clickOnWorkflowsAccessRequestAutomationRules).click();
    }
}
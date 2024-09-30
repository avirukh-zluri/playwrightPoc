import { expect } from "allure-playwright";
import { stat } from "fs";
const { setTimeout } = require("node:timers/promises");

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

        this.newWorkflowButton = "//button[normalize-space()='New Workflow']";
        
        // Add playbook
        this.clickOnAddPlaybook = "//button[normalize-space()='New Playbook']";
        this.clickToAddZluri = "(//div[contains(text(),'Add')])[3]"
        this.clickToEditTask = "//button[normalize-space()='Edit Task']";
        this.addAssignee = "//input[contains(@placeholder,'Select an assignee')]";
        this.clickToAddAssignee = "div div div div div div div div div div div div div div div div div div div div div div div div div div:nth-child(1) button:nth-child(1)";
        this.clickToSaveTask = "//button[normalize-space()='Save Task']";
        this.clickToPublish = "//button[normalize-space()='Publish Playbook']";
        this.onboardingButton = "//button[normalize-space()='Onboarding']";
        this.offboardingButton = "//button[normalize-space()='Offboarding']";
        // delete playbook
        this.clickToOpenDelete = "//div[@class='cursor-pointer']//img";
        this.clickToDelete = "//div[contains(text(),'Delete Playbook')]";
        this.finalDelete = "//button[normalize-space()='Delete Playbook']";

        this.searchInput = page.getByPlaceholder('Search for users');
        this.checkbox = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue' });

    // Define locators for the elements
    this.addAppButton = page.locator("//div[@class=' z-workflow-add-application-btn']//button");
    this.appInput = page.getByPlaceholder('Add an app to the workflow');
    this.zluriButton = page.getByRole('button', { name: 'Zluri Only manual tasks available', exact: true });
    this.editTaskButton = page.getByRole('button', { name: 'Edit Task' });
    this.assigneeInput = page.getByPlaceholder('Select an assignee');
    this.saveTaskButton = page.getByRole('button', { name: 'Save Task' });
    this.settingsTab = page.locator('#sidebar_tabs-tab-settings');
    this.workflowNameInput = page.getByPlaceholder('Workflow Name');
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.workflowButton = page.getByRole('button', { name: 'Workflow' });
    this.firstDraftName = page.locator("//table//tr[contains(@class,'able__row')][1]//td[1]");
    this.draftOptionButtons = page.locator("//img[contains(@src,'optionsButton')]");
    this.deleteDraftButton = page.locator("(//div[contains(text(),'Delete Draft')])[1]");
    this.confirmDeleteDraftButton = page.locator("//button[contains(text(),'Delete')]");
    this.deleteCompletedImage = page.locator("//img[contains(@src,'completeicon')]");
    }





    // Functions Starts here

    async goToWorkflows(){
        await this.page.locator(this.clickOnWorkflows).click();
    }

    async clickOnOnboarding(){
        await this.page.locator(this.onboardingButton).click();   
    }

    async clickOnOffboarding(){
         await this.page.locator(this.offboardingButton).click();
    }

    async clickOnNewWorkflow(){
        await this.page.locator(this.newWorkflowButton).click();
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

  // Method to search for a user
  async searchUserOnSelectOnboardingUser(username) {
    await this.searchInput.click();
    await this.searchInput.fill(username);
  }

  // Method to check the checkbox
  async checkCheckboxOnSelectOnboardingUser() {
    await this.checkbox.first().check();
  }

  // Method to click the Continue button
  async clickContinueOnSelectOnboardingUser() {
    await this.continueButton.click();
  }

    // Method to add an app to the workflow
    async addApp(appName) {
        await this.addAppButton.click();
        await this.appInput.click();
        await this.appInput.fill(appName);
        await this.zluriButton.click();
      }
    
      // Method to edit the task
      async editTask(assignee) {
        await this.editTaskButton.click();
        await this.assigneeInput.click();
        await this.page.locator("//div[contains(text(),'" + assignee + "')]").click();
        await this.saveTaskButton.click();
      }
    
      // Method to update the workflow name
      async updateWorkflowName(newName) {
        await this.settingsTab.click();
        await this.workflowNameInput.click();
        await this.workflowNameInput.press('ControlOrMeta+a');
        await this.workflowNameInput.fill(newName);
        await this.updateButton.click();
      }
    
      // Method to finalize the workflow
      async finalizeWorkflow() {
        await this.workflowButton.click();
      }

      async getFirstDraftName(){
        await setTimeout(3000);
        const firstDraftName = await this.firstDraftName.textContent();
        return firstDraftName
    }

  // Method to delete a specific draft by its row name
  async deleteAllDraft() {
    const count = await this.draftOptionButtons.count();
    console.log("Count of drafts: ", count);
    for (let i = 0; i < count; i++) {
      await this.draftOptionButtons.nth(0).click();
      await this.deleteDraftButton.click();
      await this.confirmDeleteDraftButton.click();
      await expect(this.deleteCompletedImage).toBeVisible();
    }
  }
}
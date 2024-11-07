const { test, expect } = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
import path from 'path';
import fs from 'fs';

const { LoginPage } = require('../page/LoginPage');
const { WorkflowPage } = require('../page/WorkflowPage');
const APIListener = require('../utils/APIListener.js');

let globalApiListener;
let workflow;

test.beforeAll(async () => {
  globalApiListener = new APIListener();
});

test.beforeEach(async ({ page }) => {
  try {
    const Login = new LoginPage(page);
    workflow = new WorkflowPage(page);
    
    await Login.goToLoginPage();
    await Login.login({
      userName: "pod4_automation_prod@zluri.dev",
      password: "test@123",
    });
    
    await globalApiListener.startListening(page);
    page.apiListener = globalApiListener;
  } catch (error) {
    console.error('Error in test setup:', error);
    throw error;
  }
});

test.afterEach(async ({ page }, testInfo) => {
  try {
    // Save API calls
    const outputFolder = path.join(__dirname, 'data');  
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }
    
    const fileName = `${testInfo.title.replace(/\s+/g, '_')}_curls.txt`;
    const filePath = path.join(outputFolder, fileName);
    
    console.log(`File ${fileName} created for test case: ${testInfo.title}`);
    await globalApiListener.saveAsCurls(filePath);
    await globalApiListener.saveAsPostmanCollection(path.join(outputFolder, 'collection.json'));

    // Cleanup workflow if needed
    if (workflow) {
      // Add any workflow cleanup if necessary
      // await workflow.cleanup();
    }

    // Close the context and browser
    if (page) {
      const context = page.context();
      await page.close();
      await context.close();
    }
  } catch (error) {
    console.error('Error in test cleanup:', error);
    throw error;
  }
});

test("Test Draft Workflow in onboarding", async ({ page }) => {
  await workflow.goToWorkflows();
  await workflow.clickOnOnboarding();
  // Uncomment the following lines when you're ready to use them
  // await workflow.clickOnNewWorkflow();
  // await workflow.searchUserOnSelectOnboardingUser("Pod4");
  // await workflow.checkCheckboxOnSelectOnboardingUser();
  // await workflow.clickContinueOnSelectOnboardingUser();
  // await workflow.addApp("Zluri");
  // await workflow.editTask("Assign to Department Head");
  // await workflow.updateWorkflowName("Test Workflow");
  // await workflow.finalizeWorkflow();
  // const firstDraftName = await workflow.getFirstDraftName();
  // expect(firstDraftName).toContain("Test Workflow");
  // await workflow.deleteAllDraft();
});

test("TC_001_Verify user able to create New Onboarding workflows", async ({ page }) => {
  await workflow.goToWorkflows();
});

test.afterAll(async ({ browser }) => {
  try {
    // Save final API calls
    await globalApiListener.saveAsCurls('curls.txt');
    await globalApiListener.saveAsPostmanCollection('collection.json');

    // Ensure all browser instances are closed
    if (browser) {
      await browser.close();
    }

    // Clean up global variables
    workflow = null;
    globalApiListener = null;
  } catch (error) {
    console.error('Error in final cleanup:', error);
    throw error;
  }
});
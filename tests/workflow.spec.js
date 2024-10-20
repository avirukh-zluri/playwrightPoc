const { test, expect } = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
const fs = require('fs').promises;

const { LoginPage } = require('../page/LoginPage');
const { WorkflowPage } = require('../page/WorkflowPage');
const APIListener = require('../utils/APIListener.js');

let globalApiListener;

test.beforeAll(async () => {
  globalApiListener = new APIListener();
});

test.beforeEach(async ({ page }) => {
  await globalApiListener.startListening(page);
  
  // Attach the listener to the page for later use
  page.apiListener = globalApiListener;
});

test("Test Draft Workflow in onboarding", async ({page}) => {
  const login = new LoginPage(page);
  await login.goToLoginPage();
  await login.login();   

  const workflow = new WorkflowPage(page);
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

test.afterAll(async () => {
  // Save all collected API calls to files
  await globalApiListener.saveAsCurls('curls.txt');
  await globalApiListener.saveAsPostmanCollection('collection.json');
});
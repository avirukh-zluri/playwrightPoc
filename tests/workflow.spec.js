const { test, expect } = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
// const fs = require('fs').promises;
import path from 'path';
import fs from 'fs';

const { LoginPage } = require('../page/LoginPage');
const { WorkflowPage } = require('../page/WorkflowPage');
const APIListener = require('../utils/APIListener.js');

let globalApiListener;

test.beforeAll(async () => {
  globalApiListener = new APIListener();
});

test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login({
        userName:"pod4_automation_prod@zluri.dev",
        password:"test@123",
    });
  await globalApiListener.startListening(page);
  
  // Attach the listener to the page for later use
  page.apiListener = globalApiListener;
});
test.afterEach(async ({}, testInfo) => {
  const outputFolder = path.join(__dirname, 'data');  
  if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
  }
  const fileName = `${testInfo.title.replace(/\s+/g, '_')}_curls.txt`;
  
  const filePath = path.join(outputFolder, fileName);
  //fs.writeFileSync(filePath, `Test case "${testInfo.title}" has been completed with curls!`);

  console.log(`File ${fileName} created for test case: ${testInfo.title}`);
  await globalApiListener.saveAsCurls(filePath);
  await globalApiListener.saveAsPostmanCollection(path.join(outputFolder, 'collection.json'));
});

test("Test Draft Workflow in onboarding", async ({page}) => {
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
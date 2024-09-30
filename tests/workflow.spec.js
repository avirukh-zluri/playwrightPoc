const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

import Login, { LoginPage } from '../page/LoginPage';
import {WorkflowPage} from '../page/WorkflowPage'


test("Test Draft Workflow in onboarding" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();   

    const workflow = new WorkflowPage(page);
    await workflow.goToWorkflows();
    await workflow.clickOnOnboarding();
    await workflow.clickOnNewWorkflow();
    await workflow.searchUserOnSelectOnboardingUser("Pod4");
    await workflow.checkCheckboxOnSelectOnboardingUser();
    await workflow.clickContinueOnSelectOnboardingUser();
    await workflow.addApp("Zluri");
    await workflow.editTask("Assign to Department Head");
    await workflow.updateWorkflowName("Test Workflow");
    await workflow.finalizeWorkflow();
    const firstDraftName = await workflow.getFirstDraftName();
    expect(firstDraftName).toContain("Test Workflow");
    await workflow.deleteAllDraft();
});
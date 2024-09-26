const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

import Login, { LoginPage } from '../page/LoginPage';
import { Application } from '../page/Application';
import { log } from 'node:console';
import { ApplicationOverviewPage } from '../page/ApplicationOverviewPage';
import {WorkflowPage} from '../page/WorkflowPage'



test("testButtonOnDeprovisingAction", async ( {page}) => {
    const  login = new LoginPage(page);
    await login.goToLoginPage();
    await login.login();
    const application = new Application(page);
    await application.goToApplication();
    await application.searchAndSelectApplication("Asana");
    const applicationOverview = new ApplicationOverviewPage(page);
    await applicationOverview.clickOnAutomation();
    await applicationOverview.clickOnAddButton();
    await setTimeout(5000);
    await applicationOverview.clickOnAddActionButton();
});

test("Test End to End Onboarding Playbook Flow", async ( {page}) => {
    const  login = new LoginPage(page);
    await login.goToLoginPage();
    await login.login();
    const workflow = new WorkflowPage(page);
    await workflow.goToWorkflows();
    await workflow.navigateToWorkflowsOnboardingPlaybooks();
});
const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
import path from 'path';
import fs from 'fs';

import Login, { LoginPage } from '../page2/LoginPage';
import { OverviewPage } from '../page2/OverviewPage';
import {ApplicationsPage} from '../page2/ApplicationsPage'
import { DirectoryPage } from '../page2/DirectoryPage';
import { LicensePage } from '../page2/LicensesPage';
import { OptimizationPage } from '../page2/OptimizationPage';
import { Spends } from '../page2/SpendsPage';
import { SecurityPage } from '../page2/SecurityPage';
import { AccessReviewsPage } from '../page2/AccessReviewsPage';
import { ReportsPage } from '../page2/ReportsPage';
import { SourcesPage } from '../page2/SourcesPage';
import { WorkflowPage } from '../page2/WorkflowsPage';
import { TaskPage } from '../page2/TasksPage';
import { EV_Application } from '../page2/EV_ApplicationPage';
import { EV_AccessReview } from '../page2/EV_AccessReviewPage';
import { EV_AccessRequest } from '../page2/EV_AccessRequest';
import { EV_Task } from '../page2/EV_Task';
import { SettingsPage } from '../page2/SettingsPage';
import { AuditLogsPage } from '../page2/AuditLogsPage';



const APIListener = require('../utils/APIListener.js');
let globalApiListener;

test.beforeAll(async () => {
    globalApiListener = new APIListener();
});

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login({
        userName:"zluri_newdev_user4@zluri.dev",
        password:"test@123",
        slug:"testtemplate-6"
    });
    await globalApiListener.startListening(page);
    page.apiListener = globalApiListener;
  });

    test("Overview" , async({page}) =>{
    //Overview
    const overview = new OverviewPage(page);
    await overview.goToOveriew();

    //to be verified
   // await overview.navigateOverview();

})
test.afterEach(async ({}, testInfo) => {
    const outputFolder = path.join(__dirname, 'data');  
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }
    const fileName = `${testInfo.title.replace(/\s+/g, '_')}_curls.txt`;
    
    const filePath = path.join(outputFolder, fileName);
    fs.writeFileSync(filePath, `Test case "${testInfo.title}" has been completed with curls!`);
  
    console.log(`File ${fileName} created for test case: ${testInfo.title}`);
    await globalApiListener.saveAsCurls(filePath);
    await globalApiListener.saveAsPostmanCollection(path.join(outputFolder, 'collection.json'));
  });

test('Applications' , async ({page}) => {
    //Application
    const apps = new ApplicationsPage(page);
    await apps.gotoApplications();
    await apps.navigateApplications();
    await apps.navigateApplications();

    //Automation
   await apps.goToAutomations();
   await apps.navigateAutomations();

});


test("Directory" , async ({page}) => {
    //Directory
    const pageDirectory = new DirectoryPage(page);
    await pageDirectory.goToDirectory();
   
    // Users  
    await pageDirectory.goToUser();
    await pageDirectory.navigateUsers();

    await pageDirectory.goToGroups();
    await pageDirectory.goToDepartments();
    await pageDirectory.goToCostCenters();

});

test ("Licenses" , async({page}) =>{
     //Licenses
     const Licensess = new LicensePage(page);
     await Licensess.goToLicenses();
     await Licensess.navigateLicenses();

     //Renewals
     await Licensess.goToRenewals();
     await Licensess.navigateRenewals();

     //Vendors
     await Licensess.goToVendors();

});




test ("Optimizations" , async({page}) =>{
    //Optimizations
    const optmzn = new OptimizationPage(page);
    await optmzn.goToOptimization();
});




test ("Spends" , async({page}) =>{
    //Spends
    const spends = new Spends(page);
    await spends.goToSpends();
    await spends.navigateTransaction();

    //autoation
    await spends.goToAutomation();
});




test ("Security" , async({page}) =>{
    //spends
    const secure = new SecurityPage(page);
    await secure.goToSecurity();
    await secure.navigateToSecurity();
});


test ("Access Reviews" , async({page}) =>{
    //access Reviews
    const accessReview = new AccessReviewsPage(page);
    await accessReview.goToAccessReviews();
    await accessReview.navigateAccessReviews();
});

test ("Reports" , async({page}) =>{
    //reports
    const report = new ReportsPage(page);
    await report.goToReports();
    await report.navigateOrganizationData();
    await report.navigateWorkableInsights();
    await report.navigateSpendsReports();
    await report.navigateUsageReports();
});

test ("Sources" , async({page}) =>{
    //Integrations
    const source = new SourcesPage(page);
    await source.goToSources();
    await source.navigateIntegration();

    //Agents
    await source.goToAgents();
    await source.navigateSourcesAgents();
});

test ("Workflows" , async({page}) =>{
    //Workflows
    const integration = new WorkflowPage(page);
    await integration.goToWorkflows();
    await integration.navigateOnBoarding();
    await integration.goToWorkflowsOffboarding();
    await integration.navigateWorkflowsOffboarding();
    await integration.goToWorkflowsAccessRequest();
    await integration.navigateWorkflowsAccessRequest();
});

test ("Tasks" , async({page}) =>{
    const tasks= new TaskPage(page);
    await tasks.goToTasks();
});

test ("Settings" , async({page}) =>{
   
    const settings= new SettingsPage(page);
    await settings.goToSettings();
    await settings.navigateSeetings();
});


test ("Audit Logs" , async({page}) =>{
    
    const audits= new AuditLogsPage(page);
    await audits.goToAuditLog();
});

// Employee View 

test ("EV_OverView" , async({page}) =>{
    await page.locator("//nav[@class='Nav ml-auto navbar navbar-expand navbar-light bg-white']//div//span[@class='navbar-brand']").click();
    await page.locator("//button[normalize-space()='Switch to Employee View']").click();

});

test ("EV Application" , async({page}) =>{
    await page.locator("//nav[@class='Nav ml-auto navbar navbar-expand navbar-light bg-white']//div//span[@class='navbar-brand']").click();
    await page.locator("//button[normalize-space()='Switch to Employee View']").click();
    
    const pageApplication = new EV_Application(page);
    await pageApplication.goToEVApplication();
    await pageApplication.navigateEVApplication();

});

test ("EV Access Review" , async({page}) =>{
    await page.locator("//nav[@class='Nav ml-auto navbar navbar-expand navbar-light bg-white']//div//span[@class='navbar-brand']").click();
    await page.locator("//button[normalize-space()='Switch to Employee View']").click();
    
    const pageAccessReview = new EV_AccessReview(page);
    await pageAccessReview.goToEVAccessReview();
    await pageAccessReview.navigateEVAccessReview();
});

test ("EV Access Request" , async({page}) =>{
    await page.locator("//nav[@class='Nav ml-auto navbar navbar-expand navbar-light bg-white']//div//span[@class='navbar-brand']").click();
    await page.locator("//button[normalize-space()='Switch to Employee View']").click();
    
    const pageAccessRequest = new EV_AccessRequest(page);
    await pageAccessRequest.goToEVAccessRequest();
    await pageAccessRequest.navigateEVAccessRequest();
});

test ("EV Task" , async({page}) =>{
    await page.locator("//nav[@class='Nav ml-auto navbar navbar-expand navbar-light bg-white']//div//span[@class='navbar-brand']").click();
    await page.locator("//button[normalize-space()='Switch to Employee View']").click();
    
    const pageTask = new EV_Task(page);
    await pageTask.goToEVTask();
    
});
const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

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
import { SettingsPage } from '../page2/SettingsPage';
import { AuditLogsPage } from '../page2/AuditLogsPage';

test("Overview" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //Overview
    const overview = new OverviewPage(page);
    await overview.goToOveriew();

})
test("Applications" , async ({page}) => {
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //Application
    const apps = new ApplicationsPage(page);
    await apps.gotoApplications();
    await apps.navigateApplications();

    //Automation
   await apps.goToAutomations();
   await apps.navigateAutomations();

});


test("Directory" , async ({page}) => {
    
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

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
     // Login
     const Login = new LoginPage(page);
     await Login.goToLoginPage();
     await Login.login();

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
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //Optimizations
    const optmzn = new OptimizationPage(page);
    await optmzn.goToOptimization();
});




test ("Spends" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //Spends
    const spends = new Spends(page);
    await spends.goToSpends();
    await spends.navigateTransaction();

    //autoation
    await spends.goToAutomation();
});




test ("Security" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //spends
    const secure = new SecurityPage(page);
    await secure.goToSecurity();
    await secure.navigateToSecurity();
});


test ("Access Reviews" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //access Reviews
    const accessReview = new AccessReviewsPage(page);
    await accessReview.goToAccessReviews();
    await accessReview.navigateAccessReviews();
});

test ("Reports" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //reports
    const report = new ReportsPage(page);
    await report.goToReports();
    await report.navigateOrganizationData();
    await report.navigateWorkableInsights();
    await report.navigateSpendsReports();
    await report.navigateUsageReports();
});

test ("Sources" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    //Integrations
    const source = new SourcesPage(page);
    await source.goToSources();
    await source.navigateIntegration();

    //Agents
    await source.goToAgents();
    await source.navigateSourcesAgents();
});

test ("Workflows" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

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
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const tasks= new TaskPage(page);
    await tasks.goToTasks();
});

test ("Settings" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const settings= new SettingsPage(page);
    await settings.goToSettings();
    await settings.navigateSeetings();
});


test ("Audit Logs" , async({page}) =>{
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const audits= new AuditLogsPage(page);
    await audits.goToAuditLog();
});
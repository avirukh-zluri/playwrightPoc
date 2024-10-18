const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

import Login, { LoginPage } from '../page2/LoginPage';
// import { Application } from '../page2/Application';
// import { SecurityPage } from '../page2/SecurityPage';
// import { DirectoryPage } from '../page2/DirectoryPage';
// import { LicensePage } from '../page2/LicensesPage';
// import { OptimizationPage } from '../page2/OptimizationPage';
// import { Spends } from '../page2/Spends';
// import { AccessReviewsPage } from '../page2/AccessReviewsPage';
// import { ReportsPage } from '../page2/ReportsPage';
// import { SourcesPage } from '../page2/SourcesPage';
import { TaskPage } from '../page2/TaskPage';
// import { WorkflowPage } from '../page2/WorkflowPage';




test.describe.configure({ mode: 'parallel' });


test("Application " , async  ( {page} ) => {
    
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const application = new Application(page);
    
    await application.goToApplication();
    // await application.getMergedApplicationCount();
    await application.goToUnmanaged();
    await application.goToRestricted();
    await application.goToNeedReview();
    await application.goToAllApp();
    
});


test ("Optimization" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const pageOptimization = new OptimizationPage(page);

    await pageOptimization.goToOptimization();

});

test("Spends" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageSpends = new Spends(page);
    await pageSpends.goToSpends();
    await pageSpends.navigateTransaction();
    
});


test ("Security" , async({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const PageSecurity = new SecurityPage(page);
    await PageSecurity.navigateToSecurity(page);

});


test("Report" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageReport = new ReportsPage(page);
    await pageReport.goToReports();
    await pageReport.navigateOrganizationData();
    await pageReport.navigateWorkableInsights();
    await pageReport.navigateSpendsReports();
    await pageReport.navigateUsageReports();

});

test ("Sources" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageSources = new SourcesPage(page);
    await pageSources.goToSourcesIntegraton();
    await pageSources.navigateSourcesIntegration();
    await pageSources.goToSourcesAgents();
    await pageSources.navigateSourcesAgents();
});

// test("Workflow " , async ({page}) => {
//     const Login = new LoginPage(page);
//     await Login.goToLoginPage();
//     await Login.login();

//     const pageWorkflows = new WorkflowPage(page);
//     await pageWorkflows.goToWorkflows();
//     await pageWorkflows.navigateWorkflowsOnboarding();
//     await pageWorkflows.createPlaybook();
//     await pageWorkflows.deletePlaybook();
// });

test("Task" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageTasks = new TaskPage(page);
    await pageTasks.goToTasks();
});


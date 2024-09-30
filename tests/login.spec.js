const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

import Login, { LoginPage } from '../page/LoginPage';
import { Application } from '../page/Application';
import { SecurityPage } from '../page/SecurityPage';
import { DirectoryPage } from '../page/DirectoryPage';
import { LicensePage } from '../page/LicensesPage';
import { OptimizationPage } from '../page/OptimizationPage';
import { Spends } from '../page/Spends';
import { AccessReviewsPage } from '../page/AccessReviewsPage';
import { ReportsPage } from '../page/ReportsPage';
import { SourcesPage } from '../page/SourcesPage';
import { TaskPage } from '../page/TaskPage';
import { WorkflowPage } from '../page/WorkflowPage';



async function checkRegexOnPage(page, regex) {
    const pageContent = await page.content();
    return regex.test(pageContent);
}

async function performCheck(page, regex, checkNumber) {

    const isMatch = await checkRegexOnPage(page, regex);

    if (isMatch) {
        console.log(`Match found! - check ${checkNumber}`);
    } else {
        console.log(`No match found. - check ${checkNumber}`);
    }
    return isMatch;
}

test.describe.configure({ mode: 'parallel' });


test('Add Contract', async ( {page} ) => { 
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    // Navigate License 
    await page.locator("//span[normalize-space()='Licenses']").click();
    await page.locator("//a[@href='/licenses#allContracts']").click();
    await page.getByRole('button', { name: 'Add' }).click();
    
    // License Navigation 
    const expectedAppName = 'Asana';
    await page.fill("//input[@placeholder='Enter App Name']" , 'Asana');
    await page.getByRole('button', { name: 'Asana', exact: true }).click();

    // Description 
    const expectedDescirption = 'demo';
    await page.getByPlaceholder('Description...').fill('demo');

    await page.getByText('Happy').click();
    await page.getByText('Automation User').first().click();
    await page.getByText('Automation User').nth(1).click();
    await page.getByText('Automation User').nth(2).click();

    //App It Owner 
    const expectedItOwner = 'AUAutomation User 02';
    await page.getByPlaceholder('Add IT Owner').fill('automation02@zluri.dev');
    await page.getByRole('button', { name: 'AU Automation User 01' }).click();
    await page.locator("//body/div[@id='root']/div/div[contains(@class,'large-screen-only')]/div/div[contains(@class,'createplan__wrapper')]/div[contains(@class,'create_stepper_screen_wrapper')]/div[contains(@class,'create_stepper_screen_wrapper_form_display')]/div[contains(@class,'create_stepper_redux_stepper_container')]/div[contains(@class,'stepper__wrapper')]/div[contains(@class,'stepper__step create_stepper_redux_stepper_step')]/div[contains(@class,'stepper__step__card active card')]/div[contains(@class,'rah-static rah-static--height-auto')]/div/div[contains(@class,'step__collapse card-body')]/div[contains(@class,'d-flex flex-column')]/div[9]/div[1]/div[2]/div[1]").click();

    // Start Date
    const expectedStartDate = 'September 1';
    await page.getByRole('button', { name: 'September 1,' }).click();
    await page.getByText('1 year').click();

    // Cancel Date 
    const expectedCancelDate = 'September 14';
    await page.getByText('Cancel by Date', { exact: true }).click();
    await page.getByRole('button', { name: 'September 14,' }).click();
   
    // Renew Date 
    const expectedRenewDate = 'September 12'
    await page.locator('div').filter({ hasText: /^Renew by Date$/ }).nth(1).click();
    await page.getByRole('button', { name: 'September 12,' }).click();

    await page.getByText('PIA').click();
    await page.getByRole('combobox').click();
    await page.locator('.z__select--options__container--option').first()
    
    // Further Navigation to fill Contract 
    await page.getByPlaceholder('Enter test').fill("test");
    await page.locator('div').filter({ hasText: /^Select test entity$/ }).nth(1).click();
    await page.locator('.z__select--options__container--option').first()
    await page.getByPlaceholder('Enter text_sanity').fill("demo");
    await page.getByRole('button', { name: 'Next' }).click();

    // Add Document 
    // Method 1
    // await page.getByText('+ Add Documents').setInputFiles(path.join(__dirname, 'C:\\Users\\Raja Verma\\Desktop', 'demo.pdf'))

    // Method 2
    // await page.getByTestId(' Add Documents').click();
    // await page.getByText(' Add Documents]').setInputFiles('./Users/Raja Verma/Desktop');
    // await page.locator('text=demo.pdf').click();

    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Add contract' }).click();
    
    // Contract Name
    const expectedContractName = "Asana Contract - 01 Sep 2024";
    
    
    await page.getByRole('button', { name: 'Licenses', exact: true }).dblclick();
    await page.getByRole('link', { name: 'Contracts ' }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill("Asana Contract - 01 Sep 2024");
    await page.getByRole('link', { name: 'Asana Contract - 01 Sep' }).first().click();
    
                                                // Validation
    
    // Contract Name Validation
    const actualContractName = await page.getByText('Asana Contract - 01 Sep').nth(1).textContent();
    expect(actualContractName.trim()).toBe(expectedContractName);

    // App Name Validation 
    const actualAppName = await page.getByRole('link', { name: 'Asana' }).textContent();
    expect(actualAppName.trim()).toBe(expectedAppName);

    // Description validaiton 
    const actualDescription = await page.getByText('demo').first().textContent();
    expect(actualDescription.trim()).toBe(expectedDescirption);

    // It Owner Validaiton 
    const actualItOwner = await page.locator('div').filter({ hasText: /^IT OWNERAUAutomation User 02$/ }).getByRole('link').textContent();
    expect(actualItOwner.trim()).toBe(expectedItOwner);
});

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
    


    
    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;
    
    // // check - 1
    // await performCheck(page, regex, 1);

    // //Application 
    // await page.getByRole('button', { name: 'Applications Applications' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);
    // await page.getByRole('button', { name: 'Add' }).click();
    // await page.getByRole('img', { name: 'Close' }).click();

    // await page.getByRole('link', { name: 'Unmanaged' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByRole('link', { name: 'Restricted' }).click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByRole('link', { name: 'Needs Review' }).click();
    // // check - 5
    // await performCheck(page, regex, 5);

    // await page.getByRole('link', { name: 'All Apps' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);
});


test("Directory" , async ({page}) => {
    
    // Login
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    // Users 
    const pageDirectory = new DirectoryPage(page);
    await pageDirectory.goToDirectory();
    await pageDirectory.navigateUsers();

    // Department 
    await pageDirectory.navigateDepartment();

    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);                        // Users
    // await page.getByRole('button', { name: 'Directory' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);
    
    // await page.getByRole('button', { name: 'Add' }).click();
    // await page.getByRole('img', { name: 'Close' }).click();

    // await page.getByRole('link', { name: 'group' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByRole('link', { name: 'service' }).click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByRole('link', { name: 'external' }).click();
    // await page.getByRole('link', { name: 'service' }).click();
    // // check - 5
    // await performCheck(page, regex, 5);

    // await page.getByRole('link', { name: 'marked for onboarding' }).click();
    // await page.getByRole('link', { name: 'service' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);

    // await page.getByRole('link', { name: 'marked for offboarding' }).click();
    // await page.getByRole('link', { name: 'service' }).click();
    // // check - 7
    // await performCheck(page, regex, 7);

                             // Department
    // await page.getByRole('button', { name: 'Departments Departments' }).click();
    //  // check - 8
    // await performCheck(page, regex, 8);
});

test("Licenses" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();

    // Navigate inside Licenses
    await pageLicenses.navigateLicenses();

    // Go to Renewals 
    await pageLicenses.navigateRenewals();

    // Go to Vendores 
    await pageLicenses.navigateVendors();


    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Licenses', exact: true }).click();
    // // check - 2
    // await performCheck(page, regex, 2);

    // await page.getByAltText('dropdown').click();
    // await page.locator('#root').getByText('Main View').click();

    // // Hide and Show Summary 
    // var showSummary = await page.getByRole('img', { name: 'toggle' }).textContent();
    // if(showSummary){
    //     await page.getByRole('img', { name: 'toggle' }).click();

    // }
    // else{
    //     await page.getByRole('img', { name: 'toggle' }).click();
    // }
    // await page.getByRole('link', { name: 'Subscriptions' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByRole('link', { name: 'Contracts' }).click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByRole('link', { name: 'Perpetuals' }).click();
    // // check - 5
    // await performCheck(page, regex, 5);

    //                           // Renewals
    // await page.getByRole('button', { name: 'Renewals Renewals' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);
    //                             // Vendors
    // await page.getByRole('button', { name: 'Vendors Vendors' }).click();
    // // check - 7
    // await performCheck(page, regex, 7);
    // await setTimeout(10000);
    // // Hide and Show Summary 
    // showSummary = await page.getByRole('img', { name: 'toggle' }).textContent();
    // if(showSummary){
    //     await page.getByRole('img', { name: 'toggle' }).click();
    // }
    // else{
    //     await page.getByRole('img', { name: 'toggle' }).click();
    // }
});


test ("Optimization" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const pageOptimization = new OptimizationPage(page);

    await pageOptimization.goToOptimization();

    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Optimization Optimization' }).click();
    // // check 2
    // await performCheck(page, regex, 2);

});

test("Spends" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageSpends = new Spends(page);
    await pageSpends.goToSpends();
    await pageSpends.navigateTransaction();

    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Spends' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);
    //                     // Transaction 

    // // click on add and close 
    // await page.getByRole('button', { name: 'Add' }).click();
    // await page.getByRole('img', { name: 'Close' }).click();

    // await page.getByRole('link', { name: 'Unrecognised' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByRole('link', { name: 'Archived' })    .click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByRole('link', { name: 'Payment Methods' }).click();
    // // check - 5
    // await performCheck(page, regex, 5);

    // await page.getByRole('button', { name: 'Add Bank Account' }).click();
    // await page.getByRole('button', { name: 'Close' }).click();

    
    // await page.getByRole('link', { name: 'Uploads' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);
    
});


test ("Security" , async({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const PageSecurity = new SecurityPage(page);
    await PageSecurity.navigateToSecurity(page);

    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Security Security' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);

    // await page.getByRole('link', { name: 'Critical Users' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);
});

test("Access review" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageAccessReviews = new AccessReviewsPage(page);

    // Create Playbook
    const application = new Application(page);
    
    await application.goToApplication();
    // await application.getMergedApplicationCount();
    await application.goToAllApp();
    await application.addPlaybookForApp({
        name : "Asana",
        actionName : "Create A Manual Task",
        playbookActionName : "Delete Project"
    });

        // Create Certificate
    await pageAccessReviews.goToAccessReviewsOngoing();
    await setTimeout(3000);
    await pageAccessReviews.createCertificate({
        certName: "Demo Certificate 1",
        certOwner: "Pod4",
        certDescription: "Certificate for testing purposes",
        primaryReviewer: "jocker",
        secondaryReviewer: "keerthy",
        appName: "Asana"
    });

    // Delete Playbook 
    await application.deletePlaybook({
        name:"Asana"
    });

    // await pageAccessReviews.goToAccessReviewsUpcoming();
    // await pageAccessReviews.goToAccessReviewsCompleted();



    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Access Reviews Access Reviews' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);

    // await page.getByRole('button', { name: 'Create New Certification' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByRole('button', { name: 'Cancel' }).click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByRole('button', { name: 'Yes' }).click();
    // // check - 5
    // await performCheck(page, regex, 5);

    // await page.getByRole('link', { name: 'Upcoming' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);

    // await page.getByRole('link', { name: 'Completed' }).click();
    // // check - 7
    // await performCheck(page, regex, 7);
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

    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Reports Reports' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);

    // await page.getByText('Organization Data').click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByText('Workable Insights').click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByText('Spend Reports').click();
    // // check - 5
    // await performCheck(page, regex, 5);

    // await page.getByText('Usage Reports').click();
    //  // check - 6
    // await performCheck(page, regex, 6);
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
    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;

    // // check - 1
    // await performCheck(page, regex, 1);

    // await page.getByRole('button', { name: 'Sources' }).click();

    //                     // Integration 
    // await page.getByRole('button', { name: 'Browse Catalog' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);

    // await page.getByRole('img', { name: 'Close' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);

    // await page.getByText('Connected').click();
    // // check - 4
    // await performCheck(page, regex, 4);

    // await page.getByText('Connection Requests').click();
    // // check - 5
    // await performCheck(page, regex, 5);

    //                     // Agents 
    // await page.getByRole('button', { name: 'Agents Agents' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);

    // await page.getByRole('link', { name: 'Users' }).click();
    // // check - 7
    // await performCheck(page, regex, 7);

    // await page.getByRole('link', { name: 'Desktop AgentsBETA' }).click();
    // // check - 8
    // await performCheck(page, regex, 8);
});

test("Workflow " , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageWorkflows = new WorkflowPage(page);
    await pageWorkflows.goToWorkflows();
    await pageWorkflows.navigateWorkflowsOnboarding();
    await pageWorkflows.createPlaybook();
    await pageWorkflows.deletePlaybook();


    // await pageWorkflows.goToWorkflowsOffboarding();
    // await pageWorkflows.navigateWorkflowsOffboarding();

    // await pageWorkflows.goToWorkflowsAccessRequest();
    // await pageWorkflows.navigateWorkflowsAccessRequest();


    // const regex = /something\s*went\s*wrong\s*[^\w\s]?/i;
    // // check - 1
    // await performCheck(page, regex, 1);
    //                     // Onboarding 
    // await page.getByRole('button', { name: 'Workflows' }).click();
    // // check - 2
    // await performCheck(page, regex, 2);

    // await page.getByRole('link', { name: 'Draft' }).click();
    // // check - 3
    // await performCheck(page, regex, 3);
    // await page.getByRole('button', { name: 'New Workflow' }).click();
    // await page.getByRole('img', { name: 'Close' }).click();

    // await page.getByRole('link', { name: 'Playbooks' }).click();
    // // check - 4
    // await performCheck(page, regex, 4);
    // await page.getByRole('button', { name: 'New Playbook' }).click();
    // await page.getByLabel('breadcrumb').locator('img').first().click();

    // await page.getByRole('link', { name: 'Run logs' }).click();
    // // check - 5
    // await performCheck(page, regex, 5);

    // await page.getByRole('link', { name: 'Scheduled Runs' }).click();
    // // check - 6
    // await performCheck(page, regex, 6);

    // await page.getByRole('link', { name: 'Automation Rules' }).click();
    // // check - 7
    // await performCheck(page, regex, 7);
    // await page.getByRole('button', { name: 'New Rule' }).click();
    // await page.getByLabel('breadcrumb').locator('img').first().click();

    //                     // Offboarding 
    // await page.getByRole('button', { name: 'Offboarding Offboarding' }).click();
    // // check - 8
    // await performCheck(page, regex, 8);
    
    // await page.getByRole('link', { name: 'Draft' }).click();
    // // check - 9
    // await performCheck(page, regex, 9);
    // await page.getByRole('button', { name: 'New Workflow' }).click();
    // await page.getByRole('img', { name: 'Close' }).click();

    // await page.getByRole('link', { name: 'Playbooks' }).click();
    // // check - 10
    // await performCheck(page, regex, 10);
    // await page.getByRole('button', { name: 'New Playbook' }).click();
    // await page.getByLabel('breadcrumb').locator('img').first().click();

    // await page.getByRole('link', { name: 'Run logs' }).click();
    // // check - 11
    // await performCheck(page, regex, 11);

    // await page.getByRole('link', { name: 'Scheduled Runs' }).click();
    // // check - 12
    // await performCheck(page, regex, 12);

    // await page.getByRole('link', { name: 'Automation Rules' }).click();
    // // check - 13
    // await performCheck(page, regex, 13);
    // await page.getByRole('button', { name: 'New Rule' }).click();
    // await page.getByLabel('breadcrumb').locator('img').first().click();

    //                     // Access Request 
    // await page.getByRole('button', { name: 'Access Requests Access' }).click();
    // // check - 14
    // await performCheck(page, regex, 14);

    // await page.getByRole('link', { name: 'Completed' }).click();
    // // check - 15
    // await performCheck(page, regex, 15);

    // await page.getByRole('link', { name: 'Automation Rules' }).click();
    // // check - 16
    // await performCheck(page, regex, 16);
    // await page.getByRole('button', { name: 'New Rule' }).click();
    // await page.getByLabel('breadcrumb').locator('img').first().click();
    // await page.getByRole('button', { name: 'Cancel' }).click();    
});

test("Task" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();

    const pageTasks = new TaskPage(page);
    await pageTasks.goToTasks();

    // await page.getByRole('button', { name: 'Tasks Tasks' }).click();
    // // check - 1
    // await performCheck(page, regex, 17);
});

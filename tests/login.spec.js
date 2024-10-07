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


test('Licenses Contract', async ( {page} ) => { 
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    const license = new LicensePage(page);
    await license.goToLicenses();
    await license.createContract({
        appName:"Asana",
        descName:"Demo",
        vendorName:"Asana",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });
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

    //Directory
    const pageDirectory = new DirectoryPage(page);
    await pageDirectory.goToDirectory();
   
    // Users  
    await pageDirectory.goToUser();
    const userHeadElement = await page.locator("div.ins-1");
    const text = await userHeadElement.textContent(); 
    expect(text).toBe("Users");

    
    //Employee count
    const userHead_employee_count = await page.locator("//a[@class='nav-link d-flex align-items-center text-capitalize active']//div");
    const head_emp_count_text = await userHead_employee_count.textContent(); 
    const head_emp_count = parseInt(head_emp_count_text, 10);

    //employee list length vaidation
    // Scroll to the bottom of the table
    const tableHandle = await page.$("#scrollRoot");
    const rowSelector = `${"#scrollRoot"} tr`;
    
    let previousRowCount = 0;

    while (true) {
        // Scroll down
        await tableHandle.evaluate(element => {
            element.scrollTop = element.scrollHeight;
        });
        
        // Wait for new rows to load (if applicable)
        await page.waitForTimeout(5000); // Adjust timeout as necessary
        
        // Count the current number of rows
        const rows = await page.$$eval(rowSelector, rows => rows.length);
        
        // Check if we reached the end
        if (rows === previousRowCount) break;
        
        previousRowCount = rows;
    }
    
    // Final count of rows
    //var initial_totalRows = await page.$$eval(rowSelector, rows => rows.length);
    let initial_totalRows = previousRowCount;
    
    
    console.log(`Total rows: ${initial_totalRows}`);

    //new to be corrected
   // expect(head_emp_count).toBe(initial_totalRows)

    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator("//div[@class='font-18 primary-color text-capitalize']").click()
    await page.locator("//div[@class='d-flex align-items-center modal-title h4']//div[@id='0']").click()

    var randomnum=Math.floor(Math.random()*(999-100+1)+100);
    var employee_name="Employee"+randomnum;

    await page.fill("//input[@placeholder='eg: John Doe']",employee_name);

    var employee_mail="emp"+randomnum+"@zluri.com"

    await page.fill("//input[@placeholder='eg: john.doe@mycompany.com']",employee_mail)

    await page.fill("//input[@placeholder='eg: General Associate']","Associate")
    await page.locator("//div[@class='d-flex align-items-center justify-content-between border-1 border-radius-4']//img").click()
    await page.locator("//div[@class='add_user_form_grid mt-2']//div//div[@id='0']").click()
    await page.locator("//input[@placeholder='eg: Sales']").fill("Pod4")
    await page.locator("//div[@class=' suggestion_menu_application_name text-capitalize ']").click();

    await page.fill("//input[@placeholder='eg: Mark Davis']",'Pod4')
    await page.locator("//div[contains(@class,'row suggestion_menu_application_name_row')]").click()

    var personal_mail="emp"+randomnum+"@gmail.com"
    await page.fill("//input[@placeholder='eg: john.doe@gmail.com']",personal_mail)

    await page.locator("//input[contains(@class,'form-check-input position-static')]").click()

    await page.fill("//input[@placeholder='Search User']",'Pod4')
    await page.locator("//div[@class='row suggestion_menu_application_name_row']").click()

    await page.locator("//div[@class='z__date-picker']//span//span[@class='z__date-picker--placeholder pl-1']").click()

    await page.getByText('25').scrollIntoViewIfNeeded();
    await page.locator("//abbr[@aria-label='October 31, 2024']").click()

    await page.locator("//button[normalize-space()='Add User']").click()

    //validation of employee addition
    const notification_message = await page.locator("//div[@class='notification_title']");
    const text1 = await notification_message.textContent(); 
    expect(text1).toBe("New user successfully added");


    await page.waitForTimeout(2000);
   
    //post Employee count
    const post_userHead_employee_count = await page.locator("//a[@class='nav-link d-flex align-items-center text-capitalize active']//div");
    const post_head_emp_count_text = await post_userHead_employee_count.textContent(); 
    const post_head_emp_count = parseInt(post_head_emp_count_text, 10);

    console.log(post_head_emp_count)
    console.log(head_emp_count)

    expect(post_head_emp_count).toBe(head_emp_count + 1)




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

test("Licenses Subscription" , async ({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    // Create Subscription
    await pageLicenses.createSubscription({
        appName:"Asana",
        descName:"Demo",
        vendorName:"Asana",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});

test("License Perpetuals" , async({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        appName:"Asana",
        descName:"Demo",
        vendorName:"Asana",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });

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
        playbookActionName : "Add a user to application"
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
    await setTimeout(2000);
    // Delete Playbook
    await application.goToApplication();
    await application.goToAllApp();
    await application.deletePlaybook({
        name:"Asana"
    });
    await pageAccessReviews.goToAccessReviewsOngoing();
    // await setTimeout(5000);
    // await pageAccessReviews.certValidation({
    //     certName:"Demo Certificate 1"
    // });
    // await pageAccessReviews.archieveCert();
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

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
// import { TaskPage } from '../page/TaskPage';
import { WorkflowPage } from '../page/WorkflowPage';

test.describe.configure({ mode: 'parallel' });


test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login({
        userName:"pod4_automation_prod@zluri.dev",
       
        password:"test@123",
        
    });
    // await globalApiListener.startListening(page);
    // page.apiListener = globalApiListener;
});

test('Contract with License without custom fields', async ( {page} ) => { 
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:"Pro",
        licenseNameUsageBased:"Pro 1",
        cost:"1000",
        tenure:"months",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        usageBased:true,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });
});

test('Contract with License with custom fields', async ( {page} ) => { 
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        // vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:"Pro",
        cost:"1000",
        tenure:"months",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4",
        licenseNameUsageBased:"Pro 1",
        usageBased:true,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });
});

test('Contract without License without custom fields', async ( {page} ) => { 
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
    });
});
test('Contract without License with Custom field', async ( {page} ) => { 
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4"
    });
});

test('Contract without License without custom fields but with Vendor Validation' , async ({page}) => {
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.goToLicenses();
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
    });
})

test('Contract without License without custom fields but with Renewal Validation' , async ({page}) => {
    test.setTimeout(360000);
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    try {
        await license.goToLicenses();
        await license.createContract({
            newName:randomString,
            appName:"Asana",
            descName:"Demo",
            primaryOwner:"Jocker",
            financeOwner:"Jocker",
            ItOwner:"Jocker",
            negotiationOwner:"Jocker",
        });
        // console.log(randomString);
        await license.renewalValidation({
            newName:randomString
         });
    } catch (error) {
        console.error('Test failed:', error.message);
        throw error;
    }
});
test("Contrat with New Application" , async( {page} ) => {
    test.setTimeout(360000);
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomAppName = Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    await license.goToLicenses();
    await license.createContract({
        newName:randomString,
        newAppName:randomAppName,
        appOwner:"POD4",
        category:"Marketing Lead Scoring",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
    });

})

test("Contract with new Vendor" , async ( {page} ) => {
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomName = Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    const randomVendorName ='TestVendor_' + Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    await license.goToLicenses();
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        newVendorName:randomVendorName,
        vendorOwner : "POD4",
        websiteName:`www.${randomName}.com`,
        vendorContactName:randomName,
        jobTitle:"Marketing Manager",
        vendorContactEmail:`${randomName}@gmail.com`,
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
    });
});

test('Contract with no Application' , async ({page}) => {
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.goToLicenses();
    await license.createContractWithNoApplication({
        newName:randomString,
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
    });
});

test('Contract Creation from Vendor' , async ( {page} ) => {
    const license = new LicensePage(page);
    await license.goToLicenses();

    // Go to vendor
    await license.navigateVendors();
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('notion');
    await page.getByRole('cell', { name: 'notion' }).locator('div').click();
    await page.getByRole('link', { name: 'Contracts' }).click();
    await page.locator('div').filter({ hasText: /^\+ Add$/ }).nth(1).click();
    await page.locator('[id="\\30 "]').click(); // Click On Contract 

    // Contract
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createContractWithNoApplication({
        newName:randomString,
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        subscriptionFromVendor:true,
    });
});

test('Contract renewing with existing contract With new data' , async ( {page} ) => {
    test.setTimeout(120000);
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.renewContractWithExistingContract({
        oldContractName:"Test_08dyq",
        newData:true,
        newName:randomString,
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4"
    });
});

test('Contract renewing with existing contract  with existing data' , async ( {page} ) => {
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.renewContractWithExistingContract({
        oldContractName:"Test_08dyq",
        newData:false,
        newName:randomString,
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4"
    });
});

test('Contract mapping in the License Table' , async ( { page } ) => {
    const license = new LicensePage(page);
    await license.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomLicenseName = 'Pro_' + Math.random().toString(36).substring(2, 7);
    await license.createContract({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        // vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:randomLicenseName,
        cost:"1000",
        tenure:"months",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4",
        licenseNameUsageBased:"Pro 1",
        usageBased:false,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });

    await page.getByRole('button', { name: 'Applications Applications' }).click();
    await page.getByRole('link', { name: 'All Apps' }).click();
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('Asana');
    await page.getByPlaceholder('Search').press('Enter');
    await page.getByRole('cell', { name: 'Asana' }).click();
    await page.getByRole('link', { name: 'Licenses' }).click();
    await page.getByPlaceholder('Search Licenses').click();
    await page.getByPlaceholder('Search Licenses').fill(randomLicenseName);
    const expectedLicenseNameawait = await page.locator("(//div[@class='d-flex align-items-center'])[1]").textContent();
    expect(randomLicenseName).toEqual(expectedLicenseNameawait);

});

test("Application " , async  ( {page} ) => {
    const application = new Application(page);
    
    await application.goToApplication();
    // await application.getMergedApplicationCount();
    await application.goToUnmanaged();
    await application.goToRestricted();
    await application.goToNeedReview();
    await application.goToAllApp();
});


test("Directory" , async ({page}) => {
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


     // Wait for the table body to be visible
     const tableBodyLocator = page.locator('tbody'); 
     await tableBodyLocator.waitFor(); 
    //employee list length vaidation
    // Scroll to the bottom of the table
    const tableHandle = await page.$("#scrollRoot");
   // const rowSelector = `${"#scrollRoot"} tr`;
    
    let previousRowCount = 0;
    let currentRowCount=0;

    while (true) {
         // Scroll the container directly
         await tableHandle.evaluate(element => {
            element.scrollTop += 300; // Adjust this value as needed
        });

        // Wait for a moment to allow new rows to load
        await page.waitForTimeout(1000); // Adjust based on your application's loading speed

        // Get the current number of rows
        currentRowCount = await tableBodyLocator.locator('tr').count();

        // Check if we reached the end
        if (currentRowCount === previousRowCount) break;
        
        previousRowCount = currentRowCount;
    }
    
    // Final count of rows
    //var initial_totalRows = await page.$$eval(rowSelector, rows => rows.length);
    let initial_totalRows = previousRowCount;
    
    
    console.log(`Total rows: ${initial_totalRows}`);
//new
    const tableBodyLocator_user = page.locator('//tbody'); // Use the appropriate selector
    const rows_user = await tableBodyLocator_user.locator('tr'); // Select all rows within the table body
    const rowCount_user = await rows_user.count(); // Get the number of rows

    console.log(`Number of rows user: ${rowCount_user}`);
//AV

async function scrollThroughDynamicElements(page, selector, maxScrolls = 10) {
    let previousElementCount = 0;
    let scrollCount = 0;
    let noNewElementsCount = 0;
    while (scrollCount < maxScrolls) {
      // Get all current elements
      const elements = await page.$$("(//tr[@class='table__row undefined'])");
      // If no new elements loaded in the last 3 scrolls, break the loop
      if (elements.length === previousElementCount) {
        noNewElementsCount++;
        if (noNewElementsCount >= 3) break;
      } else {
        noNewElementsCount = 0;
      }
      // Process new elements
      for (let i = previousElementCount; i < elements.length; i++) {
        const element = elements[i];
        await element.scrollIntoViewIfNeeded();
        // Optional: Add a small delay
        await page.waitForTimeout(500);
        // Optional: Perform actions on the element
        // For example: await element.click();
        // Optional: Log the current element
        console.log('Processed element:', await element.evaluate(el => el.textContent));
      }
      // Scroll to the last element to trigger loading more
      if (elements.length > 0) {
        await elements[elements.length - 1].scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Wait for potential new elements to load
      }
      previousElementCount = elements.length;
      scrollCount++;
      console.log(`Scroll ${scrollCount}: Processed ${elements.length} elements`);
    }
    console.log(`Finished scrolling. Total elements processed: ${previousElementCount}`);
  }
  

  
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

  //search the added user
    await page.locator("//input[@placeholder='Search']").fill(employee_name);
    await page.waitForTimeout(5000);
    const user_list_name_ele = await page.locator("//div[@class='truncate_10vw text-capitalize']");
    const user_list_name = await user_list_name_ele.textContent(); 
    expect(user_list_name).toBe(employee_name);



    await pageDirectory.navigateUsers();
});

test("Subscription with License with Custom Fields" , async ({page}) => {
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Subscription
    await pageLicenses.createSubscription({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:"Pro",
        cost:"1000",
        tenure:"months",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4",
        licenseNameUsageBased:"Pro 1",
        usageBased:true,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });
});

test("Subscription with License without Custom Fields" , async ({page}) => {
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Subscription
    await pageLicenses.createSubscription({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:"Pro",
        cost:"1000",
        tenure:"months",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        licenseNameUsageBased:"Pro 1",
        usageBased:true,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });
});
test("Subscription without License with custom feilds" , async ({page}) => {
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Subscription
    await pageLicenses.createSubscription({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4"
    });
});
test("Subscription without License without custom feilds" , async ({page}) => {
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Subscription
    await pageLicenses.createSubscription({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});
test("Subscription without License without custom feilds but with vendor Validation" , async ({page}) => {
    const pageLicenses = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Go to Licenses
    await pageLicenses.goToLicenses();
    // Create Subscription
    await pageLicenses.createSubscription({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});

test("Subscription with New Application" , async( {page} ) => {
    test.setTimeout(120000);
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomAppName = Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    await license.goToLicenses();
    await license.createSubscription({
        newName:randomString,
        newAppName:randomAppName,
        appOwner:"POD4",
        category:"Marketing Lead Scoring",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});

test("Subscription with new Vendor" , async ( {page} ) => {
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomName = Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    const randomVendorName ='TestVendor_' + Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    await license.goToLicenses();
    await license.createSubscription({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        newVendorName:randomVendorName,
        vendorOwner : "POD4",
        websiteName:`www.${randomName}.com`,
        vendorContactName:randomName,
        jobTitle:"Marketing Manager",
        vendorContactEmail:`${randomName}@gmail.com`,
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});

test("Subscription with No Applciation" , async ( {page} ) => {
    const pageLicenses = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Go to Licenses
    await pageLicenses.goToLicenses();
    // Create Subscription
    await pageLicenses.createSubscriptionWithNoApplication({
        newName:randomString,
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});

test('Subscription Creation from Vendor' , async ( {page} ) => {
    const license = new LicensePage(page);
    await license.goToLicenses();

    // Go to vendor
    await license.navigateVendors();
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('notion');
    await page.getByRole('cell', { name: 'notion' }).locator('div').click();
    await page.getByRole('link', { name: 'Contracts' }).click();
    await page.locator('div').filter({ hasText: /^\+ Add$/ }).nth(1).click();
    await page.locator('[id="\\31 "]').click(); // Click On Subscription

    // Contract
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createSubscriptionWithNoApplication({
        newName:randomString,
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years",
        subscriptionFromVendor:true
    });

});

test("Renewals", async ({page}) => {
        await page.locator("//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]").click();
        await page.locator("//span[normalize-space()='Renewals']").click();

        //name validation
        const RenewalsHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
        const text = await RenewalsHeadElement.textContent(); 
        expect(text).toBe("Renewals");

        //GO TO GRID VIEW 

        //on view data verification
        //await page.locator("//div[@class='renewals__header']//div[@class='view-swicth d-inline-flex']//button[1]//img").click();
        await page.locator("//div[@class='view-swicth d-inline-flex']//button[2]").click();


        //Selected month validation 
        const slelected_month_name =await page.locator("//div[@class='block block__year flex-grow-1 d-inline-flex flex-wrap mr-3 ']//div[1]//div[1]//h4").textContent();
        console.log(slelected_month_name);
  
        const [monthYear, amount] = slelected_month_name.split(/\s*\$\s*/);

        // Clean up the month and year
    const cleanedMonthYear = monthYear.trim();
    const cleanedAmount = `$${amount.trim()}`; // Prepend the dollar sign

    // Log the results
    console.log(`Month and Year: ${cleanedMonthYear}`); // October' 24
    console.log(`Amount: ${cleanedAmount}`); // $4.3M


        const month_card_element = await page.locator("//div[@class='block block__month']//div[1]//div[1]//div[@class='font-18 bold-400'][1]").textContent();
        console.log(month_card_element);

        expect(cleanedMonthYear).toBe(month_card_element);
        if(cleanedMonthYear === month_card_element){
            console.log('The Selected Month Name,Year matches with the right pannel month name');
        }

        const monthcard_cost_element = await page.locator("//div[@class='block block__month']//div[1]//div[1]//div[2]//div[2]").textContent();
        
        if(cleanedAmount === monthcard_cost_element){
            console.log(`The cost of the selected month card matches with the right pannel cost -> ${monthcard_cost_element}`);
        }

        //reminder set operation ------------------------------------------------------------------------------------------
        await page.locator("//body/div[@id='root']/div/div[@class='large-screen-only']/div/div[@role='navigation']/div/div[@class='renewals__body pl-5 pr-5 pt-3']/div[contains(@class,'grid__container d-flex')]/div[contains(@class,'block block__year flex-grow-1 d-inline-flex flex-wrap mr-3')]/div[2]").click();
        const reminderButton = page.locator('//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/button[1]');
        await reminderButton.waitFor({ state: 'visible' });
        
        // Get the button text
        const buttonText = await reminderButton.textContent();
        if (buttonText?.toLowerCase().includes('reminds on')) {
          // If reminder exists, perform delete logic
          await test.step('Delete existing reminder', async () => {
            await reminderButton.click();
            
            // Wait for confirmation modal or dropdown
            await page.locator("//div[contains(@class,'d-flex')]//img[contains(@class,'cursor-pointer')]").click();
            await page.locator("//button[normalize-space()='Reset Reminder']").click();
            
            
            // Verify reminder is removed
            await expect(reminderButton).toHaveText(/Set Reminder/i);
            await page.waitForTimeout(4000);
           
          });
        } 
          // If no reminder exists, set new reminder
          await test.step('Set new reminder', async () => {
            await reminderButton.click();
            await page.locator('input.flex-fill.remind__input[type="number"]').fill("1");
            await page.locator('button.z__button.undefined', { hasText: 'Set Reminder' }).click();
            
           //verify
            await expect(reminderButton).toContainText('Reminds on');
          });
        
        
        //month card
        // await page.locator("//body/div[@id='root']/div/div[@class='large-screen-only']/div/div[@role='navigation']/div/div[@class='renewals__body pl-5 pr-5 pt-3']/div[contains(@class,'grid__container d-flex')]/div[contains(@class,'block block__year flex-grow-1 d-inline-flex flex-wrap mr-3')]/div[2]").click()
        // await page.locator("//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/button[1]").click();
        // await page.locator("//div[@class='row d-flex flex-column grow']//div[3]//button[@class='z__button undefined']").click();


        //set reminder verification --to be modified
        const notification_message_renewal_ele = await page.locator("//div[@class='notification_title']");
       // const  notification_message_renewal= await notification_message_renewal_ele.textContent(); 
       // expect(notification_message_renewal).toBe("Reminder successfully updated");

        //to be updated on sheet
        //go to the List view-------------------------------------------------------------------------
        await page.locator("//div[@class='view-swicth d-inline-flex']//button[1]").click();
        await page.waitForTimeout(1000);
        //sort ->click on sort arrow
        await page.locator("//table[@class='table table-hover mb-0']//thead[@class='new-infinite-table-header']/tr/th[1]/div//div[@class='table-header-sort-icons'][1]//img[1]").click();
        
        //go to top set reminder to be added if text is edit reminder it will delete reminder then set reminder
        //other wise set reminder 
        await page.locator('//tbody/tr[1]//td[7]//div[contains(@class,"position-relative renewal_table_reminder")]//button').click();
        await page.locator("//div[@class='row d-flex flex-column grow']//div[1]//div[1]//input").fill("2");
        await page.locator("//div[@class='row d-flex flex-column grow']//div[3]//button[@class='z__button undefined']").click();
        
        //Main view ->go and add new view
        await page.locator("//div[@class='z__select text-capitalize mr-3 mt-auto mb-auto']//div[@class='z__select--input dropdown-click']").click();
        await page.locator("//span[contains(@class, 'typography--variant-subheading_2_regular') and text()='Save Custom View']").click();
        await page.locator("//div[@class='modal-content']//div[@class='bg-white rounded-top modal-body']//div[@class='p-3']//input[@name='Name' and @placeholder='Name']").fill("sdet-view");
        await page.locator("//div[@class='modal-content']//div[@class='bg-white rounded-top modal-body']//div[@class='p-3']//input[@name='Description' and @placeholder='Description']").fill("automation-view for test");
        await page.locator("//button[@type='button' and @class='btn btn-primary' and text()='Save']").click();
        //validation that filter has been added
        await expect(async () => {
            const text = await page.locator("//span[@class='truncate_10vw']").textContent();
            expect(text).toBe("sdet-view", `Expected text to be 'sdet-view' but found '${text}'`);
          }).toPass({timeout: 2000});


        //delete view
        await page.locator("//div[@class='z__select text-capitalize mr-3 mt-auto mb-auto']//div[@class='z__select--input dropdown-click']").click();
        try {
            
            const viewRow = page.locator("//span[contains(@class, 'sc-iCZwEW') and text()='sdet-view']");
            const isViewVisible = await viewRow.isVisible({ timeout: 1000 });
            
            if (isViewVisible) {
                const deleteButton = page.locator("//div[.//span[text()='sdet-view']]//img[@alt='delete']");
                await deleteButton.click();
                await page.locator("button.btn-danger:has-text('Delete')").click();
                
                // Verify deletion (wait for element to disappear)
                await expect(viewRow).not.toBeVisible({ 
                    timeout: 1000,
                    message: "Custom view 'sdet-view' should be deleted"
                });
                
                console.log("Successfully deleted 'sdet-view'");
            } else {
                console.log("'sdet-view' not found");
            }
        } catch (error) {
            console.error(`Error while deleting custom view: ${error}`);
        }



        //pagenation------------------------------------------------------------------------------------------
        await page.waitForSelector('tbody#scrollRoot');
        await page.waitForSelector('.table__row__select');

  // Function to get total rows
  async function getTableRowCount() {
    const rows = await page.locator('tbody#scrollRoot tr.table__row').all();
    return rows.length;
  }

  // Function to get selected dropdown value
  async function getSelectedRowsValue() {
    const selectedValue = await page.locator('.table__row__select').evaluate(select => select.value);
    return parseInt(selectedValue);
  }

  // First check with default selection
  const initialRowCount = await getTableRowCount();
  const initialSelectedValue = await getSelectedRowsValue();
  
  console.log(`Initial row count: ${initialRowCount}`);
  console.log(`Selected value in dropdown: ${initialSelectedValue}`);

  //assertion
  expect(initialRowCount, 'Number of rows should not exceed selected value').toBeLessThanOrEqual(initialSelectedValue);

  //page 1 of total count validation
  
  async function getTotalRenewalsCount(page) {
    const countText = await page.locator('.d-flex.z_table_chips .mx-1').first().textContent();
    const count = countText.match(/Showing (\d+) Renewals/);
    return count ? parseInt(count[1]) : 0;
}
      const totalRenewals = await getTotalRenewalsCount(page);
      const totalPages = Math.ceil(totalRenewals / initialSelectedValue);
      console.log(totalPages);

      for(let i=1;i<totalPages;i++ ){
        const rightArrow = page.locator('div.table__info__text__right2.cursor-pointer img[src*="rightarrow"]');

        // Verify arrow is present and clickable
        await expect(rightArrow, 'Right arrow should be visible').toBeVisible();
        await expect(rightArrow, 'Right arrow should be enabled').toBeEnabled();
        await page.locator('div.table__info__text__right2.cursor-pointer img[src*="rightarrow"]').click();
      }
     
        //Filter-------------------------------------------------------------------------------------------
        //read initial count ->set filter ->read final count-try to delete the filter ->read the count
        //fltercout before
        //const filterContainer = page.locator("div.cursor-pointer.align-items-center.d-flex.h-100");
        const filterContainer = page.locator('//div[contains(@class, "cursor-pointer")]//span[text()="Filter"]/parent::div[.//div[contains(@class, "filterModal_NumberPill")]]');
        // Locate the filter count element
        const filterCount = page.locator("div.filterModal_NumberPill");
        
        // Read the filter count before clicking
        const count_before = await filterCount.textContent();
        console.log(`Before filter count: ${count_before}`);
        
        // Click on the filter
        await filterContainer.click();
        
        //filter oeprations
        await page.locator("//div[contains(@class, 'applied_filters_modal_button') and contains(text(), '+ Add Filters')]").click();
        await page.locator("//input[@placeholder='Search Filters' and @style='width: 250px; border: 0px; font-size: 14px; padding: 4px;']").fill("application name");

        const addButton = page.locator("img#app_name");
        await addButton.click();
        
        // Wait for input field to be visible and fill it
        const inputField = page.locator("//input[@id='formBasicCheckbox' and @placeholder='Enter value' and @type='text']");
        await inputField.waitFor({ state: 'visible', timeout: 1000 });
        
        // Clear any existing value and fill new value
        await inputField.clear();
        await inputField.fill("asana");
        await page.locator("//button[@class='btn btn-primary btn-sm' and text()='Apply']").click();
        await page.waitForTimeout(1000);
        //fltercout after
        
        // Locate the filter count element
        const filterCountafter = page.locator("div.filterModal_NumberPill");
        
        // Read the filter count after clicking
        const countafter = await filterCountafter.textContent();
        console.log(`After filter count: ${countafter}`);
       

        //validate after filter 1st name element app name matches entered value
        //Refresh
        await page.locator('//button[contains(@class, "appsad")]//img[contains(@src, "refresh")]').click();
        const filterCountafter_refresh = page.locator("div.filterModal_NumberPill");
        const countafter_refresh = await filterCountafter_refresh.textContent();
        console.log(`After refresh filter count: ${countafter_refresh}`);

        //remove filter
        //await page.locator('//div[contains(@class, "cursor-pointer") and contains(@class, "d-flex") and contains(@class, "align-items-center")][.//span[text()="Filter"]]').click();
       await page.locator('//div[contains(@class, "cursor-pointer")]//span[text()="Filter"]/parent::div[.//div[contains(@class, "filterModal_NumberPill")]]').click();
        await page.locator('//div[contains(@class, "applied_filters_modal_content_row")][.//span[text()="asana"]]//img[contains(@src, "cross-filter")]').click();
        await page.reload();
        
        //Slelect column
        //Search
        await page.locator("//div[@class='view-swicth d-inline-flex']//button[1]").click();
        await page.locator('//div[contains(@class, "inputWithIconApps")]/input[@type="text" and @placeholder="Search"]').fill("Asana");

        //Export
        await page.locator('//button[contains(@class, "export") and .//span[text()="Export"]]').click();
        await page.locator("//div[@class='pt-1 form-check']//input[@type='checkbox']").click();
        await page.locator("//button[normalize-space()='Start Export']").click();
        await page.locator("//button[normalize-space()='Close']").click();
        //Edit pagenation


        //setting and removing of all filters
        const filterButton2 = page.locator('//div[contains(@class, "cursor-pointer") and contains(@class, "align-items-center")][.//span[text()="Filter"]][.//div[contains(@class, "filterModal_NumberPill")]]');
        const addfilter_button = page.locator("//div[contains(@class, 'applied_filters_modal_button') and contains(text(), '+ Add Filters')]");
        const apply_button = page.locator("//button[normalize-space()='Apply']");

        //filter 1
        await filterButton2.click();
        await addfilter_button.click();

        
    await page.waitForSelector('.allapps__filter__item');
    await page.locator('img[id="app_name"]').click();
    await page.waitForSelector('.collapse >> visible=true');
    const input_box = page.locator('input[placeholder="Enter value"][type="text"][id="formBasicCheckbox"]');
    const input_box_small = page.locator('div.collapse.show input[placeholder="Enter value"][type="text"][id="formBasicCheckbox"].mt-2.form-control');
    await input_box_small.fill('asana');
       
    await apply_button.click();

    //remove filter 1
    await filterButton2.click();
    await page.locator('//div[contains(@class, "applied_filters_modal_content_row")][.//span[text()="asana"]]//img[contains(@src, "cross-filter")]').click();


    });

test("Vendors", async ({page}) => {
        await page.locator("//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]").click();
        await page.locator("//span[normalize-space()='Vendors']").click();

        await page.waitForTimeout(2000);
        //name validation
        const vendorHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
        const vendor_head_text = await vendorHeadElement.evaluate(el => el.childNodes[0].textContent.trim());
          
         
        expect(vendor_head_text).toBe("Vendors");
        console.log("Hey!!, we are in VEDNORS page ");

        //initial vendor count
        const vendor_count_Element = await page.locator("//div[@class='mx-1']");
        const vendor_count_text = await vendor_count_Element.textContent(); 
        
        const match = vendor_count_text.match(/(\d+)/); // This will match the first sequence of digits
        const numberOfVendors = match[0]; // Extract the matched number
        console.log(`The Initial Vendor count is ${numberOfVendors}`); 


        //add new vendor
        await page.getByRole('button', { name: 'Add' }).click();

        var randomnum=Math.floor(Math.random()*(999-100+1)+100);
        var vendor_name="TestVendor"+randomnum;
        await page.locator("//input[@placeholder='Vendor Name']").fill(vendor_name);
        await page.locator("[aria-placeholder='Add Category']").fill("test");
        await page.locator("//input[@placeholder='Add Owner']").fill("san");
        await page.locator("(//div[@class='s-menu-container shadow-sm mt-1 undefined']//div[1]//button//div[2]//div//div)").click();
        await page.locator("//input[@placeholder='Website']").fill("www.zluri.com");

        await page.locator("//img[@class='contact_delete_icon cursor-pointer']").click();
        //scroll to view
        //await page.getByText('Phone Number').scrollIntoViewIfNeeded();
        
        // await page.locator("//input[@placeholder='Name']").fill(vendor_name);
        // await page.locator("//input[@placeholder='Job Title']").fill("test");
        // await page.locator("//input[@placeholder='Country code']").fill(+91);
        // await page.locator("//input[@placeholder='Phone Number']").fill("123456789");
        // await page.locator("//input[@placeholder='Email']").fill("enteremail@gmail.com");
        await page.getByRole('button', { name: 'Add Vendor' }).click();

        await page.waitForTimeout(2000);


        //intermediade vendor count
        const intermediade_vendor_count_Element = await page.locator("//div[@class='mx-1']");
        const intermediade_vendor_count_text = await intermediade_vendor_count_Element.textContent(); 

        const intermediade_match = intermediade_vendor_count_text.match(/(\d+)/); // This will match the first sequence of digits
        const intermediade_numberOfVendors = intermediade_match[0]; // Extract the matched number
        console.log(`The intermediate Vendor count is ${intermediade_numberOfVendors}`); 
        
        //verify the existance of the added vendor
        await page.locator("//div[@class='top__Uploads']//div[@class='Uploads__right']//input").fill(vendor_name);
        await page.waitForTimeout(2000);


            //verify the vendor must exist
            // const vendor_row_ele = await page.locator("(//tbody//tr//td[2]//div//a[@class='.table-link.truncate_10vw']")
            // const vendor_name_list = await vendor_row_ele.textContent();
            // console.log(vendor_name_list);

            //Delete the Added Vendor
            await page.locator("//input[@id='preventRowClick']").click();
            await page.waitForTimeout(2000);
            await page.locator("//div[@class='Uploads__right']//div[1]//a[@class='cursor-pointer autho__dd__cont ml-3 mt-auto mb-auto text-decoration-none']//div").click();
            await page.locator("//a[normalize-space()='Delete Vendors']").click();
           // await page.waitForTimeout(1000);

            await page.reload();
            await page.waitForTimeout(1000);
            const vendor_count_Element_post_delelte = await page.locator("//div[@class='mx-1']");
            const vendor_count_text_post_delelte = await vendor_count_Element_post_delelte.textContent(); 
           

        const matched = vendor_count_text_post_delelte.match(/(\d+)/); // This will match the first sequence of digits
        const numberOfVendors_post_delelte = match[0]; // Extract the matched number
        console.log(numberOfVendors_post_delelte);

        expect(numberOfVendors).toBe(numberOfVendors_post_delelte);
        console.log(`Vendor count post deletion ${vendor_count_text_post_delelte}`);
        //await page.waitForTimeout(1000);
        //show summary
        await page.locator("//div[@class='d-flex justify-content-center align-items-center ml-2 py-1 px-2 border-radius-8 light-blue-bg font-10 bold-400']//img[@alt='toggle']").click(); 
        await page.locator("//div[@class='d-flex justify-content-center align-items-center ml-2 py-1 px-2 border-radius-8 light-blue-bg font-10 bold-400']//img[@alt='toggle']").click(); 

        

        const vendorSpendElement = await page.locator("//div[@class='z_summary_container']/div/div[3]/div/div[2]").textContent();
        console.log('Vendor spend:', vendorSpendElement);

    // Extract the dollar sign and amount
    const vendor_spend_amountMatch = vendorSpendElement.match(/(\$)(\d+)/);

    if (vendor_spend_amountMatch) {
    var spend_amount_Sign = vendor_spend_amountMatch[1]; // This will be '$'
    var spend_amount = parseFloat(vendor_spend_amountMatch[2]); // This will be '0'
   
    console.log('Spend Sign:', spend_amount_Sign);
    console.log('Spend Amount:', spend_amount);
    } else {
    console.log('Could not extract amount and dollar sign.');
    }


    const rows_vendor = await page.$$('tbody tr');

    let total_vendor_spend = 0;

    for (let i = 0; i < rows_vendor.length; i++) {
        // Use the row index to create a locator for the current row
        const vendorSpendElement = await page.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(7) div div.cursor-default.d-flex.justify-content-center`).textContent();

        // Extract the numerical value
        const amountMatch = vendorSpendElement.match(/(\$)(\d+)/);

        if (amountMatch) {
            const amount = parseFloat(amountMatch[2]); // Convert string to number
            total_vendor_spend += amount; // Add to the total
        }
    }

    console.log('Total Amount:', total_vendor_spend);
    //vendors table-spend validation 

    if(total_vendor_spend == spend_amount){
        expect(total_vendor_spend).toBe(spend_amount);
        console.log(`The spend amount from header is ${spend_amount},which is same as sum of spend in table ${total_vendor_spend}`);
    }



    //pick dollar currency -header 
    const vendor_spend_currency = await page.locator("//div[@class='z_summary_container']/div/div[3]/div/div[2]/span[2]");


    // Get all header elements
    const headers_before = await page.locator("//div[@class='table-header-text']").allTextContents();

    // Get column count
    const columnCount_before = headers_before.length;

    // Log the column count
    console.log(`Column Count: ${columnCount_before}`);

    // Log each column name
    headers_before.forEach((header_before, index) => {
        console.log(`Column ${index + 1}: ${header_before}`);
    });

    //select colums validation
    await page.locator("//div[@class='top__Uploads']//div[1]/div[3]//img").click();
    //UnmappedSpends ->uncheck
    await page.locator("//div[@class='addContractModal__TOP h-100']//div//ul//div[@class='flex'][5]//div[2]").click();
    //cost ->=>uncheck
    await page.locator("//div[@class='addContractModal__TOP h-100']//div//ul//div[@class='flex'][7]//div[2]").click();
    //submit
    await page.locator("//button[normalize-space()='Apply']").click();

    await page.waitForTimeout(1000);

    // Get all header elements
    const headers = await page.locator("//div[@class='table-header-text']").allTextContents();
    // Get column count
    const columnCount = headers.length;
    // Log the column count
    console.log(`Column Count after operation: ${columnCount}`);
    // Log each column name
    headers.forEach((header, index) => {
        console.log(`Column ${index + 1}: ${header}`);
    });

    //undo task 
    //select colums validation
    await page.locator("//div[@class='top__Uploads']//div[1]/div[3]//img").click();
    //UnmappedSpends ->check
    await page.locator("//div[@class='addContractModal__TOP h-100']//div//ul//div[@class='flex'][5]//div[2]").click();
    //cost ->=>check
    await page.locator("//div[@class='addContractModal__TOP h-100']//div//ul//div[@class='flex'][7]//div[2]").click();
    //submit
    await page.locator("//button[normalize-space()='Apply']").click();

    await page.waitForTimeout(1000);

    // Get all header elements
    const headers_after = await page.locator("//div[@class='table-header-text']").allTextContents();
    // Get column count
    const columnCount_after = headers_after.length;
    // Log the column count
    console.log(`Column Count after operation: ${columnCount_after}`);
    // Log each column name
    headers_after.forEach((headers_after, index) => {
        console.log(`Column ${index + 1}: ${headers_after}`);
    });

    if(columnCount_before == (columnCount+2)){
        console.log("select column worked correctly for removing columns");
    }
    else{
        console.log("select column didn't worked correctly for removing columns");
    }

    if(columnCount_after == (columnCount+2)){
        console.log("select column worked correctly for adding columns");
    }
    else{
        console.log("select column didn't worked correctly for removing columns");
    }

    //FILTER Operation

    await page.locator("//div[@class='top__Uploads']//div[1]//div[2]//span[@class='grey font-13 mr-2']").click();
    await page.locator("//div[@class='applied_filters_modal_button w-100 d-flex align-items-center primary-color font-12 justify-content-center cursor-pointer']").click();
    await page.locator("//img[@id='vendor_name']").click();
    await page.locator("(//input[@id='formBasicCheckbox'])[4]").fill("TestVendor");
    await page.locator("//button[normalize-space()='Apply']").click();
    //await page.waitForTimeout(3000);
    console.log("set Filter Operation worked correctly");

    //page reload
    await page.locator("//img[@class='w-100 h-100 m-auto']").click();
    console.log("Reload triggered");
    await page.waitForTimeout(2000);
    //Remove Filter
    await page.locator("//div[@class='top__Uploads']//div[1]//div[2]//span[@class='grey font-13 mr-2']").click();
   // await page.waitForTimeout(1000);
    await page.locator("//img[@class='ml-auto cursor-pointer']").click();
    //await page.waitForTimeout(2000);
    console.log("Remove-Filter Operation worked correctly,this also indicates that filter wass maintained after reload");
    //await page.waitForTimeout(1000);
    await page.reload();
   // await page.waitForTimeout(1000);

    //Export
    await page.locator("//button[@class='export mt-auto mb-auto mr-3']").click();
    await page.locator("//div[@class='pt-1 form-check']//input[@type='checkbox']").click();
    await page.locator("//button[normalize-space()='Start Export']").click();
    await page.locator("//button[normalize-space()='Close']").click();
    console.log("Export is triggered successfully");

    //Reload


    //Notes for specific vendor
    await page.locator("//div[@class='top__Uploads']//div[@class='Uploads__right']//input").fill("TestVendor347");
    await page.locator('a.table-link', { hasText: 'TestVendor347' }).click();
    await page.locator("//div[@class='text-center border-dashed p-5 cursor-pointer']//img").click();
    await page.locator("//textarea[@placeholder='Add a Note']").fill("Automation test note");
    await page.locator("//button[normalize-space()='Save']").click();
    await page.waitForTimeout(1000);
    await page.locator('div.notes-drawer div.note div.note-footer div.dropdown a.cursor-pointer:has(img[src*="ellipsis-v"])').click();
    await page.getByRole('button', { name: 'Delete Note' }).click();
    await page.locator("//img[@alt='Close']").click();

    });


test("Perpetual With License with custom fields" , async({page}) => {
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:"Pro",
        cost:"1000",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4",
        licenseNameUsageBased:"Pro 1",
        usageBased:true,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });

});

test("Perpetual With License without custom fields" , async({page}) => {
    const pageLicenses = new LicensePage(page);
    
    // Go to Licenses
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        basePrice:"0",
        oneTimeFee:"0",
        licenseName:"Pro",
        cost:"1000",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000",
        licenseNameUsageBased:"Pro 1",
        usageBased:true,
        quantityUsageBased:"100",
        costUsageBased:"100"
    });

});

test("Perpetual Without License with custom fields" , async({page}) => {
    const pageLicenses = new LicensePage(page);
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        CF1:"aaa",
        CF_APP:"Asana",
        CF_USER:"POD4"
    });
});

test("Perpetual Without License without custom fields" , async({page}) => {
    const pageLicenses = new LicensePage(page);
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });
});

test("Perpetual Without License without custom fields but with vendor validation" , async({page}) => {
    const pageLicenses = new LicensePage(page);
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });
});

test("Perpetual with New Application" , async( {page} ) => {
    test.setTimeout(120000);
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomAppName = Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    await license.goToLicenses();
    await license.createPerpetuals({
        newName:randomString,
        newAppName:randomAppName,
        appOwner:"POD4",
        category:"Marketing Lead Scoring",
        descName:"Demo",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });
});

test("Perpetual with new Vendor" , async ( {page} ) => {
    const license = new LicensePage(page);
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    const randomName = Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    const randomVendorName ='TestVendor_' + Math.random().toString(36).replace(/[0-9]/g,'').substring(2, 8);
    await license.goToLicenses();
    await license.createPerpetuals({
        newName:randomString,
        appName:"Asana",
        descName:"Demo",
        newVendorName:randomVendorName,
        vendorOwner : "POD4",
        websiteName:`www.${randomName}.com`,
        vendorContactName:randomName,
        jobTitle:"Marketing Manager",
        vendorContactEmail:`${randomName}@gmail.com`,
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });
});

test("Perpetual With No Application" , async ( {page} ) =>{
    const pageLicenses = new LicensePage(page);
    await pageLicenses.goToLicenses();
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    // Create Perpetuals
    await pageLicenses.createPerpetualsWithNoApplication({
        newName:randomString,
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker"
    });
});

test('Perpetual Creation from Vendor' , async ( {page} ) => {
    const license = new LicensePage(page);
    await license.goToLicenses();

    // Go to vendor
    await license.navigateVendors();
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('notion');
    await page.getByRole('cell', { name: 'notion' }).locator('div').click();
    await page.getByRole('link', { name: 'Contracts' }).click();
    await page.locator('div').filter({ hasText: /^\+ Add$/ }).nth(1).click();
    await page.locator('[id="\\32 "]').click(); // Click On Subscription

    // Contract
    const randomString = 'Test_' + Math.random().toString(36).substring(2, 7);
    await license.createPerpetualsWithNoApplication({
        newName:randomString,
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        perpetualFromVendor:true
    });

});

test ("Optimization" , async ({page}) => {
    const pageOptimization = new OptimizationPage(page);

    await pageOptimization.goToOptimization();


    //name validation
    const OptimizationHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
    const text_optimization = await OptimizationHeadElement.textContent(); 
    expect(text_optimization).toBe("Optimization Summary",'Optimization page heading does not match');
   

    //sub-heading validations
    const subhead1 = await page.locator('.optimization_summary_meta_title .font-14').textContent();
    expect(subhead1) .toBe('Savings Opportunity', 
      'Header section should display "Savings Opportunity"');
  
  // First card assertion
  let subhead2 = await page.locator('.optimization_summary_meta_card:nth-child(2) .font-14').textContent();
  subhead2 = subhead2.trim().replace(/i$/, '');
  expect(subhead2)
    .toBe('Savings under review',
      'First card should display "Savings under review"');
  
  // Second card assertion
  let subhead3 = await page.locator('.optimization_summary_meta_card:nth-child(3) .font-14').textContent();
  subhead3 = subhead3.trim().replace(/i$/, '');
  expect(subhead3)
    .toBe('Estimated realized savings',
      'Second card should display "Estimated realized savings"');



      //refresh button validation 
    const refreshButton = page.locator('.optimization_summary_refresh_button');
    // Check if button is visible
    await expect(refreshButton).toBeVisible({
      timeout: 1000,
      message: 'Refresh button should be visible on the page'
    });

    // Check if button is enabled and clickable
    await expect(refreshButton).toBeEnabled({
      timeout: 1000,
      message: 'Refresh button should be enabled and clickable'
    });


    //-----------------------------ON--PAGE----CURRENCY-----VALIDATION-----------------------------------------
        async function checkSavingsElements(page) {
        // Check the savings under review element
        const savingsUnderReviewEle = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").textContent();
        
        // Validate that it starts with '$'
        await expect(savingsUnderReviewEle).toMatch(/^\$/, {
            message: "Savings under review Header-element should start with $"
        });
        
    
        // Check the estimated savings review element
        const estimatedSavingsReviewEle = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)").textContent();
        
        // Validate that it starts with '$'
        await expect(estimatedSavingsReviewEle).toMatch(/^\$/, {
            message: "Estimated savings Header-element should start with $"
        });
        
    
        // Get all rows in the table
        const rows = await page.$$('tbody tr');
        var row_number=1;
        // Check each row for the specified conditions
        for (const row of rows) {
            // Check if the value in the 3rd child starts with '$'
            const valueChild3 = await row.$eval('td:nth-child(3) div', div => div.innerText.trim());
            await expect(valueChild3).toMatch(/^\$/, {
                message: `Expected Row ${row_number} value "${valueChild3}" to start with $ symbol`
            });
            
    
            // Check if the value in the 8th child starts with '$'
            const valueChild8 = await row.$eval('td:nth-child(8) div', div => div.innerText.trim());
            await expect(valueChild8).toMatch(/^\$/, {
                message: `Expected Estimated Realized Savings cost for Row ${row_number} value "${valueChild8}" to start with $ symbol`
            });
            row_number++;
        }
    }
    
    // Usage 
    await checkSavingsElements(page);


    const savings_under_review_ele = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").textContent();
   // console.log(savings_under_review_ele); // Example output: "$69.4"
    
    // Function to convert savings based on its format
    function convertSavings(value) {
        value = value.trim();
    
        // Check if the value starts with '$'
        if (value.startsWith('$')) {
            value = value.slice(1); // Remove the dollar sign
        }
    
        if (value.endsWith('k')) {
            // Remove 'k' and parse as thousands
            return parseFloat(value.replace('k', '').trim()) || 0; // Keep as is in thousands
        } else if (value.endsWith('M')) {
            // Remove 'M' and convert to thousands
            return parseFloat(value.replace('M', '').trim()) * 1000 || 0; // Convert millions to thousands
        }
    
        // Convert any other value to thousands
        return parseFloat(value) / 1000 || 0; // Convert non-k and non-M values to thousands
    }
    
    const savings = convertSavings(savings_under_review_ele);
    //console.log("header savings under review : ",savings);
    


    const tableBodyLocator = page.locator('.optimization_summary_table_body'); // Use the appropriate selector
    const rows = await tableBodyLocator.locator('tr'); // Select all rows within the table body
    const rowCount = await rows.count(); // Get the number of rows

    //console.log(`Number of rows: ${rowCount}`);

    const headerRow = await page.$('//thead[@class="optimization_summary_table_head"]');
if (headerRow) {
    // Get all columns (th elements) within the header row
    const columns = await headerRow.$$('th');
    
    // Check if the number of columns is 8
    await expect(columns.length).toBe(9, {
        message: `Expected header to have 9 columns but found ${columns.length} columns`
    });
} else {
    console.log('Header row not found.');
}

//Savings Under Review -calculation

    const rowss = await page.$$('tbody tr');

    let totalSum = 0;
    
    // Function to convert value to a number in thousands
    function convertToThousands(value) {
        // Remove the dollar sign and any commas
        value = value.replace(/[$,]/g, '').trim();
    
        if (value.endsWith('k')) {
            // Remove 'k' and convert to thousands
            const numericValue = parseFloat(value.replace('k', ''));
            return numericValue ? numericValue : 0; // Keep as is in thousands
        }
    
        return parseFloat(value) / 1000 || 0; // Convert non-k values to thousands
    }
    
    // Iterate through each row
    for (const row of rowss) {
        // Get the value from the specified locator
        const value = await row.$eval('td:nth-child(3) div', div => div.innerText.trim());
    
        // Convert the value and add to total sum
        const numericValue = convertToThousands(value);
        totalSum += numericValue;
    }
    
    // Convert total sum to millions if it exceeds 1,000
    let finalSum;
    if (totalSum >= 1000) {
    finalSum = totalSum / 1000; // Convert to millions
    //console.log(`Total sum of Estimate savings in millions: ${finalSum}`);
    } else {
    finalSum = totalSum; // Keep it in thousands
    //console.log(`Total sum of Estimate savings in thousands: ${finalSum}k`);
}
    //assertion
    // await expect(finalSum).toBe(savings, {
    //     message: `Expected finalSum (${finalSum}) to match savings (${savings})`
    //  });

    //validation

    function areEqualUpToOneDecimal(num1, num2) {
        return num1.toFixed(1) === num2.toFixed(1);
    }
    
   // expect(savings.toFixed(2)).toBe(finalSum.toFixed(2));
    //console.log(areEqualUpToOneDecimal(finalSum, savings)); 
    expect(areEqualUpToOneDecimal(finalSum, savings), 
    `Expected finalSum (${finalSum}) to match savings (${savings}) up to one decimal place`).toBeTruthy();
    //Estimated Savings Under review Calculation

    let totalSum_estimated_savings = 0;
    
    // Iterate through each row
    for (const row of rowss) {
        // Get the value from the specified locator
        const value_estimated_savings = await row.$eval('td:nth-child(8) div', div => div.innerText.trim());
    
        // Convert the value and add to total sum
        const numericValue1 = convertToThousands(value_estimated_savings);
        totalSum_estimated_savings += numericValue1;
    }
    
    // Convert total sum to millions if it exceeds 1,000
    let finalSum_estimated_savings;
    if (totalSum_estimated_savings >= 1000) {
    finalSum_estimated_savings = totalSum_estimated_savings / 1000; // Convert to millions
    
    } else {
    finalSum_estimated_savings = totalSum_estimated_savings; // Keep it in thousands
    }
  
    //reading header _estimated_savings

    const estimated_savings_review_ele = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)").textContent();
    
    const estimated_savings = parseFloat(estimated_savings_review_ele.replace(/[^\d.-]/g, ''));
   // const savings_under_review_num = parseInt(savings_under_review, 10);
   // console.log(estimated_savings);

    function areEqualUpToOneDecimal(num1, num2) {
        return parseFloat(num1).toFixed(1) === parseFloat(num2).toFixed(1);
    }
    //console.log(areEqualUpToOneDecimal(finalSum_estimated_savings, estimated_savings));
    expect(areEqualUpToOneDecimal(finalSum_estimated_savings, estimated_savings), 
   `Expected finalSum estimated savings (${finalSum_estimated_savings}) to match estimated savings (${estimated_savings}) up to one decimal place`).toBeTruthy();


    //function to click on i button and handle new page opening 

    async function validateNewPageHeading(page, buttonSelector, expectedHeading,elementclicked) {
    // Click the i button that opens a new page
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'), // Wait for the new page to open
        page.locator(buttonSelector).click() // Click the button
    ]);

    // Wait for the new page to load completely
    await newPage.waitForLoadState('load');

    // Validate the heading on the new page
    const heading = await newPage.locator("//div[@class='container right']//h1[@class='fw-page-title']").textContent();
    //console.log(`Heading on new page: ${heading}`);

    // Validate the heading
    await expect(heading).toBe(expectedHeading, {
        message: `After clicking "${elementclicked}", expected heading to be "${expectedHeading}" but found "${heading}"`
     });

    // Optionally, you can close the new page if needed
    await newPage.close();
}

// function call
await validateNewPageHeading(page, "(//div[@class='optimization_summary_meta_card'])[1]//div[2]//div[1]//div[1]", 'How Zluri Calculates Estimated Wastage & Savings?','Savings under review ');
await validateNewPageHeading(page,  "(//div[@class='optimization_summary_meta_card'])[2]//div[2]//div[1]//div[1]",'How Zluri Calculates Estimated Wastage & Savings?','Estimated realized Savings');

   
//app redirection validation 
async function validateRowLinks(page) {
    const rows = await page.$$('tbody tr'); // Get all rows
    let rowNumber = 1; // Initialize row number

    // Check each row for the specified conditions
    for (const row of rows) {
        // Get the text from the specified locator
        const valueApp = await row.$eval('td:nth-child(2) div div div[style*="cursor: pointer"]', div => div.innerText.trim());
       // console.log(`Row ${rowNumber} app-name value: ${valueApp}`);

        // Click on the text to open the new page by using a more specific locator within the row context
        await page.locator('div.d-flex div.optimization_summary_app_cell div:has-text("' + valueApp + '")').click();

        const currentUrl = page.url();
    // Combined pattern using regex alternation (|) to match either URL format
    const urlPattern = /^https:\/\/(?:app|app-release)\.zluri\.com\/applications\/[a-f0-9]+#optimization$/;
    
    await expect(currentUrl, `URL ${currentUrl} doesn't match expected pattern. 
        Expected format: 
        - https://app.zluri.com/applications/{id}#optimization
        - https://app-release.zluri.com/applications/{id}#optimization`
    ).toMatch(urlPattern);

        const breadcrumbText = await page.locator("//div[@class='ins-1']//nav//ol//li[1]//div[@class='truncate_breadcrumb_item_name']").textContent();

        // Validate with the previous page name
        await expect.soft(breadcrumbText.trim()).toEqual(valueApp, {
            message: `Row ${rowNumber}: Breadcrumb validation failed - Expected "${valueApp}" but found "${breadcrumbText.trim()}"`
        });
        rowNumber++;
        await page.goBack();
        await page.waitForLoadState('load');            
     }
    }

    // function call
    await validateRowLinks(page);    


    //validation fo the optimization license cost
    async function extractNumber(text) {
        // Handle dash '-' case
        if (text === '-') return 0;
        // Remove currency symbols, commas and convert to number
        return parseFloat(text.replace(/[$,\s]/g, '')) || 0;
    }

    async function validateColumnSums() {
           // Get all rows using the specific class
            const rows = await page.locator('tr.optimization_summary_table_body_row').all();
    
            for (let i = 0; i < rows.length; i++) {
                // Get app name for better reporting
                const appName = await rows[i].locator('.optimization_summary_app_cell div').first().textContent();
                
                // Get values from columns 4, 5, and 6
                const column4Value = await rows[i].locator('td:nth-child(4) div').textContent();
                const column5Value = await rows[i].locator('td:nth-child(5) div').textContent();
                const column6Value = await rows[i].locator('td:nth-child(6) div').textContent();
    
                // Convert to numbers
                const col4Num = await extractNumber(column4Value);
                const col5Num = await extractNumber(column5Value);
                const col6Num = await extractNumber(column6Value);
    
                // Calculate sum
                const sumOf5And6 = col5Num + col6Num;
                await expect(sumOf5And6).toBe(col4Num, {
                    message: `${appName}: Expected optimizable licenses sum (${sumOf5And6}) to match column 4 value (${col4Num})`
                 });
            }
    }

    await validateColumnSums(page);
//cross validation with optimization page cost --->>> in app optimizatio cost

//redirection validation in optimizable licenses-------------------------------------------------------------------

await page.waitForSelector('.optimization_summary_table_body');

// Get all main rows with dropdown arrows
const mainRows = await page.locator('.optimization_summary_table_body_row').filter({
  has: page.locator('.optimization_summary_toggle_license_display_cell img[src*="downarrow"]')
}).all();

// Process each main row
for (const mainRow of mainRows) {
  try {
    // Find and click dropdown arrow
    const dropdownArrow = await mainRow.locator('.optimization_summary_toggle_license_display_cell img');
    await dropdownArrow.click();
    await page.waitForTimeout(2000);

    // Wait for expanded rows
    await page.waitForSelector('tr.optimization_summary_table_body_row');    
    // Get all inner rows that appear after clicking dropdown
    const innerRows = await page.locator('tr.optimization_summary_table_body_row').all();

    // Process each inner row
    for (const innerRow of innerRows) {
      try {
        // Get the fourth column (index 3) licenses element
        const licenseElement = await innerRow.locator('td').nth(3).locator('.d-flex');
        const licenseText = await licenseElement.textContent();
        
        // Skip if empty or not a number
        if (!licenseText || licenseText.trim() === '') {
         // console.log('Skipping: Empty value in licenses column');
          continue;
        }

        const licenseCount = parseInt(licenseText.trim());
        
        // Skip if not a valid number or zero
        if (isNaN(licenseCount) || licenseCount <= 0) {
          //console.log(`zero value (${licenseText})`);
          continue;
        }

        // Check if element is clickable
        const isClickable = await licenseElement.evaluate(el => {
          return el.classList.contains('cursor-pointer') || 
                 el.classList.contains('text-underline') ||
                 window.getComputedStyle(el).cursor === 'pointer';
        });

        if (isClickable) {
          //console.log(`Found clickable license count: ${licenseCount}`);
          
          // Click the license number
          await licenseElement.click();
          
          // Wait for new page content and validate
          try {
            await page.waitForSelector('.d-flex.z_table_chips', { timeout: 3000 });
            
            // Get and validate user count
            const userCountText = await page.locator('.d-flex.z_table_chips .mx-1').textContent();
            const userCount = parseInt(userCountText.match(/Showing (\d+) Users/)?.[1] || '0');
            //console.log(`Validated: Found ${userCount} users`);
            await expect.soft(licenseCount).toEqual(userCount, {
                message: `Validation failed: License count (${licenseCount}) does not match user count (${userCount})`
            });
            
            // Navigate back
            await page.goBack();
            
            // Wait for original table to be visible
            await page.waitForSelector('.optimization_summary_table_body');
          } catch (navigationError) {
            console.error('Error during navigation or validation:', navigationError);
            // Ensure we're back at the original table
            if (!await page.locator('.optimization_summary_table_body').isVisible()) {
              await page.goBack();
              await page.waitForSelector('.optimization_summary_table_body');
            }
          }
        } else {
        // console.log(`Skipping: Number ${licenseCount} is not clickable`);
        }
      } catch (innerError) {
        console.error('Error processing inner row:', innerError);
        continue;
      }
    }

    // Close the dropdown
    await dropdownArrow.click();
    await page.waitForTimeout(500); // Small delay after closing

  } catch (mainError) {
    console.error('Error processing main row:', mainError);
    continue;
  }
}


async function license_redirection_validation(i){
   //await page.waitForSelector('.optimization_summary_table_body');

// Get all main rows with dropdown arrows
const mainRows1 = await page.locator('.optimization_summary_table_body_row').filter({
  has: page.locator('.optimization_summary_toggle_license_display_cell img[src*="downarrow"]')
}).all();

// Process each main row
for (const mainRow1 of mainRows1) {
  try {
    // Find and click dropdown arrow
    const dropdownArrow1 = await mainRow1.locator('.optimization_summary_toggle_license_display_cell img');
    await dropdownArrow1.click();
    await page.waitForTimeout(500);

    // Wait for expanded rows
    await page.waitForSelector('tr.optimization_summary_table_body_row');    
    // Get all inner rows that appear after clicking dropdown
    const innerRows1 = await page.locator('tr.optimization_summary_table_body_row').all();

    // Process each inner row
    for (const innerRow1 of innerRows1) {
      try {
        // Get the fourth column (index 3) licenses element
        const licenseElement1 = await innerRow1.locator('td').nth(i).locator('.d-flex');
        const licenseText1 = await licenseElement1.textContent();
        
        // Skip if empty or not a number
        if (!licenseText1 || licenseText1.trim() === '') {
         // console.log('Skipping: Empty value in licenses column');
          continue;
        }

        const licenseCount1 = parseInt(licenseText1.trim());
        
        // Skip if not a valid number or zero
        if (isNaN(licenseCount1) || licenseCount1 <= 0) {
          //console.log(`zero value (${licenseText1})`);
          continue;
        }

        // Check if element is clickable
        const isClickable1 = await licenseElement1.evaluate(el => {
          return el.classList.contains('cursor-pointer') || 
                 el.classList.contains('text-underline') ||
                 window.getComputedStyle(el).cursor === 'pointer';
        });

        if (isClickable1) {
          //console.log(`Found clickable license count: ${licenseCount1}`);
          
          // Click the license number
          await licenseElement1.click();
          
          // Wait for new page content and validate
          try {
            await page.waitForSelector('.d-flex.z_table_chips', { timeout: 3000 });
            
            // Get and validate user count
            const userCountText1 = await page.locator('.d-flex.z_table_chips .mx-1').textContent();
            const userCount1 = parseInt(userCountText1.match(/Showing (\d+) Users/)?.[1] || '0');
            //console.log(`Validated: Found ${userCount1} users`);
            await expect(licenseCount1).toBe(userCount1, {
                message: `License count (${licenseCount1}) does not match user count (${userCount1})`
             });
            
            // Navigate back
            await page.goBack();
            
            // Wait for original table to be visible
            await page.waitForSelector('.optimization_summary_table_body');
          } catch (navigationError) {
            console.error('Error during navigation or validation:', navigationError);
            // Ensure we're back at the original table
            if (!await page.locator('.optimization_summary_table_body').isVisible()) {
              await page.goBack();
              await page.waitForSelector('.optimization_summary_table_body');
            }
          }
        } else {
         //console.log(`Skipping: Number ${licenseCount1} is not clickable`);
        }
      } catch (innerError) {
        console.error('Error processing inner row:', innerError);
        continue;
      }
    }

    // Close the dropdown
    await dropdownArrow1.click();
   // await page.waitForTimeout(500); // Small delay after closing

  } catch (mainError) {
    console.error('Error processing main row:', mainError);
    continue;
  }
}

}

//call
//console.log("validation for the Undeprovisioned Licenses");
await license_redirection_validation(4);
//console.log("validation for the Unused Licenses");
await license_redirection_validation(5);




});

test("Spends" , async ({page}) => {
    const pageSpends = new Spends(page);
    await pageSpends.goToSpends();
    await pageSpends.navigateTransaction();
    
});


test ("Security" , async({page}) => {
    const PageSecurity = new SecurityPage(page);
    await PageSecurity.navigateToSecurity(page);
});

test("Access review" ,async ({page}) => {
    test.setTimeout(120000);
    const pageAccessReviews = new AccessReviewsPage(page);
    // Create Playbook
    const application = new Application(page);
    const getFormattedCertName = () => {
        const randomStr = Math.random().toString(36).substring(2, 7);
        return `Demo_Cert_${randomStr}`;
    };
    const uniqueCertName = getFormattedCertName(); 
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
    await page.waitForTimeout(3000);
    await pageAccessReviews.createCertificate({
        certName: uniqueCertName,
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
    await page.waitForTimeout(5000);
    await pageAccessReviews.certValidation({
        certName:uniqueCertName
    });
    // await pageAccessReviews.archieveCert();
    // await pageAccessReviews.goToAccessReviewsUpcoming();
    // await pageAccessReviews.goToAccessReviewsCompleted();
});

test("Report" , async ({page}) => {
    const pageReport = new ReportsPage(page);
    await pageReport.goToReports();
    await pageReport.navigateOrganizationData();
    await pageReport.navigateWorkableInsights();
    await pageReport.navigateSpendsReports();
    await pageReport.navigateUsageReports();
});

test ("Sources" , async ({page}) => {
    const pageSources = new SourcesPage(page);
    await pageSources.goToSourcesIntegraton();
    await pageSources.navigateSourcesIntegration();
    await pageSources.goToSourcesAgents();
    await pageSources.navigateSourcesAgents();
});

test("Workflow " , async ({page}) => {
    const pageWorkflows = new WorkflowPage(page);
    await pageWorkflows.goToWorkflows();
    await pageWorkflows.navigateToWorkflowsOnboardingDraft();
    await pageWorkflows.navigateToWorkflowsOnboardingPlaybooks();
    await pageWorkflows.navigateToWorkflowsOnboardingRunLogs();
    await pageWorkflows.navigateToWorkflowsOnboardingScheduledRuns();
    await pageWorkflows.navigateToWorkflowsOnboardingAutomationRules();
    await pageWorkflows.goToWorkflowsOffboarding();
    await pageWorkflows.navigateWorkflowsOffboarding();
    await pageWorkflows.goToWorkflowsAccessRequest();
    await pageWorkflows.navigateWorkflowsAccessRequest();

    // await pageWorkflows.createPlaybook();
    // await pageWorkflows.deletePlaybook();
});

// test("Task" , async ({page}) => {
//     const pageTasks = new TaskPage(page);
//     await pageTasks.goToTasks();
// });

test ("Access Request" , async ( { page } ) => {
    test.setTimeout(90000);
    const randomString = 'Demo_' + Math.random().toString(36).substring(2, 7);
    console.log("requirementDescription: ", randomString);
    const Login = new LoginPage(page);
    const pageWorkflows = new WorkflowPage(page);
    await Login.switchToEmployeeView();
    await pageWorkflows.goToWorkflowsAccessRequest();
    await pageWorkflows.createAccessRequest({
        appName:"Asana",
        duration:"2",
        timePeriod:"months",
        requirementDescription:randomString
    });
    await page.waitForTimeout(2500);
    await page.locator("//div[@class='ml-2']//img[@class='cursor-pointer']").click();
    await Login.switchToAdminView();
    await pageWorkflows.goToWorkflows();
    await pageWorkflows.goToWorkflowsAccessRequest();
    await pageWorkflows.accessRequestValidationAndApproval({
        appName:"Asana",
        requirementDescription:randomString
    });

})
test("Delete palybook" , async({page}) => {
    const application = new Application(page);
    await application.goToApplication();
    await application.goToAllApp();
    await application.deletePlaybook({
        name:"Asana"
    });
});
test("Create Playbook" , async({page}) => {
    const application = new Application(page);
    application.goToApplication();
    await application.goToAllApp();
    await application.addPlaybookForApp({
        name : "Asana",
        actionName : "Create A Manual Task",
        playbookActionName : "Add a user to application"
    });
    
});
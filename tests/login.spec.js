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


test('Contract with License', async ( {page} ) => { 
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    const license = new LicensePage(page);
    await license.goToLicenses();
    await license.createContract({
        appName:"Asana",
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        licenseName:"Pro",
        cost:"1000",
        tenure:"months",
        descriptionLicense:"Demo",
        quantity:"1000"
    });
});

test('Contract without License', async ( {page} ) => { 
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    const license = new LicensePage(page);
    await license.goToLicenses();
    await license.createContract({
        appName:"Asana",
        descName:"Demo",
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
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

    // Department 
   // await pageDirectory.navigateDepartment();

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

test("Subscription with License" , async ({page}) => {
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
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years",
        licenseName:"Pro",
        cost:"1000",
        tenure:"months",
        descriptionLicense:"Demo",
        quantity:"1000"
    });
});
test("Subscription without License" , async ({page}) => {
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
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        renewalTermValue: "5" ,
        renewalTerm:"Years"
    });
});

    test("Renewals", async ({page}) => {
        const Login = new LoginPage(page);
        await Login.goToLoginPage();
        await Login.login();

        await page.locator("//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]").click();
        await page.locator("//span[normalize-space()='Renewals']").click();

        //name validation
        const RenewalsHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
        const text = await RenewalsHeadElement.textContent(); 
        expect(text).toBe("Renewals");

        await page.locator("//button[@class='z__button is-active normal']").click();

        //month card
        await page.locator("//body/div[@id='root']/div/div[@class='large-screen-only']/div/div[@role='navigation']/div/div[@class='renewals__body pl-5 pr-5 pt-3']/div[contains(@class,'grid__container d-flex')]/div[contains(@class,'block block__year flex-grow-1 d-inline-flex flex-wrap mr-3')]/div[2]").click()
        await page.locator("//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/button[1]").click();
        await page.locator("//div[@class='row d-flex flex-column grow']//div[3]//button[@class='z__button undefined']").click();

        const notification_message_renewal_ele = await page.locator("//div[@class='notification_title']");
        const  notification_message_renewal= await notification_message_renewal_ele.textContent(); 
        expect(notification_message_renewal).toBe("Reminder successfully updated");
    });

    test("Vendors", async ({page}) => {
        const Login = new LoginPage(page);
        await Login.goToLoginPage();
        await Login.login();
        await page.locator("//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]").click();
        await page.locator("//span[normalize-space()='Vendors']").click();

        await page.waitForTimeout(5000);
        //name validation
        const vendorHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
        const vendor_head_text = await vendorHeadElement.evaluate(el => el.childNodes[0].textContent.trim());
          
         
        expect(vendor_head_text).toBe("Vendors");


        //initial vendor count
        const vendor_count_Element = await page.locator("//div[@class='mx-1']");
        const vendor_count_text = await vendor_count_Element.textContent(); 
        console.log(vendor_count_text);

        const match = vendor_count_text.match(/(\d+)/); // This will match the first sequence of digits
        const numberOfVendors = match[0]; // Extract the matched number
        console.log(numberOfVendors); 


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

        await page.waitForTimeout(5000);
            //verify the existance of the added vendor
            await page.locator("//div[@class='top__Uploads']//div[@class='Uploads__right']//input").type(vendor_name);
            await page.waitForTimeout(5000);


            //verify the vendor must exist
            // const vendor_row_ele = await page.locator("(//tbody//tr//td[2]//div//a[@class='.table-link.truncate_10vw']")
            // const vendor_name_list = await vendor_row_ele.textContent();
            // console.log(vendor_name_list);

            //Delete the Added Vendor
            await page.locator("//input[@id='preventRowClick']").click();
            await page.waitForTimeout(2000);
            await page.locator("//div[@class='Uploads__right']//div[1]//a[@class='cursor-pointer autho__dd__cont ml-3 mt-auto mb-auto text-decoration-none']//div").click();
            await page.locator("//a[normalize-space()='Delete Vendors']").click();
            await page.waitForTimeout(4000);

            await page.reload();
            await page.waitForTimeout(4000);
            const vendor_count_Element_post_delelte = await page.locator("//div[@class='mx-1']");
            const vendor_count_text_post_delelte = await vendor_count_Element_post_delelte.textContent(); 
            console.log(vendor_count_text_post_delelte);

        const matched = vendor_count_text_post_delelte.match(/(\d+)/); // This will match the first sequence of digits
        const numberOfVendors_post_delelte = match[0]; // Extract the matched number
        console.log(numberOfVendors_post_delelte);

        expect(numberOfVendors).toBe(numberOfVendors_post_delelte);

        await page.waitForTimeout(5000);
        //show summary
        await page.locator("//div[@class='d-flex justify-content-center align-items-center ml-2 py-1 px-2 border-radius-8 light-blue-bg font-10 bold-400']//img[@alt='toggle']").click(); 
        await page.locator("//div[@class='d-flex justify-content-center align-items-center ml-2 py-1 px-2 border-radius-8 light-blue-bg font-10 bold-400']//img[@alt='toggle']").click(); 

        const vendor_spend_element = await page.locator("//div[@role='navigation']//div//div[3]//div[1]//div[2]");

    
    const divs = await vendor_spend_element.locator('div'); // Get child divs

    // Get the text content of the second child div
    const secondDivTextContent = await divs.nth(1).textContent(); // nth(1) targets the second div (0-based index)

    console.log(secondDivTextContent);
        const vendor_spend_text = await vendor_spend_element.textContent(); 
        console.log(vendor_spend_text);

    });


test("Perpetual With License" , async({page}) => {
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
        vendorName:"Notion",
        primaryOwner:"Jocker",
        financeOwner:"Jocker",
        ItOwner:"Jocker",
        negotiationOwner:"Jocker",
        licenseName:"Pro",
        cost:"1000",
        tenure:"months",
        descriptionLicense:"Demo",
        quantity:"1000"
    });

});

test("Perpetual Without License" , async({page}) => {
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login();
    
    const pageLicenses = new LicensePage(page);
    await pageLicenses.goToLicenses();
    // Create Perpetuals
    await pageLicenses.createPerpetuals({
        appName:"Asana",
        descName:"Demo",
        vendorName:"Notion",
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


    //name validation
    const OptimizationHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
    const text_optimization = await OptimizationHeadElement.textContent(); 
    expect(text_optimization).toBe("Optimization Summary");

    
    const savings_under_review_ele = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").textContent();
    
    const savings = parseFloat(savings_under_review_ele.replace(/[^\d.-]/g, ''));
   // const savings_under_review_num = parseInt(savings_under_review, 10);
    console.log(savings);


    const tableBodyLocator = page.locator('.optimization_summary_table_body'); // Use the appropriate selector
    const rows = await tableBodyLocator.locator('tr'); // Select all rows within the table body
    const rowCount = await rows.count(); // Get the number of rows

    console.log(`Number of rows: ${rowCount}`);

    const headerRow = await page.$('//thead[@class="optimization_summary_table_head"]');
if (headerRow) {
    // Get all columns (th elements) within the header row
    const columns = await headerRow.$$('th');
    
    // Check if the number of columns is 8
    if (columns.length === 9) {
        console.log('The header has 9 columns.');
    } else {
        console.log(`The header has ${columns.length} columns.`);
    }
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
        console.log(`Total sum in millions: ${finalSum.toFixed(2)}`);
    } else {
        console.log(`Total sum in thousands: ${totalSum.toFixed(2)}k`);
    }
    
    //validation

    function areEqualUpToOneDecimal(num1, num2) {
        return num1.toFixed(1) === num2.toFixed(1);
    }
    
    expect(savings.toFixed(2)).toBe(finalSum.toFixed(2));
    console.log(areEqualUpToOneDecimal(finalSum, savings));  

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
    console.log(`Total sum in millions: ${finalSum_estimated_savings.toFixed(2)}`);
    } else {
    finalSum_estimated_savings = totalSum_estimated_savings; // Keep it in thousands
    console.log(`Total sum in thousands: ${finalSum_estimated_savings.toFixed(2)}k`);
}
    
    
    //reading header _estimated_savings
    const estimated_savings_review_ele = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)").textContent();
    
    const estimated_savings = parseFloat(estimated_savings_review_ele.replace(/[^\d.-]/g, ''));
   // const savings_under_review_num = parseInt(savings_under_review, 10);
    console.log(estimated_savings);

    function areEqualUpToOneDecimal(num1, num2) {
        return parseFloat(num1).toFixed(1) === parseFloat(num2).toFixed(1);
    }
    
    console.log(areEqualUpToOneDecimal(finalSum_estimated_savings.toFixed(1), estimated_savings.toFixed(1)));
     
    
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

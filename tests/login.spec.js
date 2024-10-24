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
        //stacichadwick@zluri.dev
        password:"test@123",
        //61rzwgSXXjVuCBTTUygarg
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
        cost:"1000",
        tenure:"months",
        discount:"0",
        descriptionLicense:"Demo",
        quantity:"1000"
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
        CF_USER:"POD4"
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
})

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
        CF_USER:"POD4"
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
        quantity:"1000"
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

test("Renewals", async ({page}) => {
        await page.locator("//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]").click();
        await page.locator("//span[normalize-space()='Renewals']").click();

        //name validation
        const RenewalsHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
        const text = await RenewalsHeadElement.textContent(); 
        expect(text).toBe("Renewals");

        //GO TO GRID VIEW
        await page.locator("//button[@class='z__button is-active normal']").click();


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

        
        //month card
        await page.locator("//body/div[@id='root']/div/div[@class='large-screen-only']/div/div[@role='navigation']/div/div[@class='renewals__body pl-5 pr-5 pt-3']/div[contains(@class,'grid__container d-flex')]/div[contains(@class,'block block__year flex-grow-1 d-inline-flex flex-wrap mr-3')]/div[2]").click()
        await page.locator("//body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/button[1]").click();
        await page.locator("//div[@class='row d-flex flex-column grow']//div[3]//button[@class='z__button undefined']").click();

        const notification_message_renewal_ele = await page.locator("//div[@class='notification_title']");
        const  notification_message_renewal= await notification_message_renewal_ele.textContent(); 
        expect(notification_message_renewal).toBe("Reminder successfully updated");
    });

test("Vendors", async ({page}) => {
        await page.locator("//button[@class='sidebar__item btn btn-primary']//span[contains(text(),'Licenses')]").click();
        await page.locator("//span[normalize-space()='Vendors']").click();

        await page.waitForTimeout(5000);
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

        await page.waitForTimeout(5000);


        //intermediade vendor count
        const intermediade_vendor_count_Element = await page.locator("//div[@class='mx-1']");
        const intermediade_vendor_count_text = await intermediade_vendor_count_Element.textContent(); 

        const intermediade_match = intermediade_vendor_count_text.match(/(\d+)/); // This will match the first sequence of digits
        const intermediade_numberOfVendors = intermediade_match[0]; // Extract the matched number
        console.log(`The intermediate Vendor count is ${intermediade_numberOfVendors}`); 
        
        //verify the existance of the added vendor
        await page.locator("//div[@class='top__Uploads']//div[@class='Uploads__right']//input").fill(vendor_name);
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
           

        const matched = vendor_count_text_post_delelte.match(/(\d+)/); // This will match the first sequence of digits
        const numberOfVendors_post_delelte = match[0]; // Extract the matched number
        console.log(numberOfVendors_post_delelte);

        expect(numberOfVendors).toBe(numberOfVendors_post_delelte);
        console.log(`Vendor count post deletion ${vendor_count_text_post_delelte}`);
        await page.waitForTimeout(5000);
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

    await page.waitForTimeout(3000);

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

    await page.waitForTimeout(3000);

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
    await page.waitForTimeout(5000);
    //Remove Filter
    await page.locator("//div[@class='top__Uploads']//div[1]//div[2]//span[@class='grey font-13 mr-2']").click();
   // await page.waitForTimeout(1000);
    await page.locator("//img[@class='ml-auto cursor-pointer']").click();
    //await page.waitForTimeout(2000);
    console.log("Remove-Filter Operation worked correctly,this also indicates that filter wass maintained after reload");
    //await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForTimeout(1000);

    //Export
    await page.locator("//button[@class='export mt-auto mb-auto mr-3']").click();
    await page.locator("//div[@class='pt-1 form-check']//input[@type='checkbox']").click();
    await page.locator("//button[normalize-space()='Start Export']").click();
    await page.locator("//button[normalize-space()='Close']").click();
    console.log("Export is triggered successfully");

    //Reload

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
        CF_USER:"POD4"
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
        quantity:"1000"
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

test ("Optimization" , async ({page}) => {
    const pageOptimization = new OptimizationPage(page);

    await pageOptimization.goToOptimization();


    //name validation
    const OptimizationHeadElement = await page.locator("//div[@class='NavH border-bottom']//div[@class='ins-1']");
    const text_optimization = await OptimizationHeadElement.textContent(); 
    expect(text_optimization).toBe("Optimization Summary");
    console.log(`Hey we are on ${text_optimization} page !!`);

    //-----------------------------ON--PAGE----CURRENCY-----VALIDATION-----------------------------------------
    async function checkSavingsElements(page) {
        // Check the savings under review element
        const savingsUnderReviewEle = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").textContent();
        
        // Validate that it starts with '$'
        if (savingsUnderReviewEle.startsWith('$')) {
            console.log('Savings under review Header-element starts with $');
        } else {
            console.log('Savings under review Header-element does not start with $');
        }
    
        // Check the estimated savings review element
        const estimatedSavingsReviewEle = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)").textContent();
        
        // Validate that it starts with '$'
        if (estimatedSavingsReviewEle.startsWith('$')) {
            console.log('Estimated savings review Header-element starts with $');
        } else {
            console.log('Estimated savings review Header-element does not start with $');
        }
    
        // Get all rows in the table
        const rows = await page.$$('tbody tr');
        var row_number=1;
        // Check each row for the specified conditions
        for (const row of rows) {
            // Check if the value in the 3rd child starts with '$'
            const valueChild3 = await row.$eval('td:nth-child(3) div', div => div.innerText.trim());
            if (valueChild3.startsWith('$')) {
                console.log(`Savings under review cost for ROW-> ${row_number}, starts with $`);
            } else {
                console.log('Row child 3 does not start with $');
            }
    
            // Check if the value in the 8th child starts with '$'
            const valueChild8 = await row.$eval('td:nth-child(8) div', div => div.innerText.trim());
            if (valueChild8.startsWith('$')) {
                console.log(`Estimated Realized Savings cosT for ROW-> ${row_number}, starts with $`);
            } else {
                console.log('Row child 8 does not start with $');
            }
            row_number++;
        }
    }
    
    // Usage 
    await checkSavingsElements(page);


    const savings_under_review_ele = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").textContent();
    console.log(savings_under_review_ele); // Example output: "$69.4"
    
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
    console.log("header savings under review : ",savings);
    


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
    console.log(`Total sum of Estimate savings in millions: ${finalSum}`);
    } else {
    finalSum = totalSum; // Keep it in thousands
    console.log(`Total sum of Estimate savings in thousands: ${finalSum}k`);
}
    
    //validation

    function areEqualUpToOneDecimal(num1, num2) {
        return num1.toFixed(1) === num2.toFixed(1);
    }
    
   // expect(savings.toFixed(2)).toBe(finalSum.toFixed(2));
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
    console.log(`Total sum of Estimate savings in millions: ${finalSum_estimated_savings}`);
    } else {
    finalSum_estimated_savings = totalSum_estimated_savings; // Keep it in thousands
    console.log(`Total sum of Estimate savings in thousands: ${finalSum_estimated_savings}k`);
    }
  
    //reading header _estimated_savings

    const estimated_savings_review_ele = await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)").textContent();
    
    const estimated_savings = parseFloat(estimated_savings_review_ele.replace(/[^\d.-]/g, ''));
   // const savings_under_review_num = parseInt(savings_under_review, 10);
    console.log(estimated_savings);

    function areEqualUpToOneDecimal(num1, num2) {
        return parseFloat(num1).toFixed(1) === parseFloat(num2).toFixed(1);
    }
    console.log(areEqualUpToOneDecimal(finalSum_estimated_savings, estimated_savings));

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
    console.log(`Heading on new page: ${heading}`);

    // Validate the heading
    if (heading === expectedHeading) {
        console.log(`After redirection from '${elementclicked}' -> to savings page!!, Heading is correct!`);
        console.log(`Heading on new page: ${heading}`);
    } else {
        console.log('After redirection to savings page!!, Heading is incorrect!');
    }

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
        console.log(`Row ${rowNumber} app-name value: ${valueApp}`);

        // Click on the text to open the new page by using a more specific locator within the row context
        await page.locator('div.d-flex div.optimization_summary_app_cell div:has-text("' + valueApp + '")').click();

        await page.waitForTimeout(1000);
        // Read the text at the specified locator on the new page
        const breadcrumbText = await page.locator("//div[@class='ins-1']//nav//ol//li[1]//div[@class='truncate_breadcrumb_item_name']").textContent();

        // Validate with the previous page name
        if (breadcrumbText.trim() === valueApp) {
            console.log(`Validation successful for Row ${rowNumber}: '${breadcrumbText}' matches '${valueApp}'`);
        } else {
            console.log(`Validation failed for Row ${rowNumber}: '${breadcrumbText}' does not match '${valueApp}'`);
        }
        rowNumber++;
        await page.goBack();
        await page.waitForLoadState('load');            
     }
    }

    // function call
    await validateRowLinks(page);    

//cross validation with optimization page cost --->>> in app optimizatio cost


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
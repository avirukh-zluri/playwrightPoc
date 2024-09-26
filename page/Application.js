const { test, expect } = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

export class Application {
    constructor(page) {
        this.page = page;

        // Locators
        this.managedApplicationCount = "//div[contains(text(),'Managed Applications')]//..//..//span/..";
        this.applicationSectionButton = "//span[contains(text(),'Applications')]";
        this.clickOnUnmanaged = "//div[contains(text(),'Unmanaged')]";
        this.clickOnRestricted = "//div[contains(text(),'Restricted')]";
        this.clickOnNeedReviews = "//div[contains(text(),'Needs Review')]";
        this.clickOnAllApp = "//div[contains(text(),'All Apps')]";

        // Add Application
        this.clickToAddApp = "//button[@class='appsad mr-3']//span[@id='te']";
        this.clickToAddName = "//input[@placeholder='Application']";
        this.clickToCloseApp = "//img[@alt='Close']";
        this.selectApp = "//div[@class='row suggestion_menu_application_name_row']";
        this.addOwner = "//input[contains(@placeholder,'Add Owner')]";
        this.clickToAddOwner = "//div[@class='s-menu-container shadow-sm mt-1 add-app-suggestion-menu']//div[1]//button[1]";
        this.addBudget = "//input[contains(@placeholder,'Budget')]";
        this.addButton = "//span[@id='te' and text()='Add']";
        // XPath to find the application name in the second <td> of each row
        this.applicationNameXPath = "//table//tr//td[2]//a//div";

    }

    // Method to add an application
    async addApplication(applicationName = "Asana", owner = "teller", budget = "10000") {
        await this.page.locator(this.clickToAddApp).click();
        await this.page.locator(this.clickToAddName).fill(applicationName);

        // Ensure the suggestion list appears and select the app
        await this.page.waitForSelector(this.selectApp);
        await this.page.locator(this.selectApp).click();

        // Add owner
        await this.page.locator(this.addOwner).fill(owner);
        await this.page.locator(this.clickToAddOwner).click();

        // Add budget
        await this.page.locator(this.addBudget).fill(budget);

        // Click the Add button
        await this.page.locator(this.addButton).click();
    }

    // Method to navigate to the Applications section
    async goToApplication() {
        await this.page.locator(this.applicationSectionButton).click();
    }

    // Get the managed applications count and log it
    async getManagedApplicationCount() {
        await this.page.waitForSelector(this.managedApplicationCount);
        const count = await this.page.locator(this.managedApplicationCount).textContent();
        console.log("Managed Applications Count: ", count);
    }

    // Navigate to the Unmanaged section
    async goToUnmanaged() {
        await this.page.locator(this.clickOnUnmanaged).click();
        await this.page.waitForSelector(this.clickOnUnmanaged); // Add wait if needed
    }

    // Navigate to the Restricted section
    async goToRestricted() {
        await this.page.locator(this.clickOnRestricted).click();
        await this.page.waitForSelector(this.clickOnRestricted); // Add wait if needed
    }

    // Navigate to the Needs Review section
    async goToNeedReview() {
        await this.page.locator(this.clickOnNeedReviews).click();
        await this.page.waitForSelector(this.clickOnNeedReviews); // Add wait if needed
    }

    // Navigate to All Apps section
    async goToAllApp() {
        await this.page.locator(this.clickOnAllApp).click();
        await this.page.waitForSelector(this.clickOnAllApp); // Add wait if needed
    }

    // Click on the Add button (Finalize the app addition)
    async clickOnAddButton() {
        await this.page.locator(this.addButton).click();
    }

    /**
     * Search for an application name in the table and click on the corresponding row or link.
     * @param {string} applicationName - The name of the application to search for.
     */
    async searchAndSelectApplication(applicationName) {
        // Wait for the table to appear
        await this.page.waitForSelector(this.applicationNameXPath);

        // Get all rows in the table
        const rows = await this.page.locator(this.applicationNameXPath);

        // Get the count of rows
        const rowCount = await rows.count();

        // Loop through each row
        for (let i = 0; i < rowCount; i++) {
            // Get the application name text from the second <td> in the current row
            const appNameText = await rows.nth(i).textContent();
            console.log(`Element ${i} text: ${appNameText}`);

            // Trim the text to remove any extra spaces
            const trimmedAppName = appNameText.trim();

            // Compare the extracted text with the applicationName parameter
            if (trimmedAppName === applicationName) {
                // If the application name matches, click the corresponding link (or the row)
                await rows.nth(i).click();
                console.log(`Clicked on the application: ${applicationName}`);
                return;
            }
        }

        // If the application is not found
        console.log(`Application: ${applicationName} not found in the table`);
    }
}

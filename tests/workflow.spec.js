const { test, expect } = require("@playwright/test");
const { setTimeout } = require("node:timers/promises");
import path from "path";
import fs from "fs";

const { LoginPage } = require("../page/LoginPage");
const { WorkflowPage } = require("../page/WorkflowPage");
const APIListener = require("../utils/APIListener.js");

let globalApiListener;
let workflow;



test.beforeAll(async () => {
  globalApiListener = new APIListener();
});

test.beforeEach(async ({ page }) => {
  try {
    const Login = new LoginPage(page);
    workflow = new WorkflowPage(page);

    await Login.goToLoginPage();
    await Login.login({
      userName: "pod4_automation_prod@zluri.dev",
      password: "test@123",
    });

    await globalApiListener.startListening(page);
    page.apiListener = globalApiListener;
  } catch (error) {
    console.error("Error in test setup:", error);
    throw error;
  }
});




test("TC_001 - Verify user able to create New Onboarding workflows", async ({
  page,
}) => {
  await workflow.goToWorkflows();
  await workflow.clickOnOnboarding();
  await workflow.onboardingNavigation.toDrafts();
  await workflow.onboardingNavigation.toPlaybooks();
  await workflow.onboardingNavigation.toOverview();
});

test.afterEach(async ({ page }, testInfo) => {
  try {
    // Save API calls
    const outputFolder = path.join(__dirname, "data");
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    const fileName = `${testInfo.title.replace(/\s+/g, "_")}_curls.txt`;
    const filePath = path.join(outputFolder, fileName);

    console.log(`File ${fileName} created for test case: ${testInfo.title}`);
    await globalApiListener.saveAsCurls(filePath);
    await globalApiListener.saveAsPostmanCollection(
      path.join(outputFolder, "collection.json")
    );

    // Cleanup workflow if needed
    if (workflow) {
      // Add any workflow cleanup if necessary
      // await workflow.cleanup();
    }

    // Close the context and browser
    if (page) {
      const context = page.context();
      await page.close();
      await context.close();
    }
  } catch (error) {
    console.error("Error in test cleanup:", error);
    throw error;
  }
});

test.afterAll(async ({ browser }) => {
  try {
    // Save final API calls
    await globalApiListener.saveAsCurls("curls.txt");
    await globalApiListener.saveAsPostmanCollection("collection.json");

    // Ensure all browser instances are closed
    if (browser) {
      await browser.close();
    }

    // Clean up global variables
    workflow = null;
    globalApiListener = null;
  } catch (error) {
    console.error("Error in final cleanup:", error);
    throw error;
  }
});
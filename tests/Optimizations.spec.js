const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");

import Login, { LoginPage } from '../page/LoginPage';
import { OptimizationPage } from '../page/OptimizationPage';

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


test("Validate Optimization heading" , async ({page}) =>{
    const pageOptimization = new OptimizationPage(page);
    await pageOptimization.goToOptimization();
    await pageOptimization.validateOptimisationHeading();

});


test("demo" , async ({page}) =>{
    const pageOptimization = new OptimizationPage(page);
    await pageOptimization.goToOptimization();

});
const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
const { SignUpPage } = require('../page/SignUpPage');


test("Sign Up" , async  ( {page} ) => {
    const signUp = new SignUpPage(page);
    await signUp.goToSignUp();
});

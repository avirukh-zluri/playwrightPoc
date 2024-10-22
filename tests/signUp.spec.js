const {test , expect} = require('@playwright/test');
const { setTimeout } = require("node:timers/promises");
const { SignUpPage } = require('../page/SignUpPage');
const fs = require('fs');
//const csv = require('csv-parse/sync');
const path = require('path');

const CSV_FILE_PATH = path.join('/Users/rajaverma/Documents', 'data.csv');

function parseCSV(fileContent) {
  const lines = fileContent.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
          const value = values[index];
          obj[header] = value !== undefined ? value.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"').trim() : '';
          return obj;
      }, {});
  });
}



test("Sign Up" , async  ( {page , context} ) => {
    const signUp = new SignUpPage(page , context);
    await signUp.goToSignUp();
});

test("SignUP and Check for Login Redirection" , async ( {page , context} ) => {
    const signUp = new SignUpPage(page , context);
    await signUp.loginRedirection();
});

test('Privacy Policy and T/C Redirection Check' , async( {page , context} ) => {
    const signUp = new SignUpPage(page , context);
    await signUp.privacyPolicyAndT_CRedirection();
});

test("Sign Up Negative Testing with CSV data", async ({ page }) => {
  const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
  let records;
  try {
      records = parseCSV(fileContent);
  } catch (error) {
      console.error("Error parsing CSV:", error);
      throw error;
  }

  console.log(`Total records in CSV: ${records.length-1}`);

  for (let i = 0; i < records.length-1; i++) {
      const record = records[i];
      console.log(`Processing record ${i+1 } of ${records.length-1}`);

      const signUp = new SignUpPage(page);
      let errorMessage;
      try {
          errorMessage = await signUp.negativeTestingSignup(record);
      } catch (error) {
          console.error(`Error in test case for ${record.Email}:`, error);
          continue;
      }
      
      const expectedError = record.Expected_Error ? record.Expected_Error.trim().replace(/^"(.*)"$/, '$1') : '';
      const actualError = errorMessage ? errorMessage.trim() : '';

      expect(actualError).toBe(expectedError);
      
      console.log(`Test case for ${record.Email}:`);
      console.log(`Expected: ${expectedError}`);
      console.log(`Received: ${actualError}`);
      console.log(`Result: ${actualError === expectedError ? 'PASSED' : 'FAILED'}`);
      console.log('---');
  }

  console.log("All records processed");
});

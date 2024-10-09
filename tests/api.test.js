import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { LicensePage } from '../page/LicensesPage';

test.describe('License Page', async () => {
  const baseURL = process.env.BASE_URL;
  const token = process.env.BEARER_TOKEN;
  const orgID = process.env.ORG_ID
  test('License Page Data Validation', async ({ request , page}) => {
   
    const Login = new LoginPage(page);
    await Login.goToLoginPage();
    await Login.login(); 
    const pageLicenses = new LicensePage(page);
    await pageLicenses.goToLicenses();
    if (!token) {
        throw new Error("Bearer token is not defined in environment variables.");
    }
    const response = await request.get(`${baseURL}/organization/${orgID}/license-contract/tab-count`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    console.log(responseData);

    const numberofContracts = Number(await page.locator("//a[@href='/licenses#allContracts']//div[@class='d-flex align-items-center justify-content-center']").textContent());
    expect(responseData[0].count).toEqual(numberofContracts);
    
    const numberofSubscription = Number(await page.locator("//a[@href='/licenses#allSubscriptions']//div[@class='d-flex align-items-center justify-content-center']").textContent());
    expect(responseData[1].count).toEqual(numberofSubscription);

    const numberofLicences = Number(await page.locator("//a[@href='/licenses#allLicenses']//div[@class='d-flex align-items-center justify-content-center']").textContent());
    expect(responseData[2].count).toEqual(numberofLicences);
    
    const numberofPerpetuals = Number(await page.locator("//a[@href='/licenses#allPerpetualContracts']//div[@class='d-flex align-items-center justify-content-center']").textContent());
    expect(responseData[3].count).toEqual(numberofPerpetuals);
    
    

  });
});
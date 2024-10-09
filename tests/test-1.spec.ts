import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^per termper lic\. termper monthper quarterper year$/ }).getByRole('combobox').selectOption('months');
});
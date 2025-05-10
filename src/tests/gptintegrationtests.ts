// @ts-check
import { test, expect } from '@playwright/test';

test('homepage chat works', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.fill('input[placeholder="Ask a question..."]', 'What career suits me if I like math and science?');
  await page.click('button:has-text("Send")');
  await expect(page.locator('.chat-response')).toContainText(/.+/);
}); 
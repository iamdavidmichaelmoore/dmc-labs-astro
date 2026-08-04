import { expect, test } from '@playwright/test';

test('the home page is styled, hydrated, and fully visible', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('pageerror', error => browserErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/');

  await expect(page).toHaveTitle('DMC Labs — Building systems, not apps');
  await expect(page.locator('.terminal')).toHaveCSS('border-top-width', '1px');
  await expect(page.locator('.terminal-line.visible')).toHaveCount(6, { timeout: 5_000 });
  await expect(page.locator('.cta-row')).toHaveCSS('opacity', '1');
  await expect(page.locator('#content')).toHaveCSS('opacity', '1');
  await expect(page.locator('.nav a[href="/work"]')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

for (const [path, heading] of [
  ['/work', 'Selected work'],
  ['/about', 'About DMC Labs'],
  ['/blog', 'Research log'],
]) {
  test(`the ${path} route renders its page`, async ({ page }) => {
    await page.goto(path);

    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  });
}

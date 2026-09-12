import { expect, test } from '@playwright/test';

test('the home page is styled, hydrated, and fully visible', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('pageerror', error => browserErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/');

  await expect(page.locator('.bg-grid')).toHaveCount(0);
  await expect(page).toHaveTitle('DMC Labs — Building systems, not apps');
  await expect(page.locator('.terminal')).toHaveCSS('border-top-width', '1px');
  await expect(page.locator('.terminal-line.visible')).toHaveCount(6, { timeout: 5_000 });
  await expect(page.locator('.hero .cta-row')).toHaveCSS('opacity', '1');
  await expect(page.getByRole('heading', { name: 'SELECTED WORK' })).toBeVisible();
  await expect(page.locator('#featured-work .card')).toHaveCount(3);
  await expect(page.locator('nav a[href="/work"]')).toBeVisible();

  const [navBox, terminalBox] = await Promise.all([
    page.locator('nav').boundingBox(),
    page.locator('.terminal').boundingBox(),
  ]);
  expect(navBox).not.toBeNull();
  expect(terminalBox).not.toBeNull();
  expect(terminalBox!.y).toBeGreaterThanOrEqual(navBox!.y + navBox!.height + 24);

  expect(browserErrors).toEqual([]);
});

test('scrolling reveals content and increases the ambient illumination', async ({ page }) => {
  await page.goto('/');

  const insetNav = await page.locator('nav').boundingBox();
  const illuminationBefore = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--scroll-illumination'),
  );
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('nav')).toHaveClass(/nav-scrolled/);
  const flushNav = await page.locator('nav').boundingBox();
  expect(insetNav).not.toBeNull();
  expect(flushNav).not.toBeNull();
  expect(insetNav!.x).toBeGreaterThan(0);
  expect(flushNav!.x).toBe(0);
  await expect(page.locator('#featured-work')).toHaveClass(/is-visible/);

  await expect.poll(() => page.evaluate(() =>
    Number(getComputedStyle(document.documentElement).getPropertyValue('--scroll-illumination')),
  )).toBeGreaterThan(Number(illuminationBefore));
  await expect(page.locator('.footer')).toHaveCSS('background-image', 'none');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('nav')).not.toHaveClass(/nav-scrolled/);
});

for (const [path, heading] of [
  ['/work', 'WORK'],
  ['/blog', 'LOG'],
]) {
  test(`the ${path} route renders its page`, async ({ page }) => {
    await page.goto(path);

    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  });
}

test('the about page tells the lab story without a photo placeholder', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: /about|the lab|dmc labs/i })).toBeVisible();
  await expect(page.locator('.photo-placeholder')).toHaveCount(0);
});

test('the work filter narrows the displayed research by category', async ({ page }) => {
  await page.goto('/work');

  await expect(page.locator('.work-grid .card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Experiment' }).click();
  await expect(page.locator('.work-grid > div:not([hidden]) .card')).toHaveCount(2);
  await expect(page.getByText('Self-Reflecting Language Model')).toBeVisible();
  await expect(page.getByText('Contextual Query Engine')).not.toBeVisible();
});

test('internal navigation uses the client router', async ({ page }) => {
  await page.goto('/');

  await page.locator('nav a[href="/work"]').click();

  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole('heading', { name: 'WORK' })).toBeVisible();
});

test('navigation links preview their destination structure', async ({ page }) => {
  await page.goto('/');

  await page.locator('nav a[href="/work"]').hover();

  await expect(page.locator('.nav-flyout-work')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Selected systems' })).toBeVisible();
  await expect(page.locator('.nav-flyout-work')).toHaveCSS('width', '336px');
});

test('header controls and content links remain independently clickable', async ({ page }) => {
  await page.goto('/');

  const [toggleBox, logLinkBox] = await Promise.all([
    page.getByRole('button', { name: /switch to .* theme/i }).boundingBox(),
    page.locator('nav a[href="/blog"]').boundingBox(),
  ]);
  expect(toggleBox).not.toBeNull();
  expect(logLinkBox).not.toBeNull();
  expect(toggleBox!.x).toBeGreaterThanOrEqual(logLinkBox!.x + logLinkBox!.width);

  await page.locator('#featured-work a[href="/work"]').click();
  await expect(page).toHaveURL(/\/work$/);

  await page.locator('footer a[href="/blog"]').click();
  await expect(page).toHaveURL(/\/blog$/);
});

test('the compact layout contains its controls without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const [toggleBox, navBox, footerContentBox, viewport] = await Promise.all([
    page.getByRole('button', { name: /switch to .* theme/i }).boundingBox(),
    page.locator('nav').boundingBox(),
    page.locator('footer > div').boundingBox(),
    page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth })),
  ]);
  expect(navBox).not.toBeNull();
  expect(toggleBox).not.toBeNull();
  expect(footerContentBox).not.toBeNull();
  expect(toggleBox!.x).toBeGreaterThanOrEqual(navBox!.x);
  expect(toggleBox!.x + toggleBox!.width).toBeLessThanOrEqual(navBox!.x + navBox!.width);
  expect(Math.abs((footerContentBox!.x + footerContentBox!.width / 2) - viewport.width / 2)).toBeLessThanOrEqual(1);
  expect(viewport.scrollWidth).toBe(viewport.width);
});

test('the theme follows system preference and persists a user selection', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('dmc-labs-theme'));
  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('dmc-labs-theme'))).toBe('dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('dmc-labs-theme'))).toBe('light');
  await page.locator('nav a[href="/work"]').click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('the research article is available from the log', async ({ page }) => {
  await page.goto('/blog');

  await expect(page.locator('.card')).toHaveCount(6);
  await page.getByRole('link', { name: 'Self-Correction in LLMs' }).click();
  await expect(page.getByRole('heading', { name: 'Self-Correction in LLMs: A Research Note' })).toBeVisible();
  await expect(page.locator('table')).toBeVisible();
  await expect(page.locator('.code-panel')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy verifier-loop.ts' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Article sections' })).toBeVisible();
  await page.locator('#observations').scrollIntoViewIfNeeded();
  await expect(page.locator('.article-toc a[href="#observations"]')).toHaveClass(/active/);
});

import { expect, test } from '@playwright/test';

test('home is essay-led and free of terminal chrome', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('pageerror', error => browserErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/We try things/i);
  await expect(page.locator('.terminal')).toHaveCount(0);
  await expect(page.locator('.bg-grid')).toHaveCount(0);
  await expect(page.locator('.nav-flyout')).toHaveCount(0);
  await expect(page.getByText(/latest note/i)).toBeVisible();
  await expect(page.getByText(/also running/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: /Self-Correction in LLMs/i })).toBeVisible();
  await expect(page.locator('nav a[href="/experiments"]')).toBeVisible();
  await expect(page.locator('nav a[href="/notes"]')).toBeVisible();
  await expect(page.locator('nav a[href="/about"]')).toBeVisible();
  await expect(page.locator('nav a[href="/work"]')).toHaveCount(0);
  await expect(page.locator('nav a[href="/blog"]')).toHaveCount(0);

  expect(browserErrors).toEqual([]);
});

test('scrolling reveals content quietly', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.scroll-telemetry')).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('#contact[data-reveal]')).toHaveClass(/is-visible/);
  await expect(page.locator('.scroll-telemetry')).toHaveCount(0);
});

test('experiments and notes routes render', async ({ page }) => {
  await page.goto('/experiments');
  await expect(page.getByRole('heading', { name: 'Experiments' })).toBeVisible();
  await expect(page.locator('article.experiment-card')).toHaveCount(6);

  await page.goto('/notes');
  await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Self-Correction in LLMs' })).toBeVisible();
});

test('legacy work and blog paths redirect', async ({ page }) => {
  await page.goto('/work', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/experiments\/?$/, { timeout: 10_000 });
  await expect(page.getByRole('heading', { name: 'Experiments' })).toBeVisible();

  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/notes\/?$/, { timeout: 10_000 });
  await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();

  await page.goto('/blog/self-correction-in-llms', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/notes\/self-correction-in-llms\/?$/, { timeout: 10_000 });
});

test('the about page tells the lab story without a photo placeholder', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: /about the lab/i })).toBeVisible();
  await expect(page.locator('.photo-placeholder')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: /focus areas/i })).toBeVisible();
});

test('theme toggle switches clay-on-paper themes', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /switch to .* theme/i });
  await expect(toggle).toBeVisible();
  const before = await page.locator('html').getAttribute('data-theme');
  await toggle.click();
  await expect.poll(async () => page.locator('html').getAttribute('data-theme')).not.toBe(before);
  await expect.poll(async () => page.locator('html').getAttribute('data-theme')).toMatch(/light|dark/);
});

test('internal navigation uses the client router', async ({ page }) => {
  await page.goto('/');

  await page.locator('nav a[href="/experiments"]').click();

  await expect(page).toHaveURL(/\/experiments\/?$/);
  await expect(page.getByRole('heading', { name: 'Experiments' })).toBeVisible();
});

test('header controls and content links remain independently clickable', async ({ page }) => {
  await page.goto('/');

  const [toggleBox, notesLinkBox] = await Promise.all([
    page.getByRole('button', { name: /switch to .* theme/i }).boundingBox(),
    page.locator('nav a[href="/notes"]').boundingBox(),
  ]);
  expect(toggleBox).not.toBeNull();
  expect(notesLinkBox).not.toBeNull();
  expect(toggleBox!.x).toBeGreaterThanOrEqual(notesLinkBox!.x + notesLinkBox!.width);

  await page.getByRole('link', { name: /all experiments/i }).click();
  await expect(page).toHaveURL(/\/experiments\/?$/);

  await page.locator('footer a[href="/notes"]').click();
  await expect(page).toHaveURL(/\/notes\/?$/);
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
  await page.locator('nav a[href="/experiments"]').click();
  await expect(page).toHaveURL(/\/experiments\/?$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('the research note is available from notes', async ({ page }) => {
  await page.goto('/notes');

  await expect(page.getByRole('link', { name: 'Self-Correction in LLMs' })).toBeVisible();
  await page.getByRole('link', { name: 'Self-Correction in LLMs' }).first().click();
  await expect(page).toHaveURL(/\/notes\/self-correction-in-llms\/?$/);
  await expect(page.getByRole('heading', { name: 'Self-Correction in LLMs: A Research Note' })).toBeVisible();
  await expect(page.locator('table')).toBeVisible();
  await expect(page.locator('.code-panel')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy verifier-loop.ts' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Article sections' })).toBeVisible();
  await page.locator('#observations').scrollIntoViewIfNeeded();
  await expect(page.locator('.article-toc a[href="#observations"]')).toHaveClass(/active/);
});

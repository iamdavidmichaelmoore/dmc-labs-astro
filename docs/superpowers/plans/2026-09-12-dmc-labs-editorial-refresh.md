# DMC Labs Editorial Lab Notebook Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `iamdavidmichaelmoore/dmc-labs-astro` into the approved Editorial Lab Notebook brand: essay-led home, Experiments/Notes IA, warm paper + clay accent with dark mode, and removal of terminal/wireframe chrome.

**Architecture:** Keep Astro + React + Tailwind v4. Replace design tokens and layout chrome in place, add new `/experiments` and `/notes` routes with redirects from `/work` and `/blog`, rebuild the home as an essay-led composition, and rewrite tests that currently assert terminal/wireframe behavior.

**Tech Stack:** Astro 7, React 19, Tailwind CSS 4 (`@tailwindcss/vite`), Vitest, Playwright, existing `src/data/site.ts` content module.

**Spec:** `docs/superpowers/specs/2026-09-11-dmc-labs-editorial-refresh-design.md`

## Global Constraints

- Positioning voice: independent builder lab; prefer “what we tried / what worked / what’s next”; do not lead with “Building systems, not apps”
- Home layout: Essay-led (latest note owns the hero; experiments as “Also running” strip)
- Routes: `/`, `/experiments`, `/notes`, `/notes/[slug]`, `/about` with redirects `/work`→`/experiments`, `/blog`→`/notes`, `/blog/[slug]`→`/notes/[slug]`
- Light tokens: paper `#F7F1E8`, ink `#1C1915`, surface `#EFE7DB`, accent `#C45C26`
- Dark tokens: paper `#141210`, ink `#F3EDE4`, surface `#1E1B17`, accent `#D96A32`
- Theme: follow system on first visit, then remember last explicit choice (`dmc-labs-theme` storage key already exists)
- Motion: quiet 200–300ms fades / slight rise; honor `prefers-reduced-motion`
- Remove: terminal hero, scroll telemetry HUD, wireframe flyouts, CRT green accent, Iosevka-everywhere UI
- Stack stays Astro + React + Tailwind v4; no CMS/MDX migration in this plan
- Experiment status filters are out of scope for v1
- Drop about photo placeholder unless a real image is added (omit for now)
- `npm run build`, `npm run test:unit`, and `npm run test:e2e` must pass after updates

---

## File map

| File | Responsibility |
|------|----------------|
| `src/styles/global.css` | Design tokens, typography, shared layout/utilities for editorial look |
| `src/styles/terminal.css` | Delete after TerminalHero removal (or leave unused only if something still imports — prefer delete) |
| `src/components/layout/SiteNav.tsx` | Quiet masthead nav (replaces `WireframeNav.tsx`) |
| `src/components/layout/SiteFooter.tsx` | Soft footer CTA + links (replaces `WireframeFooter.tsx`) |
| `src/components/layout/MainLayout.tsx` | Shell wiring: nav items Experiments/Notes/About + new components |
| `src/components/layout/BrandMark.tsx` | Keep; ensure it works on warm paper / dark |
| `src/components/home/LatestNoteHero.tsx` | Essay-led home hero for newest note |
| `src/components/home/AlsoRunning.tsx` | Quiet strip of 2–3 active experiments |
| `src/components/experiments/ExperimentCard.tsx` | Soft surface experiment card (adapt/replace `WorkCard.tsx`) |
| `src/components/features/ExperienceLayer.tsx` | Quiet reveal only — remove scroll-illumination telemetry behavior |
| `src/components/hero/TerminalHero.tsx` | Delete after home rewrite |
| `src/pages/index.astro` | Essay-led home composition |
| `src/pages/experiments.astro` | Experiments index |
| `src/pages/notes.astro` | Notes index |
| `src/pages/notes/[slug].astro` | Note detail (migrate from `blog/[slug].astro`) |
| `src/pages/about.astro` | Calm about page without photo placeholder |
| `src/pages/work.astro` | Replace with redirect to `/experiments` |
| `src/pages/blog.astro` | Replace with redirect to `/notes` |
| `src/pages/blog/[slug].astro` | Replace with redirect to `/notes/[slug]` |
| `src/data/site.ts` | Keep data; add small helpers `latestNote`, `activeExperiments` if useful |
| `tests/unit/LatestNoteHero.test.tsx` | Unit coverage for home hero |
| `tests/unit/AlsoRunning.test.tsx` | Unit coverage for experiments strip |
| `tests/unit/TerminalHero.test.tsx` | Delete with TerminalHero |
| `tests/unit/WorkFilter.test.tsx` | Update or delete if WorkFilter removed from experiments v1 |
| `tests/e2e/site.spec.ts` | Assert new IA, copy, themes; drop terminal/flyout assertions |
| Fonts under `public/fonts/` (or Astro font integration) | Self-host Fraunces (or Newsreader) + Source Sans 3 (or Inter) |

---

### Task 1: Design tokens and typography foundation

**Files:**
- Modify: `src/styles/global.css`
- Create: `public/fonts/` (woff2 files) OR wire `@fontsource` packages if lighter — prefer self-host woff2 under `public/fonts/`
- Modify: `src/styles/global.css` `@theme` / `:root` / `[data-theme='light']` / dark defaults
- Test: `tests/unit/themeTokens.test.tsx` (use a jsdom/Vitest test that verifies both the exported palettes and the CSS custom properties/computed styles for light + dark themes so stale values in `global.css` cannot pass)

**Interfaces:**
- Consumes: existing `data-theme` attribute from `ThemeInit.astro` / `ThemeToggle.astro`
- Produces: CSS custom properties `--bg-color`, `--surface`, `--text-primary`, `--text-secondary`, `--accent`, `--font-display`, `--font-body`, `--font-utility` with the exact hex values from Global Constraints

- [ ] **Step 1: Write the failing unit test for token helper and CSS contract**

Create `src/styles/themeTokens.ts`:

```ts
export const lightTheme = {
  bg: '#F7F1E8',
  ink: '#1C1915',
  surface: '#EFE7DB',
  accent: '#C45C26',
} as const;

export const darkTheme = {
  bg: '#141210',
  ink: '#F3EDE4',
  surface: '#1E1B17',
  accent: '#D96A32',
} as const;
```

Create `tests/unit/themeTokens.test.tsx`:

```ts
import '../../src/styles/global.css';
import { beforeEach, describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from '../../src/styles/themeTokens';

describe('themeTokens', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('exposes the approved light and dark palettes', () => {
    expect(lightTheme).toEqual({
      bg: '#F7F1E8',
      ink: '#1C1915',
      surface: '#EFE7DB',
      accent: '#C45C26',
    });
    expect(darkTheme).toEqual({
      bg: '#141210',
      ink: '#F3EDE4',
      surface: '#1E1B17',
      accent: '#D96A32',
    });
  });

  it('wires the approved CSS custom properties for both themes', () => {
    const lightStyles = getComputedStyle(document.documentElement);
    expect(lightStyles.getPropertyValue('--bg-color').trim()).toBe('#F7F1E8');
    expect(lightStyles.getPropertyValue('--surface').trim()).toBe('#EFE7DB');
    expect(lightStyles.getPropertyValue('--text-primary').trim()).toBe('#1C1915');
    expect(lightStyles.getPropertyValue('--accent').trim()).toBe('#C45C26');

    document.documentElement.setAttribute('data-theme', 'dark');

    const darkStyles = getComputedStyle(document.documentElement);
    expect(darkStyles.getPropertyValue('--bg-color').trim()).toBe('#141210');
    expect(darkStyles.getPropertyValue('--surface').trim()).toBe('#1E1B17');
    expect(darkStyles.getPropertyValue('--text-primary').trim()).toBe('#F3EDE4');
    expect(darkStyles.getPropertyValue('--accent').trim()).toBe('#D96A32');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/themeTokens.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement token module and wire CSS variables**

1. Add `src/styles/themeTokens.ts` as above.
2. In `src/styles/global.css`, set:
   - `:root` (treat as dark values OR keep current pattern where `:root` is dark and `:root[data-theme='light']` is light — **change to light-first**):
     - Default `:root` = light tokens from Global Constraints
     - `:root[data-theme='dark']` = dark tokens
3. Update `ThemeInit.astro` if it assumes dark-first so first paint matches system preference without flash (keep existing storage key `dmc-labs-theme`).
4. Set `--font-display` to Fraunces (or Newsreader) stack and `--font-body` to Source Sans 3 (or Inter). Utility mono only for meta.
5. Remove CRT green (`#29c940` / `#a0ff85`) and all remaining green-derived `global.css` rules, including ambient `rgb(41 201 64 / ...)` backgrounds, `.scroll-telemetry`, and the theme-toggle hover state if it still uses the old accent.
6. Add `@font-face` rules pointing at self-hosted files under `public/fonts/`.

- [ ] **Step 4: Run unit test to verify it passes**

Run: `npm run test:unit -- tests/unit/themeTokens.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/styles/themeTokens.ts src/styles/global.css src/components/theme/ThemeInit.astro public/fonts tests/unit/themeTokens.test.tsx
git commit -m "feat: add editorial light/dark design tokens and typography"
```

---

### Task 2: Site chrome — nav and footer without wireframe flyouts

**Files:**
- Create: `src/components/layout/SiteNav.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Modify: `src/components/layout/MainLayout.tsx`
- Delete (after swap): `src/components/layout/WireframeNav.tsx`, `src/components/layout/WireframeFooter.tsx`
- Test: `tests/unit/SiteNav.test.tsx`

**Interfaces:**
- Consumes: `BrandMark`; `NavItem { label: string; href: string; active?: boolean }`
- Produces: `SiteNav({ items }: { items?: NavItem[] })`; `SiteFooter()`; `MainLayout` nav items exactly:
  - Experiments → `/experiments`
  - Notes → `/notes`
  - About → `/about`
  - (Home via wordmark only — no Home nav item required)
- External footer GitHub link uses `target="_blank"` with `rel="noopener noreferrer"`

- [ ] **Step 1: Write the failing SiteNav test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteNav } from '../../src/components/layout/SiteNav';

describe('SiteNav', () => {
  it('renders Experiments, Notes, and About without flyout chrome', () => {
    render(
      <SiteNav
        items={[
          { label: 'Experiments', href: '/experiments', active: true },
          { label: 'Notes', href: '/notes' },
          { label: 'About', href: '/about' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: /experiments/i })).toHaveAttribute('href', '/experiments');
    expect(screen.getByRole('link', { name: /notes/i })).toHaveAttribute('href', '/notes');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(document.querySelector('.nav-flyout')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/SiteNav.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement SiteNav, SiteFooter, and MainLayout wiring**

`SiteNav.tsx` — quiet sticky/fixed masthead, wordmark + links, no flyout map, no uppercase wireframe styling required (sentence or title case is fine; keep accessible focus styles using `--accent`).

`SiteFooter.tsx` — soft CTA with email `mailto:hello@dmc-labs.io`, GitHub link to `https://github.com/iamdavidmichaelmoore`, and nav links to Experiments / Notes / About. Copy in brand voice (independent builder lab). Include `id="contact"` if theme/footer anchors still matter, and keep the GitHub link on the existing external-link safety contract: `target="_blank"` with `rel="noopener noreferrer"`.

`MainLayout.tsx` — import `SiteNav` / `SiteFooter`; set `navigationItems` to Experiments, Notes, About only.

Remove unused flyout assets usage (files under `public/flyouts/` may remain unreferenced).
Keep the existing footer/navigation E2E coverage in Task 7 and extend it to assert the footer CTA and GitHub link attributes.

- [ ] **Step 4: Run unit tests**

Run: `npm run test:unit -- tests/unit/SiteNav.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/layout tests/unit/SiteNav.test.tsx
git commit -m "feat: replace wireframe nav/footer with editorial site chrome"
```

---

### Task 3: Home — LatestNoteHero + AlsoRunning

**Files:**
- Create: `src/components/home/LatestNoteHero.tsx`
- Create: `src/components/home/AlsoRunning.tsx`
- Modify: `src/data/site.ts` (export helpers)
- Modify: `src/pages/index.astro`
- Delete: `src/components/hero/TerminalHero.tsx`, `src/styles/terminal.css`, `tests/unit/TerminalHero.test.tsx`, hero README/examples if orphaned
- Test: `tests/unit/LatestNoteHero.test.tsx`, `tests/unit/AlsoRunning.test.tsx`, `tests/unit/siteDataHelpers.test.tsx`

**Interfaces:**
- Consumes: `posts` / `works` from `src/data/site.ts`
- Produces:
  - `getLatestNote(posts: BlogPost[]): BlogPost` — first post with a `slug` if present, else first post
  - `getActiveExperiments(works: Work[], limit = 3): Work[]` — prefer `status === 'Active'`, then fill from remaining
  - `LatestNoteHero({ note: BlogPost })`
  - `AlsoRunning({ experiments: Work[] })`

- [ ] **Step 1: Write failing unit tests**

```tsx
// tests/unit/siteDataHelpers.test.tsx
import { describe, expect, it } from 'vitest';
import { getActiveExperiments, getLatestNote } from '../../src/data/site';

describe('site data helpers', () => {
  it('returns the first sluggable note and falls back to the first post when needed', () => {
    expect(
      getLatestNote([
        { title: 'Draft only', date: '2024-07-16', description: 'No slug yet.' },
        {
          slug: 'self-correction-in-llms',
          date: '2024-07-15',
          title: 'Self-Correction in LLMs',
          description: 'What held up in practice.',
        },
      ]),
    ).toMatchObject({ slug: 'self-correction-in-llms' });

    expect(
      getLatestNote([
        { title: 'Draft only', date: '2024-07-16', description: 'No slug yet.' },
      ]),
    ).toMatchObject({ title: 'Draft only' });
  });

  it('prefers active experiments, then fills remaining slots up to the limit', () => {
    expect(
      getActiveExperiments(
        [
          { id: 'a', category: 'Research', title: 'A', description: 'A', status: 'Paused' },
          { id: 'b', category: 'Research', title: 'B', description: 'B', status: 'Active' },
          { id: 'c', category: 'Research', title: 'C', description: 'C', status: 'Active' },
          { id: 'd', category: 'Research', title: 'D', description: 'D', status: 'Archived' },
        ],
        3,
      ).map(work => work.id),
    ).toEqual(['b', 'c', 'a']);
  });
});
```

```tsx
// tests/unit/LatestNoteHero.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LatestNoteHero } from '../../src/components/home/LatestNoteHero';

describe('LatestNoteHero', () => {
  it('renders the latest note as the editorial hero', () => {
    render(
      <LatestNoteHero
        note={{
          slug: 'self-correction-in-llms',
          date: '2024-07-15',
          title: 'Self-Correction in LLMs',
          description: 'What held up in practice.',
        }}
      />,
    );

    expect(screen.getByText(/latest note/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Self-Correction in LLMs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the note/i })).toHaveAttribute(
      'href',
      '/notes/self-correction-in-llms',
    );
  });
});
```

```tsx
// tests/unit/AlsoRunning.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlsoRunning } from '../../src/components/home/AlsoRunning';

describe('AlsoRunning', () => {
  it('renders a quiet strip of experiments linking to /experiments', () => {
    render(
      <AlsoRunning
        experiments={[
          {
            id: 'contextual-query-engine',
            category: 'NLP Research',
            title: 'Contextual Query Engine',
            description: 'Query system',
            status: 'Active',
          },
        ]}
      />,
    );

    expect(screen.getByText(/also running/i)).toBeInTheDocument();
    expect(screen.getByText('Contextual Query Engine')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /experiments/i })).toHaveAttribute('href', '/experiments');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:unit -- tests/unit/siteDataHelpers.test.tsx tests/unit/LatestNoteHero.test.tsx tests/unit/AlsoRunning.test.tsx`
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement helpers, components, and home page**

1. Add helpers to `src/data/site.ts`.
2. Implement `LatestNoteHero` and `AlsoRunning` with editorial markup (serif display title, sans dek, clay accent kicker).
3. Rewrite `src/pages/index.astro`:
   - Title: `DMC Labs — We try things. We write them down.`
   - Compose `LatestNoteHero` + `AlsoRunning`
   - Remove `TerminalHero` and featured-work/about-teaser wireframe sections
4. Delete terminal hero files and `terminal.css` import from `global.css`.
5. Delete `tests/unit/TerminalHero.test.tsx`.

- [ ] **Step 4: Run unit tests**

Run: `npm run test:unit -- tests/unit/siteDataHelpers.test.tsx tests/unit/LatestNoteHero.test.tsx tests/unit/AlsoRunning.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/home src/data/site.ts src/pages/index.astro src/styles/global.css src/components/hero src/styles/terminal.css tests/unit
git commit -m "feat: rebuild home as essay-led editorial layout"
```

---

### Task 4: Experiments and Notes routes + redirects

**Files:**
- Create: `src/pages/experiments.astro`
- Create: `src/pages/notes.astro`
- Create: `src/pages/notes/[slug].astro` (migrate content from `blog/[slug].astro`)
- Create: `src/components/experiments/ExperimentCard.tsx` (from `WorkCard.tsx` patterns)
- Modify: `src/pages/work.astro` → redirect
- Modify: `src/pages/blog.astro` → redirect
- Modify: `src/pages/blog/[slug].astro` → redirect
- Modify/Delete: `src/components/work/*` as needed (keep filter code unused or remove from page; filters out of scope)
- Test: extend unit coverage for `ExperimentCard`; e2e updates land in Task 7

**Interfaces:**
- Consumes: `works`, `posts` from `site.ts`
- Produces: pages at `/experiments`, `/notes`, `/notes/[slug]`; Astro redirects from old paths

- [ ] **Step 1: Write failing ExperimentCard unit test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExperimentCard } from '../../src/components/experiments/ExperimentCard';

describe('ExperimentCard', () => {
  it('shows title, description, and status chip', () => {
    render(
      <ExperimentCard
        work={{
          id: 'contextual-query-engine',
          category: 'NLP Research',
          title: 'Contextual Query Engine',
          description: 'Open-source query system.',
          status: 'Active',
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Contextual Query Engine' })).toBeInTheDocument();
    expect(screen.getByText('Open-source query system.')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/ExperimentCard.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement pages and redirects**

`experiments.astro` — heading “Experiments”, intro in builder voice, grid of `ExperimentCard` for all `works`. Do **not** mount category filters in v1.

`notes.astro` — heading “Notes”, list posts with date, title, dek; link to `/notes/${slug}` when slug exists (skip or disable link if missing slug).

`notes/[slug].astro` — migrate from `blog/[slug].astro`; reading measure ~65ch; update canonical paths.

Redirects (Astro):

```astro
---
// src/pages/work.astro
return Astro.redirect('/experiments', 301);
---
```

```astro
---
// src/pages/blog.astro
return Astro.redirect('/notes', 301);
---
```

```astro
---
// src/pages/blog/[slug].astro
import { posts } from '../../data/site';

export function getStaticPaths() {
  return posts
    .filter((post): post is typeof post & { slug: string } => Boolean(post.slug))
    .map(post => ({ params: { slug: post.slug } }));
}

const { slug } = Astro.params;
return Astro.redirect(`/notes/${slug}`, 301);
---
```

Update any internal links still pointing at `/work` or `/blog`.

- [ ] **Step 4: Run unit test**

Run: `npm run test:unit -- tests/unit/ExperimentCard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages src/components/experiments src/components/work tests/unit/ExperimentCard.test.tsx
git commit -m "feat: add Experiments and Notes routes with legacy redirects"
```

---

### Task 5: About page restyle

**Files:**
- Modify: `src/pages/about.astro`
- Test: covered by e2e in Task 7

**Interfaces:**
- Consumes: `focusAreas`, `milestones` from `site.ts`
- Produces: calm about page without photo placeholder square

- [ ] **Step 1: Write a focused Playwright assertion scaffold in e2e (will fail until page updated)**

In `tests/e2e/site.spec.ts`, replace the about route check with:

```ts
test('the about page tells the lab story without a photo placeholder', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: /about|the lab|dmc labs/i })).toBeVisible();
  await expect(page.locator('.photo-placeholder')).toHaveCount(0);
});
```

- [ ] **Step 2: Run e2e test to verify failure mode**

Run: `npx playwright test tests/e2e/site.spec.ts -g "about page"`
Expected: FAIL on `.photo-placeholder` count or heading until restyle lands (if old heading still passes, failure should be photo placeholder)

- [ ] **Step 3: Restyle about page**

- Short founder/lab story in new voice
- Focus areas as a calm text list (not bordered icon-like cards if that reads wireframe — soft separators OK)
- Keep milestones timeline with quieter borders
- Soft CTA to email/GitHub
- Remove `.photo-placeholder`

- [ ] **Step 4: Re-run the about e2e**

Run: `npx playwright test tests/e2e/site.spec.ts -g "about page"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/about.astro tests/e2e/site.spec.ts
git commit -m "feat: restyle about page for editorial lab notebook"
```

---

### Task 6: Quiet motion only — simplify ExperienceLayer

**Files:**
- Modify: `src/components/features/ExperienceLayer.tsx`
- Modify: `src/styles/global.css` (remove telemetry / scroll-illumination UI rules)
- Test: update/remove e2e that asserts `--scroll-illumination` increases

**Interfaces:**
- Consumes: `[data-reveal]` elements
- Produces: IntersectionObserver reveal classes only; no `--scroll-illumination` updates; no `.scroll-telemetry` UI

- [ ] **Step 1: Rewrite the existing scrolling reveal e2e first (failing against old behavior is OK)**

Rewrite the existing test `scrolling reveals content and increases the ambient illumination` into a still-matching reveal-focused case so `npx playwright test tests/e2e/site.spec.ts -g "scrolling reveals"` always selects a real test. Assert reveal/`is-visible` only if still used, assert `.scroll-telemetry` has zero matches, and do **not** require telemetry or illumination increases.

- [ ] **Step 2: Run the rewritten e2e (may pass or fail depending on DOM)**

Run: `npx playwright test tests/e2e/site.spec.ts -g "scrolling reveals"`
Expected: aligns with new assertions after Step 3

- [ ] **Step 3: Simplify ExperienceLayer**

Keep reveal observer. Define the hidden-to-visible reveal contract in CSS (`.scroll-ready [data-reveal]` starts slightly raised/down and transparent, `.is-visible` transitions to visible over 200–300ms) with the existing reduced-motion override. Delete scroll illumination math and any telemetry DOM if present. Strip related CSS (`.scroll-telemetry`, `--scroll-illumination` background flourishes if they conflict with calm paper).

- [ ] **Step 4: Re-run e2e subset**

Run: `npx playwright test tests/e2e/site.spec.ts -g "scrolling reveals"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/features/ExperienceLayer.tsx src/styles/global.css tests/e2e/site.spec.ts
git commit -m "refactor: keep quiet scroll reveals; remove telemetry illumination"
```

---

### Task 7: Full Playwright rewrite + verification gate

**Files:**
- Modify: `tests/e2e/site.spec.ts`
- Modify: `tests/unit/WorkFilter.test.tsx` — delete or skip if filter UI removed
- Possibly modify: `playwright.config.ts` only if baseURL paths need changes (unlikely)

**Interfaces:**
- Consumes: finished pages from Tasks 1–6
- Produces: green `npm run test:unit` and `npm run test:e2e` and `npm run build`

- [ ] **Step 1: Rewrite e2e suite to match editorial IA**

Replace terminal/flyout/work assertions with cases like:

```ts
test('home is essay-led and free of terminal chrome', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/We try things/i);
  await expect(page.locator('.terminal')).toHaveCount(0);
  await expect(page.locator('.scroll-telemetry')).toHaveCount(0);
  await expect(page.getByText(/latest note/i)).toBeVisible();
  await expect(page.getByText(/also running/i)).toBeVisible();
  await expect(page.locator('nav a[href="/experiments"]')).toBeVisible();
  await expect(page.locator('nav a[href="/notes"]')).toBeVisible();
});

test('legacy work and blog paths redirect', async ({ page }) => {
  await page.goto('/work');
  await expect(page).toHaveURL(/\/experiments$/);
  await page.goto('/blog');
  await expect(page).toHaveURL(/\/notes$/);
  await page.goto('/blog/self-correction-in-llms');
  await expect(page).toHaveURL(/\/notes\/self-correction-in-llms$/);
});

test('theme toggle switches clay-on-paper themes', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /switch to .* theme/i });
  const initialTheme = await page.locator('html').getAttribute('data-theme');
  await toggle.click();
  await expect
    .poll(async () => page.locator('html').getAttribute('data-theme'))
    .toBe(initialTheme === 'dark' ? 'light' : 'dark');
});
```

Remove nav flyout width assertions. Update internal navigation tests to `/experiments` and `/notes`. Extend footer assertions to cover the email CTA plus the GitHub link `target="_blank"`/`rel="noopener noreferrer"` contract.

- [ ] **Step 2: Run full unit + e2e + build**

```bash
npm run test:unit
npm run test:e2e
npm run build
```

Expected: all PASS / build succeeds

- [ ] **Step 3: Fix any failures minimally**

Address only failures revealed by the suite; do not expand scope.

- [ ] **Step 4: Re-run verification**

```bash
npm run test:unit && npm run test:e2e && npm run build
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests src
git commit -m "test: align unit and e2e suites with editorial refresh"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Essay-led home | Task 3 |
| Experiments / Notes IA + redirects | Task 4 |
| About without placeholder | Task 5 |
| Light/dark clay-on-paper tokens | Task 1 |
| Quiet motion, no telemetry | Task 6 |
| Remove terminal / wireframe chrome | Tasks 2–3, 7 |
| Builder voice / new titles | Tasks 3–5 |
| Tests + build pass | Task 7 |
| No status filters v1 | Task 4 explicitly omits |
| Fonts editorial serif + humanist sans | Task 1 |

## Placeholder / consistency self-review

- No incomplete placeholder steps retained
- Route names consistent: `/experiments`, `/notes`, `/notes/[slug]`
- Theme storage key remains `dmc-labs-theme`
- Accent hex values match the merged spec exactly

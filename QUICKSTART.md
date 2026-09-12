# Quick Start

## Installation

```bash
cd dmc-labs-astro
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Project Structure

```
dmc-labs-astro/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Main.tsx
│   │   │   ├── WireframeNav.tsx
│   │   │   └── WireframeFooter.tsx
│   │   ├── hero/
│   │   │   ├── TerminalHero.tsx
│   │   │   └── README.md
│   │   └── features/
│   │       └── WireframeGrid.tsx
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── terminal.css
│   └── types/
│       └── hero.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI |

## Testing

```bash
# Full unit suite
npm run test:unit

# Focused unit test (example)
npm run test:unit -- tests/unit/SiteNav.test.tsx

# End-to-end
npm run test:e2e
```

## First Page

The `src/pages/index.astro` file shows the basic setup:

```astro
---
import { MainLayout } from '../components/layout/MainLayout';
import { TerminalHero } from '../components/hero/TerminalHero';
---

<MainLayout title="My Page">
  <TerminalHero />
  <section>Your Content</section>
</MainLayout>
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Run dev server
3. ✅ See the terminal animation on page load
4. 🚀 Build your pages

## Common Pages

### Work Page
```astro
---
import { MainLayout } from '../components/layout/MainLayout';
import { WorkFilter } from '../components/work/WorkFilter';

const works = [
  // Your work items
];
---

<MainLayout title="Work | DMC Labs">
  <WorkFilter works={works} />
</MainLayout>
```

### Blog Page
```astro
---
import { MainLayout } from '../components/layout/MainLayout';
import { BlogGrid } from '../components/blog/BlogGrid';

const posts = await getCollection('blog');
---

<MainLayout title="Log | DMC Labs">
  <BlogGrid posts={posts} />
</MainLayout>
```

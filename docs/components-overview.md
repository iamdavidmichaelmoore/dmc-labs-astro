# Component Overview

## Layout Components

### MainLayout
**Purpose:** Wraps all pages with the wireframe aesthetic

**Usage:**
```tsx
import { MainLayout } from '../components/layout/MainLayout';

<MainLayout title="My Page">
  <YourContent />
</MainLayout>
```

**Features:**
- Ambient illumination background
- Fixed navigation with rich flyouts
- Theme-aware footer

---

### WireframeNav
**Purpose:** Navigation bar with active states

**Props:**
```typescript
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
```

---

### WireframeFooter
**Purpose:** Footer with lab branding and social links

**Links:**
- Email
- GitHub
- Twitter

---

### TerminalHero
**Purpose:** Hero section with typing terminal animation (signature element)

**Props:**
```typescript
interface TerminalHeroProps {
  title?: string;
  subtitle?: string;
}
```

**Customization:**
Lines are defined in the component itself:
```tsx
const terminalLines: TerminalLine[] = [
  { text: `dmc-labs@ai:~$ ./init_research.sh`, delay: 0 },
  { text: `[SYSTEM] Initializing neural pathways...`, delay: 600 },
  // ... more lines
];
```

---

## Styling Approach

- **Single source of truth:** `src/styles/global.css`
- **Scoped styles:** Component-specific CSS imported via CSS modules
- **No external CSS files:** Everything lives in `global.css` or component CSS files

## Page Structure

```
page.astro
└── MainLayout
    ├── WireframeGrid
    ├── WireframeNav
    ├── MetaBar
    │   ├── Logo
    │   └── Links
    └── MainContent
        └── YourComponents
    └── WireframeFooter
```

## Common Patterns

### Page with Hero
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

### Page with Just Content
```astro
---
import { MainLayout } from '../components/layout/MainLayout';
---

<MainLayout title="My Page">
  <section>Your Content</section>
</MainLayout>
```

### Page with Filter
```astro
---
import { MainLayout } from '../components/layout/MainLayout';
import { WorkFilter } from '../components/work/WorkFilter';
---

<MainLayout title="Work | DMC Labs">
  <WorkFilter works={works} />
</MainLayout>
```

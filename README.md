# DMC Labs - Wireframe Aesthetic Astro

A wireframe-styled website built with Astro and React, preserving the signature terminal animation from the original implementation.

## Design Philosophy

- **Systems, not apps** — Engineering precision meets creative research
- **Wireframe aesthetic** — Sharp edges, monochromatic palette, single accent color
- **Terminal-driven** — Command-line interface metaphor for AI research

## Project Structure

```
src/
├── components/
│   ├── hero/
│   │   ├── TerminalHero.tsx       # Signature terminal typing effect
│   │   └── README.md
│   └── ...
├── styles/
│   ├── terminal.css               # Terminal-specific styles
│   └── global.css                 # Global CSS variables
└── types/
    └── hero.ts                    # TypeScript interfaces
```

## Installation

```bash
npm create astro@latest dmc-labs-astro
cd dmc-labs-astro
npm install react
npm install @types/react --save-dev
```

## Usage

```tsx
import { TerminalHero } from '../components/hero/TerminalHero';

export default function HomePage() {
  return <TerminalHero />;
}
```

## Next Steps

1. Create `global.css` with the original wireframe design variables
2. Build the `MainLayout` component
3. Migrate the first page (index.astro)
4. Test the terminal animation

## Preserved Design Elements

✅ Dark theme with wireframe grid
✅ Iosevka/Roboto Mono typography
✅ Single accent color (#a0ff85)
✅ Terminal typing effect
✅ Sharp edges (border-radius: 0)
✅ No gradients, no glassmorphism

## Removed/Modernized

- Vanilla JS → React hooks
- HTML files → Astro templates
- Hard-coded terminal → Reusable component
- Inline data → TypeScript interfaces

# TerminalHero Component

The signature wireframe aesthetic element that runs the terminal typing effect on page load.

## Usage

```tsx
import { TerminalHero } from '../hero/TerminalHero';

export function HomePage() {
  return (
    <TerminalHero
      title="Building systems, not apps"
      subtitle="Experimental AI research in natural language processing, multimodal reasoning, and human-AI collaboration."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Building systems, not apps"` | Main headline text |
| `subtitle` | `string` | `undefined` | Optional subtitle description |

## Customization

To change the terminal lines:

```tsx
const terminalLines: TerminalLine[] = [
  { text: `dmc-labs@ai:~$ ./init_research.sh`, delay: 0 },
  { text: `[SYSTEM] Initializing neural pathways...`, delay: 600 },
  // ... more lines
];

// Pass to component via props or modify in component directly
```

## CSS Variables

The component uses these CSS variables from `global.css`:

- `--surface-elevated` — Background color of terminal
- `--surface-border` — Border color
- `--accent` — Text color for success/status
- `--text-secondary` — Text color for status lines
- `--text-faint` — Text color for timestamps

## Key Features

- **Reusable** — Can be used on any page with different title/subtitle
- **State-based** — React manages line showing state (no inline styles)
- **Cleanup** — Effect cleanup on unmount
- **Typed** — TypeScript interfaces for maintainability
- **No external dependencies** — Pure React

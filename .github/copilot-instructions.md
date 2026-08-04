# DMC Labs Astro instructions

## Commands

- Install dependencies: `npm install`
- Run the local site: `npm run dev` (Astro serves on `http://localhost:4321`)
- Production build: `npm run build`
- Preview the production build: `npm run preview`
- Run an Astro CLI subcommand: `npm run astro -- <command>`

There is currently no configured test runner, single-test command, linter, or standalone type-check script. Use `npm run build` as the available project validation command. When adding automated tests, add a documented `npm test` command and a focused single-test invocation in the same change.

## Delivery workflow

- Establish the change's acceptance criteria before implementation, including the affected route/component, expected user-visible behavior, accessibility or responsive requirement when applicable, and validation command. Keep this scope in the issue, pull request, or existing project documentation; do not create standalone planning files for routine changes.
- Apply red-green-refactor for behavior changes: add or update the smallest failing automated test first, implement only enough to pass it, then refactor while the focused test remains green. Cover regressions with a test that fails on the previous behavior.
- This project has no test harness yet. The first change requiring automated coverage must introduce a TypeScript-compatible test runner, a full-suite command, and a single-file/test-name command. Do not describe `npm run build` as a substitute for behavioral tests.
- Before merging, run the focused test(s) for changed behavior, then the complete configured suite and `npm run build`. Document unmet acceptance criteria or validation limitations in the pull request rather than treating them as complete.

## Architecture

- This is a static Astro site with the React integration enabled in `astro.config.mjs`. Routes belong in `src/pages/`; the current home route is `src/pages/index.astro`.
- Pages compose React UI components. `MainLayout` is the site shell: it renders `Main`, `WireframeNav`, page content, and `WireframeFooter`. Reuse it for full pages so navigation and footer stay consistent.
- `TerminalHero` is the signature interactive hero. It owns its ordered terminal-line data and uses `useEffect` timers to reveal the lines; its optional `title` and `subtitle` only customize the surrounding copy. Keep timer cleanup intact when changing that effect.
- `src/types/hero.ts` contains the shareable terminal types. Keep component props and shared type definitions aligned if the hero's data model changes.

## Styling and UI conventions

- Preserve the system: dark or warm-light tokenized surfaces, a green accent, monospace display/utility type, hard borders, and restrained glass panels. Reuse the existing theme tokens rather than introducing parallel colors or font values.
- Tailwind v4 is configured through the Astro/Vite plugin; use responsive and theme-aware utilities for component styling. `global.css` holds shared tokens and behavior while `terminal.css` owns terminal-specific animation classes.
- Keep the named primitives and class contracts when extending the site: `MainLayout`/`Main` for shell structure, `.btn` plus `.btn-primary` or `.btn-secondary` for calls to action, and `.grid`/`.card` for content collections.
- Navigation is represented as `NavItem` objects (`label`, `href`, optional `active`) and `WireframeNav` uppercases labels when rendering. External footer links must retain `target="_blank"` with `rel="noopener noreferrer"`.
- Use the existing `@media (prefers-reduced-motion: reduce)` treatment for new animation or transition work. The terminal's line delays are deliberately staged, so preserve their reveal order and timing intent.

## Current scope

- The site implements Home, Work, The Lab, the research log, and a static research-note route. Content data lives in `src/data/site.ts`.

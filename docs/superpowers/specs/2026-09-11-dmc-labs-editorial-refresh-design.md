# DMC Labs Editorial Lab Notebook Refresh — Design Spec

**Date:** 2026-09-11  
**Repo:** https://github.com/iamdavidmichaelmoore/dmc-labs-astro  
**Status:** Approved for implementation planning (pending final user review of this document)

## Goal

Replace the current wireframe / terminal aesthetic with a calm, highly current **Editorial Lab Notebook** brand for DMC Labs — an independent builder lab focused on experiments and essays. Ship a light-first site with dark mode, tighter messaging, and renamed primary sections.

## Non-goals

- New backend, CMS, or content pipeline
- Rewriting all experiment/note copy from scratch (tighten home + chrome first; migrate existing `site.ts` content)
- Pixel-perfect recreation of third-party magazine sites
- Keeping the terminal hero, scroll telemetry HUD, or green CRT accent

## Positioning

**DMC Labs** is an independent builder lab. We run experiments, write about what we learn, and leave the rest on the cutting-room floor.

**Voice:** short, specific, human. Prefer “what we tried / what worked / what’s next.” Avoid wireframe jargon and “systems not apps” as the lead identity line.

**Home manifesto (working copy):**  
“We try things. We write them down.”  
Supporting dek: experiments in AI tooling and reasoning — with notes on what worked, what didn’t, and what’s next.

## Information architecture

| Route | Role |
|-------|------|
| `/` | Essay-led editorial home |
| `/experiments` | Experiment index (renamed from Work) |
| `/notes` | Notes / essays index (renamed from Blog) |
| `/notes/[slug]` | Individual note |
| `/about` | Lab story, focus areas, soft CTA |

**Redirects:** `/work` → `/experiments`, `/blog` → `/notes`, and `/blog/[slug]` → `/notes/[slug]` so old links do not break.

**Nav:** wordmark · Experiments · Notes · About · theme toggle. No flyout chrome.

## Home layout (Essay-led)

1. Quiet masthead + nav  
2. Kicker: “Latest note” (or date)  
3. Large display title of the newest note + short dek + “Read the note →”  
4. Divider: “Also running” — quiet strip of 2–3 active experiments  
5. Soft footer CTA (email / GitHub / follow)

## Other pages

### `/notes`
Editorial index: date, title, one-line dek. Generous spacing. No heavy card chrome. Article pages: ~65ch measure; serif acceptable for long-form body.

### `/experiments`
Soft surface cards: title, one paragraph, status chip (`Active` / `Exploring` / `Research` / `Internal`). Status filters are **out of scope for v1** (can add later).

### `/about`
Short lab story, focus areas as a calm text list (not icon grid), soft CTA. Drop photo placeholder unless a real image is provided.

## Visual system

### Type
- **Display:** editorial serif with character (Fraunces or Newsreader)  
- **Body:** humanist sans (Source Sans 3 or Inter)  
- **Utility:** restrained mono only for tiny meta (dates, status) — not the whole UI  

Load via a privacy-friendly font strategy already compatible with Astro (self-host or approved CDN). Prefer self-host if easy.

### Color

**Light (default)**  
- Paper: `#F7F1E8`  
- Ink: `#1C1915`  
- Secondary ink: muted warm gray derived from ink  
- Surface: `#EFE7DB`  
- Accent (clay): `#C45C26`

**Dark**  
- Paper: `#141210`  
- Ink: `#F3EDE4`  
- Surface: `#1E1B17`  
- Accent: `#D96A32`

Theme toggle: follow system preference on first visit, then remember the user’s last explicit choice (existing theme plumbing can be adapted).

### Motion
- Quiet only: ~200–300ms fades / slight rise on reveal  
- Honor `prefers-reduced-motion`  
- No terminal typing, no telemetry HUD, no wireframe grid overlay  

### What is removed
- Terminal hero as brand centerpiece  
- Scroll telemetry UI  
- Wireframe borders-as-identity / sharp CRT green accent (`#29c940` / `#a0ff85` lineage)  
- Iosevka-everywhere display treatment  

## Technical approach

- Keep **Astro + React + Tailwind v4** stack already in the repo  
- Restyle in place: replace `global.css` tokens, rebuild layout components (`MainLayout`, nav, footer), replace home composition  
- Rename routes and update internal links + `site.ts` labels as needed  
- Preserve existing content model in `src/data/site.ts` (works → experiments naming in UI; posts → notes)  
- Update unit/e2e tests that assert old copy, routes, or terminal-specific behavior  
- Add `.superpowers/` to `.gitignore` if design artifacts ever land in-repo  

## Success criteria

1. Home reads as essay-led editorial, not terminal/wireframe  
2. Light and dark themes both use the new clay-on-paper system  
3. Primary nav and routes use Experiments / Notes  
4. Old `/work` and `/blog` paths redirect  
5. `npm run build` and existing test suites pass (updated as needed)  
6. No terminal hero or scroll telemetry in the shipped UI  

## Open decisions (non-blocking)

- Exact font files (Fraunces vs Newsreader; Source Sans 3 vs Inter) — implementer picks the better licensed pair and documents it  
- Whether note body uses serif or sans — default serif for article body, sans for UI chrome  
- Real about image — omit until provided  

## Out of scope follow-ups

- Experiment status filters  
- CMS / MDX migration for notes  
- Deploy pipeline changes (user mentioned deploy intent separately)  

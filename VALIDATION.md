# Validation Checklist

## Setup Validation

```bash
# 1. Navigate to project
cd dmc-labs-astro

# 2. Install dependencies
npm install

# Expected: Install react and @types/react
```

## Development Validation

```bash
# 3. Start dev server
npm run dev

# Expected:
# - Server starts at http://localhost:4321
# - No errors in terminal
# - Page loads successfully
```

## Visual Validation

Open http://localhost:4321

### Check the following:

- [ ] Page title shows "DMC Labs — Building systems, not apps"
- [ ] Wireframe grid background is visible
- [ ] Sticky navigation bar at top (glass effect)
- [ ] Terminal animation appears on page load
- [ ] Terminal has 3 colored dots (red, yellow, green)
- [ ] Terminal lines appear one by one with delays
- [ ] Success line shows green (#a0ff85)
- [ ] Status line shows gray
- [ ] Time line shows faint text
- [ ] Title "Building systems, not apps" appears below terminal
- [ ] Two CTA buttons ("VIEW WORK" and "EXPLORE THE LAB")
- [ ] Footer is at bottom with "LET'S BUILD"

## Code Validation

```bash
# 4. Build for production
npm run build

# Expected: No errors, creates dist/ folder
```

## Browser Validation

### Desktop (> 768px)

- [ ] Navigation links are spaced horizontally
- [ ] Terminal max-width is ~600px
- [ ] Buttons have proper padding
- [ ] Footer links are centered
- [ ] Grid background is fixed in place

### Mobile (≤ 768px)

- [ ] Navigation bar shrinks to fit screen
- [ ] Terminal text size is readable
- [ ] Buttons stack vertically on mobile
- [ ] Grid background remains visible

## Performance Validation

```bash
# 5. Check page load time
# Open DevTools (F12) > Network tab
# Reload page and check:

- [ ] Total page size under 50KB (uncompressed)
- [ ] Initial HTML < 500 bytes
- [ ] No blocking resources
- [ ] First Contentful Paint < 1s

# 6. Check after build
# Navigate to dist/ folder and serve
npm run preview

# Expected:
- [ ] Production build is smaller than dev
- [ ] No console errors
- [ ] Terminal animation still works
```

## Accessibility Validation

```bash
# 7. Check accessibility

- [ ] Tab order works through all interactive elements
- [ ] Focus states show accent color
- [ ] Terminal has adequate color contrast (≥ 3:1)
- [ ] Text is readable without glasses
- [ ] Skip link exists to main content

# In browser DevTools (Accessibility tab):
- [ ] Heading structure is correct (h1 → h2)
- [ ] All images have alt text
- [ ] Color contrast ratios pass WCAG AA
```

## Functionality Validation

- [ ] Clicking "VIEW WORK" scrolls to work section
- [ ] Clicking "EXPLORE THE LAB" scrolls to about section
- [ ] No console errors in browser
- [ ] Terminal animation doesn't repeat on nav
- [ ] Responsive breakpoints work correctly

## Regression Validation

Compare with original `/Users/davidmoore/Documents/dmc-labs-website/index.html`:

- [ ] Same color scheme (#0a0a0c bg, #a0ff85 accent)
- [ ] Same terminal lines in same order
- [ ] Same timing for line appearances
- [ ] Same typography (Iosevka/JetBrains Mono)
- [ ] Same button styles
- [ ] Same grid background style

## Known Limitations

- [ ] Custom cursor not implemented (original had desktop-only cursor)
- [ ] Scroll reveal animation not implemented (original had IntersectionObserver)
- [ ] Live clock not implemented (original had updateClock function)
- [ ] These are planned for future iterations

## Success Criteria

✅ **All validation checks pass**

If all items above pass, the implementation is complete and ready for deployment.

# POS Toko Gypsum Pitch Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, responsive 15-slide vertical web presentation for the POS Toko Gypsum proposal and verify its static Vercel build.

**Architecture:** A Vite-powered React single page renders static slide content from focused components. A presentation controller owns active-slide detection, hash synchronization, keyboard navigation, fullscreen, and progress while CSS owns scroll snapping, responsive composition, and reduced-motion behavior.

**Tech Stack:** React 19, Vite 7, Vitest, Testing Library, CSS, inline SVG, generated WebP hero asset

**Spec:** `docs/superpowers/specs/2026-09-21-pos-gypsum-pitch-deck-design.md`

## Global Constraints

- Render exactly 15 semantic slide sections with stable hash IDs.
- Use native vertical scrolling with `scroll-snap-type: y mandatory` on desktop and `y proximity` below 768 px.
- Every slide uses `min-height: 100dvh`; no fixed viewport height may crop content.
- Use palette `#F7F6F2`, `#111827`, `#6B7280`, `#17324D`, and `#D98E4A`.
- Do not add a backend, database, authentication, environment variables, landing-page navbar/footer, heavy animation library, chart library, or icon package.
- Keep root width within `100vw`, prevent page-level horizontal overflow, and keep interactive targets at least 44×44 px.
- Support native touch/wheel scrolling, scrollbar, Arrow Up/Down, Page Up/Down, Space, previous/next controls, deep-link hash navigation, and fullscreen desktop.
- Honor `prefers-reduced-motion` and keep all content usable if enhancement APIs fail.

## Review Focus

- An invalid startup hash must leave the deck usable on the cover without throwing; pinned in Task 2 hash helper tests.
- Keyboard events originating in a button, link, input, select, textarea, or editable element must not change slides; pinned in Task 2 keyboard tests.
- Navigation at the first and last slides must clamp safely without attempting an out-of-range scroll; pinned in Task 2 index tests.
- A rejected or unsupported Fullscreen API call must not break navigation or leave incorrect UI state; pinned in Task 2 fullscreen tests.
- Mobile inventory content must use cards rather than exposing the wide desktop table, and root horizontal overflow must remain hidden; pinned in Task 4 responsive assertions.

---

### Task 1: Project Foundation and Slide Model

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/data/slides.js`
- Create: `src/styles/global.css`
- Create: `src/test/setup.js`
- Create: `src/data/slides.test.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: `slides: Array<{id: string, number: string, label: string}>`
- Produces: Vite scripts `dev`, `build`, `test`, and `test:run`.

- [ ] **Step 1: Write the failing slide-model test**

```js
import { describe, expect, it } from 'vitest'
import { slides } from './slides'

describe('slides', () => {
  it('defines 15 unique, URL-safe slide ids', () => {
    expect(slides).toHaveLength(15)
    expect(new Set(slides.map((slide) => slide.id)).size).toBe(15)
    expect(slides.every((slide) => /^[a-z][a-z0-9-]*$/.test(slide.id))).toBe(true)
  })

  it('keeps the required presentation order', () => {
    expect(slides.map((slide) => slide.id)).toEqual([
      'cover', 'overview', 'dashboard', 'pos', 'inventory',
      'gypsum-products', 'damaged-stock', 'purchasing', 'receivables',
      'delivery', 'reports', 'deployment', 'features', 'pricing', 'closing',
    ])
  })
})
```

- [ ] **Step 2: Create the Vite/React test foundation and verify the test fails**

Create `package.json` with React/Vite dependencies, Vitest using `jsdom`, and Testing Library. Run `npm install`, then run `npm run test:run -- src/data/slides.test.js`. Expected: FAIL because `src/data/slides.js` does not exist.

- [ ] **Step 3: Implement the slide manifest and minimal app shell**

Create `slides` with the exact IDs and labels from the spec. Mount `<App />` from `main.jsx`; render a semantic `<main id="presentation">` and one placeholder `<section id={slide.id}>` per manifest item. Add reset styles, palette variables, body overflow rules, and base typography in `global.css`.

- [ ] **Step 4: Verify the foundation**

Run `npm run test:run -- src/data/slides.test.js` and `npm run build`. Expected: tests PASS and Vite build exits 0.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html .gitignore src
git commit -m "chore: scaffold pitch deck application"
```

### Task 2: Presentation Controller and Navigation

**Files:**
- Create: `src/hooks/usePresentation.js`
- Create: `src/hooks/presentation-utils.js`
- Create: `src/hooks/presentation-utils.test.js`
- Create: `src/hooks/usePresentation.test.jsx`
- Create: `src/components/DeckNavigation.jsx`
- Create: `src/components/DeckNavigation.test.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `slides` from `src/data/slides.js`.
- Produces: `getHashIndex(hash, slides): number`, `getNavigationDelta(event): -1 | 0 | 1`, `isInteractiveTarget(target): boolean`.
- Produces: `usePresentation(slides)` returning `{activeIndex, progress, goTo, goNext, goPrevious, isFullscreen, toggleFullscreen, registerSlide}`.
- Produces: `<DeckNavigation activeIndex total progress onPrevious onNext onPresent isFullscreen />`.

- [ ] **Step 1: Write failing pure-function tests**

Test that `getHashIndex('#inventory', slides)` returns `4`, invalid hashes return `0`, arrow/page/space keys map to the correct delta, unrelated keys map to `0`, and interactive/editable targets are ignored.

- [ ] **Step 2: Run the utility tests**

Run `npm run test:run -- src/hooks/presentation-utils.test.js`. Expected: FAIL because the utility module does not exist.

- [ ] **Step 3: Implement pure navigation utilities**

Implement hash decoding defensively, key mapping, target checks for `BUTTON`, `A`, `INPUT`, `SELECT`, `TEXTAREA`, and `isContentEditable`, plus a `clampIndex(index, total)` helper that returns a valid slide index.

- [ ] **Step 4: Write failing controller tests**

Using `renderHook`, stub `IntersectionObserver`, `history.replaceState`, `scrollIntoView`, and the Fullscreen API. Assert startup hash selection, clamped previous/next navigation, hash replacement after active-slide changes, and graceful resolution when `requestFullscreen()` rejects.

- [ ] **Step 5: Implement `usePresentation`**

Register slide nodes, observe intersection ratios, select the most visible entry, update `activeIndex`, compute scroll progress, synchronize the hash through `history.replaceState`, respond to `hashchange`, and install guarded keyboard handlers. `goTo` calls `scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block: 'start'})`. Fullscreen errors are caught and state is driven by `fullscreenchange`.

- [ ] **Step 6: Write and implement navigation component tests**

Assert a `03 / 15` counter, disabled previous at index 0, disabled next at index 14, `aria-current` on the active indicator, accessible labels, and `--progress` style updates. Implement desktop and mobile navigation markup using buttons with inline SVG arrows.

- [ ] **Step 7: Integrate and verify**

Connect the controller and navigation to `App`. Run `npm run test:run -- src/hooks src/components/DeckNavigation.test.jsx`. Expected: all tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx src/hooks src/components/DeckNavigation.jsx src/components/DeckNavigation.test.jsx
git commit -m "feat: add presentation navigation controller"
```

### Task 3: Reusable Visual Primitives and Complete Slide Content

**Files:**
- Create: `src/components/Slide.jsx`
- Create: `src/components/icons.jsx`
- Create: `src/components/visuals/DashboardVisual.jsx`
- Create: `src/components/visuals/PosVisual.jsx`
- Create: `src/components/visuals/InventoryVisual.jsx`
- Create: `src/components/visuals/WorkflowVisuals.jsx`
- Create: `src/components/visuals/ReportVisual.jsx`
- Create: `src/components/slides/Slides.jsx`
- Create: `src/components/slides/Slides.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `registerSlide(id, node)` and active slide ID from Task 2.
- Produces: `<Slide id number eyebrow title className active children />`.
- Produces: `<Slides activeId registerSlide />`, rendering all 15 required sections.

- [ ] **Step 1: Write the failing content contract test**

Render `<Slides activeId="cover" registerSlide={() => {}} />`. Assert 15 sections, their ordered IDs, one level-one heading on the cover, a level-two heading on every later slide, required copy including `Rp6.000.000 – Rp8.000.000`, `Simple First.`, and the three required inventory products.

- [ ] **Step 2: Run the content test**

Run `npm run test:run -- src/components/slides/Slides.test.jsx`. Expected: FAIL because `Slides.jsx` does not exist.

- [ ] **Step 3: Implement slide and icon primitives**

Implement the semantic `Slide` wrapper with `data-active`, numbered eyebrow, content container, decorative background, and ref callback. Add a small inline-SVG icon map covering sales, box, cart, users, truck, report, cloud, and local server.

- [ ] **Step 4: Implement slides 1–5**

Build cover copy/media frame, overview 4×2 capability grid, dashboard KPI/chart mockup, POS transaction mockup with feature chips, and inventory desktop table plus separate mobile product cards. Use real Indonesian content and values from the brief.

- [ ] **Step 5: Implement slides 6–10**

Build gypsum product-category cards, normal/damaged stock comparison, purchasing workflow, receivables payment card, and pickup/delivery status timeline. Keep delivery timeline horizontal on desktop and vertical on mobile through CSS only.

- [ ] **Step 6: Implement slides 11–15**

Build report filters/chart, equally weighted online/offline cards, optional feature chips, pricing scope, and closing values. Keep charts and network diagrams as inline SVG/CSS with no external dependencies.

- [ ] **Step 7: Add responsive visual styling and verify content**

Add shared surfaces, badges, chart, mockup, grid, and responsive layout styles. Run `npm run test:run -- src/components/slides/Slides.test.jsx`. Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx src/components src/styles/global.css
git commit -m "feat: build fifteen-slide gypsum POS story"
```

### Task 4: Hero Asset, Responsive Presentation, and Accessibility

**Files:**
- Create: `public/images/gypsum-store-hero.webp`
- Create: `src/styles/presentation.css`
- Create: `src/App.test.jsx`
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/slides/Slides.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: full deck and controller from Tasks 2–3.
- Produces: final responsive presentation styling and optimized hero image path `/images/gypsum-store-hero.webp`.

- [ ] **Step 1: Write failing integration and responsive contract tests**

Assert `App` renders a main scroll region labeled as a presentation, exactly 15 slides, navigation controls, and the hero image with meaningful alt text. Read the stylesheet text and assert it contains `min-height: 100dvh`, desktop `scroll-snap-type: y mandatory`, mobile `scroll-snap-type: y proximity`, `overflow-x: hidden`, `prefers-reduced-motion`, a mobile `.inventory-table { display: none; }`, and `.inventory-cards` display rules.

- [ ] **Step 2: Run integration tests**

Run `npm run test:run -- src/App.test.jsx`. Expected: FAIL until the final structure and stylesheet exist.

- [ ] **Step 3: Generate and integrate the hero image**

Use the built-in image generation tool with this production prompt: “Use case: photorealistic-natural. Asset type: web presentation cover hero. A clean contemporary Indonesian building-material shop specializing in gypsum boards and metal hollow framing; neatly stacked gypsum sheets, warm daylight, one shop worker in the distant background, premium editorial architectural photography, warm ivory and deep navy environment with subtle orange accents, vertical-friendly crop with strong depth, no readable brands, no text, no logo, no watermark.” Inspect the result, copy the selected asset into `public/images/gypsum-store-hero.webp`, and reference it with explicit dimensions, `loading="eager"`, and descriptive Indonesian alt text.

- [ ] **Step 4: Implement desktop presentation styling**

Set the app shell to full viewport, main scroll region to vertical auto overflow and mandatory snapping, slides to `min-height: 100dvh`, max content width 1280 px, and responsive `clamp()` typography. Position desktop navigation on the right without covering slide content. Add restrained 300–600 ms active-slide transitions.

- [ ] **Step 5: Implement tablet/mobile styling**

At 1023 px collapse dense split layouts as needed; below 768 px change to proximity snapping, one-column layouts, 16–24 px padding, top horizontal progress, compact counter, vertical delivery timeline, and inventory cards instead of the table. Ensure buttons remain at least 44 px and internal mockup scrolling never produces document-level horizontal overflow.

- [ ] **Step 6: Implement reduced-motion and fallback behavior**

Inside `@media (prefers-reduced-motion: reduce)`, disable smooth scroll and non-essential transitions/animations. Give the hero frame a gradient fallback, retain content visibility before intersection enhancement, add focus-visible outlines, and hide decorative SVGs from assistive technology.

- [ ] **Step 7: Verify integration and CSS contracts**

Run `npm run test:run` and `npm run build`. Expected: all tests PASS and build exits 0.

- [ ] **Step 8: Commit**

```bash
git add public src
git commit -m "feat: polish responsive presentation experience"
```

### Task 5: Browser Verification and Vercel Readiness

**Files:**
- Create: `vercel.json`
- Create: `README.md`
- Modify: only files with defects discovered by verification.

**Interfaces:**
- Consumes: completed static Vite build.
- Produces: deployable `dist/` output, Vercel SPA rewrite configuration, and deployment instructions.

- [ ] **Step 1: Add deploy configuration and documentation**

Create `vercel.json` with a single rewrite from `/(.*)` to `/index.html` and document `npm install`, `npm run dev`, `npm run test:run`, `npm run build`, and Vercel import/deploy steps in `README.md`.

- [ ] **Step 2: Run automated verification**

Run `npm run test:run` and `npm run build`. Expected: zero failing tests and a successful `dist/` build.

- [ ] **Step 3: Run browser checks at required viewports**

Serve `dist/` locally. Check widths 375, 768, 1024, and 1440 px; confirm no `document.documentElement.scrollWidth > window.innerWidth`, no clipped slide content, correct table/card switching, and navigation controls outside primary content.

- [ ] **Step 4: Verify interaction paths**

Open `/#dashboard`, `/#inventory`, and `/#pricing`; confirm each lands on the correct section. Exercise Arrow Up/Down, Page Up/Down, Space, previous/next, scrollbar, wheel, and fullscreen. Confirm browser back/forward hash behavior and graceful invalid `/#not-a-slide` handling.

- [ ] **Step 5: Verify accessibility and motion preferences**

Keyboard-tab through all controls, confirm visible focus, inspect heading order and button names, emulate reduced motion, and confirm slide content appears without entrance movement.

- [ ] **Step 6: Fix only observed defects and rerun relevant checks**

For every defect, first add a focused regression assertion to the nearest existing test, verify it fails, apply the smallest fix, then rerun that test plus `npm run build`.

- [ ] **Step 7: Commit final deployment state**

```bash
git add README.md vercel.json src public package.json package-lock.json
git commit -m "docs: finalize Vercel deployment handoff"
```

- [ ] **Step 8: Capture final evidence**

Run `git status --short`, `npm run test:run`, and `npm run build`. Record the clean/expected status, exact passing test count, and successful output directory in the completion report.

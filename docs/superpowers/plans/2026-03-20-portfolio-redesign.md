# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild personal portfolio as a minimal, clean, light-themed static site with tiered project presentation.

**Architecture:** Single-page static site (HTML + CSS + vanilla JS). No build step. Served via GitHub Pages. All work on a new `redesign` branch off `main`.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Inter font (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-20-portfolio-redesign-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `index.html` | All page content and structure |
| `styles.css` | All styling — layout, typography, responsive |
| `script.js` | Minimal interactivity — mobile nav, smooth scroll |

Existing image assets (`callcode.jpg`, `schematic_logo.png`, `cerebro_logo.jpg`, `datavision_logo.png`, `stockdigest_logo.png`) stay in repo root.

---

### Task 1: Create branch and scaffold HTML

**Files:**
- Create (overwrite): `index.html`

- [ ] **Step 1: Create the redesign branch**

```bash
cd /Users/tanaynaik/Desktop/Project-Portfolio
git checkout -b redesign
```

- [ ] **Step 2: Write the full index.html**

Write the complete HTML with all 7 sections:
1. **Hero** — "SOFTWARE ENGINEER" label, "Tanay Naik" heading, one-liner, links to GitHub/LinkedIn/Email
2. **About** — Section label, 2-3 sentences written in Tanay's actual voice. Direct, not a LinkedIn summary. Something like: "I'm a CS student at UMD graduating this spring. I spend most of my time building things — startup projects, ML systems, whatever seems interesting. I care more about what you can do with technology than the technology itself. Incoming SWE at Google."
3. **Experience** — Clean list: Google (Incoming SWE, 2026), Capital One (ML Intern, 2025), SociableAI (Full-Stack Dev, 2024–2025), IBM (Research Intern, 2024), UMD CS TA (2024)
4. **Featured Projects** — Cards for: CallCode (with "1st Place" badge), Schematic, Iterator, DataVision, Cerebro (with "Best Hack" badge), Google Docs MCP Server. Each with description, tech tags, links.
5. **Other Projects** — Compact rows for: StockDigestAI, FaceLogger, LLTrainer, Carbon Emissions Visualizer. Name + short description + link.
6. **Skills** — Grouped: Languages, ML/AI, Web, Tools. Plain text, not tags.
7. **Contact** — Email, GitHub, LinkedIn links.

Include: meta tags, viewport, Inter font from Google Fonts, link to styles.css and script.js.
No navbar — page is short enough to just scroll.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scaffold complete HTML structure for redesign"
```

---

### Task 2: Write all CSS styling

**Files:**
- Create (overwrite): `styles.css`

- [ ] **Step 1: Write the complete styles.css**

Key design tokens:
- Background: `#fafafa`
- Text primary: `#111`
- Text secondary: `#555`
- Text muted: `#999`
- Border: `#e5e5e5`
- Card background: `#fff`
- Tag background: `#f0f0f0`
- Tag text: `#666`
- Max-width: `800px`
- Font: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

Sections to style:
1. **Reset & base** — box-sizing, smooth scroll, body background/font
2. **Layout** — `.container` max-width 800px centered, section padding (48px), section borders
3. **Section labels** — 12px uppercase, letter-spacing 1px, color #999
4. **Hero** — larger padding top (80px), name at 36px bold, one-liner at 16px, links row with underline hover
5. **About** — 15px text, 1.8 line-height, max-width 600px
6. **Experience** — flex rows, company bold, role gray, year right-aligned
7. **Featured project cards** — white bg, 1px border #e0e0e0, 12px border-radius, 28px padding. Title 18px bold. Badge: black bg, white text, small pill. Tech tags: small gray pills. Links: underline with arrow.
8. **Other projects** — rows with bottom border, name bold, description gray inline, link right
9. **Skills** — category label bold, values as plain text
10. **Contact** — link row with underline hover
11. **Responsive** — at 768px: reduce padding to 32px, hero name to 28px. At 480px: further reduce, stack experience rows if needed.
12. **Interactions** — link underlines on hover, subtle transitions (0.2s), card hover with slight shadow increase

- [ ] **Step 2: Commit**

```bash
git add styles.css
git commit -m "feat: complete CSS styling for minimal light theme"
```

---

### Task 3: Write JavaScript

**Files:**
- Create (overwrite): `script.js`

- [ ] **Step 1: Write minimal script.js**

Only what's actually needed:
1. **Smooth scroll** for any anchor links (if we add a nav later)
2. **Scroll-triggered fade-in** for project cards and sections — start at opacity 0 / translateY(20px), animate in on intersection. Subtle, not dramatic.

That's it. No hamburger menu (no nav), no form handling (no form), no parallax.

- [ ] **Step 2: Commit**

```bash
git add script.js
git commit -m "feat: add minimal JS for scroll animations"
```

---

### Task 4: Visual review and polish

- [ ] **Step 1: Open in browser and review**

Open `index.html` in browser. Check:
- Overall feel matches the mockup — clean, minimal, light
- Typography hierarchy looks right
- Featured project cards look good
- Other projects list is compact and clean
- Skills section is readable
- Mobile view (resize to 375px width) looks good
- All links point to correct URLs
- Images load for projects that have them

- [ ] **Step 2: Fix any issues found**

Adjust spacing, typography, colors as needed.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "polish: visual refinements after review"
```

---

### Task 5: Clean up

- [ ] **Step 1: Remove docs/superpowers directory**

The specs and plans were useful for development but shouldn't ship to the live site.

```bash
rm -rf docs/
git add -A
git commit -m "chore: remove development docs"
```

- [ ] **Step 2: Add .superpowers to .gitignore if not present**

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: add .superpowers to gitignore"
```

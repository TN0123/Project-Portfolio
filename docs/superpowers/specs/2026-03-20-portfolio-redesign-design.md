# Portfolio Website Redesign — Design Spec

## Overview

Rebuild personal portfolio site from scratch with a minimal, clean aesthetic. Static HTML/CSS/JS — no framework needed. Hosted via GitHub Pages on the existing `Project-Portfolio` repo. New branch for the rebuild.

## Aesthetic

- **Light background** (#fafafa / white), dark text (#111)
- **Monochrome palette** — black, grays, white. No accent colors.
- **Inter font** (already in use, keep it)
- **Small uppercase section labels** with letter-spacing as section headers
- **Generous whitespace**, content-first, no visual noise
- **Subtle interactions** — underlines on hover, smooth transitions. No floating animations or glow effects.
- **Inspiration:** Linear, Vercel, Stripe dev pages

## Sections (top to bottom)

### 1. Hero / Intro
- Small label: "SOFTWARE ENGINEER"
- Name large: "Tanay Naik"
- One-liner: "CS @ UMD · Incoming SWE @ Google · Building things that matter"
- Links row: GitHub, LinkedIn, Email — underline style

### 2. About
- Section label: "ABOUT"
- 2-3 sentences that actually sound like Tanay — direct, casual but thoughtful. Not a LinkedIn bio. Something like: what I'm about, what I care about building, my approach. Will be written during implementation to get the voice right.

### 3. Experience
- Section label: "EXPERIENCE"
- Clean list: Company name (bold), role (gray), year (right-aligned)
- Entries: Google (Incoming SWE, 2026), Capital One (ML Intern, 2025), SociableAI (Full-Stack Dev Intern, 2024-2025), IBM (Research Intern, 2024), UMD CS TA (Teaching Assistant, 2024)

### 4. Featured Projects
- Section label: "FEATURED PROJECTS"
- Cards with white background, subtle border, rounded corners
- Each card: title, optional badge (e.g. "1st Place"), description (2-3 sentences), tech tags (small gray pills), links (underline arrows)
- Featured projects (order):
  1. CallCode — voice-first multi-agent coding interface, hackathon winner
  2. Schematic — AI productivity workspace, 65+ users
  3. Iterator — multi-agent code generation system
  4. DataVision — automated data analyst from CSV files
  5. Cerebro — hands-free browsing via CV, hackathon winner
  6. Google Docs MCP Server — MCP integration for Google Docs

### 5. Other Projects
- Section label: "OTHER PROJECTS"
- Compact list rows: project name (bold), short description (gray, inline), link arrow
- Entries: StockDigestAI, FaceLogger, LLTrainer, Carbon Emissions Visualizer

### 6. Skills
- Section label: "SKILLS"
- Grouped by category, plain text (not tags):
  - **Languages:** Python, TypeScript, Java, C, Rust, OCaml, SQL
  - **ML / AI:** PyTorch, Hugging Face, LangChain, RAG, fine-tuning (LoRA, RLHF, GRPO)
  - **Web:** Next.js, React, Node.js, Tailwind, Prisma, PostgreSQL, Vercel
  - **Tools:** Docker, Git, AWS, CUDA, MCP

### 7. Contact / Footer
- Section label: "CONTACT"
- Row of links: email, GitHub, LinkedIn
- Minimal footer, no heavy styling

## Layout

- Single column, max-width ~800px, centered
- Sections separated by subtle borders (1px #e5e5e5)
- No fixed navbar — page is short enough to scroll. Could add a minimal nav later if needed.
- Mobile responsive — single column scales down naturally, just adjust padding and font sizes

## Technical Constraints

- Static HTML + CSS + vanilla JS only (GitHub Pages)
- No build step, no framework
- Keep image assets from current site (callcode.jpg, logos) for project cards if useful
- New branch off main for the rebuild
- Mobile-first responsive design

## Files

- `index.html` — all content
- `styles.css` — all styling
- `script.js` — minimal JS (mobile nav toggle, smooth scroll, maybe scroll animations)
- Existing images carried over as-needed

## What's NOT included

- No contact form (just email link)
- No dark mode toggle (can add later)
- No blog section
- No fancy animations or parallax

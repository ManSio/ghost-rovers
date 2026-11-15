# AGENTS.md: build rules for Antigravity (and any coding agent)

Same rules as CLAUDE.md. Read it and the PRD before writing code.

- Build only the block you are given. Propose a plan first and wait for approval.
- DO NOT refactor or touch code outside the block.
- Stack: plain HTML, CSS, vanilla JS (ES modules), data/ghosts.json (Moon) and data/mars.json (Mars). No framework, no build step. GitHub Pages.
- Files: index.html, styles/tokens.css, styles/base.css, styles/screen.css, styles/plot.css, styles/console.css, styles/modals.css, styles/tablet-landscape.css, styles/tablet-portrait.css, styles/phone.css, js/main.js, js/globe.js, js/data.js, js/projection.js, js/markers.js, js/card.js, js/still-answering.js, styles/still-answering.css, data/ghosts.json, data/mars.json, assets/.
- One file, one job. No file over 500 lines. If a change would push a file past 500 lines, or give it a second job, stop and propose a split before writing the code.
- Known exceptions, to be split in v2: js/main.js (one startApp() function) and js/card.js (one initPanels() function). Do not add new features to them. New features go in a new file with one job. Bug fixes inside them are allowed.
- textContent only. No innerHTML, no eval. try/catch on fetch with an error state.
- WCAG 2.1 AA, keyboard and screen reader, 44 px targets, prefers-reduced-motion.
- Log what you built in AI_DISCLOSURE.md under the Antigravity row.

## Design is like-for-like (read this before any UI work)

The approved design is the spec, not inspiration. Build it like-for-like.

- Source of truth, in this order:
  1. design/mission-control-prototype.dc.html: exact values (layout px, colors, fonts, copy, ghost data, boot sequence, sounds, key handling). It is a Claude Design canvas file and will NOT run on its own. Read its markup, inline styles, and the Component class as the spec, then rebuild it in plain HTML/CSS/JS.
  2. docs/design-screens/desktop-*.png: the 5 desktop states (boot, console ready, ghost picked, calling, signal returned). The "Clicked" bubbles are recording artifacts, not UI.
  3. docs/design-screens/phone-*.png and tablet-*.png: phone (390 px) and tablet (820 px, 1180 px) layouts.
- Before calling any UI block done, open the page in the browser subagent at 1280, 1180, 820, and 390 px wide, screenshot each, and compare side by side with the matching design screen. List every difference you see.
- Match layout, colors, fonts, sizes, spacing, radii, copy, and behavior exactly. Do not restyle, simplify, swap fonts, or "clean up" anything.
- If something in the design can't be built as shown, stop and say so. Do not substitute your own version.
- Improvement ideas are welcome. List them separately as SUGGESTIONS with a one-line why. Do not build any suggestion until Shara approves it.

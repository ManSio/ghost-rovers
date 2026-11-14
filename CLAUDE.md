# CLAUDE.md: Ghost Rovers (NASA Space Apps 2026)

Instructions for any Claude session working on this project. Read PRD first.

## Project
- Ghost Rovers: an interactive 1969 Mission Control console where kids (ages 8 to 12) check on 6 machines NASA left on the Moon.
- Challenge: Abandoned but not Forgotten. Team: Clew Labs (La Shara Cordero). Local event: Los Angeles, virtual.
- Deadline: Sun Nov 15, 2026, 11:59 p.m. PST. Target submit: 9:00 p.m.
- PRD (source of truth): https://claude.ai/artifact/UQWZHXkKedKnvDEjFTnuSV
- Design canvas: https://claude.ai/artifact/CweXPyxzXwmMhvYCn2ERnv (direction C, Mission Control 1969, is locked)

## How we work
- PRD first. Decisions in the PRD are final. If something conflicts, say so in one line and follow the PRD.
- MUST / STUB / NEVER labels. STUB = a comment with implementation notes, not a half feature.
- One file, one job. Mock data first, then real data.
- Block by block with a PASS/FAIL gate. Propose, Shara approves, then implement. Do not refactor other code.
- Verify claims against files and NASA sources, not memory.

## Hard rules
- textContent, never innerHTML. No eval(). No API keys. try/catch on every fetch with a visible error state.
- WCAG 2.1 AA. 44 px targets. Visible focus. Reduced motion respected. Phone, tablet, desktop.
- No runtime AI. No accounts, tracking, or ads.
- Space Apps calls AI "Super Intelligence (SI)". Use that term in anything submitted.
- No NASA logos, flags, or mission identifiers in anything SI-made. SI images get a visible watermark.
- Every fact must match NSSDCA before submit. Log every SI use in AI_DISCLOSURE.md, including where ideas came from.

## Writing style
- Short, plain, warm. No em dashes. No AI cliches.

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

# Before / after screenshots

Evidence for the audit issue. Each image is one screen, one set of actions, captured twice:

- **left** — `8aa1a68` (the `main` this audit started from),
- **right** — branch `audit/fixes` in this fork.

Captured with headless Chromium at the viewport named in each file, device scale 1, `Cache-Control: no-store`, same script for both sides. The only difference between the two halves is the code.

| File | What it shows |
|---|---|
| `1-beam-820.png` | 820×1180, `[1] Laser Mirror`, `CALL GHOST`: the beam ends 184 px right of the A11 square, then lands in it |
| `2-call-360.png` | 360×674, file open: `CALL GHOST` cut by the bottom edge (24 of 48 px visible), then fully visible |
| `3-answer-390.png` | 390×844, tapping the second question: the answer sits above the buttons, then scrolls into view |
| `4-landscape-844.png` | 844×390 phone held sideways: a 271 px portrait column with black margins, then a rotate prompt |
| `5-tablet-clock-820.png` | 820×1180 clock strip: the Moon value and its label are clipped, then they fit |
| `7-globe-4k.png` | 3840×2160, 1:1 pixels of the globe: 0.37 backing pixels per CSS pixel, then 0.93 |

Not captured: the 6 px clip on the "57 YRS · 03 MOS · 26 DAYS" plate (row 10 of the issue) — at that size the difference is not visible in a screenshot, so it is reported as a measurement only.

# Decision Log: Ghost Rovers

| When (PST) | Decision | Why |
|---|---|---|
| Sat Nov 14, 7:55 a.m. | Enter NASA Space Apps 2026, solo team possible | Event is live Nov 14-15 |
| Sat Nov 14, 8:00 a.m. | Challenge: Abandoned but not Forgotten | Smallest strong fit; challenge text suggests clickable ghost rovers |
| Sat Nov 14, 8:00 a.m. | Team Clew Labs created, LA virtual event | Required to submit |
| Sat Nov 14, 8:13 a.m. | Domain: ghostrovers.study (to claim) | Free Space Apps offer; fits a learning tool |
| Sat Nov 14, 8:20 a.m. | Stack approved: HTML/CSS/vanilla JS, JSON, GitHub Pages; Three.js globe only if spike passes | Most hours left for design |
| Sat Nov 14, 8:20 a.m. | Antigravity replaces Kiro for the build | Kiro credits low |
| Sat Nov 14, 8:34 a.m. | WCAG 2.1 AA, phone + tablet + desktop required | Kids on school tablets and phones |
| Sat Nov 14, 8:56 a.m. | Design direction: Mission Control 1969 | Most original; console buttons are the interface |
| Sat Nov 14, 9:01 a.m. | Add power-on opening, ghost check, live Moon clocks, kid Q&A | Creativity and Presentation scores; teaches real science through play |
| Sat Nov 14, 9:01 a.m. | No live AI chat; curious kids get pre-written Q&A, NASA links, a study notebook | Accuracy and kid safety |
| Sat Nov 14, 9:12 a.m. | Use the term Super Intelligence (SI) in all submission text; record idea origins honestly | 2026 FAQ and Submission Guide wording |
| Sat Nov 14, 9:16 a.m. | Kickoff call (as heard by Shara): SI may be used to brainstorm and help pick the idea, design, and stack | Confirms our workflow is within the rules |
| Sat Nov 14, 9:20 a.m. | Shara owns: ghost names, Mission Control voice, the why. Voice is a STUB until she is well enough to record | Judges look for human creativity |
| Sat Nov 14, 9:40 a.m. | Main Moon screen gets a curved, movie-style look; side screens angle in. Disclosure notes Shara's Sep 10 pre-event brainstorm notebook | Feels like Houston in the movies; honest record of Shara's prep |

- Nov 14, 10:27 a.m.: Design is like-for-like for Antigravity. Agent may suggest improvements but builds none without Shara's approval. Added to AGENTS.md and CLAUDE.md.
- Nov 14, 10:40 a.m.: Added 5 desktop state screenshots to docs/design-screens (from the prototype GIF). AGENTS.md now ranks design sources and requires browser-subagent screenshot comparison before any UI block is done.
- Nov 14, 10:57 a.m.: Block 1 spike PASSED on Shara's Android phone. Globe (Three.js 0.187.0): load 1,412 ms (limit 3,000), 60 FPS, smooth spin, marker opens on first tap. Moon oversized on phone; not a spike criterion, real build sizes to design.
- Nov 14, 10:58 a.m.: Shara chose the spinning 3D globe (Three.js 0.187.0) for the real build, replacing the flat disk on the main screen. At rest it must match the design's near-side view; needs a 'face Earth' reset so kids can't lose the landing sites.
- Nov 14, 11:15 a.m.: Block 3 fact check done against NSSDCA (see docs/FACT_CHECK.md). 6 ghosts verified; 5 wording fixes, landing seconds added, coordinates refined, each ghost linked to its own NSSDCA record.
- Nov 14, 11:18 a.m.: Shara approved a third ASK button per ghost ('What's it made of?') with built-with facts from NSSDCA. Chosen over a new spec panel to keep the design like-for-like. Ships with the fact-check fixes after Block 4.
- Nov 14, 12:00 p.m.: After live review, Shara approved Block 5: fit-to-screen, RESET CONSOLE, CALL GHOST explainer, photo takes over main screen on pick (Moon shrinks to corner map, BACK TO MOON; changes the 'Moon is hero' rule only after a pick), no scanlines on text, styled clearable answers, NASA RECORD in new tab, clickable timeline, TODAY row. Plus kid-POV adds (Claude suggested, Shara picked): laser beam show for the Laser Mirror, READ TO ME, mission-complete badge, DRAG TO SPIN hint. Skipped: quiz mode.
- Nov 14, 12:15 p.m.: Claude added share and SEO files: favicon (original Moon and reticle icon, no NASA branding), og-image.png (1200x630, 'SI-assisted image' watermark, Moon crop only), robots.txt, sitemap.xml, llms.txt, and docs/head-snippet.html for index.html <head>. URLs use the GitHub Pages address until ghostrovers.study is claimed.
- Nov 14, 12:18 p.m.: Public study notebook live (anyone with the link, copies allowed): https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378 . Sources: NSSDCA record text for all 6 machines (pasted; link import failed), JPL laser ranging article, NSSDCA LRV page, NASA ALSJ ALSEP history. Wire to the 'Go deeper' link.
- Nov 14, 12:30 p.m.: Shara generated a NotebookLM Audio Overview in the study notebook (mentions Ghost Rovers and Clew Labs): https://notebooklm.link.google/6jQu39y3UHio . Logged as SI audio in AI_DISCLOSURE.md. Shara's own Mission Control voice clips remain a v2 plan.
- Nov 14, 12:45 p.m.: Study notebook now includes a 'Ghost Rovers: App Guide' source (the 6 checked ghost files) and Studio items made with Ghost Rovers prompts for ages 8 to 12: Flashcards (easy, text only), Quiz (easy, text only), Mind Map. Skipped image-making tools (Video, Slide Deck, Infographic) to avoid SI image watermark and NASA-branding risk. Approved app fixes: LISTEN (AI VOICES) audio link, single-dot corner map, ON THE MOON FOR counter plus status in the takeover's empty space.
- Nov 14, 12:50 p.m.: Study tool links (public, inside the shared notebook): Quiz https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378/artifact/16590fae-9e4f-4a0a-ba03-4c358ff32eb4 ; Flashcards https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378/artifact/4f152dbc-f384-42c2-9dde-87a6737de1c1 ; Mind Map https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378/artifact/84801d62-dea7-4568-b396-a85e777e915d
- Nov 14, 12:45 p.m.: Shara listened to the Moon Podcast (Audio Overview) and reports it checks out.
- Nov 14, 1:12 p.m.: Judge-lens review (Claude): Presentation weakest until video and slides. Shara approved Block 6 upgrades: answer teletype and highlight, clickable legend rows, ABOUT panel (validity, SI, credits), FOR TEACHERS line, axe and keyboard accessibility pass. Video and submission scheduled later today.
- Nov 14, 2:15 p.m.: Shara chose FULL Mars mode (not Lite). Claude fact-checked 6 Mars ghosts against NSSDCA plus NASA/JPL sources: Viking 1, Viking 2, Sojourner, Spirit, Opportunity, InSight. Draft data in data/mars.json (draft:true), log in docs/FACT_CHECK_MARS.md. Mars twist: none answer yet. Kid hook: kids named Sojourner (age 12) and Spirit and Opportunity (a third grader).
- Nov 14, 1:43 p.m.: Shara approved the 6 Mars ghosts and the 'none answer yet' twist. Block 6b (pinned links row, ABOUT · TEACHERS) pushed as 976cf35.
- Nov 14, 2:30 p.m.: Study notebook renamed 'Ghost Rovers: Study Notebook (Moon and Mars)'. Added 2 Mars sources (Mars app guide, NASA Mars records). New Mars study tools (easy, text only): Quiz https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378/artifact/8aadc4fb-082f-4480-8e58-87a441b310e6 ; Flashcards https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378/artifact/a4b7a31a-a118-41e8-8546-850d7beb838e ; Mind Map https://notebook.google.com/notebook/c43a9882-26f7-4223-a46c-3f5c332dd378/artifact/12879205-9943-4eb8-892d-d3e87302e118 . Moon tools unchanged. Mars podcast: Shara to generate if wanted.
- Nov 14, 3:55 p.m.: Claude updated README, llms.txt, architecture.png, share card, and demo GIF for Mars (12 machines, 1 answers). GIF now shows Moon laser, Moon takeover, then Mars InSight NO SIGNAL.

- 2026-11-14 15:55 PST: Moon boot line 5 changed from "LAST CREW LEFT: DECEMBER 1972" to "6 MORE ON MARS. PRESS M." so kids learn Mars exists on the opening screen. Swapped instead of added so the boot screen keeps the same height on small laptops; DEC 1972 still shows in the top clock bar.

- 2026-11-14 16:35 PST: Added the 500-line, one-job file rule to AGENTS.md (it was only in CLAUDE.md, so Antigravity never saw it). js/main.js and js/card.js are listed as known exceptions, to be split in v2 after submission. AGENTS.md file list updated for mars.json and the 8-file CSS split (responsive.css split into tablet-landscape, tablet-portrait, phone so every CSS file stays under 500 lines).

- 2026-11-14 17:25 PST: Demo video approved by Shara (26.9 s, narrated with Kokoro-82M, Quindar-style radio tones). Saved to docs/media/ghost-rovers-demo.mp4. Recorded from commit 051432e. Closing card shows built teacher resources, not v2 items.

- 2026-11-14 18:02 PST: Demo video published on YouTube (Unlisted): https://youtu.be/a_sWWLi5-Xw. Linked from the README header GIF, the README link row, and llms.txt.

- 2026-11-14 19:30 PST: Added the Mars "still answering" row (Option 2). After the 6 Mars ghosts, the badge panel links to Curiosity and Perseverance, the 2 working rovers. They are links, not ghosts, because they are not discarded. Built by Claude as a new one-job file (js/still-answering.js + styles/still-answering.css) so main.js and card.js stay untouched. Mars TODAY line now reads "These 6 are quiet. 2 newer rovers still answer." Badge shrinks only while the row shows so the panel fits at 1280, 820 and 390 px. axe: 0 violations with the panel open. Wording rule: never say no machine on Mars answers.

- 2026-11-14 20:20 PST: Took the rover contest winners' names out of the app and docs. Both were kids when they won (Sojourner, age 12; Spirit and Opportunity, third grade), and the brief says no minor's name. The cards keep the story ("A 12-year-old girl won a contest"). Sources in docs/FACT_CHECK_MARS.md still point to the JPL and ShareAmerica pages, which carry the names.

- 2026-11-17: Merged ManSio's PR #1 (10 fixes: phone fit, laser aim, dialogs, Mars load, 4K Moon, phone type scale). Held until judging ended so the judged site matched the submission. The v1-submitted tag still marks the submitted version. PR #4 (translations) waits for a rebase and native-speaker reads.

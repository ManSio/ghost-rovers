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

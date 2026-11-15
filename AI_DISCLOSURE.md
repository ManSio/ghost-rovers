# Super Intelligence (SI) Disclosure: Ghost Rovers

NASA Space Apps 2026 uses the term **Super Intelligence (SI)** in place of AI (per the Sep 29, 2026 U.S. Executive Order, as stated in the Space Apps Participant FAQs). SI covers LLMs, chat assistants, image and video generators, foundation models, and code generators. This file names every SI tool and what it did. It is updated as the build goes.

Note from the 2026 Project Submission Guide: the form's SI answer is for data collection and is **not seen by judges**. Judges see the SI indicators inside the project itself (watermarks, descriptive text, metadata). So this disclosure also lives in the README and on the site's credits.

Tagline: AI assisted. Human approved.

## Where the idea came from (honest record)

The guide says SI "should not be used to come up with your idea of how to solve the challenge." On the Nov 14, 2026 kickoff call, organizers clarified (as heard by Shara) that using SI to brainstorm, help pick the idea, the design, and the stack is allowed. We record idea origins anyway, so judges can see the human decisions:

| Piece | Origin |
| --- | --- |
| Pre-event brainstorming | Sep 10, 2026: Shara created a Google Gemini Notebook to collect NASA sources (lunar surface tech, the IBM-NASA lunar foundation model, past winners) and brainstorm Space Apps ideas, two months before the event |
| Challenge choice | Shara chose from all 14 challenges after reviewing them with Claude |
| Clickable ghosts on a Moon map | Suggested in the challenge text itself ("an interactive map of the Moon with clickable ghost rovers") |
| 3 design directions | Proposed by Claude; Shara picked Mission Control 1969 and pushed for a 1969-accurate look |
| Power-on opening, ghost check, live Moon clocks | Proposed by Claude after Shara asked for a competitive design; Shara approved and asked how to serve curious kids |
| Kid Q&A, NASA links, study notebook | Study notebook was Shara's idea; Q&A format proposed by Claude |
| 1969 accuracy | Shara rejected the first Mission Control mockup as not looking like 1969 and pushed for real period detail |
| Ghost names | Shara, using her own naming convention (in progress) |
| Mission Control voice | Shara records the radio voice herself (planned; human audio, not SI) |
| Why this project | Shara: "I love helping people and teaching people and learning." |

## Who did what

| Tool | Used for | Human role |
|---|---|---|
| Claude (Anthropic, claude.ai, Claude Opus 5.5) | Research on rules, challenges, and NASA data; PRD and build plan; 3 design direction mockups and the Mission Control prototype; the Python script that renders the Moon from NASA's map; draft kid stories and Q&A; browser help (team setup, downloading NASA images); this disclosure. Claude made the favicon, share image (watermarked 'SI-assisted image'), robots.txt, sitemap.xml, and llms.txt. | Shara Cordero picked the challenge, the direction, and every gate. All facts are checked against NASA sources before submit |
| Gemini Notebook (Google) | Pre-event research and brainstorm notebook Shara built on Sep 10, 2026: NASA lunar news, past winners, early project ideas | Shara created the notebook, chose and added the sources, and drove the brainstorm |
| Gemini Notebook (Google), public study notebook | Public "Ghost Rovers: Study Notebook" linked from the app's GO DEEPER button. Built Nov 14, 2026 from NASA sources (NSSDCA record text, JPL, NASA LRV page, NASA ALSEP history). Its Audio Overview is AI-generated audio (two AI voices): https://notebooklm.link.google/6jQu39y3UHio | Shara generated the Audio Overview and chose to share it. Claude assembled the sources. The audio is not part of the app; it lives in the notebook and is labeled AI-generated |
| Antigravity (Google) | Built Block 1 mobile performance spike (`spike/flat.html` and `spike/globe.html`) comparing the 2D Moon disk against a Three.js 0.187.0 3D Moon globe; built Block 4 responsive Mission Control 1969 console (`index.html`, `styles/`, `js/`, `data/ghosts.json`) with the Three.js 0.187.0 3D Moon globe, 4 site pin overlays, `FACE EARTH` control, boot sequence, live clocks, Web Audio sounds, and phone bottom sheet; built Block 4b applying NSSDCA fact-check updates, adding the third "What's it made of?" ASK button, adding the resized NASA hardware photos, and building the 1969 full-screen photo viewer modal; built Block 5 kid-test fixes (fit-to-window scaling, `RESET CONSOLE`, `CALL GHOST` explainer, photo takeover with corner globe and `BACK TO MOON`, clean text backgrounds without scan lines, clearable amber `ANSWER:` box, clickable timeline with `TODAY` row, Earth-to-Moon laser show for the Laser Mirror, `READ TO ME` speech synthesis, `DRAG TO SPIN` hint, and the `<canvas>` Junior Flight Controller badge); built Block 5b layout fixes, `<head>` metadata snippet, `measureText` badge fitting, and study notebook link; built Block 5c adding the Moon Podcast link, single-dot clickable corner Moon map, photo-takeover live `ON THE MOON FOR` counter and status line, top-left Earth placement outside the Moon during the laser show, and mission-complete study tool links (`QUIZ`, `FLASHCARDS`, `MIND MAP`); built Block 6 adding the highlighted `16 px`/`15 px` teletype answer reveal with Web Audio start beep, clickable legend rows (`A-11`, `A-12`, `A-15`, `A-17`), the `ABOUT` modal dialog with `FOR TEACHERS` note and `?` shortcut, and passing the `axe-core` WCAG 2.1 AA contrast and keyboard audit; built Block 7 adding Mars mode (`MOON` / `MARS` clock-strip toggle, `#mars` URL deep-linking, `M` keyboard shortcut, per-world state preservation, 3D Mars globe with NASA/JPL/USGS Viking color map, 6 Mars ghosts and landing sites from `data/mars.json`, per-world `studyLinks`, and mission-identifier-free Moon and Mars badges); added SI disclosure headers to all code/data files and visible "SI-assisted image" labels to design screenshots and demo GIFs | Shara approves each block (propose, approve, implement) |
| GitHub Copilot Free | Available through the Space Apps Global Offer. Not used so far | n/a |

## SI-generated content in the project

| Content | Made by | Disclosure |
|---|---|---|
| Code (HTML, CSS, JS, Python) | Written with Claude, later Antigravity | Noted here, in README, and in a header line in every code and data file. |
| Kid stories and Q&A text | Drafted by Claude in a kid's voice | Marked draft until fact-checked against NSSDCA; final text reviewed by Shara |
| Moon image | Rendered by a script (tools/render_moon.py) from NASA's LRO color map. Not a generative AI image | NASA data, reprojected only. Credited to NASA/GSFC SVS |
| NASA photos | Real NASA photos, resized only. Some get a CSS tint (grayscale or sepia) in the design | Credited with NASA ID numbers |
| Share image (assets/meta/og-image.png) | Composed by Claude from a screenshot of the app plus text | Visible "SI-assisted image" label on the image. No NASA logos or insignia |
| Demo video (docs/media/ghost-rovers-demo.mp4, 26.9 s) | Made by Claude: title and closing cards built in the app's own look, the live app recorded by a script, captions timed by the recorder | Visible "SI-assisted video" label on every frame, and in the file's metadata. NASA photos and data are NASA's, credited on screen |
| Demo slides (docs/media/ghost-rovers-slides.pdf, 7 slides) | Made by Claude in the app's own look, with app screenshots | "SI-assisted slides" footer on every slide; screenshots carry the "SI-assisted image" label |
| Demo narration and sounds | Synthetic voice by Kokoro-82M (Apache 2.0, an AI voice, not a clone of anyone). App sounds re-created from the app's own Web Audio code; Quindar-style radio tones and static made in code | Named on the closing card ("Synthetic narration: Kokoro-82M") and in the video file's metadata |
| Study notebook Audio Overview | AI voices generated by Google NotebookLM / Gemini Notebook, started by Shara | Lives in the public notebook, not in the app. Listed here as SI-generated audio |
| Design screenshots, prototype GIF, demo GIF, diagrams, share image | Made with Claude from the SI-built prototype or app | Each carries a visible 'SI-assisted image' label. No generative art. No NASA logos or insignia. |

## Rules we follow (2026 Project Submission Guide, Nov 13, 2026)

- SI is allowed as a tool to speed up and support the work. SI should not be used to come up with the idea of how to solve the challenge (see the honest record above).
- Images and video made with SI carry a visible watermark.
- Audio made with SI is acknowledged in text and metadata.
- Code and data made with SI are acknowledged in text and metadata.
- SI content never uses or changes NASA branding: no logos, flags, or mission identifiers.

## Text for the "Use of Super Intelligence (SI)" form field

Ghost Rovers was built by La Shara Cordero with Super Intelligence (SI) assistance, under a human-approval workflow. Claude (Anthropic) was used for research, planning, design mockups, code, and first drafts of the kid-voice stories. Gemini Notebook (Google) was used for pre-event research. Antigravity (Google) was used to build the final site. Every NASA fact was checked by hand against NASA's NSSDCA records. The Moon image is NASA's LRO map, reprojected by a script; SI-assisted images (design screenshots, diagrams, share card, demo GIF) carry a visible 'SI-assisted image' label, and no NASA branding appears in SI-made content. Full log, including where ideas came from: AI_DISCLOSURE.md in the repo.

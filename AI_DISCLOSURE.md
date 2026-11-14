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
| Claude (Anthropic, claude.ai, Claude Opus 5.5) | Research on rules, challenges, and NASA data; PRD and build plan; 3 design direction mockups and the Mission Control prototype; the Python script that renders the Moon from NASA's map; draft kid stories and Q&A; browser help (team setup, downloading NASA images); this disclosure | Shara Cordero picked the challenge, the direction, and every gate. All facts are checked against NASA sources before submit |
| Gemini Notebook (Google) | Pre-event research and brainstorm notebook Shara built on Sep 10, 2026: NASA lunar news, past winners, early project ideas | Shara created the notebook, chose and added the sources, and drove the brainstorm |
| Antigravity (Google) | Built Block 1 mobile performance spike (`spike/flat.html` and `spike/globe.html`) comparing the 2D Moon disk against a Three.js 0.187.0 3D Moon globe; built Block 4 responsive Mission Control 1969 console (`index.html`, `styles/`, `js/`, `data/ghosts.json`) with the Three.js 0.187.0 3D Moon globe, 4 site pin overlays, `FACE EARTH` control, boot sequence, live clocks, Web Audio sounds, and phone bottom sheet; built Block 4b applying NSSDCA fact-check updates, adding the third "What's it made of?" ASK button, adding the resized NASA hardware photos, and building the 1969 full-screen photo viewer modal | Shara approves each block (propose, approve, implement) |
| GitHub Copilot Free | Available through the Space Apps Global Offer. Not used so far | n/a |

## SI-generated content in the project

| Content | Made by | Disclosure |
|---|---|---|
| Code (HTML, CSS, JS, Python) | Written with Claude, later Antigravity | Noted here, in README, and in file headers |
| Kid stories and Q&A text | Drafted by Claude in a kid's voice | Marked draft until fact-checked against NSSDCA; final text reviewed by Shara |
| Moon image | Rendered by a script (tools/render_moon.py) from NASA's LRO color map. Not a generative AI image | NASA data, reprojected only. Credited to NASA/GSFC SVS |
| NASA photos | Real NASA photos, resized only. Some get a CSS tint (grayscale or sepia) in the design | Credited with NASA ID numbers |
| Generative SI images | None so far | If any are added, they get a visible "SI-generated" watermark |

## Rules we follow (2026 Project Submission Guide, Nov 13, 2026)

- SI is allowed as a tool to speed up and support the work. SI should not be used to come up with the idea of how to solve the challenge (see the honest record above).
- Images and video made with SI carry a visible watermark.
- Audio made with SI is acknowledged in text and metadata.
- Code and data made with SI are acknowledged in text and metadata.
- SI content never uses or changes NASA branding: no logos, flags, or mission identifiers.

## Text for the "Use of Super Intelligence (SI)" form field

Ghost Rovers was built by La Shara Cordero with Super Intelligence (SI) assistance, under a human-approval workflow. Claude (Anthropic) was used for research, planning, design mockups, code, and first drafts of the kid-voice stories. Gemini Notebook (Google) was used for pre-event research. Antigravity (Google) was used to build the final site. Every NASA fact was checked by hand against NASA's NSSDCA records. The Moon image is NASA's LRO map, reprojected by a script; no SI-generated images are used, and no NASA branding appears in SI-made content. Full log, including where ideas came from: AI_DISCLOSURE.md in the repo.

# NASA Space Apps 2026: Smallest Viable Submission ("Ghost Rovers")

Status: approved direction, Sat Nov 14 2026.

Team: "Clew Suite" created Nov 14 (owner: earlgreyhot1701d), LA local event, challenge locked, accepting members ON.
Team page: https://www.spaceappschallenge.org/2026/find-a-team/clew-suite/

## Offer status
| Offer | Status |
|---|---|
| GitHub Copilot Free | Already active |
| Google Cloud $300 | Not claimed. Needs your card. https://cloud.google.com/free |
| Free domain | Not claimed. Pick a name at https://www.spaceapps.earth/ |

## The clock
| Item | Value |
|---|---|
| Event | Nov 14-15, 2026 (happening now) |
| Your local event | Los Angeles, CA (fully virtual, PST) |
| Submission closes | Sun Nov 15, 11:59 p.m. PST |
| Target submit time | Sun Nov 15, 9:00 p.m. PST (3-hour buffer) |
| Results | Global nominees Dec 2026, winners Jan 2027 |

Teams: a team of one is allowed. All teammates must be in the same local event (LA) or the Universal Event.

## Challenge
**Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars** (Beginner/Intermediate).
The challenge text suggests "an interactive map of the Moon with clickable ghost rovers." Storytelling-first, accuracy matters, any format allowed.
Data source named by the challenge: NASA Space Science Data Coordinated Archive (NSSDCA).

## What gets built
One static HTML page. A Moon image with 6 clickable markers. Each opens a short first-person story card for kids.

### MUST
- Single index.html + one data.json, no build step, GitHub Pages
- 6 artifacts, Moon only: Apollo 11 descent stage, Apollo 15 LRV, Apollo 11 retroreflector (still in use), Surveyor 3, Apollo 12 ALSEP, Apollo 17 LRV
- Each card: name, mission, year, where it sits, what it did, what science came from it, status now, source link (NSSDCA)
- Facts verified against NSSDCA, not memory
- Keyboard-accessible markers, alt text, readable at phone width
- textContent only, no innerHTML, no eval, no API keys

### STUB
- Mars tab (Sojourner, Spirit, Opportunity, Viking, InSight, Ingenuity)
- Audio narration
- Deep-space drifters (Pioneer, Kepler, Dawn)

### NEVER
- NASA logos, meatball, or mission patches in anything AI-generated
- Commercial promotion
- Any minor's name, voice, or likeness

## Demo
Slide deck, 5 slides (hard limit 7, including title; over = ineligible for global judging).
Must include: team name, member names, challenge, image of the project, user experience, how NASA data was used.

## Required submission fields
Project Name / High-Level Summary / Demo link / Final Project link / Detailed Description / NASA Data / Space Agency Partner & Other Data / Use of AI / Verification checkboxes. All English. Test every link in a private window.

## AI disclosure (required)
- Code: state it was AI-generated and which tools, in the form and the README
- AI images need a visible "AI-generated" watermark
- NASA photos: credit as NASA public domain, unmodified

## Build order (PASS/FAIL gate after each)
1. Spike (15 min): Moon image + one marker + one card on GitHub Pages. PASS = loads in private window on phone.
2. Data: 6 entries in data.json, each fact checked against NSSDCA.
3. Stories: 6 kid-voice cards, about 80 words each.
4. Polish: a11y pass, mobile pass.
5. Slides (5).
6. Submission form, link test, submit by 9 p.m. Sunday.

## Free Global Offers (2026)
| Offer | What you get | Card needed? | Notes |
|---|---|---|---|
| GitHub Copilot Free | 2,000 completions/month + limited chat/agent | No | Sign in to GitHub, pick Free plan |
| Google Cloud | $300 credit for 90 days | Yes (verification only) | No auto-charge after trial |
| Free domain + hosting (GoDaddy Registry via Porkbun) | 1 year domain + hosting + SSL | No | Non-premium domains only; email code to confirm |
| Microsoft Azure | $200 credit for 30 days | Yes | Phone + card verification |
| Microsoft Planetary Computer | Open Earth-science data catalog + STAC API | No | No account needed |
| Microsoft Copilot | Free AI assistant | No | copilot.com |
| Microsoft Teams Free | 100-person, 60-min meetings | No | |
| Meteomatics Weather API | 1,000 queries/day, hackathon duration | No | Form sign-up |
| Miro Business | 14-day trial | Yes | Cancel before day 14 |
| Miro hackathon templates | Free boards | No | |

Source: spaceappschallenge.org/2026/global-offers/

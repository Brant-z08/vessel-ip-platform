# OSU IP Commercialization Platform — Demo v1

**Owner:** Brant Zell
**Hard deadline:** July 16, 2026 (Ohio State TCO meeting; preview with Scott Griffith before)
**PRD:** `OSU-IP-Platform-PRD.md` — read before making significant architectural decisions.

---

## What this is

A password-protected web app that presents AI-generated "first principles" investment reports on Ohio State University technologies. The core value proposition: instead of a founder spending tens of hours sifting hundreds of OSU IP filings, this surfaces the highest-displacement-potential technologies in a readable, searchable report library.

This is a **demo** built on publicly available data (~30–50 curated technologies, not the full ~786 OSU catalog). The audience is Scott Griffith (potential investor in the Vessel/Founders United fund) and the OSU Technology Commercialization Office (TCO).

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database + Auth | Supabase (Postgres + Supabase Auth) |
| AI / Agent | Claude API — Sonnet 4.6 default |
| Deployment | Vercel (from GitHub) |

---

## Authentication model

- Email + shared password. **No account creation or self-signup.**
- A single shared password (or small set) distributed to Scott + the TCO team.
- All routes except `/login` require an active Supabase session. Enforce with Next.js middleware.

---

## Data model (high level)

Two core entities stored in Supabase:

**Technologies** — one row per OSU technology:
- Name, OSU web link, patent links, decks/white papers
- Industry/category tag (used for sort + search)
- Displacement potential score (for default sort order)
- Principal researcher(s), college, date disclosed, TRL, commercialization traction

**Reports** — one row per technology, written once by the agent and stored:
- The full first-principles report (stored, not regenerated on view)
- Confidence score

---

## The app (two views)

**List view** — searchable, sortable table of technologies. Default sort: highest displacement potential first. Sort/filter by industry tag. Each row shows name + minimal metadata.

**Detail view** — click a technology → full first-principles report rendered in the structure below.

---

## Report structure

1. Technology Related Links (OSU page, patents, decks, inventor bios)
2. Summary (3-sentence summary + one-line conclusion callout with 2–3 supporting bullets)
3. Technology Overview (what it is and how it works)
4. The Details (table: researchers, college, disclosure date, TRL, traction, market size estimate)
5. Thesis Analysis (parent section containing subsections 0–8):
   - 0. Application Selection (chosen application + TAM)
   - 1. Status Quo (current market, what buyers use today, where it falls short)
   - 2. New Value Transactions (gap-then-fill against the status quo)
   - 3. Value Overview (cost/price build-up; time saved / money saved / revenue enabled)
   - 4. Displacement Process (step-by-step buyer adoption walkthrough)
   - 5. Displacement Risks (switching costs, regulatory cycles, trust, inertia)
   - 6. Team Overview (inventor credentials, domain standing, commercial gap)
   - 7. New Entrants (competing efforts; is the gap open or contested?)
   - 8. Thesis Analysis Summary (Zone, TRL, confidence score woven into prose verdict)
6. Additional Applications (optional; omit if none genuine)

---

## The agent pipeline (10 steps)

The `first-principles-report` skill (`.claude/skills/first-principles-report/`) runs this sequence per technology:

1. **Ingest** all available data: OSU description, patent numbers/links, decks, white papers.
2. **Understand the technology** — confirm the agent grasps what it actually is.
3. **Select an application** — use the stated one if present; otherwise select the most practical market application.
4. **Research the buyer status quo** — who buyers are, what they buy, how the problem is solved today.
5. **Assess realistic performance** — from patent claims and available info, what can it realistically deliver? Assign a **confidence score**.
6. **Derive new value transactions** — translate performance into the new buyer experience vs. status quo.
7. **Quantify value outputs** — time saved, money saved, revenue enabled. Neutral; negatives are valid.
8. **Displacement process & risks** — what a buyer must do to switch: supply-chain, process change, regulatory/dev cycles.
9. **Team strength & right to win** — what positions the inventors to succeed.
10. **New entrants** — others building something similar.

**The Vessel investment thesis is an input to the agent.** It drives the displacement-zone judgment in the Thesis Analysis Summary. Obtain the displacement-zone rubric before building the agent.

---

## Core design principle: intellectual honesty

**The agent must be neutral and matter-of-fact — never optimistic, never pessimistic.** If a technology has no viable market application, the report says so plainly. "Limited potential" is a correct, valuable outcome. This principle governs every prompt and every report. The demo dataset deliberately includes a couple of honest "limited potential" verdicts to prove the product's filtering value.

---

## Build phases (to July 16)

| Phase | What | Window |
|---|---|---|
| 0 | Setup, Claude Code basics, read thesis + Airtrek memo | Days 1–3 |
| 1 | PRD signed off; name + design chosen | Days 2–4 |
| 2 | **Thin slice:** one technology through all 10 steps → one live password-protected report | Days 4–9 |
| 3 | Scale to ~30–50 set; list + sort/search; review every report | Days 9–18 |
| — | Buffer; preview with Scott | Days 18–21 |

**Phase 2 is the make-or-break milestone.** Once one report flows end-to-end, the rest is repetition, review, and polish.

---

## Key conventions

- **Never expose the `SUPABASE_SERVICE_ROLE_KEY` to the browser.** Use it only in server-side code (API routes or server components).
- **Never regenerate reports on page load.** Reports are written once by the agent and stored in Supabase.
- **Row-Level Security (RLS):** enable it on every Supabase table. Policy: authenticated users can read; only the service role can write.
- **Types:** define Supabase table types in `lib/types.ts`. Keep them in sync with the actual schema.
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Never commit `.env.local`.
- **Styling:** Tailwind utility classes only. No CSS modules or styled-components.

---

## Definition of done (demo v1)

- [ ] Live, password-protected URL
- [ ] ~30–50 technologies, each with a reviewed first-principles report
- [ ] List view with working sort + search by industry
- [ ] Detail view rendering the full report structure
- [ ] At least one honest "limited potential" report included
- [ ] Confidence scores present and sensible
- [ ] Previewed with Scott before July 16

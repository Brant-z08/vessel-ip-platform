# Product Requirements Document (PRD)
## Ohio State IP Commercialization Platform — Demo v1

**Owner:** Brant Zell
**Stakeholders:** [Colleague/originator], Scott Griffith (preview), Ohio State TCO (presentation audience)
**Tech support:** Khushi (tech-stack questions)
**Hard deadline:** Ohio State meeting ~July 16, 2026 (preview with Scott before)
**Status:** Draft for sign-off

---

## 1. Purpose & background

Ohio State spends $1B+ per year on research and generates a large patent portfolio but is weak at commercializing it into startups. Three groups touch commercialization; the key partner is the **Technology Commercialization Office (TCO)**, which holds the IP database.

There's an "incentive language barrier" between two groups this product serves:

- **Researchers** — motivated by tenure, patents, and grants, not commercialization. They disclose IP and often hear nothing back about its market potential.
- **Founders / operators** — must sift hundreds of IP filings, spending tens of hours, just to find out whether anything is worth pursuing.

This product bridges that gap: an AI agent runs a structured "first principles" market-displacement analysis on OSU technologies and surfaces the highest-potential ones, saving operators tens of hours and giving researchers an honest read on where their technology sits.

**Strategic context:** This is a demonstration built on publicly available data, without requesting TCO permission first, to *show* Ohio State (and Scott Griffith, a potential investor in the Vessel/Founders United fund) concrete delivered value rather than a pitch. It is also Brant's primary internship deliverable for the first half of summer.

---

## 2. Goals & non-goals

### Goals (demo v1, by July 16)
- A password-protected website presenting a curated set of OSU technologies as browsable, searchable first-principles reports.
- A working AI agent that produces each report through a defined 10-step pipeline, in under ~10 minutes per report.
- Reports that are intellectually honest — including negative verdicts — demonstrating the product's filtering value.
- A live link Scott and the TCO can log into and use.

### Non-goals (explicitly deferred to Phase 2+)
- Automated scraping of the OSU catalog (manual data entry for the demo).
- A conversational/chat interface.
- Covering all ~786 technologies (demo runs on a curated subset).
- User account creation, billing, or multi-user management.

---

## 3. Audiences & the value each gets

| Audience | What they get | Why it matters |
|---|---|---|
| **Researchers** | An honest, scientific read on their technology's market-displacement potential, framed in displacement-as-physics language they respect. | They finally get feedback instead of sending IP "into the void." |
| **Founders / operators** | A filtered, ranked shortlist — read ~100 summaries, deep-dive ~5, instead of researching ~1,000 filings. | Saves tens of hours; surfaces real opportunities. |
| **TCO / Scott (demo audience)** | Proof that Vessel delivers value beyond a check. | Drives the partnership / investment relationship. |

---

## 4. Core design principle: intellectual honesty

**The agent must be neutral and matter-of-fact — never optimistic, never pessimistic.** If a technology has no viable market application, the report says so plainly. "Limited potential" is a correct, valuable outcome, not a failure. The agent is assessing whether displacement *is* possible, not trying to make it work. This principle governs every prompt and every report.

---

## 5. Scope of the demo dataset

- **Size:** ~30–50 technologies (curated, not the full catalog).
- **Selection:** Brant selects, aiming for a deliberate mix:
  - A few with clear, strong displacement potential.
  - Several middling.
  - A couple of honest "limited market potential" verdicts.
  This mix proves the filtering and honesty that make the product valuable.
- **Industry spread:** include a range of colleges/industries so the sort-by-industry feature is demonstrable.
- **Data entry:** manual for the demo (copy from `innovate.osu.edu/available_technologies/` + patents from USPTO/Google Patents).
- *Open item:* confirm whether the colleague wants input on which technologies are chosen, and whether to weight toward industries the TCO cares about.

---

## 6. The agent (AI analysis pipeline)

The agent runs this sequence per technology. Each step is one or more prompts, iterated with the colleague ("rinse it through the prompts"). The **Vessel investment thesis is an input** to the agent (it drives the displacement-zone judgment).

1. **Ingest** all readily available data: OSU description, patent numbers/links, decks, white papers.
2. **Understand the technology** — confirm the agent grasps what it actually is.
3. **Select an application** — use the stated one if present; otherwise select the most practical market application to analyze.
4. **Research the buyer status quo** — who buyers are, what they buy, how the problem is solved today, in granular detail.
5. **Assess realistic performance** — from patent claims and available info, what can it realistically deliver? **Assign a confidence score.**
6. **Derive new value transactions** — translate performance into the new buyer experience vs. status quo.
7. **Quantify value outputs** — time saved, money saved, revenue enabled. Neutral; negatives are valid.
8. **Displacement process & risks** — what a buyer must do to switch: supply-chain impact, internal process change, regulatory/development cycles.
9. **Team strength & right to win** — what positions the inventors to succeed.
10. **New entrants** — others building something similar.

**Output:** a rendered first-principles report following the Airtrek memo structure (the format to match — noting most OSU technologies are pre-company, so the application-selection and confidence-scoring steps carry more weight than in a mature-company memo).

---

## 7. Report structure (the rendered output)

Each report contains, in order:
1. **Technology Related Links** — OSU web link, patent filing links, any decks/white papers.
2. **Technology Overview** — executive summary of the technology.
3. **The Details** — principal & secondary researchers, college, date disclosed, current commercialization traction, TRL.
4. **Application Selection** — the chosen application and why (especially for fundamental-research IP).
5. **Status Quo** — detailed breakdown of how the problem is solved today.
6. **New Value Transactions** — what the technology brings vs. status quo.
7. **Value Overview** — time saved / money saved / revenue enabled, with the **confidence score**.
8. **Displacement Process & Risks** — switching costs, process change, regulatory/dev cycles.
9. **Team Overview** — the inventors and their right to win.
10. **New Entrants** — competing/similar efforts.
11. **Thesis Analysis Summary** — overall displacement judgment scored against the Vessel thesis.

---

## 8. The software (product experience)

### Authentication
- Password-protected. User enters an **email address + a provided password**. **No account creation.**
- A single shared password (or small set) provided to Scott + the TCO team for the demo.

### Main list view
- A searchable, sortable list of the demo technologies.
- Each row: technology/patent name (+ minimal metadata).
- **Sort and search by industry/category tag.**
- Surfaces the highest-displacement-potential technologies near the top (the founder-facing filtering value should be visible).

### Detail view
- Click a technology → read its full first-principles report (Section 7 structure).

### Non-functional
- Clean, professional, fast. Deployed to a live URL (Vercel).
- Reports stored in the database so pages load instantly (no re-running the agent on view).

---

## 9. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Build tool | **Claude Code** | Writes the software + helps build the agent. |
| Framework | **Next.js (TypeScript)** | Front-end + back-end together; matches Buildvessel stack. |
| Styling | **Tailwind CSS** | Fast, easy to restyle. |
| Database + auth | **Supabase** | Stores technologies, patents, reports; handles the email/password gate. |
| AI / agent | **Claude API (Sonnet 4.6 default)** | Runs the 10-step pipeline; web research where needed. |
| Patent data | **USPTO / Google Patents** | Free, public. |
| Code hosting | **GitHub** | Version history. |
| Deploy | **Vercel** | One-click from GitHub. |

---

## 10. Build phases & timeline (to July 16)

| Phase | What | Window |
|---|---|---|
| 0 | Setup, Claude Code basics, read thesis + Airtrek memo | Days 1–3 |
| 1 | This PRD signed off; **name + design chosen** | Days 2–4 |
| 2 | **Thin slice:** one technology through all 10 steps → one live password-protected report | Days 4–9 |
| 3 | Scale to the curated ~30–50 set; build list + sort/search; review every report | Days 9–18 |
| — | Buffer; preview with Scott | Days 18–21 |
| 4+ | 🚩 Later: scraping, chat, full 786 | After July 16 |

The **thin slice (Phase 2) is the make-or-break milestone** — once one report flows end-to-end, the rest is repetition, review, and polish.

---

## 11. Cost

- **Claude API** (pay-as-you-go): a curated demo set runs in the **low-double-digit dollars total** on Sonnet 4.6; batch (50% off) and prompt caching (up to 90% off repeated input like the system prompt + thesis) reduce it further.
- **Claude Pro subscription** (~$20/mo) for Claude Code — the one worthwhile subscription.
- Supabase, Vercel, GitHub, patent data: **free tiers** cover the demo.
- **Realistic demo-phase total: ~$25–35 all-in.**

---

## 12. Open questions for sign-off

1. Demo set size — is ~30–50 right? Does the colleague want input on *which* technologies?
2. Will the colleague supply patent links/decks for the set, or does Brant pull them?
3. The demo password and who receives it.
4. Can Brant get the Vessel thesis's displacement-zone rubric as an explicit input to the agent?
5. Branding direction — echo Vessel, or stand alone like Gaia/Fathom/Manifest?

---

## 13. Definition of done (demo v1)

- [ ] Live, password-protected URL.
- [ ] ~30–50 technologies, each with a reviewed first-principles report.
- [ ] List view with working sort + search by industry.
- [ ] Detail view rendering the full report structure.
- [ ] At least one honest "limited potential" report included.
- [ ] Confidence scores present and sensible.
- [ ] Previewed with Scott before July 16.

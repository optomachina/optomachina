# TODOS

Captured during /plan-eng-review on 2026-05-08. Source design doc:
`~/.gstack/projects/optomachina-optomachina/blainewilson-optomachina/portfolio-polish-design-20260507-232735.md`

---

## TODO-1 — Per-asset clearance source log

**What:** Maintain `/content/sources.md` listing each project photo + drawing with its source URL (NASA gallery, observatory media gallery, vendor whitepaper, employer-granted publication, etc.).

**Why:** Codex flagged that "user assessed publicly available" is not the same as a documented audit trail. If a former employer or program ever asks "where did you get permission to publish that," `sources.md` is the answer.

**Pros:**
- Cheap audit trail (one entry per asset, ~2 minutes to add as we onboard each photo)
- Defensible if challenged
- Forces a moment of "did I actually verify this?" per asset
- Public — readers can see provenance, which is itself credibility-positive

**Cons:**
- Slight ongoing maintenance overhead (couple minutes per asset added)
- Public visibility of sources may be over-disclosure for some assets

**Context:** Blaine declined a build-time export-control gate (decision 4C) because his portfolio assets are publicly available. Codex argued (#1) that even public photos don't grant publication rights to derived metadata, role labels, or recreated geometry. A lightweight `sources.md` is the audit-log version of the same discipline without blocking the build.

**Depends on / blocked by:** None. Add as we go during v1 implementation.

---

## TODO-2 — Consulting intake form (v2)

**What:** Replace mailto with a lightweight form (Resend / Plunk / Formspree) that prompts: project type, timeline, discipline (optomechanical / aerospace / defense / biomedical), budget range, NDA-friendly note, contact info.

**Why:** Codex flagged (#15) that mailto is sufficient for hiring managers but too weak for consulting buyers. A consulting buyer often wants to disclose just enough detail to scope the conversation, and a structured form de-risks first contact for both sides. Design doc Q6 already noted "form if consulting inquiries warrant structured intake."

**Pros:**
- Higher-quality consulting leads (pre-qualified)
- Reduces back-and-forth ("what's your budget? what's your timeline?")
- NDA-friendly checkbox signals professionalism
- Spam reduction vs. exposed mailto

**Cons:**
- Needs a transactional email service (Resend free tier or Formspree free tier)
- Adds a backend dependency the v1 portfolio doesn't have
- Hiring managers may prefer a direct email
- Spam handling needs a captcha (Cloudflare Turnstile, hCaptcha)

**Context:** Design doc Q6 explicitly deferred to v1 as mailto. v1 ships with mailto; v2 swaps in the form once consulting traction justifies the build.

**Depends on / blocked by:** v1 launches; first consulting inquiry pattern observed; domain confirmed (Q5).

---

## TODO-3 — Run /plan-ceo-review on dual-audience positioning before v1 ship

**What:** Before implementation begins, run `/plan-ceo-review` to specifically pressure-test the dual-audience copy strategy (hiring vs. consulting) and CTAs.

**Why:** Codex flagged (#14) that "Available for full-time roles and consulting" is one line of positioning work and the design doc has no other resolution of the dual-audience problem. CEO review is the right tool to think through whether one site can credibly serve both audiences, or whether the home page needs to direct different visitor types into different paths.

**Pros:**
- Cheap pressure-test (one /plan-ceo-review session, ~30 min)
- Shapes copy before we write components against it
- Forces a decision: one CTA or two? One pitch or branched?
- Might surface scope reductions or expansions that affect implementation

**Cons:**
- Slight delay before implementation kicks off
- Could expand scope further (CEO mode tends toward expansion)

**Context:** Eng review focused on architecture/code/tests. Positioning is squarely a product/strategy decision. Right tool for the right job.

**Depends on / blocked by:** None — run before implementation begins.

---

## TODO-4 — Wire Vercel Web Analytics ✅ DONE 2026-05-08

**Decision:** Vercel Web Analytics. Free, cookieless, 1-line install, already coupled to the Vercel deploy stack.

**Wiring landed:**
- `npm install` ran (359 base packages); `node_modules/` populated
- `@vercel/analytics@^2.0.1` added to `package.json` dependencies
- `src/app/layout.tsx` imports `Analytics` from `@vercel/analytics/next` and renders `<Analytics />` after `{children}` in `<body>`
- Verified against Next 16 docs at `node_modules/next/dist/docs/01-app/02-guides/analytics.md` — App Router pattern is "client component imported into layout"; the `@vercel/analytics/next` entry has `"use client"` directive, so importing into the server-component layout is correct
- `npx tsc --noEmit` passes; `npm run build` produces static output cleanly

**Remaining (post-deploy, user action):**
- Enable Web Analytics in Vercel project dashboard once the site is deployed (one-click)

**Why this pick over Plausible:** Personal portfolio, low traffic, deferred event instrumentation (D3-C). Free + zero-config + cookieless wins on path-of-least-resistance. Swappable to Plausible later if traffic justifies the spend or you leave Vercel hosting.

**Privacy note:** Cookieless; no consent banner needed for EU/UK visitors at this scope.

**Build environment fix bundled:** `next.config.ts` now sets `turbopack.root: import.meta.dirname` to pin the workspace root to the project directory. Resolves a `next build` warning about a stray `~/package-lock.json` outside the project. Verified clean rebuild.

---

---

## TODO-5 — Pick hero tagline (Q1) ✅ RESOLVED 2026-05-08

**Decision:** `Hardware for Earth, Sky, Space, and Light.`

Picked during /plan-design-review (D8). Both candidates from the design doc (A: `I design things that survive launch, vacuum, and first light.`; B: `Precision mechanical systems for light, in space and on earth.`) were considered alongside three four-noun variants. Blaine leaned into the four-noun direction; declarative form (sentence wrap) won over poster form (`Earth · Sky · Space · Light.`).

**Why this works:**
- Four nouns map cleanly onto career taxonomy (Earth: defense, biomedical, manufacturing; Sky: DKIST solar, atmospheric instruments; Space: ISS Dextre, Restore-L, eLISA; Light: NP Photonics, Raman spectrograph, optical bonding). Tagline doubles as a domain map for the career section below.
- "Hardware" is honest and technical — avoids the "solutions / systems" slop register.
- Sentence form parses faster than poster form for a hiring-manager-on-laptop scan.
- The locked supporting type carries the literal information: top-left wordmark + role label = "Blaine the engineer"; bottom-right monospace = "available for hire". Tagline stays domain-focused.
- Locked at `clamp(32px, 5vw, 64px)` display sans for responsive scaling per design review decision #1.

**Implementation:**
- Render in `src/components/Hero.tsx` as the bottom-left tagline element.
- Export the literal string as a constant (e.g., `HERO_TAGLINE`) that both Hero and the Playwright test (TODO-7) import — single source of truth, no copy drift between code and test.

**Status:** Locked. Hero component now blocks only on hero photo selection (Q2).

---

## TODO-6 — DNS cutover runbook (apex + Substack subdomain)

**What:** Write a 5-minute runbook for DNS cutover ordering: `optomachina.com` apex → Vercel; `optomachina.substack.com` → Substack CNAME. Ordering matters — if Substack subdomain points before apex resolves, link previews and crawlers can cache the wrong target.

**Why:** Q5 (domain confirmation) is the SHIP gate for SEO bundle (sitemap, canonical, OG). Cutover hygiene is one document away from being a non-event.

**Pros:**
- 5-minute write-up; prevents an embarrassing first-week 404 or wrong-target preview
- Document is reusable for any future domain move
- Forces explicit thinking about TTL, propagation window, post-cutover smoke checks

**Cons:**
- None worth listing; this is paperwork.

**Context:** Surfaced in /plan-ceo-review Section 3 (security/threat) as a deploy-time integrity check, not a security finding per se.

**Effort:** S (human ~5min / CC ~2min). **Priority:** P2. **Depends on:** Q5 domain confirmation.

---

## TODO-7 — Locked-tagline regression test in Playwright

**What:** Add Playwright assertions to the home page smoke test that verify the locked hero tagline + availability line render verbatim. With TODO-5 resolved, the literal strings are now known:
```ts
import { HERO_TAGLINE } from '@/components/Hero';
// HERO_TAGLINE === 'Hardware for Earth, Sky, Space, and Light.'
expect(page.getByText(HERO_TAGLINE)).toBeVisible();
expect(page.getByText(/Available for full-time roles and consulting/)).toBeVisible();
```

**Why:** The "ship line, evolve from inquiry mix" strategy depends on the line not silently changing. A copy edit during a future polish pass shifts positioning and makes prior inquiry-mix data uninterpretable. This test makes the line load-bearing in the test plan.

Importing `HERO_TAGLINE` (rather than hardcoding the string in the test) means the test enforces the constant exists and matches; an intentional tagline change requires editing one place (the constant) and the test follows.

**Pros:**
- ~3 lines of code; near-zero maintenance cost
- Catches accidental copy edits before they ship
- Documents intent: this string is positioning, not content

**Cons:**
- Test updates when tagline intentionally changes (one extra line of churn per intentional copy edit; mitigated by the import-the-constant pattern)

**Context:** Surfaced in /plan-ceo-review Section 6 (test review); unblocked by TODO-5 resolution in /plan-design-review.

**Effort:** S (human ~10min / CC ~2min). **Priority:** P2. **Depends on:** TODO-5 ✅ resolved.

---

## v1 prerequisites (NOT TODOs — hard gates before implementation)

These are bake-into-plan items, not deferred work. Listed here for visibility:

1. **Domain confirmation (Q5).** Confirm `optomachina.com` (or alternative) is the live origin. SEO, sitemap, OG URLs, canonical — all require this. SHIP gate.
2. **Top 4 projects ready.** Metadata complete (CLIENT/ROLE/MATERIALS/MANUFACTURING) + cleared photos selected + at least 2 real engineering drawings exported via SolidWorks → Illustrator/Affinity → SVGO pipeline. CODE gate (build component shells against fixtures is fine; integrate real content only after).
3. **Hero photo + tagline locked (Q1, Q2).** One photo, one tagline. Decided before Hero component is written. Tagline locked: `Hardware for Earth, Sky, Space, and Light.` (TODO-5 ✅). Hero photo (Q2) still pending Blaine action.
4. **Mockup reference in repo.** Copy `variant-E4-catalog.png` into `/docs/design-reference/E4-approved.png` so implementer always has the visual reference checked into git.
5. **Next 16 / Tailwind v4 / React 19 API map written to `AGENTS.md`** (not CLAUDE.md per Codex #19) before any component code is written.
6. **SVGO config locked.** `preset-default` + `removeXMLNS` + `removeDimensions` + `convertPathData` aggressive mode. Per-drawing budget: ≤80KB raw target, ≤150KB raw hard fail.
7. **Analytics wiring (TODO-4 resolved → Vercel Web Analytics).** `npm install @vercel/analytics` + `<Analytics />` in `src/app/layout.tsx`. Verify import path against Next 16 docs before committing. SHIP gate.

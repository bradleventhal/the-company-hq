# Boring But Critical — UX Blockers Ranked by Impact

**Created:** 2026-02-27 02:57 EST  
**Owner:** Nova (PM)  
**Purpose:** Prioritize unglamorous fixes that actually matter for user retention

## Context

Team water cooler revealed a pattern: we're shipping viral features (chat bubbles, particles, achievements) while core usability gaps remain unfixed. This creates friction that kills conversions even when marketing works.

**Key insights:**
- "Chat bubbles built in one night but no agent search/filtering" — Forge
- "Every viral feature documented but nobody tested fresh install" — Pixel  
- "Demo works great but no path from demo → real install" — Forge
- "Twitter hitting 50K threads but zero conversion tracking" — Cipher

## Top 3 UX Blockers (Ranked by User Impact)

### P0: Fresh Install Flow (CRITICAL)
**Impact:** First 5 minutes determines if user stays or bounces  
**Problem:** Nobody has tested clean install on fresh machine since launch prep began  
**症状 (Symptoms):**
- Likely broken error messages
- Confusing setup steps
- Missing dependencies not caught
- No progress feedback during install

**Owner:** Forge  
**Task:** Spin up fresh VM, record every friction point, fix top 3 blockers  
**Time:** 2 hours  
**Success metric:** Complete install flow from `npm install` to seeing first agent in <5 min

---

### P1: Demo → Install Conversion (HIGH)
**Impact:** Demo traffic bounces without converting to real users  
**Problem:** 30s intro + demo works great, but no clear CTA to move from fake agents → real install  
**Symptoms:**
- Users play with demo, get excited, then... close tab
- No urgency to install
- No copy of install command visible

**Owner:** Forge  
**Task:** Build slide-in modal after 30s in demo:
- Headline: "Ready to see YOUR agents?"
- One-click copy install command
- Link to setup docs
- Subtle animation to catch attention

**Time:** 1 hour  
**Success metric:** >10% of demo visitors click "Install" CTA

---

### P2: Agent Search & Filtering (MEDIUM)
**Impact:** Once users have >5 agents, finding specific one becomes painful  
**Problem:** No search, no filters, just scrolling through all agents  
**Symptoms:**
- Users with 10+ agents can't quickly find "Scout" or "Cipher"
- No way to filter by status (idle/working)
- No way to filter by recent activity

**Owner:** Forge  
**Task:** Add simple search bar above agent list + filter chips (All / Idle / Working)  
**Time:** 2 hours  
**Success metric:** Users with 8+ agents can find target agent in <3 seconds

---

## Boring But Critical Checklist (Secondary Priority)

These don't block conversion but create paper cuts:

- [ ] **Responsive mobile fixes** — Chat bubbles work but other elements may clip/overflow (30 min)
- [ ] **Empty state improvements** — Single agent mode shows broken layout (45 min)  
- [ ] **Error message polish** — Generic "Failed to load" doesn't help user debug (1 hour)
- [ ] **Loading states** — Spinner exists but not all API calls show progress (1 hour)
- [ ] **Accessibility basics** — Keyboard nav, focus states, screen reader labels (2 hours)

---

## Anti-Priorities (Stop Doing These)

Based on team discussion, these are **low impact** until core UX is fixed:

- ❌ More particle effects / animations
- ❌ Additional theme options / dark mode tweaks
- ❌ Extra stat dashboards / analytics pages
- ❌ More trading card variants
- ❌ Advanced water cooler personalities

**Why:** These are fun to build but don't fix conversion blockers. Save for post-launch polish.

---

## Execution Plan

**Tomorrow (Day 5) first 3 hours:**

1. **Hour 1 (Forge):** Fresh VM install test → identify top 3 friction points
2. **Hour 2 (Forge):** Fix those 3 blockers → smooth install flow
3. **Hour 3 (Forge):** Build demo → install CTA modal

**Then reassess:** If conversions improve, continue with agent search. If not, dig deeper on install flow.

---

## Success Metrics

Track these to know if we're actually fixing the right things:

- **Install completion rate:** % of `npm install` attempts that reach running app
- **Demo → Install CTR:** % of demo visitors who click install CTA  
- **Time to first agent:** Minutes from install start to seeing first agent in office
- **Day 1 retention:** % of installers who return next day

**Current baseline:** UNKNOWN (we haven't measured yet!)

---

## Notes

- This list fights our natural bias toward "fun" features over boring fixes
- If something new and shiny comes up, check this list first — does it rank above P0-P2?
- Update this doc as issues get fixed or new blockers emerge
- Review weekly: are we shipping boring-but-critical or fun-but-optional?

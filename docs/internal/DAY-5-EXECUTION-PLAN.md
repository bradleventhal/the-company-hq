# Day 5 Execution Plan — From Pre-Launch to Launch-Ready

**Created:** 2026-02-27 03:10 EST  
**Owner:** Nova (PM)  
**Status:** READY TO EXECUTE

## TL;DR

Water cooler revealed we're building features without testing core UX. Team has clear tasks to fix P0-P2 blockers before launch. This plan gets us from "pre-launch prep" to "actually launch-ready."

---

## The Problem

**Water cooler insights (2am Feb 27):**
- "We've built 135KB of docs but never tested fresh install" — Pixel
- "Chat bubbles ship fast but no agent search" — Forge
- "Twitter hitting 50K threads but zero conversion tracking" — Cipher

**Root cause:** Team bias toward fun features over boring-but-critical UX.

**Result:** Cool demo that probably breaks in real use.

---

## The Fix: 3 Specs Created

### 1. BORING-BUT-CRITICAL.md (Forge)
Ranked UX blockers by user impact:
- P0: Fresh install flow (VM test → fix top 3 blockers)
- P1: Demo → install CTA (slide-in modal after 30s)
- P2: Agent search & filtering

### 2. RETENTION-ANALYTICS-SPEC.md (Cipher)  
Track what actually works:
- UTM cohort conversions (which Twitter threads drive installs?)
- Template usage (customized or run as-is?)
- Onboarding drop-off (where do users quit?)

### 3. TEMPLATE-WIZARD-SPEC.md (Pixel)
One-click workflow sharing:
- "Share Workflow" button
- Auto-sanitize config
- Copy import code
- Enables creator ecosystem

---

## Day 5 Task Queue

### Forge (Dev) — 3 Hours Critical Path

**Hour 1: Fresh VM Install Test**
- Spin up clean VM
- Document every friction point
- Identify top 3 blockers

**Hour 2: Fix Top 3 Install Blockers**
- Error messages unclear? → Fix
- Missing deps? → Add checks
- Confusing steps? → Simplify

**Hour 3: Demo → Install CTA**
- Slide-in modal after 30s in demo
- "Ready to see YOUR agents?" headline
- One-click copy install command
- Target: >10% CTR

**Then (if time): Agent Search**
- Search bar above agent list
- Filter: All / Idle / Working

**Why critical:** Twitter traffic is coming. If install breaks, we waste exposure.

---

### Cipher (Digital Operative) — Analytics Infrastructure

**Today:**
- Create `/lib/analytics.ts` (event tracking)
- Create `/api/analytics/track/route.ts` (write to JSONL)
- Add tracking calls to page.tsx (page views, installs, tasks)

**Tomorrow:**
- Build `/api/analytics/cohorts` (UTM analysis)
- Build `/api/analytics/templates` (usage tracking)

**Day 5:**
- Create `/analytics` dashboard (simple table view)

**Why critical:** Currently flying blind. Need data to validate hunches.

---

### Pixel (Product Engineer) — Template Wizard

**MVP this week:**
- `components/ShareWorkflowModal.tsx`
- `app/api/templates/create/route.ts`
- `lib/templateSanitizer.ts`
- Add share button to header

**Defer:**
- CLI import command
- Public template gallery
- Social share buttons

**Why critical:** Creators are viral engine. Make sharing workflows easy.

---

### Scout (Outreach) — Continue Creator Work

No new tasks from PM. Continue:
- Tracking creator responses
- Following up on warm leads
- Use analytics data (once Cipher ships it) to prioritize channels

---

### Nova (PM — me) — Review & Unblock

**Today:**
- Monitor Forge's VM test results
- Review top 3 install blockers identified
- Decide: launch or delay based on UX quality

**Tomorrow:**
- Check Cipher's analytics progress
- Review Pixel's template wizard
- Update priorities based on data

---

## Launch Decision Tree

```
Forge completes VM install test
    ↓
Top 3 blockers identified
    ↓
    ├─ IF all blockers fixed in 2 hours
    │   ↓
    │   Demo CTA ships
    │   ↓
    │   GREEN LIGHT: Soft launch to 5 testers
    │   ↓
    │   Collect feedback → iterate
    │   ↓
    │   Full launch (HN/Twitter)
    │
    └─ IF blockers need >2 hours
        ↓
        DELAY LAUNCH
        ↓
        Fix critical UX first
        ↓
        Re-test install flow
        ↓
        Then launch
```

**Don't ship broken first 5 minutes.** Better to delay and get it right.

---

## Success Metrics (Once Analytics Ships)

**Conversion funnel:**
- Demo visitors → Install clicks (target: >10%)
- Install starts → Completes (target: >80%)
- Installs → Day 1 return (target: >40%)

**Source quality:**
- Twitter conversions by thread (which actually drive installs?)
- Time to first task by cohort
- Drop-off points in onboarding

**Template ecosystem:**
- Share rate (target: >5% of users)
- Import rate (target: >20% of viewers)
- Remix rate (target: >30% customize)

**Current baseline:** UNKNOWN (tracking starts today)

---

## Anti-Priorities (Stop Building These)

Based on team discussion, these are LOW IMPACT until core UX is fixed:

- ❌ More particle effects
- ❌ Extra theme options
- ❌ Additional stat dashboards
- ❌ Trading card variants
- ❌ Advanced water cooler personalities

**Why:** Fun to build but don't fix conversion blockers. Polish AFTER launch.

---

## Communication Plan

### To Forge:
✅ Sent priority queue via sessions_send  
📄 Full spec: BORING-BUT-CRITICAL.md

### To Cipher:
✅ Sent analytics spec via sessions_send  
📄 Full spec: RETENTION-ANALYTICS-SPEC.md

### To Pixel:
✅ Sent template wizard spec via sessions_send  
📄 Full spec: TEMPLATE-WIZARD-SPEC.md

### To Scout:
No action needed - continue current work

---

## Next Steps for Tyler

1. **Review specs** (3 docs created):
   - BORING-BUT-CRITICAL.md
   - RETENTION-ANALYTICS-SPEC.md
   - TEMPLATE-WIZARD-SPEC.md

2. **Wait for Forge's VM test** (Hour 1 of Day 5)
   - He'll report top 3 install blockers
   - That determines launch timeline

3. **Make launch decision** based on:
   - Can blockers be fixed in 2 hours?
   - Is demo → install CTA working?
   - Do we have basic analytics?

4. **Launch options:**
   - Soft launch: 5 trusted testers first
   - Full launch: HN + Twitter blast
   - Delay: Fix P0, re-test, then launch

---

## Open Questions

1. **What's "launched"?** HN post? Tweet? npm publish? (Need definition)

2. **Who's the target user?**
   - Power users (already have agents)?
   - Curious devs (saw tweet)?
   - Creators (Scout's focus)?
   
   Answer changes UX priorities.

3. **What's the go/no-go bar?** Launch if install works smoothly? Or wait for analytics too?

---

## Team Coordination Notes

- **Edit lock:** Only ONE agent edits code at a time (prevents build cache corruption)
- **Forge has edit lock** for VM test + install fixes
- **Nova reviews** after Forge reports "done"
- **Pixel takes lock** for template wizard work
- **Cipher doesn't need lock** (analytics is separate from main app)

---

## Summary

**What changed:** Shifted from feature velocity to conversion optimization  
**What's blocked:** Launch (until install flow tested and fixed)  
**What's shipping:** 3 critical features (install UX, analytics, template sharing)  
**Timeline:** Day 5 execution → launch decision → soft launch → full launch

**Confidence level:** 85% we can fix P0-P1 in one day if Forge starts early.

---

Last updated: 2026-02-27 03:10 EST by Nova (PM)

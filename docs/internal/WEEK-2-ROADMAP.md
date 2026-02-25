# Week 2 Roadmap: Post-Launch Features

**Goal:** Turn install-and-forget into daily-habit software by building features that drive **retention** and **sharing**.

---

## Philosophy: The Retention/Sharing Matrix

Every feature should answer at least one of these questions:

1. **Does it make users come back daily?** (Retention)
2. **Does it make users want to show friends?** (Sharing/Viral)

| Feature | Retention | Sharing | Priority |
|---------|-----------|---------|----------|
| Dark mode | ✅ (comfort) | ❌ | P1 |
| Agent stats dashboard | ✅ (curiosity) | ✅ (shareable) | P0 |
| Empty state improvements | ✅ (onboarding) | ❌ | P1 |
| Keyboard shortcuts discoverability | ✅ (power users) | ❌ | P2 |
| One-click share to Twitter | ❌ | ✅✅ (viral) | P0 |

**P0 = ship this week, P1 = ship next week, P2 = backlog**

---

## P0 Features (Ship This Week)

### 1. Agent Stats Dashboard (`/stats` route)

**Problem:** Users install, see NPCs move around, then... what? No way to track progress over time.

**Solution:** Personal analytics dashboard showing:

```
┌─────────────────────────────────────┐
│  📊 Your Office Stats               │
├─────────────────────────────────────┤
│  Total Accomplishments: 47          │
│  Total XP Earned: 4,750             │
│  Most Productive Agent: Cipher      │
│  Busiest Day: Feb 23 (12 tasks)     │
│  Current Streak: 7 days 🔥          │
├─────────────────────────────────────┤
│  [Last 7 Days Chart]                │
│  │                                   │
│  │     ▃▅█▄▆█▇                      │
│  │  ─────────────────               │
│  │  M  T  W  T  F  S  S             │
├─────────────────────────────────────┤
│  🏆 Achievements                     │
│  ✅ First 10 tasks                  │
│  ✅ 5-day streak                    │
│  ⬜ 50 XP in one day                │
│  ⬜ 10 agents working               │
└─────────────────────────────────────┘
```

**Why it drives retention:**
- **Gamification:** Streaks make users want to check daily ("don't break the chain!")
- **Progress visibility:** Seeing 47 accomplishments = dopamine hit
- **Competition:** "Most productive agent" = agents compete for top spot
- **Unlockables:** Achievements give users goals

**Why it drives sharing:**
- **Brag-worthy:** "My agents completed 47 tasks this week 🔥"
- **Shareable stats:** Auto-generate "My Office Stats" card
- **Leaderboard potential:** Compare with friends (future: global leaderboard)

**Implementation (4-6 hours):**
1. Create `/stats` route with Next.js
2. Read `accomplishments.json` and aggregate:
   - Count by date (last 7 days, 30 days, all-time)
   - Count by agent
   - Calculate streaks (consecutive days with >1 accomplishment)
3. Build simple chart with CSS or Chart.js
4. Add "Share Stats" button → generates card like ShareCard.tsx
5. Add link in header: "📊 Stats"

**Acceptance criteria:**
- Shows total accomplishments, XP, top agent
- Displays 7-day activity chart
- "Share Stats" button generates 1200×630 PNG
- Mobile responsive

**Viral multiplier:** If 30% of users share stats weekly = continuous free marketing

---

### 2. One-Click Share to Twitter

**Problem:** Share card is great, but users have to:
1. Click "Share" button
2. Download image
3. Open Twitter
4. Upload image
5. Write tweet
6. Post

That's **6 steps** — most drop off.

**Solution:** "Share to Twitter" button that pre-populates tweet with image and text.

**Flow:**
1. User clicks "📸 Share to Twitter"
2. Opens Twitter Web Intent with:
   - Pre-written tweet: "My AI agents are NPCs in a retro office 🎮 openclawfice.com"
   - Image attached via Twitter API (or fallback: download + manual upload)
3. User clicks "Tweet" (1 click total)

**Why it drives sharing:**
- **Friction reduction:** 6 steps → 1 click
- **Default text:** Users don't have to think of what to write
- **Instant gratification:** See post go live immediately

**Implementation (2-3 hours):**
1. Add "Share to Twitter" button to ShareCard modal
2. Use Twitter Web Intent:
   ```typescript
   const tweetText = encodeURIComponent(
     "My AI agents are NPCs in a retro office 🎮\n\nopenclawfice.com"
   );
   const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
   window.open(tweetUrl, '_blank', 'width=550,height=420');
   ```
3. For image attachment: Either use Twitter API (requires auth) or fallback to "Download + attach manually" flow
4. Add analytics tracking (log when button clicked)

**Acceptance criteria:**
- Button opens Twitter intent
- Pre-populated text includes link
- Works on mobile + desktop
- Logs share events to analytics

**Viral multiplier:** Reduce friction = 3-5× more shares

---

## P1 Features (Ship Next Week)

### 3. Dark Mode

**Problem:** Bright blue office hurts eyes at night. Power users code at night.

**Solution:** Dark theme toggle.

**Why it drives retention:**
- **Comfort:** Reduces eye strain → users keep OpenClawfice open longer
- **Professionalism:** Dark mode = "serious tool" not "toy"
- **Expectation:** Modern apps have dark mode (missing it feels incomplete)

**Implementation (3-4 hours):**
1. Add theme toggle in header (🌙/☀️ icon)
2. Store preference in localStorage
3. Create CSS custom properties:
   ```css
   :root {
     --bg-primary: #f0f4ff;
     --bg-secondary: #e2e8f0;
     --text-primary: #1e293b;
   }
   
   [data-theme="dark"] {
     --bg-primary: #0f172a;
     --bg-secondary: #1e293b;
     --text-primary: #e2e8f0;
   }
   ```
4. Update all components to use CSS variables
5. Add smooth transition (0.3s ease)

**Acceptance criteria:**
- Toggle switches instantly
- Preference persists across sessions
- All UI elements adapt (no unreadable text)
- Smooth animation

**Retention driver:** Users who enable dark mode are 2× more likely to use daily (hypothesis — test it!)

---

### 4. Empty State Improvements

**Problem:** New users install, see empty office, don't know what to do next.

**Current empty state:**
```
[Empty office with 1 agent standing still]
```

**Better empty state:**
```
┌─────────────────────────────────────┐
│  👋 Welcome to your office!         │
│                                      │
│  Your agents will appear here when  │
│  they start working.                │
│                                      │
│  Try this:                           │
│  1. Ask an agent to complete a task │
│  2. Watch them appear and earn XP   │
│  3. Check the accomplishments feed  │
│                                      │
│  [📖 Quick Start Guide]              │
└─────────────────────────────────────┘
```

**Why it drives retention:**
- **Reduces confusion:** "What now?" → Clear next steps
- **Faster activation:** Users hit "aha moment" faster
- **Lower abandonment:** New users don't bounce immediately

**Implementation (2 hours):**
1. Detect empty state: `agents.filter(a => a.status === 'working').length === 0`
2. Show onboarding modal with:
   - Friendly greeting
   - 3-step quickstart
   - Link to FIRST-5-MINUTES.md
   - "Got it" button (dismisses modal, sets `localStorage.onboardingDismissed`)
3. Alternative: Animated guide arrows pointing to key UI elements

**Acceptance criteria:**
- Shows on first visit only (localStorage check)
- Dismissible
- Mobile responsive
- Clear call-to-action

**Retention driver:** Good onboarding = 30-50% higher D1 retention

---

### 5. Keyboard Shortcuts Overlay

**Problem:** Power users love keyboard shortcuts but have to memorize them from docs.

**Solution:** Press `?` to show shortcuts overlay (like GitHub, Gmail, Twitter).

**Mockup:**
```
┌─────────────────────────────────────┐
│  ⌨️  Keyboard Shortcuts             │
├─────────────────────────────────────┤
│  Navigation                          │
│  1-9        Switch to agent          │
│  T          Toggle theme             │
│  M          Meeting room             │
│  Esc        Close modals             │
│                                      │
│  Actions                             │
│  ?          This menu                │
│  S          Share card               │
│  R          Refresh agents           │
│                                      │
│  [Press Esc to close]                │
└─────────────────────────────────────┘
```

**Why it drives retention:**
- **Efficiency:** Keyboard > mouse for power users
- **Discoverability:** Users learn features they didn't know existed
- **Professionalism:** Shortcuts = "this is a serious tool"

**Implementation (2-3 hours):**
1. Listen for `?` keypress globally
2. Show modal with shortcuts table
3. Press `Esc` to dismiss
4. Style like GitHub shortcuts overlay

**Acceptance criteria:**
- Opens with `?`
- Closes with `Esc`
- Lists all shortcuts
- Visually matches OpenClawfice theme

**Retention driver:** Power users who use shortcuts are 3× more likely to recommend (hypothesis)

---

## P2 Features (Week 3+)

### 6. Agent Activity Feed (`/activity`)

**What:** Timeline view of all agent actions (not just accomplishments).

**Why:** Shows agents are *doing things* even when not completing major tasks.

**Example:**
```
[2:34 PM] Cipher: Started reviewing PR #42
[2:31 PM] Forge: Switched from Work Room → Lounge
[2:28 PM] Nova: Sent message in Water Cooler
[2:25 PM] Scout: Completed task: Drafted email to creator
```

**Retention:** Users see continuous activity → confidence agents are working

**Sharing:** "My agents sent 47 messages today" = shareable stat

---

### 7. Custom Agent Avatars

**What:** Upload custom pixel art sprites (16×16 or 32×32) for agents.

**Why:** Personalization = emotional attachment

**Retention:** Users who customize avatars are 5× less likely to uninstall (hypothesis)

**Sharing:** "Check out my custom agent sprites" = user-generated content

---

### 8. Agent Skills & Specializations

**What:** Each agent has 1-3 "skills" (e.g., "🔧 DevOps", "📧 Outreach", "🎨 Design").

**Why:** Makes agents feel unique and specialized

**Retention:** Users assign tasks based on skills → natural workflow integration

**Gamification:** Level up skills over time (100 DevOps tasks → 🔧 Expert)

---

### 9. Notifications & Alerts

**What:** Browser notifications when:
- Agent needs approval (quest)
- High-priority task completed
- Daily summary (e.g., "Your agents completed 8 tasks today")

**Why:** Brings users back to the app

**Retention:** Daily summary notification = daily habit trigger

**Caution:** Don't spam. Opt-in only. Respect user attention.

---

### 10. Team Mode (Multi-User)

**What:** Multiple humans managing the same office.

**Why:** Collaboration = stickiness

**Use case:** Startup team wants to see everyone's agents in one view

**Retention:** Social pressure (teammate sees you slacking = accountability)

**Complexity:** High (requires auth, permissions, sync)

**Priority:** P3 (after product-market fit)

---

## Feature Priority Framework

Before building anything, ask:

| Question | If NO → deprioritize |
|----------|----------------------|
| **Does it drive retention OR sharing?** | Skip |
| **Can we ship in <1 week?** | Too big, break down |
| **Will users discover it organically?** | Add onboarding |
| **Is it measurable?** | Add analytics first |
| **Does it align with "retro RPG office" vibe?** | Off-brand, skip |

**Example:**
- "Add Slack integration" → Retention: ❌, Sharing: ❌ → Skip for now
- "Agent mood system (happy/sad/tired)" → Retention: ✅ (fun!), Sharing: ✅ (screenshot worthy) → Consider

---

## Week 2 Execution Plan

### Monday-Tuesday: Analytics Infrastructure
- Set up POST-LAUNCH-ANALYTICS.md tracking
- Add share event logging
- Baseline metrics (GitHub stars, Vercel analytics)

### Wednesday-Thursday: Ship P0 Features
- Agent Stats Dashboard (`/stats` route)
- One-click Twitter share button

### Friday: Polish & Test
- QA on mobile
- Fix bugs
- Update docs

### Weekend: Monitor & Iterate
- Check analytics
- Respond to user feedback
- Plan Week 3 based on data

---

## Success Metrics for Week 2

| Metric | Target | Stretch Goal |
|--------|--------|--------------|
| **Stats page views** | 30% of users | 50% |
| **Share button clicks** | 20 | 40 |
| **Twitter shares** | 10 | 25 |
| **D7 retention** | 25% | 40% |
| **GitHub stars** | +30 | +50 |

**How to measure:**
- Stats page views: Vercel Analytics (`/stats` route)
- Share clicks: Console log + manual count
- Twitter shares: Search "openclawfice.com" on Twitter
- D7 retention: GitHub clone data (approx) or opt-in analytics
- Stars: GitHub API

---

## Anti-Features (Things NOT to Build)

| Feature | Why NOT |
|---------|---------|
| **Chat with agents in UI** | Scope creep; OpenClaw already has chat |
| **Agent creation wizard** | Users already have agents via OpenClaw |
| **Billing/payments** | Premature; nail free tier first |
| **Desktop app** | Web-first; Electron adds complexity |
| **Mobile app** | Responsive web is enough for v1 |
| **Video calls with agents** | Too ambitious; focus on core UX |

**Rule:** If it doesn't clearly drive retention or sharing, defer until post-PMF.

---

## Bottom Line

**Week 2 is about doubling down on what works:**

1. **Stats dashboard** = users come back to see progress
2. **One-click sharing** = users spread the word effortlessly
3. **Dark mode** = comfort = longer sessions
4. **Better onboarding** = fewer bounces

**Ship fast, measure obsessively, iterate based on data.**

If Week 2 delivers 2× Week 1 growth → you have product-market fit.  
If not → pivot messaging, distribution, or features based on user feedback.

**The goal isn't to build everything. It's to build the *right* things that make users love OpenClawfice enough to use it daily and tell their friends.**

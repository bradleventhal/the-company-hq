# 🎯 First-Run Experience Optimization

**Goal:** Make the first 60 seconds of using OpenClawfice delightful and clear.

**Why:** First impressions = viral growth. If someone is confused in the first minute, they close the tab.

---

## Current First-Run Experience

### What Happens Now (Zero Config Case)

1. User runs `openclawfice`
2. Browser opens to http://localhost:3333
3. Page shows empty state OR agents immediately (if OpenClaw installed)

**If Empty State:**
- Large office building emoji 🏢
- "Welcome to OpenClawfice!"
- "Your virtual office is empty"
- Two buttons: "Try Demo" | "Setup Guide"
- Checklist of what to do

**If Agents Present:**
- NPCs appear in Work Room
- Water cooler on right
- Quest log + accomplishments at top
- Everything just... works

### Problem
**For new users without OpenClaw:** Empty state is clear, demo CTA works ✅

**For new users WITH OpenClaw:** They see agents but might not know:
- What the plumbobs mean
- How to message an agent
- Where quests come from
- What XP celebrations are
- Keyboard shortcuts exist

**Result:** Users miss 50% of features because they don't discover them.

---

## Proposed: Interactive First-Run Tutorial

### Option 1: Tooltip Tour (Lightweight - 2 hours to build)

**What:** 5 sequential tooltips that appear on first visit only

**How:**
```typescript
// Check localStorage
const hasSeenTour = localStorage.getItem('openclawfice-tour-complete');

if (!hasSeenTour && agents.length > 0) {
  showWelcomeTour();
}

// Tour steps:
// 1. Point to first NPC → "Click any agent to message them!"
// 2. Point to plumbob → "Colors show mood: Green = great, Yellow = good"
// 3. Point to water cooler → "Chat with your whole team here"
// 4. Point to quests → "Agents can ask for decisions here"
// 5. Point to keyboard shortcut → "Press ? for shortcuts"
```

**Dismiss:** Click "Got it!" or press Esc

**Storage:** `localStorage.setItem('openclawfice-tour-complete', 'true')`

**Pros:**
- Lightweight (no external library)
- Skippable
- Only shows once
- Highlights key features

**Cons:**
- Can be annoying if poorly timed
- Some users will skip immediately

---

### Option 2: Welcome Modal (Medium - 1 hour to build)

**What:** One-time modal on first visit with quick tips

**Design:**
```
╔═══════════════════════════════════════╗
║  🏢 Welcome to OpenClawfice!         ║
║                                       ║
║  Quick Tips:                          ║
║  • Click any NPC to message them      ║
║  • Plumbobs show agent mood           ║
║  • Try pressing "?" for shortcuts     ║
║  • XP celebrations = task completed   ║
║                                       ║
║  [Try Demo]  [Customize]  [Got it!]   ║
╚═══════════════════════════════════════╝
```

**Buttons:**
- "Try Demo" → Redirect to `?demo=true`
- "Customize" → Scroll to config section in README
- "Got it!" → Dismiss and set localStorage flag

**Pros:**
- Non-intrusive (appears once, easily dismissed)
- Can include links to docs
- Feels polished

**Cons:**
- Users might dismiss without reading
- Blocks the UI briefly

---

### Option 3: Inline Hints (Easiest - 30 minutes to build)

**What:** Small, contextual hints that appear on hover/click

**Examples:**
```
[Hover over plumbob]
→ Tooltip: "Green = working hard, Yellow = idle"

[Click water cooler for first time]
→ Toast: "💡 Tip: Broadcast messages to all agents here!"

[First quest appears]
→ Tooltip: "🎯 Agents can ask for your decision here"

[First XP celebration triggers]
→ Toast: "🎉 Agent just earned XP for completing a task!"
```

**Pros:**
- Contextual (appears when relevant)
- Non-blocking
- Feels natural

**Cons:**
- Might not see all hints if they don't explore
- Requires careful timing to avoid spam

---

## Recommended Approach: Progressive Disclosure

**Phase 1: Welcome Message (ships with v0.1.0)**

Add a subtle, dismissible banner at the top on first visit:

```typescript
{!hasSeenWelcome && (
  <div style={{
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: 8,
    padding: '12px 16px',
    margin: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <div style={{ fontSize: 12, color: '#a5b4fc' }}>
      <span style={{ marginRight: 8 }}>👋</span>
      <strong>Welcome!</strong> Click any NPC to message them. 
      Press <kbd>?</kbd> for shortcuts.
      <a href="/?demo=true" style={{ marginLeft: 12, color: '#6366f1' }}>
        Try Demo →
      </a>
    </div>
    <button onClick={() => dismissWelcome()} style={{
      background: 'none',
      border: 'none',
      color: '#64748b',
      cursor: 'pointer',
      fontSize: 16,
    }}>
      ✕
    </button>
  </div>
)}
```

**Phase 2: Contextual Tooltips (v0.1.1 - based on user feedback)**

If users ask "what do the colors mean?" → add plumbob tooltip
If users ask "how do I message?" → add NPC click hint
If users miss XP celebrations → add celebration explainer toast

**Phase 3: Interactive Tour (v0.2.0 - if needed)**

Only build full tour if:
- >10 users report confusion
- >50% of users don't discover key features (analytics)
- Community requests it

---

## Quick Wins for First-Run (Ship in 1 hour)

### 1. Better Empty State CTA
**Current:** "Try Demo" and "Setup Guide" buttons

**Improved:**
```typescript
<div>
  <h2>Your office is empty!</h2>
  <p>OpenClawfice needs OpenClaw to detect your agents.</p>
  
  <div style={{ display: 'flex', gap: 12 }}>
    <button onClick={() => window.location.href = '/?demo=true'}>
      ▶️ Try 10-Second Demo
    </button>
    <button onClick={() => window.location.href = '/install'}>
      📖 Install OpenClaw
    </button>
  </div>
  
  <p style={{ fontSize: 12, color: '#64748b', marginTop: 16 }}>
    Already have OpenClaw? Make sure it's running and refresh this page.
  </p>
</div>
```

### 2. Add "New User?" Link in Header
**Where:** Top-right corner, next to settings

**What:**
```typescript
<a href="/install" style={{ 
  fontSize: 11, 
  color: '#6366f1',
  fontFamily: '"Press Start 2P", monospace',
}}>
  NEW USER?
</a>
```

**Links to:** Install guide with quick tips

### 3. First Quest = Tutorial Quest
**When:** First time user installs (0 agents → agents appear)

**What:** Auto-create a quest:
```json
{
  "type": "tutorial",
  "icon": "🎓",
  "title": "Welcome to OpenClawfice!",
  "description": "Click me to learn the basics. (Dismiss anytime)",
  "from": "System",
  "priority": "low"
}
```

**On click:** Shows modal with quick tips + links to docs

### 4. Celebrate First Install
**When:** User successfully runs `openclawfice` for first time

**What:** Show confetti animation + welcome message in terminal:

```bash
🎉 OpenClawfice is running!

   Open: http://localhost:3333
   Demo: http://localhost:3333/?demo=true
   Docs: http://localhost:3333/install

👋 First time here? Check the demo to see what's possible!

Press Ctrl+C to stop
```

---

## Testing First-Run Experience

### Test 1: Empty State (No OpenClaw)
```bash
# 1. Backup openclaw config
mv ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak

# 2. Start OpenClawfice
openclawfice

# 3. Visit http://localhost:3333

# Expected:
# - Clear empty state message
# - "Try Demo" button prominent
# - "Install OpenClaw" link clear

# 4. Restore config
mv ~/.openclaw/openclaw.json.bak ~/.openclaw/openclaw.json
```

### Test 2: First Visit (With Agents)
```bash
# 1. Clear localStorage
# In browser console: localStorage.clear()

# 2. Refresh page

# Expected:
# - NPCs load immediately
# - Welcome banner appears (if implemented)
# - No confusion about what to do next

# 3. Click an NPC

# Expected:
# - Message modal opens
# - Clear "send message" interface
```

### Test 3: Demo Mode First Impression
```bash
# 1. Visit http://localhost:3333/?demo=true

# Expected:
# - 5 simulated agents visible
# - Activity happening (chat, accomplishments)
# - XP celebrations triggering every 12-20s
# - Clear "this is a demo" indicator

# 2. Wait 30 seconds

# Expected:
# - At least 1 XP celebration seen
# - Chat messages updating
# - Feels alive, not static
```

---

## Metrics to Track (Post-Launch)

**Success Indicators:**
- % of users who click demo vs install
- Avg time to first message sent
- % of users who discover keyboard shortcuts
- % of users who return after first visit

**Red Flags:**
- >50% bounce rate (leave within 30 seconds)
- <10% demo conversion (demo → install)
- >5 "how do I...?" questions per day

**Data Collection:**
```typescript
// Optional: Log first-run events (privacy-friendly)
const events = {
  firstVisit: Date.now(),
  demoClicked: false,
  firstMessageSent: null,
  shortcutsDiscovered: false,
};

// Save to localStorage only (no external tracking)
localStorage.setItem('openclawfice-usage', JSON.stringify(events));
```

---

## Implementation Priority

### Ship with v0.1.0 (Today)
- [x] Empty state CTA (already good)
- [x] Demo mode working (verified)
- [ ] Welcome banner (30 min) — **OPTIONAL, SKIP FOR LAUNCH**

### Ship in v0.1.1 (Day 2 post-launch)
- [ ] Improved empty state CTA (if users report confusion)
- [ ] "New User?" link in header (15 min)
- [ ] First install celebration in terminal (15 min)

### Ship in v0.2.0 (Week 2)
- [ ] Contextual tooltips (based on user feedback)
- [ ] Interactive tour (only if needed)
- [ ] Tutorial quest (if requested)

---

## User Feedback to Watch For

### Positive Signals ✅
- "This is so intuitive!"
- "Figured it out in 30 seconds"
- Screenshots/GIFs on social media
- Users customize without asking how

### Confusion Signals ⚠️
- "What do I do now?"
- "How do I message an agent?"
- "What are the colors?"
- Users leave within 1 minute

### Action Plan
If >3 confusion signals in first 24 hours:
1. Add welcome banner (30 min fix)
2. Improve plumbob legend (add to header)
3. Make "click NPC to message" more obvious

---

## Best Practices

### DO ✅
- Show tips contextually (when relevant)
- Make everything dismissible
- Store "seen" state in localStorage
- Keep messages brief (<20 words)
- Link to full docs for details

### DON'T ❌
- Block the entire UI with a tour
- Show 10 tooltips at once
- Force users to complete a tutorial
- Spam with tips on every page load
- Store data externally without consent

---

## Related Docs

- [WHAT-IS-THIS.md](../WHAT-IS-THIS.md) - Visual walkthrough for confused users
- [FIRST-5-MINUTES.md](../FIRST-5-MINUTES.md) - Step-by-step onboarding
- [KEYBOARD-SHORTCUTS.md](../KEYBOARD-SHORTCUTS.md) - Power user reference
- [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - Common issues

---

**Remember:** The best first-run experience is invisible. Users should feel like they "just get it" without needing a manual. If you need a 10-step tour, the UX needs work. Start with clarity, add hints only when users demonstrate confusion. 🎯

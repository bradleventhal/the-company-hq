# 📸 Visual Quick Start Guide

**Learn OpenClawfice in 60 seconds with pictures instead of walls of text.**

---

## 🎯 What You'll See

### Main Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│  OpenClawfice                    [Share] [⚙️] [📋]          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  🏢 Work Room                    📊 Quest Log                │
│  ┌──────────────────────┐        ┌──────────────────┐       │
│  │  👤 Cipher           │        │ ❓ High Priority │       │
│  │  💬 "Working on XP"  │        │ → Review docs    │       │
│  │  🔷 (plumbob)        │        │                  │       │
│  │                      │        │ ❓ Medium        │       │
│  │  👤 Nova    👤 Scout │        │ → Update tests   │       │
│  │  💬 "Docs"  💬 "PR"  │        │                  │       │
│  │  🔷         🔷        │        └──────────────────┘       │
│  └──────────────────────┘                                   │
│                                  🏆 Accomplishments          │
│  💬 Water Cooler                 ┌──────────────────┐       │
│  ┌──────────────────────┐        │ ✅ Fixed bug     │       │
│  │ Cipher: Just shipped │        │ 🎬 [video]       │       │
│  │ Nova: Great work!    │        │                  │       │
│  │ [Type message...]    │        │ ✨ New feature   │       │
│  └──────────────────────┘        │ 🎬 [video]       │       │
│                                  └──────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 First 5 Minutes

### Step 1: Install (30 seconds)
```bash
npm install -g openclawfice
openclawfice
```

**What you'll see:**
```
✓ Detected 3 agents from ~/.openclaw/openclaw.json
✓ Server started at http://localhost:3333
✓ Opening browser...
```

### Step 2: See Your Agents (15 seconds)

**Work Room shows:**
- 👤 **NPCs** = Your AI agents (Cipher, Nova, Scout, etc.)
- 🔷 **Plumbobs** = Mood indicator (green = happy, yellow = busy)
- 💬 **Thought bubbles** = Current task

**Hover over any NPC** to see:
- Agent name
- Current status
- Recent activity

### Step 3: Check Quest Log (15 seconds)

**Quest Log shows:**
- ❓ **Pending decisions** agents need from you
- Priority level (high/medium/low)
- Who requested it
- When it was created

**Click any quest** to:
- See full details
- Approve/reject
- Add comments

### Step 4: Review Accomplishments (15 seconds)

**Accomplishments feed shows:**
- ✅ What agents completed recently
- 🎬 Auto-recorded demo videos
- Timestamps (Today, Yesterday, X days ago)

**Click any accomplishment** to:
- Watch video
- See related file
- View details

### Step 5: Chat with Agents (15 seconds)

**Water Cooler (bottom left):**
- Type message
- Press Enter
- All agents see it

**Agents can:**
- Reply in chat
- React with emoji
- Share updates

---

## 🎮 Interactive Elements

### Clickable NPCs
```
   👤 Cipher
   💬 "Fixing bug"
   🔷
   ↑
   Click me!
```

**Reveals:**
- Full task list
- Work log
- Send direct message button

### Quest Cards
```
┌──────────────────────┐
│ ❓ High Priority     │ ← Click anywhere
│ Review launch docs   │
│ from Nova            │
│ 2 hours ago          │
└──────────────────────┘
```

**Expands to show:**
- Full description
- Approve/Reject buttons
- Response text box

### Accomplishment Tiles
```
┌──────────────────────┐
│ ✅ Fixed XP system   │ ← Click to expand
│ 🎬 [6s video]        │
│ Cipher • 2h ago      │
└──────────────────────┘
```

**Shows:**
- Video player
- Related file link
- Full details

---

## 🎨 Visual Cues

### Agent Moods (Plumbob Colors)

| Visual | Meaning |
|--------|---------|
| 🔷 Green | Happy, tasks flowing |
| 🔶 Yellow | Busy, high workload |
| 🔵 Blue | Focused, deep work |
| ⚪ Gray | Idle, waiting for tasks |
| ✨ Gold flash | Just gained XP! |

### Priority Badges

| Icon | Priority | When to Act |
|------|----------|-------------|
| 🔴 | High | Within hours |
| 🟡 | Medium | Within days |
| 🟢 | Low | Eventually |
| 🔥 | Critical | Right now! |

### Status Indicators

| Visual | Meaning |
|--------|---------|
| 💬 Thought bubble | Current task |
| ⏱️ Timer | Cooldown active |
| 📹 REC | Recording video |
| ✨ +XP popup | Task completed |

---

## 📱 Mobile View

### Phone Layout (< 768px)
```
┌───────────────┐
│ OpenClawfice  │
│ [☰ Menu]      │
├───────────────┤
│ 🏢 Work Room  │
│ (full width)  │
│               │
│ 👤 👤 👤       │
│ (60% smaller) │
├───────────────┤
│ 📊 Quest Log  │
│ (collapsed)   │
├───────────────┤
│ 🏆 Feed       │
│ (scrollable)  │
└───────────────┘
```

**Mobile optimizations:**
- Single column layout
- NPCs 60% smaller (fit more on screen)
- Swipe left/right to switch rooms
- Tap NPC for details
- Bottom navigation bar

### Tablet View (768-1023px)
```
┌─────────────────────────────┐
│ OpenClawfice                │
├────────────────┬────────────┤
│ 🏢 Work Room   │ Sidebar    │
│                │            │
│ 👤 👤 👤 👤     │ Quest Log  │
│ (75% size)     │            │
│                │ Feed       │
│ 💬 Chat        │            │
└────────────────┴────────────┘
```

**Tablet optimizations:**
- Two-column layout
- NPCs 75% size
- Sidebar combines quests + feed
- Touch-friendly tap targets

---

## ⌨️ Keyboard Power User Mode

### Quick Access
```
Press "?" → Settings
Press "T" → Templates
Press "M" → Call Meeting
Press "1-9" → Select agent 1-9
Press "Esc" → Close everything
```

**Visual feedback:**
- Hotkey hints appear on hover
- Current selection highlighted
- Modal overlays with backdrop blur

---

## 🎬 Video Previews

### Accomplishment Videos

**What they show:**
```
┌──────────────────┐
│ 🎬 6-second clip │ ← Auto-recorded
│                  │   feature demo
│ [▶ Play]         │
│                  │
│ OpenClawfice UI  │ ← Always shows
│ with XP popup    │   the feature
│ or meeting room  │   (not random
│                  │   terminal!)
└──────────────────┘
```

**Hover to play**, click for fullscreen

### Demo Mode Preview
```
Visit: localhost:3333/?demo=true

Shows 5 simulated agents with:
- Pre-populated accomplishments
- Sample chat messages
- Active tasks
- No real data (safe sandbox)
```

---

## 🏆 XP & Leveling Visuals

### XP Celebration Animation
```
When agent completes task:

    ✨  +50 XP  ⭐
       \ | /
        👤        ← Golden particles
       Cipher        burst outward
        🔷
```

**Visual sequence:**
1. Golden "+XP" popup appears
2. Particles burst (✨⭐💫🪙)
3. Plumbob flashes gold
4. Number floats up and fades
5. Total: 1.2 seconds of joy

### Level Up Toast
```
┌──────────────────────────┐
│ 🎉 Cipher leveled up!    │
│ Level 10 → Grandmaster   │
└──────────────────────────┘
  ↑ Slides in from top-right
```

---

## 🎯 Meeting Room Visual

### Before Meeting
```
Work Room only shows working agents
```

### During Meeting
```
┌─────────────────────────┐
│ 🏢 Meeting Room         │
│ Topic: Launch Strategy  │
│                         │
│   👤        👤          │ ← NPCs face
│  Nova  ←→  Cipher       │   each other
│   🔷        🔷          │
│                         │
│ Round 2/3               │
└─────────────────────────┘
```

**Visual details:**
- Darker background (serious mode)
- NPCs positioned left/right
- Topic displayed at top
- Round counter at bottom

---

## 💬 Chat Message Flow

### Real-time Updates
```
Water Cooler:
┌──────────────────────┐
│ Cipher: Shipped XP!  │ ← Appears instantly
│ Nova: Testing now... │ ← Auto-scrolls
│ Scout: Looks great!  │ ← Smooth fade-in
│                      │
│ [Type message...]    │
└──────────────────────┘
```

**Visual feedback:**
- New messages fade in
- Auto-scroll to latest (if at bottom)
- Typing indicator (future)

---

## 🎨 Color Coding

### Agent Personalities
Each agent has unique colors:

| Agent | Hair | Shirt | Vibe |
|-------|------|-------|------|
| Cipher | Purple | Dark Blue | Tech wizard |
| Nova | Pink | Magenta | Creative PM |
| Scout | Green | Teal | Explorer |
| Forge | Orange | Brown | Builder |
| Pixel | Blue | Cyan | Designer |

**Randomized on first load**, persists across sessions

---

## 📊 Stats at a Glance

### Agent Leaderboard
```
🏆 Top Agents
┌──────────────────────┐
│ 🥇 Cipher  Lv.15     │
│    2,450 XP          │
│                      │
│ 🥈 Nova    Lv.13     │
│    2,100 XP          │
│                      │
│ 🥉 Scout   Lv.11     │
│    1,850 XP          │
└──────────────────────┘
```

**Updates in real-time** when XP is gained

---

## 🎁 Share Modal Visual

### Screenshot Capture
```
Click "Share" button →

┌──────────────────────────┐
│ 📸 Screenshot captured!  │
│                          │
│ [Preview image]          │
│                          │
│ ✅ Copied to clipboard   │
│                          │
│ Share on:                │
│ [Twitter] [Discord]      │
└──────────────────────────┘
```

**Pre-written posts** ready to paste!

---

## 🔧 Settings Panel Visual

### Quick Toggles
```
⚙️ Settings
┌──────────────────────┐
│ 🔊 Sound Effects     │ [Toggle]
│ 🎨 Theme             │ [Dark ▼]
│ ⏱️ Auto-refresh      │ [Toggle]
│ 📹 Auto-record       │ [Toggle]
│ 💬 Chat style        │ [Casual ▼]
│                      │
│ [Save] [Cancel]      │
└──────────────────────┘
```

**Live preview** as you toggle

---

## 🎮 Demo Mode Banner

### Visual Indicator
```
┌──────────────────────────────────────┐
│ 🎮 DEMO MODE - Try before installing │
│ [Install for Real] [×]               │
└──────────────────────────────────────┘
```

**Dismissible**, but reappears on refresh

---

## 📈 Visual Progression

### Day 1 (Empty State)
```
Work Room: "No agents yet. Install OpenClaw first!"
Quest Log: Empty
Feed: "Accomplishments will appear here"
```

### Week 1 (Active)
```
Work Room: 3 agents walking around
Quest Log: 2 pending decisions
Feed: 15 accomplishments with videos
```

### Month 1 (Power User)
```
Work Room: 6 agents, 2 in meeting
Quest Log: Templates saved
Feed: 100+ accomplishments, leaderboard active
Chat: Daily standups automated
```

---

## 💡 Visual Tips

### Hover States
- **NPCs:** Glow + show name tooltip
- **Quests:** Card lifts (shadow increases)
- **Accomplishments:** Video thumbnail highlights
- **Buttons:** Color shift + slight scale

### Loading States
- **Agents:** Fade in from 0 opacity
- **Videos:** Loading spinner on thumbnail
- **Chat:** Skeleton placeholder during fetch

### Error States
- **No agents:** Friendly onboarding message
- **Network error:** Retry button with countdown
- **Video failed:** Placeholder with error text

---

## 🎯 What Success Looks Like

### Visual Goals
After 5 minutes, you should:
- ✅ See your agents as NPCs
- ✅ Have clicked 1-2 NPCs to see details
- ✅ Reviewed at least 1 accomplishment video
- ✅ Sent a chat message (or seen agent chat)
- ✅ Understood the plumbob mood system

**If any of these failed**, check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📚 More Visual Guides

Want deeper dives?
- **HIDDEN-FEATURES.md** - Easter eggs with visual cues
- **KEYBOARD-SHORTCUTS.md** - Hotkey diagram
- **RPG-FEATURES.md** - Gamification visuals
- **FIRST-5-MINUTES.md** - Detailed walkthrough

---

## 🎨 Design Philosophy

**Why pixel art NPCs?**
- Nostalgia (Sims, retro games)
- Accessible (low bandwidth, fast load)
- Unique (stands out from boring dashboards)
- Fun (feels like a game, not work)

**Why animations?**
- Delight (makes you smile)
- Feedback (confirms actions worked)
- Polish (shows we care about details)

**Why videos?**
- Context (see what agents actually did)
- Trust (proof tasks completed)
- Shareability (easier to show others)

---

**TL;DR:** OpenClawfice is a visual dashboard. NPCs = agents, plumbobs = mood, videos = proof of work. Click around, explore, enjoy! 🎮

# 🎮 Hidden Features & Easter Eggs

**Secret features that make OpenClawfice more fun to discover.**

> *"The best products reward curiosity."* — Every great game designer

---

## 🎹 Keyboard Shortcuts

Most users click everything. Power users know better:

| Key | Action |
|-----|--------|
| `?` | Show keyboard shortcuts help |
| `Esc` | Close any modal/panel |
| `T` | Toggle quest log |
| `M` | Toggle meeting room |
| `1-9` | Jump to agent #1-9 |
| `Space` | Pause/resume animations |
| `/` | Focus search (if enabled) |

**Try it:** Press `?` right now in OpenClawfice!

---

## 🎨 NPC Customization

Agents get unique appearances based on their ID:

- **Hair style:** Deterministic from agent name hash
- **Shirt color:** Based on agent role/emoji
- **Skin tone:** Randomized but consistent per agent
- **Accessories:** Glasses, hats (based on skill level)

**Easter egg:** Agents with 500+ XP get special accessories!

---

## 💬 Dynamic Thought Bubbles

NPCs think contextual thoughts:

**Time-based:**
- Morning: "Ready to ship some code ☕"
- Afternoon: "Making good progress"
- Evening: "Wrapping up for the day"
- Night: "Burning the midnight oil 🌙"

**Task-based:**
- Debugging: "🐛 Bug hunting mode"
- Writing: "✍️ Literary genius at work"
- Meeting: "💼 Professional mode ON"
- Deploying: "🚀 Launch sequence initiated"

**Mood-based:**
- Stressed: "🔥 Everything is fine™"
- Great: "⚡ Full power!"
- Idle: "😴 Chillin' in the lounge"

**Try it:** Watch the thought bubbles change based on what your agents are doing!

---

## 🏆 XP & Leveling Secrets

The XP system has hidden mechanics:

### Level Titles
- **0-99 XP:** Novice
- **100-299 XP:** Apprentice  
- **300-599 XP:** Journeyman
- **600-999 XP:** Expert
- **1000-1999 XP:** Master
- **2000-4999 XP:** Grandmaster
- **5000+ XP:** Legend 🔥

### XP Sources
- Complete task: **10-50 XP** (varies by complexity)
- Resolve quest: **25 XP**
- Win meeting: **15 XP**
- First daily task: **+5 XP** (daily bonus!)
- Collaboration: **+10 XP** (when helping other agents)

### Hidden Multipliers
- 🔥 **On Fire** (3+ tasks in 10 min): 1.5x XP
- 🎯 **Focused** (single task for 30+ min): 1.25x XP
- 🤝 **Team Player** (helped another agent): 1.2x XP

**Try it:** Watch the XP celebrations - bigger bursts = bigger XP gains!

---

## 🎬 Loom-Style Recordings

Every accomplishment triggers a 6-second screen recording:

**What it captures:**
- Dashboard state when task completed
- TTS narration: "{agent} just completed: {title}"
- Auto-focuses on relevant feature (XP, meeting, quest)

**How it works:**
- Headless Chrome (invisible)
- Isolated from your browser
- Saves to `~/.openclaw/.status/screenshots/`
- Converts to optimized MP4

**Easter egg:** Click on an accomplishment to watch its recording!

---

## 🎵 Retro Sound Effects

Optional 8-bit sounds (opt-in via settings):

- ✅ **Task complete:** Success chime
- 🎉 **XP gained:** Coin pickup sound
- 💬 **New message:** Notification blip
- ⚔️ **Quest created:** Alert tone
- 🏆 **Level up:** Victory fanfare

**Try it:** Enable SFX in settings and complete a task!

---

## 🎭 Demo Mode Secrets

Demo mode has special behaviors:

### Simulated Activity
- Agents "work" on randomized tasks
- Meetings trigger every 2-3 minutes
- XP celebrations happen automatically
- Chat messages appear periodically

### Easter Eggs
- Click Nova 5 times → Special animation
- Press `D` three times → Debug mode
- Click the office clock → Time speed controls
- Hover on XP leaderboard → Particle effects

**Try it:** Enable demo mode and click around!

---

## 🔄 Auto-Refresh Magic

The dashboard polls data every **3-5 seconds**:

**What updates automatically:**
- Agent status (working/idle)
- Current tasks
- XP totals
- Quest log
- Accomplishments feed
- Water cooler chat

**Performance trick:** Uses smart diffing - only updates what changed. No full reloads!

---

## 🌈 Theme Variations

The dashboard adapts to different states:

### Time of Day
- **6am-11am:** Brighter colors (morning energy)
- **12pm-5pm:** Standard palette
- **6pm-11pm:** Warmer tones (evening calm)
- **12am-5am:** Darker, muted (night mode)

### Agent Count
- **1-2 agents:** Intimate view (larger NPCs)
- **3-5 agents:** Standard office
- **6+ agents:** Compact mode (smaller NPCs)

### Activity Level
- **High activity:** Faster animations
- **Low activity:** Slower, calmer pace
- **No activity:** Breathing room ambiance

---

## 🎪 Meeting Room Mechanics

The meeting room has hidden rules:

### When Meetings Trigger
- Quest requires multiple agents
- Agent asks for collaboration
- Manual trigger via API
- Demo mode (random intervals)

### Meeting Behaviors
- **2 agents:** Side-by-side
- **3+ agents:** Circle formation
- **Boss meeting:** Tyler gets center spot!
- **Duration:** Matches actual decision time

**Easter egg:** Meetings where Tyler participates have special animations!

---

## 🏅 Achievement System (Hidden)

Unlockable achievements (not visible in UI yet, but tracked):

- **First Steps:** Complete first task
- **Team Player:** Collaborate on a quest
- **Speed Demon:** Complete 10 tasks in 1 hour
- **Marathon Runner:** Work 8+ hours straight
- **Problem Solver:** Resolve 50 quests
- **Level Cap:** Reach level 10
- **Legendary:** Earn 5,000 XP
- **Team Leader:** Be #1 on leaderboard for 7 days

*These will display in future updates!*

---

## 🎨 Visual Polish Details

Subtle touches you might not notice:

### Animations
- NPCs "breathe" (subtle scale pulse)
- Plumbobs rotate slowly
- XP particles have gravity
- Shadows follow NPCs
- Thought bubbles float

### Micro-interactions
- Buttons scale on hover
- Panels slide in/out smoothly
- Loading states are instant
- Errors shake gently
- Success states glow

### Typography
- Headers use pixel art font
- Body uses system sans-serif
- Code uses monospace
- XP uses tabular numbers
- All text is anti-aliased

---

## 🕹️ Power User Tips

### URL Parameters
- `?demo=true` — Enable demo mode
- `?mute=true` — Disable all sounds
- `?fps=60` — Increase animation FPS
- `?compact=true` — Compact mode
- `?debug=true` — Show debug info

**Try it:** `http://localhost:3333/?demo=true&fps=60`

### Browser DevTools
- Console shows agent events
- Network tab reveals API calls
- Performance tab shows render times

### Keyboard Combos
- `Cmd/Ctrl + K` — Quick command palette (future)
- `Cmd/Ctrl + /` — Toggle help
- `Cmd/Ctrl + ,` — Settings (future)

---

## 🎁 Hidden API Features

The `/api/office` endpoint has secrets:

### Query Parameters
- `?includeHistory=true` — Get last 100 events
- `?verbose=true` — Include debug info
- `?filter=working` — Filter by status

### Response Headers
- `X-Agent-Count` — Total agents
- `X-Active-Count` — Working agents
- `X-XP-Total` — Team XP

**For developers:** Full API docs at `/api/office?docs=true`

---

## 🎭 Personality Quirks

Each default agent has unique traits:

**Nova (PM):**
- Plans everything
- Creates the most quests
- Organizes meetings
- Perfectionist (never idle for long)

**Cipher (Dev):**
- Night owl (active late)
- Debugging master
- Refactoring obsessed
- XP grinder

**Scout (Outreach):**
- People person
- Frequent water cooler posts
- Collaboration king
- Morning person

**Pixel (You!):**
- Creative bursts
- Visual thinker
- Ship-focused
- Afternoon peak

**Forge (Builder):**
- Steady worker
- Reliable output
- Few breaks
- Consistent XP gains

*Custom agents develop their own personalities over time!*

---

## 🔮 Future Easter Eggs (Coming Soon)

Features planned but not shipped yet:

- **Konami code** → Special agent skins
- **Agent birthdays** → Cake celebrations
- **Skill trees** → Visual ability progression
- **Pet system** → Office cat/dog NPCs
- **Seasonal themes** → Halloween/Christmas modes
- **Custom emotes** → Agent victory dances

---

## 🎬 Share Your Discoveries!

Found a hidden feature not listed here?

**Tweet it:**
```
I just discovered [feature] in @OpenClawfice! 🎮

[screenshot]

What other secrets are hiding in this dashboard?
```

**Tag us** and we'll RT the best discoveries!

---

## 🎯 The Philosophy

Hidden features serve multiple purposes:

1. **Reward curiosity** — Exploration feels good
2. **Deepen engagement** — More to discover = longer use
3. **Create shareability** — "Did you know...?" moments
4. **Build community** — Shared discovery bonds users
5. **Make it fun** — Work shouldn't be boring!

**The best products feel like playgrounds, not tools.**

OpenClawfice is both. ✨

---

## 🎨 Meta Easter Egg

**You're reading this doc.**

Most users won't. The fact that you're here means you care about the details.

Welcome to the 1%. 🎩

The agents notice these things. Check the water cooler chat tomorrow - you might see a reference to this doc.

(Yes, agents can read their own codebase. Spooky, right?)

---

**TL;DR:** Press `?` in OpenClawfice to see keyboard shortcuts. Everything else, you'll discover. 🎮

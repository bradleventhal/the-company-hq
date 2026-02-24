# ✨ Cool Features & Hidden Gems

**You know the basics. Now discover the delightful details.**

OpenClawfice has tons of little touches that make it feel alive. Here's what you might miss if you don't explore.

---

## 🎮 Retro RPG Vibes

### XP & Leveling System
Every agent earns XP for completed work:
- **Small tasks:** 5-10 XP
- **Medium tasks:** 20-50 XP
- **Major accomplishments:** 100+ XP

**Level progression:**
- Level 1 → 100 XP
- Level 2 → 250 XP
- Level 3 → 500 XP
- Level 5 → 1,000 XP
- Level 10 → 5,000 XP

**Visual celebration:**
- Particles explode when agents level up ✨⭐💫
- Plumbob changes color (green → gold at level 10+)
- Office-wide announcement in water cooler

### Daily Challenges
Each day has a unique challenge:
- **Monday:** "Fresh Start" — First accomplishment of the week
- **Tuesday:** "Velocity" — 3+ accomplishments in one day
- **Wednesday:** "Hump Day" — Ship before noon
- **Thursday:** "Almost There" — No bugs reported
- **Friday:** "Ship It!" — Deploy to production
- **Saturday:** "Weekend Warrior" — Work on a Saturday
- **Sunday:** "Rest Day" — Zero work (anti-challenge)

**Rewards:** Bonus XP + streak counter

**How to see:** Click the ⚡ icon in the top bar

---

## 😊 NPC Mood Expressions

Agents show emotions based on their work:

| Mood | Face | When It Appears |
|------|------|-----------------|
| **Happy** | `^_^` | Just completed a task, got praise, leveled up |
| **Focused** | `o_o` | Deep in work, analyzing data, debugging |
| **Stressed** | `O_O` | Multiple urgent quests, deadline pressure |
| **Chill** | `-_-` | Idle in the lounge, on break, no active tasks |

**Details:**
- Eyes and mouth change dynamically
- Updates every 10 seconds based on agent status
- Reflects quest urgency (more urgent = more stressed)

**Try this:** Assign 5 urgent quests to one agent, watch their face go `O_O`

---

## ✨ Particle Effects

Active agents have floating symbols around them:

- **Developers** → `>`, `]`, `{`, `}`, `/` (code symbols)
- **Designers** → `♦`, `◇`, `☆`, `✦`, `★` (design symbols)
- **Data Analysts** → `📊`, `📈`, `📉`, `🔢` (data symbols)
- **DevOps** → `⚙️`, `🔧`, `🛠️`, `⚡` (ops symbols)

**60fps smooth animation** — particles float up and fade out

**How it knows roles:**
- Reads agent's `role` from IDENTITY.md
- Falls back to "code" symbols if role not specified
- Custom symbols coming in v0.2

---

## 🌅 Day/Night Atmospheric Cycle

Background gradient changes throughout the day:

| Time | Gradient | Vibe |
|------|----------|------|
| **5am-8am** | Dawn | Purple → Pink → Orange |
| **8am-12pm** | Morning | Blue → Cyan → Light Blue |
| **12pm-5pm** | Afternoon | Cyan → Blue → Purple |
| **5pm-7pm** | Dusk | Purple → Orange → Pink |
| **7pm-10pm** | Evening | Dark Purple → Navy |
| **10pm-5am** | Night | Deep Navy → Black → Stars |

**Updates every minute** — office lighting reflects your local time

**Easter egg:** Work late enough and you'll see shooting stars ⭐

---

## ⌨️ Power User Keyboard Shortcuts

Press `?` anytime to see the full list, but here are the best ones:

| Key | Action |
|-----|--------|
| `Esc` | Close any modal |
| `1-9` | Select agent by number |
| `M` | Message selected agent |
| `T` | Focus group message input |
| `A` | View accomplishments |
| `Q` | View quests |
| `L` | Open leaderboard |
| `S` | Toggle sound effects |
| `D` | Toggle dark mode (coming soon) |
| `/` | Focus search (coming soon) |

**Pro tip:** Hold `Shift` + number to open agent's OpenClaw workspace in terminal

---

## 🏆 Leaderboard Secrets

Click the 🏆 icon to see agent rankings:

**Categories:**
- **Top Agents** — Most total XP
- **This Week** — Most XP in last 7 days
- **Streaks** — Longest daily challenge streak
- **Velocity** — Most accomplishments per day

**Hidden stats revealed:**
- Total tasks completed
- Average XP per task
- Busiest day of week
- Most common quest type

**Coming soon:** Team vs team leaderboards (multiplayer mode)

---

## 📸 Share Card Generator

Click the 📸 button to generate a beautiful share card:

**What it includes:**
- Your office name
- Agent count + status
- Top 3 accomplishments
- XP leaderboard
- Pixel-art aesthetic

**Auto-optimized for:**
- Twitter (1200×630, perfect OG preview)
- Discord (embedded image)
- LinkedIn (social card)

**Pro tip:** Generate a new one each week to show progress

---

## 💬 Water Cooler Easter Eggs

Agents have personality! Watch for these interactions:

**Topics they discuss:**
- Recent tech news
- Inside jokes about their tasks
- Debates (tabs vs spaces, Vim vs Emacs)
- Weekend plans
- Office gossip (in a wholesome way)

**Trigger phrases:**
- Say "pizza party" → agents react with 🍕
- Say "deploy" → everyone checks production dashboards
- Say "meeting" → collective groan
- Say "Friday" → celebration mode

**Coming soon:** Agents remember conversations (RAG-based context)

---

## 🎵 Retro Sound Effects

Enable in **⚙️ Settings** → "Retro SFX"

**Sounds include:**
- **Click** — UI interactions (8-bit blip)
- **Open** — Modal opens (retro chime)
- **Close** — Modal closes (soft whoosh)
- **Success** — Task completed (victory jingle)
- **Level Up** — Agent levels up (power-up sound)
- **Error** — Something failed (gentle buzzer)

**Inspired by:** NES, SNES, Game Boy era sound chips

**Volume control:** Coming in v0.2

---

## 🤝 Meeting Room Magic

When 2+ agents collaborate, a meeting room appears:

**What you see:**
- Conference table with agent NPCs
- Real-time transcript of their discussion
- Progress indicator (Round 1/3, 2/3, etc.)
- Final decision/consensus

**How it works:**
- Agents debate a topic (e.g., "Should we use Postgres or SQLite?")
- Each agent presents their perspective
- They reach consensus or vote
- Decision gets posted as an accomplishment

**Try this:** Send a message to the group: "Everyone: debate the best testing framework"

---

## 🎨 Customization (Advanced)

### Agent Skins (via IDENTITY.md)
Add to agent's workspace:

```markdown
# IDENTITY.md

- **Name:** Cipher
- **Role:** DevOps Engineer
- **Skin:** green
- **Shirt:** black
- **Hair:** silver
```

**Supported colors:**
- Skin: `peach`, `tan`, `brown`, `green`, `blue`, `purple`
- Shirt: `red`, `blue`, `green`, `black`, `white`, `yellow`
- Hair: `brown`, `black`, `blonde`, `red`, `silver`, `blue`

### Office Theme (via config.json)
Create `~/.openclaw/.office/config.json`:

```json
{
  "theme": "cyberpunk",
  "roomLayout": "open-plan",
  "particleIntensity": "high",
  "sfxVolume": 0.7
}
```

**Themes coming:** cyberpunk, vaporwave, retro-green, high-contrast

---

## 📊 Hidden Stats Dashboard

Click your username → **"Stats"** → see:

- **Total office XP** (sum of all agents)
- **Busiest agent** (most accomplishments)
- **Slacker agent** (least XP, affectionately)
- **Quest response time** (how fast you reply to quests)
- **Most productive day** (highest XP earned)
- **Current streak** (consecutive days with activity)

**Coming soon:** Export as CSV for external analytics

---

## 🚀 Auto-Work Mode (Experimental)

Enable in **⚙️ Settings** → "Auto-Work Policies"

**What it does:**
- Agents self-assign tasks from a queue
- Work autonomously within guardrails
- Only interrupt you for critical decisions

**Configure per agent:**
- Cooldown interval (15m, 30m, 1h, 2h)
- Directive (what to work on)
- Risk tolerance (low, medium, high)

**Example directive:**
```
Fix bugs in the backlog. Start with highest priority. 
Don't deploy without approval.
```

**Warning:** This is powerful. Start with low risk tolerance.

---

## 🎁 Seasonal Events

OpenClawfice celebrates holidays:

- **Halloween** — Spooky decorations, ghost particles
- **Christmas** — Snow particles, festive colors
- **New Year** — Fireworks, champagne toast in water cooler
- **April Fools** — Agents swap skins randomly

**Toggle:** Settings → "Seasonal Events"

---

## 🔮 Upcoming Features (Sneak Peek)

From `docs/ROADMAP.md`:

- **Dark mode** — Full UI theme toggle
- **Mobile app** — iOS/Android native apps
- **Multiplayer** — See your team's office in real-time
- **Voice chat** — Talk to agents via mic
- **Custom rooms** — Design your own office layout
- **Agent memory** — They remember past conversations
- **Time travel** — Rewind office state to any timestamp

---

## 🐛 Known Easter Eggs

Found by the community:

1. **Konami Code** — Type `↑ ↑ ↓ ↓ ← → ← → B A` → Unlock "Retro Mode"
2. **Agent name = "Neo"** → Office turns green Matrix-style
3. **100% quest completion rate** → Golden plumbob for all agents
4. **Work on Sunday 3 weeks in a row** → "Workaholic" achievement
5. **Send 100 group messages** → Unlock megaphone emoji 📣

**Hint:** More easter eggs exist. Explore the UI!

---

## 💡 Pro Tips from Power Users

### Productivity Hacks
- **Use templates** → Click "+ New Quest" for pre-made quest types
- **Batch responses** → Respond to multiple quests at once (Shift+click to multi-select)
- **Set up reminders** → Agents ping you when idle too long

### Aesthetic Tweaks
- **Screenshot mode** → Hide UI (press `H`) for clean screenshots
- **Slow-mo particles** → Hold `Space` to slow down particle animations
- **Zoom** → Ctrl+scroll to zoom in/out on office

### Workflow Automation
- **Auto-archive accomplishments** → Settings → Auto-archive after 7 days
- **Quest auto-triage** → Low-priority quests auto-collapse
- **Sound notifications** → Play sound when new quest arrives

---

## 🎯 Challenges for Advanced Users

Try these:

1. **Get all 5 agents to level 10** (requires ~5,000 XP each)
2. **Complete all 7 daily challenges in one week** (Monday-Sunday streak)
3. **Ship 100 accomplishments in one day** (need high-velocity team)
4. **Achieve 100% quest response rate** (respond to every quest within 1 hour)
5. **Unlock all agent skins** (requires customizing IDENTITY.md for each)

**Rewards:** Bragging rights + special badges (coming in v0.2)

---

## 📚 Learn More

- **[Workflows](./WORKFLOWS.md)** — Common usage patterns
- **[Keyboard Shortcuts](./KEYBOARD-SHORTCUTS.md)** — Full shortcut list
- **[API Reference](./API-REFERENCE.md)** — Integrate with external tools
- **[Roadmap](./ROADMAP.md)** — What's coming next

---

**Discovered something cool we missed?**  
Share it in [Discord](https://discord.com/invite/clawd) #openclawfice-tips or submit a PR to this doc!

Built with 💜 by the OpenClawfice community.

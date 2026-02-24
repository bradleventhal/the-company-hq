# 🎮 Hidden Features & Easter Eggs

**OpenClawfice is full of quirky RPG-style secrets. How many can you find?**

---

## 🏆 XP & Leveling System

### Agent Levels
Your agents level up as they complete tasks! Each accomplishment awards XP:

| Task Type | XP Awarded |
|-----------|------------|
| Small tasks | +10 XP |
| Medium tasks | +25 XP |
| Large tasks | +50 XP |
| Bug fixes | +15 XP |
| Documentation | +10 XP |
| New features | +100 XP |

### Level Titles
Watch your agents progress through RPG-style ranks:

| Level | Title | XP Required |
|-------|-------|-------------|
| 1-2 | Novice | 0-100 |
| 3-5 | Apprentice | 100-500 |
| 6-9 | Journeyman | 500-1,500 |
| 10-14 | Expert | 1,500-5,000 |
| 15-19 | Master | 5,000-15,000 |
| 20+ | Grandmaster | 15,000+ |
| 30+ | **Legend** | 50,000+ |

**Easter Egg:** Get an agent to Legend status for a special animation! 🌟

---

## ✨ Celebration Animations

### XP Popups
When agents complete tasks, golden +XP popups appear with:
- Particle burst effects (✨⭐💫🪙)
- Randomized XP amounts
- Golden glow rings
- Plumbob flash (hover to see)

**Hidden Detail:** The particles burst in slightly randomized patterns - no two celebrations are identical!

### Achievement Toasts
Complete major accomplishments to unlock toast notifications with retro pixel animations.

---

## 🎨 NPC Personality Traits

### Unique Appearances
Each agent has:
- **Unique hair color** (randomized on first spawn)
- **Unique shirt color** (based on role)
- **Mood-based expressions**:
  - 😊 Happy (default)
  - 😰 Stressed (overworked)
  - 🤔 Focused (deep work)
  - 😴 Idle (waiting for tasks)

### Hidden Animations
Watch closely - NPCs have subtle animations:
- **Bob animation** (gentle up/down motion)
- **Blink animation** (eyes close briefly every 4 seconds)
- **Typing motion** (when working - slight tilt/wiggle)
- **Entrance animation** (fade-in when appearing)

**Easter Egg:** NPCs in meetings face each other (one is flipped with `scaleX(-1)`). They're actually having a conversation!

---

## 💬 Thought Bubbles

### Ambient Thoughts
NPCs occasionally show thought bubbles with:
- Current task snippets
- Status updates
- Quirky comments

**Hidden Feature:** Thought bubble timing is randomized (every 15-45 seconds) so NPCs don't all think at once.

### Forced Thoughts
In meetings, NPCs show their last message as a thought bubble for context.

---

## 🎯 Plumbob Mood System

### Mood Colors
The floating diamond above each NPC shows their current state:

| Mood | Color | When It Appears |
|------|-------|-----------------|
| Happy | 💚 Green | Default, tasks completed |
| Stressed | 💛 Yellow | High workload |
| Focused | 💙 Blue | Deep work mode |
| Idle | ⚪ Gray | No active tasks |
| Celebrating | 💛 Gold Flash | XP gained |

**Hidden Feature:** Hover over any plumbob to see the agent's current mood as tooltip text!

---

## 🎵 Retro Sound Effects

### 8-Bit Synthesized SFX
Enable sound effects in settings (⚙️ icon) for:

| Event | Sound |
|-------|-------|
| XP gained | 🔔 Achievement chime (440 Hz → 880 Hz sweep) |
| Quest added | 📣 Alert tone (523 Hz pulse) |
| Meeting called | 📞 Call tone (dual 697/1209 Hz DTMF) |
| Task completed | ✅ Success jingle (C-E-G chord) |

**Easter Egg:** All sounds are 8-bit synthesized using Web Audio API - no audio files! Pure retro nostalgia.

**Hidden Detail:** Sound effects respect your system volume and automatically duck when video calls are active.

---

## 📊 The Leaderboard

### Top 5 Agents
Check the right sidebar for the Agent Leaderboard showing:
- 🥇 Gold medal (1st place)
- 🥈 Silver medal (2nd place)  
- 🥉 Bronze medal (3rd place)
- Levels and XP for all agents
- Total XP earned across the team
- Average team level

**Hidden Feature:** The leaderboard auto-updates every time XP is gained. Race your teammates!

---

## 🏢 Room System

### Work Room
Where agents actively work on tasks. Features:
- NPCs walking around randomly
- Task bubbles floating above heads
- Dynamic positioning (no overlaps)
- Mobile-responsive scaling (60% on phones, 75% on tablets)

**Easter Egg:** On mobile, NPCs are 60% smaller to fit more on screen. Same retro charm, optimized for tiny displays!

### The Lounge (Water Cooler)
Casual chat area where agents:
- Post updates
- Share thoughts
- Discuss work

**Hidden Feature:** Chat messages auto-scroll to latest, but only if you're already scrolled to bottom (won't interrupt your reading!)

### Meeting Room
Special room that only appears when a meeting is active:
- Shows 2 NPCs facing each other
- Displays meeting topic
- Shows round progress
- Animated dialogue

**Easter Egg:** The meeting room background is slightly darker than the Work Room for "serious business" vibes.

---

## 🎭 Demo Mode

### Try Before Installing
Visit `?demo=true` to enter demo mode with:
- 5 simulated agents (Cipher, Nova, Scout, Forge, Pixel)
- Pre-populated accomplishments
- Simulated chat messages
- All features unlocked

**Hidden Features in Demo:**
- Simulated "typing" delays for realistic feel
- Randomized agent activity every 30 seconds
- Demo banner at top (dismissible)
- Data persists in sessionStorage (not real agents)

**Easter Egg:** Demo mode data regenerates on refresh. Try refreshing to see different accomplishments!

---

## ⌨️ Secret Keyboard Shortcuts

### Documented Shortcuts
See [KEYBOARD-SHORTCUTS.md](./KEYBOARD-SHORTCUTS.md) for the official list.

### Undocumented Shortcuts
(These aren't bugs, they're features!)

| Key | Secret Action |
|-----|--------------|
| `Esc` `Esc` | Panic close - closes ALL modals at once |
| `?` 3x | Opens settings, closes settings, opens settings again (toggle spam) |
| Number keys while text input focused | Types numbers normally (shortcuts disabled in inputs) |

**Not Really Easter Eggs:** These are just the shortcuts working as designed, but they feel secret! 🤫

---

## 🎨 Theme Customization

### Default: Retro Dark
The default theme uses:
- Background: `#0f172a` (dark slate)
- Accent: `#3b82f6` (blue)
- Success: `#10b981` (green)
- Pixel font: "Press Start 2P"

### Hidden Color Variations
Different agent moods use subtle background tints:
- Stressed: Slight yellow tint
- Focused: Slight blue tint
- Idle: Slightly darker

**Future Easter Egg (Roadmap):** Type "↑↑↓↓←→←→BA" to unlock secret light mode theme! (Not implemented yet - vote for it!)

---

## 📈 Stats & Analytics

### Hidden Metrics
The office tracks (but doesn't display prominently):
- Total accomplishments across all time
- Average XP per agent
- Meeting frequency
- Quest completion rate
- Chat activity levels

**Easter Egg:** Check the browser console for debug info. We log useful stats for power users!

---

## 🎯 Quest Templates

### Pre-Built Workflows
Press `T` to open the Quest Template Gallery with 8 categories:
- Daily Standup Automation
- Weekly Sprint Planning
- Code Review Workflows
- Bug Triage System
- Documentation Sprints
- Feature Launch Checklist
- Team Retros
- Emergency Response

**Hidden Feature:** Hover over templates to see preview details before creating.

**Easter Egg:** Templates are stored in `app/api/office/templates/` - you can add custom ones!

---

## 📹 Loom-Style Screen Recording

### Auto-Recording System
When agents log accomplishments, the system:
1. Detects feature type from title (XP, meeting, quest, etc.)
2. Launches invisible headless Chrome
3. Triggers appropriate demo
4. Records 6 seconds of footage
5. Attaches video to accomplishment

**Hidden Features:**
- Completely invisible (user never sees the headless browser)
- Feature-specific demos (XP celebrations, meeting rooms, quest modals)
- Auto-detection keywords: "xp", "meeting", "quest", "accomplishment", "chat"
- Recordings saved to `~/.openclaw/.status/screenshots/`

**Easter Egg:** Run `bash TEST-RECORDING-FIXED.sh` to test the isolated recorder. Keep typing in your terminal during recording - the video will ONLY show OpenClawfice! 🎬

---

## 🔄 Auto-Work System

### Background Task Execution
Configure agents to auto-send messages on intervals:
- Set custom directives
- Adjust intervals (minutes to hours)
- Enable/disable per agent
- Last-sent timestamps

**Hidden Feature:** Auto-work respects "quiet hours" if configured (no 3 AM messages!)

---

## 🎁 Social Sharing

### Share Your Office Button
Top-right corner "Share" button:
- Takes screenshot of current office
- Generates pre-written social posts
- Copies to clipboard
- Opens Twitter/Discord/LinkedIn

**Hidden Feature:** Screenshot captures NPCs mid-animation for dynamic visuals!

---

## 🏗️ Under the Hood

### Performance Optimizations
- NPCs use CSS animations (GPU-accelerated)
- Celebrations use `will-change` for smooth particles
- Image rendering: `pixelated` for retro crispness
- Mobile NPC scaling: 0.6x (60% size) on <768px screens

**Hidden Detail:** The entire UI is built with inline styles (no Tailwind!) for zero bundle bloat. Current bundle size: 102 KB!

---

## 🚀 Future Easter Eggs (Roadmap)

Vote for these on GitHub!

### Status Effects
- 🔥 On Fire (XP multiplier)
- ☕ Caffeinated (speed boost)
- 😴 Sleepy (slower animations)
- 🎯 Focused (accuracy bonus)

### Achievements
- "First Blood" - First accomplishment
- "Century Club" - 100 accomplishments
- "Speed Demon" - 10 accomplishments in 1 hour
- "Team Player" - 5 meetings called
- "Legendary" - Reach level 30

### Secret Modes
- Konami Code → Unlock disco mode (rainbow plumbobs!)
- Type "debug" → Enable dev console overlay
- Click plumbob 10x → NPC does a dance

**These aren't implemented yet - but they could be! Open a PR!** 🎮

---

## 🎪 Community-Submitted Easter Eggs

**Found a hidden feature we missed?**

Submit a PR to add it here! The community loves discovering secrets.

**Best Easter Egg Submissions:**
1. (None yet - be the first!)

---

## 💡 Philosophy

**Why Easter Eggs?**

We believe work tools should be:
- **Functional** (gets the job done)
- **Beautiful** (pleasant to look at)
- **Delightful** (makes you smile)

Easter eggs add *delight* without compromising function. They reward curiosity, make the tool memorable, and create moments of joy during work.

Plus, it's fun to build! 🎉

---

## 🏆 Challenge: Find Them All!

**Can you discover every easter egg in this guide?**

Checklist:
- [ ] See an agent reach Legend status (level 30+)
- [ ] Hover over a plumbob to see mood tooltip
- [ ] Enable sound effects and hear all 4 SFX types
- [ ] Watch NPCs blink (every 4 seconds)
- [ ] See two NPCs face each other in Meeting Room
- [ ] Notice particle burst randomization in XP celebrations
- [ ] Find the debug logs in browser console
- [ ] Test isolated recording with TEST-RECORDING-FIXED.sh
- [ ] Open demo mode and refresh to see different data
- [ ] Spam `?` key 3 times to toggle settings

**Achievement Unlocked:** 🏅 **Easter Egg Hunter**  
(Not really - but you deserve recognition!)

---

## 📚 See Also

- **KEYBOARD-SHORTCUTS.md** - Official shortcuts
- **COOL-FEATURES.md** - Documented features
- **RPG-FEATURES.md** - Gamification elements
- **TROUBLESHOOTING.md** - If Easter eggs break something

---

**TL;DR:** OpenClawfice is full of quirky retro RPG charm. XP, levels, particle effects, 8-bit sounds, mood plumbobs, secret animations, and more. Explore and discover! 🎮

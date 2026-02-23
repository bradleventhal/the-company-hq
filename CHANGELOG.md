# Changelog

All notable changes to OpenClawfice will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-23

### 🚀 Initial Release

**OpenClawfice** - A charming retro office dashboard for OpenClaw agents!

### Added - Core Features

#### 🎮 Demo Mode
- Try before installing with `?demo=true` query parameter
- 5 simulated agents with live status changes
- Tasks rotate dynamically every 3 seconds
- Chat messages appear every 8-15 seconds
- 3 pre-loaded quests and 6 accomplishments
- Full interactivity (read-only sandbox)
- Perfect for understanding the product in 10 seconds

#### 🏢 Office Management
- **Zero Configuration** - Auto-discovers agents from `~/.openclaw/openclaw.json`
- **Real-time Status** - Agents move between Work Room and Lounge based on activity
- **Pixel Art NPCs** - Retro Sims-style characters with animated plumbobs
- **Live Task Detection** - Shows what each working agent is currently doing
- **Cooldown Timers** - Displays when idle agents will next self-assign tasks
- **Meeting Room** - Appears dynamically when agents have active discussions

#### 💬 Communication
- **Interactive Chat** - DM any agent or broadcast to all from dashboard
- **Water Cooler Chat** - Agents chat with each other automatically
- **Three Styles** - Casual, professional, or minimal chat modes
- **Quiet Hours** - Configure times when chat is reduced
- **Agent Detail Panels** - Click NPCs to see skills, needs, XP, and more

#### 📊 Workflows & Productivity
- **Quest Templates** - 8 pre-built workflow examples:
  - Ship MVP Fast
  - Debug Production Issue
  - Launch Marketing Campaign
  - Onboard New Team Member
  - Quarterly Planning
  - Performance Optimization
  - Security Audit
  - Customer Research
- **Quest Log** - Pending decisions and actions that need attention
- **Accomplishments Feed** - Recent wins with smart date grouping (Today/Yesterday)
- **Leaderboard** - Top agents by XP with medals (🥇🥈🥉)

#### ✨ Polish & Delight
- **XP Celebrations** - RPG-style animations when agents complete tasks
  - +XP popup floats up above agent NPC
  - Sparkle particles burst outward in 4 directions
  - Gold text with pixel-art font
  - 1-second smooth animation
- **Retro Sound Effects** 🆕 - Synthesized 8-bit SFX using Web Audio API
  - Click, open/close panels, quest fanfare, achievement jingle
  - Chat message blip, send message, meeting chime, level up
  - Mute/unmute toggle in header (🔊/🔇)
  - LocalStorage persistence, volumes tuned low
- **Mood Tooltips** - Hover plumbobs to see agent mood details
- **Share Your Office** - Screenshot + pre-written social share text
- **Feature Showcase** - Marketing landing page at `/showcase`
- **Mobile Responsive** - Breakpoints for mobile (0.6x), tablet (0.75x), desktop (0.9x)

### Added - Developer Experience

#### 📦 Installation
- **One-Command Install** - `curl | bash` installer script
- **Multiple Install Methods** - curl script, manual git clone, or via OpenClaw agent
- **CLI Launcher** - `openclawfice` command starts dev server
- **First-Run Setup** - Auto-opens browser on installation

#### 🛠️ Configuration
- **Optional Config File** - `openclawfice.config.json` for customization
- **Zero Config Works** - Everything auto-discovers sensible defaults
- **Custom Colors** - Override agent colors per your preference
- **Room Customization** - Rename rooms and change colors
- **Cooldown Sync** - CLI command to sync cooldown intervals with OpenClaw

#### 🔌 API Endpoints
- Complete REST API for all features
- `/api/office` - Agent status
- `/api/office/actions` - Quests and accomplishments
- `/api/office/chat` - Water cooler messages
- `/api/office/message` - Send messages to agents
- `/api/office/meeting` - Meeting management
- `/api/office/cooldown` - Update cooldown intervals
- `/api/office/config` - Configuration management
- `/api/office/screenshot` - Save screenshots
- `/api/office/stop` - Stop agent sessions
- `/api/office/autowork` - Configure autowork
- Parallel `/api/demo/*` endpoints for demo mode

### Added - Documentation

- **README.md** - Complete documentation with all 22 features
- **QUICKSTART.md** - 2-minute walkthrough
- **QUICK-REFERENCE.md** 🆕 - One-page cheatsheet for power users
- **TROUBLESHOOTING.md** 🆕 - Common issues and solutions
- **CONTRIBUTING.md** - Contributor guidelines with CLA
- **LICENSE** - AGPL-3.0 open source license
- **LAUNCH-IN-5-MINUTES.md** - Fast launch guide
- **PRE-LAUNCH-CHECKLIST.md** 🆕 - 5-minute verification before launch
- **DEMO-GIF-BRIEF.md** - Complete production guide for demo GIF
- **DEMO-GIF-QUICK-START.md** - Quick recording guide
- **XP-CELEBRATION-SPEC.md** - Feature specification
- **ACCOMPLISHMENT-SYSTEM.md** - How Loom-style recording works
- **TECHNICAL-REVIEW.md** - Developer sign-off
- **DEVELOPER-HANDOFF.md** - Complete handoff documentation

### Technical Details

#### Stack
- **Next.js** 15.5.12 (App Router)
- **React** 19.0.0
- **TypeScript** - Strict mode enabled
- **Web Audio API** - Procedural sound synthesis
- **WebSockets** - Optional for gateway RPC

#### Build
- **Bundle Size:** 102 KB (target: <200 KB)
- **Routes:** 27 total (6 pages + 21 API endpoints)
- **Build Time:** ~3 seconds
- **Port:** 3333 (configurable)

#### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Performance
- **First Load:** ~100ms
- **Polling:** Every 5 seconds (3 seconds in demo mode)
- **Animation:** 60 FPS (GPU-accelerated CSS)
- **Optimal Agents:** 5-8 (supports 10+)

### Security

- **AGPL-3.0 License** - Full source available
- **No External Services** - Everything runs locally
- **No Telemetry** - Zero tracking or analytics
- **No Authentication** - Assumes trusted local network (V2 feature)
- **Read-Only Demo** - All demo writes are no-ops

### Known Limitations

- Only works with local OpenClaw install (not remote)
- No multi-user support (single dashboard per machine)
- No agent authentication (assumes trusted environment)
- Meeting Room requires manual API call (no automatic detection yet)
- Accomplishments need API calls (manual file edits don't trigger celebrations)
- Demo mode is read-only (all writes are no-ops)

### Contributors

- **Nova** - Project management, specifications, launch coordination
- **Forge** - Core development, features, documentation
- **Cipher** - Demo mode, deployment, sound effects, pre-launch checklist
- **Scout** - Demo GIF tooling, documentation
- **Pixel** - (Demo GIF pending)

### Coming in V2

Planned features for future releases:

- **Variable XP amounts** - Based on task complexity
- **Level-up animations** - Bigger celebrations at milestones
- **Sound effect toggle per type** - Granular control
- **More quest templates** - Categories for different workflows
- **Agent personality customization** - Per-agent settings
- **Dark/light theme toggle** - User preference
- **Keyboard shortcuts** - Power user efficiency
- **Multi-user support** - Shared dashboards
- **Remote OpenClaw support** - Connect to remote instances
- **Time-based mood changes** - Agents tire over day
- **Interactive mini-games** - Easter eggs
- **Achievement badges** - Special milestones
- **Custom celebration styles** - Per-agent effects
- **Team celebrations** - When all agents accomplish together

### Thank You

Special thanks to the OpenClaw community and early testers!

---

## How to Update

```bash
cd ~/openclawfice
git pull origin main
npm install
npm run build
npm start
```

Or reinstall:
```bash
curl -fsSL https://openclawfice.com/install.sh | bash
```

---

## Report Issues

Found a bug? Have a feature request?

- **GitHub Issues:** https://github.com/openclawfice/openclawfice/issues
- **Discord:** https://discord.gg/clawd (#openclawfice channel)
- **Email:** support@openclaw.ai (coming soon)

---

[0.1.0]: https://github.com/openclawfice/openclawfice/releases/tag/v0.1.0

# OpenClawfice Roadmap

**Mission:** Make OpenClawfice a viral skill for OpenClaw  
**Focus:** Easy to use, productive, fun/quirky like a retro RPG

---

## Shipped ✅

### Core Features (v0.1)
- [x] Auto-discovery from openclaw.json
- [x] Real-time agent status (working/idle)
- [x] Pixel art NPCs with Sims plumbobs
- [x] Work Room + Lounge rooms
- [x] Quest Log (pending decisions)
- [x] Accomplishments feed
- [x] Water Cooler chat
- [x] Agent detail panels
- [x] Meeting Room (shows agent discussions)
- [x] Cooldown timers (from cron jobs)
- [x] Mobile responsive layout
- [x] Empty state onboarding
- [x] DM/broadcast messaging

### Config System
- [x] Cooldown config (`sync-cooldowns` CLI)
- [x] Water cooler config (frequency, style, personality, quiet hours)
- [x] Meeting room config
- [x] Agent customization (colors, appearance)

### Viral Features
- [x] **Quest Templates** (060c5b9) — 8 pre-built workflow examples
  - Code review, tech decision, bug triage, feature scoping
  - Retro, deployment approval, budget request, email draft
  - Template gallery modal with hover previews
  - "Browse Quest Templates" in empty Quest Log
  - **Impact:** Instant onboarding, users see real examples

---

## In Progress 🚧

### Demo Mode (Priority 1)
**Goal:** Try-before-install in 10 seconds  
**Spec:** `docs/DEMO-MODE-SPEC.md`

**What it does:**
- Shows 5 agents working in a live office
- Pre-loaded quest, accomplishments, chat, meeting
- Live simulation (updates every 5-10 seconds)
- "Install OpenClawfice" CTA banner
- Entry: `openclawfice.com/demo` or `?demo=true`

**Why it matters:**
- #1 viral feature — people try it instantly
- No install barrier — see value in 10 seconds
- Converts 30%+ of viewers to installers (target)

**Status:** Spec ready, waiting for Forge to build

**Files to create:**
- `app/demo/page.tsx` (demo route)
- `app/demo/data.ts` (hardcoded demo data)
- `app/layout.tsx` (demo mode banner)

**Estimated time:** 4-6 hours

---

## Planned (Near-Term)

### P2 — Nice to Have
- [ ] "Call Meeting" button in header
- [ ] Date headers on accomplishments ("3 days ago", "Today")
- [ ] Agent detail panel config (customize skills/XP/needs via config)
- [ ] Dark/light theme toggle
- [ ] Custom agent avatars (upload images)

### User-Created Templates (Next Sprint)
- [ ] "Save as Template" on existing quests
- [ ] Share templates with team or community
- [ ] Template marketplace (community submissions)

### Analytics Dashboard
- [ ] Response rates, time-to-completion
- [ ] Agent productivity metrics
- [ ] Quest funnel (created → resolved)
- [ ] ROI tracking

---

## Future Vision

### Phase 2: Multi-Workspace
- Support multiple offices (personal, work, side projects)
- Switch between workspaces
- Share agents across workspaces

### Phase 3: Team Features
- Invite collaborators to your office
- Real-time collaboration (multiple users)
- Shared quest log
- Team chat integration (Slack, Discord)

### Phase 4: Premium Features
- Advanced analytics
- Custom room builder
- Agent skill trees
- Time-based mood changes
- Interactive mini-games
- AI-powered suggestions

### Phase 5: Community
- Skill marketplace (share agent configs)
- Template marketplace (share quest templates)
- Office themes (cyberpunk, fantasy, sci-fi)
- Agent personality packs
- Community leaderboard

---

## Success Metrics

### Virality (Current Focus)
- **Demo Mode Conversion:** 30%+ of demo viewers click "Install"
- **Template Adoption:** 60%+ of new users try at least one template
- **Social Sharing:** Users share office screenshots on Twitter/Reddit/HN
- **GitHub Stars:** 1K+ stars in first month
- **npm Installs:** 5K+ downloads in first month

### Retention
- **Daily Active Users:** 40%+ of installers use it daily
- **Session Length:** 5+ minutes average
- **Quest Creation:** 3+ quests per user per week
- **Agent Count:** Average 3+ agents per office

### Community Growth
- **Contributors:** 20+ outside contributors in first 3 months
- **Pull Requests:** 50+ PRs merged
- **Discord Members:** 500+ in community server
- **Documentation:** 90%+ of features documented

---

## How to Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**High-impact areas:**
- Demo mode implementation (current priority)
- Mobile UX improvements
- Custom themes/skins
- Agent personality packs
- Documentation and tutorials
- Community template submissions

---

## License

MIT — Free forever, premium features coming later

---

**Last updated:** 2026-02-23  
**Next milestone:** Demo Mode launch (ETA: this week)

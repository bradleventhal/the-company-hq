# OpenClawfice — Upgrade Path

## The Story

### Act 1: Discovery (Free — Open Source)

You install OpenClaw. You set up your first agent. Maybe two. They're doing work — answering questions, writing code, managing tasks. But you have no idea what they're actually doing right now. Are they working? Idle? Stuck?

You find OpenClawfice.

```bash
npx openclawfice
```

A retro office appears. Your agents are pixel art characters wandering between rooms. One's in the Work Room with a task bubble saying "Using exec..." The other is chilling in the Lounge with a ⏳ countdown showing when they'll self-assign next.

You didn't configure anything. It just found your agents, read their names from IDENTITY.md, and started showing you what's happening. You screenshot it and post it. Your friends lose their minds.

**What you get for free:**
- Auto-discovered agents as NPCs
- Real-time working/idle detection
- Work Room + Lounge with dynamic movement
- Cooldown timers from cron jobs
- Plumbob mood indicators
- Task inference from session transcripts
- Agent detail panel (click any NPC)
- First-run onboarding
- Mobile responsive

This is the **viral moment**. The screenshot. The "I have an AI office" post. This is what gets us distribution.

---

### Act 2: The Office Comes Alive (Free — Open Source)

After a few days, you realize the office isn't just cute — it's useful. You start customizing.

You add `IDENTITY.md` to each agent with a name, role, and emoji. Suddenly "Main" becomes "Atlas ⚡" and "Outreach" becomes "Scout 🔍". You drop an `openclawfice.config.json` with custom NPC colors — purple hair for your coding agent, green shirt for the one that manages your calendar.

You set up cron jobs in OpenClaw. The Lounge NPCs now show countdown timers. You watch one tick down to zero, the agent wakes up, grabs a task, and walks over to the Work Room. Satisfying.

**What you get for free (continued):**
- Quest Log — your agents post decisions that need your input
- Accomplishments feed — see what got done today
- Water Cooler chat — agents talk to each other
- Agent messaging — DM or broadcast from the dashboard
- Customizable NPC appearance via config
- Activity log

This is the **retention moment**. You check the office every morning. It's your AI team dashboard.

---

### Act 3: You Want More (Pro — $9/mo)

Three weeks in. You have 4 agents. The office is your command center. But you want things the free version doesn't do.

**OpenClawfice Pro:**

**🎨 Custom Agent Skins**
- Upload custom pixel art sprites for each agent
- Animated idle/working/walking states
- Hat/accessory system (ship hat for deploy day, Santa hat in December)
- Community skin marketplace

**📊 Analytics Dashboard**
- Agent uptime charts (who works the most?)
- Task completion rates over time
- Response time trends
- Cost per agent (API spend tracking)
- "Productivity score" gamification
- Weekly/monthly email reports

**🏗️ Office Builder**
- Drag-and-drop room editor
- Custom rooms (Server Room, War Room, Library, Gym)
- Room themes (cyberpunk, cozy cabin, space station)
- Furniture and decorations
- Seasonal themes (auto-switches for holidays)

**🔔 Smart Notifications**
- Push notifications when an agent gets stuck
- Slack/Discord/Telegram alerts for quest log items
- "Agent hasn't worked in 2 hours" warnings
- Daily digest: "Here's what your office did today"

**👥 Shared Office**
- Invite teammates to view your office (read-only link)
- Multi-user offices (everyone's agents in one office)
- Visitor NPCs (show who's viewing)
- Comments on quest log items

---

### Act 4: Your Team Uses It (Team — $29/mo)

Your cofounder installs OpenClaw. Your contractor sets up agents for marketing. Now there are 12 agents across 3 people and nobody knows what's going on.

**OpenClawfice Team:**

**🏢 Multi-Workspace**
- Connect multiple OpenClaw installations to one office
- See all team members' agents in one dashboard
- Cross-workspace quest log (assign decisions to specific people)
- Team-wide accomplishments feed

**🔐 Roles & Permissions**
- Admin: full control
- Manager: can message agents, resolve quests
- Viewer: read-only dashboard
- API keys for external integrations

**📋 Project Boards**
- Kanban view of agent tasks
- Assign work to specific agents from the UI
- Sprint planning with agent capacity
- Due dates and priorities

**💬 Team Chat**
- Real chat (not just water cooler simulation)
- @mention agents to assign tasks
- Thread discussions on quest log items
- Voice messages to agents (TTS)

**📈 Team Analytics**
- Leaderboards across the org
- Cost allocation by team/project
- Utilization reports
- "Which agents need more work?" recommendations

---

### Act 5: Enterprise (Custom Pricing)

A company with 50 engineers and 200+ agents needs this yesterday.

**OpenClawfice Enterprise:**

- SSO / SAML
- Audit logs
- Self-hosted option
- Custom branding (their logo, their colors)
- SLA + priority support
- Multi-office floors (departments as separate offices)
- API for building custom integrations
- Compliance features (data residency, retention policies)
- Dedicated success manager

---

## Pricing Strategy

| Tier | Price | Target | Key Differentiator |
|------|-------|--------|-------------------|
| **Free** | $0 | Individual devs, hobbyists | The screenshot. The viral moment. |
| **Pro** | $9/mo | Power users, indie hackers | Customization + analytics |
| **Team** | $29/mo per seat | Startups, small teams | Multi-workspace + collaboration |
| **Enterprise** | Custom | Companies 50+ | SSO, compliance, self-hosted |

## Conversion Triggers

**Free → Pro:**
- "Unlock custom skins for your agents" (vanity)
- "See how productive your agents really are" (analytics)
- "Your office, your way" (room builder)
- 14-day free trial of Pro features

**Pro → Team:**
- "Your coworker just installed OpenClaw — see their agents too"
- Team quest log: "This decision needs @tyler, not just any human"
- Cost tracking: "Your team spent $X on AI agents this month"

**Team → Enterprise:**
- Security requirements (SSO, audit logs)
- Scale requirements (200+ agents)
- "We need this on our infrastructure"

## Distribution Strategy

### Phase 1: Viral Open Source (Months 1-3)
- Ship the free version on GitHub
- README with irresistible GIF of the office in action
- Post on HN, Reddit r/programming, Twitter/X
- Target: 5K GitHub stars, 1K weekly active installs
- Every install is a potential screenshot → more installs

### Phase 2: Community (Months 2-4)
- Discord server for OpenClawfice users
- Community skin gallery
- "Show us your office" showcase page
- Weekly "Office of the Week" feature
- Target: 500 Discord members, 10K installs

### Phase 3: Monetization (Month 3+)
- Launch Pro tier
- "Your office has been running for 30 days — unlock analytics to see the trends"
- Gentle upgrade prompts (never block functionality)
- Target: 5% conversion to Pro

### Phase 4: Teams (Month 6+)
- Launch Team tier as companies adopt
- Sales-assisted for Team accounts
- Case studies from early adopters
- Target: 2% of Pro users upgrade to Team

## The Moat

1. **Network effects** — more agents → more useful office → more installs
2. **Community content** — skins, room themes, shared offices
3. **Data advantage** — we see how people use AI agents → better product
4. **Brand** — "OpenClawfice" becomes synonymous with "AI agent dashboard"
5. **Switching cost** — your quest log history, accomplishments, custom setup

## One-Line Pitch

> "It's The Sims but for your AI agents — and it actually shows you what they're doing."

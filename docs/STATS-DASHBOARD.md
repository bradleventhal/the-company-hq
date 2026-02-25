# 📊 Stats Dashboard

**Track your AI team's productivity with retro-style analytics.**

The stats dashboard shows XP earned, streaks, agent leaderboards, and 7-day activity charts — gamified productivity metrics that make oversight actually fun.

---

## What You'll See

The stats dashboard (`/stats`) gives you a bird's-eye view of your AI team's performance:

### Key Metrics (Top Cards)

**📊 Total Accomplishments**
- Count of all tasks completed
- All-time total across all agents

**⚡ Total XP Earned**
- Cumulative experience points
- Reflects both quantity and quality of work

**🏆 Top Agent**
- MVP agent (highest XP)
- Includes their level and total XP

**🔥 Current Streak**
- Consecutive days with accomplishments
- Gamification mechanic (encourages consistency)

---

## 7-Day Activity Chart

**Visual bar chart** showing:
- Daily accomplishment count
- Day of week labels (Mon-Sun)
- Hover to see exact numbers

**What it tells you:**
- Peak productivity days (busiest days)
- Patterns (e.g., "We ship more on Tuesdays")
- Gaps (days with zero activity)

**Use cases:**
- Identify burnout (sudden drop-offs)
- Plan work allocation (avoid overloading peak days)
- Celebrate wins (share chart when you hit records)

---

## Agent Leaderboard

**Ranked list of all agents** with:
- Agent name
- Total accomplishments
- Total XP earned
- Current level

**Sorting:** Highest XP → Lowest XP (MVP at top)

**Why this matters:**
- Spot underutilized agents (low XP = not enough work assigned)
- Celebrate high performers (share their trading cards!)
- Balance workload (if one agent has 10x more than others, redistribute)

---

## Accessing the Dashboard

### Method 1: Direct URL

Open: **http://localhost:3333/stats**

---

### Method 2: From Office

1. Click **📊 Stats** button in toolbar (if visible)
2. Or use command palette: `Ctrl+K` → type "stats" → Enter

---

### Method 3: Keyboard Shortcut (Power Users)

Press **`S`** from anywhere in the office.

---

## Sharing Your Stats

**Quick share button** at top-right of dashboard.

**What it generates:**
```
My OpenClawfice stats:

📊 127 accomplishments
⚡ 5,400 XP earned
🏆 Top agent: Cipher
🔥 14-day streak

openclawfice.com
```

**Where to share:**
- Twitter (humble brag about productivity)
- Discord (show off your team)
- LinkedIn (professional flex)

**Pro tip:** Share stats on Fridays ("Week in review") for maximum engagement.

---

## Understanding the Numbers

### Accomplishments vs XP

**Accomplishments** = number of tasks completed  
**XP** = weighted value of those tasks

**Example:**
- Agent A: 10 accomplishments, 1,000 XP (100 XP/task = high-value work)
- Agent B: 20 accomplishments, 800 XP (40 XP/task = smaller tasks)

**Insight:** Agent A is doing more impactful work despite fewer tasks.

---

### What Affects XP?

XP is calculated based on:
1. **Task complexity** (simple bug fix vs architecture refactor)
2. **Lines of code changed** (if applicable)
3. **Files touched** (more files = more impact)
4. **Duration** (longer tasks = more XP)

**Default:** Most tasks = 100 XP (unless custom values set).

---

### Streak Mechanics

**How streaks work:**
- Day 1: Complete 1+ accomplishment → Streak = 1
- Day 2: Complete 1+ accomplishment → Streak = 2
- Day 3: Zero accomplishments → Streak = 0 (broken)

**Why streaks matter:**
- Encourages daily progress (even small wins)
- Gamification (people love maintaining streaks)
- Prevents burnout (forces rest days when streak breaks)

**Pro tip:** Set a daily goal (e.g., "Keep 7-day streak alive") to maintain momentum.

---

## Use Cases

### Weekly Team Review

**Every Friday:**
1. Open `/stats`
2. Take screenshot
3. Post in team chat with caption:
   ```
   This week: 34 accomplishments, 1,800 XP earned
   MVP: Scout (8 tasks, 600 XP)
   Busiest day: Wednesday (12 tasks)
   ```

**Effect:** Team visibility, morale boost, pattern identification.

---

### Agent Performance Audit

**Monthly check:**
1. Review agent leaderboard
2. Identify low-XP agents
3. Ask: "Why is Agent X underutilized?"
4. Redistribute work or adjust roles

**Example insight:**
> "Nova has 200 XP but Cipher has 5,000 XP. Nova needs more tasks or we need to hire another agent."

---

### Productivity Tracking (Personal)

**Track your own management effectiveness:**
- Week 1: 800 XP total
- Week 2: 1,200 XP total (+50% improvement)
- Week 3: 2,000 XP total (+67% improvement)

**Insight:** You're getting better at delegating to agents.

---

### Social Proof

**For launches/pitches:**
1. Take stats screenshot
2. Add to pitch deck / landing page
3. Caption: "Our AI team shipped 200+ tasks in 30 days"

**Why it works:** Numbers build credibility.

---

## Advanced Features

### Export Stats (Coming Soon)

**Planned for v0.2:**
- CSV export (for spreadsheet analysis)
- PDF report (for presentations)
- API endpoint (for custom integrations)

**Workaround now:** Screenshot dashboard + manual data entry.

---

### Custom Time Ranges (Coming Soon)

**Current:** Fixed 7-day chart  
**Planned:** 7-day / 30-day / 90-day / All-time toggle

**Use case:** Long-term trend analysis (e.g., "XP increased 300% over 90 days").

---

### Goal Setting (Coming Soon)

**Planned for v0.3:**
- Set daily/weekly XP targets
- Visual progress bar toward goals
- Notifications when goals hit

**Example:** "Goal: 1,000 XP this week" → Dashboard shows 750/1,000 (75% progress).

---

## Troubleshooting

### "Stats show zero accomplishments"

**Possible causes:**
1. Agents haven't completed any tasks yet
2. Accomplishments file is empty
3. API route is broken

**Fix:**
1. Check: `~/.openclaw/.status/accomplishments.json` exists and has data
2. Restart dev server: `npm run dev`
3. Refresh `/stats` page

---

### "7-day chart is blank"

**Cause:** No accomplishments in last 7 days.

**Fix:** Let agents work for a few days, then check again.

---

### "Agent leaderboard missing an agent"

**Cause:** That agent has zero accomplishments (not included in stats).

**Fix:** Assign work to that agent. Once they complete 1 task, they'll appear.

---

### "XP numbers seem wrong"

**Check:**
1. Are XP values being set correctly in accomplishments?
2. Default XP = 100 per task (if not specified)

**Verify:**
```bash
jq '.[-5:] | .[] | {title, who, xp}' ~/.openclaw/.status/accomplishments.json
```

**Fix:** Adjust XP values in accomplishments if needed.

---

## Tips & Tricks

### Gamify Your Workflow

**Set personal challenges:**
- "Hit 1,000 XP this week"
- "Maintain 14-day streak"
- "Get all agents above Level 10"

**Share progress:** Post stats updates on Fridays to stay accountable.

---

### Compare Agents

**Use leaderboard to identify patterns:**
- High XP + Low accomplishments = Deep work specialist
- Low XP + High accomplishments = Task executor
- Zero XP = Needs work assignment

**Action:** Adjust task allocation based on agent strengths.

---

### Celebrate Milestones

**When you hit big numbers:**
- 100 accomplishments → Share on Twitter
- 5,000 XP earned → Generate team leaderboard
- 30-day streak → Take team screenshot

**Why:** Public celebration = motivation + social proof.

---

### Optimize Peak Days

**If Wednesday is your busiest day:**
- Schedule deep work for Wednesdays
- Avoid meetings on Wednesdays
- Assign high-priority tasks on Tuesdays (to ship Wednesday)

**Data-driven productivity.**

---

## Stats Dashboard Checklist

**Daily:**
- [ ] Check current streak (maintain momentum)
- [ ] Glance at today's accomplishment count

**Weekly:**
- [ ] Review 7-day chart (identify patterns)
- [ ] Check agent leaderboard (spot underutilized agents)
- [ ] Share stats in team chat (visibility)

**Monthly:**
- [ ] Compare month-over-month XP growth
- [ ] Audit agent distribution (rebalance if needed)
- [ ] Export screenshot for records

---

## Integration with Other Features

### Stats + Trading Cards

**Workflow:**
1. Check leaderboard → Identify top agent
2. Generate trading card for top agent
3. Post both: "MVP this week: Cipher (Level 18, 4500 XP)" + card image

**Effect:** Double viral potential (stats + visual card).

---

### Stats + Water Cooler

**Ask agents about their stats:**
> "Cipher, you're at 5,400 XP! What's your secret?"

**Agents can reply with strategies, creating engaging content.**

---

### Stats + Viral Playbook

**Stats dashboard = perfect content for:**
- Progress posts ("7 days ago: 800 XP. Today: 2,000 XP")
- Team highlights ("Our AI team shipped 50 tasks this week")
- Milestone celebrations ("Just hit 10,000 total XP!")

**See:** `GO-VIRAL-PLAYBOOK.md` for sharing strategies.

---

## Technical Details

### Data Source

**Stats are calculated from:**
```
~/.openclaw/.status/accomplishments.json
```

**Live updates:** Stats refresh on page load (not real-time WebSocket yet).

---

### Performance

**Load time:** < 100ms (even with 1,000+ accomplishments)

**Why:** Client-side calculation (no server processing).

---

### Privacy

**All data stays local:**
- No analytics sent to servers
- No tracking pixels
- No third-party integrations

**Your stats = your data.**

---

## Design Philosophy

**Why retro aesthetics?**
- Makes productivity tracking FUN (not corporate boring)
- Fits OpenClawfice's pixel art theme
- Encourages sharing (beautiful = shareable)

**Why gamification?**
- Streaks encourage consistency
- XP makes work feel like leveling up
- Leaderboards create friendly competition

**Result:** You WANT to check your stats (vs avoiding analytics dashboards).

---

## Comparison to Other Tools

### vs. Notion Dashboard
- **Notion:** Manual data entry, static tables
- **OpenClawfice:** Auto-generated, live updates, gamified

### vs. Jira Reports
- **Jira:** Enterprise complexity, tickets/sprints focus
- **OpenClawfice:** Simple XP/accomplishments, fun aesthetics

### vs. GitHub Insights
- **GitHub:** Code-only, commits/PRs
- **OpenClawfice:** All work types, agent-focused

**OpenClawfice difference:** Gamified, automatic, delightful.

---

## Future Roadmap

**v0.2 (Next release):**
- CSV export
- Custom date ranges (30-day, 90-day, all-time)
- Goal setting with progress bars

**v0.3:**
- Real-time updates (WebSocket)
- Agent comparison view (side-by-side)
- Time-of-day heatmap (when work gets done)

**v1.0:**
- Predictive analytics ("You're on track for 10K XP this month")
- Team benchmarks ("You're in top 10% of OpenClawfice users")
- Integration with external tools (export to Notion, Slack, etc.)

---

## Quick Reference

**Access:** http://localhost:3333/stats  
**Keyboard shortcut:** `S`  
**Share button:** Top-right corner  
**Refresh:** Reload page (F5)  
**Data source:** `~/.openclaw/.status/accomplishments.json`  

---

## Get Started

1. Open OpenClawfice: http://localhost:3333
2. Let agents work for 1-2 days (accumulate accomplishments)
3. Visit `/stats` to see your dashboard
4. Share your stats on Friday (weekly recap)

**Pro tip:** Check stats daily to maintain streaks and spot trends early.

---

**Time to productivity:** 2 minutes  
**Update frequency:** On page load  
**Best for:** Weekly reviews, team visibility, social sharing

📊 Make productivity visible. Make it fun. Make it viral.

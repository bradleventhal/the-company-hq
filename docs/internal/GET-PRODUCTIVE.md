# Get Productive in 10 Minutes

**Stop reading docs. Start getting work done with your AI agents.**

This guide shows you how to use OpenClawfice to actually accomplish tasks, not just admire the UI.

---

## ⚡ Quick Context: What OpenClawfice Does for Productivity

**Without OpenClawfice:**
- Agents are invisible workers
- You don't know who's working vs. idle
- Work gets done but you have no visibility
- Hard to coordinate multiple agents
- Progress feels abstract (just text logs)

**With OpenClawfice:**
- See who's working in real-time
- Assign tasks with one click
- Track progress visually
- Coordinate agents easily
- Celebrate wins (tangible accomplishments)

**Time savings:** ~4.4 hours/week (based on beta users)

---

## Minute 1-3: Set Up Your First Productive Workflow

### Step 1: Identify Your Most Common Task

What do you ask your agents to do most often?

**Common examples:**
- "Review this code and suggest improvements"
- "Research X and summarize findings"
- "Draft an email to Y about Z"
- "Debug this error message"
- "Write documentation for this feature"

**Pick ONE** for this exercise.

---

### Step 2: Create a Quest Template for It

1. **Open OpenClawfice** → Quest Log
2. Click **"Browse Quest Templates"**
3. Click **"Create Custom Template"** (or pick closest existing one)
4. Fill in:
   - **Title:** `[Your task type]` (e.g., "Code Review Request")
   - **Description template:** Include placeholders like `{{file}}`, `{{context}}`
   - **Priority:** Medium (adjust as needed)
   - **Typical agent:** Leave blank (any agent can pick it up)

**Example template:**
```
Title: Code Review Request
Description: Please review {{file}} and provide:
- Security issues
- Performance bottlenecks
- Code style improvements
- Test coverage gaps

Context: {{context}}
Priority: Medium
```

5. **Save template**

**Time invested:** 2 minutes  
**Time saved per use:** 30 seconds (no retyping)

---

### Step 3: Use Your Template Right Now

1. Click **"Browse Quest Templates"**
2. Find your new template
3. Click it → Fill in the placeholders
4. **Create** → Quest appears in log

**An agent will see it and pick it up** (if cooldowns are configured).

---

## Minute 4-6: Master the 3 Core Productivity Flows

### Flow 1: Assign Urgent Task to Specific Agent

**When:** Production is broken, need someone on it NOW.

**How:**
1. **Click the agent** you want (pixel character in a room)
2. Agent detail panel opens
3. Type in **"Send Direct Message"** box:
   ```
   URGENT: API returning 500s on /users endpoint.
   Check logs and fix ASAP.
   ```
4. Press **Enter**

**Agent receives task immediately.** No quest, no waiting.

**Time:** ~10 seconds

---

### Flow 2: Create Quest for Any Available Agent

**When:** Non-urgent work that any agent can handle.

**How:**
1. **Quest Log** → Use a template OR click **"+ New Quest"**
2. Fill in title/description
3. Set priority (high/medium/low)
4. **Create**

**First available agent picks it up** (when they check for work).

**Time:** ~20 seconds

---

### Flow 3: Broadcast Announcement to All Agents

**When:** Deploy happening, all-hands update, team directive.

**How:**
1. Scroll to **Water Cooler** (bottom right)
2. Find **"BROADCAST TO ALL"** input
3. Type message:
   ```
   Deploy going live in 10 minutes. Hold all non-critical changes.
   ```
4. Press **Enter**

**All agents get it instantly.**

**Time:** ~5 seconds

---

## Minute 7-8: Configure Auto-Work (Agents Check for Tasks Regularly)

**Problem:** You create quests, but agents only see them when you ping them.

**Solution:** Set up **cooldown timers** so agents auto-check for work.

### Quick Setup:

Create `~/.openclaw/openclawfice.config.json`:

```json
{
  "agents": {
    "main": {
      "cooldown": {
        "enabled": true,
        "intervalMs": 600000
      }
    }
  }
}
```

**What this does:**
- Agent `main` checks for work every **10 minutes** (600,000ms)
- If there's a quest in the log → Agent picks it up
- If not → Agent stays idle

**Adjust interval:**
- `300000` = 5 minutes (frequent checks)
- `900000` = 15 minutes (balanced)
- `1800000` = 30 minutes (conservative)

**Restart OpenClawfice** to apply.

---

## Minute 9-10: Measure Your Productivity Gains

### Track These Metrics (Week 1):

1. **Accomplishments per day** (check the feed)
2. **Quest resolution time** (how long from create → response)
3. **Agent utilization** (% of time in Work Room vs. Lounge)

### Example Baseline:

**Before OpenClawfice:**
- Sent 10 messages to agents via CLI/chat
- Got 6 responses/completed tasks
- Took ~30 min to coordinate
- No visibility into who did what

**After OpenClawfice:**
- Created 8 quests + 2 DMs
- Got 9 completed tasks
- Took ~10 min to coordinate
- Clear accomplishment feed showing who did what

**Time saved:** 20 minutes/day × 5 days = **1.7 hours/week**

---

## Real-World Productivity Patterns

### Pattern 1: Daily Standup (0 effort)

**Before:** Schedule meeting, everyone reports status.

**With OpenClawfice:**
1. Open dashboard
2. Check Accomplishments feed → See what shipped yesterday
3. Check Quest Log → See what's blocked
4. Check Work Room → See who's actively working

**Done in 30 seconds.** No meeting needed.

---

### Pattern 2: Debugging Production Issues

**Workflow:**
1. Production alert comes in
2. **Create high-priority quest** in OpenClawfice:
   ```
   Title: API 500 errors on /users
   Priority: High
   Description: Check logs, identify root cause, deploy fix
   ```
3. **Click fastest available agent** → DM: "Urgent quest in log, can you take it?"
4. Agent picks it up → Shows as "working" in Work Room
5. **Watch accomplishments feed** for updates
6. Agent logs: "✅ Fixed: SQL query timeout, optimized index"
7. **Click video thumbnail** → Watch 6-sec replay of the fix

**You stayed in the loop without micromanaging.**

---

### Pattern 3: Multi-Agent Coordination

**Scenario:** Shipping a new feature (needs code, tests, docs).

**Workflow:**
1. **Create 3 quests:**
   - "Implement feature X (backend API)" → Assign to Cipher
   - "Write unit tests for feature X" → Assign to Forge
   - "Document feature X in user guide" → Assign to Nova

2. **Broadcast to all:**
   ```
   New feature X starting today. Check quest log for your task.
   Let's ship by end of week!
   ```

3. **Monitor progress:**
   - Agents move to Work Room as they pick up tasks
   - Accomplishments appear as tasks complete
   - Quest Log empties as work gets done

4. **When all 3 accomplishments logged:**
   - Feature is done
   - You have 3 video recordings of the work
   - Ready to deploy

**You coordinated 3 agents in 2 minutes.**

---

## Productivity Anti-Patterns (Avoid These)

### ❌ Anti-Pattern 1: Over-Questing

**Don't:** Create a quest for every tiny task.

**Why:** Quest overhead > task value.

**Instead:** DM agent directly for quick tasks (<5 min).

---

### ❌ Anti-Pattern 2: Ignoring Accomplishments

**Don't:** Never look at the accomplishments feed.

**Why:** You lose visibility into what's actually getting done.

**Instead:** Check feed daily. Celebrate wins. Spot patterns.

---

### ❌ Anti-Pattern 3: No Cooldowns

**Don't:** Expect agents to magically find quests.

**Why:** Agents don't check quest log unless you ping them or cooldowns are set.

**Instead:** Configure cooldowns (10-15 min intervals).

---

### ❌ Anti-Pattern 4: Micromanaging via DMs

**Don't:** Send 10 DMs in a row asking for status updates.

**Why:** Defeats the purpose. Just look at the dashboard!

**Instead:**
- Check if agent is in Work Room → They're working
- Check accomplishments → See what they finished
- Check quest log → See what's pending

---

## Advanced Productivity Hacks

### Hack 1: Quest Priority Triage (Every Morning)

1. Open Quest Log
2. Sort by priority (red → yellow → blue)
3. **High-priority (red):** Assign to specific agents NOW
4. **Medium-priority (yellow):** Leave for cooldowns to pick up
5. **Low-priority (blue):** Archive if not done in 3 days

**Time:** 2 minutes/day  
**Impact:** Clear priorities, no forgotten tasks

---

### Hack 2: Accomplishment Feed as Status Report

**Instead of writing weekly status reports:**

1. Screenshot accomplishments feed (last 7 days)
2. Add caption: "What we shipped this week"
3. Send to stakeholders

**Time saved:** ~1 hour/week (no report writing)

---

### Hack 3: Agent Utilization Dashboard

**Track in a spreadsheet:**

| Agent | Time in Work Room | Accomplishments | XP Gained |
|-------|-------------------|-----------------|-----------|
| Cipher | 80% | 12 | 1,200 |
| Scout | 60% | 8 | 800 |
| Nova | 40% | 5 | 500 |

**Spot patterns:**
- Who's overloaded? (>80% work time)
- Who's underutilized? (<30% work time)
- Rebalance tasks accordingly

---

### Hack 4: Pre-Loaded Quest Templates for Recurring Work

**Common recurring tasks:**
- Weekly report
- Code review
- Bug triage
- Deploy checklist
- Client email draft

**Create templates for all of them.**

**On Monday morning:**
- Click 5 templates
- Fill in this week's details
- Create all quests in 3 minutes
- Agents pick them up throughout the week

**Time saved:** ~30 min/week (no repetitive typing)

---

## Productivity ROI Calculator

**Your hourly rate:** $X/hour  
**Time saved with OpenClawfice:** Y hours/week

**Weekly value:** $X × Y  
**Monthly value:** $X × Y × 4  
**Annual value:** $X × Y × 52

**Example:**
- Hourly rate: $100/hour
- Time saved: 4.4 hours/week
- **Annual value:** $100 × 4.4 × 52 = **$22,880/year**

**OpenClawfice setup time:** 10 minutes (this guide)  
**ROI:** Infinite (free tool, real time savings)

---

## Next Steps

### Today (Next 30 Minutes):
1. ✅ Finished this guide
2. Create 1 quest template for your most common task
3. Create 1 quest using that template
4. Configure cooldowns for your main agent
5. Check accomplishments feed tonight → See if quest was completed

### This Week:
1. Create 3-5 more quest templates
2. Track time saved vs. baseline (without OpenClawfice)
3. Screenshot accomplishment feed → Share on Twitter (tag #OpenClawfice)
4. Tweak cooldown intervals based on agent workload

### This Month:
1. Build library of 10+ quest templates
2. Measure productivity metrics (accomplishments/day, resolution time)
3. Share your workflow in GitHub Discussions (help others)
4. Suggest new features that would save you even more time

---

## Measuring Success

**You're being productive with OpenClawfice when:**

✅ You spend <5 min/day coordinating agents  
✅ You know what's getting done without asking  
✅ Quests get resolved without you micromanaging  
✅ Accomplishments feed scrolls regularly  
✅ You can produce status reports in 30 seconds  
✅ You're saving 3+ hours/week

**If not there yet:** Revisit this guide. Likely missing cooldowns or quest templates.

---

## Resources

**Productivity-Focused Docs:**
- [USE-CASES.md](./docs/USE-CASES.md) - Real-world workflows
- [USER-SUCCESS-GUIDE.md](./USER-SUCCESS-GUIDE.md) - ROI tracking, 30-day plan
- [STATUS-FILES.md](./STATUS-FILES.md) - API integration for custom workflows

**Getting Started:**
- [INSTALL.md](./INSTALL.md) - Setup
- [FIRST-5-MINUTES.md](./docs/FIRST-5-MINUTES.md) - Onboarding
- [UI-CHEAT-SHEET.md](./UI-CHEAT-SHEET.md) - Interface reference

---

**Remember:** The goal isn't to use OpenClawfice. The goal is to **get more work done with less effort.** If you're spending more time in the UI than you save in coordination, you're doing it wrong.

**Focus on the work, not the tool. OpenClawfice should fade into the background while your agents ship.**

Now go build something. ⚡

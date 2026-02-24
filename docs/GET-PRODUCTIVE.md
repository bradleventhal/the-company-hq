# ⚡ Get Productive in 10 Minutes

**You've seen the office. Now let's actually use it to get work done.**

This guide shows you how to turn OpenClawfice from "cool demo" into "daily productivity tool" in 10 minutes.

---

## Minute 1-2: Set Your Mission

**Why this matters:** Agents work better when they know the goal.

1. Click **⚙️ Settings** in the top-right
2. Find "🎯 Company Mission" section
3. Fill in:
   - **Goal:** What are you trying to achieve?
   - **Priorities:** Top 3 things that matter most
   - **Context:** Any constraints, metrics, or background

**Example:**

```
Goal: Launch OpenClawfice and get 1,000 GitHub stars
Priorities:
  1. Make it easy to use
  2. Make users productive
  3. Make it fun, quirky, cool
Context: We have 2 weeks until launch. Budget is $0.
```

4. Click **Save**

**What just happened:**
- Agents now see this context in their prompts
- Auto-work directives align with your mission
- Water cooler conversations reflect your goals

---

## Minute 3-4: Create Your First Quest

**Quests = structured way to get agent input**

1. Click **"+ New Quest"** button (top-right of Quest Log)
2. Pick a template:
   - 📧 **Send Email** — Draft + approve workflow
   - 🐛 **Bug Triage** — Prioritize bugs
   - 🎨 **Design Review** — Get feedback on mockups
   - ⚖️ **Decision** — Binary choice (A vs B)
   - 🚀 **Deploy** — Production release checklist

3. Fill in the details
4. Assign to an agent (or "Anyone")
5. Click **Create**

**What happens next:**
- Quest appears in the log with urgency badge
- Agent sees it in their context
- They respond via OpenClaw
- You approve/reject from the office UI

**Pro tip:** Use keyboard shortcut `N` to create quest faster

---

## Minute 5-6: Enable Auto-Work for One Agent

**Auto-work = agents self-assign tasks from a queue**

1. Click **⚙️ Settings**
2. Scroll to "Auto-Work Policies"
3. Pick one agent (start with your most reliable one)
4. Toggle **"Enabled"**
5. Set:
   - **Interval:** 30 minutes (how often they self-assign)
   - **Directive:** "Fix bugs in the backlog. Start with highest priority."
   - **Risk tolerance:** Low (they ask before deploying)

6. Click **Save**

**What just happened:**
- Every 30 minutes, that agent checks: "Anything in my queue?"
- They pick the highest-priority task
- They work on it autonomously
- They only interrupt you for risky decisions

**Warning:** Start with ONE agent. Once you trust it, enable for more.

---

## Minute 7: Set Up Water Cooler Notifications

**Stay in the loop without constantly checking the office**

1. Click **⚙️ Settings**
2. Find "💬 Water Cooler"
3. Enable **"Desktop Notifications"**
4. Set frequency: **"Only important messages"**
5. Optional: Enable **"Quiet Hours"** (e.g., 11pm-8am)

**What you'll get notified about:**
- Urgent quests
- Production issues
- Agent requesting approval
- Blockers that need your input

**What you WON'T get notified about:**
- Routine chat
- Status updates
- Low-priority quests

---

## Minute 8: Customize Agent Workspaces

**Make agents more helpful by giving them context**

For each agent, create `IDENTITY.md` in their workspace:

```bash
cd ~/.openclaw/agents/cipher
nano IDENTITY.md
```

**Template:**

```markdown
# IDENTITY.md

- **Name:** Cipher
- **Role:** DevOps Engineer
- **Vibe:** Cautious, security-minded, hates downtime
- **Emoji:** 🔐
- **Skills:** Docker, Kubernetes, AWS, monitoring
- **Constraints:** Never deploy on Fridays
```

**Why this matters:**
- Agents show their role in the office
- Particle effects match their specialty
- They self-identify in conversations
- You can tailor directives per role

**Repeat for all agents** (5 min total)

---

## Minute 9: Create a Daily Standup Routine

**Turn the office into your morning ritual**

1. Open OpenClawfice
2. Check accomplishments feed (what shipped yesterday?)
3. Check quest log (what needs your input today?)
4. Send a group message: "Morning team! Priorities today: [X, Y, Z]"
5. Respond to any urgent quests
6. Close the tab (or leave it pinned)

**Time investment:** 3-5 minutes per day

**ROI:** Always know:
- What agents are working on
- What's blocked waiting for you
- What shipped recently

---

## Minute 10: Set Up Your First Automation

**Level up: Automate a recurring workflow**

**Example: Weekly status report**

1. Click **⚙️ Settings** → "Automations" (coming soon in v0.2)
2. Create new automation:
   - **Trigger:** Every Friday at 5pm
   - **Action:** Generate status report
   - **Format:** Markdown summary of week's accomplishments
   - **Destination:** Post to Slack #team-updates

**Other automation ideas:**
- **Daily digest:** Email with top 3 quests + top 3 accomplishments
- **Production monitor:** Ping you if any agent reports an error
- **Velocity tracker:** Graph of XP earned per day
- **Standup bot:** Auto-post agent status to Discord each morning

**Coming soon:** Full automation builder in UI

---

## ✅ You're Now Productive!

**What you set up:**
- ✅ Mission + priorities (agents know the goal)
- ✅ First quest (structured agent input)
- ✅ Auto-work for one agent (autonomous task execution)
- ✅ Notifications (stay informed without checking constantly)
- ✅ Agent identities (context for better work)
- ✅ Daily standup routine (consistent check-ins)

**Next steps:**

### Daily Usage
- **Morning:** Check accomplishments + quests (3 min)
- **Midday:** Respond to any new quests (5 min)
- **Evening:** Send group message with tomorrow's priorities (2 min)

### Weekly Review
- **Friday:** Review week's accomplishments, plan next week
- **Sunday:** Enable auto-work for any idle agents

### Monthly Optimization
- **Tune auto-work directives** (based on what agents completed)
- **Add new agents** (as your team grows)
- **Refine mission** (priorities shift over time)

---

## 🎯 Common Workflows

### Workflow 1: Code Review
1. Agent completes a feature
2. They create a quest: "Review PR #123"
3. You click the quest → see the diff
4. Respond: "Approved" or "Needs changes: [feedback]"
5. Agent proceeds or iterates

### Workflow 2: Bug Triage
1. Bug reported in production
2. Agent creates quest: "P0 bug: Users can't log in"
3. You set priority: "Fix immediately" or "Investigate first"
4. Agent works on it
5. Accomplishment posted when fixed

### Workflow 3: Content Approval
1. Agent drafts a blog post
2. Quest: "Review draft: [link to doc]"
3. You read it, respond: "Publish" or "Edit: [feedback]"
4. Agent publishes or revises
5. Link posted in water cooler when live

### Workflow 4: Deploy Decision
1. Agent: "Ready to deploy v2.0. Deploy now or wait?"
2. Quest with options: "Deploy now" / "Wait until Monday" / "Need more testing"
3. You pick one
4. Agent proceeds accordingly

### Workflow 5: Research Summary
1. You message an agent: "Research best headless CMS options"
2. Agent works for 20 minutes
3. Accomplishment: "Researched 5 CMS options — [summary]"
4. You read the summary, make a decision

---

## 💡 Power User Tips

### Batch Process Quests
Instead of responding to quests one-by-one:
1. Let them accumulate (check once per day)
2. Set aside 10 minutes
3. Respond to all at once
4. Agents unblock simultaneously

**Why:** More efficient than context-switching all day

### Use Quest Templates
Create your own templates in `~/.openclaw/.office/quest-templates.json`:

```json
{
  "custom-templates": [
    {
      "name": "SEO Review",
      "icon": "🔍",
      "fields": ["Page URL", "Target keyword", "Current ranking"],
      "defaultUrgency": "medium"
    }
  ]
}
```

### Keyboard-First Navigation
Learn these shortcuts to stay in flow:
- `Q` → Open quest log
- `A` → Open accomplishments
- `M` → Message selected agent
- `Esc` → Close any modal
- `1-9` → Select agent by number

### Set Smart Quiet Hours
Enable "Quiet Hours" in settings:
- **Weekdays:** 11pm-8am
- **Weekends:** 9pm-10am

Agents still work, but won't notify you.

### Pin the Office Tab
In your browser:
1. Right-click the OpenClawfice tab
2. "Pin Tab"
3. It stays open, low visual noise
4. Check it 2-3 times per day

---

## 🚫 Anti-Patterns (Don't Do These)

### ❌ Micromanaging
**Bad:** Responding to every quest instantly, messaging agents every 5 minutes

**Good:** Let agents work autonomously, batch responses, trust the process

### ❌ Ignoring Quests
**Bad:** Letting quests pile up for days, agents blocked waiting for you

**Good:** Set aside 10 min/day to clear the quest log

### ❌ Vague Directives
**Bad:** "Make the app better"

**Good:** "Reduce API latency by 30% by optimizing database queries"

### ❌ No Mission Set
**Bad:** Agents don't know what you're trying to achieve

**Good:** Clear mission + priorities in settings

### ❌ Auto-Work for All Agents Immediately
**Bad:** Enable auto-work for everyone on day 1

**Good:** Start with 1 agent, validate it works, gradually expand

---

## 📊 Measure Your Productivity

Track these metrics weekly:

| Metric | Target | How to Track |
|--------|--------|-------------|
| **Quest response time** | < 2 hours | Check quest timestamps |
| **Accomplishments per day** | 5+ | Count daily accomplishments |
| **Agent utilization** | 60%+ working | Check office status |
| **Blocked time** | < 10% | How long quests wait for you |
| **Auto-work success rate** | 80%+ | Tasks completed without intervention |

**Goal:** Agents productive, you unblocked, work shipping

---

## 🎓 Advanced: Integrate with External Tools

### Slack Integration
Post accomplishments to Slack:

```bash
# In agent workspace, add to TOOLS.md:
When you complete a task, post to Slack:
curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
  -H 'Content-Type: application/json' \
  -d '{"text":"✅ Completed: [task description]"}'
```

### GitHub Issues
Auto-create quests from GitHub issues:

```bash
# Script to run daily:
gh issue list --label "needs-decision" --json number,title,body \
  | jq -r '.[] | "curl -X POST http://localhost:3333/api/office/actions ..."'
```

### Linear/Jira
Sync accomplishments to project management:

```javascript
// When accomplishment posted, create Linear issue:
const linear = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });
await linear.createIssue({
  teamId: "...",
  title: accomplishment.title,
  description: accomplishment.detail,
});
```

**More integrations:** See `docs/INTEGRATIONS.md` (coming in v0.2)

---

## 🚀 Next Level

Once you're productive with the basics:

1. **Read [WORKFLOWS.md](./WORKFLOWS.md)** — Advanced patterns
2. **Explore [API-REFERENCE.md](./API-REFERENCE.md)** — Build custom integrations
3. **Join Discord** — Learn from other power users
4. **Contribute** — Build a feature you wish existed

---

**Time invested:** 10 minutes  
**Productivity gain:** 20+ hours per week (agents handle routine work)  
**ROI:** 120:1

**Now go build something.** ⚡

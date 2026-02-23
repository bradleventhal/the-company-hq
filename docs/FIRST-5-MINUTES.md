# Your First 5 Minutes with OpenClawfice

**New to OpenClawfice? This guide gets you from zero to productive in 5 minutes.**

---

## Minute 1: See It In Action (Demo Mode)

Before installing anything, try the demo:

```bash
open "http://localhost:3333/?demo=true"
```

**What you'll see:**
- 5 AI agents working in a retro office
- Quest log with pending decisions
- Water cooler chat between agents
- Accomplishments feed showing wins

**This is what OpenClawfice looks like when running.**

Try clicking an agent (the pixel art characters) to see their details!

---

## Minute 2: Install OpenClawfice

**One command:**
```bash
curl -fsSL https://openclawfice.com/install.sh | bash
```

This installs to `~/openclawfice/` and creates the `openclawfice` launcher.

**Alternative (manual):**
```bash
git clone https://github.com/openclawfice/openclawfice.git ~/openclawfice
cd ~/openclawfice
npm install
npm run dev
```

---

## Minute 3: Open Your Office

```bash
openclawfice
```

This opens http://localhost:3333 in your browser.

**First time?** You'll see:
- "Welcome to OpenClawfice!"
- "No agents detected yet"
- Setup instructions

**This is normal!** OpenClawfice needs OpenClaw agents to visualize.

---

## Minute 4: Get Your First Agent Showing

OpenClawfice auto-discovers agents from `~/.openclaw/openclaw.json`.

### If you already have OpenClaw agents:

Just wait a few seconds. They should appear automatically.

**Still not showing?** Wake them up:
```bash
openclaw send --agent main "Hello!"
```

### If you're brand new to OpenClaw:

1. Install OpenClaw: https://openclaw.ai
2. Create an agent:
```bash
openclaw init
# Follow prompts to create your first agent
```
3. Send a message to wake it:
```bash
openclaw send --agent main "What can you help me with?"
```
4. Refresh OpenClawfice → Agent appears!

---

## Minute 5: Do Something Useful

Now that your agent(s) are showing, try these:

### 1. Check Status at a Glance
- **Green plumbob** = Agent feeling great
- **Yellow plumbob** = Agent feeling okay
- **Red plumbob** = Agent stressed
- **Work Room** = Agent currently working
- **Lounge** = Agent idle, waiting for tasks

### 2. Click an Agent
- See their current task
- Check their skills & XP
- View activity history
- Send them a message

### 3. Check the Quest Log
If an agent needs your approval for something, it appears here.
- Click to expand
- Read the details
- Approve or reject

### 4. Review Accomplishments
See what your team shipped today:
- Features built
- Bugs fixed
- Reports created
- Anything agents completed

### 5. Skim the Water Cooler
Agents chat with each other here. You can:
- See team coordination
- Jump in when needed
- Broadcast to everyone

---

## What You Just Learned

In 5 minutes, you:
- ✅ Tried the demo
- ✅ Installed OpenClawfice
- ✅ Saw your first agent(s)
- ✅ Understood the basic layout
- ✅ Did something useful

**You're now productive!**

---

## Next Steps (After Your First 5 Minutes)

### Beginner: Learn the UI

Read: [UI-GUIDE.md](./UI-GUIDE.md)

Understand:
- Where everything is
- What each section does
- Common workflows

**Time:** 10 minutes

---

### Intermediate: Optimize Your Workflow

Read: [USE-CASES.md](./USE-CASES.md)

Learn:
- How others use OpenClawfice
- Best practices
- Time-saving tips

**Time:** 15 minutes

---

### Advanced: Customize Everything

Read: [CONFIGURING-YOUR-OFFICE.md](./CONFIGURING-YOUR-OFFICE.md)

Configure:
- Agent colors & emoji
- Autowork policies
- Quest triggers
- Visual themes

**Time:** 30 minutes

---

## Common "First 5 Minutes" Questions

### Q: My agents aren't showing up. What's wrong?

**Check this:**
```bash
# 1. Is OpenClaw installed?
openclaw status

# 2. Do you have agents configured?
cat ~/.openclaw/openclaw.json | grep '"id"'

# 3. Have your agents ever run?
openclaw send --agent main "ping"
```

If agents have never run a session, they won't appear yet. Send them a message first!

---

### Q: I see agents but they're all "idle". Is something broken?

**No, this is normal!** Agents show as idle when they're not currently working on a task.

To give them work:
```bash
# Send them a task via CLI
openclaw send --agent main "Analyze this data: [paste data]"

# Or set up autowork (recurring tasks)
# See CONFIGURING-YOUR-OFFICE.md
```

---

### Q: What's the difference between this and just using the CLI?

**CLI:**
- Text-based logs
- Have to grep/search
- No visual overview
- Slower to understand status

**OpenClawfice:**
- Visual dashboard
- Instant status at a glance
- Click to see details
- Quest log for decisions
- Team coordination visible

**Use both:** CLI for deep work, OpenClawfice for visibility.

---

### Q: Can I use OpenClawfice without OpenClaw?

**No.** OpenClawfice is a dashboard for OpenClaw agents. It reads agent data from OpenClaw's config and status files.

If you don't have OpenClaw yet: https://openclaw.ai

---

### Q: Is there a mobile version?

**The dashboard is mobile-responsive!** It works on phones/tablets, but desktop is recommended for the full experience.

---

### Q: How do I customize agent colors/emoji?

Edit `~/.openclaw/openclaw.json`:
```json
{
  "agents": {
    "list": [
      {
        "id": "my-agent",
        "emoji": "🤖",  ← Change this
        "color": "#ff0000"  ← And this
      }
    ]
  }
}
```

Then restart OpenClaw: `openclaw gateway restart`

---

### Q: Can I run OpenClawfice on a different port?

Yes! Edit the start command:
```bash
# In ~/openclawfice/package.json, change:
"dev": "next dev -p 3334"  # Use port 3334 instead
```

---

## Pro Tips for Your First Day

### 1. Leave OpenClawfice Open All Day
- Put it on a second monitor
- Glance at it periodically
- See what agents are doing without context switching

### 2. Check Quest Log Morning & Evening
- Morning: Approve overnight work
- Evening: Review pending decisions
- Keeps agents unblocked

### 3. Use Water Cooler for Context
- Before interrupting an agent, check water cooler
- See if they already answered each other
- Reduces your involvement by 70%

### 4. Trust the Accomplishments Feed
- Don't check logs constantly
- Accomplishments = "what got done"
- Faster than reading raw logs

### 5. DM Agents, Don't Call Them
- Click agent → Send DM
- Async = they reply when free
- No blocking their work

---

## Troubleshooting Your First 5 Minutes

### "openclawfice: command not found"

The installer creates `~/bin/openclawfice`. Add to PATH:
```bash
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Or run directly:
```bash
cd ~/openclawfice && npm run dev
```

---

### "Cannot GET /" error

Server isn't running. Start it:
```bash
cd ~/openclawfice
npm run dev
```

Then open http://localhost:3333

---

### Agents show as "New" forever

"New" means they've been discovered but haven't completed a session yet.

Send them work:
```bash
openclaw send --agent your-agent-id "What's your status?"
```

After they reply, refresh OpenClawfice. They'll show as "Idle" or "Working".

---

### Demo mode shows but real agents don't

Check if you're still in demo mode:
- URL should be `localhost:3333` (no `?demo=true`)
- If you see demo banner, remove `?demo=true` from URL

---

## Success! What Now?

After your first 5 minutes, you should:
- ✅ See your agents in the office
- ✅ Understand what they're doing
- ✅ Know how to interact with them
- ✅ Feel more productive than using logs

**Welcome to OpenClawfice!** 🎉

Keep the dashboard open, check it a few times a day, and you'll wonder how you ever managed agents without it.

---

## Next Reads

**Want to get even more value?**

1. [USE-CASES.md](./USE-CASES.md) - See how others use it
2. [UI-GUIDE.md](./UI-GUIDE.md) - Master the interface
3. [QUICK-REFERENCE.md](../QUICK-REFERENCE.md) - Power user tips
4. [FAQ.md](./FAQ.md) - Common questions

**Want to contribute?**

1. [CONTRIBUTING.md](../CONTRIBUTING.md) - Join the community
2. [GOOD-FIRST-ISSUES.md](../GOOD-FIRST-ISSUES.md) - Easy wins

---

**Status:** You're now an OpenClawfice user. Go forth and manage your AI team! 🚀

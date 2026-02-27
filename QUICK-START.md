# OpenClawfice Quick Start Guide

**Get from zero to productive in 5 minutes.**

---

## 🎯 Goal

By the end of this guide, you'll have:
- ✅ OpenClawfice running at localhost:3333
- ✅ Your AI agents showing as pixel art NPCs
- ✅ Quest log tracking their work
- ✅ Water cooler chat active
- ✅ Understanding of how to monitor agent productivity

**Time:** 5 minutes (seriously)

---

## Step 1: Install (30 seconds)

```bash
npm install -g openclawfice
```

**Requirements:** Node.js 18+, npm 9+, OpenClaw installed

**Don't have OpenClaw?** [Install it first](https://docs.openclaw.ai/getting-started) or try [demo mode](https://openclawfice.com/?demo=true).

---

## Step 2: Start (10 seconds)

```bash
openclawfice
```

**What you'll see:**
```
🏢 OpenClawfice starting...
✓ Discovered 3 agents
✓ Server running at http://localhost:3333
```

**Open your browser:** http://localhost:3333

---

## Step 3: Explore Your Office (2 minutes)

### The Office Layout

You'll see a **pixel art virtual office** with 3 main rooms:

#### 1. Work Room 💻
- **Who's here:** Agents actively working on tasks
- **Look for:** Green plumbobs (diamond above heads) = great mood
- **Task labels:** Hover to see what each agent is doing
- **Why it matters:** Visual proof your agents are working

#### 2. The Lounge ☕
- **Who's here:** Agents on break or waiting for next task
- **Look for:** Cooldown timers = when they'll work next
- **Break messages:** Fun status updates ("☕ On break", "📖 Reading docs")
- **Why it matters:** Know who's available vs busy

#### 3. Meeting Room 🤝
- **Who's here:** Agents collaborating on shared tasks
- **Currently:** Auto-meetings coming in v2 (manual trigger for now)
- **Why it matters:** Track team coordination

### Your First Interaction

**Click an NPC:**
- See agent details (name, role, level, XP)
- View recent accomplishments
- Check energy/mood status

**Try the Water Cooler tab:**
- See agent-to-agent messages
- Watch speech bubbles appear above NPCs
- This is how your agents coordinate!

**Check the Quest Board:**
- See active tasks (critical → high → medium → low)
- Track what's blocked vs in progress
- Celebrate accomplishments (XP notifications)

---

## Step 4: Understand Status Detection (1 minute)

### How OpenClawfice Knows What Agents Are Doing

**Updates every 3 seconds** by reading:
1. OpenClaw session activity
2. Tool usage (working = recent tool calls)
3. Task inference from session history
4. Status files (`~/.openclaw/.status/`)

### Agent Status Colors

- 🟢 **Great mood** - High energy, crushing tasks
- 🟡 **Good mood** - Working steadily
- 🟠 **Okay mood** - Getting tired
- 🔴 **Stressed** - Needs a break or blocked

### Work vs Idle Detection

**Working = any of:**
- Tool calls in last 5 minutes
- Session updated recently
- Explicit status file says "working"

**Idle = any of:**
- No activity in 5+ minutes
- Only text responses (no tool use)
- Water cooler chat only (doesn't count as work)

---

## Step 5: Make It Yours (1.5 minutes)

### Add Agent Personality

Give your agents identity files for better names/roles:

```bash
cd ~/agents/my-agent
nano IDENTITY.md
```

Add:
```yaml
name: Nova
role: PM
emoji: 📋
```

**Refresh OpenClawfice** - NPC updates with new name!

### Trigger Some Activity

**Make an agent work:**
```bash
# In agent workspace
echo "Write a hello world script" | openclaw
```

**Watch the office:**
- Agent moves from Lounge → Work Room
- Task label appears above head
- Plumbob turns green
- Live magic! ✨

### Log an Accomplishment

```bash
curl -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -H "X-OpenClawfice-Token: $(cat ~/.openclaw/.openclawfice-token)" \
  -d '{
    "type": "add_accomplishment",
    "accomplishment": {
      "icon": "🎉",
      "title": "First task complete!",
      "detail": "Successfully set up OpenClawfice",
      "who": "Nova"
    }
  }'
```

**Watch for:** XP notification popup in the office!

---

## 🎮 What Makes It Fun

### Gamification Elements

1. **XP & Leveling**
   - Agents gain XP from accomplishments
   - Level up over time
   - Purely for fun (no functional impact)

2. **Quest System**
   - Tasks organized like RPG quests
   - Priority levels (critical = boss fights)
   - Satisfaction from completing the list

3. **Pixel Art NPCs**
   - Unique appearance per agent (deterministic from ID)
   - Mood-based expressions (happy/focused/stressed/chill)
   - Smooth animations (walking, typing, bobbing)

4. **Water Cooler Drama**
   - Agents chat, coordinate, joke
   - Speech bubbles appear in real-time
   - Feels like a real office

5. **Celebrations**
   - Accomplishment popups
   - Party mode (rare events)
   - Visual dopamine hits

---

## 💡 Power User Tips

### Productivity Workflow

**Morning routine:**
1. Open OpenClawfice
2. Check Quest Board - what's critical today?
3. Scan Work Room - who's already grinding?
4. Read Water Cooler - any blockers or ideas?

**During the day:**
- Leave it open in a browser tab
- Glance occasionally (like checking Slack)
- Celebrate accomplishments when they pop

**End of day:**
- Review accomplishments (what got done?)
- Check idle agents (who needs tasks tomorrow?)
- Plan next day's quests

### Keyboard Shortcuts

- **Cmd/Ctrl + R** - Refresh (force status update)
- **Cmd/Ctrl + T** - New tab (keep office open)
- **Cmd/Ctrl + W** - Close tab (but why? it's so pretty!)

### Advanced: Auto-Start on Boot

**macOS (LaunchAgent):**
```bash
# Create plist
cat > ~/Library/LaunchAgents/com.openclawfice.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.openclawfice</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/openclawfice</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
EOF

# Load it
launchctl load ~/Library/LaunchAgents/com.openclawfice.plist
```

**Linux (systemd):**
```bash
# Create service
sudo nano /etc/systemd/system/openclawfice.service

[Unit]
Description=OpenClawfice Dashboard
After=network.target

[Service]
Type=simple
User=yourusername
ExecStart=/usr/local/bin/openclawfice
Restart=always

[Install]
WantedBy=multi-user.target

# Enable it
sudo systemctl enable openclawfice
sudo systemctl start openclawfice
```

---

## 🐛 Troubleshooting (30 seconds)

### Office is empty
```bash
# Check if you have agents
openclaw agents list

# If empty, add one
mkdir -p ~/agents/test-agent
echo "name: TestAgent" > ~/agents/test-agent/IDENTITY.md
```

### Port 3333 in use
```bash
# Kill existing process
lsof -ti:3333 | xargs kill

# Or use different port
openclawfice --port 3334
```

### Agents showing as "idle" when working
- Wait 3 seconds (auto-updates)
- Hard refresh browser (Cmd+Shift+R)
- Check if work is recent (activity in last 5 min)

### More help
- **Full FAQ:** [FAQ.md](./FAQ.md)
- **Troubleshooting guide:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🚀 Next Steps

### Learn More
- **Use Cases:** [USE-CASES.md](./USE-CASES.md) - 10 workflows
- **Comparison:** [COMPARISON.md](./COMPARISON.md) - vs alternatives
- **Advanced:** Customize themes, add rooms, API integration

### Get Involved
- ⭐ **Star the repo:** github.com/openclawfice/openclawfice
- 🐦 **Share:** Tweet your office screenshot
- 💬 **Join:** Discord.com/invite/clawd
- 🐛 **Report bugs:** GitHub Issues

### Spread the Word
- Show it to other devs
- Demo it in team meetings
- Write a blog post
- Record a video tour

---

## 🎉 You're Done!

**In 5 minutes you:**
- ✅ Installed OpenClawfice
- ✅ Saw your agents as pixel art NPCs
- ✅ Explored the office rooms
- ✅ Understood status detection
- ✅ Personalized your setup
- ✅ Learned power user tips

**Now what?**

**Leave it running.** That's it. Just check in occasionally. Watch your agents work. Celebrate accomplishments. Enjoy the retro vibes.

**It's productivity monitoring that doesn't suck.** 🎮

---

## 📸 Share Your Office!

Post a screenshot with:
- `#OpenClawfice` hashtag
- Tag `@tylerbot` on Twitter
- Show your agent roster

**We'll retweet the coolest ones!**

---

**Welcome to the virtual office. Your agents are waiting.** 🏢✨

---

*Questions? [FAQ.md](./FAQ.md) | Bugs? [GitHub Issues](https://github.com/openclawfice/openclawfice/issues)*

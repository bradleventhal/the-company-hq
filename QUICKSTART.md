# OpenClawfice Quick Start

**Get up and running in 2 minutes.** ⚡

---

## What is OpenClawfice?

Turn your AI agents into pixel art characters in a retro office dashboard. See who's working, who's idle, and what everyone's doing — all in real-time.

---

## Prerequisites

- **OpenClaw installed** → [openclaw.ai](https://openclaw.ai)
- **At least one agent configured** in `~/.openclaw/openclaw.json`

---

## Install

**Quick install:**
```bash
git clone https://github.com/openclawfice/openclawfice.git ~/openclawfice
cd ~/openclawfice && npm install && npm run dev
```

**Need help?** See [INSTALL.md](./INSTALL.md) for detailed instructions, troubleshooting, and prerequisites.

---

## Run

The `npm run dev` command from install already starts the server. Just open:

**http://localhost:3333**

That's it!

---

## What You'll See

**🏢 Your Virtual Office:**

- **Work Room** → Agents currently working
- **Lounge** → Agents waiting for tasks
- **Quest Log** → Pending decisions
- **Water Cooler** → Team chat
- **Accomplishments** → Recent wins

**Click any agent** to see details or send them a message!

---

## First Steps

### 1. Wake Up Your Agents

If you see "No agents detected", send a message to wake them:

```bash
openclaw send --agent main "Hello!"
```

Refresh the dashboard. Your agent should appear in the Lounge!

### 2. Try a Quest Template

1. Click **"Browse Quest Templates"** in the Quest Log
2. Pick "Code Review Request" or "Bug Triage"
3. Customize and create

Now you have a quest in your log!

### 3. Broadcast a Message

1. Go to the **Water Cooler** (right side)
2. Type a message in "BROADCAST TO ALL" at the bottom
3. Press Enter

All your agents receive the message instantly.

---

## Customize Your Office

Create `openclawfice.config.json` in the project directory:

```json
{
  "agents": {
    "main": {
      "name": "Nova",
      "emoji": "📋",
      "color": "#8b5cf6"
    }
  },
  "cooldown": {
    "default": "10m"
  }
}
```

Then run:
```bash
openclawfice sync-cooldowns
```

Your agents will auto-check for work every 10 minutes!

---

## Common Issues

**No agents showing?**
```bash
# Check OpenClaw is running
openclaw status

# Check you have agents
cat ~/.openclaw/openclaw.json | grep agents

# Wake them up
openclaw send --agent main "wake up"
```

**Port already in use?**
```bash
openclawfice --port=4000
```

**Agents not moving?**
- Agents show as "working" when they've had activity in the last 5 minutes
- Send them a task to see them move to the Work Room

---

## Next Steps

**📖 Learn More:**
- [Full README](./README.md) — Complete feature list
- [Configuration Guide](./docs/CONFIGURING-YOUR-OFFICE.md) — Customize everything
- [FAQ](./docs/FAQ.md) — Troubleshooting and tips
- [Contributing](./CONTRIBUTING.md) — Help build OpenClawfice

**🎮 Try Demo Mode:**
```
http://localhost:3333?demo=true
```
See a pre-populated office in action!

**🚀 Advanced:**
- Set up cooldown timers
- Configure water cooler chat personality
- Enable the Meeting Room
- Create custom quest templates

---

## Get Help

- **Issues:** [GitHub Issues](https://github.com/openclawfice/openclawfice/issues)
- **Questions:** [GitHub Discussions](https://github.com/openclawfice/openclawfice/discussions)
- **Docs:** [Full Documentation](./README.md)

---

**That's it!** You're now running your own AI agent office. 🏢✨

Have fun! If you build something cool, share it with the community. 🎉

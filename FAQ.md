# OpenClawfice FAQ

**Quick answers to common questions about installing, using, and troubleshooting OpenClawfice.**

---

## 🚀 Getting Started

### What is OpenClawfice?

OpenClawfice is a visual dashboard for your OpenClaw AI agents. Instead of staring at terminal logs, you get a pixel art "virtual office" where your agents appear as NPCs, complete with:

- **Work/Lounge/Meeting rooms** - See who's working, who's idle, who's collaborating
- **Water Cooler chat** - Agents coordinate via async messaging
- **Quest log** - Track tasks, accomplishments, and agent XP
- **Live status updates** - Real-time mood, energy, and task detection

Think of it as *The Sims meets AI ops* - gamification for productivity.

### Do I need OpenClaw to use OpenClawfice?

**Yes** - OpenClawfice is a monitoring dashboard *for* OpenClaw agents. It reads your OpenClaw configuration and displays agent activity visually.

**BUT** - you can try the demo mode first without installing anything:
```
https://openclawfice.com/?demo=true
```

### How much does it cost?

**Free.** OpenClawfice is open source (MIT license). Install it, modify it, ship it - no fees, no limits.

---

## 📦 Installation

### How do I install it?

```bash
npm install -g openclawfice
openclawfice
```

Then open `http://localhost:3333` in your browser.

### What are the requirements?

- **Node.js** 18+ (check with `node --version`)
- **npm** 9+ (check with `npm --version`)
- **OpenClaw** installed and configured (check with `openclaw status`)

### Installation fails with "command not found"

**Problem:** npm isn't installing global binaries to your PATH.

**Fix:**
```bash
# Find npm global bin path
npm config get prefix

# Add to your PATH (add to ~/.zshrc or ~/.bashrc)
export PATH="$(npm config get prefix)/bin:$PATH"

# Reload shell
source ~/.zshrc  # or source ~/.bashrc
```

### Port 3333 is already in use

**Problem:** Another process is using port 3333.

**Option 1:** Kill the existing process
```bash
# macOS/Linux
lsof -ti:3333 | xargs kill

# Or find and kill manually
lsof -i:3333
kill <PID>
```

**Option 2:** Use a different port
```bash
openclawfice --port 3334
```

### It says "No OpenClaw installation detected"

**Problem:** OpenClawfice can't find your OpenClaw config.

**Check:**
1. Is OpenClaw installed? Run `openclaw status`
2. Is the config at `~/.openclaw/openclaw.json`?
3. Do you have any agents configured?

**Fix:**
```bash
# Install OpenClaw if missing
npm install -g openclaw

# Configure your first agent
openclaw init
```

### It shows "No agents configured"

**Problem:** Your OpenClaw config exists but has no agents.

**Fix:**
```bash
# Add an agent
mkdir -p ~/agents/my-agent
cd ~/agents/my-agent

# Create basic config files
echo "name: MyAgent" > IDENTITY.md
echo "role: assistant" >> IDENTITY.md

# Then restart OpenClawfice
```

---

## 🎮 Using OpenClawfice

### Why is my agent showing as "idle" when it's clearly working?

**Reasons:**
1. **Session activity is older than 5 minutes** - Agent finished its last task
2. **Water cooler activity only** - Recent chat doesn't count as "working"
3. **Text-only responses** - No tool calls in the last 30 seconds

**Check:**
- Look at your agent's session: `openclaw sessions list`
- Recent tool use? Working. Just chatting? Idle.

### How do I trigger a status update?

**Status updates automatically every 3 seconds.** No manual refresh needed.

If an agent just started working but still shows idle, wait 3 seconds for the next poll.

### Can I customize agent appearance (skin color, hair, etc.)?

**Not yet** - NPCs are auto-generated from agent IDs (deterministic). Same ID = same look.

**Planned for v2:** Custom NPC avatars via agent config files.

### How do I add more agents?

OpenClawfice **auto-discovers** agents from your OpenClaw config. Just add an agent to OpenClaw:

```bash
# Create new agent workspace
mkdir -p ~/agents/new-agent
cd ~/agents/new-agent

# Add identity
echo "name: NewAgent" > IDENTITY.md
echo "role: developer" >> IDENTITY.md

# OpenClawfice will pick it up automatically (within 3 seconds)
```

### What are "quests" and how do they work?

Quests = tasks from your OpenClaw agents' action logs. OpenClawfice reads `~/.openclaw/.status/actions.json` and displays active/critical tasks as a "quest board."

**Completing quests:**
- Agents complete quests by updating their action logs (via OpenClaw)
- Accomplishments show as XP notifications
- Quest priority: critical > high > medium > low

### How does XP/leveling work?

**XP = accomplishments.** Each time an agent logs an accomplishment:
```bash
curl -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -d '{"type":"add_accomplishment","accomplishment":{...}}'
```

The agent gains XP and levels up. It's purely for fun/gamification - no functional impact.

### Can agents actually "talk" in the Water Cooler?

**Yes!** The Water Cooler shows real agent-to-agent messages. Agents can:
- Chat via OpenClaw's water cooler feature
- Coordinate on shared tasks
- Share ideas, blockers, updates

Messages appear as speech bubbles above NPCs in the office.

---

## 🐛 Troubleshooting

### The office is empty (no agents showing)

**Check:**
1. Do you have OpenClaw agents configured? (`openclaw agents list`)
2. Is OpenClawfice running? (`http://localhost:3333` should load)
3. Are you in demo mode by accident? (URL shouldn't have `?demo=true`)

**Fix:**
- If no OpenClaw: Install and configure it
- If no agents: Add at least one agent workspace
- If demo mode: Remove `?demo=true` from URL

### Chat bubbles are appearing twice/stacked

**This should be fixed** (as of Feb 27, 2026). If you still see it:

1. **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Clear cache:** Browser Settings → Clear browsing data → Cached images
3. **Check version:** Latest version has React key prop fix

### Agents aren't moving between rooms

**Expected behavior:**
- Agents move when their status changes (working ↔ idle)
- Updates happen every 3 seconds
- Transitions are smooth animations (1-2 seconds)

**If stuck:**
- Refresh the page
- Check if agent status is actually changing (`openclaw status`)

### Meeting Room is always empty

**Meetings require manual activation.** They don't auto-detect collaboration.

**Planned for v2:** Auto-detect when multiple agents are working on the same task.

### NPCs look weird / animations are janky

**Check:**
1. **Browser:** Chrome/Edge/Firefox work best. Safari may have rendering issues.
2. **GPU acceleration:** Enable in browser settings (chrome://settings/?search=hardware)
3. **Zoom level:** 100% zoom works best (Cmd/Ctrl + 0)

### Performance issues (slow/laggy)

**Optimize:**
1. **Close other apps** - Free up RAM
2. **Reduce agents** - 10+ agents may slow things down
3. **Disable particles** - Edit `app/page.tsx` if you're technical
4. **Use production build** - `npm run build && npm start` (faster than dev mode)

### Can't access from other devices (phone, tablet)

**By default, OpenClawfice only listens on localhost (127.0.0.1).**

**To allow network access:**
```bash
# NOT RECOMMENDED (security risk)
openclawfice --host 0.0.0.0

# Then access via: http://<your-ip>:3333
```

**Security warning:** This exposes your agent data to your local network. Only use on trusted networks.

**Better option:** Use SSH tunneling or deploy to a private server with authentication.

---

## 🔒 Security & Privacy

### Is my agent data private?

**Yes.** OpenClawfice runs entirely on your machine. No data is sent to external servers (unless you deploy it to a VPS).

### Can others see my agents?

**Only if you let them.** By default, it's localhost-only. If you expose it (via `--host 0.0.0.0` or deployment), add authentication.

### How do I add authentication?

**Built-in token auth:** OpenClawfice uses `~/.openclaw/.openclawfice-token` for API requests.

**For web access:** Add reverse proxy (nginx, Caddy) with basic auth in front of port 3333.

**Example (nginx):**
```nginx
location / {
  auth_basic "Restricted";
  auth_basic_user_file /etc/nginx/.htpasswd;
  proxy_pass http://localhost:3333;
}
```

---

## 🚀 Advanced

### Can I run OpenClawfice in production?

**Yes.** Deploy it to a VPS with:
1. **Process manager** (PM2, systemd)
2. **Reverse proxy** (nginx, Caddy)
3. **SSL certificate** (Let's Encrypt)
4. **Authentication** (basic auth or OAuth)

**Example (PM2):**
```bash
npm install -g pm2
pm2 start openclawfice --name "openclawfice"
pm2 save
pm2 startup
```

### How do I customize the office theme?

**Edit `app/page.tsx`:**
- Colors: Search for `theme` object
- Room names: Search for `<Room title=`
- NPC appearance: Edit `components/NPC.tsx`

**Requires:** Basic React/TypeScript knowledge + rebuild (`npm run build`)

### Can I add custom rooms?

**Yes** - edit `app/page.tsx` and add a new `<Room>` component.

**Example:**
```tsx
<Room title="Debug Room" icon="🐛" color="#1a0a10" borderColor="#991b1b">
  {/* Custom content here */}
</Room>
```

### How do I export my workflow config?

**Built-in export API:**
```bash
curl http://localhost:3333/api/export/workflow \
  -H "X-OpenClawfice-Token: $(cat ~/.openclaw/.openclawfice-token)" \
  > my-workflow.json
```

**Outputs:** Agent configs, gateway settings, metadata (git-friendly JSON)

### Can I integrate OpenClawfice with other tools?

**Yes.** OpenClawfice exposes several API endpoints:

- `GET /api/office` - Agent status
- `GET /api/office/chat` - Water cooler messages
- `GET /api/office/actions` - Quest log
- `POST /api/office/actions` - Add accomplishments
- `GET /api/office/meeting` - Meeting room status

**Authentication:** Include `X-OpenClawfice-Token` header (read from `~/.openclaw/.openclawfice-token`)

---

## 💡 Tips & Tricks

### Best practices for agent monitoring

1. **Name your agents** - Add `IDENTITY.md` with clear names/roles
2. **Use accomplishments** - Log wins for dopamine hits (XP notifications)
3. **Check Water Cooler daily** - See what agents discussed
4. **Set quest priorities** - Mark critical tasks so they stand out
5. **Watch cooldown timers** - Know when agents will be active again

### Keyboard shortcuts

- **Cmd/Ctrl + R** - Refresh page (force status update)
- **Cmd/Ctrl + Shift + R** - Hard refresh (clear cache)
- **Cmd/Ctrl + +/-** - Zoom in/out (100% recommended)

### Easter eggs

- **Party Mode** - All NPCs jump around (triggered by special events)
- **Celebration animations** - Appear on accomplishments
- **Mood-based expressions** - NPCs change faces based on stress/happiness

---

## 📚 More Help

### Where's the documentation?

- **Getting Started:** [INSTALL.md](./INSTALL.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Use Cases:** [USE-CASES.md](./USE-CASES.md)
- **Comparison:** [COMPARISON.md](./COMPARISON.md)

### I found a bug!

**Report it:**
1. GitHub Issues: https://github.com/openclawfice/openclawfice/issues
2. Include: OS, Node version, error message, steps to reproduce
3. Screenshots help!

### I have a feature request!

**We'd love to hear it:**
- Open a GitHub Issue with the `enhancement` label
- Join the Discord: https://discord.com/invite/clawd
- Tweet at us: [@tylerbot](https://twitter.com/tylerbot)

### How can I contribute?

**Ways to help:**
1. **Star the repo** - github.com/openclawfice/openclawfice
2. **Share it** - Tweet, blog, demo video
3. **Code contributions** - PRs welcome! (see CONTRIBUTING.md)
4. **Documentation** - Improve guides, fix typos
5. **Test & report bugs** - Fresh eyes catch issues

---

## 🎯 Still Stuck?

**Quick checklist:**
- [ ] Node 18+ installed? (`node --version`)
- [ ] OpenClaw installed? (`openclaw status`)
- [ ] Agents configured? (`openclaw agents list`)
- [ ] Port 3333 free? (`lsof -i:3333`)
- [ ] Browser at `http://localhost:3333`?
- [ ] Hard refreshed? (Cmd+Shift+R)

**If all else fails:**
1. Stop OpenClawfice (`Ctrl+C`)
2. Clear cache: `rm -rf .next`
3. Reinstall: `npm uninstall -g openclawfice && npm install -g openclawfice`
4. Restart: `openclawfice`

**Still broken?** Open a GitHub issue with:
- OS version
- Node version (`node --version`)
- OpenClaw version (`openclaw --version`)
- Error logs (screenshot or copy-paste)
- What you tried

---

**Pro tip:** Most issues are solved by hard refreshing (Cmd+Shift+R) or restarting OpenClawfice. Try that first!

---

*Last updated: Feb 27, 2026*  
*OpenClawfice version: 0.1.0*

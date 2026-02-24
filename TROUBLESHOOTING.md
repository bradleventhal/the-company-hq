# 🔧 Troubleshooting Guide

**Hit a snag? Here's how to fix it in under 5 minutes.**

---

## Quick Diagnosis

**What's broken?**

1. **No agents showing** → [Jump to Fix #1](#fix-1-no-agents-showing)
2. **Port 3333 already in use** → [Jump to Fix #2](#fix-2-port-in-use)
3. **Agents stuck idle** → [Jump to Fix #3](#fix-3-agents-not-working)
4. **Build fails** → [Jump to Fix #4](#fix-4-build-errors)
5. **Blank white screen** → [Jump to Fix #5](#fix-5-blank-screen)
6. **Accomplishments not recording** → [Jump to Fix #6](#fix-6-no-recordings)

---

## Fix #1: No Agents Showing

**Symptoms:** Dashboard shows "0 agents" or empty office

**Causes:**
- OpenClaw not running
- No agents configured
- Agents haven't woken up yet

**Solution (30 seconds):**

```bash
# 1. Check OpenClaw is running
openclaw status

# 2. If not running, start it
openclaw gateway start

# 3. Check agents exist
cat ~/.openclaw/openclaw.json | jq '.agents.list'

# 4. Wake an agent up
openclaw send --agent main "wake up"

# 5. Refresh dashboard
open http://localhost:3333
```

**Still not working?**

Check the API directly:
```bash
curl http://localhost:3333/api/office | jq '.agents'
```

If this returns `[]`, your agents aren't being detected. Check:
- `~/.openclaw/openclaw.json` exists
- `agents.list` array has entries
- Agent IDs match what you're sending to

---

## Fix #2: Port In Use

**Symptoms:** `Error: listen EADDRINUSE: address already in use :::3333`

**Cause:** Something else is using port 3333

**Solution (10 seconds):**

```bash
# Option 1: Kill whatever's using port 3333
lsof -ti:3333 | xargs kill -9

# Then restart
npm run dev
```

**Or use a different port:**
```bash
# Edit package.json "dev" script:
"dev": "next dev -p 4000"

# Or run directly:
next dev -p 4000
```

---

## Fix #3: Agents Not Working

**Symptoms:** Agents show as idle but should be working

**Causes:**
- Agent hasn't received work in 5+ minutes
- Session ended
- Autowork disabled

**Solution (1 minute):**

```bash
# 1. Send agent a task
openclaw send --agent main "Please analyze the logs"

# 2. Check if agent picks it up
# Refresh dashboard - agent should move to Work Room

# 3. If still idle, check session status
openclaw sessions list

# 4. Enable autowork (optional)
# See docs/AUTOWORK.md
```

**Pro tip:** Agents show as "working" based on recent session activity (last 5 min). Send them work to see movement!

---

## Fix #4: Build Errors

**Symptoms:** `npm run build` fails with TypeScript errors

**Common errors:**

### Error: "Cannot find module"

**Fix:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Error: "Type error in components/..."

**Fix:**
```bash
# Check TypeScript version
npm list typescript

# Should be 5.x - if not, update
npm install -D typescript@latest

# Clear cache and rebuild
rm -rf .next
npm run build
```

### Error: "ENOENT: no such file or directory"

**Fix:**
```bash
# Build cache corrupted - clear it
rm -rf .next
npm run build
```

---

## Fix #5: Blank Screen

**Symptoms:** Page loads but shows nothing, or JavaScript errors in console

**Solution (2 minutes):**

```bash
# 1. Check browser console for errors
# Open DevTools (Cmd+Option+I / F12)
# Look for red errors

# 2. Clear build cache
rm -rf .next

# 3. Restart dev server
npm run dev

# 4. Hard refresh browser
# Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

**Still blank?**

Check if the API works:
```bash
curl http://localhost:3333/api/office
```

If this returns data, it's a frontend issue. If it errors, it's a backend issue.

---

## Fix #6: No Recordings

**Symptoms:** Accomplishments show but videos don't attach

**Causes:**
- Recording script not executable
- ffmpeg not installed
- Puppeteer missing

**Solution (2 minutes):**

```bash
# 1. Check if recording script exists
ls -l scripts/record-isolated.mjs

# 2. Make it executable
chmod +x scripts/record-isolated.mjs

# 3. Install Puppeteer if missing
npm install puppeteer-core

# 4. Check ffmpeg installed
which ffmpeg
# If not found: brew install ffmpeg (Mac) or apt-get install ffmpeg (Linux)

# 5. Test recording manually
node scripts/record-isolated.mjs test-recording 5 xp
```

**Note:** Recordings are non-critical. If they fail, accomplishments still work - just no video attached.

---

## Common Setup Issues

### Issue: "Cannot find OpenClaw agents"

**Check:**
```bash
# Is OpenClaw config file present?
ls ~/.openclaw/openclaw.json

# Does it have agents?
jq '.agents.list' ~/.openclaw/openclaw.json

# Are agent IDs valid?
openclaw agents list
```

### Issue: "Agents not updating in real-time"

**Cause:** Dashboard auto-refreshes every 5 seconds. If not working:

```bash
# Check browser console for polling errors
# Should see GET /api/office every 5s

# If not polling:
# 1. Hard refresh browser (Cmd+Shift+R)
# 2. Clear browser cache
# 3. Try incognito mode
```

### Issue: "Quest Log empty but I have quests"

**Check:**
```bash
# Are quests in the status file?
cat ~/.openclaw/.status/actions.json | jq '.'

# If file missing:
mkdir -p ~/.openclaw/.status
echo '[]' > ~/.openclaw/.status/actions.json

# Dashboard should pick them up within 5s
```

---

## Emergency Reset

**Everything's broken and you just want it to work:**

```bash
# 1. Stop everything
lsof -ti:3333 | xargs kill -9

# 2. Clean slate
cd ~/openclawfice
rm -rf node_modules .next
npm install

# 3. Restart
npm run dev

# 4. Check it works
curl http://localhost:3333/api/office

# 5. Refresh browser
open http://localhost:3333
```

**Total time:** 2-3 minutes

---

## Platform-Specific Issues

### macOS

**Issue:** "screencapture permission denied"

**Fix:**
```bash
# System Preferences → Security & Privacy → Screen Recording
# Enable Terminal (or your terminal app)
```

**Issue:** "Port 3333 used by another app"

**Find what's using it:**
```bash
lsof -ti:3333
# Kill it or use different port
```

### Linux

**Issue:** "EACCES: permission denied, bind"

**Fix:**
```bash
# Ports < 1024 need sudo
# Use port 3333 (no sudo needed)

# Or grant Node.js permission:
sudo setcap cap_net_bind_service=+ep $(which node)
```

### Windows (WSL)

**Issue:** "Cannot connect to localhost:3333"

**Fix:**
```bash
# Use WSL IP instead of localhost
ip addr show eth0 | grep inet

# Access via http://<WSL-IP>:3333
# Or forward port in PowerShell:
# netsh interface portproxy add v4tov4 listenport=3333 connectaddress=<WSL-IP> connectport=3333
```

---

## Performance Issues

### Slow Page Load

**Cause:** Large agent count or slow network

**Fix:**
```bash
# 1. Enable production mode
npm run build
npm start

# Production is 3-5x faster than dev

# 2. Reduce agent count if >20
# Edit ~/.openclaw/openclaw.json
```

### High CPU Usage

**Cause:** Dev server running Turbopack

**Fix:**
```bash
# Use production mode instead
npm run build && npm start

# Or limit Turbopack workers
NODE_OPTIONS='--max-old-space-size=2048' npm run dev
```

---

## Advanced Debugging

### Check API Endpoints

```bash
# Office data
curl http://localhost:3333/api/office | jq '.'

# Demo mode
curl 'http://localhost:3333/api/demo' | jq '.'

# Config
curl http://localhost:3333/api/office/config | jq '.'
```

### Check Status Files

```bash
# Actions (quests)
cat ~/.openclaw/.status/actions.json | jq '.'

# Accomplishments
cat ~/.openclaw/.status/accomplishments.json | jq '.'

# Responses
cat ~/.openclaw/.status/responses.json | jq '.'
```

### Enable Debug Logs

```bash
# Start with debug output
DEBUG=* npm run dev

# Or specific namespace
DEBUG=openclawfice:* npm run dev
```

---

## Still Stuck?

**Get help:**

1. **Check the FAQ:** [docs/FAQ.md](./docs/FAQ.md)
2. **Search issues:** [GitHub Issues](https://github.com/openclawfice/openclawfice/issues)
3. **Ask the community:** [GitHub Discussions](https://github.com/openclawfice/openclawfice/discussions)
4. **File a bug:** Include:
   - OS + version
   - Node version (`node -v`)
   - Error message (full stack trace)
   - Steps to reproduce

---

## Quick Reference

| Problem | Fix Time | Command |
|---------|----------|---------|
| No agents | 30s | `openclaw send --agent main "wake up"` |
| Port in use | 10s | `lsof -ti:3333 \| xargs kill -9` |
| Build error | 2min | `rm -rf .next && npm run build` |
| Blank screen | 2min | `rm -rf .next && npm run dev` |
| Emergency reset | 3min | Clean install (see above) |

---

**Most issues are fixed by:** `rm -rf .next && npm run dev`

If that doesn't work, you've found a real bug! Please report it. 🐛

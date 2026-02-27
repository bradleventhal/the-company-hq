# Troubleshooting Guide

Quick fixes for common OpenClawfice issues.

---

## Installation Issues

### "Command not found: openclaw"

**Cause:** OpenClaw not installed or PATH not updated.

**Fix:**
```bash
# Check if OpenClaw is installed
which openclaw

# If nothing shows, install OpenClaw first
curl -fsSL https://openclaw.ai/install.sh | bash

# If installed but not in PATH, reload shell config
source ~/.zshrc  # or ~/.bashrc
```

### "npm install" fails with EACCES

**Cause:** Permission issues with npm global directory.

**Fix:**
```bash
# Fix npm permissions (don't use sudo!)
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Retry install
cd ~/openclawfice && npm install
```

### Port 3333 already in use

**Cause:** Another process (or previous OpenClawfice instance) using port 3333.

**Fix Option 1 - Use different port:**
```bash
npm run dev -- --port 3334
# Open http://localhost:3334
```

**Fix Option 2 - Kill existing process:**
```bash
# Find what's using port 3333
lsof -ti:3333

# Kill it
lsof -ti:3333 | xargs kill -9

# Restart normally
npm run dev
```

---

## Display Issues

### Empty office (no agents showing)

**Possible causes:**

**1. OpenClaw not configured**

Check if config exists:
```bash
cat ~/.openclaw/openclaw.json
```

If missing, create minimal config:
```bash
mkdir -p ~/.openclaw
cat > ~/.openclaw/openclaw.json << 'EOF'
{
  "agents": {
    "list": [
      {
        "id": "main",
        "name": "Assistant",
        "role": "AI Agent",
        "emoji": "🤖"
      }
    ]
  }
}
EOF
```

**2. Agents exist but showing as idle**

Normal if agents haven't done work yet. Send them a message:
```bash
openclaw agent -m "What are you working on?"
```

**3. Auth token mismatch**

Regenerate token:
```bash
rm ~/.openclaw/.openclawfice-token
# Restart OpenClawfice - new token auto-generates
```

### Loading screen stuck / page won't load

**Cause:** Server crashed or network issue.

**Fix:**
```bash
# Check if dev server is still running
# Look for "Ready in X.Xs" in terminal

# If crashed, check error and restart
npm run dev

# Clear build cache if needed
rm -rf .next
npm run dev
```

### Agents stuck in one room

**Cause:** Status not updating or cached state.

**Fix:**
```bash
# Hard refresh browser
# Mac: Cmd + Shift + R
# Windows/Linux: Ctrl + Shift + R

# Check agent sessions
ls ~/.openclaw/sessions/

# If old, trigger new activity
openclaw agent --agent main -m "Update status"
```

---

## Performance Issues

### Page loads slowly (>5 seconds)

**Possible causes:**

**1. Large session files**

Check session file sizes:
```bash
du -sh ~/.openclaw/sessions/*
```

If files are huge (>10MB), archive old sessions:
```bash
cd ~/.openclaw/sessions
mkdir archive
mv *.jsonl.old archive/
```

**2. Too many accomplishments**

Accomplishments auto-archive at 200. Check count:
```bash
wc -l ~/.openclaw/.status/accomplishments.json
```

**3. Build cache issues**

Clear and rebuild:
```bash
rm -rf ~/openclawfice/.next
cd ~/openclawfice && npm run dev
```

### UI freezes or becomes unresponsive

**Cause:** JavaScript error or infinite loop.

**Fix:**
1. Open browser console (F12)
2. Check for errors (red text)
3. Screenshot errors
4. Report to GitHub issues
5. Hard refresh to recover

---

## Feature Issues

### Screen recordings not working

**macOS:**
```bash
# Grant screen recording permission
# System Preferences → Security & Privacy → Screen Recording
# Enable for Terminal (or your browser if using Playwright)
```

**Linux:**
```bash
# Install ffmpeg
sudo apt-get install ffmpeg  # Ubuntu/Debian
sudo yum install ffmpeg      # CentOS/RHEL
```

**Verify:**
```bash
ffmpeg -version
```

### XP not updating / agents not leveling up

**Cause:** Accomplishments not being logged.

**Check:**
```bash
cat ~/.openclaw/.status/accomplishments.json | jq length
```

**Test manually:**
```bash
curl -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -H "X-OpenClawfice-Token: $(cat ~/.openclaw/.openclawfice-token)" \
  -d '{"type":"add_accomplishment","accomplishment":{"icon":"🎉","title":"Test","who":"Me"}}'
```

Refresh page - should see new accomplishment.

### Water cooler empty / no chat messages

**Normal conditions:**
- Single agent setups (no one to chat with)
- Agents haven't been active recently
- Fresh install (no history yet)

**Not normal:**
- Multiple agents but no chat
- Check: `cat ~/.openclaw/.status/activity.json`
- If empty, agents aren't logging activity

**Fix:** Trigger agent activity:
```bash
openclaw agent -m "Say something in the water cooler"
```

---

## Production Deployment Issues

### Works locally, breaks on server

**Common causes:**

**1. Port binding**

Production needs to bind to 0.0.0.0:
```bash
# Instead of npm run dev
HOST=0.0.0.0 PORT=3333 npm run dev
```

**2. File permissions**

Check OpenClaw directory:
```bash
ls -la ~/.openclaw
# Should be owned by the user running OpenClawfice
```

**3. NODE_ENV mismatch**

```bash
# Production should use
NODE_ENV=production npm start

# Development uses
npm run dev
```

### Build fails in production

**Error: "Cannot find module"**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

**Error: "Out of memory"**

```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

## API Issues

### "Unauthorized - missing or invalid token"

**Cause:** Auth token not being sent or invalid.

**Debug:**
```bash
# Check token exists
cat ~/.openclaw/.openclawfice-token

# Test API with token
TOKEN=$(cat ~/.openclaw/.openclawfice-token)
curl -H "X-OpenClawfice-Token: $TOKEN" http://localhost:3333/api/office
```

**If token is wrong:**
```bash
rm ~/.openclaw/.openclawfice-token
# Restart OpenClawfice - new token generates automatically
```

### API returns empty data

**Check OpenClaw sessions:**
```bash
ls -la ~/.openclaw/sessions/
tail ~/.openclaw/sessions/agent:main:main.jsonl
```

**If sessions are old:**
- Agents haven't been active
- Trigger activity: `openclaw agent -m "ping"`

---

## Browser Issues

### Works in Chrome, breaks in Firefox/Safari

**Known issues:**
- Some CSS features are Chrome-specific
- Web Audio API differences
- Check browser console for specific errors

**Workaround:** Use Chrome/Edge for best experience.

**Report:** If critical feature breaks, open GitHub issue.

### Console shows CORS errors

**Cause:** Trying to access from different origin.

**Fix:**
- Access via http://localhost:3333 (not 127.0.0.1)
- Don't mix http/https
- Check browser security settings

---

## Data Issues

### Lost all accomplishments / activity log

**Recovery:**
```bash
# Check archive
cat ~/.openclaw/.status/accomplishments-archive.jsonl

# Accomplishments auto-archive at 200
# Oldest ones move to archive file
```

**Prevention:**
- Backup ~/.openclaw/.status/ regularly
- Git commit important accomplishments
- Export data periodically

### Agents disappeared after restart

**Cause:** OpenClaw config changed or missing.

**Check:**
```bash
cat ~/.openclaw/openclaw.json
# Verify agents.list array exists
```

**Restore from backup:**
```bash
# If you have git history
cd ~/.openclaw
git log openclaw.json
git checkout <commit-hash> openclaw.json
```

---

## Getting Help

### Before asking for help:

1. **Check this guide** - Most issues covered above
2. **Check browser console** - Errors show root cause
3. **Check server logs** - Terminal shows server errors
4. **Try fresh install** - Rules out environment issues

### Where to get help:

- **FAQ:** [docs/support/FAQ.md](docs/support/FAQ.md)
- **Discord:** [discord.gg/clawd](https://discord.gg/clawd) #openclawfice channel
- **GitHub Issues:** [github.com/openclawfice/openclawfice/issues](https://github.com/openclawfice/openclawfice/issues)
- **Twitter:** [@clwdbot](https://twitter.com/clwdbot)

### When reporting bugs:

Include:
- OS version (macOS, Ubuntu, etc.)
- Node version (`node -v`)
- OpenClaw version (`openclaw --version`)
- Error message (exact text or screenshot)
- Steps to reproduce
- Browser console output (F12 → Console tab)

---

## Quick Diagnostic Commands

Run these to collect system info for bug reports:

```bash
# System info
uname -a
node -v
npm -v
openclaw --version

# OpenClawfice status
ls -la ~/openclawfice
cat ~/openclawfice/package.json | grep version

# OpenClaw config
cat ~/.openclaw/openclaw.json | jq .

# Session files
ls -lh ~/.openclaw/sessions/

# Status files
ls -lh ~/.openclaw/.status/

# Server logs (if running)
# Check terminal where you ran `npm run dev`
```

---

**Last updated:** 2026-02-27  
**Maintained by:** Forge  
**Next review:** After first 10 user reports

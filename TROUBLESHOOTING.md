# 🔧 Troubleshooting Guide

Common issues and solutions for OpenClawfice.

---

## Installation Issues

### "Command not found: openclawfice"

**Problem:** The CLI isn't in your PATH  
**Solution:**
```bash
# Add to ~/.zshrc or ~/.bashrc
export PATH="$HOME/openclawfice:$PATH"
source ~/.zshrc  # or source ~/.bashrc
```

### "Port 3333 already in use"

**Problem:** Another process is using port 3333  
**Solution:**
```bash
# Option 1: Kill the process
lsof -ti :3333 | xargs kill -9

# Option 2: Use a different port
cd ~/openclawfice
npm run dev -- -p 3334
# Then open http://localhost:3334
```

### Installation script fails

**Problem:** Network issues or permission problems  
**Solution:**
```bash
# Manual install instead
git clone https://github.com/openclawfice/openclawfice.git ~/openclawfice
cd ~/openclawfice
npm install
npm run dev
```

---

## No Agents Showing

### "0 agents" despite OpenClaw running

**Problem:** OpenClawfice can't find `~/.openclaw/openclaw.json`  
**Solution:**
```bash
# Check if file exists
ls -la ~/.openclaw/openclaw.json

# Verify it has agents configured
cat ~/.openclaw/openclaw.json | jq '.agents'

# If missing, ensure OpenClaw is properly installed
which openclaw
openclaw status
```

### Agents appear but show no status

**Problem:** No active sessions or agents haven't been used recently  
**Solution:**
1. Send a message to any agent in OpenClaw
2. Wait 5 seconds for status to update
3. Refresh OpenClawfice

### Agent status stuck on "idle" but should be working

**Problem:** Session file hasn't been updated, or agent finished work  
**Solution:**
- Check `~/.openclaw/data/sessions/agent-{name}-main/sessions.json`
- Look for recent `toolCall` timestamps
- Agent is only "working" when actively using tools

---

## Build/Development Issues

### "Module not found" errors during build

**Problem:** Stale Next.js cache  
**Solution:**
```bash
cd ~/openclawfice
rm -rf .next
npm run build
```

### TypeScript errors

**Problem:** Outdated dependencies or type mismatches  
**Solution:**
```bash
npm install --legacy-peer-deps
npx tsc --noEmit  # Check for actual errors
```

### Page won't load / blank screen

**Problem:** JavaScript error in browser  
**Solution:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Common fix: Clear browser cache and hard reload (Cmd/Ctrl + Shift + R)

---

## Demo Mode Issues

### Demo mode shows 0 agents

**Problem:** Demo data not loading  
**Solution:**
```bash
# Verify demo API works
curl http://localhost:3333/api/demo

# Should return 5 agents
# If not, restart dev server
cd ~/openclawfice
npm run dev
```

### Demo chat not updating

**Problem:** Demo chat updates every 8-15 seconds - just wait!  
**Expected Behavior:** 
- New messages appear gradually
- This is intentional to show "live" simulation
- Not a bug!

---

## Cooldown/Cron Issues

### "Cooldown timers not showing"

**Problem:** No cron jobs configured for agents  
**Solution:**
1. Check `~/.openclaw/data/cron/jobs.json`
2. Agents need scheduled jobs with `every` intervals
3. Example: Heartbeat jobs with 30-minute intervals

### "Can't update cooldown intervals"

**Problem:** Gateway connection issue  
**Solution:**
```bash
# Check OpenClaw gateway is running
openclaw status

# Restart gateway if needed
openclaw gateway restart
```

---

## Performance Issues

### "Page loads slowly"

**Problem:** Too many agents or large session files  
**Solution:**
- Normal with 10+ agents
- Limit to 5-8 agents for best performance
- Consider archiving old accomplishments

### "High CPU usage"

**Problem:** Polling too frequently  
**Workaround:**
```javascript
// In app/page.tsx, increase poll intervals:
// Change from 5000 to 10000 (10 seconds)
const i = setInterval(fetchStatus, 10000);
```

---

## Feature-Specific Issues

### Quest Templates won't add

**Problem:** Network error or agent unavailable  
**Solution:**
1. Check browser console for errors
2. Verify agent exists and is reachable
3. Try a different template

### Screenshots not saving

**Problem:** Permission issues with file system  
**Solution:**
```bash
# Verify public directory is writable
ls -la ~/openclawfice/public
chmod 755 ~/openclawfice/public
```

### Meeting Room doesn't appear

**Problem:** No active meeting  
**Expected:** Meeting Room only appears when `meeting.active = true`  
**To Trigger:** Click "Call Meeting" button and start a discussion

### XP Celebrations not showing

**Problem:** Accomplishments not being logged via API  
**Solution:**
- Use the accomplishment API (see README)
- Manual edits to files won't trigger celebrations
- Need to POST to `/api/office/actions`

---

## Config Issues

### Custom config not loading

**Problem:** Wrong file location or invalid JSON  
**Solution:**
```bash
# Check file exists at repo root
ls -la ~/openclawfice/openclawfice.config.json

# Validate JSON syntax
cat ~/openclawfice/openclawfice.config.json | jq .

# If invalid, fix JSON or delete to use defaults
```

### Water cooler style not changing

**Problem:** Config property mismatch  
**Solution:**
```json
{
  "watercooler": {
    "style": "casual"  // must be: casual, professional, or minimal
  }
}
```

---

## Production Deployment

### Vercel/Netlify build fails

**Problem:** Missing environment variables or build config  
**Solution:**
```bash
# For Vercel
# Add to vercel.json:
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev -- -p $PORT",
  "framework": "nextjs"
}

# For environment variables
# Add to project settings (not in code):
# NEXT_PUBLIC_DEMO_MODE=true (if deploying demo)
```

### Production build succeeds but runtime errors

**Problem:** Server-side vs client-side code mismatch  
**Common Cause:** Using Node.js APIs in client components  
**Solution:**
- Wrap server-only code with `if (typeof window === 'undefined')`
- Use API routes for file system access
- Check build logs for hydration warnings

---

## Getting Help

### Still stuck?

1. **Check logs:**
   ```bash
   # Browser console (F12)
   # Server logs in terminal
   ```

2. **Search issues:**
   - GitHub: https://github.com/openclawfice/openclawfice/issues
   - Discord: https://discord.gg/clawd

3. **File a bug:**
   - Include: OS, Node version, error messages, steps to reproduce
   - Run: `node --version && npm --version && cat ~/.openclaw/openclaw.json | jq .agents`
   - Screenshots help!

4. **Ask in Discord:**
   - #openclawfice channel
   - Fastest community help

---

## Debug Checklist

When things go wrong, check these in order:

- [ ] Is OpenClaw installed and running? (`openclaw status`)
- [ ] Does `~/.openclaw/openclaw.json` exist and have agents?
- [ ] Is port 3333 available? (`lsof -ti :3333`)
- [ ] Is the dev server actually running? (check terminal)
- [ ] Did you restart the server after config changes?
- [ ] Are there errors in browser console? (F12)
- [ ] Did you clear Next.js cache? (`rm -rf .next`)
- [ ] Is your Node.js version 18+? (`node --version`)
- [ ] Did you run `npm install` after updating?
- [ ] Are file permissions correct? (`ls -la ~/openclawfice`)

---

## Quick Fixes

**99% of issues are solved by:**

```bash
# The nuclear option (fixes almost everything)
cd ~/openclawfice
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

**If that doesn't work:**
```bash
# Start fresh (only if desperate)
cd ~
rm -rf openclawfice
curl -fsSL https://openclawfice.com/install.sh | bash
```

---

## Known Limitations

**Not bugs, just current constraints:**

- ✋ Only works with local OpenClaw install (not remote)
- ✋ No multi-user support yet (single dashboard per machine)
- ✋ No agent authentication (assumes trusted local network)
- ✋ Meeting Room requires manual API call (no automatic detection yet)
- ✋ Accomplishments need API calls (manual file edits don't trigger celebrations)
- ✋ Demo mode is read-only (all writes are no-ops)

---

## Performance Tips

**Keep OpenClawfice fast:**

1. **Limit agent count:** 5-8 is optimal, 10+ starts to lag
2. **Archive old accomplishments:** Keep recent 50-100 max
3. **Increase poll intervals:** Edit `setInterval` values in page.tsx
4. **Close unused rooms:** Meeting Room only when needed
5. **Use production build:** `npm run build && npm start` (faster than dev)

---

## Emergency Reset

**Nuclear option - use only when nothing else works:**

```bash
# Backup first (optional)
cp -r ~/openclawfice ~/openclawfice.backup

# Complete reset
cd ~
rm -rf openclawfice
rm -rf ~/.openclaw  # ⚠️ WARNING: Deletes all OpenClaw data!

# Reinstall OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# Reinstall OpenClawfice
curl -fsSL https://openclawfice.com/install.sh | bash
```

---

**Remember:** 99% of issues are solved by restarting the dev server or clearing the `.next` cache. Start simple!

Need more help? Join the Discord: https://discord.gg/clawd

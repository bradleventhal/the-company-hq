# Top 3 Install Blockers (Fresh User Testing)

Based on code review and simulated fresh install flow. These would kill conversions instantly.

## 🔴 BLOCKER #1: No OpenClaw Detection
**Impact:** CRITICAL - Hard blocker  
**Where:** Empty state when `~/.openclaw/openclaw.json` doesn't exist  
**Current behavior:** Shows generic "office is empty" message with vague "Make sure OpenClaw is running"  
**Problem:** User doesn't know if:
- OpenClaw isn't installed
- OpenClaw is installed but not running
- OpenClaw is running but has no agents
- They need to restart something

**Fix needed:**
```typescript
// In app/api/office/route.ts
function checkOpenClawInstalled() {
  const openclawBin = join(homedir(), '.local', 'node', 'bin', 'openclaw');
  if (!existsSync(openclawBin)) {
    return { installed: false, message: 'OpenClaw not found' };
  }
  if (!existsSync(OPENCLAW_CONFIG)) {
    return { installed: true, configured: false, message: 'No agents configured' };
  }
  return { installed: true, configured: true };
}
```

**UI update:**
- Show specific error: "OpenClaw not installed"
- Give one-click copy of install command
- Link directly to https://openclaw.ai/install
- Don't make them guess

**Priority:** P0 - Must fix before any traffic push

---

## 🟡 BLOCKER #2: Port 3333 Conflict
**Impact:** HIGH - Confusing error  
**Where:** `npm run dev` when port is already in use  
**Current behavior:** Next.js throws cryptic error, user thinks install is broken  
**Problem:** 
- Port conflicts are common (other dev servers, previous instances)
- Error message doesn't explain what to do
- No fallback or auto-port-select

**Fix needed:**
Add to package.json or create a wrapper script:
```bash
# Try 3333, if busy try 3334, 3335, etc
PORT=$(npx get-port-cli 3333)
next dev --port $PORT
```

Or better: Document it clearly
```bash
# If port 3333 is in use:
npm run dev -- --port 3334
```

**UI update:**
- Show current port in header: "Office running on :3333"
- Make it obvious it's configurable
- Add FAQ: "Port already in use?"

**Priority:** P1 - Common issue, needs clear guidance

---

## 🟡 BLOCKER #3: No Progress Feedback During Install
**Impact:** MEDIUM - Causes abandonment  
**Where:** `npm install` takes 30-60s with no visual feedback  
**Current behavior:** Terminal sits silent, user thinks it's frozen  
**Problem:**
- npm install can take 60+ seconds
- No indication it's working
- User abandons thinking it's broken

**Fix needed:**
Add to INSTALL.md:
```markdown
### Step 2: Install dependencies
```bash
npm install
```

**This takes 30-60 seconds.** You'll see:
- Downloading packages...
- Building dependencies...
- ✓ Done!

**Don't close the terminal** - it's working even when it looks stuck.
```

Better: Add a postinstall script that shows success
```json
// package.json
{
  "scripts": {
    "postinstall": "node -e \"console.log('\\n✅ OpenClawfice installed!\\n🚀 Run: npm run dev\\n')\""
  }
}
```

**Priority:** P1 - Quick win, reduces confusion

---

## Additional Findings

### Soft Issues (don't block but reduce engagement)
1. **Generic agent names** - When no IDENTITY.md, shows "agent:main" instead of friendly name
2. **Unclear next steps** - After install, no obvious "what to do next"
3. **No validation command** - Can't check if setup is correct

### Quick Wins
1. Add `npm run check` command that validates:
   - OpenClaw installed
   - Agents configured
   - Port available
   - Can connect to gateway

2. Improve empty state to be more diagnostic:
   ```
   🏢 Office Empty
   
   Checking your setup...
   ✅ OpenClawfice installed
   ✅ Running on port 3333
   ❌ OpenClaw not detected
   
   → Install OpenClaw: https://openclaw.ai/install
   ```

3. Add onboarding checklist after first successful load

---

## Action Items for Forge

### Must Do (P0)
- [ ] Add OpenClaw detection to API
- [ ] Show specific error messages in empty state
- [ ] Test with `rm -rf ~/.openclaw` and document friction

### Should Do (P1)  
- [ ] Handle port conflicts gracefully
- [ ] Add postinstall success message
- [ ] Create `npm run check` validation command

### Nice to Have (P2)
- [ ] Improve default agent names when no IDENTITY.md
- [ ] Add onboarding checklist on first run
- [ ] Create troubleshooting flowchart

---

## Testing Checklist

To validate fixes:
- [ ] Delete `~/.openclaw` and run install
- [ ] Start on port 3333, then try to start again
- [ ] Install on machine without OpenClaw
- [ ] Install with 0 agents configured
- [ ] Install with agents but no IDENTITY.md files
- [ ] Time the install from clone to working dashboard

Target: < 3 minutes from git clone to seeing first agent

---

## Next Steps

1. Create GitHub issues for P0 items
2. Forge fixes top 3 before traffic push
3. Re-test on fresh VM to validate
4. Update INSTALL.md with learnings

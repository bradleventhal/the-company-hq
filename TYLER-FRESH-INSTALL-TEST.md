# Tyler: Fresh Install Test - ONE PAGE BRIEF

**Time Required:** 30 minutes  
**What This Unblocks:** Scout's 10 YouTube creators + launch  
**Priority:** P0 - Everything downstream waits on this

---

## Why This Matters

**Scout is holding:**
- 10 qualified YouTube targets
- 5 complete email sequences
- All creator outreach

**She can't send until:** Fresh install works end-to-end

**The blocker:** We've never tested OpenClawfice on a truly fresh machine

---

## What You Need

**Option 1: Cloud VM (Recommended - 5 min setup)**
```bash
# DigitalOcean, AWS, or any Ubuntu 22.04 VM
# $5/month droplet, delete after testing
```

**Option 2: Local VM**
```bash
# VirtualBox + Ubuntu 22.04 ISO
# Or Parallels on Mac
```

**Option 3: Friend's Mac/Linux**
```bash
# Borrow a clean machine for 30 minutes
# Must have never installed OpenClaw or OpenClawfice
```

---

## The Test (Copy-Paste Each Step)

### Step 1: Validate Prerequisites (2 min)
```bash
cd ~
git clone https://github.com/openclawfice/openclawfice.git
cd openclawfice
./scripts/validate-fresh-install.sh
```

**Expected:** All 10 tests pass ✅  
**If fails:** Note which test failed and error message

### Step 2: Install Dependencies (1 min)
```bash
npm install
```

**Expected:** 
- Progress bar shows downloads
- Final line: "added XXX packages in YYs"
- Success message: "✅ OpenClawfice ready to run!"

**Watch for:**
- EACCES permission errors
- Network timeouts
- Missing dependencies

### Step 3: Start Server (30 sec)
```bash
npm run dev
```

**Expected:**
```
✓ Compiled in 1.2s
✓ Ready in 2.1s
○ Local:   http://localhost:3333
```

**If EADDRINUSE:** Port already in use (shouldn't happen on fresh VM)

### Step 4: Test Empty State (1 min)

Open: http://localhost:3333

**Expected (No OpenClaw installed):**
- Loading screen shows (green terminal for 1-2s)
- Then: Empty state with "OpenClaw not installed" diagnostic
- Terminal-style message explaining next steps
- Copyable install command
- Link to openclaw.ai/install

**Take screenshot of this screen**

### Step 5: Install OpenClaw (2 min)
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Expected:** Install completes successfully

**Reload:** http://localhost:3333

**Expected (No agents configured):**
- Different empty state: "No agents configured"
- Helpful message about creating agents
- Example config snippet

**Take screenshot of this screen**

### Step 6: Configure Test Agent (1 min)
```bash
mkdir -p ~/.openclaw
cat > ~/.openclaw/openclaw.json << 'EOF'
{
  "agents": {
    "list": [
      {
        "id": "test",
        "name": "Test Agent",
        "role": "Tester",
        "emoji": "🤖",
        "color": "#8b5cf6"
      }
    ]
  }
}
EOF
```

**Reload:** http://localhost:3333

**Expected:**
- Agent appears as pixel art NPC
- Shows in Work Room or Lounge
- Plumbob above agent
- Name "Test Agent" visible
- Status shows as "idle"

**Take screenshot of office with agent**

### Step 7: Test Demo Mode (30 sec)

Open: http://localhost:3333/?demo=true

**Expected:**
- 5 demo agents appear (Nova, Forge, Lens, Pixel, Cipher)
- Quest log shows demo quests
- Accomplishments panel populated
- Water cooler has chat messages
- Demo banner at top

**Take screenshot of demo mode**

---

## What To Report Back

### If Everything Worked ✅

Message me:
```
Fresh install PASSED:
- Validator: ✅ All 10 tests
- npm install: ✅ No errors
- Server start: ✅ Port 3333
- Empty state (no OpenClaw): ✅ Clear diagnostic
- Empty state (no agents): ✅ Helpful message
- Agent appears: ✅ Renders correctly
- Demo mode: ✅ 5 agents show

Screenshots attached.
Ready for Scout to validate with real creator.
```

### If Something Broke ❌

**For EACH issue, report:**

1. **Which step failed:** (Step 1, 2, 3, etc.)
2. **Exact error message:** (copy-paste full text)
3. **What you saw:** (vs what was expected)
4. **Screenshot:** (if visual issue)

**Example:**
```
Step 2 FAILED: npm install

Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'

Expected: Should install to local directory
Actual: Tried to write to global directory

Screenshot: [attach]
```

---

## Common Issues (If You Hit Them)

### "EACCES permission denied"
```bash
# Fix npm permissions
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
# Retry npm install
```

### "Port 3333 already in use"
```bash
# Use different port
npm run dev -- --port 3334
# Open http://localhost:3334 instead
```

### "Node version too old"
```bash
# Need Node 18+
node -v  # Check current version
# Install newer version from https://nodejs.org
```

---

## Time Breakdown

- Spin up VM: 5 min
- Run validator: 2 min
- npm install: 1 min
- Test empty states: 2 min
- Install OpenClaw: 2 min
- Configure agent: 1 min
- Test demo mode: 30 sec
- Take screenshots: 2 min
- Report results: 5 min

**Total: ~20 minutes** (faster if no issues)

---

## What Happens After

### If All Green ✅

1. Scout validates with one real YouTube creator
2. If creator install succeeds → Scout sends mass outreach to 9 others
3. Launch moves forward
4. I fix any issues creator finds

### If Issues Found ❌

1. You send me exact error details
2. I fix the top 3 blockers
3. You re-test (5 min)
4. Repeat until clean
5. Then Scout validates

---

## Why 30 Minutes Matters

**Blocked right now:**
- Scout's 10 YouTube targets ($X,XXX value)
- 5 email sequences (weeks of work)
- Twitter launch
- Creator credibility

**Unblocked after this test:**
- Scout runs pilot with 1 creator
- If successful → 9 more outreach emails
- Launch materials go live
- Conversion funnel proven

**This 30-minute test is the critical path.**

---

## Questions?

**"Can I test on my main machine?"**  
No - needs truly fresh install. You already have OpenClaw/OpenClawfice configured.

**"What if I don't have time for VM setup?"**  
Borrow a friend's clean Mac/Linux for 30 min.

**"What if the validator fails?"**  
Perfect! That's a blocker we need to fix. Report the failure.

**"Do I need to test Windows?"**  
No - focus on Mac/Linux. Windows is separate validation.

---

## Ready To Start?

1. **Spin up clean VM** (Ubuntu 22.04 or Mac)
2. **Clone repo + run steps above**
3. **Report results** (screenshots + any errors)
4. **That's it**

This unblocks Scout's entire creator pipeline.

---

**Last updated:** 2026-02-27 by Forge  
**Status:** Ready for Tyler to run  
**Blocks:** Scout's 10 YouTube targets + launch

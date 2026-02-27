# Pre-Launch Checklist

**Use this before Tyler tweets to catch broken onboarding.**

Validation kills wasted launch momentum. Test on clean machine → fix blockers → then green-light Twitter push.

---

## ✅ Fresh Install Test (Required)

### Step 1: Clean Machine Setup
```bash
# Spin up fresh Ubuntu/Mac VM or use fresh user account
# Should have: Node.js installed, nothing else
```

### Step 2: Follow Install Instructions Exactly
```bash
# Copy-paste from openclawfice.com/install
# Don't deviate - test what real users will do
git clone https://github.com/openclawfice/openclawfice.git ~/openclawfice
cd ~/openclawfice
npm install
npm run dev
```

### What to Verify:
- [ ] Git clone completes without errors
- [ ] npm install completes (30-60s)
- [ ] Postinstall message shows success
- [ ] `npm run dev` starts server
- [ ] Server binds to port 3333
- [ ] Browser opens to localhost:3333
- [ ] Loading screen appears immediately
- [ ] Empty state shows after load

### Expected: OpenClaw Not Installed
- [ ] Empty state shows "OpenClaw not installed" diagnostic
- [ ] Install command is visible and copy-able
- [ ] Link to openclaw.ai/install works
- [ ] Error message is clear, not confusing
- [ ] Retro terminal theme renders correctly

### Step 3: Install OpenClaw
```bash
# Follow the link/command from empty state
curl -fsSL https://openclaw.ai/install.sh | bash
```

- [ ] OpenClaw installs successfully
- [ ] Refresh OpenClawfice (localhost:3333)
- [ ] Empty state now shows "No agents configured"
- [ ] Diagnostic message is different and helpful

### Step 4: Configure First Agent
```bash
# Create minimal openclaw.json
mkdir -p ~/.openclaw
cat > ~/.openclaw/openclaw.json << 'EOF'
{
  "agents": {
    "list": [
      {
        "id": "test",
        "name": "Test Agent",
        "role": "Test",
        "emoji": "🤖"
      }
    ]
  }
}
EOF
```

- [ ] Refresh OpenClawfice
- [ ] Agent appears in office
- [ ] Rooms render correctly
- [ ] NPC shows with correct emoji
- [ ] Plumbob appears above agent
- [ ] Status shows as idle
- [ ] No console errors

### Step 5: Test Core Features
- [ ] Click NPC - agent panel opens
- [ ] Quest log is empty (expected)
- [ ] Accomplishments panel is empty (expected)
- [ ] Water cooler shows "no recent chat"
- [ ] Refresh button works
- [ ] Settings button works
- [ ] Sound effects toggle works
- [ ] Music toggle works
- [ ] Konami code works (up up down down left right left right B A)

---

## ✅ Production Deployment Test

### Before Twitter Push:
- [ ] openclawfice.com loads
- [ ] Demo mode works (`/?demo=true`)
- [ ] Demo shows agents moving
- [ ] Demo shows water cooler chat
- [ ] Install link works
- [ ] GitHub link works
- [ ] Analytics tracking works (check Vercel)

### Install Page Verification:
- [ ] Install instructions are accurate
- [ ] Code blocks are copy-able
- [ ] Prerequisites section is clear
- [ ] Troubleshooting section covers common issues

---

## ✅ GitHub Repository Check

Before launch, verify:
- [ ] README.md is accurate
- [ ] Repository description is set
- [ ] Topics/tags are added
- [ ] Homepage URL points to openclawfice.com
- [ ] License file exists (AGPL-3.0)
- [ ] Screenshots in README are current

---

## ✅ Social Media Assets Ready

### Twitter:
- [ ] Launch tweet drafted
- [ ] Demo GIF/video ready
- [ ] Screenshot of retro UI ready
- [ ] Konami code Easter egg clip ready
- [ ] Hashtags selected (#OpenClaw #AIAgents)

### Landing Page:
- [ ] Hero section compelling
- [ ] Features section up to date
- [ ] Install CTA is prominent
- [ ] Demo CTA works

---

## ✅ Performance Check

### Load Testing:
- [ ] Page loads in < 3 seconds
- [ ] Loading screen shows immediately
- [ ] No white flash/FOUC
- [ ] Empty state renders in < 1 second after data loads
- [ ] With 5 agents, UI is still smooth
- [ ] Mobile responsive (test on phone)

### Console Check:
```bash
# Open browser console (F12)
# Should see NO errors
```
- [ ] No JavaScript errors
- [ ] No 404s for assets
- [ ] No CORS errors
- [ ] No authentication failures

---

## ✅ Common User Paths

### Path 1: Direct Install (Has OpenClaw)
1. Visit openclawfice.com
2. Click "Install"
3. Follow instructions
4. Success → See agents

**Test this path fully.**

### Path 2: New to OpenClaw
1. Visit openclawfice.com
2. Click "Install"
3. See empty state diagnostic
4. Install OpenClaw
5. Configure agents
6. Success → See agents

**Test this path fully.**

### Path 3: Demo First
1. Visit openclawfice.com/?demo=true
2. See demo
3. Click "Install OpenClawfice" (from demo CTA)
4. Follow instructions
5. Success → See their agents

**Test this path fully.**

---

## 🚨 Red Flags (Stop Launch If Any Occur)

### Hard Blockers:
- ❌ Fresh install completely fails
- ❌ Server won't start
- ❌ Empty state shows wrong/confusing error
- ❌ Production site is down
- ❌ Install instructions don't work
- ❌ Console shows critical errors

### Soft Blockers (Fix or Document):
- ⚠️  Slow load time (>5s)
- ⚠️  Mobile UI broken
- ⚠️  Missing features mentioned in tweet
- ⚠️  Port conflict not documented
- ⚠️  Demo mode has bugs

---

## ✅ Pre-Tweet Final Check

**Right before Tyler tweets:**

1. **Open openclawfice.com in incognito** - loads?
2. **Click demo** - works?
3. **Test install on fresh machine** - works?
4. **Check server logs** - no errors?
5. **Verify analytics** - tracking events?

If all YES → ✅ **Green light for Twitter push**

If any NO → 🔴 **Fix before tweeting**

---

## 📊 Success Metrics (Track After Launch)

### First Hour:
- Unique visitors
- Demo mode usage
- Install attempts
- Successful installs
- Error rate
- Bounce rate

### First Day:
- GitHub stars
- Twitter engagement
- Support questions
- Bug reports
- User feedback

### First Week:
- Active users
- Retention rate
- Word-of-mouth growth
- Feature requests

---

## 🛠️ Emergency Hotfix Process

**If something breaks after launch:**

1. **Identify the blocker** - what % of users hit it?
2. **Quick fix** - can we patch in < 30 min?
3. **If yes:** Fix → test → deploy → tweet update
4. **If no:** Add workaround to install docs, fix properly later

**Communication:**
- Update install page with workaround
- Pin tweet with fix instructions
- Reply to users hitting the issue
- Log in GitHub issues

---

## Summary

**This checklist catches 90% of launch-killing bugs.**

- ✅ Test fresh install on clean machine
- ✅ Verify all user paths work
- ✅ Check production deployment
- ✅ Confirm social assets ready
- ✅ Final pre-tweet check

**Only tweet when all boxes are checked.**

Catching broken onboarding before 1000 users hit it > explaining bugs after launch.

---

**Last updated:** 2026-02-27 by Forge  
**Next review:** Before every major announcement

# ✅ Post-Deploy Verification (30 seconds)

**Run this IMMEDIATELY after fixing Vercel deployment to confirm launch-readiness.**

---

## 🚀 Quick Verification (30 seconds)

### Step 1: Run Verification Script (10 seconds)
```bash
cd ~/clawd-openclawfice/openclawfice
bash scripts/verify-production-deploy.sh
```

**Expected:** All checks GREEN ✅

### Step 2: Visual Spot Check (10 seconds)
Open these URLs in browser:

1. **https://openclawfice.com** 
   - Look for: 🛡️ MALWARE FREE badge in header

2. **https://openclawfice.com/landing**
   - Look for: Big green "VERIFIED & MALWARE SCANNED" section

3. **https://openclawfice.com/demo**
   - Look for: Demo working, 5 agents visible

### Step 3: Screenshot Proof (10 seconds)
```bash
# Take screenshot of production security badges
node scripts/record-isolated.mjs post-deploy-proof 3 default
```

**Expected:** Video shows security badges on openclawfice.com

---

## 🔍 Detailed Verification (if quick check fails)

### Security Features
- [ ] Header badge: 🛡️ MALWARE FREE visible
- [ ] Header badge links to SECURITY.md
- [ ] Landing page: "VERIFIED & MALWARE SCANNED" section
- [ ] Landing page: 4 security cards (Anti-Malware, CodeQL, Dependabot, Zero CVEs)
- [ ] Landing page: Trust indicators (No Telemetry, No Tracking, 100% Local, Open Source)

### Critical Pages
- [ ] / (homepage) - 200 OK
- [ ] /landing - 200 OK
- [ ] /demo - 200 OK, shows 5 agents
- [ ] /install - 200 OK

### Assets
- [ ] /public/openclawfice-demo.gif exists
- [ ] /public/screenshot.png exists
- [ ] Favicon loads

### API Endpoints
- [ ] /api/office/route returns JSON
- [ ] /api/demo returns JSON (demo mode)

---

## ✅ Success Criteria

**ALL of these must be TRUE before launching:**

1. ✅ `verify-production-deploy.sh` shows all green
2. ✅ Security badge visible on openclawfice.com
3. ✅ Landing page security section visible
4. ✅ Demo mode works
5. ✅ Screenshot captured showing badges

**If ANY fail:** Vercel deploy didn't work, re-run the fix.

---

## 🚨 What If Checks Fail?

### Badge still missing after deploy
```bash
# Check Vercel deployment URL
curl -s https://openclawfice.com | grep -i "malware"

# If empty, deployment didn't complete
# → Go back to VERCEL-DEPLOY-FIX.md
# → Try Option 2 (redeploy from specific commit)
```

### Demo not working
```bash
# Check if API routes deployed
curl -s https://openclawfice.com/api/demo

# If 404, Next.js routes didn't build
# → Clear build cache more aggressively
# → Redeploy from clean state
```

### Old content still showing
```bash
# Vercel might be serving cached version
# Wait 2 minutes for CDN to invalidate
# Hard refresh: Cmd+Shift+R (Chrome)
# Try incognito mode
```

---

## 📸 Proof for Accomplishments

After verification passes, capture proof:

### Video (Best)
```bash
# Record openclawfice.com showing security badges
node scripts/record-isolated.mjs production-security-live 6 default

# Post accomplishment
curl -X POST http://localhost:3333/api/office/actions \
  -d '{
    "accomplishment": {
      "icon": "🚀",
      "title": "Verified production deployment - security badges live!",
      "detail": "Ran verify-production-deploy.sh - all 10 checks passed. Security badges visible on openclawfice.com. Ready to launch!",
      "who": "Tyler",
      "screenshot": "production-security-live.mp4"
    }
  }'
```

### Screenshot (Quick)
```bash
# Cmd+Shift+4, capture openclawfice.com header
# Shows: 🛡️ MALWARE FREE badge
```

---

## 🎯 Launch Checklist (After Verification Passes)

Once all checks GREEN:

- [ ] Production verified ✅
- [ ] Open LAUNCH-NOW-SIMPLE.md
- [ ] Copy Discord post (30s)
- [ ] Tweet with demo GIF (60s)
- [ ] **LAUNCHED!** 🚀

---

## 🛠️ Scripts Reference

**Verification script:**
```bash
~/clawd-openclawfice/openclawfice/scripts/verify-production-deploy.sh
```

**What it checks:**
1. Security badge in header
2. Security section on /landing
3. Anti-Malware card
4. CodeQL card
5. Dependabot card
6. Zero CVEs card
7. Demo GIF asset
8. Homepage (200 OK)
9. Landing page (200 OK)
10. Demo page (200 OK)
11. Install page (200 OK)

**Output:**
- Green ✅ = Feature live
- Red ❌ = Feature missing
- Summary: X passed, Y failed

---

## 📊 Expected Timeline

**After Vercel fix:**
- Deployment: ~2-5 minutes (Vercel auto-build)
- CDN propagation: ~1-2 minutes
- Verification script: ~10 seconds
- Visual spot check: ~10 seconds
- Screenshot proof: ~10 seconds

**Total:** 5-10 minutes from fix → verified → ready to launch

---

## 💡 Pro Tips

### Run verification multiple times
- After Vercel shows "Deployment successful"
- Wait 1 minute for CDN
- Run script again
- If still failing, wait 1 more minute and retry

### Check Vercel logs
```bash
# If verification fails, check Vercel dashboard
# → Deployments → Latest → View logs
# → Look for build errors or failed routes
```

### Clear your browser cache
```bash
# Vercel deployed but you're seeing old version?
# Hard refresh: Cmd+Shift+R (Chrome)
# Or: Open incognito window
# Or: Clear cache in DevTools
```

### Use the verification dashboard
```bash
# Pixel built verify-deploy.html
# Open: https://openclawfice.com/verify-deploy.html
# Auto-refreshes every 30s
# Visual dashboard of all checks
```

---

## 🎉 Success Message

When all checks pass:

```
🎉 PRODUCTION VERIFIED - READY TO LAUNCH!

✅ All 10 checks passed
✅ Security badges live on openclawfice.com
✅ Landing page security section visible
✅ Demo mode working
✅ All critical pages loading

Next: Open LAUNCH-NOW-SIMPLE.md and launch!
```

---

**TL;DR:**

1. Fix Vercel (see VERCEL-DEPLOY-FIX.md)
2. Wait 2 minutes
3. Run `bash scripts/verify-production-deploy.sh`
4. If all green → **LAUNCH!**
5. If any red → Re-run Vercel fix

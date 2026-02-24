# Fix Vercel Auto-Deploy — 2-Minute Action Plan

**Problem:** Last deploy 16+ hours ago. 20+ commits stuck.  
**Cause:** Vercel webhook or auto-deploy disabled.  
**Fix:** 2 minutes. Do this NOW.

---

## Quick Fix (30 seconds)

### Option A: Manual Redeploy
1. Open https://vercel.com/dashboard
2. Click `openclawfice` project
3. Go to **Deployments** tab
4. Click **⋯** (three dots) on latest deployment
5. Click **Redeploy**
6. Wait 60 seconds

✅ **Result:** All 20+ commits deployed instantly

---

## Verify It Worked (30 seconds)

Open these URLs in browser:

1. **https://openclawfice.com** — Should show "OPENCLAWFICE" header
2. **https://openclawfice.com/?demo=true** — Should load 5 demo agents
3. **https://openclawfice.com/verify-deploy.html** — Should run 6 automated checks

**Expected:** All 3 load successfully

**Currently:** May show old build or 404s

---

## Why Auto-Deploy Broke (Diagnosis)

### Check #1: GitHub Integration
1. Vercel dashboard → `openclawfice` → **Settings** → **Git**
2. Verify: **GitHub** integration connected ✅
3. Verify: **Production Branch** = `main` ✅
4. Verify: **Deploy Hooks** enabled ✅

**If disconnected:**
- Click "Connect Git Repository"
- Select `openclaw/openclawfice`
- Authorize Vercel app

### Check #2: GitHub Webhooks
1. Go to https://github.com/openclaw/openclawfice/settings/hooks
2. Look for Vercel webhook
3. Click on it → **Recent Deliveries**

**Expected:** Recent push events with green checkmarks ✅  
**If red X:** Webhook failing — click "Redeliver" to test

**If no webhook exists:**
- Vercel integration is broken
- Re-add from Vercel dashboard (Settings → Git → Reconnect)

### Check #3: Branch Protection
1. GitHub → `openclawfice` → Settings → Branches
2. Check if `main` has protection rules

**Issue:** Some branch protection rules can block auto-deploys

**Fix:** If rules exist, verify "Allow Vercel" is in bypass list

### Check #4: Vercel Project Settings
1. Vercel → `openclawfice` → Settings → Git
2. **Ignored Build Step** — should be empty or `false`
3. **Auto Deploy** — should be enabled

**If disabled:**
- Enable it
- Push empty commit to test:
  ```bash
  git commit --allow-empty -m "test: Trigger deploy"
  git push origin main
  ```

### Check #5: Deploy Previews vs Production
1. Vercel → Settings → Git
2. Check **Production Branch** = `main` ✅

**Common mistake:** Production deploys tied to wrong branch

---

## Test Auto-Deploy After Fix

### Trigger Test Deploy
```bash
cd ~/clawd-openclawfice/openclawfice
git commit --allow-empty -m "test: Verify auto-deploy working"
git push origin main
```

### Watch Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click `openclawfice`
3. **Deployments** tab should show new build starting in 10-30 seconds

**If it appears:** ✅ Auto-deploy fixed!  
**If nothing happens after 60s:** Auto-deploy still broken, use manual redeploy

---

## What's Missing from Production Right Now

**Last 20+ commits not deployed:**

1. ❌ Real XP progression system (levels/skills from accomplishments)
2. ❌ Consolidated health check scripts (6 → 1)
3. ❌ New demo GIF (932KB, 9/10 quality, clean water cooler)
4. ❌ Deployment verification dashboard
5. ❌ Troubleshooting flowchart
6. ❌ Post-deploy workflow docs
7. ❌ Fixed README links (no more broken root paths)
8. ❌ Removed "MALWARE FREE" badge from nav
9. ❌ Vercel auto-deploy troubleshooting guides
10. ❌ Accomplishment proof standards
11. ❌ Security video validation
12. ❌ Pre-tweet checklist
13. ❌ Final launch status report
14. ❌ And 7+ more improvements

**Impact:** Users see old version (16+ hours stale)

---

## After Manual Redeploy

### Verify These URLs
1. https://openclawfice.com — Main app loads ✅
2. https://openclawfice.com/?demo=true — Demo mode works ✅
3. https://openclawfice.com/verify-deploy.html — 6/6 checks pass ✅

### Then Run Consolidated Check Script
```bash
cd ~/clawd-openclawfice/openclawfice
bash scripts/check.sh all
```

**Expected:** 8/8 checks green ✅

---

## Quick Commands Reference

### Check what's deployed
```bash
curl -s https://openclawfice.com | grep -o "OPENCLAWFICE" | head -1
# Should return: OPENCLAWFICE
# Currently: might 404 or return old content
```

### Check latest Git commit
```bash
cd ~/clawd-openclawfice/openclawfice
git log origin/main --oneline -1
# Shows: latest commit (should match Vercel after deploy)
```

### Manual redeploy via CLI
```bash
npm i -g vercel
vercel login
cd ~/clawd-openclawfice/openclawfice
vercel --prod
```

---

## Timeline

| Time | Event |
|------|-------|
| Feb 23, ~6pm | Last successful Vercel deploy |
| Feb 24, 12am-10am | 20+ commits pushed to GitHub |
| Feb 24, 10:30am | Tyler notices 16hr gap |
| **NOW** | **Manual redeploy needed** |

**Total stuck commits:** 20+  
**Total LOC stuck:** ~2,000 lines  
**Total features stuck:** 10+ major improvements

---

## Bottom Line

**Do this right now:**
1. Vercel dashboard → Deployments → Redeploy (30 seconds)
2. Wait 60 seconds for build
3. Verify at openclawfice.com/verify-deploy.html
4. If 6/6 checks pass → LAUNCH ✅

**Then investigate** why auto-deploy stopped (GitHub webhook issue most likely)

---

## Visual Checklist

```
☐ Open Vercel dashboard
☐ Find openclawfice project
☐ Go to Deployments tab
☐ Click Redeploy on latest
☐ Wait 60 seconds
☐ Open openclawfice.com in browser
☐ Confirm main app loads
☐ Open openclawfice.com/?demo=true
☐ Confirm 5 agents visible
☐ Open openclawfice.com/verify-deploy.html
☐ Confirm 6/6 checks green
☐ Run bash scripts/check.sh all
☐ Confirm 8/8 local+prod checks pass
☐ READY TO LAUNCH 🚀
```

---

**Created:** Feb 24, 2026, 10:30 EST  
**Priority:** CRITICAL (blocks launch)  
**Time to fix:** 2 minutes  
**Impact:** Unblocks 20+ commits worth of improvements

**Action required:** Manual redeploy → takes 30 seconds → everything live

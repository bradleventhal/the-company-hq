# Launch Day Checklist

**Final verification before launching OpenClawfice.**

Use this checklist to make sure everything is ready. Takes 5 minutes.

---

## ✅ Pre-Launch Verification (Do This First)

### 1. Product Works

- [ ] **Open demo mode:** http://localhost:3333/?demo=true
  - Agents moving between rooms? ✓
  - Chat messages appearing? ✓
  - XP celebrations showing? ✓
  - No console errors? ✓

- [ ] **Open real mode:** http://localhost:3333
  - Your agents visible? ✓
  - Can click agent → send DM? ✓
  - Quest log functional? ✓
  - Accomplishments displaying? ✓

- [ ] **Keyboard shortcuts work:**
  - Press `?` → help modal opens? ✓
  - Press `M` → sounds mute/unmute? ✓
  - Press `Esc` → modals close? ✓

**If any ✗ → Fix before launching**

---

### 2. Build is Clean

```bash
cd ~/clawd-openclawfice/openclawfice
npm run build
```

- [ ] Build completes without errors? ✓
- [ ] No TypeScript errors? ✓
- [ ] All routes compile? ✓

**If build fails → Don't launch yet**

---

### 3. Documentation Links Work

Open these in browser (Cmd+Click):

- [ ] https://github.com/openclawfice/openclawfice (repo exists)
- [ ] README.md renders correctly on GitHub
- [ ] Demo GIF displays in README

**If 404s → Fix URLs first**

---

### 4. Social Assets Ready

- [ ] **Demo GIF exists:** `public/openclawfice-demo.gif`
  - File size <500KB? ✓
  - Shows agents moving? ✓
  - Auto-plays on Twitter? ✓

- [ ] **Screenshots ready** (optional but recommended):
  - Full office view
  - XP celebration
  - Quest log

**Missing GIF? See:** `PIXEL-START-RECORDING-NOW.md`

---

## 🚀 Launch Steps (15 Minutes)

### Step 1: Git Push (2 min)

```bash
cd ~/clawd-openclawfice/openclawfice
git add .
git commit -m "Launch v0.1.0 - OpenClawfice is live"
git push origin main
```

- [ ] Pushed to GitHub? ✓
- [ ] GitHub Actions passing? (check Actions tab)

---

### Step 2: Discord Post (3 min)

**Open:** OpenClaw Discord #announcements

**Copy/paste from:** `LAUNCH-NOW.txt` (Discord section)

- [ ] Post includes demo link
- [ ] Post includes install command
- [ ] Post sent? ✓

**Expected:** 10-20 replies in first hour

---

### Step 3: Twitter Post (3 min)

**Open:** Twitter

**Attach:** `public/openclawfice-demo.gif`

**Copy/paste from:** `LAUNCH-NOW.txt` (Twitter section) OR `SOCIAL-MEDIA-TEMPLATES.md` (pick your favorite version)

- [ ] GIF attached? ✓
- [ ] Hashtags included? (#OpenClaw #AIAgents #OpenSource)
- [ ] Tweet sent? ✓

**Expected:** 50-100 impressions in first hour

---

### Step 4: Reddit Post (5 min)

**Subreddits:** r/OpenSource, r/SideProject

**Copy/paste from:** `SOCIAL-MEDIA-TEMPLATES.md` (Reddit section)

- [ ] Title is descriptive
- [ ] Body explains value prop
- [ ] GitHub link included
- [ ] Posted? ✓

**Expected:** 20-50 upvotes in first 24 hours

---

### Step 5: Engage (2 min)

Set timer for 2 hours. Come back and:

- [ ] Reply to every Discord comment
- [ ] Reply to every Twitter reply
- [ ] Answer Reddit questions

**This is critical.** Early engagement = momentum.

---

## 📊 First Hour Metrics (What to Expect)

**Realistic goals:**

| Metric | Hour 1 | Hour 6 | Day 1 |
|--------|--------|--------|-------|
| GitHub stars | 5-10 | 20-30 | 50-100 |
| Discord replies | 10-20 | 30-50 | 100+ |
| Twitter impressions | 50-100 | 500-1K | 2K-5K |
| Reddit upvotes | 5-10 | 20-40 | 50-150 |

**If lower:** Don't panic. Takes 2-3 days to gain traction.

**If higher:** Congrats! You nailed the timing/messaging.

---

## 🚨 Common Launch Day Issues

### "GitHub Actions failing"

**Cause:** Build errors, missing secrets

**Fix:** Check `.github/workflows/` config. Disable Actions temporarily if blocking.

---

### "Demo link is 404"

**Cause:** Domain not set up or wrong URL

**Fix:** Use GitHub Pages URL or localhost in posts. Update after domain configured.

---

### "No one is engaging"

**Cause:** Wrong timing, unclear value prop, or need more distribution

**Fix:**
1. Wait 2-3 hours (people are busy)
2. Cross-post to more subreddits (r/programming, r/selfhosted)
3. Share in relevant Discord servers (AI communities)
4. DM friends who might be interested

---

### "Negative feedback"

**Cause:** Someone doesn't get it or has valid criticism

**Fix:**
- Thank them for feedback (always)
- If valid → acknowledge and note for v0.2
- If misunderstanding → clarify politely
- If troll → ignore

**Don't:** Get defensive or argue

---

### "Server crash / high load"

**Cause:** Unexpected traffic (good problem!)

**Fix:**
- Check logs: `npm run dev` terminal
- Restart if needed: Ctrl+C then `npm run dev`
- If demo mode overwhelmed → temporarily disable
- Post update: "High traffic! Working on it. Thanks for interest!"

---

## 📅 Post-Launch Schedule

### Hour 2-6:
- [ ] Reply to all comments/questions
- [ ] Fix any critical bugs reported
- [ ] Track metrics (stars, replies, upvotes)

### Day 2:
- [ ] Post feature highlight (pick from `SOCIAL-MEDIA-TEMPLATES.md`)
- [ ] Engage with anyone who tried it
- [ ] Start tips & tricks thread

### Day 3-7:
- [ ] Follow content calendar (`SOCIAL-MEDIA-TEMPLATES.md`)
- [ ] Ship quick wins based on feedback
- [ ] Write week 1 update

**Full playbook:** `SOCIAL-MEDIA-TEMPLATES.md`

---

## 🎯 Success Criteria (Week 1)

**You'll know launch was successful if:**

✅ 50+ GitHub stars
✅ 10+ people tried it (based on Discord/Twitter replies)
✅ 3+ feature requests or bug reports (shows engagement)
✅ 1-2 contributors interested
✅ Positive sentiment overall

**If you hit these → Great launch!**

**If not → Iterate on messaging, find new distribution channels**

---

## 🛑 Red Flags (Stop and Fix)

### Critical (stop launch):
- ❌ Build is broken
- ❌ Demo mode crashes
- ❌ Major security vulnerability
- ❌ GitHub repo is private

### Important (fix ASAP but can launch):
- ⚠️ Missing demo GIF
- ⚠️ Typos in README
- ⚠️ Some links are broken

### Nice-to-have (fix when possible):
- 💡 More screenshots
- 💡 Video tutorial
- 💡 Better branding

---

## ✅ Final Go/No-Go Decision

**Answer these honestly:**

1. Does the product work? (Y/N)
2. Is the build clean? (Y/N)
3. Is documentation accurate? (Y/N)
4. Do you have 30 min to engage post-launch? (Y/N)
5. Are you mentally ready for feedback (good and bad)? (Y/N)

**5/5 Yes → LAUNCH NOW**

**Any No → Fix first, then launch**

---

## 🚀 Launch Command (When Ready)

```bash
# You are GO for launch. Execute:

cd ~/clawd-openclawfice/openclawfice
git add . && git commit -m "Launch v0.1.0" && git push origin main

# Then open LAUNCH-NOW.txt and follow Steps 1-2
```

**Good luck! 🎉**

---

## 📞 Emergency Contacts

**Critical bug discovered?**
1. Post in Discord: "Found a bug, working on fix"
2. Fix quickly
3. Push update
4. Post: "Bug fixed, please pull latest"

**Overwhelmed with replies?**
- Prioritize: Critical bugs > Feature requests > General questions
- It's okay to say "I'll get back to you tomorrow"
- Don't burn out on Day 1

**Need help?**
- Ask in Discord #dev channel
- DM team members (we're here to support!)

---

**Remember:** Launching is just the beginning. Version 0.1.0 doesn't have to be perfect. Ship it, learn, iterate.

**Now go launch! ⏱️**

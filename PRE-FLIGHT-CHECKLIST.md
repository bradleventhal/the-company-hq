# ✈️ Pre-Flight Checklist - Final Verification Before Launch

**Run this 2-minute checklist RIGHT BEFORE posting to Discord/Twitter.**

This catches any last-minute issues that could embarrass you during launch.

---

## ✅ 1. Demo Mode Works (30 seconds)

### Test the Live Demo
```bash
open "https://openclawfice.com/?demo=true"
```

**Verify you see:**
- [ ] Page loads within 3 seconds
- [ ] 5 agents visible (Nova, Forge, Pixel, Cipher, Lens)
- [ ] At least 2-3 agents showing "working" status
- [ ] Quest log shows 1+ items
- [ ] Accomplishments feed has items
- [ ] Water cooler chat has messages
- [ ] Meeting room shows (if 2 agents are meeting)
- [ ] Demo banner at top says "You're viewing a demo"

**If ANY of these fail:**
- Check Vercel deployment status
- Check browser console for errors (Cmd+Opt+J)
- Don't launch until fixed

---

## ✅ 2. GitHub Repo is Public & Polished (20 seconds)

### Check GitHub Page
```bash
open "https://github.com/openclawfice/openclawfice"
```

**Verify:**
- [ ] Repo is PUBLIC (not private)
- [ ] README shows screenshot
- [ ] "Try the Demo" link works (goes to live site)
- [ ] Description set: "A charming retro office dashboard for OpenClaw agents"
- [ ] Topics/tags added: `openclaw`, `ai-agents`, `pixel-art`, `dashboard`
- [ ] LICENSE file exists (MIT)
- [ ] No embarrassing commit messages visible

**If issues:**
- Make repo public: Settings → Change visibility
- Add description/topics: Settings → About section
- Screenshot broken? Check `public/screenshot.png` exists

---

## ✅ 3. NPM Package Works (20 seconds)

### Test Install Command
```bash
# This is what users will run - make sure it works!
npx openclawfice --help
```

**Should see:**
- [ ] Help text appears
- [ ] No errors about "package not found"
- [ ] Version number shown

**If broken:**
- Check npm package published: `npm view openclawfice`
- Republish if needed: `npm publish`

---

## ✅ 4. Copy is Ready (10 seconds)

### Discord Post
```bash
# Open your launch copy
cat VIRAL-LAUNCH-COPY.md | grep -A20 "Discord Version 1"
```

**Verify:**
- [ ] Demo URL is `https://openclawfice.com/?demo=true` (NOT localhost)
- [ ] GitHub URL is correct
- [ ] Install command is `npx openclawfice`
- [ ] No typos, broken formatting, or placeholder text

### Twitter Post
```bash
cat VIRAL-LAUNCH-COPY.md | grep -A25 "Twitter Version 1"
```

**Verify:**
- [ ] Demo URL is live site (not localhost)
- [ ] GitHub URL is correct
- [ ] No typos
- [ ] Screenshot or GIF ready to attach

---

## ✅ 5. Critical Pages Load (20 seconds)

### Test Key URLs
```bash
# Home page
curl -sI https://openclawfice.com | grep "200"

# Demo mode
curl -sI "https://openclawfice.com/?demo=true" | grep "200"

# GitHub repo
curl -sI https://github.com/openclawfice/openclawfice | grep "200"
```

**All should return 200 OK.**

**If any fail:**
- Vercel down? Check status.vercel.com
- GitHub down? Check githubstatus.com
- Wait for service to recover before launching

---

## ✅ 6. Response Templates Ready (10 seconds)

### Quick Check
```bash
ls -lh FIRST-24-HOURS-PLAYBOOK.md
```

**Should exist and be ~10KB.**

**Open it briefly to see:**
- [ ] Response templates for "Someone found a bug"
- [ ] Response templates for "Someone loves it"
- [ ] Response templates for "What's OpenClaw?"

**Why this matters:**
You'll get questions immediately after posting. Having templates ready = faster, better responses.

---

## ✅ 7. Timing is Right (5 seconds)

### Check the Clock
```bash
date "+It's %A, %I:%M %p"
```

**Best launch times:**
- ✅ Tuesday-Thursday, 9 AM - 3 PM (tech Twitter is awake)
- ⚠️ Friday afternoon (people check out early)
- ❌ Weekend, late night (low engagement)
- ❌ Monday morning (people catching up on email)

**If timing is bad:**
- Wait until tomorrow 10 AM
- Schedule the post for better time

---

## ✅ 8. You're in the Right Headspace (10 seconds)

**Ask yourself:**
- [ ] Do I have 2-3 hours to monitor responses?
- [ ] Am I ready to fix bugs if people report them?
- [ ] Can I stay positive if feedback is mixed?
- [ ] Do I have energy to engage, not just post-and-ghost?

**If any "no":**
- Launch tomorrow when you're ready
- Launching tired/stressed = poor engagement

---

## ✅ 9. Screenshot/GIF Ready (10 seconds)

### Check Media Files
```bash
ls -lh public/screenshot.png
```

**Should be:**
- [ ] File exists
- [ ] ~200KB (not 5MB)
- [ ] Shows actual OpenClawfice UI
- [ ] Looks appealing (not blurry/ugly)

**For Twitter:**
- GIF is better than screenshot (3x engagement)
- If you have a GIF, use that

**If missing:**
- Use `public/screenshot.png` (exists)
- Or record quick GIF: see PIXEL-START-RECORDING-NOW.md

---

## ✅ 10. Backup Plan if Things Go Wrong (10 seconds)

### Know How to Rollback
```bash
# If demo breaks, you can rollback Vercel deployment
# Go to: https://vercel.com/openclawfice/deployments
# Click previous deployment → "Promote to Production"
```

**Emergency contacts:**
- Vercel support (if deploy fails)
- GitHub support (if repo locked)
- Your team (if you need help)

**Don't launch if:**
- You're alone and need help
- It's 11 PM and you're tired
- You haven't slept well

---

## 🚀 All Clear? Launch!

If ALL 10 checks pass, you're ready to launch.

### Final Step Before Posting
```bash
# Open your launch file
open LAUNCH-IN-5-MINUTES.md
```

Follow the 5 steps. Post to Discord. Post to Twitter. Done.

**Don't overthink it. You got this.** ✈️

---

## 🚨 If Something Fails

### Demo doesn't load
```bash
# Check Vercel deployment
open "https://vercel.com/openclawfice"

# Redeploy if needed
cd ~/clawd-openclawfice/openclawfice
git push origin main
# Vercel auto-deploys
```

### GitHub repo not found
- Check if repo is public (Settings → Change visibility)
- Check URL is correct: `https://github.com/openclawfice/openclawfice`

### NPM package not found
```bash
# Check if published
npm view openclawfice

# Republish if needed
npm publish
```

### Copy has localhost URLs
```bash
# Search for bad URLs
grep -r "localhost:3333" VIRAL-LAUNCH-COPY.md LAUNCH-IN-5-MINUTES.md

# Replace with live URLs
# Use: https://openclawfice.com
```

### You're too tired
- **DON'T LAUNCH TIRED**
- Sleep on it
- Launch tomorrow morning at 10 AM
- Fresh mind = better responses

---

## 📊 Post-Launch Verification (5 minutes after posting)

### Did it work?

**Check within 5 minutes:**
1. Discord post visible? (refresh page)
2. Twitter post visible? (check your profile)
3. Demo link clickable? (click it yourself)
4. Any immediate comments? (respond fast!)

**If post didn't send:**
- Check if you hit "send" (sounds obvious, but happens!)
- Check if Discord/Twitter kicked you out (re-login)
- Try posting again

---

## ✅ Final Reminder

**This checklist exists because:**
- Broken demo = people bounce immediately
- Localhost URLs = nobody can try it
- Bad timing = low engagement
- No response templates = slow/awkward replies

**Run this checklist every time you launch something public.**

**Takes 2 minutes. Saves hours of embarrassment.** ✈️

---

**Ready to launch? Open LAUNCH-IN-5-MINUTES.md and go.** 🚀

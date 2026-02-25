# POST-LAUNCH — First Hour Checklist ✅

The Discord post and tweet are live. Now:

## Immediate (0-10 minutes)

- [ ] **Watch the stats dashboard** → https://openclawfice.com/stats
  - Look for: install count, new users
  - If it's slow → check if Vercel is handling traffic
  
- [ ] **Monitor GitHub issues**
  - https://github.com/openclawfice/openclawfice/issues
  - Respond to any immediate bugs or questions (aim for <1 min response time)

- [ ] **Pin the launch tweet** if it gets traction (>50 RTs)

## Next (10-30 minutes)

- [ ] **Share on HackerNews** (if community wants it)
  - https://news.ycombinator.com/newest
  - Title: "OpenClawfice — Pixel art dashboard for your AI agents" (avoid "Show HN")
  
- [ ] **Check Discord #announcements**
  - Answer any questions
  - Link to: demo, install guide, troubleshooting

- [ ] **Post in relevant communities**
  - r/OpenSource (if appropriate)
  - Relevant AI/agent subreddits
  - Slack communities with OpenClaw users

## Ongoing (30 min - 2 hours)

- [ ] **First-install support**
  - If users report issues, prioritize:
    1. Node.js version problems
    2. Token generation issues
    3. Agent discovery failures
  - Have ready: TROUBLESHOOTING.md, INSTALL.md

- [ ] **Celebrate early adopters**
  - Share screenshot of early office setups
  - Retweet/reshare user posts
  - Build community momentum

- [ ] **Collect early feedback**
  - What did people like most?
  - What features do they want?
  - Are there UX blockers?
  - Update #product-feedback channel

## GitHub Setup (if not done)

Run this once to ensure GitHub is configured:

```bash
cd ~/clawd-openclawfice/openclawfice
bash docs/GITHUB-REPO-SETUP-30-SECONDS.md
```

This ensures:
- CI/CD is enabled
- Security scanning is active
- Releases are automated

## Key Metrics to Track

- **GitHub stars** (watch real-time)
- **Install count** (check stats dashboard)
- **Discord mentions**
- **Twitter reach** (check Twitter Analytics)
- **Bounce rate** (are people staying in demo?)
- **Install success rate** (what % complete the install?)

## If Something Goes Wrong

**Server is down:**
- Check Vercel status: https://status.vercel.com
- Check local: `curl -o /dev/null -w "%{http_code}" https://openclawfice.com`
- Restart if needed: `vercel --prod`

**Agents not showing up:**
- User might not have `~/.openclaw/openclaw.json` configured
- Link them to: https://openclaw.ai/setup

**Install script fails:**
- Most common: Node.js version too old (<18)
- Second: git not installed
- Check: `bash ~/openclawfice/public/install.sh` locally to debug

**Token issues:**
- Token stored at: `~/.openclaw/.openclawfice-token`
- If missing/broken, delete and restart server
- Server auto-generates on first run

---

## After First Hour

✅ The launch is live and momentum is building.  
✅ Check back every 30 minutes for first 4 hours.  
✅ Then rotate to daily status checks.

See: `LAUNCH-MOMENTUM.md` for Week 1 strategy.

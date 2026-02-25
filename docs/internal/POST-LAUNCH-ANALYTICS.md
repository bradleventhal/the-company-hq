# Post-Launch Analytics Plan

**Goal:** Measure OpenClawfice growth, understand user behavior, and identify what drives viral adoption.

---

## Core Metrics to Track

### 1. Traffic & Engagement

| Metric | Source | Why It Matters |
|--------|--------|----------------|
| **Unique visitors** | Vercel Analytics | Total reach |
| **Page views** | Vercel Analytics | Engagement level (1 visit = curious, 5+ = interested) |
| **Bounce rate** | Vercel Analytics | Landing page effectiveness |
| **Time on site** | Vercel Analytics | Interest level (30s = skimmer, 3min = engaged) |
| **Mobile vs desktop** | Vercel Analytics | Responsive design validation |

**Success Criteria (Week 1):**
- 500+ unique visitors
- <60% bounce rate
- 2+ min average time on site

### 2. Conversion Funnel

| Stage | Metric | How to Track | Why |
|-------|--------|--------------|-----|
| **Landing** | Visitors | Vercel Analytics | Top of funnel |
| **Demo** | `?demo=true` views | Vercel Analytics (query param) | Interest signal |
| **Install intent** | README clicks | GitHub traffic stats | High intent |
| **Actual install** | GitHub clones | `git clone` count via API | Conversion! |
| **Active usage** | npm installs | npm API (post-publish) | True activation |

**Success Criteria (Week 1):**
- 20% demo mode conversion (100 visitors → 20 try demo)
- 10% GitHub click-through (100 visitors → 10 visit repo)
- 5% clone rate (100 visitors → 5 clone repo)

**Track with:**
```bash
# GitHub API - clones in last 14 days
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/openclawfice/openclawfice/traffic/clones

# Vercel Analytics - export CSV weekly
# Dashboard → Analytics → Export
```

### 3. GitHub Growth

| Metric | Source | Target (Week 1) |
|--------|--------|-----------------|
| **Stars** | GitHub API | 50+ |
| **Forks** | GitHub API | 10+ |
| **Watchers** | GitHub API | 20+ |
| **Issues opened** | GitHub | 5+ (shows engagement) |
| **PRs submitted** | GitHub | 2+ (community contrib) |

**Track with:**
```bash
# Fetch repo stats
curl https://api.github.com/repos/openclawfice/openclawfice | \
  jq '{stars: .stargazers_count, forks: .forks_count, watchers: .subscribers_count}'
```

**Why stars matter:** Social proof. 50 stars = credible project, 100+ = trending territory, 500+ = viral.

### 4. Social Reach

| Platform | Metric | How to Track | Target (Week 1) |
|----------|--------|--------------|-----------------|
| **Twitter** | Impressions | Twitter Analytics | 10K+ |
| **Twitter** | Engagements | Likes + RTs + replies | 200+ |
| **Discord** | Reactions | Manual count | 50+ |
| **Reddit** | Upvotes | Manual (r/opensource, r/selfhosted) | 100+ |
| **Hacker News** | Points | HN page | 50+ (front page) |

**Track referrers:**
```bash
# Vercel Analytics shows top referrers automatically
# Look for: twitter.com, discord.com, reddit.com, news.ycombinator.com
```

**Success = diversified traffic:** Not 90% from one source.

### 5. Share Card Usage

**Critical viral loop metric:** Install → generate share card → post to social → new install

| Metric | How to Track | Target (Week 1) |
|--------|--------------|-----------------|
| Share cards generated | API logs (count POST /api/share) | 20+ |
| Cards with GitHub stars visible | Check `includeStars=true` param | 15+ |
| Social posts with share cards | Manual search (Twitter, Discord) | 10+ |

**Why it matters:** Every share card = free marketing. If 20% of users share, that's a 1.2× viral coefficient.

**Track with:**
```bash
# Add logging to app/api/share/route.ts
console.log(`Share card generated: agent=${agent}, stars=${stars}`);

# Then grep logs weekly
grep "Share card generated" logs/*.log | wc -l
```

---

## Traffic Source Attribution

### Vercel Analytics (Built-in)

Automatically tracks:
- Referrers (where visitors came from)
- Pages (which routes are popular)
- Devices (mobile/desktop/tablet)
- Countries (geographic distribution)

**How to access:**
1. https://vercel.com/dashboard
2. Select `openclawfice` project
3. Analytics tab
4. Export CSV for deeper analysis

### UTM Parameters for Campaigns

Add tracking codes to links:

| Campaign | URL |
|----------|-----|
| **Launch tweet** | `openclawfice.com?utm_source=twitter&utm_medium=social&utm_campaign=launch` |
| **Discord announce** | `openclawfice.com?utm_source=discord&utm_medium=community&utm_campaign=launch` |
| **Reddit post** | `openclawfice.com?utm_source=reddit&utm_medium=social&utm_campaign=launch` |
| **HN submission** | `openclawfice.com?utm_source=hackernews&utm_medium=social&utm_campaign=launch` |

Vercel Analytics tracks UTM params automatically.

---

## Success Criteria Matrix

### Week 1 Targets

| Tier | Traffic | Stars | Installs | Share Cards |
|------|---------|-------|----------|-------------|
| 🔥 **Viral** | 2,000+ | 100+ | 50+ | 30+ |
| ✅ **Success** | 500-2K | 50-100 | 20-50 | 15-30 |
| ⚠️ **Moderate** | 200-500 | 20-50 | 10-20 | 5-15 |
| ❌ **Slow** | <200 | <20 | <10 | <5 |

### Week 1 Conversion Benchmarks

| Metric | Good | Great | Exceptional |
|--------|------|-------|-------------|
| **Visitor → Demo** | 15% | 25% | 35% |
| **Visitor → GitHub** | 8% | 12% | 20% |
| **GitHub → Clone** | 30% | 50% | 70% |
| **Install → Share** | 15% | 25% | 40% |

**Why these numbers?**
- **Visitor → Demo (25%):** 1 in 4 curious enough to try
- **Visitor → GitHub (12%):** 1 in 8 wants to learn more
- **GitHub → Clone (50%):** Half of GitHub visitors install
- **Install → Share (25%):** 1 in 4 users love it enough to share

---

## A/B Test Ideas for Landing Page

### Test 1: Hero CTA (Week 2)

**Variant A (current):**
```
[Try the live demo →]  [Install now →]
```

**Variant B:**
```
[See your agents in action →]  [Get started →]
```

**Hypothesis:** Action-oriented language increases click-through.

**Measure:** Click rate on primary CTA.

### Test 2: Demo GIF Position (Week 3)

**Variant A:** GIF at top (current)

**Variant B:** Video embed at top, GIF below fold

**Hypothesis:** Video has play button = higher engagement.

**Measure:** Time on site, scroll depth.

### Test 3: Social Proof (Week 2)

**Variant A:** No social proof

**Variant B:** "Join 50+ teams using OpenClawfice" (above CTA)

**Hypothesis:** Social proof increases trust → installs.

**Measure:** Install rate (GitHub clones).

### Test 4: Feature vs Benefit (Week 3)

**Variant A (current):** "Live Office, XP & Levels, Meeting Room" (features)

**Variant B:** "See who's working, Track progress, Make decisions faster" (benefits)

**Hypothesis:** Benefits > features for conversion.

**Measure:** Demo click rate.

### How to A/B Test (Free)

**Option 1: Manual Split (Week 2)**
- Deploy variant to `/landing-v2`
- 50% traffic to `/`, 50% to `/landing-v2` (use middleware)
- Compare Vercel Analytics for both routes

**Option 2: Vercel Edge Config (Post-launch)**
- Use Edge Config to toggle features
- Track with custom events

**Option 3: Google Optimize (Free tier)**
- Integrate with Vercel Analytics
- Visual editor for variants

---

## Growth Loop: The Viral Flywheel

```
1. User installs OpenClawfice
   ↓
2. Sees their agents as pixel NPCs (delight moment)
   ↓
3. Agent completes task → XP popup + accomplishment
   ↓
4. User clicks "Share Card" button
   ↓
5. Generates 1200×630 card with agent stats + GitHub stars
   ↓
6. Posts to Twitter/Discord: "My AI agents are NPCs now 🎮"
   ↓
7. Followers click link → openclawfice.com
   ↓
8. New users install (back to step 1)
```

**Critical Multiplier:** Share rate × click-through × install conversion

**Example:**
- 100 installs
- 25% share (25 social posts)
- 10 clicks per post (250 visitors)
- 20% install rate (50 new installs)
- **Viral coefficient: 0.5** (50% growth per cycle)

**To achieve 1.0+ viral coefficient (self-sustaining growth):**
- Increase share rate: 25% → 40% (make sharing easier)
- Increase click-through: 10 → 15 (better card design)
- Increase install rate: 20% → 35% (better landing page)

**Result:** 100 installs → 210 installs (2.1× growth!)

---

## Tracking Dashboard (Manual, Free)

### Weekly Report Template

Copy this into `docs/internal/analytics/YYYY-MM-DD.md` every Monday:

```markdown
# OpenClawfice Analytics — Week of YYYY-MM-DD

## Traffic
- **Visitors:** X (↑/↓ Y% vs last week)
- **Page views:** X (↑/↓ Y% vs last week)
- **Bounce rate:** X% (target: <60%)
- **Avg time on site:** Xm Ys (target: 2+ min)

## Conversions
- **Demo mode views:** X (Y% of visitors)
- **GitHub clicks:** X (Y% of visitors)
- **Repo clones:** X (Y% of GitHub clicks)
- **Share cards generated:** X

## GitHub
- **Stars:** X (↑ Y since last week)
- **Forks:** X (↑ Y)
- **Issues opened:** X
- **PRs merged:** X

## Social Reach
- **Twitter impressions:** X
- **Discord reactions:** X
- **Reddit upvotes:** X (if posted)

## Top Referrers
1. twitter.com (X%)
2. discord.com (X%)
3. github.com (X%)
4. Direct (X%)
5. Other (X%)

## Insights
- What worked:
- What didn't:
- Next week focus:
```

### Quick Commands

**Fetch GitHub stats:**
```bash
curl -s https://api.github.com/repos/openclawfice/openclawfice | \
  jq '{
    stars: .stargazers_count,
    forks: .forks_count,
    watchers: .subscribers_count,
    issues: .open_issues_count
  }'
```

**Fetch clone count (requires auth):**
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/openclawfice/openclawfice/traffic/clones | \
  jq '.clones[] | {date: .timestamp, clones: .count, uniques: .uniques}'
```

**Export Vercel Analytics:**
- Dashboard → openclawfice → Analytics → Export CSV
- Open in Google Sheets or Excel

---

## Retention Metrics (Week 2+)

**Critical question:** Do users come back?

| Metric | How to Track | Target |
|--------|--------------|--------|
| **D1 retention** | Localhost access logs (if opt-in analytics added) | 50%+ |
| **D7 retention** | Same | 30%+ |
| **D30 retention** | Same | 20%+ |

**Why retention matters:** Install-and-forget = no word-of-mouth. Daily usage = advocacy.

**How to measure (post-launch enhancement):**
- Add opt-in anonymous telemetry (ping home once per session)
- Track unique install IDs (hashed) + last-seen timestamps
- Respect privacy: no data collection without consent

**Alternative (privacy-first):**
- GitHub star timeline (users who star = engaged users)
- Discord join rate (engaged users join community)
- Issue/PR velocity (power users contribute)

---

## Red Flags (Pivot Signals)

| Metric | Red Flag | What It Means |
|--------|----------|---------------|
| **Bounce rate** | >75% | Landing page isn't compelling |
| **Demo → Install** | <5% | Demo doesn't show value |
| **Share rate** | <10% | Product isn't shareable |
| **Stars plateau** | No growth after 2 weeks | Need better distribution |
| **Zero PRs** | After 1 month | Community not forming |

**If you hit 3+ red flags:** Time to pivot messaging, positioning, or target audience.

---

## Tools Stack (All Free)

| Tool | What It Tracks | Cost |
|------|----------------|------|
| **Vercel Analytics** | Traffic, referrers, devices | Free tier (10K events/mo) |
| **GitHub API** | Stars, forks, clones, traffic | Free |
| **Twitter Analytics** | Tweet impressions, engagement | Free |
| **Discord Insights** | Server joins, message activity | Free (with Community features) |
| **Google Sheets** | Manual aggregation | Free |

**No paid tools needed for first 1K users.**

---

## Week 1 Action Plan

### Day 1 (Launch Day)
- [ ] Post launch tweet with UTM params
- [ ] Post in Discord #announcements with UTM params
- [ ] Monitor Vercel Analytics every 2 hours
- [ ] Track social engagement (likes, RTs, replies)
- [ ] Screenshot GitHub star count (baseline)

### Day 2
- [ ] Export Vercel Analytics CSV
- [ ] Check GitHub clone count
- [ ] Post in r/opensource with UTM params
- [ ] Respond to all social comments/questions
- [ ] Document top 3 referrers

### Day 3
- [ ] Export Vercel Analytics CSV
- [ ] Submit to Hacker News with UTM params
- [ ] Calculate conversion funnel (visitor → demo → install)
- [ ] Identify drop-off point (where users leave)

### Day 4-7
- [ ] Daily Vercel Analytics check
- [ ] Daily GitHub stars check
- [ ] Collect share card examples (Twitter search)
- [ ] Interview 3 users (ask: what made you install? what would make you share?)
- [ ] Calculate Week 1 viral coefficient

### End of Week 1
- [ ] Create `analytics/2026-MM-DD.md` report
- [ ] Identify winning traffic source (double down)
- [ ] Identify losing traffic source (drop or pivot)
- [ ] Plan Week 2 experiments based on data
- [ ] Share metrics with team

---

## Next Steps

1. **Launch day:** Turn on all tracking (Vercel Analytics, GitHub stats)
2. **Week 1:** Manual daily tracking (spreadsheet or markdown)
3. **Week 2:** Build automated dashboard if metrics justify it
4. **Week 3:** Start A/B tests based on Week 1 learnings

**The goal isn't perfect analytics — it's learning fast and iterating.**

Track the minimum metrics needed to answer:
1. Are people finding us? (traffic)
2. Are they trying it? (demo + installs)
3. Are they sharing? (social posts + cards)
4. Are we growing? (week-over-week comparison)

If yes to all 4 → you're winning. Double down on what's working.

---

**Bottom line:** Measure what matters, ignore vanity metrics, and iterate based on user behavior. Growth comes from understanding *why* users install and making *that* easier to discover and share.

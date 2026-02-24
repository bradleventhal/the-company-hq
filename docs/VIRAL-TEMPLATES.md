# 📝 Viral Post Templates

**Make sharing your OpenClawfice office effortless.**

Located at: **http://localhost:3333/viral-templates.html** (or click the 📝 button in the toolbar)

---

## What It Does

Gives you ready-to-copy social media posts for:

- 🐦 **Twitter** (2 templates, character count validation)
- 💬 **Discord** (announcement format)
- 💼 **LinkedIn** (professional post)
- 🔴 **Reddit** (r/programming style)
- 🟧 **Hacker News** (Show HN format)

**All templates auto-populate with YOUR stats:**
- Number of agents
- Currently working agents
- Open quests
- Tasks shipped today

---

## How to Use

1. **Open the tool:**
   - Click the 📝 button in the top toolbar, OR
   - Go to http://localhost:3333/viral-templates.html

2. **Your stats load automatically** from `/api/office`

3. **Edit stats if needed** (4 input fields at top)

4. **Click "COPY" on any template** → paste into Twitter/Discord/LinkedIn/Reddit

5. **Post and watch the engagement roll in** 🚀

---

## Templates Included

### Twitter (2 templates)

1. **Thread Starter** — Short intro to OpenClawfice with demo link
   - 280 character limit with live validation
   - Optimized for engagement

2. **Stats Flex** — Show off your office stats
   - Includes your current numbers (agents, working, quests, shipped)
   - "Like The Sims but they actually ship code" hook

### Discord

- Full announcement format
- Bulleted feature list
- Stats section
- Demo link + install command

### LinkedIn

- Professional tone
- Problem/solution framing
- Feature bullets
- Includes hashtags (#AI #OpenSource #AgenticAI #DeveloperTools)

### Reddit

- r/programming optimized format
- "I built..." opening
- Feature list + tech stack
- Code block for install command

### Hacker News

- Show HN title format
- Comment with technical details
- Problem statement
- Tech stack disclosure

---

## Tips for Virality

The page includes best practices:

- **Post timing:** 9-11am EST (Twitter/LinkedIn) or 2-4pm EST (Reddit/HN)
- **Link order:** Demo first, then GitHub (people won't click GitHub until they see it work)
- **Format:** Screenshots > GIFs > videos for Twitter
- **Cross-post:** r/programming, r/opensource, r/selfhosted, r/LocalLLaMA
- **Engagement:** Reply to EVERY comment in the first hour
- **Updates:** Post "Day 2:", "Day 7:" updates with new stats

---

## Character Count Validation

Twitter templates show **live character count** in the top-right corner:

- ✅ Green if under 280 characters
- ❌ Red if over limit

Adjust your stats or wording to stay under the limit.

---

## Auto-Stats Loading

The tool automatically fetches your current stats from `/api/office`:

```javascript
const res = await fetch('/api/office');
const data = await res.json();

const agents = data.agents?.length || 5;
const working = data.agents?.filter(a => a.status === 'working').length || 2;
const quests = data.pendingActions?.length || 3;
const shipped = data.accomplishments?.length || 12;
```

If the API is unavailable (e.g., demo mode), it falls back to demo stats.

---

## Why This Matters

**The #1 reason projects fail to go viral: friction.**

Most devs don't share their work because:
- "I don't know what to say"
- "I'm bad at marketing"
- "I don't have time to craft the perfect post"

**This tool removes ALL of that.**

You literally just:
1. Click 📝
2. Click COPY
3. Paste into Twitter

**3 clicks. 10 seconds. Zero thinking required.**

That's how you ship viral.

---

## Customization

Want to tweak a template?

1. Click COPY to get the base text
2. Paste into your editor
3. Edit as needed
4. Post

The templates are starting points, not rigid rules. Make them your own.

---

## Platform-Specific Advice

### Twitter
- Include a screenshot or GIF (uploads at the bottom of the tweet box)
- Tag @openclaw_ai if you want a retweet
- Use relevant hashtags: #AI #OpenSource #BuildInPublic

### Discord
- Post in #announcements or #show-and-tell channels
- Ping @everyone only if channel rules allow
- Respond to every comment within 1 hour

### LinkedIn
- Add a screenshot as the post image
- Tag OpenClaw in the text (if there's a company page)
- Engage with comments — LinkedIn rewards discussion

### Reddit
- r/programming is strict: "I built..." posts are OK on weekends
- r/opensource loves open-source tools (any day)
- r/selfhosted appreciates local-first tools
- Don't post the same thing to multiple subreddits within 24 hours

### Hacker News
- "Show HN:" must be in the title
- Comment immediately after posting with context
- Technical details matter — mention Next.js, zero-config, filesystem-based
- Don't reply defensively to criticism — acknowledge and iterate

---

## Example Workflow

**Tyler's launch plan:**

1. Open `/viral-templates.html`
2. Copy Twitter Stats Flex template
3. Paste into Twitter, attach `public/openclawfice-demo.gif`
4. Post → pin to profile
5. Copy Discord template
6. Post in OpenClaw Discord #announcements
7. Copy Reddit template
8. Post to r/opensource
9. Wait 24 hours
10. Copy HN template
11. Post Show HN

**Time investment:** 15 minutes  
**Expected reach:** 10K+ impressions  
**Expected conversions:** 50-100 GitHub stars, 10-20 installs

---

## Metrics to Track

After posting, monitor:

- **Twitter:** Impressions, likes, retweets, link clicks
- **Discord:** Reactions, replies, demo link clicks
- **LinkedIn:** Views, comments, shares
- **Reddit:** Upvotes, comments, /r/programming front page?
- **HN:** Points, comments, front page ranking

**Goal:** Get to the front page of at least ONE platform.

If that happens, expect:
- 100-500 GitHub stars in 24 hours
- 50-200 demo visits
- 10-50 actual installs
- 5-20 issues/PRs
- 3-10 DMs from interested users

---

## Iterate Based on Feedback

Common feedback patterns:

1. **"Cool, but how do I install?"**
   → Add a reply with the install command

2. **"Does it work with [other AI framework]?"**
   → "Not yet, but PRs welcome! Currently OpenClaw-only"

3. **"Can I customize the NPCs?"**
   → "Not yet — coming in v0.2. For now, add IDENTITY.md to agent workspaces"

4. **"The demo is slow"**
   → Check production deploy, verify Vercel edge functions

5. **"License?"**
   → "AGPL-3.0 — open source, fork-friendly, contributions welcome"

---

## Next Steps

After your first viral post:

1. **Record it in accomplishments:**
   ```bash
   curl -X POST http://localhost:3333/api/office/actions \
     -H "Content-Type: application/json" \
     -d '{"type":"add_accomplishment","accomplishment":{
       "icon":"🚀",
       "title":"Posted OpenClawfice to Twitter",
       "detail":"250+ impressions in first hour. 5 retweets. Demo link getting clicks!",
       "who":"Your Name"
     }}'
   ```

2. **Share stats in Water Cooler** so your agents can celebrate

3. **Monitor GitHub stars** — add a badge to README when you hit 100

4. **Respond to every comment** within 24 hours

5. **Plan follow-up posts** for "Day 7" and "Week 1" milestones

---

## Future Enhancements

Planned for v0.2:

- [ ] Image export for each template (auto-screenshot with stats overlay)
- [ ] Scheduling (post at optimal times automatically)
- [ ] A/B testing (try 2 variations, see which performs better)
- [ ] Analytics dashboard (track which platforms drive the most stars)
- [ ] Custom templates (save your own post formats)

---

**Built by:** Pixel  
**File size:** 18KB  
**Dependencies:** None (vanilla HTML + JS)  
**Maintenance:** Zero (static file, auto-populates via API)

**Viral coefficient target:** 1.5x (every user brings 1.5 new users via social shares)

**Launch it. Share it. Watch it spread.** 🚀

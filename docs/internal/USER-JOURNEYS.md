# User Journeys — OpenClawfice

## Journey 1: "Just Installed OpenClaw" (Most Common)

**User:** Saw OpenClaw on Twitter, installed it 10 minutes ago. Has 1 agent (main). Never ran it yet. No IDENTITY.md, no USER.md — fresh default workspace.

**Steps:**
1. `curl -fsSL https://openclawfice.com/install.sh | bash`
2. `openclawfice`

**What should happen:**
- [x] CLI detects first run, creates `.status/` dir
- [x] Seeds water cooler with welcome message
- [ ] ❌ Agent shows as raw ID "main" (no IDENTITY.md yet)
- [ ] ❌ No owner shown (no USER.md yet)
- [ ] ❌ Agent shows as "idle" with "Unknown" last active (no sessions exist)
- [ ] ❌ Empty work room, empty lounge (just 1 unnamed idle agent)
- [ ] ❌ No cooldown timer (no cron jobs)
- [ ] ❌ Feels dead/broken — user bounces

**Fixes needed:**
1. If agent has no IDENTITY.md, show friendly default name (capitalize ID: "main" → "Main")
2. If no USER.md, don't show owner NPC at all (instead of broken/empty)
3. If agent has never run, show "Waiting to start..." instead of "Unknown"
4. Show a first-run onboarding banner: "👋 Your agents will appear here once they start working. Send a message in OpenClaw to wake them up!"
5. Consider: auto-generate a colorful NPC even without config (deterministic from agent ID)

---

## Journey 2: "Power User" (Our Setup)

**User:** Has 3+ agents, all configured with IDENTITY.md, USER.md, running actively. Has cron jobs. Has been using OpenClaw for weeks.

**Steps:**
1. Installs OpenClawfice
2. Runs it

**What should happen:**
- [x] All agents auto-discovered with names, roles, emoji
- [x] Owner shows up from USER.md
- [x] Active agents in Work Room with task bubbles
- [x] Idle agents in Lounge with cooldown timers
- [x] Quest log, accomplishments, water cooler all populated
- [x] Everything works perfectly

**Status: ✅ Fully working**

---

## Journey 3: "Single Agent, Active"

**User:** Has 1 agent (main), has been using it. Has IDENTITY.md set up. No other agents.

**Steps:**
1. Installs and runs OpenClawfice

**What should happen:**
- [x] Agent discovered with name from IDENTITY.md
- [x] Shows as working/idle based on session activity
- [ ] ⚠️ Office feels empty with just 1 NPC
- [ ] ⚠️ Water cooler chat is pointless with 1 agent (no one to talk to)
- [x] Quest log + accomplishments work if agent writes to them

**Fixes needed:**
1. With 1 agent, maybe hide water cooler or show "Add more agents for water cooler chat!"
2. Rooms should still look good with just 1 character (not feel broken)

---

## Journey 4: "Multiple Agents, Some New"

**User:** Has 3 agents configured. Main has been running for days. Two others were just added and haven't run yet.

**Steps:**
1. Runs OpenClawfice

**What should happen:**
- [x] All 3 agents discovered
- [x] Main shows as working/idle with real data
- [ ] ❌ New agents show as idle with "Unknown" last active
- [ ] ⚠️ New agents might not have IDENTITY.md → show as raw IDs

**Fixes needed:**
1. "Unknown" → "Not yet active" or "New agent"
2. Show a subtle badge on agents that haven't run yet: "🆕 NEW"

---

## Journey 5: "No IDENTITY.md Anywhere"

**User:** Uses OpenClaw but never created IDENTITY.md files. Just has the default workspace files.

**Steps:**
1. Runs OpenClawfice

**What should happen:**
- [ ] ❌ Agents show as "main", "outreach" etc. (raw IDs)
- [ ] ❌ Role shows as "Agent" for everyone
- [ ] ❌ All agents have same default emoji 🤖
- [ ] ⚠️ Looks generic but functional

**Fixes needed:**
1. Capitalize agent IDs: "main" → "Main", "outreach" → "Outreach"
2. Generate unique colors per agent (deterministic hash — already done ✅)
3. Maybe show a tip: "💡 Add IDENTITY.md to your agent workspaces to customize names!"

---

## Journey 6: "Tries Without OpenClaw"

**User:** Found OpenClawfice on GitHub, thinks it's a standalone app. Doesn't have OpenClaw installed.

**Steps:**
1. `npx openclawfice`

**What should happen:**
- [x] CLI shows clear error: "❌ OpenClaw not found!"
- [x] Points to https://openclaw.ai
- [x] Exits cleanly

**Status: ✅ Handled**

---

## Journey 7: "Comes Back After a Break"

**User:** Set up OpenClawfice weeks ago. Hasn't used OpenClaw in 3 days. Launches OpenClawfice again.

**Steps:**
1. `openclawfice`

**What should happen:**
- [x] Skips first-run setup (marker file exists)
- [x] All agents show as idle (no recent session activity)
- [x] Last active shows as "3d ago" or similar
- [ ] ⚠️ Old quest log items might be stale
- [ ] ⚠️ Water cooler has old messages from days ago

**Fixes needed:**
1. Consider showing dates on water cooler messages, not just times
2. Old accomplishments could show date headers ("3 days ago", "Today")

---

## Journey 8: "Custom Workspace Path"

**User:** Installed OpenClaw with a non-default workspace path (not ~/clawd). Maybe they use ~/ai-agents/ or ~/projects/my-bot/.

**Steps:**
1. Runs OpenClawfice

**What should happen:**
- [x] Agents discovered from openclaw.json (which has workspace paths)
- [x] IDENTITY.md read from correct workspace path
- [x] Sessions read from ~/.openclaw/agents/ (standard location)
- [x] Everything works regardless of workspace location

**Status: ✅ Works (workspace paths come from openclaw.json)**

---

## Journey 9: "Mobile User"

**User:** Wants to check on their agents from their phone browser.

**Steps:**
1. Opens http://server-ip:3333 on phone

**What should happen:**
- [ ] ⚠️ Need to verify mobile responsive layout
- [ ] ⚠️ NPC characters might be too small on mobile
- [ ] ⚠️ Chat input might be awkward on mobile

**Fixes needed:**
1. Test and fix mobile responsive CSS
2. Make sure touch interactions work (clicking NPCs, expanding quests)

---

## Summary: Critical Fixes for Plug-and-Play

### Must Fix (blocks first impression):
1. **Capitalize raw agent IDs** when no IDENTITY.md ("main" → "Main")
2. **"Not yet active"** instead of "Unknown" for agents that never ran
3. **First-run onboarding banner** explaining what the user will see
4. **Hide owner NPC** if no USER.md found (don't show broken empty agent)

### Should Fix (polish):
5. **"Add IDENTITY.md" tip** when agents have no custom names
6. **Single-agent mode** — hide water cooler or adapt layout
7. **Timestamps on chat** messages (dates, not just times)
8. **Mobile responsive** verification

### Nice to Have:
9. **"🆕 NEW" badge** on agents that haven't run yet
10. **Stale data indicators** for old quest log items
11. **Auto-open browser** on first launch

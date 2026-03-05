# QA Lessons Learned — The Company
*Every agent reads this before submitting deliverables. Updated by Brady after every QA cycle.*
*This is the collective quality brain. What one agent gets wrong, everyone learns from.*

---

## How This Works
1. Brady QAs a deliverable and finds an issue
2. Brady adds the lesson here (timestamped, categorized)
3. ALL agents check this file before submitting work
4. Over time, submissions get cleaner because everyone learns from every mistake

## Categories
- **DATA**: Number verification, source citation, accuracy
- **FORMAT**: Structure, completeness, spec compliance
- **REFS**: Agent names, file paths, phantom references
- **CLAIMS**: Unverified assertions, missing sources
- **SCOPE**: Work outside assigned territory/domain
- **CONSISTENCY**: Conflicts between deliverables

---

## Lessons

### 2026-03-04 (Founding)
- **REFS**: Brady's AGENTS.md referenced "Rodman" — agent doesn't exist. Always verify agent names against the roster before referencing. (Source: Wade content audit, Night 1)
- **SCOPE**: JJettas territory report included Dallas, LA, Scottsdale — outside Brad's East Coast territory. Always filter to assigned territory. (Source: LeBron QA, Night 1)
- **DATA**: JJettas state column showed dashes instead of state codes. Validate data columns before publishing. (Source: LeBron QA, Night 1)
- **FORMAT**: Jarvis morning briefing used placeholder data instead of real market data. Never use placeholder/estimated data without flagging [ESTIMATED]. (Source: LeBron QA, Night 1)
- **REFS**: Multiple agents referenced files in agents/{name}/ path — that directory doesn't exist in shared workspaces. Always verify file paths exist before referencing. (Source: Wade audit, Night 1)
- **CLAIMS**: McVay competitive analysis built from domain knowledge only (no web search). Flag when research tools were unavailable: [NO WEB SEARCH AVAILABLE]. (Source: Wade status report, Day 2)

### 2026-03-04 (Day 2 QA — Brady)
- **DATA**: Always verify derived calculations match their inputs. Jarvis Brad Brew script stated 2s10s spread of 14 bps but cited rates (10Y 4.086%, 2Y 3.92%) that imply ~16.6 bps. Math errors in finance content are credibility killers. (Source: Brady QA, Day 2)
- **SCOPE**: Territory definitions ("East") must explicitly list which states are included. Midwest states (MN, WI, IL, AR, AL) are ambiguous — JJettas reports included them without documenting the boundary. Don't assume "East" is self-explanatory. (Source: Brady QA, Day 2)
- **DATA**: "UNKNOWN" values in actionable fields (city, firm name) must be flagged prominently, not silently included in tables. 7 of the top 50 offices in JJettas' report had UNKNOWN cities — Brad can't plan trips to unknown locations. (Source: Brady QA, Day 2)
- **CLAIMS**: Market sizing numbers and competitive pricing require sources or [UNVERIFIED] flags. McVay's "~15,000 wholesalers" and "$150-300/user/mo" Salesforce pricing had no citations. (Source: Brady QA, Day 2)
- **REFS**: Any agent name not in the current roster must be clarified or removed. McVay referenced "Giannis" (compliance agent?) — phantom until confirmed. (Source: Brady QA, Day 2)
- **DATA**: Time savings estimates must be grounded in observed data, not projections. Achane estimated "~10 tasks/day" but task-tracker showed 13 over an entire day. Extrapolating from Day 1 burst activity inflates ROI claims. (Source: Brady QA — Achane audit, Day 2)
- **DATA**: Difficulty ratings must account for the hard parts (unstructured input parsing, cross-system dependencies), not just the happy path. "Easy — JSON manipulation" ignores that the trigger is unstructured natural language. (Source: Brady QA — Achane audit, Day 2)
- **FORMAT**: Don't inflate opportunity counts by splitting one system into multiple items. If two opportunities share infrastructure and data model, merge them. (Source: Brady QA — Achane audit, Day 2)
- **DATA**: Benchmark comparison tables require source verification for EVERY number. Tyreek's Codex vs Opus table had 3-4 inverted benchmark scores — Terminal-Bench winner was wrong, OSWorld winner was wrong. Inverted conclusions are worse than no table. (Source: Brady QA — Tyreek scout report, Day 2)
- **DATA**: Twitter/social handles must be manually verified before publishing. Three handles in Tyreek's report shared a fabrication pattern ("borobotics" suffix). Brad following wrong handles wastes his time. (Source: Brady QA — Tyreek scout report, Day 2)
- **CLAIMS**: Industry stats require clickable URLs, not just publisher names. "MIT Sloan, March 2026" and "KPMG" are not verifiable citations. If the link doesn't exist, flag [SOURCE PENDING]. (Source: Brady QA — Tyreek scout report, Day 2)
- **CODE**: Always test scripts on the target platform before submitting. Achane's onboard script used GNU sed syntax (`\u`) that doesn't work on macOS BSD sed — the machine it's meant to run on. 6 of 11 agents would have gotten wrong display names. (Source: Brady QA — onboard-agent.sh, Day 2)
- **CODE**: Validate user inputs at script entry. Accepting arbitrary strings as agent names without regex validation (`^[a-z0-9]+$`) creates injection risk and unexpected behavior downstream. (Source: Brady QA — onboard-agent.sh, Day 2)
- **CODE**: Mention patterns must be simple words. Spaces, parentheses, and special characters in mention patterns (e.g., "@AI (Allen Iverson)") will break Telegram mention parsing. (Source: Brady QA — onboard-agent.sh, Day 2)
- **CODE**: Automation scripts must avoid hard‑coded machine paths when intended for cron or reuse. Ohtani's hourly-backup.sh hardcodes repo paths under /Users/bradleyleventhal, which breaks portability and increases risk of accidental commits. (Source: Brady QA — hourly-backup.sh, Day 2)
- **CODE**: Safety automation (backup scripts) must never silently mutate external systems without guardrails. Auto‑committing repos hourly can push broken code or secrets unless guarded by repo allowlists, branch checks, and clear commit scope. (Source: Brady QA — hourly-backup.sh, Day 2)
- **CODE**: Routing automation must always prevent self‑review and undefined roles. qa-auto-router.js correctly added fallbacks and role mapping — this pattern should be standard for all workflow automation. (Source: Brady QA — qa-auto-router.js, Day 2)
- **CODE (PASS PATTERN)**: Workflow automation should codify business rules directly in code rather than relying on humans to remember process docs. qa-auto-router.js embedded the peer‑review table from qa-process.md and enforced it programmatically — this is the correct pattern for scaling agent operations. (Source: Brady QA — qa-auto-router.js, Day 2)
- **CODE (FAIL PATTERN)**: Backup automation must prioritize safety over convenience. hourly-backup.sh automatically committing and pushing repositories hourly without guardrails (branch checks, repo allowlist, secret filtering) is unsafe even if the script technically works. Safety checks are mandatory before enabling cron automation. (Source: Brady QA — hourly-backup.sh, Day 2)
- **CLAIMS**: Sales enablement material must verify every product statistic before Brad uses it in meetings. Marino's talk-track doc included several estimated AUM and duration numbers flagged "verify later" — those must be confirmed before field use. (Source: Brady QA — meeting-prep-and-talk-tracks.md, Day 2)
- **DATA**: Large analytical reports can pass QA if data gaps are clearly flagged. JJettas' territory analysis labeled UNKNOWN office locations and documented source files — transparency about data gaps is acceptable when explicitly disclosed. (Source: Brady QA — territory-intel-analysis.md, Day 2)
- **RESEARCH**: Strategic research should connect market trends directly to Brad's selling angle. McVay's deep dive correctly translated ETF flow data into specific talking points Brad can use in meetings — this is the standard for strategy research. (Source: Brady QA — wholesaler-intel-deep-dive.md, Day 2)
- **BRIEFINGS**: Daily briefings must cite data sources and timestamps for market numbers to prevent stale or unverifiable data. Jarvis' briefing referenced MarketWatch and FRED timestamps — this is the correct pattern. (Source: Brady QA — morning-briefing-2026-03-05.md, Day 2)
- **SALES MATERIAL**: Field-facing documents must not contain unresolved "verify later" placeholders. Marino’s meeting prep doc included estimated product AUM/duration figures flagged for later verification — those must be confirmed before Brad uses them in client conversations. (Source: Brady QA — meeting-prep-and-talk-tracks.md, Day 2 recheck)
- **AUTOMATION SAFETY**: Even when scripts function technically, cron‑level automation must include guardrails before deployment. Ohtani’s hourly-backup.sh v2 improved structure but still requires repo allowlists and branch safety checks before enabling unattended execution. (Source: Brady QA — hourly-backup.sh v2, Day 2 recheck)

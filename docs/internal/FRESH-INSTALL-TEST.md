# Fresh Install Test Plan

## Goal
Test the complete install flow on a fresh machine to find friction points that would kill conversions.

## Test Scenario
New developer discovers OpenClawfice on Twitter, clicks the demo, wants to try it with their own agents.

## Critical Path
1. Click "Install" from demo
2. Follow install instructions
3. Get to working office dashboard
4. See their first agent appear

## What to Test

### Pre-Install
- [ ] Do they have OpenClaw installed? (prerequisite check)
- [ ] Do they understand what OpenClawfice is vs OpenClaw?
- [ ] Is the install command easy to copy?

### Install Process
- [ ] Does `git clone` work? (repo access)
- [ ] Does `npm install` complete without errors?
- [ ] Are there scary warnings that look like errors?
- [ ] How long does it take? (expectation setting)

### First Run
- [ ] Does `npm run dev` start cleanly?
- [ ] What if port 3333 is already in use?
- [ ] Does it auto-discover agents?
- [ ] What if they have 0 agents? (empty state)
- [ ] What if they have no IDENTITY.md files? (default names)

### First 30 Seconds
- [ ] Is the UI obviously "theirs" or generic demo?
- [ ] Do they see activity immediately or empty rooms?
- [ ] Can they figure out what to do next?
- [ ] Is there a clear next action?

## Known Potential Blockers

### Hard Blockers (would cause install failure)
1. **No OpenClaw installed** → Need clear error message + link to install
2. **Node version mismatch** → Package.json specifies engine requirements?
3. **Port 3333 conflict** → Need fallback or clear error
4. **No agents configured** → Empty state is confusing

### Soft Blockers (would reduce engagement)
1. **Slow npm install** → No progress feedback
2. **Generic agent names** → Not obviously "theirs"
3. **No immediate activity** → Looks broken/static
4. **Unclear next steps** → Where do I go from here?

## Action Items

### Priority 1: Hard Blockers
- [ ] Add OpenClaw detection + helpful error
- [ ] Test on Node 18, 20, 22 (set engine in package.json)
- [ ] Handle port conflicts gracefully
- [ ] Improve empty state (0 agents)

### Priority 2: Soft Blockers  
- [ ] Add install progress spinner (already built?)
- [ ] Improve default agent names
- [ ] Show "waiting for first task" state clearly
- [ ] Add "What's next?" onboarding tooltip

### Priority 3: Polish
- [ ] Add "system check" command that validates setup
- [ ] Create troubleshooting guide for common issues
- [ ] Add telemetry to track where users drop off

## Testing Strategy

Since I can't spin up a VM right now, I'll:
1. Review the install docs for obvious gaps
2. Check error handling in the code
3. Test with a fresh `~/.openclaw` config
4. Document fixes needed for Forge

## Next Steps
1. Document top 3 blockers
2. Create GitHub issues for each
3. Prioritize for Forge to fix before traffic push

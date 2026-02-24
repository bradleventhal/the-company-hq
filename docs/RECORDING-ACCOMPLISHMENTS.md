# Recording Accomplishments - Best Practices

**Problem:** Loom-style accomplishment videos are recording random parts of the screen instead of showcasing the actual feature.

**Solution:** Follow these guidelines to create useful accomplishment videos.

---

## The Goal

Accomplishment videos should:
- Show the **actual feature** that was built/fixed
- Focus on **OpenClawfice dashboard** (not terminal/editor)
- Demonstrate the **user-visible impact**
- Be **short and focused** (6-10 seconds)

---

## Recording Methods

### Method 1: Use the Improved Script (Recommended)

```bash
# Record showing a specific feature
~/clawd-openclawfice/openclawfice/scripts/record-accomplishment.sh \
  "$(date +%s)" \
  "xp-celebration" \
  8
```

**Feature contexts available:**
- `dashboard` - Main office view
- `xp-celebration` - XP animations
- `meeting-room` - Meeting room with agents
- `accomplishments` - Accomplishments feed
- `quest-log` - Quest log panel

### Method 2: Manual Recording

**Before posting accomplishment:**

1. **Open OpenClawfice**: `open http://localhost:3333`
2. **Navigate to the feature**: Click/interact to show what you built
3. **Bring browser to front**: Make it the active window
4. **Then post the accomplishment** (which triggers auto-recording)

The video will capture the dashboard showing your feature!

---

## Examples

### ❌ Bad Recording
```
Accomplishment: "Added XP celebrations"
Video shows: Terminal with git commands
Problem: Doesn't show the actual feature
```

### ✅ Good Recording
```
Accomplishment: "Added XP celebrations"  
Video shows: OpenClawfice dashboard with golden +XP popup animating
Result: Users can see the feature in action!
```

---

### ❌ Bad Recording  
```
Accomplishment: "Fixed keyboard shortcuts"
Video shows: Code editor with TypeScript
Problem: Code isn't user-visible
```

### ✅ Good Recording
```
Accomplishment: "Fixed keyboard shortcuts"
Video shows: Dashboard, press '1', agent detail opens
Result: Users see shortcuts working!
```

---

## Step-by-Step for Common Scenarios

### Scenario: You Built a UI Feature

**Before recording:**
1. Open dashboard: `open http://localhost:3333`
2. Navigate to your feature
3. Make browser the focused window
4. **Then** post accomplishment

**The video will automatically show your feature!**

---

### Scenario: You Fixed a Bug

**Before recording:**
1. Open dashboard
2. Reproduce the scenario that used to break
3. Show it working correctly
4. **Then** post accomplishment

---

### Scenario: You Added Documentation

**Option A:** Show the docs
1. Open the markdown file in a reader (not code editor)
2. **Then** post accomplishment

**Option B:** Skip video recording
```bash
# Post without triggering video
curl -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -d '{"type":"add_accomplishment","accomplishment":{
    "icon":"📝",
    "title":"Created user guide", 
    "who":"Scout",
    "screenshot":"none"
  }}'
```

Documentation accomplishments don't need videos.

---

## API Integration

When posting accomplishments programmatically, include a `context` field:

```bash
curl -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -d '{
    "type":"add_accomplishment",
    "accomplishment":{
      "icon":"⭐",
      "title":"Added XP celebrations",
      "who":"Cipher",
      "context":"xp-celebration"
    }
  }'
```

The recording script can use `context` to show the right feature.

---

## Pro Tips

### Tip 1: Stage the Feature First
```bash
# Open dashboard
open http://localhost:3333

# Navigate to feature
# (click around to get to the right state)

# THEN post accomplishment
curl -X POST ...
```

### Tip 2: Use Demo Mode for Stable Recording
```bash
# Demo mode has predictable state
open http://localhost:3333/?demo=true

# Wait 2 seconds for it to load
sleep 2

# Post accomplishment (video records demo)
curl -X POST ...
```

### Tip 3: Record Manually If Needed
```bash
# Start screen recording manually
screencapture -V 8 -x /tmp/my-feature.mov

# Show your feature in browser

# Stop after 8 seconds
# Then add video path to accomplishment
```

---

## Troubleshooting

### "Video shows my terminal"
**Cause:** Terminal was the focused window when recording started  
**Fix:** Open browser first, make it active, then post accomplishment

### "Video shows code editor"
**Cause:** VS Code/editor was focused  
**Fix:** Switch to browser showing dashboard before posting

### "Video is too long/boring"
**Cause:** 6+ seconds showing nothing happening  
**Fix:** Use shorter duration (4-6s), show action immediately

### "Can't see the feature I built"
**Cause:** Dashboard not showing the right area  
**Fix:** Navigate to feature first, then post accomplishment

---

## Quick Checklist

Before posting an accomplishment:

- [ ] OpenClawfice dashboard is open
- [ ] Feature is visible on screen
- [ ] Browser is the focused window
- [ ] Ready to record for 6-8 seconds

Then post accomplishment → video auto-records!

---

## For Developers: Improving Auto-Recording

The current system has limitations:

**Current:** Records whatever window is focused  
**Better:** Could focus OpenClawfice window automatically  
**Best:** Could navigate to relevant UI element based on accomplishment type

**Improvement ideas:**
1. Parse accomplishment text for keywords ("XP", "meeting", "quest")
2. Auto-navigate to that feature
3. Trigger any animations
4. Then record

See `scripts/record-accomplishment.sh` for a starting point.

---

## Summary

**The golden rule:** Show the dashboard with your feature visible BEFORE posting the accomplishment.

Videos should answer: "What does this look like for users?"

Not: "What does the code look like?"

---

**Good videos = shareable content = viral growth!** 🎥

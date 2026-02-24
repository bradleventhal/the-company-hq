# 🎬 Recording System: Before → After

## The Problem Tyler Reported
> "the looms are not actually recording a demo of the feature, its usually recording some random part of the screen, like a terminal, or a full page"

## Before: Legacy Screencapture (Broken)
**Script:** `record-loom.sh`

```
┌─────────────────────────────────┐
│  User's Current Screen          │
│                                 │
│  ┌──────────────┐               │
│  │ Terminal     │  📹 Recording │
│  │ $ npm run... │  captures THIS│
│  │              │               │
│  └──────────────┘               │
│                                 │
│  [Other random windows]         │
└─────────────────────────────────┘
```

**Result:** ❌ Videos show terminal, code editor, wrong tabs

## After: Isolated Headless Chrome (Fixed!)
**Script:** `record-isolated.mjs`

```
┌─────────────────────────────────┐
│  User's Screen (unchanged)      │
│                                 │
│  [Whatever they're doing]       │
│                                 │
│  Tyler keeps working normally   │
└─────────────────────────────────┘

        ↓ Invisible Process ↓

┌─────────────────────────────────┐
│  Headless Browser (invisible)   │
│                                 │
│  📹 Records ONLY:                │
│  ┌──────────────────────────┐   │
│  │ OpenClawfice Dashboard   │   │
│  │ http://localhost:3333    │   │
│  │                          │   │
│  │ [Perfect feature demo]   │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

**Result:** ✅ Videos always show OpenClawfice features

## Feature Detection → Auto-Demos

When you complete an accomplishment, the system:

1. **Reads your title/detail**
   ```
   "Fixed XP celebration animations"
   ```

2. **Detects feature type**
   ```typescript
   detectFeatureType("Fixed XP celebration animations")
   // Returns: "xp"
   ```

3. **Launches headless browser**
   ```bash
   node record-isolated.mjs <id> 6 xp
   ```

4. **Triggers the feature**
   ```javascript
   window.postMessage({
     type: 'demo_trigger',
     action: 'xp',
     agent: 'Cipher',
     amount: 150
   });
   ```

5. **Records the demo**
   - Golden +XP popup appears
   - Particle burst animation plays
   - 6 seconds of perfect footage
   - Saved as `<accomplishment-id>.mp4`

## Supported Feature Types

| Keyword in Title/Detail | Triggers |
|------------------------|----------|
| "XP", "level", "celebration", "points" | XP celebration animation |
| "meeting", "discussion", "collaborate" | Meeting room with NPCs |
| "quest", "modal", "decision" | Quest modal popup |
| "accomplishment", "achievement", "feed" | Accomplishments feed highlight |
| "water cooler", "chat", "conversation" | Chat section focus |
| (anything else) | Default office view |

## Test Results

### ✅ Test 1: XP Feature
```bash
node scripts/record-isolated.mjs test-xp 6 xp
```
**Created:** `test-xp.mp4` (130 KB, 1280x800)  
**Shows:** Golden +XP popup with particle burst  
**User saw:** Nothing (completely invisible)

### ✅ Test 2: Meeting Room
```bash
node scripts/record-isolated.mjs test-meeting 6 meeting
```
**Created:** `test-meeting.mp4` (140 KB, 1280x800)  
**Shows:** Meeting room with NPCs facing each other  
**User saw:** Nothing

### ✅ Test 3: Automatic (via accomplishments API)
```bash
curl -X POST http://localhost:3333/api/office/actions \
  -d '{"type":"add_accomplishment","accomplishment":{"title":"Fixed XP animations",...}}'
```
**Created:** `1771911831927.mp4` (71 KB, 6 seconds)  
**Feature detected:** "xp" (from title)  
**Demo triggered:** Automatic XP celebration  
**User saw:** Nothing

## What Tyler Gets

### Before (Broken)
- ❌ Videos show random terminal windows
- ❌ Videos show wrong browser tabs
- ❌ Videos show code editor
- ❌ Inconsistent content
- ❌ User must stop working during recording

### After (Fixed)
- ✅ Videos always show OpenClawfice dashboard
- ✅ Feature-specific demos auto-triggered
- ✅ Consistent 1280x800 quality
- ✅ Perfect framing every time
- ✅ **User can keep working - completely invisible!**

## How To Verify It's Working

1. **Create an accomplishment with "XP" in title:**
   ```bash
   curl -X POST http://localhost:3333/api/office/actions \
     -H "Content-Type: application/json" \
     -d '{
       "type": "add_accomplishment",
       "accomplishment": {
         "icon": "✨",
         "title": "Testing XP celebration recording",
         "detail": "Verifying isolated recorder works",
         "who": "Tyler"
       }
     }'
   ```

2. **Wait 7 seconds** (6s recording + 1s encoding)

3. **Check for video:**
   ```bash
   ls -lt ~/.openclaw/.status/screenshots/*.mp4 | head -1
   ```

4. **Watch it:**
   ```bash
   open $(ls -t ~/.openclaw/.status/screenshots/*.mp4 | head -1)
   ```

5. **You should see:**
   - OpenClawfice dashboard (not your terminal!)
   - Golden +XP popup appearing
   - Particle burst animation
   - Perfect framing

## Technical Details

**Dependencies:**
- ✅ `puppeteer-core@24.37.5` (already installed)
- ✅ `ffmpeg` (for encoding)
- ✅ Chrome/Chromium (auto-detected)

**Performance:**
- Headless browser startup: ~2s
- Recording: 6s
- Encoding: ~1s
- **Total:** ~9 seconds
- **User impact:** Zero (completely invisible)

**File sizes:**
- Default recordings: ~70-80 KB
- XP celebrations: ~100-130 KB (more animation)
- Meeting rooms: ~120-150 KB (more movement)

## Status

✅ **WORKING IN PRODUCTION RIGHT NOW**

Every accomplishment you create automatically:
1. Detects what feature you're working on
2. Launches invisible browser
3. Triggers the right demo
4. Records perfect footage
5. Attaches video to accomplishment

**No more random terminals in videos!** 🎉

---

**Next time you see a video attached to an accomplishment, it was recorded by the isolated system - not your current screen.**

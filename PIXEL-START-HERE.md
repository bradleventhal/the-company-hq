# 🎬 Pixel: Create Demo GIF (30 min task)

**What:** Record 10-15 second GIF showing OpenClawfice in action  
**Why:** #2 viral asset (3x better Twitter engagement than static images)  
**Time:** 30-45 minutes  

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Setup (5 min)

```bash
# Install recording tool (pick one)
brew install --cask kap           # Easiest (recommended)
# OR
brew install gifski ffmpeg         # Use with QuickTime

# Start demo mode
cd ~/clawd-openclawfice/openclawfice
npm run dev
open "http://localhost:3333/?demo=true"
```

---

### 2️⃣ Record (10 min)

**Using Kap (easiest):**
1. Open Kap app
2. Click record, select 1200×675 area
3. Follow script below
4. Stop, export as GIF (30 FPS, <5MB)

**Using QuickTime + Gifski:**
1. QuickTime → New Screen Recording
2. Record following script below
3. Save as `video.mov`
4. Run: `gifski --fps 30 --width 1200 --quality 90 video.mov -o demo.gif`

**Recording Script (15 seconds):**
```
00:00  Hold on full dashboard (2 sec)
00:02  Move cursor to Nova's NPC
00:03  Click Nova → panel opens
00:05  Hold on panel (2 sec) 
00:07  Close panel
00:08  Scroll to Quest Log
00:09  Click quest to expand
00:11  Hold on expanded quest (2 sec)
00:13  Scroll back up to full view
00:15  STOP
```

**Tips:**
- Practice movements first (smooth cursor, no jerky motion)
- Record 2-3 takes, pick best
- Keep under 5MB (critical for Twitter)

---

### 3️⃣ Save & Done (5 min)

```bash
# Save GIF to project
cp demo.gif ~/clawd-openclawfice/openclawfice/public/openclawfice-demo.gif

# Check file size (must be <5MB for Twitter)
ls -lh ~/clawd-openclawfice/openclawfice/public/openclawfice-demo.gif

# If over 5MB, re-compress:
gifski --fps 30 --width 1200 --quality 70 video.mov -o demo.gif

# Record accomplishment
curl -s -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -d '{"type":"add_accomplishment","accomplishment":{"icon":"🎬","title":"Demo GIF created","detail":"10-15 sec viral-ready GIF showing OpenClawfice in action","who":"Pixel"}}'
```

---

## 🆘 If Stuck

**Demo won't load:**
```bash
cd ~/clawd-openclawfice/openclawfice
npm run build
npm run dev
```

**GIF too large (>5MB):**
- Reduce quality: `--quality 70` (instead of 90)
- Reduce size: `--width 1000` (instead of 1200)
- Shorten duration: 10 seconds instead of 15

**Need more detail?** Read `docs/DEMO-GIF-BRIEF.md` for full specs

---

## ✅ Success = 3 Files

1. ✅ `demo.gif` under 5MB
2. ✅ Saved to `/public/openclawfice-demo.gif`
3. ✅ Accomplishment recorded

**Ready? Just run the commands above and follow the script. Takes 30 min. Ship it today!** 🚀

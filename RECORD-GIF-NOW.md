# 🎬 Record Demo GIF RIGHT NOW (2 minutes)

**You have everything you need. Just follow these steps.**

---

## Step 1: Open Demo (5 seconds)

```bash
open "http://localhost:3333/?demo=true"
```

Or just click: http://localhost:3333/?demo=true

**Wait 5 seconds** for agents to load.

---

## Step 2: Start Recording (10 seconds)

**Mac (built-in):**
1. Press `Cmd + Shift + 5`
2. Click "Record Selected Portion"
3. Drag to select the browser window (1200×675 area)
4. Click "Record"

**Alternative (if you have Kap):**
1. Open Kap
2. Click record
3. Select browser window
4. Start

---

## Step 3: Do This (15 seconds)

**Just interact naturally for 15 seconds:**

1. **0:00-0:02** - Hold still (show full dashboard)
2. **0:02-0:03** - Move cursor to an agent NPC
3. **0:03** - Click the agent
4. **0:03-0:06** - Panel opens, hold (show agent details)
5. **0:06** - Close panel (click X or outside)
6. **0:06-0:08** - Scroll down to Quest Log
7. **0:08** - Click a quest to expand it
8. **0:08-0:12** - Hold (show quest details)
9. **0:12-0:15** - Scroll back up to top
10. **0:15** - STOP recording

**That's it!** Natural, smooth, shows key features.

---

## Step 4: Stop Recording (2 seconds)

**Mac:** Click the ⏹ button in menu bar

**Kap:** Click stop in Kap window

Saves to: `~/Desktop/Screen Recording.mov`

---

## Step 5: Convert to GIF (30 seconds)

**Option A - Gifski (best quality):**
```bash
# Install if needed
brew install gifski

# Convert (change filename if different)
cd ~/Desktop
gifski --fps 30 --width 1200 --quality 90 "Screen Recording.mov" -o demo.gif

# Check size
ls -lh demo.gif
# If over 5MB, reduce quality:
# gifski --fps 30 --width 1200 --quality 70 "Screen Recording.mov" -o demo.gif
```

**Option B - ffmpeg (fallback):**
```bash
# Install if needed
brew install ffmpeg

# Convert
cd ~/Desktop
ffmpeg -i "Screen Recording.mov" -vf "fps=30,scale=1200:-1:flags=lanczos" -c:v gif demo.gif
```

---

## Step 6: Save & Done (10 seconds)

```bash
# Copy to project
cp ~/Desktop/demo.gif ~/clawd-openclawfice/openclawfice/public/openclawfice-demo.gif

# Verify
ls -lh ~/clawd-openclawfice/openclawfice/public/openclawfice-demo.gif
```

**If file is over 5MB:**
- Re-convert with lower quality (see Option A above)
- OR trim video shorter (10 seconds instead of 15)

---

## ✅ You're Done!

**What you created:**
- 10-15 second GIF showing OpenClawfice in action
- Under 5MB (Twitter-compatible)
- Shows: Dashboard → Click agent → View details → Quest log
- Professional, smooth, compelling

**Record accomplishment:**
```bash
curl -s -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -d '{"type":"add_accomplishment","accomplishment":{"icon":"🎬","title":"Demo GIF created!","detail":"Recorded and converted 15-sec demo GIF. Ready for viral launch!","who":"<your name>"}}'
```

---

## 🆘 Quick Troubleshooting

**Demo won't load:**
```bash
cd ~/clawd-openclawfice/openclawfice
npm run dev
# Wait 5 seconds, then open: http://localhost:3333/?demo=true
```

**GIF too large (>5MB):**
```bash
# Reduce quality
gifski --fps 30 --width 1200 --quality 60 "Screen Recording.mov" -o demo.gif

# OR reduce size
gifski --fps 30 --width 1000 --quality 80 "Screen Recording.mov" -o demo.gif
```

**Recording looks jerky:**
- Close other apps
- Try again with smoother mouse movements
- Record at 30 FPS (not 60)

---

## 💡 Pro Tips

- **Practice first:** Do a dry run without recording
- **Smooth movements:** Slow, deliberate cursor motion
- **No rush:** Better to record twice than ship bad GIF
- **Check quality:** Watch the GIF before committing

---

**Total time:** 2-3 minutes  
**Difficulty:** Easy  
**Requirements:** Browser + built-in screen recorder

**Just do it!** 🚀

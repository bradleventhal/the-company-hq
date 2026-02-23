# 🎬 Demo GIF Creation Brief for Pixel

**Priority:** HIGH (#2 most impactful viral asset)  
**Impact:** 3-5x more Twitter engagement, better conversion  
**Time:** 30-45 minutes  
**Deliverable:** 10-15 second GIF showing OpenClawfice in action

---

## 📋 What to Record

### Scene 1: Dashboard Overview (2-3 seconds)
**Show:**
- Full office view
- 5 agents visible (some in Work Room, some in Lounge)
- Header with OpenClawfice logo
- Quest log with 1 pending quest
- Accomplishments feed visible

**Action:** Static hold (let viewer see the layout)

---

### Scene 2: Agent Interaction (3-4 seconds)
**Show:**
- Hover over an agent NPC
- Cursor moves to agent
- Click to open agent detail panel
- Panel slides in from right

**Action:** Click Nova or Forge, show their detail panel with:
- Skills
- Needs meters
- Current task
- XP/Level

**Why:** Demonstrates interactivity and detail

---

### Scene 3: Quest Log (2-3 seconds)
**Show:**
- Scroll down to Quest Log
- Click to expand a quest
- Show quest details with options

**Action:** Click on "Review: Dashboard Redesign" quest, expand it

**Why:** Shows the decision-making workflow

---

### Scene 4: Water Cooler Chat (2-3 seconds)
**Show:**
- Scroll to water cooler (right column)
- See chat messages flowing
- Maybe type a quick message (don't send)

**Action:** Show chat history, hover over message input

**Why:** Demonstrates team communication feature

---

### Scene 5: Call to Action (2 seconds)
**Show:**
- Zoom back to full dashboard
- Mouse moves to header
- Cursor hovers over "Try Demo" or GitHub link

**Action:** End on full office view with cursor on CTA

**Why:** Directs viewer to next action

---

## 🎨 Technical Specs

### Recording Settings:
- **Resolution:** 1200×675px (16:9, Twitter-optimized)
- **Frame Rate:** 30 FPS (smooth but not overkill)
- **Duration:** 10-15 seconds MAX
- **File Size:** Under 5MB (critical for Twitter/Discord)
- **Format:** GIF (MP4 acceptable but GIF preferred)

### Recording Tools:
**Mac:**
- **Gifski** (best quality GIFs from video)
- **ScreenFlow** (record → export → convert with Gifski)
- **Kap** (open source, easy GIF recording)

**Process:**
1. Record with ScreenFlow/QuickTime (high quality)
2. Trim to 10-15 seconds
3. Convert with Gifski (optimize for web)
4. Keep under 5MB

---

## 🎯 Success Criteria

### Must Have:
✅ Shows 5 agents in office  
✅ Demonstrates agent interaction (click NPC)  
✅ Shows quest log  
✅ Under 5MB file size  
✅ Smooth 30 FPS  

### Nice to Have:
- Agent moving between rooms
- Water cooler message appearing
- Meeting room indicator
- Plumbob mood changes

### Avoid:
❌ Text/narration (let visuals speak)  
❌ Long pauses (keep it moving)  
❌ Mouse cursor jerky movements  
❌ Over 15 seconds (attention spans)  
❌ Over 5MB (won't upload to Twitter)

---

## 🎬 Recording Script (Exact Steps)

**Setup:**
1. Open http://localhost:3333/?demo=true
2. Wait for demo to load fully (5 agents appear)
3. Clear browser notifications/popups
4. Position browser window to 1200×675 (or record at higher res and crop)
5. Start recording tool

**Actions (follow exactly):**
```
00:00 - Hold on full dashboard (2 seconds)
00:02 - Move cursor to Nova's NPC
00:03 - Click Nova, panel opens
00:05 - Hold on panel (2 seconds)
00:07 - Click X to close panel
00:08 - Scroll down to Quest Log
00:09 - Click "Review: Dashboard Redesign" to expand
00:11 - Hold on expanded quest (2 seconds)
00:13 - Zoom back to full dashboard
00:14 - Cursor moves to header "Try Demo" button
00:15 - STOP recording
```

**Post-Production:**
1. Trim exactly to 10-15 seconds
2. Export as high-quality MP4
3. Convert to GIF with Gifski (max 5MB)
4. Test upload to Twitter (ensure <5MB)
5. Save final GIF as: `openclawfice-demo.gif`

---

## 📁 File Locations

**Save to:**
```
~/clawd-openclawfice/openclawfice/public/openclawfice-demo.gif
```

**Also create smaller version for mobile:**
```
~/clawd-openclawfice/openclawfice/public/openclawfice-demo-mobile.gif
(800×450, under 3MB)
```

---

## 🚀 Usage After Creation

### Twitter:
```
Built a retro office for AI agents 🎮

Your OpenClaw agents → pixel art NPCs in a Sims-style dashboard

Try the demo: openclawfice.com/?demo=true

[Attach: openclawfice-demo.gif]
```

### README:
Add above screenshot:
```markdown
![OpenClawfice Demo](./public/openclawfice-demo.gif)
```

### Landing Page:
Replace screenshot with GIF (more engaging)

### Discord:
Attach to launch post (way more engaging than static image)

---

## 💡 Pro Tips

### Make It Pop:
1. **Use demo mode** (not real office) — more action happening
2. **Record at 60 FPS, export at 30** — smoother motion
3. **Add subtle zoom** on key moments (agent click, quest expand)
4. **Keep cursor smooth** — no jerky movements
5. **Test on real Twitter** before finalizing (ensure it loops well)

### Compression:
- Gifski is the best tool (better than Photoshop)
- Reduce colors to 256 if needed for file size
- Dithering: "Floyd-Steinberg" for best quality
- Frame skip: Export every other frame if too large

### Looping:
- Should loop seamlessly (end state = start state)
- OR fade to black at end (no loop)
- Test loop 3x to ensure no jarring transitions

---

## ⏱️ Timeline

**Total Time:** 30-45 minutes

- Setup & practice: 10 min
- Recording (multiple takes): 10 min  
- Editing & trimming: 10 min
- Compression & optimization: 10 min
- Testing & final export: 5 min

**Deliverable:** Production-ready GIF under 5MB

---

## 🎯 Why This Matters

### Impact on Virality:
- **Static image tweet:** 1-2% engagement
- **GIF tweet:** 3-5% engagement (3x better!)
- **GIF shows product in action:** Removes doubt
- **Looping GIF:** Holds attention, multiple views

### Conversion:
- People see it working = trust increases
- 10 seconds = perfect attention span
- Shows interactivity = "I want to try this"
- Under 5MB = loads instantly on mobile

### ROI:
- 30-45 min creation time
- 3x engagement improvement
- Reusable across all channels
- Essential for viral launch

---

## ✅ Checklist for Pixel

- [ ] Read this brief fully
- [ ] Open demo mode (localhost:3333/?demo=true)
- [ ] Practice cursor movements (smooth, deliberate)
- [ ] Record multiple takes (pick best one)
- [ ] Edit to 10-15 seconds
- [ ] Compress to under 5MB
- [ ] Save to /public/openclawfice-demo.gif
- [ ] Test upload to Twitter
- [ ] Notify Nova when ready
- [ ] Log accomplishment

---

## 🆘 If You Get Stuck

**Demo mode not working:**
```bash
cd ~/clawd-openclawfice/openclawfice
npm run build
npm run dev
open "http://localhost:3333/?demo=true"
```

**GIF too large (over 5MB):**
- Reduce resolution (1000×562 instead of 1200×675)
- Skip every other frame (15 FPS instead of 30)
- Reduce colors (128 instead of 256)
- Shorten duration (10 seconds instead of 15)

**Gifski command:**
```bash
# Install Gifski
brew install gifski

# Convert video to GIF
gifski --fps 30 --width 1200 --quality 90 video.mp4 -o demo.gif

# Check file size
ls -lh demo.gif

# If too large, reduce quality
gifski --fps 30 --width 1200 --quality 70 video.mp4 -o demo.gif
```

---

## 📞 Questions?

Ask Nova in water cooler or create a quest if blocked.

**Goal:** Ship this today. It's the #2 most impactful viral asset and takes less than an hour.

Let's make OpenClawfice go viral! 🚀

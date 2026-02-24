# 📸 Accomplishment Proof Standards

**Purpose:** Ensure accomplishments have visual proof that demonstrates the actual work, not just documentation.

---

## 🎯 Proof Hierarchy (Preference Order)

### 1. Video (Preferred for UI/Features)
**When to use:** Showing features in action, animations, workflows, user interactions

**How:**
- **Local apps (OpenClawfice, desktop apps):** Use headless Chrome recorder
  ```bash
  node scripts/record-isolated.mjs <accomplishment-id> 6 <feature-type>
  ```
- **Result:** 6-second MP4 showing the feature working
- **Example:** XP celebration animation, meeting room, dashboard updates

**Benefits:**
- Shows feature actually working
- Captures animations and interactions
- More engaging than static images
- Auto-validates through isolated recording

---

### 2. Screenshot (Required for Auth-Protected Services)
**When to use:** Gmail drafts, ad campaigns, analytics dashboards, Google Docs, authenticated services

**How:**
- **Browser automation:** Use Playwright/Puppeteer to screenshot after auth
  ```javascript
  await page.goto('https://mail.google.com');
  await page.screenshot({ path: 'email-draft.png' });
  ```
- **Manual:** Cmd+Shift+4 (macOS), Windows+Shift+S (Windows)
- **Result:** PNG showing the work (email draft, campaign UI, doc content)

**Examples:**
- Email draft ready to send
- Google Ads campaign configured
- Analytics dashboard with metrics
- Spreadsheet with data

**Why not video for these?**
- Auth barriers prevent headless recording
- Screenshots are sufficient for static content
- Faster to capture and validate

---

### 3. File/Link (Acceptable for Documents)
**When to use:** Google Docs, Excel files, PDFs, code files that are too large for screenshots

**How:**
- Share link (Google Docs, Sheets, Figma)
- Attach file (Excel, PDF, code snippets)
- Include in accomplishment `file` field

**Examples:**
- Google Doc analysis report
- Excel spreadsheet with calculations
- Figma design mockup
- Code file with implementation

**Why this is acceptable:**
- Document content changes frequently (screenshot becomes outdated)
- Interactive documents (spreadsheets, docs) benefit from direct access
- Code files are best viewed in editor with syntax highlighting

---

### 4. Markdown File (AVOID - Last Resort Only)
**When acceptable:**
- Meeting notes, planning docs, internal documentation
- Content that will be committed to repo anyway
- Non-visual work (research, analysis)

**Why to avoid:**
- Not visual (boring in accomplishments feed)
- Doesn't prove work was done
- User can't quickly verify result
- Breaks the "show, don't tell" principle

**If you must use MD:**
- Include key excerpts in accomplishment `detail`
- Add visual summary or diagram if possible
- Link to committed file, not local path

---

## 🎬 Recording Standards

### Local Apps (OpenClawfice, Electron, Native)
**Always use headless recorder:**

```bash
# Automatic feature detection
node scripts/record-isolated.mjs <id> 6 default

# Specific feature demos
node scripts/record-isolated.mjs <id> 6 xp          # XP celebration
node scripts/record-isolated.mjs <id> 6 meeting    # Meeting room
node scripts/record-isolated.mjs <id> 6 quest      # Quest modal
```

**Why:**
- Completely invisible (no user disruption)
- Always captures the app (not random terminals)
- Auto-triggers feature-specific demos
- Consistent quality (1280x800, 10fps)

**Validation:**
```bash
# Extract frames for validation
ffmpeg -i video.mp4 -vf "fps=1" /tmp/frame-%d.png

# Create montage for quick review
magick /tmp/frame-*.png -append validation.png
```

---

### Web Apps (Authenticated Services)
**Use Playwright/Puppeteer for screenshots:**

```javascript
const { chromium } = require('playwright');

async function captureEmailDraft() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    // Use existing auth cookies
    storageState: 'auth.json'
  });
  const page = await context.newPage();
  await page.goto('https://mail.google.com/mail/u/0/#drafts');
  await page.click('[data-message-id="..."]'); // Open draft
  await page.screenshot({ 
    path: 'email-draft.png',
    fullPage: false 
  });
  await browser.close();
}
```

**Why not headless video for auth services?**
- Auth cookies required (headless can't access user session)
- 2FA barriers
- Screenshots are sufficient for static content
- Faster and simpler

---

## 📋 Accomplishment Format

### Good Examples

#### ✅ Video Proof (Best)
```bash
curl -X POST http://localhost:3333/api/office/actions \
  -d '{
    "type": "add_accomplishment",
    "accomplishment": {
      "icon": "✨",
      "title": "Added XP celebration animations",
      "detail": "Golden particles burst when agents complete tasks. 6 particle types, randomized patterns, 1.2s animation with sound effects.",
      "who": "Cipher",
      "screenshot": "xp-celebrations.mp4"  # ← Video showing it in action
    }
  }'
```

#### ✅ Screenshot Proof (Auth-Protected)
```bash
curl -X POST http://localhost:3333/api/office/actions \
  -d '{
    "type": "add_accomplishment",
    "accomplishment": {
      "icon": "📧",
      "title": "Drafted outreach email to husk.irl",
      "detail": "550-word pitch emphasizing async workflow benefits. Subject: Paid partnership with Wing AI. Ready to send pending approval.",
      "who": "Scout",
      "screenshot": "husk-email-draft.png"  # ← Screenshot of Gmail draft
    }
  }'
```

#### ✅ File/Link Proof (Document)
```bash
curl -X POST http://localhost:3333/api/office/actions \
  -d '{
    "type": "add_accomplishment",
    "accomplishment": {
      "icon": "📊",
      "title": "Created ROI analysis spreadsheet",
      "detail": "16 creators analyzed. Cut 5 losers (-$8.7K/mo). Reallocate $3.8K to winners = +$67K profit swing. See spreadsheet for breakdown.",
      "who": "Scout",
      "file": "https://docs.google.com/spreadsheets/d/abc123"  # ← Link to live doc
    }
  }'
```

### Bad Examples

#### ❌ Markdown File (Not Visual)
```bash
# DON'T DO THIS
curl -X POST http://localhost:3333/api/office/actions \
  -d '{
    "type": "add_accomplishment",
    "accomplishment": {
      "icon": "📝",
      "title": "Wrote security documentation",
      "detail": "Created SECURITY.md with malware scanning info.",
      "who": "Scout",
      "file": "/path/to/SECURITY.md"  # ❌ Boring, not visual
    }
  }'

# DO THIS INSTEAD - Show the actual website
curl -X POST http://localhost:3333/api/office/actions \
  -d '{
    "type": "add_accomplishment",
    "accomplishment": {
      "icon": "🛡️",
      "title": "Added security badges to website",
      "detail": "4 verification badges on landing page: Malware-Free, CodeQL, Dependabot, Zero CVEs. Links to SECURITY.md.",
      "who": "Scout",
      "screenshot": "landing-security-section.mp4"  # ✅ Shows actual website
    }
  }'
```

---

## 🔍 Validation Requirements

### All Video Proofs Must:
1. ✅ Show the actual feature (not random terminals/windows)
2. ✅ Be readable (1280x800 minimum)
3. ✅ Capture the relevant action (not empty state)
4. ✅ Be validated with frame extraction before claiming proof

**Validation script:**
```bash
# Extract 3 frames
ffmpeg -i video.mp4 -vf "fps=0.5" /tmp/frame-%d.png

# Create validation montage
magick /tmp/frame-*.png -append validation.png

# Visual inspection: Does it show what we claim?
open validation.png
```

### All Screenshot Proofs Must:
1. ✅ Show the actual work product (draft, campaign, doc)
2. ✅ Include enough context (recipient, subject, key details visible)
3. ✅ Be recent (not outdated)
4. ✅ Be readable (crop/scale appropriately)

### All File/Link Proofs Must:
1. ✅ Be accessible (public link or shared with team)
2. ✅ Contain the claimed work (not empty placeholder)
3. ✅ Be referenced in accomplishment detail (explain what's in the file)

---

## 🚫 Common Mistakes

### ❌ Attaching MD files for visual work
**Wrong:**
```
"Added security badges to website"
file: SECURITY.md
```

**Right:**
```
"Added security badges to website"
screenshot: landing-security-badges.mp4 (shows actual badges on page)
```

---

### ❌ Videos showing wrong content
**Wrong:**
```
"Fixed XP celebration bug"
screenshot: terminal-output.mp4 (shows terminal, not the animation)
```

**Right:**
```
"Fixed XP celebration bug"
screenshot: xp-celebration-working.mp4 (shows golden particles bursting)
```

---

### ❌ No validation before claiming proof
**Wrong:**
```
Created video.mp4 → immediately attach → post accomplishment
(Video actually shows meta-discussion or errors)
```

**Right:**
```
Created video.mp4 → extract frames → validate content → attach → post
```

---

## 📐 Technical Specs

### Video Requirements
- **Format:** MP4 (H.264)
- **Resolution:** 1280x800 minimum
- **Duration:** 3-6 seconds (enough to show feature)
- **Frame rate:** 10 fps minimum
- **Size:** Under 200 KB preferred
- **Audio:** Optional (8-bit SFX acceptable, no voiceover needed)

### Screenshot Requirements
- **Format:** PNG (lossless) or JPEG (if large)
- **Resolution:** 1920x1080 or actual screen size
- **Crop:** Focus on relevant area (no need for full screen if showing email draft)
- **Annotations:** Optional (arrows, highlights) if helpful
- **Size:** Under 500 KB preferred

### File/Link Requirements
- **Access:** Public or shared with team
- **Format:** Native format (Google Docs, Excel, PDF)
- **Permanence:** Link shouldn't expire (use permanent share links)

---

## 🎯 Quick Decision Tree

**What did you build?**

```
Feature/Animation/UI?
├─ Local app → Video (headless recorder)
└─ Web app → Screenshot or video (Playwright)

Email/Doc/Campaign?
├─ Gmail/Auth service → Screenshot (Playwright + auth)
├─ Google Doc/Sheet → Link (share link)
└─ Local file → Attach file or screenshot preview

Code/Technical work?
├─ Visible feature → Video (show it working)
├─ Backend/API → Screenshot (API response, logs, tests passing)
└─ Documentation → MD file (acceptable, but add visual summary if possible)
```

---

## 📚 Example Workflows

### Workflow 1: UI Feature
```bash
# 1. Build the feature
# 2. Record it
node scripts/record-isolated.mjs new-feature 6 default

# 3. Validate
ffmpeg -i new-feature.mp4 -vf "fps=1" /tmp/frame-%d.png
magick /tmp/frame-*.png -append /tmp/validation.png
open /tmp/validation.png  # Does it show the feature?

# 4. Post accomplishment
curl -X POST .../actions -d '{
  "accomplishment": {
    "title": "Built new feature",
    "screenshot": "new-feature.mp4"
  }
}'
```

### Workflow 2: Email Draft
```bash
# 1. Draft the email in Gmail
# 2. Screenshot it
node scripts/screenshot-gmail-draft.mjs draft-id email-draft.png

# 3. Post accomplishment
curl -X POST .../actions -d '{
  "accomplishment": {
    "title": "Drafted email to creator",
    "screenshot": "email-draft.png"
  }
}'
```

### Workflow 3: Analysis Document
```bash
# 1. Create Google Doc with analysis
# 2. Get share link
# 3. Post accomplishment
curl -X POST .../actions -d '{
  "accomplishment": {
    "title": "Created ROI analysis",
    "file": "https://docs.google.com/document/d/..."
  }
}'
```

---

## ✅ Summary

**Accomplishment proof priority:**

1. **Video** (local apps, features, animations) ← Prefer this
2. **Screenshot** (auth services, static content)
3. **File/Link** (documents, spreadsheets)
4. **Markdown** (last resort, internal docs only)

**Golden rule:** Show, don't tell. Visual proof > text description.

**Validation:** Always extract frames and verify videos show claimed content before posting.

---

**Questions?**
- See [RECORDING-FIX-FEB24.md](./RECORDING-FIX-FEB24.md) for headless recorder setup
- See [SECURITY-VIDEO-VALIDATION.md](./SECURITY-VIDEO-VALIDATION.md) for validation examples
- Ask in #dev channel if unsure what proof type to use

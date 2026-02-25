# 🎨 Visual Quality Checklist

**Pre-launch visual inspection to ensure everything looks polished.**

Test these on the demo before launching: https://openclawfice.com/?demo=true

---

## Critical Visual Elements (Test These First)

### 1. Landing Page (First Impression)
- [ ] Hero section loads immediately (no blank screen)
- [ ] Demo GIF plays smoothly (< 1 second to start)
- [ ] "Try Demo" button is prominent and clickable
- [ ] Feature grid shows all 8 features with icons
- [ ] Color scheme: Dark mode looks professional, light mode has contrast
- [ ] Mobile: Everything stacks vertically, no horizontal scroll

**Why critical:** 80% of users decide to try based on landing page alone.

---

### 2. Office Layout (Core Experience)
- [ ] Work Room and Lounge are clearly separated
- [ ] Agents have pixel art sprites (not broken images)
- [ ] Agent names appear under sprites
- [ ] Status emoji visible: ⚡ (working) or 💤 (idle)
- [ ] Mood emoji visible: 😊, 😰, or 😌
- [ ] Room labels are readable

**Why critical:** This IS the product. If office looks broken, users leave.

---

### 3. Agent Panel (Detail View)
- [ ] Clicking agent opens panel from right side
- [ ] Agent emoji shows large and clear
- [ ] Current task displays (if working)
- [ ] XP bar fills correctly
- [ ] Level badge shows (LV.XX)
- [ ] 🎴 Trading Card button is visible
- [ ] Close button (X) works

**Why critical:** Users will click agents to explore. Panel must be intuitive.

---

### 4. Trading Cards (Viral Feature)
- [ ] 🎴 button opens card modal
- [ ] Card generates within 2 seconds
- [ ] Rarity tier shows correct color:
  - COMMON = Gray
  - UNCOMMON = Green
  - RARE = Blue
  - EPIC = Purple
  - LEGENDARY = Gold
- [ ] Agent name, level, XP bar visible
- [ ] Skills section populated (if agent has accomplishments)
- [ ] Download PNG button works
- [ ] Copy to clipboard button works

**Why critical:** Trading cards are the #1 shareable feature. Must be flawless.

---

### 5. Stats Dashboard (/stats)
- [ ] Dashboard loads at /stats route
- [ ] Key metrics display:
  - Total accomplishments (number)
  - Total XP (number)
  - Top agent (name + level)
  - Current streak (days)
- [ ] 7-day chart renders (bars for each day)
- [ ] Agent leaderboard shows all agents
- [ ] Share button exists (top-right)
- [ ] Mobile: Chart and leaderboard stack vertically

**Why critical:** Productivity feature. Users will check this weekly.

---

### 6. Water Cooler (Bottom Section)
- [ ] Chat messages visible
- [ ] Agent avatars show next to messages
- [ ] Timestamps appear
- [ ] Message input box present
- [ ] Send button visible
- [ ] Scroll works (if many messages)

**Why critical:** Interactive feature. Users will chat with agents.

---

### 7. Toolbar (Top Navigation)
- [ ] Logo/title visible (top-left)
- [ ] Settings ⚙️ button visible
- [ ] Help ? button visible
- [ ] Quest log 📋 button visible (with badge if quests exist)
- [ ] Dark mode toggle (if present)
- [ ] All buttons clickable

**Why critical:** Navigation. Users need to access features.

---

## Secondary Visual Elements (Nice-to-Have)

### 8. Accomplishments Feed (Right Sidebar)
- [ ] Feed shows recent accomplishments
- [ ] Icons render correctly (🚀, ✅, etc.)
- [ ] Timestamps are human-readable ("2 hours ago")
- [ ] Agent names visible
- [ ] Click expands detail (if implemented)

---

### 9. Office Events (Popup Notifications)
- [ ] Events slide in from right
- [ ] Event icons show (🎉, 💬, etc.)
- [ ] Text is readable
- [ ] Events auto-dismiss after ~3 seconds
- [ ] Multiple events stack (don't overlap)

---

### 10. Command Palette (Ctrl+K)
- [ ] Pressing Ctrl+K opens modal
- [ ] Search input is focused
- [ ] Commands listed (Settings, Help, Stats, etc.)
- [ ] Keyboard navigation works (up/down arrows)
- [ ] Enter selects command
- [ ] Esc closes palette

---

### 11. Meeting Room (If Present)
- [ ] Meeting room appears when agents collaborate
- [ ] Multiple agents shown in room
- [ ] Debate transcript visible
- [ ] Timer or round counter shows

---

### 12. Animations & Transitions
- [ ] Agents "move" between rooms (smooth transition, not teleport)
- [ ] Modals fade in/out (not instant)
- [ ] Buttons have hover states (color change, scale)
- [ ] XP bar animates when filling
- [ ] Celebrations trigger on level-up (🎉 particles)

---

## Dark Mode vs Light Mode

### Dark Mode (Default)
- [ ] Background: Dark gray/black (not pure black)
- [ ] Text: White or light gray (readable)
- [ ] Accent colors: Purple/green glow effects visible
- [ ] No "flashbang" white sections

### Light Mode (If Implemented)
- [ ] Background: White or light gray
- [ ] Text: Dark gray/black (readable)
- [ ] Accent colors: Still vibrant
- [ ] No washed-out sections

**Test both modes if toggle exists.**

---

## Mobile Responsiveness

### Test on Phone Screen (or Resize Browser to < 600px)

- [ ] Landing page: Stacks vertically, no horizontal scroll
- [ ] Office: Work room and lounge stack (not side-by-side)
- [ ] Agent panel: Slides from bottom (not right)
- [ ] Trading card: Fits screen width
- [ ] Stats dashboard: Chart legible on small screen
- [ ] Water cooler: Input box not cut off
- [ ] Toolbar: Hamburger menu (if implemented) or icons shrink

**Why:** 30-40% of users will view on mobile.

---

## Cross-Browser Testing

### Test in Multiple Browsers

**Chrome/Edge (Chromium):**
- [ ] Everything works

**Firefox:**
- [ ] Canvas rendering (trading cards)
- [ ] Animations smooth
- [ ] No console errors

**Safari (Mac/iOS):**
- [ ] Canvas works
- [ ] Fonts load correctly
- [ ] No layout shifts

**Fallback:** If browser-specific bug, document in TROUBLESHOOTING.md.

---

## Performance Check

### Page Load Speed
- [ ] Landing page loads < 2 seconds
- [ ] Demo mode loads < 3 seconds
- [ ] No visible "flicker" or layout shift

### Interaction Speed
- [ ] Clicking agent opens panel < 500ms
- [ ] Generating trading card < 2 seconds
- [ ] Changing pages (/ → /stats) < 1 second

**If slow:** Check Network tab for large assets (GIF > 1MB, etc.).

---

## Accessibility Check (Bonus)

### Keyboard Navigation
- [ ] Tab key moves through buttons
- [ ] Enter activates buttons
- [ ] Esc closes modals
- [ ] Shortcuts work (?, Ctrl+K, etc.)

### Screen Reader (Optional)
- [ ] Images have alt text
- [ ] Buttons have aria-labels
- [ ] Modals announce when opened

**Not critical for v0.1, but good practice.**

---

## Known Visual Issues (Document These)

**If you find bugs, add them here:**

### Issue 1: [Description]
**Where:** [Page/component]  
**What:** [What looks wrong]  
**Workaround:** [If any]  
**Priority:** Critical / High / Medium / Low

### Example:
**Issue:** Trading card font doesn't load on first open  
**Where:** Agent panel → 🎴 button  
**What:** Card shows blank text until refresh  
**Workaround:** Close and reopen card modal  
**Priority:** High (affects viral feature)

---

## Visual Quality Scoring

**For each section, rate 1-5:**
- 5 = Flawless (professional, no issues)
- 4 = Polished (minor issues, acceptable)
- 3 = Functional (works, but rough edges)
- 2 = Broken (major issues, blocks usage)
- 1 = Unusable (completely broken)

**Goal:** Average 4+ across all sections.

### Example Scoring:
- Landing page: 5/5
- Office layout: 5/5
- Agent panel: 4/5 (minor: close button hard to see)
- Trading cards: 5/5
- Stats dashboard: 4/5 (minor: mobile chart cramped)
- Water cooler: 3/5 (major: message input hidden on small screens)

**Average: 4.3/5 = LAUNCH-READY**

---

## Final Visual QA Checklist

**Before launching, verify:**
- [ ] Tested demo mode thoroughly (30+ minutes)
- [ ] Clicked every button
- [ ] Generated at least 3 trading cards
- [ ] Checked /stats page
- [ ] Viewed on mobile (or resized browser)
- [ ] Tried both dark and light mode (if available)
- [ ] No broken images or 404 errors
- [ ] No console errors (open DevTools → Console tab)

**If all checked:** ✅ **VISUALS ARE LAUNCH-READY**

---

## What to Do If You Find Issues

### Critical Issues (Blocks launch)
- Trading cards don't generate
- Demo mode completely broken
- Landing page doesn't load

**Action:** FIX IMMEDIATELY before launching.

---

### High Issues (Should fix, but can launch)
- Minor layout bugs on mobile
- Animations stutter occasionally
- Fonts load slowly

**Action:** Document in GitHub issues, fix in v0.1.1.

---

### Low Issues (Cosmetic)
- Icon slightly misaligned
- Color contrast could be better
- Tooltip text too long

**Action:** Add to backlog, fix eventually.

---

## Testing Workflow

**Recommended order:**
1. Landing page (first impression)
2. Office layout (core experience)
3. Agent panel + trading cards (viral features)
4. Stats dashboard (productivity)
5. Water cooler (interactivity)
6. Mobile responsive (30% of users)
7. Cross-browser (if time)

**Time estimate:** 30-45 minutes for thorough QA.

---

## Post-Launch Visual Monitoring

**First 24 hours:**
- Watch for bug reports in Discord/Twitter
- Check screenshots users post (spot visual issues)
- Monitor browser console errors (if users report)

**Common issues users find:**
- "Trading card is blank" → Font loading issue
- "Stats page is empty" → No accomplishments yet
- "Can't see agents" → Demo mode not enabled

**Be ready to hotfix critical visual bugs within hours.**

---

## Success Criteria

**Visual quality is launch-ready if:**
- ✅ 95% of features render correctly
- ✅ No critical bugs (blocks core functionality)
- ✅ Mobile usable (even if not perfect)
- ✅ Demo mode impressive (wow factor)

**You don't need perfection. You need "good enough to go viral."**

---

**Time to complete:** 30-45 minutes  
**Recommended tester:** Tyler (or any team member)  
**Frequency:** Once before launch, then after major updates

🎨 Make it beautiful. Make it viral.

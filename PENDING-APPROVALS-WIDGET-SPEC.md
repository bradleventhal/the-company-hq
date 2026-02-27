# Pending Approvals Widget - Feature Spec

**Problem:** Scout has 4 outreach emails ready (samspov 8 days old, Daniel K 70+ hrs, Reek G 14 hrs left, Jack 7+ days old). Tyler can't see what's waiting on him, so decisions age and freshness windows expire.

**Solution:** Add a "Pending Approvals" widget to the quest board that surfaces items waiting on Tyler's decision.

---

## Design

### Location
Quest board sidebar, above or below existing quests

### Visual Style
- Retro terminal aesthetic (matches existing quest board)
- Red/orange color for urgency indicators
- Terminal green (#00ff41) for text
- Time remaining in countdown format

### Data Source
**Option 1:** Read from Scout's memory files directly
- `~/agents/outreach/memory/pending-approvals.json`
- Scout maintains this file when creating drafts
- OpenClawfice reads it like it reads sessions.json

**Option 2:** New API endpoint `/api/office/approvals`
- Returns structured approval requests from all agents
- Agents post approval requests via API
- More scalable but requires more infrastructure

**Recommendation:** Start with Option 1 (file-based) for speed, migrate to Option 2 later if needed.

---

## Data Schema

```json
{
  "approvals": [
    {
      "id": "scout-samspov-email",
      "type": "email_approval",
      "title": "samspov outreach email",
      "from": "Scout",
      "priority": "high",
      "createdAt": 1771500000000,
      "expiresAt": null,
      "context": "Creator with 208K followers, $24.6K/mo potential",
      "action": "Review and approve email draft",
      "draftPath": "~/clawd-outreach/drafts/samspov-email.md"
    },
    {
      "id": "scout-reek-g-call",
      "type": "phone_call",
      "title": "Reek G phone call",
      "from": "Scout",
      "priority": "critical",
      "createdAt": 1772100000000,
      "expiresAt": 1772200000000,
      "context": "$1,800/month recurring deal, said 'Let's do it!'",
      "action": "Call 954-605-8368 before 7-day mark",
      "timeRemaining": "14 hours"
    }
  ]
}
```

---

## UI Mockup (ASCII)

```
┌─────────────────────────────────────┐
│ 🔔 PENDING APPROVALS (4)            │
├─────────────────────────────────────┤
│ ⚠️  URGENT: Reek G call (14h left)  │
│     Scout → Call 954-605-8368       │
│     $1.8K/mo recurring deal         │
│     [View Details] [Mark Done]      │
├─────────────────────────────────────┤
│ 📧 samspov email (8 days old)       │
│     Scout → Review draft            │
│     208K followers, $24.6K/mo       │
│     [View Draft] [Approve] [Reject] │
├─────────────────────────────────────┤
│ 📧 Daniel K email (70+ hrs)         │
│     Scout → Missed call apology     │
│     [View Draft] [Approve]          │
├─────────────────────────────────────┤
│ 📧 Jack follow-up (7 days)          │
│     Scout → Close $3K video deal    │
│     [View Draft] [Approve]          │
└─────────────────────────────────────┘
```

---

## Functionality

### Display
- Show pending approvals at top of quest board
- Sort by urgency (expiring soon → critical → high → medium → low)
- Show time remaining for time-sensitive items
- Show age for overdue items
- Badge count in header (🔔 4)

### Interaction
- **View Details:** Opens modal with full context
- **View Draft:** Opens draft file in browser or download
- **Approve:** Sends approval back to requesting agent
- **Reject/Skip:** Removes from pending, optionally sends rejection reason
- **Mark Done:** Archives the approval request

### Notifications
- Auto-refresh every 10 seconds
- Sound effect when new approval added (retro notification beep)
- Visual pulse animation on critical items
- Desktop notification for expiring items (< 2 hours)

---

## Implementation Plan

### Phase 1: Basic Display (30 min)
1. Create `PendingApprovalsWidget.tsx` component
2. Read `~/agents/outreach/memory/pending-approvals.json`
3. Display list in quest board sidebar
4. Show title, from, priority, age
5. No interactions yet (read-only)

### Phase 2: Interactions (1 hour)
1. Add "View Details" modal
2. Add "Approve" button → writes to responses file
3. Add "Mark Done" button → removes from pending
4. Auto-refresh on approval action
5. Sound effects on actions

### Phase 3: Integration (30 min)
1. Scout updates `pending-approvals.json` when creating drafts
2. Scout reads responses and takes action
3. Test full approval flow end-to-end
4. Add analytics tracking (approval time, decision velocity)

### Phase 4: Polish (30 min)
1. Add time remaining countdown
2. Add urgency indicators (red for < 24h)
3. Add desktop notifications
4. Add keyboard shortcuts (a = approve, s = skip)
5. Add loading states and error handling

**Total time:** ~2.5 hours

---

## Success Metrics

### User Experience
- Tyler sees pending approvals without asking
- Decision time < 5 minutes (down from hours/days)
- Zero emails expire due to invisibility

### System Performance
- Widget loads in < 500ms
- Auto-refresh doesn't lag UI
- File reads don't block page load

### Business Impact
- Outreach velocity increases (approvals within 1 hour)
- Fewer expired leads (< 48 hour freshness window)
- Higher close rate (faster response = better engagement)

---

## Alternative Designs Considered

### Option A: Toast Notifications
**Pros:** Instant visibility, no UI changes needed  
**Cons:** Dismissible, easy to miss, no persistent state

### Option B: Email Digest
**Pros:** Familiar format, works outside app  
**Cons:** Context switching, not real-time, clutters inbox

### Option C: Slack Integration
**Pros:** Where Tyler already is  
**Cons:** Requires Slack setup, another tool, fragmentation

### Option D: Quest Board Widget (CHOSEN)
**Pros:** Centralized, persistent, real-time, in-app  
**Cons:** Requires UI work, only visible when dashboard open

**Why Option D wins:** Tyler already uses OpenClawfice dashboard. Adding approvals there creates a single source of truth and reduces context switching.

---

## Open Questions

1. **File location:** Should pending-approvals.json live in Scout's workspace or in ~/.openclaw/.status/?
   - **Recommendation:** ~/.openclaw/.status/pending-approvals.json (consistent with actions.json, accomplishments.json)

2. **Who writes to this file:** Scout only, or any agent?
   - **Recommendation:** Any agent can post approval requests (future: Cipher for creative review, Forge for code review)

3. **Approval response format:** How does Tyler's approval get back to Scout?
   - **Recommendation:** Same as quest responses - write to responses.json, agent polls

4. **What if Tyler approves via chat instead of button?** Scout might miss it.
   - **Recommendation:** Train Tyler to use buttons for trackability, but also scan chat for approval keywords

5. **Do we need rejection reasons?** Or just binary approve/skip?
   - **Recommendation:** Start binary, add optional reason field later if needed

---

## Dependencies

### Required
- File system access to ~/.openclaw/.status/
- Existing quest board UI
- Auth system (already implemented)

### Nice to Have
- Desktop notification API
- Analytics tracking
- Email preview rendering
- Diff view for draft changes

---

## Risks & Mitigations

### Risk: Scout forgets to update pending-approvals.json
**Mitigation:** Add validation to Scout's draft creation workflow (AGENTS.md reminder)

### Risk: File read/write contention
**Mitigation:** Use same locking strategy as actions.json (retry on failure)

### Risk: Tyler ignores the widget
**Mitigation:** Sound effects + badge count + desktop notifications for urgency

### Risk: Widget clutters quest board
**Mitigation:** Collapsible section, "Hide completed" filter, max 5 visible at once

---

## Next Steps

1. **Nova:** Review this spec, approve or request changes
2. **Forge:** Implement Phase 1 (basic display) once approved
3. **Scout:** Create pending-approvals.json file with current 4 items
4. **Cipher:** Test approval flow end-to-end
5. **Tyler:** Use the widget for 1 week, provide feedback

---

## Appendix: Example Approval Flow

### Step 1: Scout creates draft
```bash
# Scout writes email draft
echo "..." > ~/clawd-outreach/drafts/samspov-email.md

# Scout adds approval request
curl -X POST http://localhost:3333/api/office/approvals \
  -d '{"type":"email_approval","title":"samspov outreach email","from":"Scout","priority":"high","draftPath":"~/clawd-outreach/drafts/samspov-email.md"}'
```

### Step 2: Tyler sees widget
- Opens OpenClawfice dashboard
- Sees "🔔 PENDING APPROVALS (4)" widget
- Clicks "samspov email (8 days old)"
- Modal opens with draft preview

### Step 3: Tyler approves
- Clicks "Approve" button
- Widget removes item from list
- Response written to responses.json

### Step 4: Scout receives approval
- Scout polls responses.json (or gets notified via quest response)
- Sees Tyler approved samspov email
- Sends email immediately
- Marks approval as complete

**Total time:** < 5 minutes (down from 8 days!)

---

**Status:** Spec complete, awaiting Nova approval  
**Estimated implementation:** 2.5 hours  
**Impact:** High - unblocks Scout, increases decision velocity, prevents expired leads

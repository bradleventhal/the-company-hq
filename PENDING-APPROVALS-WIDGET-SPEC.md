# Pending Approvals Widget - Spec

**Problem:** Scout has 4 outreach emails waiting on Tyler approval. Decision velocity is the bottleneck. Tyler can't see what's waiting.

**Solution:** Surface Scout's waiting-on-Tyler items in the Quest Log so decisions get visibility before freshness expires.

---

## User Story

**As Tyler**, I want to see Scout's pending approval items in my office Quest Log, so I can make decisions quickly before leads go cold.

**Acceptance Criteria:**
- Pending items show in Quest Log with "NEEDS APPROVAL" tag
- Items show age (how long waiting)
- Click opens detail with context
- Can approve/reject from widget
- Expired items flagged red (>48hrs)

---

## Design

### Quest Log Addition

Add new section at TOP of Quest Log (above regular quests):

```
┌─────────────────────────────────────┐
│ 🔔 Pending Approvals (4)            │
├─────────────────────────────────────┤
│ 🔴 samspov email (8 days old)       │
│ 🟡 Daniel K text (70hrs)            │
│ 🟡 Reek G call script (14hrs left)  │
│ 🟢 Jack call script (23hrs left)    │
└─────────────────────────────────────┘
```

### Color Coding
- 🔴 Red: >48hrs (expired, urgent)
- 🟡 Yellow: 24-48hrs (warning)
- 🟢 Green: <24hrs (fresh)

### Expanded View

Click item → Modal opens:

```
┌────────────────────────────────────────┐
│ Pending Approval: samspov email        │
├────────────────────────────────────────┤
│ From: Scout                            │
│ Created: 8 days ago                    │
│ Expires: Already expired (URGENT)     │
│                                        │
│ Context:                               │
│ • Creator: @samspov                    │
│ • Followers: 1.9M                      │
│ • Avg views: 7M                        │
│ • Projected ROI: 868-1,515%            │
│ • Deal: $2-3K                          │
│                                        │
│ Preview:                               │
│ [First 200 chars of email draft...]   │
│                                        │
│ [View Full Draft] [Approve] [Reject]  │
└────────────────────────────────────────┘
```

---

## API Design

### GET /api/approvals

Returns pending items from Scout (and other agents in future):

```typescript
{
  approvals: [
    {
      id: "approval-123",
      from: "Scout",
      type: "outreach_email",
      title: "samspov email",
      context: {
        creator: "@samspov",
        followers: "1.9M",
        projected_roi: "868-1,515%",
        deal: "$2-3K"
      },
      draft: "Full email text here...",
      created_at: "2026-02-19T10:00:00Z",
      expires_at: "2026-02-21T10:00:00Z", // 48hrs
      status: "pending" | "approved" | "rejected",
      urgency: "expired" | "warning" | "fresh"
    }
  ]
}
```

### POST /api/approvals/:id/approve

Approves item, triggers Scout to send:

```typescript
{
  action: "approve",
  note: "optional feedback"
}
```

### POST /api/approvals/:id/reject

Rejects item, notifies Scout:

```typescript
{
  action: "reject",
  reason: "optional"
}
```

---

## Data Source

### Option 1: Scout's Workspace Files
Scout maintains `~/agents/outreach/pending-approvals.json`:

```json
{
  "approvals": [
    {
      "id": "samspov-email-001",
      "type": "outreach_email",
      "title": "samspov email",
      "file": "~/clawd-outreach/DRAFT-SAMSPOV-EMAIL.md",
      "created": "2026-02-19T10:00:00Z",
      "context": {...}
    }
  ]
}
```

### Option 2: OpenClaw Quests API
Use existing quest system, add `needsApproval: true` flag

### Recommendation: Option 1
- Simpler to implement
- Doesn't pollute quest system
- Scout controls the data
- Easy to extend to other agents

---

## Implementation Steps

### Phase 1: Backend (30 min)
1. Create `/api/approvals` route
2. Read Scout's pending-approvals.json
3. Calculate urgency based on age
4. Return structured data

### Phase 2: Frontend Widget (45 min)
1. Add "Pending Approvals" section to Quest Log
2. Fetch from `/api/approvals` every 30s
3. Render with color coding
4. Show count badge

### Phase 3: Approval Actions (1hr)
1. Create approval modal
2. Wire up approve/reject buttons
3. POST to API
4. Notify Scout (via agent message or file write)
5. Update UI instantly

---

## Scout Integration

### How Scout Uses This

**Creating an Approval:**
```bash
# Scout writes to pending-approvals.json
cat >> ~/agents/outreach/pending-approvals.json << 'EOF'
{
  "id": "new-email-001",
  "type": "outreach_email",
  "title": "New creator pitch",
  "file": "~/clawd-outreach/DRAFT-NEW-CREATOR.md",
  "created": "2026-02-27T10:00:00Z",
  "expires": "2026-02-29T10:00:00Z",
  "context": {
    "creator": "@example",
    "deal": "$5K"
  }
}
EOF
```

**Receiving Approval:**
```bash
# Option A: Scout polls ~/agents/outreach/approvals-status.json
# Option B: Scout receives agent message
# Option C: File flag appears in draft directory
```

**Sending After Approval:**
```bash
# Scout checks approval, sends email, archives draft
if grep -q "approved" approvals-status.json; then
  # Send email
  # Archive draft
  # Remove from pending
fi
```

---

## UI/UX Details

### Empty State
```
┌─────────────────────────────────────┐
│ 🔔 Pending Approvals (0)            │
├─────────────────────────────────────┤
│ No pending approvals                │
│ Scout will notify you here when     │
│ outreach needs review.              │
└─────────────────────────────────────┘
```

### Compact Mode (when >5 items)
```
┌─────────────────────────────────────┐
│ 🔔 Pending Approvals (7) [View All] │
├─────────────────────────────────────┤
│ 🔴 3 expired                        │
│ 🟡 2 expiring soon                  │
│ 🟢 2 fresh                          │
└─────────────────────────────────────┘
```

### Notification Badge
- Show count on Quest Log icon
- Pulse animation if any expired
- Sound effect on new approval

---

## Success Metrics

**Before Widget:**
- Average approval time: 8+ days
- Leads lost to staleness: 75%
- Scout time wasted: 4+ hours/week

**After Widget:**
- Target approval time: <4 hours
- Leads lost: <10%
- Scout time saved: 4+ hours/week

**Key Indicator:**
- % of approvals handled within 48hrs
- Should be >90%

---

## Future Enhancements

### Multi-Agent Support
- Not just Scout - any agent can request approval
- Filter by agent
- Bulk approve/reject

### Approval Templates
- Pre-defined approval criteria
- Auto-approve if matches template
- Smart routing

### Reminders
- Desktop notification if >24hrs
- Slack/Discord ping
- Email digest

---

## Technical Notes

### Security
- Require auth (same as other office APIs)
- Validate approval source (only from approved agents)
- Rate limit approval actions

### Performance
- Cache approval count (update every 30s)
- Lazy load approval details
- Paginate if >20 items

### Testing
- Mock pending-approvals.json
- Test expired/warning/fresh states
- Test approve/reject flow
- Test empty state

---

## Files to Create

1. `app/api/approvals/route.ts` - Main API
2. `app/api/approvals/[id]/approve/route.ts` - Approve action
3. `app/api/approvals/[id]/reject/route.ts` - Reject action
4. `components/PendingApprovals.tsx` - Widget component
5. `components/ApprovalModal.tsx` - Detail modal

---

## Estimated Time

- Backend: 2 hours
- Frontend: 3 hours
- Testing: 1 hour
- **Total: 6 hours**

**Priority:** High (blocks Scout's velocity)  
**Difficulty:** Medium (new feature, not complex)  
**Impact:** High (unblocks decision bottleneck)

---

## Ready to Build

This spec is complete and ready for implementation. All requirements defined, API designed, UI mocked, success metrics set.

**Next:** Assign to Forge (or Cipher if Forge is busy) for implementation.

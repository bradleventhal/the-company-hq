# Quest Templates Spec — Common Workflow Shortcuts

**Goal:** Let new users jumpstart their office with pre-built quest templates for common workflows  
**Why:** Reduces onboarding friction — users see real examples of how quests work  
**Priority:** High for virality (makes OpenClawfice instantly useful)

---

## The Problem

New users see an empty quest log and don't know what kinds of quests to create. They need examples to understand:
- What makes a good quest?
- What format should quests use?
- What workflows can agents handle?

---

## The Solution

**Quest Templates** — Pre-built quest examples users can "clone" and customize for their team.

### How It Works

1. **Template Library:** Users click "Add from Template" button in Quest Log
2. **Browse Templates:** Modal shows 8-10 common quest types
3. **Clone Template:** Click a template → it creates a new quest with example data
4. **Customize:** User edits the cloned quest to match their needs

---

## Quest Template Library (8 Templates)

### 1. Code Review Request
```json
{
  "template": "code-review",
  "icon": "👀",
  "title": "Review: [Feature Name]",
  "description": "Code review request from Dev. Feature is complete and tested. Ready for approval.",
  "type": "review",
  "priority": "high",
  "from": "Dev Agent",
  "data": {
    "files": ["app/feature.tsx", "api/route.ts"],
    "testStatus": "All tests passing ✅",
    "options": ["Approve", "Request changes", "Reject"]
  }
}
```

**Use case:** Dev finishes a feature, wants PM/founder to review before merging

---

### 2. Technical Decision
```json
{
  "template": "tech-decision",
  "icon": "🤔",
  "title": "Decision: [Technology Choice]",
  "description": "Team discussed options. Recommendation: [Option A] because [reasons]. Need your decision.",
  "type": "decision",
  "priority": "medium",
  "from": "PM Agent",
  "data": {
    "options": ["Option A (recommended)", "Option B", "Option C", "Need more info"],
    "pros": ["Pro 1", "Pro 2"],
    "cons": ["Con 1", "Con 2"],
    "teamRecommendation": "Option A"
  }
}
```

**Use case:** Team reaches a fork in the road, needs founder's input

---

### 3. Bug Triage
```json
{
  "template": "bug-triage",
  "icon": "🐛",
  "title": "Bug: [Description]",
  "description": "QA found a critical bug. Dev estimates [X hours] to fix. Should we prioritize this?",
  "type": "decision",
  "priority": "high",
  "from": "QA Agent",
  "data": {
    "severity": "Critical",
    "stepsToReproduce": ["Step 1", "Step 2", "Step 3"],
    "impact": "Blocks user login",
    "estimatedFix": "2 hours",
    "options": ["Fix immediately", "Fix this week", "Won't fix"]
  }
}
```

**Use case:** QA finds a bug, needs decision on priority

---

### 4. Feature Scoping
```json
{
  "template": "feature-scope",
  "icon": "📋",
  "title": "Scope: [Feature Request]",
  "description": "PM broke down the feature request into tasks. Estimate: [X hours]. Approve to assign to Dev?",
  "type": "review",
  "priority": "medium",
  "from": "PM Agent",
  "data": {
    "tasks": ["Task 1", "Task 2", "Task 3"],
    "estimatedHours": "8 hours",
    "acceptanceCriteria": ["Criteria 1", "Criteria 2"],
    "options": ["Approve scope", "Adjust scope", "Defer"]
  }
}
```

**Use case:** Founder requests a feature, PM breaks it down and asks for approval before building

---

### 5. Weekly Retrospective
```json
{
  "template": "retro",
  "icon": "📊",
  "title": "Weekly Retrospective: [Week]",
  "description": "Team completed a retro. Highlights: [X wins], [Y challenges]. No action needed, just FYI.",
  "type": "review",
  "priority": "low",
  "from": "PM Agent",
  "data": {
    "wins": ["Win 1", "Win 2", "Win 3"],
    "challenges": ["Challenge 1", "Challenge 2"],
    "nextWeekFocus": "Focus area",
    "options": ["Acknowledge"]
  }
}
```

**Use case:** Team runs a weekly retro, summarizes for founder

---

### 6. Deployment Approval
```json
{
  "template": "deploy",
  "icon": "🚀",
  "title": "Deploy: [Version]",
  "description": "QA passed all tests. Ready to deploy to production. Approve to ship?",
  "type": "review",
  "priority": "high",
  "from": "Ops Agent",
  "data": {
    "version": "v2.1.0",
    "features": ["Feature 1", "Feature 2"],
    "bugFixes": ["Fix 1", "Fix 2"],
    "qaStatus": "All tests passing ✅",
    "options": ["Deploy now", "Deploy later", "Hold"]
  }
}
```

**Use case:** Everything's ready, just needs final approval to ship

---

### 7. Budget Request
```json
{
  "template": "budget",
  "icon": "💰",
  "title": "Budget Request: [Item]",
  "description": "Team needs [item] for [reason]. Cost: $X/month. Approve?",
  "type": "decision",
  "priority": "medium",
  "from": "Ops Agent",
  "data": {
    "item": "Tool/Service name",
    "cost": "$99/month",
    "reason": "Why we need it",
    "alternatives": ["Alternative 1 (free)", "Alternative 2 ($50/month)"],
    "options": ["Approve", "Try alternative", "Decline"]
  }
}
```

**Use case:** Team needs a tool/service, asks for budget approval

---

### 8. Email Draft Approval
```json
{
  "template": "email-draft",
  "icon": "📧",
  "title": "Approve Email: [Recipient]",
  "description": "Draft email to [recipient] ready for review. Send or edit?",
  "type": "approve_email",
  "priority": "high",
  "from": "Outreach Agent",
  "data": {
    "to": "recipient@example.com",
    "subject": "Email subject line",
    "body": "Full email body...",
    "options": ["Send", "Edit", "Don't send"]
  }
}
```

**Use case:** Agent drafts an important email, wants approval before sending

---

## UI/UX Design

### Template Gallery Modal

```
┌──────────────────────────────────────────────────────┐
│  ✨ Quest Templates                         [Close]   │
├──────────────────────────────────────────────────────┤
│  Jumpstart your office with common workflows         │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │ 👀         │  │ 🤔         │  │ 🐛         │    │
│  │ Code       │  │ Technical  │  │ Bug        │    │
│  │ Review     │  │ Decision   │  │ Triage     │    │
│  │            │  │            │  │            │    │
│  │ [Use This] │  │ [Use This] │  │ [Use This] │    │
│  └────────────┘  └────────────┘  └────────────┘    │
│                                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │ 📋         │  │ 📊         │  │ 🚀         │    │
│  │ Feature    │  │ Weekly     │  │ Deployment │    │
│  │ Scoping    │  │ Retro      │  │ Approval   │    │
│  │            │  │            │  │            │    │
│  │ [Use This] │  │ [Use This] │  │ [Use This] │    │
│  └────────────┘  └────────────┘  └────────────┘    │
│                                                       │
│  ┌────────────┐  ┌────────────┐                     │
│  │ 💰         │  │ 📧         │                     │
│  │ Budget     │  │ Email      │                     │
│  │ Request    │  │ Draft      │                     │
│  │            │  │            │                     │
│  │ [Use This] │  │ [Use This] │                     │
│  └────────────┘  └────────────┘                     │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### Template Preview (On Hover)

When hovering over a template card, show a preview:

```
┌────────────────────────────────────────────┐
│ 👀 Code Review Request                     │
├────────────────────────────────────────────┤
│ Use case: Dev finishes a feature and      │
│ wants PM/founder to review before merging  │
│                                            │
│ What you'll get:                           │
│ • Pre-filled quest with example data       │
│ • Common fields (files, test status)       │
│ • Standard options (Approve/Request/Reject)│
│                                            │
│ Customize: Edit the cloned quest to match │
│ your team's needs.                         │
└────────────────────────────────────────────┘
```

### After Clicking "Use This"

**Option A: Edit Immediately (Recommended)**
- Modal closes
- Quest appears in Quest Log with "[TEMPLATE]" badge
- Edit mode is enabled automatically
- User fills in the blanks (e.g., "[Feature Name]" → "User Authentication")

**Option B: Add to Queue**
- Template is added to Quest Log as-is
- User can edit later by clicking the quest

Recommendation: **Option A** (immediate editing reduces friction)

---

## Entry Points

### 1. Empty Quest Log
When Quest Log is empty, show:
```
✨ No quests yet

Get started with a template:
[Browse Quest Templates]
```

### 2. Header Button
Add a "Templates" button in the Quest Log header:
```
⚔️ QUEST LOG            [+ From Template]
```

### 3. Onboarding Tip
In demo mode or first-run, show a tip:
```
💡 Tip: Not sure what to create? Try a quest template!
```

---

## Technical Implementation

### Template Data Structure

Store templates in a TypeScript constant:

```typescript
// app/quest-templates/data.ts
export const QUEST_TEMPLATES = [
  {
    id: 'code-review',
    name: 'Code Review Request',
    icon: '👀',
    description: 'Dev finishes a feature, wants PM/founder to review',
    category: 'development',
    template: {
      type: 'review',
      icon: '👀',
      title: 'Review: [Feature Name]',
      description: 'Code review request from Dev. Feature is complete and tested. Ready for approval.',
      priority: 'high',
      from: 'Dev Agent',
      data: {
        files: ['app/feature.tsx', 'api/route.ts'],
        testStatus: 'All tests passing ✅',
        options: ['Approve', 'Request changes', 'Reject']
      }
    }
  },
  // ... more templates
];
```

### Template Gallery Component

```tsx
// components/TemplateGallery.tsx
function TemplateGallery({ onSelectTemplate }: { onSelectTemplate: (template: any) => void }) {
  return (
    <div className="template-gallery">
      {QUEST_TEMPLATES.map(t => (
        <TemplateCard
          key={t.id}
          template={t}
          onSelect={() => onSelectTemplate(t.template)}
        />
      ))}
    </div>
  );
}
```

### Creating a Quest from Template

```typescript
function cloneTemplate(template: any): Quest {
  return {
    ...template,
    id: `quest-${Date.now()}`,
    createdAt: Date.now(),
    // Add [TEMPLATE] badge or marker
    isTemplate: true,
  };
}
```

---

## Acceptance Criteria

- ✅ Template gallery modal accessible from Quest Log
- ✅ 8 quest templates available
- ✅ Clicking "Use This" creates a cloned quest
- ✅ Cloned quest is immediately editable
- ✅ Templates have clear descriptions and use cases
- ✅ Empty Quest Log shows "Browse Templates" CTA
- ✅ Templates work in both demo mode and live mode

---

## Why This Matters for Virality

**Problem:** New users see OpenClawfice and think "cool, but what do I use this for?"

**Solution:** Quest templates = instant value. Users see 8 real examples of how teams use quests.

**Viral loop:**
1. User tries demo mode → sees quest templates
2. User installs OpenClawfice → starts with a template
3. User customizes template → creates first real quest
4. User shares office screenshot → "Look at my AI team working!"

**Key insight:** Templates lower the activation energy. Users don't have to invent workflows from scratch — they copy proven patterns.

---

## Phased Rollout

### Phase 1: Core Templates (This Week)
- 8 templates (listed above)
- Template gallery modal
- "Use This" button clones template
- Works in both demo and live mode

### Phase 2: User-Created Templates (Next Sprint)
- "Save as Template" button on existing quests
- Share templates with team or community
- Template marketplace (community submissions)

### Phase 3: Smart Templates (Future)
- AI suggests templates based on team activity
- Auto-populate templates with recent context
- Template analytics (which templates are most used?)

---

## Files Forge Will Need to Create/Modify

**New Files:**
- `app/quest-templates/data.ts` (template definitions)
- `components/TemplateGallery.tsx` (gallery modal)
- `components/TemplateCard.tsx` (individual template card)

**Modified Files:**
- `app/page.tsx` (add "From Template" button, empty state CTA)
- Quest log component (integrate template gallery)

**Estimated Time:** 3-4 hours

---

## Success Metrics

**Adoption:**
- 60%+ of new users try at least one template
- 30%+ of quests are created from templates (first week)

**Virality:**
- Users share office screenshots with template-based quests
- Templates mentioned in Reddit/Twitter/HN discussions

**Retention:**
- Users who start with templates are 2x more likely to stay active

---

**Ship this after demo mode and OpenClawfice becomes instantly useful for new users.** 🚀

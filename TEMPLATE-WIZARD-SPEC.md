# Template Wizard Spec — One-Click Workflow Sharing

**Created:** 2026-02-27 03:00 EST  
**Owner:** Nova (PM)  
**Builder:** Pixel  
**Priority:** MEDIUM (enables creator ecosystem)

## Problem

From water cooler discussion:

> **Scout:** "The creators actually want to build workflows, not just consume them — every conversation ends with 'can I template this for my audience?' but we're not giving them an easy way to remix and share yet."

> **Forge:** "The 'share screenshot' button isn't the bottleneck — it's that creators don't know how to turn their workflow into a shareable template without diving into the config layer."

**Current state:**
- Users can share screenshots (visual only)
- To share *workflows*, they need to manually edit `openclawfice.config.json`
- This requires understanding JSON, config schema, and what fields to include/exclude
- **Result:** Creators don't share workflows, limiting viral spread

**Desired state:**
- One-click "Share this workflow" button
- Auto-generates shareable config from live state
- Creates import link or code snippet
- No config knowledge needed

---

## User Flow

### Scenario 1: Creator Wants to Share Workflow

1. User has a working setup (e.g., "Twitter engagement bot with 3 agents")
2. Clicks **"Share Workflow"** button in header (next to settings)
3. Modal appears:
   ```
   ┌─────────────────────────────────────────┐
   │  📤 Share Your Workflow                 │
   ├─────────────────────────────────────────┤
   │                                         │
   │  Name: Twitter Engagement Bot           │
   │  Description: Auto-reply system with    │
   │  3 agents monitoring mentions           │
   │                                         │
   │  [Preview Config]  [Generate Link]      │
   │                                         │
   │  Or copy this import code:              │
   │  ┌─────────────────────────────────────┐│
   │  │ npx openclawfice import \           ││
   │  │   https://share.openclawfice.com/   ││
   │  │   abc123                            ││
   │  └─────────────────────────────────────┘│
   │                                         │
   │  [Copy] [Tweet] [Discord]              │
   └─────────────────────────────────────────┘
   ```

4. Click "Copy" → Code snippet in clipboard
5. Click "Tweet" → Opens Twitter composer with pre-filled text:
   ```
   Just built a Twitter engagement bot with @openclawfice 🤖
   
   3 AI agents auto-reply to mentions while I sleep
   
   Try it: npx openclawfice import https://...
   
   #AI #automation
   ```

### Scenario 2: User Imports Shared Workflow

1. Sees shared link on Twitter/Discord
2. Runs: `npx openclawfice import https://share.openclawfice.com/abc123`
3. CLI fetches config, shows preview:
   ```
   📦 Import "Twitter Engagement Bot" by @username
   
   This will configure:
   • 3 agents (Scout, Cipher, Pixel)
   • Water cooler chat (5s frequency)
   • Autowork enabled
   
   Import? (y/n)
   ```
4. User confirms → Config written to `openclawfice.config.json`
5. Refresh dashboard → Workflow is live

---

## Technical Design

### 1. Export Workflow (Client-side)

**Button location:** Header, next to settings gear

**On click:**
1. Read current state from `config` object
2. Sanitize (remove personal data like API keys, user names)
3. Show preview modal with:
   - Editable name/description
   - JSON preview (collapsible)
   - Share options

**POST to `/api/templates/create`:**
```json
{
  "name": "Twitter Engagement Bot",
  "description": "Auto-reply system with 3 agents",
  "config": {
    "agents": [...],
    "waterCooler": {...},
    "autowork": {...}
  },
  "author": "tylerbot", // from openclaw.json or git
  "tags": ["twitter", "automation", "engagement"]
}
```

**Response:**
```json
{
  "id": "abc123",
  "url": "https://share.openclawfice.com/abc123",
  "importCommand": "npx openclawfice import abc123"
}
```

---

### 2. Share Backend (`/api/templates/create`)

**Storage:** `~/.openclaw/.status/shared-templates.json`

```json
{
  "templates": [
    {
      "id": "abc123",
      "name": "Twitter Engagement Bot",
      "description": "Auto-reply system",
      "config": {...},
      "author": "tylerbot",
      "createdAt": 1234567890,
      "downloads": 45,
      "tags": ["twitter"]
    }
  ]
}
```

**Optional future:** Push to public registry (clawhub.com/templates)

---

### 3. Import Command (CLI)

**Add to openclaw CLI:**
```bash
openclaw template import <id-or-url>
```

**Flow:**
1. Fetch template from `/api/templates/abc123` or public URL
2. Show preview (name, description, agents, settings)
3. Prompt for confirmation
4. Merge into `openclawfice.config.json` (don't overwrite, merge)
5. Show success message

**Example:**
```bash
$ openclaw template import abc123

📦 Importing "Twitter Engagement Bot" by tylerbot

This will add:
  • 3 new agents (Scout, Cipher, Pixel)
  • Water cooler chat (5s frequency)
  • Autowork enabled

Your existing config will be preserved.

Continue? (y/n) y

✅ Template imported! Refresh openclawfice to see changes.
```

---

### 4. Browse Templates (Dashboard)

**Route:** `/templates`

Show gallery of shared templates:

```
┌─────────────────────────────────────────────────┐
│  🎨 Template Gallery                            │
├─────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │ Twitter Bot      │  │ Content Creator  │    │
│  │ by tylerbot      │  │ by pixel         │    │
│  │ ⬇️ 45 downloads  │  │ ⬇️ 23 downloads  │    │
│  │ [Preview] [Use]  │  │ [Preview] [Use]  │    │
│  └──────────────────┘  └──────────────────┘    │
│                                                 │
│  Tags: [All] [Twitter] [Automation] [Gaming]   │
└─────────────────────────────────────────────────┘
```

**Features:**
- Filter by tags
- Search by name
- Preview config before import
- One-click import

---

## Data Sanitization

Before sharing, strip sensitive fields:

**Remove:**
- API keys / tokens
- User names / emails
- Private repo paths
- Absolute file paths

**Keep:**
- Agent IDs (generic like "agent-1", "agent-2")
- Roles / emojis
- Water cooler settings
- Autowork config
- Office layout

**Example sanitization:**
```typescript
function sanitizeConfig(config: any): any {
  const clean = {...config};
  
  // Remove personal info
  delete clean.owner?.name;
  delete clean.owner?.email;
  
  // Generalize agent names
  if (clean.agents) {
    clean.agents = Object.fromEntries(
      Object.entries(clean.agents).map(([id, agent]: any) => [
        id.replace(/tyler|personal|real-name/, 'user'),
        { ...agent, name: undefined }
      ])
    );
  }
  
  // Remove absolute paths
  if (clean.workspace) {
    clean.workspace = clean.workspace.replace(/\/Users\/\w+/, '/home/user');
  }
  
  return clean;
}
```

---

## UI Components

### ShareWorkflowButton
```tsx
<button 
  onClick={() => setShowShareModal(true)}
  style={{ /* header button style */ }}
>
  📤 Share
</button>
```

### ShareWorkflowModal
```tsx
<ShareWorkflowModal
  isVisible={showShareModal}
  onClose={() => setShowShareModal(false)}
  config={config}
  onShare={(url) => {
    // Copy to clipboard or open Twitter
  }}
/>
```

**Props:**
- `config` — Current openclawfice config
- `onShare(url)` — Callback when share URL generated

---

## Integration with Existing Features

### 1. Share Screenshot → Share Workflow
Pixel already spec'd "Share Screenshot" button. This extends it:

```
[Share ▼]
  → Screenshot (current)
  → Workflow (new)
  → Trading Card
```

### 2. Template Analytics
Track in retention analytics (Cipher's spec):
- `template_shared` (template_id, author)
- `template_viewed` (template_id)
- `template_imported` (template_id)
- `template_customized` (template_id, fields_changed)

### 3. Creator Attribution
When someone imports a template, show creator credit:
```
Built with "Twitter Bot" template by @tylerbot
Customize it to make it your own!
```

---

## Success Metrics

After shipping:

1. **Share rate:** % of users who share a workflow (target: >5%)
2. **Import rate:** % of viewers who import (target: >20%)
3. **Remix rate:** % of imports that get customized (target: >30%)
4. **Viral coefficient:** Avg imports per share (target: >1.5 = growth)

From water cooler insight:
> **Scout:** "The creators actually want to build workflows, not just consume them"

If remix rate is low (<20%), it validates Forge's concern:
> "Creators don't know how to turn workflow into template without config knowledge"

High remix rate (>40%) = we nailed it, creators are empowered.

---

## Phase 1 MVP (This Week)

**Minimum for launch:**
1. ✅ "Share Workflow" button in header
2. ✅ Modal with config preview + copy code
3. ✅ `/api/templates/create` endpoint (saves to local JSON)
4. ✅ Sanitization logic (strip personal data)

**Defer for later:**
- CLI import command (can manually copy config for now)
- Public template gallery (just local sharing first)
- Template analytics (Cipher's retention spec covers this)
- Twitter/Discord share buttons (just copy-paste for MVP)

---

## Handoff to Pixel

You own this feature. It aligns perfectly with your retro aesthetic + creator ecosystem vision.

**Files to create:**
- `components/ShareWorkflowModal.tsx`
- `app/api/templates/create/route.ts`
- `lib/templateSanitizer.ts`

**Files to modify:**
- `app/page.tsx` — Add share button to header

**Design notes:**
- Keep retro vibe (terminal-style preview, pixel buttons)
- Use same modal pattern as CustomizeDemo
- Add sound effect on successful share (sfx.play('success'))

Let me know if you need wireframes or more detail on any part.

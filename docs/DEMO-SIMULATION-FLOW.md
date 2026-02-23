# Demo Mode Simulation Flow

Visual guide to how the live simulation works.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Demo Mode)                     │
│                    http://localhost:3333/?demo=true          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Poll every 3 seconds
                              ├──────────────┬───────────────┐
                              │              │               │
                              ▼              ▼               ▼
         ┌─────────────────────────┐  ┌───────────┐  ┌──────────────┐
         │  /api/demo (agents)     │  │ /api/demo │  │ /api/demo/   │
         │  • Agent status         │  │ /actions  │  │ meeting      │
         │  • Task rotation        │  │ (static)  │  │ (static)     │
         │  • Work evidence        │  └───────────┘  └──────────────┘
         └─────────────────────────┘
                    │
                    │ Returns randomized data
                    ▼
         ┌─────────────────────────┐
         │  DEMO_AGENTS +          │
         │  DEMO_TASKS             │
         │  (from /app/demo/data)  │
         └─────────────────────────┘

         ┌─────────────────────────┐
         │  /api/demo/chat         │
         │  • Message rotation     │
         │  • Timing logic         │
         └─────────────────────────┘
                    │
                    │ Returns growing message list
                    ▼
         ┌─────────────────────────┐
         │  DEMO_CHAT +            │
         │  DEMO_CHAT_MESSAGES     │
         │  (from /app/demo/data)  │
         └─────────────────────────┘
```

---

## Agent Simulation Flow

Every 3-second poll to `/api/demo`:

```
For each agent:
  │
  ├─► 15% chance: Change status
  │   └─► working → idle (clear task)
  │       idle → working (assign random task)
  │
  └─► If working:
      └─► 25% chance: Get new task
          └─► Pick random task from role-specific pool
              (Nova → PM tasks, Forge → dev tasks, etc.)
```

**Example:**

```
Poll #1:
  Nova: working - "Reviewing sprint velocity"
  Forge: idle

Poll #2 (3 seconds later):
  Nova: idle                        ← Changed status (15% hit)
  Forge: working - "Refactoring API" ← Changed status + got task
```

---

## Chat Simulation Flow

Every 3-second poll to `/api/demo/chat`:

```
Check timing:
  │
  ├─► Has it been 8+ seconds since last message?
  │   └─► NO → Return current messages
  │   └─► YES → Continue
  │
  └─► Roll random chance (60% probability)
      ├─► MISS → Return current messages
      └─► HIT → Add new message
          │
          ├─► Pick next message from pool (rotating index)
          ├─► Set timestamp to now
          ├─► Add to message list
          └─► Keep only last 10 messages
```

**Example:**

```
Poll #1 (16:56:53):
  Messages: [msg1, msg2, msg3, msg4, msg5, msg6]

Poll #2 (16:56:56) — 3 seconds, no change (8s threshold)
  Messages: [msg1, msg2, msg3, msg4, msg5, msg6]

Poll #3 (16:57:03) — 10 seconds, 60% chance hits
  Messages: [msg1, msg2, msg3, msg4, msg5, msg6, NEW_msg7]

Poll #4 (16:57:06) — 3 seconds, no change
  Messages: [msg1, msg2, msg3, msg4, msg5, msg6, msg7]

Poll #5 (16:57:15) — 12 seconds, 60% chance hits
  Messages: [msg1, msg2, msg3, msg4, msg5, msg6, msg7, NEW_msg8]
```

---

## Data Pools

### Agent Task Pools (`/app/demo/data.ts`)

```javascript
DEMO_TASKS = {
  nova: [
    'Reviewing sprint velocity metrics',
    'Planning next sprint',
    'Updating roadmap',
    'Prioritizing backlog',
  ],
  forge: [
    'Building authentication module',
    'Refactoring API layer',
    'Implementing new feature',
    'Fixing production bug',
  ],
  // ... more agents
}
```

**How tasks are assigned:**
1. Agent becomes "working" (either by status change or already working)
2. Script picks random task from their role-specific array
3. Task is assigned to agent.task
4. Client displays it in the UI

---

### Chat Message Pool (`/app/demo/data.ts`)

```javascript
DEMO_CHAT_MESSAGES = [
  { from: 'Nova', text: 'Anyone need help with their current task?' },
  { from: 'Forge', text: 'The new API endpoints are looking clean 👌' },
  { from: 'Lens', text: 'Found a edge case bug, fixing it now' },
  // ... 10 total messages
]
```

**How messages rotate:**
1. Script maintains `messageIndex` (starts at 0)
2. When adding message: `messages.push(DEMO_CHAT_MESSAGES[messageIndex % 10])`
3. Increment `messageIndex++`
4. Result: Messages cycle through the pool infinitely

---

## Timing Summary

| Event | Frequency | Probability | Result |
|-------|-----------|-------------|--------|
| **Client polls API** | Every 3 seconds | 100% | Fetches latest state |
| **Agent status change** | Per agent per poll | 15% | working ↔ idle |
| **Agent task rotation** | Per working agent per poll | 25% | New task from pool |
| **New chat message** | Per poll (if 8s+ elapsed) | 60% | Add message from pool |

**Why these numbers?**
- **3-second polling** → Standard for responsive UI without overwhelming server
- **15% status change** → Agents feel active but not chaotic (1-2 changes per poll)
- **25% task rotation** → Working agents cycle through realistic work
- **8-second + 60% chat** → New message every ~12-15 seconds on average (feels natural)

---

## Tuning Guide

### Make Demo More Active
```typescript
// /app/api/demo/route.ts
const shouldChangeStatus = Math.random() < 0.25;  // Up from 0.15
const shouldChangeTask = Math.random() < 0.40;    // Up from 0.25

// /app/api/demo/chat/route.ts
const shouldAddMessage = timeSinceLastMessage > 5000 && Math.random() < 0.8;
//                                              ↑ Shorter ↑ More often
```

### Make Demo Calmer
```typescript
// /app/api/demo/route.ts
const shouldChangeStatus = Math.random() < 0.10;  // Down from 0.15
const shouldChangeTask = Math.random() < 0.15;    // Down from 0.25

// /app/api/demo/chat/route.ts
const shouldAddMessage = timeSinceLastMessage > 12000 && Math.random() < 0.4;
//                                              ↑ Longer ↑ Less often
```

**Current settings (default) are balanced for virality.**

---

## Performance Notes

### Memory Usage
- **Server state:** ~100 bytes (just `messageIndex` and `lastMessageTime`)
- **Per request:** No database queries, just random number generation
- **Scalability:** Stateless → supports unlimited concurrent demo users

### Client Performance
- Same polling frequency as real mode (3 seconds)
- No extra network requests
- No JavaScript-heavy simulation (all happens server-side)

---

## Why Simulation Matters

### Static Demo (Before)
```
User visits demo → Sees 5 agents → Status never changes
↓
"Is this just a mockup?"
↓
Low conversion
```

### Live Simulation (After)
```
User visits demo → Sees agents working → Status changes → Chat flows
↓
"Oh wow, they're actually doing stuff!"
↓
High conversion
```

**Key insight:** Humans need to *see* things moving to understand they're real. Static = screenshot. Dynamic = proof.

---

## Testing Flow

```
1. Start server
   ├─► npm run dev
   └─► Server listens on :3333

2. Visit demo
   └─► http://localhost:3333/?demo=true

3. Watch for changes
   ├─► Agents switching status
   ├─► Tasks rotating
   └─► Chat messages appearing

4. Verify simulation
   └─► Run ./scripts/test-demo-simulation.sh
```

---

## Files Overview

| File | Purpose | Lines |
|------|---------|-------|
| `/app/api/demo/route.ts` | Agent simulation logic | ~70 |
| `/app/api/demo/chat/route.ts` | Chat simulation logic | ~40 |
| `/app/demo/data.ts` | Task/message pools + static data | ~200 |
| `/hooks/useDemoMode.ts` | Query param detection | ~30 |
| `/components/DemoBanner.tsx` | Demo mode banner | ~150 |

**Total simulation code:** ~300 lines  
**Impact:** 10-second viral demo

---

For implementation details, see:
- **DEMO-MODE-SIMULATION.md** — Technical deep dive
- **TRY-DEMO.md** — User-facing guide

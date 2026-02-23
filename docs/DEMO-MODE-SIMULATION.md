# Demo Mode Live Simulation

**Status:** ✅ Implemented  
**Impact:** High — Makes demo mode feel alive and engaging (key for virality)  
**Implemented by:** Scout (Feb 23, 2025)

---

## Overview

Demo mode now includes **live simulation** that makes the virtual office feel like a real, active workspace. Instead of showing static agents, the demo continuously updates:

- **Agents** switch between working/idle and rotate through realistic tasks
- **Water cooler chat** receives new messages from team members
- **Subtle randomness** creates organic, unpredictable behavior

This transforms the demo from a screenshot into an **interactive preview** that shows OpenClawfice's core value proposition in under 10 seconds.

---

## What Was Built

### 1. Agent Status Simulation (`/api/demo/route.ts`)

**How it works:**
- Every API poll (3-second intervals), each agent has:
  - **15% chance** to change status (working ↔ idle)
  - **25% chance** to get a new task (if working)
- Tasks are randomly selected from role-specific pools (e.g., Nova gets PM tasks, Forge gets dev tasks)
- Work evidence is injected for status verification

**Result:** Agents feel alive — they pick up new work, take breaks, and rotate through realistic tasks.

**Code location:** `/app/api/demo/route.ts`

```typescript
// Simulate live agents with random status/task changes
const simulatedAgents = DEMO_AGENTS.map((agent) => {
  // 15% chance an agent changes status on each poll
  const shouldChangeStatus = Math.random() < 0.15;
  
  // 25% chance a working agent gets a new task
  const shouldChangeTask = agent.status === 'working' && Math.random() < 0.25;
  // ... rotation logic
});
```

---

### 2. Water Cooler Chat Simulation (`/api/demo/chat/route.ts`)

**How it works:**
- Starts with 6 static messages (for context)
- Every 8-15 seconds, adds a new message from the pool (60% probability on each poll)
- Keeps only last 10 messages to avoid infinite growth
- Messages have realistic timestamps and agent names

**Result:** Water cooler feels active — new messages appear organically, showing team communication.

**Code location:** `/app/api/demo/chat/route.ts`

```typescript
// Add a new message every 8-15 seconds (with 60% probability on each poll)
const shouldAddMessage = timeSinceLastMessage > 8000 && Math.random() < 0.6;

if (shouldAddMessage && DEMO_CHAT_MESSAGES.length > 0) {
  const nextMessage = DEMO_CHAT_MESSAGES[messageIndex % DEMO_CHAT_MESSAGES.length];
  messages.push({
    ...nextMessage,
    ts: now,
  });
  messageIndex++;
  lastMessageTime = now;
}
```

---

## Demo Data Structure

### Agent Task Pools (`/app/demo/data.ts`)

Each agent has role-specific tasks that rotate:

```typescript
export const DEMO_TASKS = {
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
};
```

### Water Cooler Message Pool

```typescript
export const DEMO_CHAT_MESSAGES = [
  { from: 'Nova', text: 'Anyone need help with their current task?' },
  { from: 'Forge', text: 'The new API endpoints are looking clean 👌' },
  { from: 'Lens', text: 'Found a edge case bug, fixing it now' },
  // ... 10 total messages that rotate
];
```

---

## Testing the Simulation

### Manual Testing

1. **Visit demo mode:**
   ```
   http://localhost:3333/?demo=true
   ```

2. **Watch for changes:**
   - Agents should change status every 10-30 seconds
   - Tasks should rotate for working agents
   - New chat messages appear every 8-15 seconds

3. **Verify randomness:**
   - Each page refresh should show slightly different states
   - No two demo sessions look identical

### API Testing

Test agent simulation:
```bash
curl -s http://localhost:3333/api/demo | jq -r '.agents[] | "\(.name): \(.status) - \(.task // "idle")"'
```

Test chat simulation:
```bash
curl -s http://localhost:3333/api/demo/chat | jq -r '.messages[-1] | "\(.from): \(.text)"'
```

Wait 10-15 seconds and poll again to see changes.

---

## Tuning Parameters

### Agent Simulation (`/api/demo/route.ts`)

```typescript
// Adjust these probabilities to control agent activity:
const shouldChangeStatus = Math.random() < 0.15;  // 15% chance per poll (default)
const shouldChangeTask = Math.random() < 0.25;    // 25% chance per poll (default)
```

**Effects:**
- **Higher percentages** → More frequent changes (may feel chaotic)
- **Lower percentages** → Slower, calmer office (may feel stale)
- **Recommended:** 10-20% for status, 20-30% for tasks

### Chat Simulation (`/api/demo/chat/route.ts`)

```typescript
// Adjust timing and probability:
const shouldAddMessage = timeSinceLastMessage > 8000 && Math.random() < 0.6;
//                                              ↑ min time (ms)         ↑ probability
```

**Effects:**
- **Shorter time + higher probability** → Busy, chatty team
- **Longer time + lower probability** → Quiet, focused team
- **Recommended:** 8-15 seconds minimum, 50-70% probability

---

## Why This Matters (Virality)

### Before Simulation (Static Demo)
- User sees 5 agents, 1 quest, some chat messages
- Looks like a screenshot
- Unclear if anything is happening
- **Low engagement** — feels like a mockup

### After Simulation (Live Demo)
- Agents change status, pick up new tasks
- Chat messages flow organically
- Office feels alive and productive
- **High engagement** — users understand the value instantly

**Key insight:** People don't want to *read* about async AI collaboration — they want to *see* it happening. Live simulation bridges the gap between concept and proof.

---

## Next Steps (Optional Enhancements)

### 1. Quest Simulation
- Randomly add/remove quests from the pool
- Mark quests as "resolved" after some time
- Show agents reacting to new quests (status change, chat message)

**Impact:** Shows the quest system in action

### 2. Accomplishment Simulation
- Periodically add new accomplishments
- Tie them to agent activity (e.g., Forge finishes a task → accomplishment appears)

**Impact:** Demonstrates team productivity and momentum

### 3. Meeting Simulation
- Start/stop meetings dynamically
- Rotate meeting topics
- Show agents joining/leaving meeting room

**Impact:** Showcases async meetings feature

### 4. Thought Bubbles
- Add random thought bubbles above agents
- Match thoughts to current task

**Impact:** Adds personality and humor

---

## Files Modified

- ✅ `/app/api/demo/route.ts` — Agent simulation
- ✅ `/app/api/demo/chat/route.ts` — Chat simulation
- ℹ️ `/app/demo/data.ts` — Already had task/message pools

**No changes needed to:**
- `/app/page.tsx` — Already uses `useDemoMode` hook
- `/hooks/useDemoMode.ts` — Already routes demo API calls
- `/components/DemoBanner.tsx` — Already complete

---

## Performance Notes

- **Server memory:** Minimal (only tracks message index and timestamp)
- **Client performance:** No impact (same polling as real mode)
- **Scalability:** Stateless API means unlimited concurrent demo users

**Trade-off:** Simulation state resets on server restart (but that's fine for demo purposes).

---

## Success Metrics (How to Measure Impact)

Once deployed, track:

1. **Demo→Install conversion rate** — How many demo users click "Install OpenClawfice"?
2. **Time in demo mode** — How long do users watch before deciding?
3. **Social shares** — Do people share demo URLs on Twitter/Discord?

**Hypothesis:** Live simulation increases demo→install by 2-3x compared to static demo.

---

## Credits

- **Nova:** Integration guide and spec
- **Forge:** Demo mode infrastructure (API routes, hooks, banner)
- **Scout:** Live simulation implementation (agent + chat randomization)

---

**Status:** Ready for production. Demo mode is now viral-ready. 🚀

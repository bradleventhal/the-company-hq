# Agent Search & Filtering - Implementation Spec

**Priority:** P2 (Medium - usability improvement)  
**Owner:** Forge  
**ETA:** 1-2 hours

---

## Problem

Users with 10+ agents have no way to quickly find a specific agent. Current UI shows all agents in a grid with no search or filtering capabilities.

**User pain:**
- Scroll through entire grid to find target agent
- No visual grouping by status (working vs idle)
- Can't filter by name, role, or activity

**Impact:** Frustration scales with agent count. At 20+ agents, UX breaks down completely.

---

## Solution

Add search bar + status filters to office view.

### Success Criteria
- ✅ Find target agent in <3 seconds (vs ~15s scrolling)
- ✅ Filter by status: All / Working / Idle
- ✅ Search by agent name (fuzzy match)
- ✅ Keyboard shortcuts (/ to focus search)
- ✅ Responsive on mobile

---

## UI Design

### Search Bar Location
Place above office grid, below header:

```
[Header with logo, stats, buttons]
┌────────────────────────────────────────┐
│  🔍 Search agents...    [All ▼] [Working] [Idle]  │
└────────────────────────────────────────┘
[Office grid with filtered agents]
```

### Visual Style
- Retro terminal aesthetic (matches brand)
- Terminal green accent (#00ff41)
- Pixelated borders
- Scanline effect on focus

---

## Technical Implementation

### 1. Component: `AgentSearchFilter.tsx`

**Props:**
```typescript
interface AgentSearchFilterProps {
  agents: Agent[];
  onFilterChange: (filtered: Agent[]) => void;
  theme: any;
  isMobile: boolean;
}
```

**State:**
- `searchQuery: string` - Current search text
- `statusFilter: 'all' | 'working' | 'idle'` - Selected status filter

**Filter Logic:**
1. Filter by status first (if not 'all')
2. Then filter by search query (fuzzy match on name, id, role)
3. Return filtered array

**Keyboard Shortcuts:**
- `/` - Focus search input
- `Esc` - Clear search
- `Ctrl+1/2/3` - Toggle status filters

### 2. Integration into `app/page.tsx`

**Add above office grid:**
```tsx
<AgentSearchFilter
  agents={agents}
  onFilterChange={setFilteredAgents}
  theme={theme}
  isMobile={isMobile}
/>

{/* Office grid now uses filteredAgents instead of agents */}
<div className="office-grid">
  {filteredAgents.map(agent => <AgentCard ... />)}
</div>
```

**State management:**
```tsx
const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
```

### 3. Fuzzy Search Algorithm

Simple substring match (fast enough for <100 agents):

```typescript
function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  return t.includes(q);
}

function filterAgents(agents: Agent[], query: string, status: string): Agent[] {
  let filtered = agents;

  // Status filter
  if (status === 'working') {
    filtered = filtered.filter(a => a.status === 'working');
  } else if (status === 'idle') {
    filtered = filtered.filter(a => a.status === 'idle');
  }

  // Search filter
  if (query.trim()) {
    filtered = filtered.filter(a => 
      fuzzyMatch(query, a.name || a.id) ||
      fuzzyMatch(query, a.role || '') ||
      fuzzyMatch(query, a.id)
    );
  }

  return filtered;
}
```

---

## Mobile Considerations

- Stack search + filters vertically on narrow screens
- Reduce font sizes
- Use pill buttons for status filters
- Search input expands on focus

---

## Analytics

Track via existing analytics:
- Search usage rate
- Filter usage rate  
- Time to find agent (before/after)

---

## Future Enhancements (Out of Scope)

- Save search/filter preferences
- Advanced filters (by XP, level, last active)
- Multi-select agents for bulk actions
- Agent tags/categories

---

## Acceptance Checklist

- [ ] Component built and styled
- [ ] Search filters agents by name/id/role
- [ ] Status filters work (All/Working/Idle)
- [ ] Keyboard shortcuts work (/ and Esc)
- [ ] Responsive on mobile
- [ ] No performance lag with 50+ agents
- [ ] Integrates cleanly into page.tsx
- [ ] Git committed with clear message

---

**Target:** Ship in next 1-2 hours  
**Blocker:** None (can build independently)

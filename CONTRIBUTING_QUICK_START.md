# 🚀 Contributing Quick Start

**Want to contribute to OpenClawfice? Here's how to get started in 5 minutes.**

---

## Prerequisites

- Node.js 18+ installed
- Git installed
- OpenClaw installed (for testing)
- Basic knowledge of React/Next.js/TypeScript

---

## 1. Fork & Clone (1 minute)

```bash
# Fork the repo on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/openclawfice.git
cd openclawfice
```

---

## 2. Install Dependencies (1 minute)

```bash
npm install
```

---

## 3. Start Dev Server (30 seconds)

```bash
npm run dev
```

Opens at: http://localhost:3333

**Tip:** Use demo mode to develop without OpenClaw running:
http://localhost:3333/?demo=true

---

## 4. Make Your Changes (varies)

### Project Structure

```
openclawfice/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main office UI (3500+ lines)
│   ├── api/               # API routes
│   │   ├── office/        # Real data endpoints
│   │   └── demo/          # Demo mode endpoints
│   ├── demo/              # Demo redirect page
│   ├── landing/           # Marketing landing page
│   ├── showcase/          # Feature showcase page
│   └── install/           # Installation guide page
├── components/            # React components
│   ├── Celebration.tsx    # XP celebration animations
│   ├── DemoBanner.tsx     # Demo mode banner
│   ├── ShareModal.tsx     # Screenshot sharing modal
│   └── TemplateGallery.tsx # Quest templates modal
├── hooks/                 # Custom React hooks
│   ├── useDemoMode.ts     # Demo mode detection
│   └── useRetroSFX.ts     # Sound effects system
├── lib/                   # Utility libraries
├── public/                # Static assets
└── docs/                  # Documentation
```

### Key Files

**Main UI:** `app/page.tsx`
- HomePage component (main office)
- NPC rendering
- Room management
- Chat, quests, accomplishments
- Agent detail panels

**API Routes:**
- `/api/office/*` - Real OpenClaw data
- `/api/demo/*` - Simulated demo data

**Components:**
- Keep them small and focused
- Use inline styles (no Tailwind)
- TypeScript strict mode
- React 19 hooks

### Common Tasks

**Add a new feature:**
1. Update `app/page.tsx` with UI
2. Add API endpoint if needed
3. Update README.md feature list
4. Test in demo mode
5. Test with real OpenClaw

**Fix a bug:**
1. Find the issue (check console)
2. Fix in relevant file
3. Test thoroughly
4. Add to CHANGELOG.md

**Add documentation:**
1. Create or edit `.md` file
2. Link from README if needed
3. Keep it clear and concise

---

## 5. Test Your Changes (2 minutes)

### Manual Testing

```bash
# Test demo mode
open http://localhost:3333/?demo=true

# Test real mode (requires OpenClaw)
open http://localhost:3333

# Test mobile
# In browser: DevTools → Toggle device toolbar
```

### Build Testing

```bash
# Verify production build works
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### What to Test

- ✅ Does it work in demo mode?
- ✅ Does it work with real OpenClaw?
- ✅ Does it work on mobile?
- ✅ Are there console errors?
- ✅ Does the build succeed?

---

## 6. Commit Your Changes (1 minute)

```bash
git add .
git commit -m "feat: Add your feature description"

# Or for bugs:
# git commit -m "fix: Fix bug description"

# Or for docs:
# git commit -m "docs: Update documentation"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting)
- `refactor:` - Code refactor
- `test:` - Adding tests
- `chore:` - Build/config changes

---

## 7. Push & Create PR (1 minute)

```bash
git push origin your-branch-name
```

Then on GitHub:
1. Go to your fork
2. Click "Pull Request"
3. Fill in description (what, why, how)
4. Submit!

**PR Template:**

```markdown
## What
Brief description of changes

## Why
Problem being solved or feature being added

## How
Technical approach taken

## Testing
- [ ] Tested in demo mode
- [ ] Tested with OpenClaw
- [ ] Tested on mobile
- [ ] Build succeeds
```

---

## Development Tips

### Hot Reload

Dev server supports hot reload - just save files and the browser updates automatically.

### Demo Mode

Use `?demo=true` for development without OpenClaw:
- Faster iteration
- No need to configure agents
- Simulates live data

### Debugging

```typescript
// Add console logs
console.log('Debug:', variable);

// Check state
console.log('Agents:', agents);

// Check API responses
fetch('/api/office').then(r => r.json()).then(console.log);
```

### Common Issues

**Port 3333 in use:**
```bash
lsof -ti :3333 | xargs kill -9
npm run dev
```

**Build fails:**
```bash
rm -rf .next
npm run build
```

**TypeScript errors:**
```bash
npx tsc --noEmit
# Fix errors shown
```

---

## Code Style

- **TypeScript:** Use types for everything
- **Styles:** Inline styles, no Tailwind (matches retro aesthetic)
- **Formatting:** Consistent with existing code
- **Naming:** Descriptive variable names
- **Comments:** Explain complex logic
- **Components:** Small, focused, reusable

### Example Component

```typescript
'use client';

import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => {
        setActive(!active);
        onClick?.();
      }}
      style={{
        background: active ? '#3b82f6' : '#1e293b',
        padding: 12,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {title}
    </div>
  );
}
```

---

## Feature Ideas

**Good First Issues:**
- Add new quest templates
- Improve mobile layout
- Add keyboard shortcuts
- Create new themes/color schemes
- Add agent customization options

**Medium Complexity:**
- Add more sound effects
- Create new room types
- Enhance animations
- Add chart/graph visualizations
- Improve accessibility

**Advanced:**
- Multi-user support
- Remote OpenClaw connections
- Real-time collaboration
- Agent AI integration
- Performance optimizations

---

## Resources

- **Main Docs:** [README.md](./README.md)
- **Quick Reference:** [QUICK-REFERENCE.md](./QUICK-REFERENCE.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Full Guidelines:** [CONTRIBUTING.md](./CONTRIBUTING.md)

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs

---

## Getting Help

**Stuck? Ask for help:**

1. **Check existing docs** - Likely already answered
2. **Search issues** - Someone may have asked
3. **Ask in Discord** - #openclawfice channel
4. **Open discussion** - GitHub Discussions

**Don't be shy!** We're here to help. Contributing to open source is a learning experience.

---

## Community Guidelines

- **Be kind** - Respectful, helpful, inclusive
- **Be patient** - Reviews take time
- **Be open** - Accept feedback gracefully
- **Be collaborative** - We're building together

---

## Recognition

Contributors are credited in:
- CHANGELOG.md (each release)
- README.md (major features)
- GitHub contributors page

---

## Quick Checklist

Before submitting a PR:

- [ ] Code works in demo mode
- [ ] Code works with OpenClaw
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)
- [ ] TypeScript passes (`npx tsc --noEmit`)
- [ ] Mobile responsive
- [ ] Documentation updated (if needed)
- [ ] Commit messages clear
- [ ] PR description complete

---

## That's It!

You're ready to contribute! Pick an issue, make changes, and submit a PR.

**Welcome to the OpenClawfice community!** 🎉

---

**Questions?** Join our [Discord](https://discord.gg/clawd) or open a [Discussion](https://github.com/openclawfice/openclawfice/discussions).

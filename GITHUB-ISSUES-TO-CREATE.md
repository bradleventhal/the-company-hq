# GitHub Issues to Create

These are ready to copy-paste into GitHub Issues. Created from fresh install audit.

---

## Issue #1: Add OpenClaw detection and helpful error messages

**Labels:** `bug`, `p0`, `dx`, `good first issue`

**Title:** Show specific error when OpenClaw isn't installed

**Description:**

### Problem
When a new user installs OpenClawfice but doesn't have OpenClaw installed, they see a generic "office is empty" message. They can't tell if:
- OpenClaw isn't installed
- OpenClaw is installed but not configured  
- Something else is wrong

This kills conversions instantly - users bounce thinking the app is broken.

### Current Behavior
Empty state shows:
```
Welcome to OpenClawfice!
Your virtual office is empty. Let's fix that.

✅ Make sure OpenClaw is running
✅ Agents appear automatically from ~/.openclaw/openclaw.json
✅ Send a message in OpenClaw to wake them up
```

### Expected Behavior
Empty state should diagnose the actual problem:
```
🏢 Office Empty

Checking your setup...
✅ OpenClawfice installed
✅ Running on port 3333
❌ OpenClaw not detected

Install OpenClaw to get started:
[Copy Install Command] curl -fsSL https://openclaw.ai/install.sh | bash

Or visit: https://openclaw.ai/install
```

### Technical Solution

1. Add detection in `app/api/office/route.ts`:
```typescript
function checkOpenClawSetup() {
  const openclawBin = join(homedir(), '.local', 'node', 'bin', 'openclaw');
  
  if (!existsSync(openclawBin)) {
    return { 
      status: 'not_installed',
      message: 'OpenClaw binary not found',
      action: 'Install OpenClaw first'
    };
  }
  
  if (!existsSync(OPENCLAW_CONFIG)) {
    return { 
      status: 'not_configured',
      message: 'No agents configured',
      action: 'Configure at least one agent'
    };
  }
  
  return { status: 'ok' };
}
```

2. Return this in the `/api/office` response
3. Update empty state UI to show specific message + action

### Files to Change
- `app/api/office/route.ts` - Add detection logic
- `app/page.tsx` - Update empty state UI
- `INSTALL.md` - Reference this diagnostic

### Priority
**P0** - Must fix before driving traffic to the site

### Related
See `TOP-3-INSTALL-BLOCKERS.md` for full audit

---

## Issue #2: Handle port 3333 conflicts gracefully

**Labels:** `enhancement`, `p1`, `dx`

**Title:** Better error when port 3333 is already in use

**Description:**

### Problem
When port 3333 is already in use, Next.js throws a cryptic error. New users think the install is broken.

This is common because:
- They're running another dev server
- Previous OpenClawfice instance is still running
- Something else claimed the port

### Current Behavior
```
Error: listen EADDRINUSE: address already in use :::3333
```
User has no idea what to do.

### Expected Behavior

**Option 1: Auto-fallback**
Try 3333, if busy try 3334, 3335, etc. and show which port it chose:
```
⚠️  Port 3333 in use, trying 3334...
✓ OpenClawfice running on http://localhost:3334
```

**Option 2: Clear error**
```
❌ Port 3333 is already in use

To use a different port:
npm run dev -- --port 3334

Or kill the process using port 3333:
lsof -ti:3333 | xargs kill
```

### Technical Solution

Add port detection to dev script:
```json
// package.json
{
  "scripts": {
    "dev": "node scripts/dev-server.js",
    "dev:force": "next dev --port 3333"
  }
}
```

```javascript
// scripts/dev-server.js
const { execSync } = require('child_process');
const getPort = require('get-port');

async function start() {
  const port = await getPort({ port: [3333, 3334, 3335, 3336] });
  
  if (port !== 3333) {
    console.log(`⚠️  Port 3333 in use, using ${port} instead`);
  }
  
  execSync(`next dev --port ${port}`, { stdio: 'inherit' });
}

start();
```

### Alternative: Just Document It
Add to INSTALL.md:
```markdown
**Troubleshooting: Port already in use?**

If you see `EADDRINUSE` error:
```bash
# Use a different port
npm run dev -- --port 3334

# Or kill the process on 3333
lsof -ti:3333 | xargs kill
```
```

### Files to Change
- `package.json` - Add dev-server script
- `scripts/dev-server.js` - Create port fallback logic
- `INSTALL.md` - Document port configuration

### Priority
**P1** - Common issue, needs solution or clear docs

---

## Issue #3: Add progress feedback during npm install

**Labels:** `enhancement`, `p1`, `dx`, `good first issue`

**Title:** Show install progress and success message

**Description:**

### Problem
`npm install` takes 30-60 seconds with no feedback. Terminal sits silent. Users think it's frozen and abandon.

### Current Behavior
```bash
$ npm install
[... 45 seconds of silence ...]
```

### Expected Behavior
```bash
$ npm install
Installing OpenClawfice dependencies...
This usually takes 30-60 seconds.

[npm output...]

✅ OpenClawfice installed successfully!
🚀 Next: npm run dev
📖 Docs: http://localhost:3333/help
```

### Technical Solution

Add postinstall script:
```json
// package.json
{
  "scripts": {
    "postinstall": "node scripts/postinstall.js"
  }
}
```

```javascript
// scripts/postinstall.js
console.log('\n✅ OpenClawfice installed successfully!\n');
console.log('🚀 Start the server:');
console.log('   npm run dev\n');
console.log('📖 Then open: http://localhost:3333\n');
console.log('💡 First time? Visit /help for setup guide\n');
```

Also update INSTALL.md to set expectations:
```markdown
### Step 2: Install dependencies
```bash
npm install
```

**This takes 30-60 seconds depending on your connection.**

Don't worry if it looks stuck - npm is downloading packages.
You'll see a ✅ when it's done.
```

### Files to Change
- `package.json` - Add postinstall script
- `scripts/postinstall.js` - Create success message
- `INSTALL.md` - Set expectations

### Priority
**P1** - Quick win, reduces confusion and abandonment

---

## How to Create These Issues

1. Go to https://github.com/openclawfice/openclawfice/issues/new
2. Copy-paste each issue above
3. Add labels as specified
4. Assign to @Forge (DaftMonk) or leave unassigned
5. Add to "Pre-Launch" milestone if it exists

Or use GitHub CLI:
```bash
# Issue 1
gh issue create --title "Show specific error when OpenClaw isn't installed" \
  --label "bug,p0,dx,good first issue" \
  --body-file issue-1.md

# Issue 2  
gh issue create --title "Better error when port 3333 is already in use" \
  --label "enhancement,p1,dx" \
  --body-file issue-2.md

# Issue 3
gh issue create --title "Show install progress and success message" \
  --label "enhancement,p1,dx,good first issue" \
  --body-file issue-3.md
```

---

## Next Steps

1. Create these 3 issues
2. Forge picks them up and fixes before traffic push
3. Test on fresh VM to validate fixes
4. Update INSTALL.md with learnings
5. Consider adding `npm run check` validation command (separate issue)

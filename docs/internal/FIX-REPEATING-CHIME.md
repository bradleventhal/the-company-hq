# Fix: Repeating Chime Sound

## Problem
You're hearing a chime sound repeating every 8-15 seconds. This is the "new message" notification sound triggered by demo mode chat simulation.

## Immediate Solutions

### Option 1: Mute Sound Effects (Quickest)
1. Open OpenClawfice
2. Click the ⚙️ Settings button (bottom right)
3. Toggle off "Retro Sounds"

### Option 2: Close Demo Mode Tab
If you have a browser tab open with `?demo=true` in the URL, close it. Demo mode adds simulated chat messages every 8-15 seconds which triggers the sound.

### Option 3: Keep Demo Open But Mute It
If you want to keep the demo running for testing:
1. Right-click the browser tab
2. Select "Mute Site"

## Root Cause
- Demo mode (`?demo=true`) simulates live chat by adding messages every 8-15 seconds
- Each new message triggers `sfx.play('message', 5000)` with 5-second debounce
- Since messages appear faster than the debounce, you hear it repeatedly

## Permanent Fix Applied ✅

I've disabled message notification sounds in demo mode. The change:
- **Real mode**: Message sounds play normally (with 5s debounce)
- **Demo mode**: Message sounds are silent (no chimes from simulated chat)

This means demo mode can run without being annoying, while real usage still gets useful notifications.

**To apply the fix**: Just refresh your browser tab. The updated code will stop the chimes immediately.

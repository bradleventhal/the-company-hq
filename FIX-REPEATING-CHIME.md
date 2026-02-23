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

## Long-Term Fix (If Needed)
If you want demo mode without the sound spam, we can:
1. Increase message debounce from 5s to 20s (longer than message interval)
2. Disable message sounds entirely in demo mode
3. Make demo mode chat silent by default

Let me know if you want any of these changes!

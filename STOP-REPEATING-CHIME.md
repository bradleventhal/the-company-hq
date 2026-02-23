# Stop Repeating Chime (Emergency Fix)

**Problem:** Hearing a chime that repeats over and over.

**Likely causes:**
1. System notification loop
2. Browser tab with alerts
3. Screen recording notifications
4. macOS notification center

---

## Quick Fix (Applied)

✅ **System audio muted**
✅ **Notification sounds disabled**
✅ **Chrome notifications disabled**
✅ **Recording processes killed**

The chime should be stopped now.

---

## If It's Still Happening

### Check Open Browser Tabs

```bash
# Close all Chrome windows
osascript -e 'quit app "Google Chrome"'

# Or close specific OpenClawfice tabs
# Visit chrome://tabs/ and close any localhost:3333 tabs
```

### Check for Background Processes

```bash
# Look for processes that might make sounds
ps aux | grep -E "afplay|say|screencapture|audio" | grep -v grep

# Kill any suspicious ones
killall -9 afplay say screencapture
```

### Disable macOS Notifications Temporarily

```bash
# Turn on Do Not Disturb
shortcuts run "Turn On Do Not Disturb"

# Or manually: Control Center → Focus → Do Not Disturb
```

---

## Root Causes to Check

### 1. Screen Recording Notifications

If you're recording the screen frequently (accomplishments), macOS might chime on each recording start.

**Fix:** Disable recording start sound:
```bash
defaults write com.apple.screencapture "disable-capture-sound" -bool true
killall SystemUIServer
```

### 2. Browser Notifications

OpenClawfice or another web app might be sending repeated notifications.

**Fix:** Check Chrome notification permissions:
```
chrome://settings/content/notifications
```
Block notifications from localhost:3333 if needed.

### 3. System Alerts Loop

Something might be triggering repeated system alerts.

**Fix:** Check Console app for repeating messages:
```bash
open /Applications/Utilities/Console.app
```
Look for repeated errors or warnings.

### 4. Third-Party App

Another app (Slack, Discord, etc.) might be the culprit.

**Fix:** Quit all apps one by one to isolate:
```bash
osascript -e 'quit app "Slack"'
osascript -e 'quit app "Discord"'
# etc.
```

---

## Restore Normal Audio

Once chime is stopped, restore audio:

```bash
# Unmute system
osascript -e "set volume output muted false"

# Restore notification sounds
defaults delete com.apple.systemsound "com.apple.sound.beep.volume"
defaults delete com.apple.systemsound "com.apple.sound.uiaudio.enabled"

# Restore Chrome notifications (if wanted)
defaults delete com.google.Chrome DefaultNotificationsSetting
```

---

## Prevent Future Chimes

### Disable Screen Capture Sounds Permanently

```bash
defaults write com.apple.screencapture "disable-capture-sound" -bool true
killall SystemUIServer
```

### Keep System Volume Lower

```bash
# Set to 20%
osascript -e "set volume output volume 20"
```

### Use Do Not Disturb During Work

```bash
# Enable DND
shortcuts run "Turn On Do Not Disturb"
```

---

## Debug: Find the Exact Source

If you can't isolate the source:

1. **Timing:** When does the chime happen?
   - Every X seconds? (likely a loop)
   - On specific actions? (likely a trigger)
   - Random? (likely browser notification)

2. **Pattern:** How many chimes?
   - Single chime repeating? (notification loop)
   - Double chime? (system alert)
   - Triple chime? (recording start/stop)

3. **Volume:** Where's it coming from?
   - System speakers? (macOS)
   - Browser? (web app)
   - External app? (third-party)

---

## Emergency Nuclear Option

If nothing else works:

```bash
# Mute everything
sudo killall coreaudiod

# This will kill all audio. Reboot to restore.
```

⚠️ Only use this as last resort - requires reboot to restore audio.

---

## Status

Applied quick fix:
- ✅ System muted
- ✅ Notifications disabled
- ✅ Chrome notifications disabled

Chime should be stopped. If it persists, work through the checklist above.

**Most likely culprit:** Screen recording start sound (from accomplishment system).
**Permanent fix:** Disable capture sound with command above.

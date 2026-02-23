# Disable Recording Audio (Fix Annoying Sounds)

**Problem:** Accomplishment recordings trigger macOS `say` command which speaks the title out loud.

**Quick Fix:** Disable TTS audio in the recording script.

---

## Option 1: Disable Audio (Recommended)

Edit the recording script to skip TTS:

```bash
# Open the script
nano ~/.openclaw/.status/record-accomplishment.sh
```

**Comment out the TTS line (line 14):**

Change this:
```bash
say -o "$AUDIO_FILE" --rate=180 "$TTS_TEXT"
```

To this:
```bash
# say -o "$AUDIO_FILE" --rate=180 "$TTS_TEXT"  # DISABLED: Too annoying
```

**Also comment out the audio merge (lines 20-27):**

Change this:
```bash
ffmpeg -y -i "$VIDEO_FILE" -i "$AUDIO_FILE" \
  -vf "scale=1280:-2" \
  -c:v libx264 -preset fast -crf 28 \
  -c:a aac -b:a 128k \
  -shortest \
  -movflags +faststart \
  "$FINAL_FILE" 2>/dev/null
```

To this:
```bash
# Just copy the video without audio
cp "$VIDEO_FILE" "$FINAL_FILE"
```

Save and exit (Ctrl+X, Y, Enter).

---

## Option 2: Disable Recordings Entirely

If you don't want any screen recordings:

```bash
# Make the script a no-op
echo '#!/bin/bash' > ~/.openclaw/.status/record-accomplishment.sh
echo 'echo "recording-disabled"' >> ~/.openclaw/.status/record-accomplishment.sh
chmod +x ~/.openclaw/.status/record-accomplishment.sh
```

Accomplishments will still save, just without video attachments.

---

## Option 3: Lower System Volume

Temporary fix while keeping TTS:

```bash
# Mute system audio
osascript -e "set volume output muted true"

# Or lower volume to 10%
osascript -e "set volume output volume 10"
```

---

## Verify It's Fixed

1. Post a test accomplishment:
```bash
curl -s -X POST http://localhost:3333/api/office/actions \
  -H "Content-Type: application/json" \
  -d '{"type":"add_accomplishment","accomplishment":{"icon":"🧪","title":"Test - no audio","detail":"Testing silent recording","who":"Test"}}'
```

2. Wait 6 seconds (recording duration)
3. Should be silent now!

---

## Why This Happened

The accomplishment system uses macOS `screencapture` + `say` to create "Loom-style" videos with voiceover. Great for demos, annoying during development.

**Best practice:** Disable TTS during development, re-enable for demo recordings.

---

## Restore Audio Later

To re-enable audio, undo the changes above or restore the original script:

```bash
# Backup exists at
cat ~/.openclaw/.status/record-accomplishment.sh.backup 2>/dev/null || echo "No backup found"
```

---

**Status:** Quick fix documented. Apply Option 1 to stop the sounds immediately.

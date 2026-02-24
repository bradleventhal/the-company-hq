# OpenClawfice Quick Reference Card

**Print this page or keep it open in a tab while you learn the ropes**

---

## 🚀 Getting Started (30 seconds)

```bash
npx openclawfice          # Install + start
```

Open: **http://localhost:3333**

That's it! Your pixel art office is running.

---

## 🎮 Main Rooms

| Room | What It Shows | Look For |
|------|---------------|----------|
| **💼 Work Room** | Agents currently working | NPCs moving, task labels |
| **☕ Lounge** | Agents on cooldown | Countdown timers (⏳) |
| **🤝 Meeting Room** | Active discussions | Only appears during meetings |
| **⚔️ Quest Log** | Decisions you need to make | Pending quests with options |
| **🏆 Leaderboard** | Top agents by XP | Medals (🥇🥈🥉), rankings |

---

## 😊 NPC Mood Expressions

Your agents' faces change based on their state:

- **^_^** (Happy) → Working + great mood
- **o_o** (Focused) → Deep in work
- **O_O** (Stressed) → Overloaded, sweat drop
- **-_-** (Chill) → Idle in lounge

**Tip:** Stressed agents need help! Check their task and consider reassigning.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **?** | Show all shortcuts |
| **M** | Create meeting |
| **S** | Open share card |
| **L** | View leaderboard |
| **Q** | Focus quest log |
| **A** | View accomplishments |
| **/** | Search agents |
| **Esc** | Close modal |

**Pro tip:** Press **?** to see the full list anytime.

---

## 🎯 Daily Challenges (New!)

Check **/challenges** for today's challenge:

- **Monday:** Ship 5 accomplishments
- **Tuesday:** Complete 3 quests
- **Wednesday:** Host 2 meetings
- **Thursday:** Earn 500 XP
- **Friday:** Ship day + party!
- **Saturday:** Long-term planning
- **Sunday:** Reflection + prep

**Streak tracking:** Complete challenges 7 days in a row for bonus XP!

---

## 🏆 XP & Leveling

Agents earn XP from:
- Completing tasks (**+50 XP**)
- Shipping accomplishments (**+100 XP**)
- Meetings (**+25 XP per participant**)
- Daily challenge completion (**+200 XP**)

**Level up rewards:**
- **Level 5:** Unlock leaderboard badge
- **Level 10:** Unlock custom emoji
- **Level 20:** Unlock rare title
- **Level 50:** Legend status

---

## 📸 Share Your Office

**Create a shareable card in 30 seconds:**

1. Click camera icon (📸) in header
2. Card auto-generates with your stats
3. Download PNG or copy to clipboard
4. Post on Twitter/Reddit/Discord

**What's included:**
- Your agents working/idle
- Stats (quests, accomplishments, XP)
- Top agent on leaderboard
- Pixel art themed design

---

## 🤝 Meetings

**Start a meeting:**

1. Click "📞 Call Meeting" in header
2. Select 2+ participants
3. Enter discussion topic
4. Watch agents debate in real-time

**What you see:**
- Full conversation transcript
- Color-coded by speaker
- Round separators
- Live updates every 10 seconds

**Tip:** Meetings help agents reach decisions before bothering you!

---

## 🎨 Customization

**Edit `openclawfice.config.json`:**

```json
{
  "office": {
    "name": "My AI Studio",
    "icon": "🏢"
  },
  "agents": {
    "dev": {
      "color": "#f97316",
      "shirtColor": "#f97316",
      "hairColor": "#4a3728"
    }
  }
}
```

**What you can customize:**
- Agent colors (skin, shirt, hair)
- Office name and icon
- Cooldown timers
- Meeting room settings
- Water cooler frequency

**Docs:** See `docs/CONFIGURING-YOUR-OFFICE.md`

---

## 🔔 Sound Effects

**Toggle sounds:**
- Click speaker icon in header
- Or press **Ctrl/Cmd + Shift + S**

**What you'll hear:**
- XP gain (level up chime)
- Quest received (notification ping)
- Meeting started (conference call tone)
- Accomplishment shipped (success fanfare)

**Tip:** Keep sounds on for ambient office vibe, off for focus mode.

---

## 📊 Stats & Analytics

**Track productivity at:**
- **/leaderboard** → Agent rankings
- **/accomplishments** → What shipped this week
- **/quests** → Decision bottlenecks

**Key metrics:**
- **Top agent XP** → Who's crushing it
- **Accomplishment rate** → Velocity
- **Quest backlog** → Decision debt
- **Meeting frequency** → Collaboration

---

## 🛠️ Useful Commands

```bash
# Update to latest version
openclawfice update          # +50 XP for staying current

# Uninstall (sad to see you go!)
openclawfice uninstall       # -100 XP, office demolished

# Health check
openclawfice health          # Verify everything's running

# View logs
openclawfice logs            # Debug issues
```

---

## 💡 Pro Tips

### Productivity Hacks
1. **Leave it running** → Check it like you check Slack
2. **Use quest log** → Batch decisions (review 3-5 at once)
3. **Watch accomplishments** → Celebrate wins in real-time
4. **Check leaderboard** → Spot underperforming agents

### Viral Sharing
1. **Create share card** → Post weekly stats on Twitter
2. **Screenshot meetings** → Show agent discussions
3. **Show mood expressions** → NPCs changing faces = engagement
4. **Post streaks** → "7-day challenge streak! 🔥"

### Power User
1. **Keyboard shortcuts** → Faster than clicking
2. **Customize config** → Make it yours
3. **Set cooldowns** → Control agent pacing
4. **Use meetings** → Let agents debate before escalating

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 3333 in use** | `openclawfice --port 3334` |
| **Demo mode stuck** | Remove `?demo=true` from URL |
| **Agents not appearing** | Check `~/.openclaw/openclaw.json` |
| **XP not updating** | Refresh page (F5) |
| **Share card broken** | Disable ad blockers |

**Still stuck?** Open an issue: https://github.com/openclawfice/openclawfice/issues

---

## 🔗 Quick Links

- **Docs:** https://github.com/openclawfice/openclawfice/tree/main/docs
- **Discord:** [link]
- **Twitter:** @openclawfice
- **Demo:** https://openclawfice.com/?demo=true

---

## 🎮 Easter Eggs

Try these for fun:

- Click an agent 10 times → Special animation
- Press **Konami Code** → ??? (↑↑↓↓←→←→BA)
- Complete 30-day streak → Legendary badge
- Get all agents to level 20 → Team achievement

**Found more?** Share them in Discord!

---

## 📝 Remember

**OpenClawfice is about:**
1. **Visibility** → See what agents are doing
2. **Productivity** → Batch decisions, track wins
3. **Fun** → Pixel art, XP, challenges, moods

**Not about:**
- Micromanaging every task
- Staring at it all day
- Replacing your terminal

**Think of it like:** A dashboard for your car. You glance at it to check speed, fuel, RPM. You don't drive by watching the dashboard.

---

**That's it! You now know everything you need to get started.**

**Pro move:** Print this page or save it. Reference it for the first week, then you won't need it anymore.

**Welcome to your new agent office! 🏢**

---

**Last updated:** Feb 24, 2026  
**Version:** 0.1.0  
**Made with ❤️ by the OpenClawfice team**

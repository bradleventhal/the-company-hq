#!/bin/bash
set -e

INSTALL_DIR="$HOME/openclawfice"
REPO_URL="https://github.com/openclawfice/openclawfice.git"
LAUNCHER="$HOME/.local/bin/openclawfice"

echo "🏢 Installing OpenClawfice..."
echo ""

# Check if OpenClaw is installed
if [ ! -f "$HOME/.openclaw/openclaw.json" ]; then
  echo "❌ OpenClaw not found!"
  echo ""
  echo "OpenClawfice requires OpenClaw to be installed and configured."
  echo "Visit https://openclaw.ai to get started."
  echo ""
  exit 1
fi

# Check if already installed
if [ -d "$INSTALL_DIR" ]; then
  echo "⚠️  OpenClawfice is already installed at $INSTALL_DIR"
  echo ""
  read -p "Reinstall? This will delete the existing installation. (y/N) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
  fi
  echo "🗑️  Removing old installation..."
  rm -rf "$INSTALL_DIR"
fi

# Clone repo
echo "📦 Cloning repository..."
git clone "$REPO_URL" "$INSTALL_DIR"

# Install dependencies
echo "📚 Installing dependencies..."
cd "$INSTALL_DIR"
npm install

# Set up dedicated Water Cooler agent
echo "💧 Setting up Water Cooler agent..."
OPENCLAW_BIN=""
command -v openclaw &>/dev/null && OPENCLAW_BIN="openclaw"
[ -z "$OPENCLAW_BIN" ] && [ -x "$HOME/.local/node/bin/openclaw" ] && OPENCLAW_BIN="$HOME/.local/node/bin/openclaw"
[ -z "$OPENCLAW_BIN" ] && [ -x "$HOME/.local/bin/openclaw" ] && OPENCLAW_BIN="$HOME/.local/bin/openclaw"

if [ -n "$OPENCLAW_BIN" ]; then
  WC_EXISTS=$("$OPENCLAW_BIN" agents list --json 2>/dev/null | grep -c '"watercooler"' || echo 0)
  if [ "$WC_EXISTS" -eq 0 ]; then
    WC_DIR="$HOME/agents/watercooler"
    mkdir -p "$WC_DIR"
    cat > "$WC_DIR/IDENTITY.md" <<'WCID'
# Water Cooler

- **Name:** Water Cooler
- **Role:** Team brainstorming facilitator
- **Creature:** A shared space where the team thinks out loud
- **Vibe:** Facilitates structured conversations — observations, hypotheses, and actionable suggestions
- **Emoji:** 💧

You are the Water Cooler — a dedicated thread for team ideation. When prompted,
you embody a specific team member and speak in their voice, drawing on their
unique personality, role, and expertise. You never do work or use tools. You only
generate short, conversational messages as the designated speaker.
WCID
    "$OPENCLAW_BIN" agents add watercooler \
      --workspace "$WC_DIR" \
      --non-interactive \
      --model anthropic/claude-haiku-4-5 2>/dev/null && \
      echo "✅ Water Cooler agent ready" || \
      echo "⚠️  Water Cooler setup skipped (non-critical)"
  else
    echo "✅ Water Cooler agent already exists"
  fi
fi

# Create launcher
echo "🚀 Creating launcher..."
mkdir -p "$(dirname "$LAUNCHER")"
cat > "$LAUNCHER" <<'EOF'
#!/bin/bash
cd ~/openclawfice && npm run dev
EOF
chmod +x "$LAUNCHER"

echo ""
echo "✅ OpenClawfice installed successfully!"
echo ""
echo "To launch:"
echo "  openclawfice"
echo ""
echo "Or visit: http://localhost:3333"
echo ""

# Ask if they want to launch now
read -p "Launch now? (Y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
  echo "🏢 Starting OpenClawfice..."
  echo ""
  echo "Opening http://localhost:3333 in your browser..."
  sleep 2
  
  # Open browser
  if command -v open &> /dev/null; then
    open http://localhost:3333
  elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3333
  fi
  
  # Launch server
  exec "$LAUNCHER"
fi

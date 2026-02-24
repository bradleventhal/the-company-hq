#!/bin/bash

# Final Pre-Launch Verification
# Run this before launching to ensure everything is perfect

echo "🚀 OpenClawfice Launch Readiness Check"
echo "======================================"
echo ""

PASS=0
FAIL=0

check() {
  if [ $? -eq 0 ]; then
    echo "✅ $1"
    ((PASS++))
  else
    echo "❌ $1"
    ((FAIL++))
  fi
}

# 1. Server responds
echo "1️⃣  Server Health"
curl -s http://localhost:3333/api/demo > /dev/null 2>&1
check "Server responding at localhost:3333"

# 2. Demo mode works
curl -s "http://localhost:3333/?demo=true" | grep -q "Demo Mode" 2>/dev/null
check "Demo mode accessible"

# 3. API returns data
AGENTS=$(curl -s http://localhost:3333/api/demo | grep -o '"agents"' | wc -l)
[ "$AGENTS" -gt 0 ]
check "Demo API returns agent data"

# 4. README exists and has content
[ -f README.md ] && [ $(wc -l < README.md) -gt 50 ]
check "README.md exists and has content"

# 5. Demo GIF exists
[ -f public/openclawfice-demo.gif ]
check "Demo GIF exists (public/openclawfice-demo.gif)"

# 6. Install script exists
[ -f public/install.sh ]
check "Install script exists (public/install.sh)"

# 7. Key docs exist
for doc in QUICKSTART.md TROUBLESHOOTING.md CONTRIBUTING.md; do
  [ -f "$doc" ]
  check "$doc exists"
done

# 8. Git is clean (or has intentional changes)
echo ""
echo "8️⃣  Git Status"
if [ -z "$(git status --porcelain)" ]; then
  echo "✅ Git working directory is clean"
  ((PASS++))
else
  echo "⚠️  Uncommitted changes present:"
  git status --short | head -5
  echo "   (This is OK if team is actively working)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Result: $PASS passed, $FAIL failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $FAIL -eq 0 ]; then
  echo "🎉 READY TO LAUNCH!"
  echo ""
  echo "Next steps:"
  echo "1. Open LAUNCH-NOW.txt"
  echo "2. Copy the 2 commands"
  echo "3. Paste and send"
  echo "4. Done! 🚀"
  exit 0
else
  echo "⚠️  Fix issues above before launching"
  exit 1
fi

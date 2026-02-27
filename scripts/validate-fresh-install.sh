#!/bin/bash
# Fresh Install Validator for OpenClawfice
# Tests installation steps and catches common blockers
# Run this on a clean machine to validate the install flow

set -e  # Exit on error

BOLD='\033[1m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BOLD}OpenClawfice Fresh Install Validator${NC}"
echo "Testing installation flow for blockers..."
echo ""

# Track results
PASSED=0
FAILED=0
WARNINGS=0

# Test 1: Node.js version
echo -e "${BOLD}[1/10] Checking Node.js version...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo -e "${GREEN}✓${NC} Node.js $NODE_VERSION (>= 18 required)"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Node.js $NODE_VERSION is too old (18+ required)"
        echo "   Fix: Install Node.js 18+ from https://nodejs.org"
        ((FAILED++))
    fi
else
    echo -e "${RED}✗${NC} Node.js not found"
    echo "   Fix: Install Node.js from https://nodejs.org"
    ((FAILED++))
fi
echo ""

# Test 2: npm availability
echo -e "${BOLD}[2/10] Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm $NPM_VERSION installed"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} npm not found (usually comes with Node.js)"
    ((FAILED++))
fi
echo ""

# Test 3: Git availability
echo -e "${BOLD}[3/10] Checking git...${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} $GIT_VERSION"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} git not found"
    echo "   Fix: Install git from https://git-scm.com"
    ((FAILED++))
fi
echo ""

# Test 4: Port 3333 availability
echo -e "${BOLD}[4/10] Checking port 3333...${NC}"
if lsof -Pi :3333 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}✗${NC} Port 3333 is already in use"
    echo "   Process using it:"
    lsof -Pi :3333 -sTCP:LISTEN | grep -v COMMAND
    echo "   Fix: Kill the process or use --port 3334"
    ((FAILED++))
else
    echo -e "${GREEN}✓${NC} Port 3333 is available"
    ((PASSED++))
fi
echo ""

# Test 5: OpenClaw binary
echo -e "${BOLD}[5/10] Checking OpenClaw installation...${NC}"
OPENCLAW_BIN="$HOME/.local/node/bin/openclaw"
if [ -f "$OPENCLAW_BIN" ]; then
    echo -e "${GREEN}✓${NC} OpenClaw binary found at $OPENCLAW_BIN"
    ((PASSED++))
else
    echo -e "${YELLOW}!${NC} OpenClaw not installed (expected on fresh machine)"
    echo "   This is OK - user will see diagnostic screen with install instructions"
    ((WARNINGS++))
fi
echo ""

# Test 6: OpenClaw config
echo -e "${BOLD}[6/10] Checking OpenClaw configuration...${NC}"
OPENCLAW_CONFIG="$HOME/.openclaw/openclaw.json"
if [ -f "$OPENCLAW_CONFIG" ]; then
    echo -e "${GREEN}✓${NC} OpenClaw config found"
    # Validate JSON
    if jq empty "$OPENCLAW_CONFIG" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Config is valid JSON"
        # Check for agents
        AGENT_COUNT=$(jq '.agents.list | length' "$OPENCLAW_CONFIG" 2>/dev/null || echo "0")
        if [ "$AGENT_COUNT" -gt 0 ]; then
            echo -e "${GREEN}✓${NC} $AGENT_COUNT agent(s) configured"
            ((PASSED++))
        else
            echo -e "${YELLOW}!${NC} No agents configured (office will show empty state)"
            ((WARNINGS++))
        fi
    else
        echo -e "${RED}✗${NC} Config exists but is invalid JSON"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}!${NC} OpenClaw config not found (expected on fresh machine)"
    echo "   This is OK - user will see diagnostic screen"
    ((WARNINGS++))
fi
echo ""

# Test 7: npm install simulation
echo -e "${BOLD}[7/10] Simulating npm install...${NC}"
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json found"
    # Check for lockfile
    if [ -f "package-lock.json" ]; then
        echo -e "${GREEN}✓${NC} package-lock.json exists (faster install)"
    else
        echo -e "${YELLOW}!${NC} No package-lock.json (install will be slower)"
        ((WARNINGS++))
    fi
    # Check dependencies
    DEPS=$(jq '.dependencies | length' package.json)
    echo "   $DEPS dependencies to install"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} package.json not found (wrong directory?)"
    ((FAILED++))
fi
echo ""

# Test 8: Required files
echo -e "${BOLD}[8/10] Checking required files...${NC}"
REQUIRED_FILES=(
    "app/page.tsx"
    "app/api/office/route.ts"
    "app/api/demo/route.ts"
    "lib/auth.ts"
    "INSTALL.md"
    "README.md"
)
MISSING=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
        ((MISSING++))
    fi
done
if [ $MISSING -eq 0 ]; then
    ((PASSED++))
else
    echo -e "${RED}✗${NC} $MISSING required files missing"
    ((FAILED++))
fi
echo ""

# Test 9: Environment variables
echo -e "${BOLD}[9/10] Checking environment...${NC}"
if [ -f ".env.local" ] || [ -f ".env" ]; then
    echo -e "${YELLOW}!${NC} Environment file found (may contain secrets)"
    echo "   Make sure .env.local is in .gitignore"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} No .env files (using defaults)"
    ((PASSED++))
fi
echo ""

# Test 10: Documentation accuracy
echo -e "${BOLD}[10/10] Checking documentation...${NC}"
if [ -f "INSTALL.md" ]; then
    # Check if INSTALL.md mentions the correct port
    if grep -q "3333" INSTALL.md; then
        echo -e "${GREEN}✓${NC} INSTALL.md mentions correct port (3333)"
    else
        echo -e "${YELLOW}!${NC} INSTALL.md doesn't mention port 3333"
        ((WARNINGS++))
    fi
    
    # Check if it mentions OpenClaw prerequisite
    if grep -q -i "openclaw" INSTALL.md; then
        echo -e "${GREEN}✓${NC} INSTALL.md mentions OpenClaw prerequisite"
    else
        echo -e "${RED}✗${NC} INSTALL.md doesn't mention OpenClaw requirement"
        ((FAILED++))
    fi
    
    ((PASSED++))
else
    echo -e "${RED}✗${NC} INSTALL.md not found"
    ((FAILED++))
fi
echo ""

# Summary
echo -e "${BOLD}========================================${NC}"
echo -e "${BOLD}Validation Summary${NC}"
echo -e "${BOLD}========================================${NC}"
echo -e "${GREEN}Passed:${NC}   $PASSED tests"
echo -e "${RED}Failed:${NC}   $FAILED tests"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS tests"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}${BOLD}✓ Installation flow looks good!${NC}"
    echo "Ready for fresh install testing."
    exit 0
else
    echo -e "${RED}${BOLD}✗ Found $FAILED blocking issue(s)${NC}"
    echo "Fix these before testing fresh install."
    exit 1
fi

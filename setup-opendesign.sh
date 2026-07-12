#!/bin/bash
# Setup Script: Open Design + OpenCode Integration
# For UMKM Legalitas Project

echo "🚀 Setting up Open Design + OpenCode for UMKM Legalitas"
echo "=========================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check OS
OS="$(uname -s)"
case "$OS" in
    Linux*)     PLATFORM=Linux;;
    Darwin*)    PLATFORM=Mac;;
    CYGWIN*|MINGW*|MSYS*) PLATFORM=Windows;;
    *)          PLATFORM="UNKNOWN:$OS";;
esac

echo -e "${BLUE}Detected OS: $PLATFORM${NC}"
echo ""

# ============================================
# STEP 1: Check Prerequisites
# ============================================
echo -e "${YELLOW}Step 1: Checking Prerequisites${NC}"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        echo -e "${GREEN}✅ Node.js $(node -v)${NC}"
    else
        echo -e "${RED}❌ Node.js 18+ required. Current: $(node -v)${NC}"
        echo "Please upgrade Node.js: https://nodejs.org/"
        exit 1
    fi
else
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "Please install Node.js 18+: https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ npm $(npm -v)${NC}"
else
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    echo -e "${GREEN}✅ git $(git --version | awk '{print $3}')${NC}"
else
    echo -e "${RED}❌ git not found${NC}"
    exit 1
fi

echo ""

# ============================================
# STEP 2: Install OpenCode
# ============================================
echo -e "${YELLOW}Step 2: Installing OpenCode${NC}"

if command -v opencode &> /dev/null; then
    echo -e "${GREEN}✅ OpenCode already installed${NC}"
else
    echo "Installing OpenCode..."
    npm install -g @opencode-ai/opencode
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ OpenCode installed${NC}"
    else
        echo -e "${RED}❌ Failed to install OpenCode${NC}"
        exit 1
    fi
fi

echo ""

# ============================================
# STEP 3: Check API Keys
# ============================================
echo -e "${YELLOW}Step 3: Checking API Keys${NC}"

if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo -e "${GREEN}✅ ANTHROPIC_API_KEY set${NC}"
elif [ -n "$OPENAI_API_KEY" ]; then
    echo -e "${GREEN}✅ OPENAI_API_KEY set${NC}"
else
    echo -e "${YELLOW}⚠️  No API key set${NC}"
    echo ""
    echo "Please set one of the following:"
    echo "  export ANTHROPIC_API_KEY='your-key-here'"
    echo "  export OPENAI_API_KEY='your-key-here'"
    echo ""
    echo "Get your API key from:"
    echo "  Anthropic: https://console.anthropic.com/"
    echo "  OpenAI: https://platform.openai.com/"
    echo ""
fi

echo ""

# ============================================
# STEP 4: Download Open Design (Instructions)
# ============================================
echo -e "${YELLOW}Step 4: Open Design Setup${NC}"

echo "Open Design is a desktop app. Please download it manually:"
echo ""
echo -e "${BLUE}Download URL: https://open-design.ai/download${NC}"
echo ""

case "$PLATFORM" in
    Mac)
        echo "For macOS:"
        echo "  1. Download .dmg file"
        echo "  2. Open .dmg and drag to Applications"
        echo "  3. Open Open Design from Applications"
        ;;
    Linux)
        echo "For Linux:"
        echo "  1. Download AppImage"
        echo "  2. chmod +x OpenDesign.AppImage"
        echo "  3. ./OpenDesign.AppImage"
        ;;
    Windows)
        echo "For Windows:"
        echo "  1. Download .exe installer"
        echo "  2. Run installer"
        echo "  3. Open Open Design from Start Menu"
        ;;
esac

echo ""

# ============================================
# STEP 5: Project Setup
# ============================================
echo -e "${YELLOW}Step 5: Project Setup${NC}"

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Project directory: $PROJECT_DIR"

# Install dependencies
if [ -f "$PROJECT_DIR/package.json" ]; then
    echo "Installing project dependencies..."
    cd "$PROJECT_DIR"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  package.json not found. Skipping dependency install.${NC}"
fi

echo ""

# ============================================
# STEP 6: Verify Setup
# ============================================
echo -e "${YELLOW}Step 6: Verification${NC}"

echo ""
echo "Checking agent files..."

FILES=(
    "AGENT.md"
    "claude.md"
    "ARCHITECTURE.md"
    "MASTER-PROMPT.md"
    "CHECKPOINT.md"
    "DESIGN-BRIDGE.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$PROJECT_DIR/$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
    fi
done

echo ""

# ============================================
# STEP 7: Next Steps
# ============================================
echo -e "${GREEN}Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. ${YELLOW}Open Open Design${NC} desktop app"
echo "   Download: https://open-design.ai/download"
echo ""
echo "2. ${YELLOW}Generate design${NC} in Open Design"
echo "   Use prompt from DESIGN-BRIDGE.md"
echo ""
echo "3. ${YELLOW}Export design tokens${NC} from Open Design"
echo "   Export → Design Tokens → Save to project folder"
echo ""
echo "4. ${YELLOW}Run OpenCode Agent${NC}"
echo "   opencode --file AGENT.md --file DESIGN-BRIDGE.md 'Start Phase 1'"
echo ""
echo "5. ${YELLOW}Watch magic happen${NC} ✨"
echo ""

# Create .env.example if not exists
if [ ! -f "$PROJECT_DIR/.env.local" ] && [ -f "$PROJECT_DIR/.env.example" ]; then
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env.local"
    echo -e "${BLUE}Created .env.local from .env.example${NC}"
fi

echo ""
echo "Happy building! 🚀"

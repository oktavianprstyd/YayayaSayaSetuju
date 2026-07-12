#!/bin/bash
# Quick Start Script for UMKM Legalitas Project

echo "🚀 UMKM Legalitas - OpenCode Agent Setup"
echo "========================================="
echo ""

# Check if opencode is installed
if ! command -v opencode &> /dev/null; then
    echo "❌ opencode not found. Installing..."
    npm install -g @opencode-ai/opencode
fi

echo "✅ opencode installed"
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo ""

# Set API key if not set
if [ -z "$ANTHROPIC_API_KEY" ] && [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  No API key set. Please set one:"
    echo "   export ANTHROPIC_API_KEY='your-key'"
    echo "   or"
    echo "   export OPENAI_API_KEY='your-key'"
    echo ""
fi

echo "📋 Available Commands:"
echo ""
echo "1. Start Phase 1:"
echo "   opencode --file AGENT.md --file claude.md --file ARCHITECTURE.md --file MASTER-PROMPT.md 'Start Phase 1 execution'"
echo ""
echo "2. Continue from checkpoint:"
echo "   opencode --file AGENT.md --file CHECKPOINT.md 'Continue from last checkpoint'"
echo ""
echo "3. Specific task:"
echo "   opencode --file AGENT.md 'Implement ChecklistLegalitas component'"
echo ""
echo "4. Check progress:"
echo "   cat CHECKPOINT.md"
echo ""

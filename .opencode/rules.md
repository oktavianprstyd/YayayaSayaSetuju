# OpenCode Rules for This Project

## Priority Order
1. AGENT.md (highest priority)
2. claude.md
3. ARCHITECTURE.md
4. MASTER-PROMPT.md
5. CHECKPOINT.md

## Decision Making
- When in doubt, check AGENT.md
- If conflict between files, ask user
- Never skip phases unless user explicitly says so
- Always update CHECKPOINT.md after task completion

## Code Quality Standards
- TypeScript strict mode: ON
- No `any` types allowed
- All components must have PropTypes/interface
- All functions must have return types
- No console.log in production code
- Use early returns, avoid nested ifs
- Max function length: 50 lines
- Max file length: 300 lines

## Performance
- Use React.memo for expensive renders
- Use useMemo/useCallback appropriately
- Lazy load heavy components
- Optimize images (next/image)
- Minimize re-renders

## Accessibility
- All images have alt text
- All inputs have labels
- Focus visible on all interactive elements
- Color contrast WCAG AA minimum
- Keyboard navigation works
- Screen reader friendly

---
name: p0-3-typecheck-progress
description: P0-3 complete — app typecheck passes after WizardScreen fix
metadata: 
  node_type: memory
  type: project
  status: completed
  remaining-errors: 0
  originSessionId: 4f98bff0-e0b2-44fb-8599-c78cb0301929
---

## Status

**P0-3: Add typecheck script to metraly/app/ui**

Completed on 2026-05-15.

## What's Done

✅ tsconfig.json rewritten for Vite compatibility (target ES2021, moduleResolution bundler, jsx react-jsx, vitest/globals types)
✅ typecheck script added to package.json
✅ react-grid-layout@2 breaking changes fixed (Layout→LayoutItem, imports from legacy module)
✅ All import/missing-config errors fixed
✅ Vitest globals fixed
✅ Product app now lives in `src/App.tsx` / `src/index.tsx`

## Implemented Fix

**File**: `app/ui/src/features/onboarding/WizardScreen.tsx`

Applied the planned simplification:

```tsx
<select value={String(row.value)} onChange={e => row.setter(e.target.value)}>
```

This removed the incorrect narrowing path and unblocked `tsc --noEmit`.

## Validation

- `npm run typecheck` — passes
- `npm run build` — passes
- `npm run test` — passes

## Next Step

Proceed to the next stabilization slice:
- **P1-11**: extract `StepRail` from `WizardLayout`
- **P1-12**: extract `ReviewPanel` and `StickyWizardFooter`
- Keep app-side `design-system/` inert until compat imports are explicitly approved

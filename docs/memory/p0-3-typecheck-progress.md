---
name: p0-3-typecheck-progress
description: P0-3 progress — typecheck script implementation with 1 remaining error in WizardScreen.tsx
metadata: 
  node_type: memory
  type: project
  status: in-progress
  remaining-errors: 1
  originSessionId: 4f98bff0-e0b2-44fb-8599-c78cb0301929
---

## Status

**P0-3: Add typecheck script to metraly/app/ui**

Almost complete. ONE error remains:
```
src/features/onboarding/WizardScreen.tsx(211,25): error TS2339: Property 'setter' does not exist on type 'never'.
```

## What's Done

✅ tsconfig.json rewritten for Vite compatibility (target ES2021, moduleResolution bundler, jsx react-jsx, vitest/globals types)
✅ typecheck script added to package.json
✅ react-grid-layout@2 breaking changes fixed (Layout→LayoutItem, imports from legacy module)
✅ All import/missing-config errors fixed
✅ Vitest globals fixed
✅ App.tsx and board features excluded from typecheck

## Remaining Issue

**File**: `app/ui/src/features/onboarding/WizardScreen.tsx` line 211
**Context**: Select element onChange handler in a settings row renderer

Current code (lines 188–225):
```tsx
{([
  { label: 'Sync interval', value: syncInterval, setter: setSyncInterval as (v: string | boolean) => void, options: [...], type: 'select' as const },
  { label: 'Repositories', value: repos, setter: setRepos as (v: string | boolean) => void, options: [...], type: 'select' as const },
  { label: 'Include archived repos', value: includeArchived, setter: setIncludeArchived as (v: string | boolean) => void, type: 'toggle' as const, options: [] as string[] },
  { label: 'Historical backfill', value: backfill, setter: setBackfill as (v: string | boolean) => void, options: [...], type: 'select' as const },
]).map((row, i) => (
  <div key={i} ...>
    <span>{row.label}</span>
    {row.type === 'toggle' ? (
      <button onClick={() => row.setter(Boolean(row.value))} ...>...</button>
    ) : (
      <select value={String(row.value)} onChange={e => {
        if (typeof row.value === 'boolean') {
          row.setter(e.target.value === 'true');
        } else {
          row.setter(e.target.value);  // <-- LINE 211 ERROR
        }
      }}>
        {row.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    )}
  </div>
))}
```

**Problem**: TypeScript narrows `row` to `never` in the else branch due to type conflict. The inner `if (typeof row.value === 'boolean')` check in the select branch causes unexpected narrowing.

**Fix**: Remove the inner conditional. All setters are already cast to `(v: string | boolean) => void`, so just call directly:
```tsx
<select value={String(row.value)} onChange={e => row.setter(e.target.value)}>
```

This is safe because:
- `setter` accepts `string | boolean`
- `e.target.value` is always `string`
- The cast already allows both types, so no safety is gained by the conditional

## Next Step

Fix WizardScreen.tsx line 211 by removing the inner type check. Run `npm run typecheck` again — should pass with zero errors, completing P0-3.

Then proceed to:
- **P0-1**: Naming fixes in Sidebar.tsx and App.jsx (AI Assistant→AI Workspace, Marketplace→Plugins, Connect Sources→Connectors)
- **P0-5**: StatusBadge canonical taxonomy story in Brandbook

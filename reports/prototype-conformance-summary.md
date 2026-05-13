# Prototype Conformance Summary

## What changed
- Added the prototype-style widget-picker search rail to the preview hardening surface.
- Expanded the widget-picker catalog to cover selected, loading, new, delayed and disabled states.
- Corrected the `StateBadge` sample so the "new" example is actually `state="new"`.
- Fixed dashboard empty-state calls to use the supported `action` slot.
- Added an explicit accessible label to `DashboardDropZone`.
- Exported `MetralyTableRowMarker` from `@metraly/ui`.
- Pruned `site/app/components/previews/previews.css` to remove stale draft/dashboard/widget-registry selector families that no current preview components use.

## What was verified
- `npm run site:typecheck`
- `npm run site:build`
- Targeted Jest suite for the preview hardening surface and prototype-conformance pages
  - `site/__tests__/preview/ClaudeDesignStateBoard.test.tsx`
  - `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`
  - `site/__tests__/ui/Phase2DashboardPrimitives.test.tsx`
  - `site/__tests__/ui/Phase3TableAndComposition.test.tsx`
  - `site/__tests__/ui/Phase4Charts.test.tsx`

## Remaining caveat
- Headless browser navigation to `/components/previews` still timed out in this session, so the final screenshot comparison pass is not yet documented in-tool.

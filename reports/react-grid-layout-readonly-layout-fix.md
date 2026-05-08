# React Grid Layout readonly layout fix

Date: 2026-05-08

## Problem

Next.js production build failed in `site/app/components/dashboard/DashboardCanvas.tsx` because `react-grid-layout` exposes the `onLayoutChange` callback layout as a readonly `Layout`, while the dashboard repository layer expects a mutable `DashboardLayoutItem[]` snapshot.

Reported error:

```text
Type '(currentLayout: DashboardLayoutItem[]) => void' is not assignable to type '(layout: Layout, layouts: Partial<Record<string, Layout>>) => void'.
The type 'Layout' is 'readonly' and cannot be assigned to the mutable type 'DashboardLayoutItem[]'.
```

## Fix

`DashboardCanvas` no longer annotates the callback argument as a mutable array. It now accepts the inferred readonly layout from `react-grid-layout`, maps it into a fresh `DashboardLayoutItem[]`, and passes that copied snapshot to the editor state layer.

Changed file:

```text
site/app/components/dashboard/DashboardCanvas.tsx
```

## Why this is safer

- Keeps `react-grid-layout` callback typing intact.
- Avoids mutating library-owned readonly layout objects.
- Keeps the app persistence layer mutable and serializable.
- Preserves the existing editor lifecycle: drag, resize, save, reload.

## Validation notes

This fix was made against the exact build error from the local Next.js 16.2.6/Turbopack output. Full local validation still needs to be run in a dependency-installed environment:

```bash
npm run clean:legacy
npm run clean:install
npm install --no-audit --no-fund
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
```

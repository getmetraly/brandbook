# Dashboard Layer Migration

## Status

Completed as the next iteration after the `@metraly/ui` package foundation and form primitives migration.

## Step 1 — Stabilization pass

Done:

- Kept the archive root flat and project-shaped.
- Verified there is no `unzipped/` project copy in the working tree.
- Preserved draft shims while moving new reusable primitives into `@metraly/ui`.
- Added a dedicated dashboard report to document the new architecture boundary.
- Kept legacy draft CSS in place where it still backs non-migrated draft components. This avoids visual regressions while form and dashboard primitives migrate gradually.

## Step 2 — Dashboard components layer

Added to `packages/ui`:

- `DashboardGrid`
- `DashboardWidget`
- `DashboardToolbar`
- `DashboardEmptyState`
- `DashboardDropZone`
- `DashboardResizeHandle`
- `WidgetRegistry`
- dashboard shared types
- `metraly-dashboard.css`

The package now exposes dashboard-specific primitives without forcing the brandbook site to duplicate widget shell patterns.

## Step 3 — Real editor flow stabilization

Added to `site/app/lib/dashboard`:

- `dashboard.types.ts`
- `dashboard.persistence.ts`
- `dashboard.fake-api.ts`
- `dashboard.repository.ts`
- `index.ts`

Added to `site/app/components/dashboard`:

- `DashboardEditor.tsx`
- `DashboardCanvas.tsx`
- `DashboardWidgetPicker.tsx`
- `DashboardWidgetRenderer.tsx`

The `/editor` flow now supports:

1. Create dashboard.
2. Add widget.
3. Select widget.
4. Drag widget through `react-grid-layout`.
5. Resize widget through `react-grid-layout`.
6. Save widget state and layout to localStorage.
7. Reload by dashboard id from the URL.
8. Re-render persisted widgets after reload.

## Tests added

- `DashboardRepository.test.ts`
- `DashboardComponents.test.tsx`

## Storybook added

- `Dashboard.stories.tsx`

## Remaining risks

- Full `next build` still needs to be validated in the developer environment after `npm install`.
- Drag-and-drop keyboard accessibility should be further improved if `@dnd-kit` becomes the primary interaction layer.
- Visual regression should be added once Storybook is wired into CI.

## Recommended validation commands

```bash
npm install
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
npm --prefix site run test:e2e
```

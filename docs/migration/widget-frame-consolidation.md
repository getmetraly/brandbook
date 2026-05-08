# Widget Frame Consolidation Plan

## Goal

Merge the former widget shell layer into `DashboardWidget` so dashboard widgets have one chrome layer, one interaction contract and one documented public path.

## Why This Change Exists

The current separation is useful for exploration, but it creates avoidable duplication between the public dashboard frame and the legacy shell abstraction.

For the board constructor flow, the widget should be created, moved, saved, reloaded and edited through one canonical component path.

## Target State

- `DashboardWidget` becomes the canonical public widget frame.
- The dashboard widget owns:
  - title and subtitle;
  - state badge;
  - body content;
  - selected, dragging, full-width and resizable chrome;
  - drag handle;
  - resize affordance;
  - select and remove behaviors.

## Scope

### In Scope

- Merge widget chrome into `DashboardWidget`.
- Preserve current visual states and accessibility behavior.
- Update docs and tests to describe one canonical widget frame.

### Out Of Scope

- No dashboard persistence refactor.
- No widget registry redesign.
- No changes to `../metraly` or `../website`.

## Risks

- CSS classes must stay stable to avoid visual regressions.
- The dashboard editor flow must keep selection and remove behavior intact.

## Validation

- `npm run site:typecheck`
- `npm run site:test`
- `npm run site:build`

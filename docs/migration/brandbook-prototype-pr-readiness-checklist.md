# Brandbook Prototype PR Readiness Checklist

Status: PR readiness checklist
Date: 2026-05-13
Branch: `phase-1-statebadge-forms-prototype-conformance`

## Purpose

Use this checklist before opening or marking the prototype conformance PR ready for review.

This branch implements Phase 1–4 prototype conformance and Phase 5 documentation. It should not be promoted or merged until local validation is completed.

## Required local commands

Run from the repository root:

```bash
npm run site:test
npm run ui:check
```

If the repo uses package-level commands locally, also run the equivalent package commands for `site` and `packages/ui`.

## Manual visual review routes

Open and inspect:

- [ ] `/components/forms/prototype-conformance`
- [ ] `/components/dashboard/prototype-conformance`
- [ ] `/components/data-display/prototype-conformance`
- [ ] `/components/charts/prototype-conformance`

Check each route for:

- [ ] no runtime errors;
- [ ] no hydration errors;
- [ ] no obvious layout collapse;
- [ ] no hover layout jump;
- [ ] readable text in dense examples;
- [ ] focus rings visible on interactive controls;
- [ ] disabled/loading controls are non-interactive;
- [ ] pulse-wave is semantic only;
- [ ] drag affordance is neutral grip dots only.

## Storybook review

Open Storybook and inspect:

- [ ] `Prototype Conformance / Phase 1 Forms`
- [ ] `Prototype Conformance / Phase 2 Dashboard`
- [ ] `Prototype Conformance / Phase 3 Data Display`
- [ ] `Prototype Conformance / Phase 4 Charts`

Check:

- [ ] stories render in fullscreen layout;
- [ ] no missing imports;
- [ ] no broken `@metraly/ui` exports;
- [ ] stories match the corresponding Next routes.

## Phase 1 acceptance

- [x] `StateBadge` prototype aliases are supported: `ok`, `new`, `purple`, `disabled`.
- [x] `StateBadge` pulse defaults only for `live` and `new`.
- [x] `StateBadge` supports explicit pulse opt-out.
- [x] `MetralyCheckbox` supports `hint` and `loading`.
- [x] `MetralyRadio` supports `hint` and error metadata.
- [x] `MetralySwitch` supports `hint`, `loading`, and `accent`.
- [x] `MetralySelect` supports `placeholder`, `loading`, `empty`, and `hint`.
- [x] `MetralyTabs` supports `livePulse` and skips disabled tabs during arrow navigation.
- [ ] Local validation passed.

## Phase 2 acceptance

- [x] `WidgetPickerCard` supports `kind`, `visualState`, `new`, `loading`, `dragging`, and `disabled`.
- [x] `WidgetPickerCard` uses canonical `MetralyBadge` tags.
- [x] `DashboardWidget` drag grip is in the header.
- [x] Drag grip uses neutral grip dots only.
- [x] Drag grip has `aria-label="Drag to move"` when interactive.
- [x] `DashboardResizeHandle` supports eight directions.
- [x] Selected/resizable `DashboardWidget` renders all eight handles.
- [x] `DashboardDropZone` covers idle/hover/active/rejected/empty.
- [x] `DashboardDropZone` has `data-pulse="off"`.
- [x] `DashboardToolbar` has two-row structure.
- [x] Board-edit visual examples exist.
- [ ] Local validation passed.

## Phase 3 acceptance

- [x] `MetralyTable` supports `unreadRowKeys`.
- [x] `MetralyTable` supports `liveRowKeys`.
- [x] `MetralyTable` supports `rowMarker` resolver.
- [x] `MetralyTable` supports `stickyHeader` and `dense` contracts.
- [x] Loading and empty table states remain observable.
- [x] Board-edit composition examples cover selected, dragging, full-width, drop-target, rejected and empty states.
- [x] Real DnD and persistence remain out of scope.
- [ ] Local validation passed.

## Phase 4 acceptance

- [x] `MetralyChartCard` covers default/loading/noData/error and badge slot.
- [x] `MetralySparkline` covers default/loading/empty/noData/error.
- [x] Line/area/bar/composed wrappers expose chart type/state/series/point metadata.
- [x] Chart wrappers render loading/empty/error fallbacks.
- [x] Tooltip content includes labels, values and units.
- [x] Chart family matrix route exists.
- [ ] Local validation passed.

## Phase 5 acceptance

- [x] `component-status.md` is updated.
- [x] Downstream migration notes are added.
- [x] PR readiness checklist is added.
- [x] Full dashboard editor composition remains Preview-only.
- [x] Real DnD behavior remains Preview-only.
- [ ] Diff review completed.
- [ ] Local validation passed.

## Diff review checklist

Before opening a PR:

- [ ] Review all changed files against `main`.
- [ ] Verify no protected `/components` baseline files were unintentionally changed.
- [ ] Verify no prototype files were copied from `getmetraly/docs` into production code.
- [ ] Verify no generated assets or build artifacts are committed.
- [ ] Verify no unrelated package/dependency changes are included.
- [ ] Verify all new routes are intentional.
- [ ] Verify all new stories are intentional.
- [ ] Verify all new tests are focused and deterministic.

## PR summary template

```md
## Summary

- Align Phase 1 form/core primitives with prototype state vocabulary.
- Align Phase 2 dashboard primitives with prototype geometry.
- Add Phase 3 table markers and board-edit composition coverage.
- Add Phase 4 chart state matrix and wrapper fallback states.
- Add Phase 5 promotion/downstream readiness docs.

## Validation

- [ ] npm run site:test
- [ ] npm run ui:check
- [ ] Manual route review
- [ ] Storybook review

## Notes

- Full dashboard editor composition remains Preview-only.
- Real DnD behavior and persistence remain deferred.
- Custom select/listbox remains deferred.
```

## Known risks to review

- New tests mock `recharts`; verify compatibility with the existing Jest setup.
- New Next routes import `@metraly/ui/charts`; verify path aliases work in both Next and Storybook.
- `MetralySparkline` now returns a `<span>` for fallback states and `<svg>` for default state; verify downstream snapshots do not assume a stable root element.
- `DashboardWidget` moved drag grip from footer to header; verify any downstream CSS selectors using `.metraly-widget-shell-foot` are updated.
- `DashboardResizeHandle` direction type changed from three values to eight values; verify wrappers do not narrow the old type.

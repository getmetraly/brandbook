# Brandbook Prototype Conformance Audit

Status: audit roadmap
Date: 2026-05-13
Source of truth: `getmetraly/docs/prototypes/brandbook/*`
Related handoff: `docs/migration/brandbook-prototype-audit-handoff.md`

## Goal

Bring every existing Metraly Brandbook component, regardless of current maturity, into visual and interaction alignment with the Claude Design prototype under `getmetraly/docs/prototypes/brandbook/*`.

This is not a request to copy the prototype architecture. The prototype remains a visual and interaction source of truth. Production implementation must stay inside the existing Brandbook structure, `@metraly/ui`, grouped docs pages, preview hardening surfaces, Storybook and tests.

## Prototype source files reviewed

- `primitives.jsx`
- `form-controls.jsx`
- `widgets.jsx`
- `dashboard-editor.jsx`
- `state-board.jsx`
- `docs.jsx`

The prototype contract is centered on:

- semantic pulse-wave usage only;
- `GripDots` as the only drag affordance;
- clear focus-visible states;
- disabled states that are visually clear and non-interactive;
- no vertical layout shift on hover;
- one state-board artboard per component family;
- dashboard editor primitives that cover selected, dragging, drop-target, full-width, empty and resize states.

## Current Brandbook surfaces reviewed

- `brandbook/current-design-state.md`
- `design-system/components.md`
- `design-system/micro-telemetry-primitives.md`
- `design-system/board-edit-mode.md`
- `docs/migration/component-status.md`
- `site/app/components/previews/README.md`
- `packages/ui/src/index.ts`
- `packages/ui/src/components/*` key components
- `packages/ui/src/dashboard/*` key dashboard primitives
- `packages/ui/src/charts/index.ts`

## Executive summary

The Brandbook already has most required component names and a strong design direction, but it is not yet fully prototype-conformant.

The main gap is not missing exports. The main gap is that the prototype defines complete state matrices and exact dashboard/editor interaction geometry, while the current implementation is split between grouped docs, preview pages and reusable package components with several incomplete or simplified states.

The highest-priority work is to align the reusable `@metraly/ui` primitives and preview state boards with the prototype, then promote only after tests and docs prove that the state matrix is complete.

## Severity legend

- **P0** — blocks prototype conformance; must fix first.
- **P1** — important hardening gap; fix before RC promotion.
- **P2** — documentation, polish or downstream adoption alignment.

## P0 findings

### 1. State-board coverage must become the audit surface

The prototype explicitly models a component state board where each component has a dedicated artboard and all relevant states are visible in a grid.

Current Brandbook has grouped docs pages and preview hardening pages, but conformance is split across routes. This makes it hard to verify the prototype contract in one pass.

Required fix:

- Create or update a single prototype-conformance state board route/document that lists every component family and all states.
- Keep grouped docs pages, but make the state board the audit baseline.
- Add tests that verify every expected state label is rendered.

### 2. DashboardWidget / WidgetShell geometry diverges from prototype

Prototype `WidgetShell` puts the drag grip in the header, before title/kind, followed by status and controls. The current `DashboardWidget` puts the drag handle in the footer and exposes only one resize handle through `DashboardResizeHandle`.

Required fix:

- Move drag affordance into the widget header as neutral grip dots.
- Keep `aria-label="Drag to move"`.
- Keep pulse-wave completely out of drag affordance.
- Preserve selected border, state badge and footer content.
- Add selected divider / subtle pulse only as semantic selected-state decoration, not as a handle.

### 3. Resize handles are incomplete

Prototype resize handles cover eight positions: `nw`, `n`, `ne`, `e`, `se`, `s`, `sw`, `w`. Current `DashboardResizeHandle` supports only `east`, `south`, and `southeast`.

Required fix:

- Extend direction support to all eight handles.
- Render all handles from `DashboardWidget` when selected/resizing.
- Keep handles outside content rhythm.
- Add cursor mapping for each direction.
- Add min-size and snap-to-grid notes for the later interactive implementation.

### 4. WidgetPickerCard state model is narrower than prototype

Prototype `WidgetPickerCard` covers `default`, `selected`, `new`, `disabled`, `loading`, and `dragging`; it also shows icon, title, kind, description, new badge and selected pulse. Current `WidgetPickerCard` has title, description, tags, selected, disabled and a `StateBadge`, but no explicit `kind`, `new`, `loading`, or `dragging` visual contract.

Required fix:

- Add `kind` as first-class metadata.
- Add `variant/state` support for `new`, `loading`, `dragging`, `disabled`, `selected`.
- Replace local `brand-badge` tags with canonical `MetralyBadge` or a tokenized local tag pattern.
- Ensure selected state uses cyan border/glow and does not shift layout.

## P1 findings

### 5. StateBadge vocabulary does not match prototype vocabulary

Prototype states include `live`, `ok`, `stale`, `error`, `new`, `info`, `purple`, and `disabled`. Current `StateBadge` uses `live`, `stale`, `delayed`, `disconnected`, `noData`, `error`, `warning`, `success`, and `info`.

Required fix:

- Add aliases or normalized mapping for prototype vocabulary.
- Decide whether `ok`, `new`, `purple`, and `disabled` are public states or mapped aliases.
- Ensure pulse is default only for live/new semantics, not every badge.
- Keep text + indicator so state is not color-only.

### 6. Form controls exist but need prototype-state completion

Current exported controls exist: `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, `MetralySelect`, `MetralyTabs`.

Gaps:

- `MetralyCheckbox` lacks a loading state and uses `description` instead of prototype-style `hint`.
- `MetralyRadio` needs documented group behavior and final keyboard review.
- `MetralySwitch` lacks loading and accent variants from prototype.
- `MetralySelect` is native/simple; prototype shows a custom listbox with open, loading, error, empty and icon-option states.
- `MetralyTabs` is the closest to production behavior because arrow-key navigation exists, but it still needs visual verification against prototype underline/count/live-pulse geometry.

Required fix:

- Do not regress accessibility by blindly copying the prototype.
- Add missing visual states first.
- Keep native select as the safe baseline until custom listbox has a complete keyboard/a11y model.
- Add explicit state-board examples for default, hover, focus-visible, checked/selected, disabled, loading, error and interactive states.

### 7. DashboardToolbar must match the prototype two-row rhythm

Prototype toolbar uses a stable two-row layout: tabs on top, then search/sync/edit/add actions below. Current `DashboardToolbar` has title/copy, controls and actions, but the route-level CSS must prove it cannot collapse into collisions at narrow widths.

Required fix:

- Enforce two-row toolbar layout in the dashboard/editor context.
- Keep tabs in their own horizontally scrollable row.
- Keep search, sync badge, edit toggle and add-widget button in the second row.
- Add responsive tests for narrow widths.

### 8. MetralyTable is display-first but lacks prototype-specific row markers

Current `MetralyTable` supports columns, loading, empty, row key and selected rows. Prototype expects dense table, sticky header, row selection, unread/live row markers and state rows.

Required fix:

- Keep sorting/filtering/pagination outside the primitive.
- Add optional `unreadRowKeys` / `liveRowKeys` or a row marker slot.
- Ensure sticky header is documented and visually tested in dashboard containers.
- Keep selected rows visual-only unless wrapper owns interaction.

### 9. DashboardDropZone is close but needs visual proof

Current `DashboardDropZone` has `idle`, `hover`, `active`, `rejected`, and `empty`. That matches the prototype state vocabulary well.

Required fix:

- Verify CSS: dashed cyan border, subtle tint, no idle pulse-wave.
- Ensure active/rejected states are visually clear without becoming louder than content.
- Add static state-board examples for all states.

## P2 findings

### 10. Chart family needs prototype-family matrix

Chart wrappers are exported, but chart coverage still reads more like a hardening gallery than a full component family matrix.

Required fix:

- Add state matrix for `MetralyChartCard`, `MetralySparkline`, line/area/bar/composed charts and tooltip.
- Validate badge slot, hover cursor, hovered point/column marker and empty/error/loading chart states.
- Keep Recharts wrappers minimal; avoid raw chart composition scattered in app pages.

### 11. Docs / canvas / tweaks are not production components yet

Prototype `Docs`, `DesignCanvas`, and `TweaksPanel` are reference/handoff surfaces. They should not become production package primitives unless a real product need appears.

Required fix:

- Keep docs content in Markdown and grouped routes.
- Treat design canvas as an internal preview wrapper, not part of `@metraly/ui`.
- Treat tweaks panel as preview tooling for accent/glow/density/pulse validation.

## Component conformance matrix

| Family | Exists now | Prototype-conformant? | Priority | Main action |
|---|---:|---:|---|---|
| PulseWave / telemetry line | Yes | Partial | P1 | Normalize semantic allow-list and reduced-motion behavior. |
| GripDots / drag affordance | Partial | Partial | P0 | Header grip only; no pulse near drag. |
| StatusDot | Partial via badge pulse | Partial | P1 | Add explicit primitive or normalize badge indicator semantics. |
| StateBadge | Yes | Partial | P1 | Align state vocabulary and pulse rules. |
| Checkbox | Yes | Partial | P1 | Add loading/hint/state-board examples. |
| Radio | Yes | Partial | P1 | Group/keyboard/state-board review. |
| Switch | Yes | Partial | P1 | Add loading/accent states. |
| Select | Yes | Partial | P1 | Keep native safe; add visual states; plan custom listbox later. |
| Tabs | Yes | Mostly | P1 | Final visual verification, live pulse/count geometry. |
| WidgetPickerCard | Yes | Partial | P0 | Add kind/new/loading/dragging states and canonical tags. |
| DashboardWidget / WidgetShell | Yes | Partial | P0 | Move grip to header, add full state geometry. |
| DashboardToolbar | Yes | Partial | P1 | Force prototype two-row layout. |
| DashboardDropZone | Yes | Close | P1 | Visual proof and tests. |
| DashboardResizeHandle | Yes | No | P0 | Support 8 directions. |
| DashboardGrid | Yes | Partial | P1 | Keep compatible with layout snapshots and editor persistence. |
| DashboardEmptyState | Yes | Partial | P1 | Align first-run / no-data copy and CTA. |
| MetralyTable | Yes | Partial | P1 | Add unread/live markers and sticky header proof. |
| Chart wrappers | Yes | Partial | P2 | Convert gallery to family matrix. |
| Full dashboard editor composition | Preview-only | Partial | P1 | Keep static until DnD/persistence are verified. |
| Real DnD behavior | Preview-only | No | P0/P1 | Must stay compatible with dnd-kit and react-grid-layout. |

## Recommended implementation order

### Phase 0 — Audit foundation

1. Add this audit to migration docs.
2. Create a conformance checklist for every family.
3. Freeze expected state vocabulary.
4. Add state-board test expectations.

### Phase 1 — Core primitives and forms

1. Normalize `StateBadge` aliases and pulse rules.
2. Add missing form states: loading, hint/error, disabled, focus-visible.
3. Align checkbox/radio/switch/select/tabs visual CSS with prototype.
4. Update Storybook and grouped docs examples.

### Phase 2 — Dashboard primitives

1. Update `WidgetPickerCard` API and state classes.
2. Refactor `DashboardWidget` header geometry to match `WidgetShell` prototype.
3. Expand `DashboardResizeHandle` to eight directions.
4. Verify `DashboardDropZone` visual states.
5. Lock drag-handle and resize-handle tests.

### Phase 3 — Table, grid and editor composition

1. Add unread/live row markers to table or wrapper slot.
2. Enforce dashboard toolbar two-row layout.
3. Add board-edit matrix examples for selected, dragging, full-width, drop-target, resize, empty and rejected.
4. Keep real DnD hardening separate from static visual conformance.

### Phase 4 — Charts and product scenario

1. Convert chart hardening gallery into a family state matrix.
2. Add loading/empty/error chart states.
3. Verify tooltip, hover cursor and hovered marker behavior.
4. Use the engineering dashboard example as final integration proof.

### Phase 5 — Promotion and downstream readiness

1. Update `docs/migration/component-status.md` per component.
2. Promote only components with complete visual states, tests, docs and accessibility notes.
3. Do not promote full dashboard editor composition until DnD, keyboard and persistence behavior are verified.

## Acceptance criteria

The audit is complete when:

- every component in `@metraly/ui` is mapped to a prototype family or explicitly marked out-of-scope;
- every prototype family has a Brandbook implementation, preview example or documented reason for delay;
- every state in the prototype state board is visible in Brandbook docs or preview routes;
- drag affordance is always neutral grip dots;
- pulse-wave is semantic only;
- dashboard/editor primitives match prototype geometry;
- resize handles cover all required directions;
- no hover interaction causes vertical layout shift;
- docs, Storybook and tests agree on the same state vocabulary.

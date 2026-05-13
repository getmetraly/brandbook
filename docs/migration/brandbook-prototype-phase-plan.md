# Brandbook Prototype Conformance Phase Plan

Status: active execution plan
Date: 2026-05-13
Related audit: `docs/migration/brandbook-prototype-conformance-audit.md`
Prototype source of truth: `getmetraly/docs/prototypes/brandbook/*`

## Operating rules

- Keep the Claude Design prototype as the visual and interaction source of truth.
- Do not copy prototype architecture into production code.
- Keep `/components` protected unless explicitly requested.
- Prefer `@metraly/ui` primitives over local one-off implementations.
- Every phase must update docs, preview/state-board coverage and tests when it changes component behavior.
- Pulse-wave is semantic only: live, selected, unread, telemetry divider, logo, chart accents.
- Drag affordance is neutral `GripDots` only.
- Hover must not cause vertical layout shift.

## Canonical state vocabulary

### Global interactive states

- `default`
- `hover`
- `focus-visible`
- `active`
- `selected`
- `disabled`
- `loading`
- `empty`
- `stale`
- `error`
- `unread`
- `new`

### Dashboard/editor states

- `idle`
- `selected`
- `dragging`
- `drop-target`
- `drop-hover`
- `drop-active`
- `drop-rejected`
- `full-width`
- `resizing`
- `resize-north`
- `resize-east`
- `resize-south`
- `resize-west`
- `resize-north-east`
- `resize-south-east`
- `resize-south-west`
- `resize-north-west`

### Telemetry state aliases

Use these aliases when aligning prototype vocabulary with current `StateBadge` semantics:

| Prototype | Canonical meaning | Current-compatible mapping |
|---|---|---|
| `live` | live telemetry | `live` |
| `ok` | healthy static state | `success` or `ok` alias |
| `stale` | delayed / not fresh | `stale` |
| `error` | error / disconnected | `error` or `disconnected` depending copy |
| `new` | unread / new signal | `new` alias |
| `info` | neutral info | `info` |
| `purple` | beta / secondary accent | `purple` alias |
| `disabled` | unavailable | `disabled` alias |

## Phase 0 — Audit foundation

Status: **done / checklist active**

Goal: create a stable checklist so component work can proceed without reinterpreting the prototype every time.

Deliverables:

- [x] Full prototype conformance audit.
- [x] Phase execution plan.
- [x] State-board expectation checklist per family.
- [x] `component-status.md` cross-link to audit and phase plan.
- [x] Test expectation list for state-board coverage.

Exit criteria:

- Every prototype family is mapped to an implementation target or explicitly marked out-of-scope.
- The state vocabulary above is used consistently in docs and future PRs.
- Phase 1 can begin without ambiguity.

## Phase 1 — Core primitives and forms

Status: **in progress**

Goal: align reusable primitives and form controls with prototype states while preserving production accessibility.

Scope:

- `StateBadge`
- `MetralyTelemetryLine` / pulse rules
- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`

Tasks:

- [x] Normalize `StateBadge` prototype aliases: `ok`, `new`, `purple`, `disabled`.
- [x] Ensure badge pulse defaults only for live/new semantics.
- [x] Add or document `loading` state for checkbox and switch.
- [x] Add switch accent support for cyan/purple.
- [x] Keep native select as the safe baseline while documenting custom listbox as future hardening.
- [x] Ensure tabs keep arrow-key navigation and prototype underline/count geometry.
- [x] Add state-board checklist and focused tests for relevant states.
- [ ] Update Storybook stories and final visual state-board examples.

Exit criteria:

- Forms have visible default, hover, focus-visible, selected/checked, disabled, loading and error states where relevant.
- No hover state changes element height, margin, padding or vertical transform.
- Disabled controls are visually clear and non-interactive.
- Focus-visible is clear and accessible.

## Phase 2 — Dashboard primitives

Status: **queued**

Goal: align dashboard/editor primitives with prototype geometry.

Scope:

- `WidgetPickerCard`
- `DashboardWidget` / WidgetShell
- `DashboardResizeHandle`
- `DashboardDropZone`
- `DashboardToolbar`
- `DashboardGrid`
- `DashboardEmptyState`

Tasks:

- [ ] Add `kind`, `new`, `loading`, `dragging` support to `WidgetPickerCard`.
- [ ] Move `DashboardWidget` drag grip into header.
- [ ] Keep drag grip as neutral dots and `aria-label="Drag to move"`.
- [ ] Expand resize handles to all eight directions.
- [ ] Render all resize handles when selected/resizing.
- [ ] Verify drop zone idle/hover/active/rejected/empty styles.
- [ ] Enforce two-row toolbar layout in dashboard/editor scenarios.
- [ ] Add board-edit state matrix examples.

Exit criteria:

- Drag, resize, selected, full-width and drop-target states match prototype expectations.
- Dashboard editor remains compatible with `@dnd-kit/*` and `react-grid-layout`.
- Static preview states are locked before real DnD hardening.

## Phase 3 — Table, grid and editor composition

Status: **queued**

Goal: close data-display and board-edit composition gaps.

Tasks:

- [ ] Add unread/live row marker support or a row marker slot to `MetralyTable`.
- [ ] Verify sticky header behavior in dense dashboard containers.
- [ ] Keep row interaction in wrappers, not inside display-first table primitive.
- [ ] Add selected, dragging, full-width, drop-target, resize, empty and rejected examples to the conformance state board.
- [ ] Keep real DnD and persistence as separate hardening work.

## Phase 4 — Charts and product scenario

Status: **queued**

Goal: turn chart coverage from a gallery into a prototype family matrix.

Tasks:

- [ ] Add state matrix for chart cards and wrappers.
- [ ] Add loading, empty and error chart states.
- [ ] Validate badge slot behavior.
- [ ] Validate tooltip, hover cursor and hovered marker behavior.
- [ ] Use `/examples/engineering-dashboard` as integration proof.

## Phase 5 — Promotion and downstream readiness

Status: **queued**

Goal: promote only verified components to RC/adoption candidates.

Tasks:

- [ ] Update `docs/migration/component-status.md` after each component family passes visual, test and a11y review.
- [ ] Mark full dashboard editor composition as Preview-only until real DnD, keyboard and persistence are verified.
- [ ] Prepare downstream migration notes for `website` and `metraly` only after component APIs stabilize.

## Immediate next action

Run `npm run site:test` and `npm run ui:check` locally, then continue Phase 1 with Storybook/final visual state-board examples or move to Phase 2 dashboard primitives if tests pass.

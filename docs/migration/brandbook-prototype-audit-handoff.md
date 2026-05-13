# Brandbook Prototype Audit Handoff

Status: checkpoint saved for later continuation.
Date: 2026-05-13

## Goal
Run a full conformance audit of Metraly Brandbook against the Claude Design prototype in `../docs/prototypes/brandbook`, then produce a Markdown roadmap of every mismatch and the order to fix them.

## Scope already inspected
### Prototype source of truth
- `../docs/prototypes/brandbook/primitives.jsx`
- `../docs/prototypes/brandbook/form-controls.jsx`
- `../docs/prototypes/brandbook/widgets.jsx`
- `../docs/prototypes/brandbook/dashboard-editor.jsx`
- `../docs/prototypes/brandbook/state-board.jsx`
- `../docs/prototypes/brandbook/docs.jsx`
- `../docs/prototypes/brandbook/design-canvas.jsx`
- `../docs/prototypes/brandbook/tweaks-panel.jsx`
- `../docs/prototypes/brandbook/app.jsx`

### Current repo surfaces inspected
- `brandbook/current-design-state.md`
- `site/app/components/previews/README.md`
- `design-system/components.md`
- `design-system/micro-telemetry-primitives.md`
- `design-system/board-edit-mode.md`
- `docs/migration/component-status.md`
- grouped docs pages and preview routes under `site/app/components/*`
- dashboard/supporting pages under `site/app/patterns/*` and `site/app/examples/*`

## Prototype contracts to preserve
### Controls and primitives
- Pulse-wave is semantic only: live/selected/unread/telemetry/chart/logo contexts.
- GripDots is the only drag affordance.
- Selected controls must show clear focus-visible state.
- Disabled controls must be non-interactive and visually clear.
- Hover must not cause vertical layout shift.

### Dashboard/editor
- Widget picker card: icon, title/kind, description, new badge, selected state, dragging state.
- Dashboard widget shell: header, status chip, controls, body, footer, resize handles, selected pulse divider.
- Table: dense, sticky header, row selection, unread/live row markers.
- Toolbar: two-row layout with tabs plus search/sync/edit/add actions.
- Drop zones: dashed cyan border, subtle tint, no pulse in idle state.
- Resize handles: outside content rhythm.

### Board edit mode
- Required states: selected, dragging, drop target, full-width, empty, horizontal/vertical/corner resize.
- Must stay compatible with `@dnd-kit/*` and `react-grid-layout`.

### Docs / canvas / tweaks
- Docs surface is reference-only handoff content.
- Design canvas is a Figma-like wrapper with persisted section/artboard state and focus overlay.
- Tweaks panel owns the host protocol and reusable tweak controls.

## Current mismatch themes already observed
- `site/app/components/*` is organized as grouped docs pages, not a single prototype-like audit surface.
- `/components` pages are canonical docs pages, but several are more like curated demos than a prototype state matrix.
- The preview hardening surface is intentionally static/reference-only, so it cannot fully mirror the live prototype behavior.
- Dashboard/editor coverage is split across docs, preview board, and app pages instead of one unified prototype-style composition.
- Chart coverage still reads as a hardening gallery rather than a full prototype family matrix.

## Next continuation steps
1. Finish the discrepancy matrix per component family.
2. Write the full audit markdown with severity/priority labels.
3. Cross-link the audit to `brandbook/current-design-state.md`, `site/app/components/previews/README.md`, and `docs/migration/component-status.md`.
4. Keep the protected `/components` baseline untouched unless explicitly requested.

## Notes
- All new documentation must remain in English.
- This handoff is meant to resume audit work later without re-reading the full prototype set.

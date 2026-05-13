# Brandbook Prototype State Board Checklist

Status: active checklist
Date: 2026-05-13
Related plan: `docs/migration/brandbook-prototype-phase-plan.md`
Related audit: `docs/migration/brandbook-prototype-conformance-audit.md`

## Purpose

This checklist defines the expected state-board coverage for Brandbook prototype conformance. It is intentionally implementation-agnostic: a state can be represented in a grouped docs page, preview hardening route, Storybook story, or a focused test, but it must be visible and testable before promotion.

## Global rules

- Do not copy the prototype architecture.
- Do not modify the protected `/components` baseline unless explicitly requested.
- Use `@metraly/ui` primitives as the implementation target.
- Pulse-wave remains semantic only.
- Drag affordance remains neutral grip dots only.
- Hover must not change height, margin, padding or vertical transform.
- Every disabled state must be visually clear and non-interactive.
- Every focus-visible state must be clear and keyboard-reachable where the control is interactive.

## Phase 1 — Core primitives and forms

### StateBadge

Required states:

- [x] `live`
- [x] `ok`
- [x] `stale`
- [x] `error`
- [x] `new`
- [x] `info`
- [x] `purple`
- [x] `disabled`
- [x] pulse defaults on for `live`
- [x] pulse defaults on for `new`
- [x] pulse defaults off for static states
- [x] explicit pulse opt-out

Test anchor:

- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`

### MetralyCheckbox

Required states:

- [x] default
- [ ] hover visual example
- [ ] focus-visible visual example
- [x] checked
- [x] indeterminate
- [x] disabled
- [x] loading
- [x] error
- [x] hint / helper copy

Test anchor:

- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`
- Existing preview state board still owns visual examples for hover/focus/error variants.

### MetralyRadio

Required states:

- [x] default
- [ ] hover visual example
- [ ] focus-visible visual example
- [x] selected
- [x] disabled
- [x] error
- [x] hint / helper copy
- [ ] group behavior visual example

Test anchor:

- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`
- Existing preview state board still owns visual examples for hover/focus/group variants.

### MetralySwitch

Required states:

- [x] off
- [x] on
- [ ] hover visual example
- [ ] focus-visible visual example
- [x] disabled off
- [x] disabled on
- [x] loading
- [x] cyan accent
- [x] purple accent
- [x] hint / helper copy

Test anchor:

- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`
- Existing preview state board still owns visual examples for hover/focus variants.

### MetralySelect

Required states:

- [x] default
- [ ] hover visual example
- [ ] focus-visible visual example
- [x] selected value
- [x] placeholder
- [x] disabled
- [x] loading
- [x] error
- [x] empty
- [x] disabled option
- [x] hint / helper copy

Current implementation note:

- Native select remains the safe baseline.
- Custom listbox remains future hardening until keyboard, portal and clipping behavior are fully specified.

Test anchor:

- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`

### MetralyTabs

Required states:

- [x] selected
- [x] disabled tab
- [x] count slot
- [x] live pulse marker API
- [x] arrow-key navigation
- [x] skip disabled tab on arrow navigation
- [ ] final underline/count visual verification against prototype CSS

Test anchor:

- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`

## Phase 2 — Dashboard primitives

### WidgetPickerCard

Required states:

- [ ] default
- [ ] hover
- [ ] focus-visible
- [ ] selected
- [ ] disabled
- [ ] new
- [ ] loading
- [ ] dragging
- [ ] icon/title/kind/description structure
- [ ] canonical tags or canonical badge usage

### DashboardWidget / WidgetShell

Required states:

- [ ] default
- [ ] selected
- [ ] dragging
- [ ] stale
- [ ] error / disconnected
- [ ] loading
- [ ] empty
- [ ] unread/new
- [ ] full-width
- [ ] header grip dots
- [ ] no pulse-wave inside drag affordance
- [ ] footer and body content remain readable

### DashboardResizeHandle

Required states:

- [ ] north-west
- [ ] north
- [ ] north-east
- [ ] east
- [ ] south-east
- [ ] south
- [ ] south-west
- [ ] west
- [ ] active/resizing
- [ ] inactive/selected
- [ ] accessible labels
- [ ] cursor mapping

### DashboardDropZone

Required states:

- [ ] idle
- [ ] hover
- [ ] active / release-to-add
- [ ] rejected
- [ ] empty
- [ ] no idle pulse-wave
- [ ] dashed cyan border / subtle tint visual proof

### DashboardToolbar

Required states:

- [ ] two-row layout
- [ ] tabs row
- [ ] search row
- [ ] live sync badge
- [ ] stale/error sync badge
- [ ] edit mode off
- [ ] edit mode on
- [ ] add-widget action
- [ ] narrow-width no-collision proof

## Phase 3 — Table, grid and editor composition

### MetralyTable

Required states:

- [ ] default
- [ ] loading
- [ ] empty
- [ ] error/disconnected wrapper state
- [ ] selected row
- [ ] unread/live row marker
- [ ] sticky header proof
- [ ] dense dashboard container proof

### DashboardGrid / editor composition

Required states:

- [ ] idle widget grid
- [ ] selected widget
- [ ] dragging widget
- [ ] full-width widget
- [ ] active drop target
- [ ] rejected drop target
- [ ] empty dashboard
- [ ] resize horizontal
- [ ] resize vertical
- [ ] resize corner

## Phase 4 — Charts

Required states:

- [ ] chart card default
- [ ] chart card loading
- [ ] chart card empty/no-data
- [ ] chart card error
- [ ] badge slot
- [ ] tooltip with series labels and values
- [ ] hover cursor line
- [ ] hovered point marker
- [ ] bar hover background band
- [ ] compact dashboard container proof

## Completion policy

A component family can move toward RC only when:

- required states above are either checked or explicitly deferred with a reason;
- tests cover the behavior or data attributes that make the state observable;
- grouped docs or preview surfaces show the visual state;
- `docs/migration/component-status.md` is updated;
- no new state violates pulse-wave, drag-handle or no-hover-jump rules.

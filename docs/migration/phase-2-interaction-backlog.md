# Phase 2 Interaction Backlog

## Purpose

Turn the interaction phase of the migration plan into concrete backlog items. This phase covers the controls and overlay primitives that every dashboard, settings flow and docs filter depends on.

## Phase Goal

Finish the core controls and overlay primitives so they can be reused in the app and website without local UI overrides.

## Scope

### In Scope

- Checkbox, radio, switch, select, tabs and segmented-control patterns.
- Overlay primitives for tooltip, popover, modal, drawer and command palette.
- Keyboard, focus and disabled-state behavior for interactive controls.
- Documentation and tests that make the interaction contract explicit.

### Out of Scope

- No dashboard grid/editor refactor beyond the interaction primitives they consume.
- No chart wrapper work.
- No card/table normalization beyond what is needed to support these controls.
- No direct changes to `../app` or `../website`.

## Backlog Items

### 2.1 Harden Checkbox And Radio

- Confirm the checkbox and radio API shape in `@metraly/ui`.
- Verify `checked`, `defaultChecked`, `disabled` and `error` states behave consistently.
- Make label, description and aria relationships explicit.
- Confirm the selected/active accent is visible without layout shift or hover jump.

### 2.2 Harden Switch

- Confirm the switch API shape and interaction contract.
- Verify keyboard toggle behavior, focus-visible behavior and disabled behavior.
- Document when switch should be used instead of checkbox for settings-like boolean state.

### 2.3 Harden Select

- Confirm the select API shape and option model.
- Verify disabled options, error state and label behavior.
- Document the visual treatment for native select affordances so the control remains readable in the dark UI.

### 2.4 Harden Tabs

- Confirm the tab API shape and active-value contract.
- Verify selected, disabled and keyboard-accessible behavior.
- Keep the selected pulse indicator inside the tab body and not as decorative noise.

### 2.5 Formalize Segmented Control

- Decide whether segmented control remains a distinct primitive or a documented pattern built from tabs/buttons.
- If retained, define its selected, disabled and keyboard behavior explicitly.
- Add usage guidance for docs filters and compact navigation contexts.

### 2.6 Formalize Overlay Primitives

- Define the canonical interaction and accessibility contract for:
  - tooltip
  - popover
  - modal
  - drawer
  - command palette
- Specify roles, focus trapping, escape handling and click-outside behavior where applicable.
- Document when an overlay should be modal versus non-modal.

### 2.7 Document Hover And Cursor Rules

- Reconfirm the no-jump hover rule for controls and overlays.
- Document cursor behavior for static content, buttons, text inputs, drag handles and resize handles.
- Make focus-visible styling a first-class part of the interaction contract.

### 2.8 Align Docs And Storybook Coverage

- Add or update docs pages and stories for the hardened controls.
- Capture interaction examples for selected, disabled and error states.
- Keep preview surfaces in sync with the canonical component names.

## Required Tests

- RTL/unit tests for role, label, selected/checked state and disabled behavior.
- keyboard interaction tests for tab, dialog and switch controls.
- focus-visible checks for every interactive primitive.
- visual checks for selected-state accent, label alignment and hover stability.
- typecheck and build verification for `site` and `packages/ui`.

## Deliverables

- Documented interaction contracts for controls and overlays.
- Updated tests for the hardened primitives.
- Storybook or docs coverage for the core interaction states.
- Any necessary package boundary updates for the interaction layer.

## Acceptance Criteria

- The controls are ready for product migration without local UI overrides.
- Overlay behavior is predictable and accessible.
- The docs explain the intended keyboard, focus and disabled-state behavior clearly enough for other repos to adopt it without guesswork.
- The no-jump hover rule is preserved across the interaction layer.

## Risks

- Incomplete keyboard support will create migration friction in the app.
- Overlay APIs may need refinement after real usage, so they should stay narrow and test-backed.
- If segmented control and tabs are not clearly distinguished, duplication will return.


# Phase 3 — Forms / Controls Claude Design Alignment Continuation

Status: active PR continuation notes.  
Branch: `phase-3-forms-controls-claude-alignment`  
PR: <https://github.com/getmetraly/brandbook/pull/4>  
Base: `main` at `3164281a3203c70255e70439b2a112240454103b`  
Latest known head: `caf6713b47f8eb34a614034e948c486144ed91a9`  
PR state: open draft, currently mergeable at the time these notes were saved.

## Goal

Continue the focused Claude Design alignment batch for forms and controls without expanding the PR into tables, charts, dashboard widgets or unrelated primitives.

Current PR scope:

- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`
- forms CSS cleanup
- forms regression tests
- state-board coverage for forms controls
- component migration status update

## Design direction

The accepted visual direction is closer to Claude Design than the older Metraly pulse-wave style:

- dark observability UI;
- compact controls;
- no decorative pulse-wave inside choice controls;
- simple cyan checked/selected states;
- monospaced engineering labels;
- controlled focus rings;
- static top-navigation tabs, not scrollable pills;
- selected tab underline should align cleanly with the thin rail.

## Completed work in this PR

### Checkbox / Radio / Switch cleanup

Legacy pulse-marker DOM was removed from:

- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`

Dead CSS for legacy marker classes was removed from `metraly-forms.css`:

- `.metraly-checkbox-pulse`
- `.metraly-radio-pulse`
- `.metraly-switch-pulse`
- `.metraly-tab-pulse`

Regression coverage was added to make sure old pulse markers do not return.

### Checkbox state expansion

`MetralyCheckbox` now supports:

- default;
- hover preview state;
- focus-visible preview state;
- checked;
- checked focus;
- checked disabled;
- unchecked disabled;
- error;
- error checked;
- indeterminate / mixed;
- indeterminate focus;
- error mixed.

Important implementation note:

- `MetralyCheckbox` must remain server-compatible.
- Do not use `useRef`, `useEffect` or add `"use client"` just to support indeterminate visuals.
- The current mixed state is implemented as SSR-safe markup:
  - `aria-checked="mixed"`
  - `.metraly-checkbox.is-indeterminate`
  - CSS dash through `.metraly-checkbox-box::before`

This avoids the prior runtime error:

```text
useRef only works in Client Components.
```

### Form states and preview board

`/components/previews` was expanded to show more state coverage for:

- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`

The state board lives in:

```text
site/app/components/previews/ClaudeDesignStateBoard.tsx
```

### Tests added / updated

Relevant test files:

```text
site/__tests__/forms/MetralyControlStates.test.tsx
site/__tests__/forms/MetralyForms.test.tsx
```

Covered contracts include:

- no legacy pulse markers in choice controls;
- checkbox labels/descriptions/error state;
- checkbox mixed state with `aria-checked="mixed"`;
- radio disabled/description state;
- switch role and click handling;
- select error/disabled option;
- tabs selected/disabled states;
- tabs arrow-key navigation;
- tabs count slot.

### Component status updated

`docs/migration/component-status.md` was updated to reflect current forms/control hardening state.

## Current important files

```text
packages/ui/src/components/MetralyCheckbox.tsx
packages/ui/src/components/MetralyRadio.tsx
packages/ui/src/components/MetralySwitch.tsx
packages/ui/src/components/MetralySelect.tsx
packages/ui/src/components/MetralyTabs.tsx
packages/ui/src/styles/metraly-forms.css
site/app/components/previews/ClaudeDesignStateBoard.tsx
site/app/components/previews/claude-preview-overrides.css
site/app/layout.tsx
site/__tests__/forms/MetralyControlStates.test.tsx
site/__tests__/forms/MetralyForms.test.tsx
docs/migration/component-status.md
```

## Current known issue to continue from

The remaining visual issue has been narrowed to final preview verification for `MetralyTabs`.

Observed behavior:

- tabs are no longer as broken as before;
- scroll behavior has been reduced/disabled in brandbook preview overrides;
- the selected cyan underline geometry now lives in `packages/ui/src/styles/metraly-forms.css`;
- the underline is intended to sit centered on the thin rail line, matching the prototype source of truth;
- dashboard editor still needs one final pass for horizontal/inner scroll after tabs are verified in preview.

Most recent attempt:

- moved rail/active-line geometry away from `claude-preview-overrides.css`;
- left preview overrides only for layout and non-scroll behavior;
- intended source of truth for line geometry is now:

```text
packages/ui/src/styles/metraly-forms.css
```

Latest relevant commits:

```text
0e320db872f90e82aa4bd90f4c30ccb5dd5a2db5 style(ui): lock tabs vertical overflow
665290b7f990feec68bb00a2fca6c44849adcde3 style(site): disable tabs scroll in brandbook previews
caf6713b47f8eb34a614034e948c486144ed91a9 style(site): stop overriding tab rail geometry
```

## Suggested next fix for tabs

Avoid more preview-only geometry overrides.

Recommended next step:

1. Open `packages/ui/src/styles/metraly-forms.css`.
2. Treat `MetralyTabs` geometry as the single source of truth.
3. Keep the rail and active line explicit and simple.

Suggested direction:

```css
.metraly-tabs {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 18px;
  overflow: hidden;
  padding-bottom: 2px;
}

.metraly-tabs::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1px;
  height: 1px;
  background: oklch(1 0 0 / 0.085);
}

.metraly-tab-content::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  background: transparent;
}

.metraly-tab.is-active .metraly-tab-content::after {
  height: 3px;
  background: oklch(0.78 0.13 200);
}
```

The intent is:

- thin rail occupies `bottom: 1px` with `height: 1px`;
- thick active line occupies `bottom: 0` with `height: 3px`;
- the 1px rail is visually centered inside the 3px selected line;
- no `translateY` anywhere;
- no separate preview override for rail geometry;
- no scroll container behavior for brandbook tabs.

If the active line still appears off, temporarily remove `overflow`, `padding-block-end`, and any tab-related rules from `claude-preview-overrides.css` and test only the component CSS.

## Manual visual checks after next change

Run:

```bash
git fetch origin
git checkout phase-3-forms-controls-claude-alignment
git pull
npm run site:dev
```

Open:

```text
/components/previews
/components/forms
```

Check specifically:

```text
/components/previews → MetralyTabs
/components/previews → Engineering Dashboard Editor preview
/components/forms → MetralySelect / MetralyTabs
```

Visual checklist:

- selected underline is centered on / visually aligned with the thin rail;
- tabs cannot be scrolled by mouse wheel, touchpad or horizontal trackpad gesture in brandbook previews;
- tab labels do not shift vertically when scrolling or hovering;
- disabled tab is dim but readable;
- tabs with counts do not overlap and do not clip;
- dashboard editor does not create page-level horizontal scroll;
- dashboard editor toolbar tabs use the same geometry as the state board tabs.

## Validation commands before merge

After visual fixes:

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

Expected target:

- typecheck passes;
- Jest passes;
- Next site build passes;
- Storybook build passes;
- Playwright e2e passes.

## Merge guidance

Do not expand PR #4 into tables, charts, widgets or dashboard redesign.

After tabs and editor scroll are visually acceptable:

1. run validation commands;
2. add final PR comment with validation results;
3. mark PR ready for review or merge it into `main`;
4. next PR should be `MetralyTable / data-display visual alignment`.

Suggested next branch after PR #4 merge:

```text
phase-4-table-data-display-claude-alignment
```

## Do not forget

The earlier runtime error was caused by adding client hooks to a primitive used by Server Components. Keep reusable UI primitives server-compatible unless there is a strong reason to make them client-only.

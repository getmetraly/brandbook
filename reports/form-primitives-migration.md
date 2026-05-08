# Form Primitives Migration Pass

## Status

Completed.

## Scope

This pass continued the `@metraly/ui` package foundation work by moving the first group of preview form primitives into reusable package components.

## New package components

Added under `packages/ui/src/components/`:

- `MetralyCheckbox.tsx`
- `MetralyRadio.tsx`
- `MetralySwitch.tsx`
- `MetralySelect.tsx`
- `MetralyTabs.tsx`
- `WidgetPickerCard.tsx`

Added package styles:

- `packages/ui/src/styles/metraly-forms.css`
- `packages/ui/src/styles/metraly-widget-picker.css`

Updated package exports:

- `packages/ui/src/index.ts`

## Preview components migrated to shims

Updated under `site/app/components/previews/`:

- `TelemetryCheckbox.tsx` delegates to `MetralyCheckbox`.
- `TelemetryRadio.tsx` delegates to `MetralyRadio`.
- `TelemetrySwitch.tsx` delegates to `MetralySwitch`.
- `TelemetrySelect.tsx` delegates to `MetralySelect`.
- `TelemetryTabs.tsx` delegates to `MetralyTabs`.
- `WidgetPickerCard.tsx` delegates to `WidgetPickerCard`.

## Tests added

Added under `site/__tests__/`:

- `MetralyForms.test.tsx`
- `WidgetPickerCard.test.tsx`

Coverage includes:

- accessible checkbox name and checked state
- accessible radio name and checked state
- switch role and `aria-checked`
- select label and selected value
- selected tab state
- widget picker selected state, title, description, state and tags

## Storybook stories added

Added under `stories/`:

- `MetralyForms.stories.tsx`
- `WidgetPickerCard.stories.tsx`

## Accessibility notes

- Form controls use native input/select elements where possible.
- Checkbox and radio remain label-wrapped for server-safe rendering and accessible names.
- Switch exposes `role="switch"`, `aria-checked`, and an `aria-label` when the label is a string.
- Tabs expose `role="tablist"`, `role="tab"`, and `aria-selected`.
- Widget picker exposes `role="option"` and `aria-selected`.

## Server component safety

The migrated preview components do not pass event handlers into `@metraly/ui` components. Optional handler props exist only for future client wrappers.

## Validation

Static validation performed:

- package JSON files parsed successfully
- no `implementation-pack/` directory found
- no `unzipped/` directory found
- new preview shims import from `@metraly/ui`
- new styles are imported in `site/app/layout.tsx`

TypeScript execution in this sandbox is validated locally with:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
```

## Next recommended pass

Proceed with dashboard-specific primitives:

1. `DashboardGrid`
2. `DashboardWidget`
3. `WidgetRegistry`
4. `dashboard.repository.ts`
5. `dashboard.store.ts`

Then migrate:

- `TelemetryEmptyState`
- `TelemetrySkeleton`
- `TelemetryToast`
- `TelemetryModal`

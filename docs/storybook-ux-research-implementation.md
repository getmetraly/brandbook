# Storybook UX Research Implementation

Status: implemented follow-up after the Storybook-driven UX research pass.

## Goal

Make Storybook a stricter source of truth for component UX instead of a mix of canonical primitives, scenario demos, and temporary story-level workarounds.

## Implemented improvements

### Drawer and BottomSheet separation

`MetralyDrawer` stories no longer turn the drawer into a bottom sheet with story-local CSS. Drawer examples now demonstrate side or full-screen navigation/context panels. Mobile utility-tray behavior remains in `MetralyBottomSheet`.

Rule:

- `MetralyDrawer` = side or full-screen navigation/context panel.
- `MetralyBottomSheet` = mobile utility tray for filters, pickers, and quick actions.

### New Component State Board

Added `Scenarios/New Component State Board` to cover the newer public seams separately from the existing component state board:

- `MetralyButton`
- `MetralyInput`
- `MetralyBadge`
- `MetralySegmentedControl`
- `MetralyNavigationTree`
- `MetralyCodeBlock`
- `MetralyDrawer`
- `MetralyBottomSheet`

### Select keyboard UX

`MetralySelect` now supports a more complete select/listbox keyboard flow:

- ArrowDown / ArrowUp open and move through options.
- Home / End move within the option list.
- Enter / Space select.
- Escape closes and restores focus.
- Outside pointer closes.
- Hidden input supports form submit when `name` is passed.

### Segmented control interaction modes

`MetralySegmentedControl` now has `interactionMode`:

- `radio` — arrows move focus and selection. Default.
- `toolbar` — arrows move focus; Enter/Space confirm selection.

Use `toolbar` inside dense action bars and filter toolbars.

### NavigationTree accessibility

`MetralyNavigationTree` now includes:

- typeahead focus by visible item label;
- `aria-posinset`;
- `aria-setsize`.

The component still keeps the existing visual language and canonical tone vocabulary.

### DashboardWidget state copy

`DashboardWidget` no longer hard-codes product-specific error text/actions into the primitive. It now accepts:

- `stateTitle`
- `stateDescription`
- `stateAction`

Default fallback copy remains available for generic empty/error states.

### Metrics Explorer mobile filters

`MetricsExplorerRecipe` now keeps the primary time range control inline and moves advanced mobile filters into `MetralyBottomSheet`:

- team;
- repository;
- comparison mode.

This keeps mobile density without forcing fixed-width filters into the main toolbar.

### Recipe state realism

Recipes now show more real product states:

- Auth: loading, invalid credentials, SSO.
- Integrations: installed, available, needs auth, syncing, error.
- DashboardWidget: empty/error/disconnected with custom actions.

## Verification

Passed locally:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
```

`site:test` passed 23 suites / 155 tests. `build-storybook` completed with bundle-size warnings only.

Blocked in this sandbox:

```bash
npm run test:e2e
```

Reason: Playwright Chromium is not installed in the sandbox and browser download is unavailable.

## Files to delete

None.

## Follow-up: recipe density and mobile QA

After the package-level overflow fixes and dashboard mobile pass, the remaining recipes were tightened so they no longer create oversized demo surfaces or rely on desktop spacing at narrow widths.

### AuthFormRecipe

- Uses `100dvh` instead of fixed `820px` height.
- Uses clamped viewport padding and a narrower auth card width.
- Keeps the same canonical composition but reduces header/icon/panel spacing.
- Preserves loading, invalid credentials, SSO, and mobile stories.

### IntegrationCardRecipe

- Uses real filter/search state instead of a visual-only toolbar.
- Uses compact card density and tighter card copy.
- Keeps installed, available, needs-auth, syncing, optional, and error states.
- Adds an empty result state for filtered searches.

### WizardLayoutRecipe

- Replaces the mobile steps drawer with `MetralyBottomSheet`, matching the overlay rule for mobile utility trays.
- Keeps the step indicator recipe-only, but makes the progress rows more compact.
- Adds a review snapshot state so the wizard shows the next-step summary instead of stopping at source selection.
- Uses canonical `MetralyCodeBlock accent="primary"`.

These changes keep recipes as migration references while avoiding large blank areas, oversized containers, and desktop-only spacing assumptions.

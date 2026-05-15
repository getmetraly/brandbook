# Metraly UI Foundation Agent Rules

**Status:** active for `getmetraly/brandbook` and downstream `getmetraly/metraly/ui` migration work.  
**Last updated:** 2026-05-15

This document defines how agents must extend or refactor Metraly UI components after the shared foundation consolidation work.

---

## 1. Foundation-first rule

Do not create one-off visual structure for reusable UI surfaces.

Before adding or changing a component, check whether it should compose one of the foundation primitives:

| Foundation | Owns | Semantic components that compose it |
|---|---|---|
| `MetralyPanel` | lowest-level surface, border, radius, focusable panel wrapper | `CardShell`, wizard panels, explicit panel-only layouts |
| `CardShell` | card/widget header/body/footer/overlay layout, equal height, footer pinning | `MetralyCard`, `MetralyMetricCard`, `DashboardWidget`, future `WidgetCatalogCard` |
| `FieldShell` | label, helper/error text, ids, disabled/loading/error state rhythm | `MetralyInput`, `MetralySelect`, `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, filter chips |
| `OverlayShell` | modal dialog frame, scrim, focus trap, body lock, Escape close, header/body slots | `MetralyDrawer`, `MetralyBottomSheet`, future plugin/AI/mobile drawers |
| `StateBlock` | empty/error/gated/no-results/loading content states | `MetralyEmptyState`, `DashboardEmptyState`, widget/card/table empty and error states |
| `NavigationItemFrame` | visual navigation row, icon/label/meta/marker/accent overflow contract | `MetralySidebarItem`, `MetralyNavigationTree` visual rows |
| `useRovingSelection` | controlled/uncontrolled selection and roving keyboard focus | `MetralyTabs`, `MetralySegmentedControl`, future selector groups |
| `HandlePrimitive` | drag/resize/move/drop affordance look, focus ring, active/disabled state | `DashboardResizeHandle`, `MoveMenu`, `DashboardWidget` drag handle, drop indicators |

---

## 2. Semantic component rule

Do not collapse semantic components into one mega component.

Keep public components separate when they answer different product questions:

- `MetralyCard` = generic content card.
- `MetralyMetricCard` = scalar KPI / metric summary.
- `DashboardWidget` = editable dashboard canvas widget shell.
- `MetralyInput`, `MetralySelect`, `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch` = native/ARIA-specific form controls.
- `MetralyTabs` = tablist/tab semantics only.
- `MetralySegmentedControl` = radiogroup/selection semantics.
- `MetralySidebarItem` = route/link navigation.
- `MetralyNavigationTree` = tree/treeitem navigation.
- `MetralyDrawer` and `MetralyBottomSheet` = different placements over the same overlay foundation.

Agents may share foundations, hooks, CSS contracts, and token usage, but must not merge public APIs when ARIA roles, product meaning, or interaction models differ.

---

## 3. Refactor safety checklist

For every foundation refactor:

1. Preserve public component names and exports unless the migration plan explicitly says to add a compat alias.
2. Preserve existing Storybook story behavior unless the story itself is obsolete.
3. Preserve role/name/value accessibility contracts.
4. Move repeated layout/state logic into foundation components instead of copying CSS fixes across components.
5. Update tests or add static guard tests for the new foundation contract.
6. Update `docs/metraly-ui-to-brandbook-component-map.md`, `docs/metraly-ui-to-brandbook-component-plan.md`, and `docs/component-contract.md` when a new foundation becomes canonical.
7. Do not use pulse markers as drag handles or decoration.
8. Do not use tabs for route navigation.
9. Do not introduce raw feature-level colors; use semantic tokens.
10. Keep responsive behavior explicit at 320, 375, 390, 430, 768, 1024, 1280, and 1440px.

---

## 4. Current consolidation status

The following foundation iterations are now represented in brandbook code:

```text
1. Forms foundation: FieldShell
2. Overlay foundation: OverlayShell
3. State foundation: StateBlock
4. Navigation item foundation: NavigationItemFrame
5. Roving selection foundation: useRovingSelection
6. Board interaction foundation: HandlePrimitive
```

The next migration work should use these foundations instead of introducing new one-off shells.

## 9. Wizard alignment rule

Agents must not fork wizard layout structure inside scenarios. Product-like wizard stories must use `WizardLayout` with the default top progress placement:

```tsx
<WizardLayout steps={steps} contentWidth={840} footer={actions}>...</WizardLayout>
```

Allowed variants:

- default `progressPlacement="top"` for app-like product flows;
- `progressPlacement="side"` only when documenting the rail pattern itself.

Do not wrap footer actions in a full-width panel unless the product design explicitly calls for a footer surface. Footer actions should align with the centered wizard card and preserve the Back/primary action rhythm used in the demo app.

## 10. Dashboard Wizard vs Connector Wizard rule

Do not treat every wizard as the same centered card.

Use this split:

```text
Connector/setup/onboarding wizard
  -> WizardLayout default top progress
  -> one focused card
  -> footer actions below the card

Dashboard wizard / dashboard builder
  -> feature-owned split recipe
  -> compact builder rail on the left
  -> dashboard preview canvas on the right
  -> local compact stepper for template/widgets/settings
```

The dashboard builder recipe can compose wizard foundation pieces, but it must preserve the app mental model: the user is configuring a dashboard while seeing the preview, not stepping through an isolated modal-like setup card.


### Wizard parity rule

When changing wizard stories, first identify whether the target is connector setup or dashboard builder. Connector setup uses `WizardLayout`; dashboard builder uses the AppShell-like scenario composition. Keep the top stepper bounded to the wizard card width. Add search/filter affordances to any dashboard-builder list that can exceed visible rows.

# Component Contract

`packages/ui` is the production translation of the prototype primitives.

## Token contract

- New component CSS should use `--m-*` tokens first.
- `--metraly-*` may exist only as compatibility aliases.
- No component should depend on the old preview-hardening CSS layer.

## Component surface

The rebuilt primitive surface includes:

- `StateBadge`
- `MetralyBadge`
- `CardShell`
- `MetralyCard`
- `MetralyPanel`
- `MetralyMetricCard`
- `MetralyTable`
- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`
- `WidgetPickerCard`
- `DashboardWidget`
- `DashboardToolbar`
- `DashboardDropZone`
- `DashboardResizeHandle`
- chart wrappers from `@metraly/ui/charts`

## Surface layering rules

Card-like components must follow this hierarchy:

```text
MetralyPanel = surface primitive
CardShell = layout foundation
MetralyCard = generic content card
MetralyMetricCard = metric summary card
DashboardWidget = editable widget shell/chrome
DashboardGrid / BoardCanvas = layout layer
```

Do not collapse semantic components into one overloaded public `Card`. Reuse the shared foundation instead.

## State rules

- Default, hover, focus-visible, selected, disabled, loading, empty, new/unread, stale/delayed, error/disconnected, dragging, and resizing states must match the prototype density and tone.
- Widget picker rows stay compact.
- Default drop zones stay pulse-free.
- Drag affordance is always grip dots.
- Resize handles appear only in the correct states.

## Responsive rules by component

### MetralyCheckbox / MetralyRadio / MetralySwitch

- Controls must remain readable inside 3/2/1 form grids.
- Label and help copy may wrap.
- Control chrome stays compact and does not scale up for mobile.

### MetralySelect

- Trigger stays full-width inside its container.
- Popover list must remain viewport-safe with internal scrolling when needed.
- Long labels may truncate in the trigger but must not force page overflow.

### MetralyTabs

- Tabs stay in a single row and may horizontal-scroll on narrow widths.
- Active underline remains aligned with the tab label.
- Tabs do not force page-level overflow.

### StateBadge

- Always render as compact `inline-flex`.
- Never stretch to fill parent width.
- Truncation is allowed before layout distortion.

### DashboardResizeHandle

- Resize handles remain outside content rhythm.
- They stay visually compact at every breakpoint.
- Do not replace them with larger mobile-only affordances.

### DashboardDropZone

- Default, active, and rejected states remain pulse-free.
- Copy may wrap on narrow widths.
- The drop zone owns its own compression before any page-level overflow is introduced.

### DashboardToolbar

- Tabs may horizontal-scroll on mobile.
- Search, sync state, and actions wrap into additional rows as needed.
- Buttons stay reachable without clipping.

### MetralyTable

- Keep real `<table>` semantics.
- Use the table frame for horizontal scrolling.
- Keep sticky headers active.
- Footer stays compact and must not widen the table.

### WidgetPickerCard

- Desktop usage assumes a compact right-rail card.
- Mobile usage assumes a full-width dense list item.
- Selected state is border + background + glow only.

### DashboardWidget / WidgetShell

- Desktop usage assumes compact multi-column widgets.
- Mobile usage assumes full-width stacked widgets.
- Header content may wrap by row, but drag grip, title hierarchy, and state badge remain intact.

### CardShell / MetralyCard / MetralyPanel / MetralyMetricCard

- `MetralyPanel` owns the low-level surface.
- `CardShell` owns the shared card layout foundation: header/body/footer/overlay slots, equal-height behavior, footer pinning, overflow, density, tone, and state metadata.
- `MetralyCard` composes `CardShell` for generic content cards.
- `MetralyMetricCard` composes `CardShell` for KPI/scalar metric summaries.
- Consumers may change layout around these shells, not the shell language inside them.
- On narrow widths they should widen or stack before their internals become unreadable.

### Chart wrappers

- Charts render inside responsive containers.
- X-axis tick density reduces on narrow widths.
- Cards may reduce spacing on mobile, but charts must stay clipped to their shell.
- Chart wrappers must not require fixed desktop widths to render correctly.

## Intentional no-pulse divergence

`WidgetPickerCard` does not render `PulseWave`. Selected state uses `border-color: var(--m-cyan-500)` + `box-shadow: var(--m-glow-selected)` + `background: var(--m-cyan-bg)` only.

`DashboardDropZone` remains pulse-free in the production brandbook implementation. Active state uses border + background color change only.

Do not reintroduce `PulseWave` in:
- `WidgetPickerCard` (any state)
- Widget library rows
- `DashboardDropZone` idle/active/default
- Drag handles

See `docs/design-principles.md` for the full rationale.


## Foundation consolidation update — 2026-05-15

The card-shell refactor is now extended into the rest of the reusable component system. Brandbook components must compose foundation primitives before adding local layout/state CSS.

| Foundation | Canonical responsibility | Current consumers |
|---|---|---|
| `CardShell` | card/widget header, body, footer and overlay layout | `MetralyCard`, `MetralyMetricCard`, `DashboardWidget` |
| `FieldShell` | shared control ids, label/helper/error structure, disabled/loading/error rhythm | `MetralyInput`, `MetralySelect`, `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, `MetralyFilterBar` chips |
| `OverlayShell` | dialog shell, scrim, focus trap, body lock, Escape close | `MetralyDrawer`, `MetralyBottomSheet` |
| `StateBlock` | empty/error/gated/no-results/loading placeholder content | `MetralyEmptyState`, `DashboardEmptyState`, widget empty/error bodies |
| `NavigationItemFrame` | visual nav row, icon/label/meta/marker/accent overflow contract | `MetralySidebarItem`, `MetralyNavigationTree` rows |
| `useRovingSelection` | controlled/uncontrolled value and arrow/Home/End focus movement | `MetralyTabs`, `MetralySegmentedControl` |
| `HandlePrimitive` | drag/resize/move/drop affordance style and focus contract | `DashboardResizeHandle`, `MoveMenu`, `DashboardWidget` drag handle, `DashboardDropZone` line |

Semantic components remain public. Foundations own structure and interaction glue; feature/product components own product copy, routing, data loading and domain-specific actions.

## WizardLayout app-aligned rhythm update — 2026-05-15

`WizardLayout` now defaults to an app-aligned wizard composition:

- horizontal top stepper first;
- centered content column controlled by `contentWidth`;
- one canonical wizard card containing header, body and review content;
- footer actions below the card, not forced into a full-width panel;
- optional `progressPlacement="side"` is reserved for documentation-dense layouts only.

Rules:

- Use the default top progress layout for product-like scenarios, Dashboard Wizard, Connector Wizard and onboarding previews.
- Use side progress only when the story is explicitly documenting the rail primitive or when dense docs require it.
- Do not create custom one-off wizard shells inside stories. Compose `WizardLayout` and tune content with slots.
- Wizard cards should feel like the demo app shell while keeping brandbook tokens, cyan operational accent, dark surfaces, focus rings and canonical status badges.

## Wizard scenario split update — 2026-05-15

Two wizard families are now explicit in Storybook:

| Story family | Required layout | Notes |
|---|---|---|
| `Components/WizardLayout` / Connector setup | `WizardLayout` default top stepper + centered setup card | Mirrors the Connector Setup Preview app flow: progress first, one focused card, source tiles, preview command, footer actions below. |
| `Scenarios/DashboardWizard` | App-recipe split layout: left builder rail + right live preview | Mirrors the Dashboard Preview app flow. Do not force this into the generic centered connector wizard card. |

Rule: `WizardLayout` remains the canonical primitive for connector/setup/onboarding flows. Dashboard Wizard is a product scenario that may compose a compact stepper and builder panel because the preview canvas is the primary surface.

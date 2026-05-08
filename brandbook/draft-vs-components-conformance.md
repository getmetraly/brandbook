# Draft vs Components Conformance Review

Status: review / decision support  
Scope: `site/app/components/page.tsx` as the stable visual reference and `/draft` as the experimental implementation surface.  
Important constraint: the `/components` page must be treated as a protected baseline.  It should not be changed unless there is explicit approval.  This patch restores `site/app/components/page.tsx` to the canonical baseline and only adds this review document.

## Review goal

The goal is to compare every useful element from the `/components` page with the current `/draft` page and identify:

- whether the draft page has a matching component or scenario;
- which version is better as a design-system direction;
- what should be promoted, refined, merged, or kept as reference;
- what should not be used yet.

The `Metric source` select/dropdown from `/components` is intentionally excluded from this comparison.  The dropdown/select affordance still needs redesign and should not drive the current draft page.

## Source surfaces

### `/components` page

The `/components` page is a compact visual lab.  It includes:

- buttons;
- semantic badges;
- metric widget cards;
- board edit mode states;
- layout system preview;
- Recharts showcase;
- form input;
- empty state.

This page is strong because it is minimal, stable, and visually aligned with the original Metraly direction.  It should remain unchanged as a reference baseline.

### `/draft` page

The `/draft` page is the experimental implementation surface.  It currently contains:

- checkbox;
- radio;
- switch;
- search;
- tabs;
- segmented control;
- widget picker;
- widget shell;
- grid item;
- metric cards;
- board composition;
- topbar;
- toolbar;
- sidebar;
- command palette;
- action menu;
- context menu;
- popover;
- tooltip;
- drawer;
- modal;
- table rows;
- toasts;
- notifications;
- timeline;
- state badges;
- empty state;
- skeleton;
- drag overlay;
- Recharts telemetry card.

This page is stronger as a component coverage surface, but it is not yet production-ready.  It needs API hardening, accessibility review, focus management, interaction testing, and visual simplification before promotion.

## Component-by-component comparison

| `/components` element | `/draft` equivalent | Match level | Better direction | Why | Recommended action |
| --- | --- | --- | --- | --- | --- |
| Primary button | Raw buttons in hero/toolbar (`btn btn-primary`) | Partial | `/components` | The `/components` button is simple, stable, and already follows the no-jump hover rule.  `/draft` uses the same raw style but does not introduce a real reusable button component. | Keep `/components` as visual reference.  Create a dedicated `TelemetryButton` only after button API states are defined. |
| Secondary button | Raw buttons in toolbar (`btn btn-secondary`) | Partial | `/components` | Same base style, but `/components` demonstrates the pair clearly and with less noise. | Keep as baseline; do not over-brand secondary controls. |
| Ghost action | Hero and navigation links use ghost-like buttons | Partial | `/components` | `/components` keeps ghost action quiet and predictable.  `/draft` uses it as navigation, which is acceptable but less focused as component documentation. | Keep baseline; document usage rules for low-priority actions. |
| Semantic badges | `TelemetryStateBadgeDraft` and inline `brand-badge` | Strong | Mixed | Generic badges from `/components` are better for category labels (`Telemetry`, `Healthy`, `Review`, `Blocked`).  `TelemetryStateBadgeDraft` is better for live operational states (`Live`, `Delayed`, `Disconnected`, `No data`). | Split into two components: `BrandBadge` for categories and `TelemetryStateBadge` for operational state. |
| Metric widget cards | `MetricPreview`, `TelemetryDashboardWidgetDraft`, board widgets | Strong | `/draft` for product scenario, `/components` for simplicity | `/components` metric cards have excellent visual simplicity.  `/draft` demonstrates realistic engineering analytics usage and composability. | Preserve `/components` visual rhythm; harden the draft widget frame as the reusable implementation. |
| Flow efficiency card with pulse label | `MetricPreview` and board composition | Strong | `/components` visual, `/draft` data model | The `/components` card is minimal and iconic.  `/draft` adds useful synthetic data and multiple tones but risks visual noise. | Use `/components` as the canonical metric-card visual target.  Use `/draft` data shape for scenarios. |
| Board edit selected widget | `TelemetryGridItemDraft`, `TelemetryDragOverlayDraft` | Strong | `/components` as reference, `/draft` as implementation path | `/components` shows selected/dragging/drop/full-width/ghost states together, which is better for reviewing the interaction model.  `/draft` starts separating reusable pieces. | Keep `/components` intact as the board-edit reference.  Promote draft pieces only after keyboard and dnd-kit behavior is tested. |
| Drag handle | `TelemetryDragOverlayDraft`, grid item preview | Strong | `/draft` | `/draft` can enforce the rule that there is no pulse indicator before `Drag to move`, and can become dnd-kit-compatible. | Promote after keyboard instructions, ARIA labels, and overlay portal behavior are defined. |
| Drop zone | Board composition / grid item context | Partial | `/components` | `/components` drop zone is clearer and more explicit.  `/draft` currently focuses more on cards than drop-zone state. | Add a dedicated `TelemetryDropZoneDraft` before promotion. |
| Ghost preview | Drag overlay/grid item | Partial | `/components` | `/components` has a direct ghost preview example.  `/draft` has drag overlay but less explicit placement preview. | Add ghost-preview state to grid item or create a separate primitive. |
| Full-width widget state | Board composition featured card | Partial | `/components` | `/components` visibly expresses full-width state with a badge and span.  `/draft` has a featured card, but the full-width intent is less explicit. | Add `fullWidth` state to `TelemetryDashboardWidgetDraft` or `TelemetryGridItemDraft`. |
| Layout sidebar | `TelemetrySidebarDraft` | Strong | `/draft` | `/components` sidebar is a static layout reference.  `/draft` sidebar is closer to a reusable component. | Promote after responsive collapse and active/focus states are tested. |
| Layout toolbar | `TelemetryToolbarDraft`, `ToolbarPreview` | Strong | `/draft` | `/draft` has realistic toolbar composition with search, sync, share and add-widget actions. | Use `/draft` toolbar as the implementation candidate; keep `/components` toolbar as a simple reference. |
| Board canvas placeholder | Board composition and empty state | Partial | `/components` | `/components` board canvas is visually clearer as a layout placeholder.  `/draft` has richer board content, but less of a pure empty canvas state. | Keep canvas placeholder design; merge with `TelemetryEmptyStateDraft` for empty boards. |
| Recharts showcase | `RechartsTelemetryCardDraft` | Strong | Mixed | `/components` `RechartsShowcase` is better for validating chart primitives.  `/draft` is better for showing charts inside a widget shell. | Keep both: primitive-level chart showcase in `/components`, product composition in `/draft`. |
| Board name input | `TelemetrySearchDraft` is not equivalent | Weak | `/components` | `/components` native input is a clearer form-field reference.  `/draft` has search, but not a general input field. | Add `TelemetryInputDraft` before claiming form parity. |
| Metric source select | Excluded | Not reviewed | Not applicable | Dropdown/select affordance is intentionally excluded until reworked. | Do not render on `/draft`; revisit as a separate design task. |
| Empty state | `TelemetryEmptyStateDraft` | Strong | `/draft` | `/draft` is more reusable and closer to a componentized empty-state primitive. | Promote after copy slots, icon/pulse options, and action slot API are defined. |

## Overall findings

### What is stronger in `/components`

1. **Visual restraint**: the page is calmer and closer to the desired minimalist Metraly feel.
2. **Metric-card rhythm**: the original widget cards have better spacing, fewer accents, and a stronger product feel.
3. **Board edit-mode overview**: selected, dragging, drop zone, full-width and ghost preview are easier to understand in one composition.
4. **Form input baseline**: the simple board-name input is clearer than the current draft equivalents.
5. **Low-noise documentation**: the page works as a baseline reference because it does not try to show every possible state.

### What is stronger in `/draft`

1. **Component coverage**: `/draft` includes many more implementation candidates than `/components`.
2. **Scenario realism**: synthetic engineering analytics data makes the components easier to evaluate in context.
3. **Reusable direction**: sidebar, toolbar, widget shell, state badge, empty state, skeleton, table row, and drag overlay are closer to reusable components.
4. **Operational states**: live/delayed/disconnected/no-data states are more explicit.
5. **Promotion path**: `/draft` is the right place to harden components before moving anything into canonical `/components`.

## Promotion recommendations

### Promote first, after hardening

- `TelemetryStateBadgeDraft`
- `TelemetryEmptyStateDraft`
- `TelemetrySkeletonDraft`
- `TelemetryToolbarDraft`
- `TelemetrySidebarDraft`
- `TelemetryDashboardWidgetDraft`
- `TelemetryTableRowDraft`
- `TelemetryGridItemDraft`

These components already map well to product needs and the `/components` visual direction.

### Keep as draft for now

- `TelemetryCheckboxDraft`
- `TelemetryRadioDraft`
- `TelemetrySwitchDraft`
- `TelemetryTabsDraft`
- `TelemetrySegmentedControlDraft`
- `TelemetryActionMenuDraft`
- `TelemetryContextMenuDraft`
- `TelemetryPopoverDraft`
- `TelemetryTooltipDraft`
- `TelemetryDrawerDraft`
- `TelemetryModalDraft`
- `TelemetryCommandPaletteDraft`
- `TelemetryDragOverlayDraft`
- `RechartsTelemetryCardDraft`

These require accessibility, keyboard, focus management, API, and responsive review before promotion.

### Do not promote yet

- Dropdown/select-related components.

The `Metric source` select from `/components` is excluded from this comparison, and dropdown/select is not ready for promotion.  Its affordance needs a separate design pass.

## Recommended next step

Do not change `/components`.  Use it as a visual baseline.  Continue iterating in `/draft` until each draft component meets the following acceptance criteria:

- visual match with `/components` calm/minimal language;
- token-driven styling;
- keyboard navigation;
- visible focus states;
- no layout shift on hover;
- no excessive glow;
- reduced-motion support;
- stable API;
- documented states;
- render tests and accessibility tests.

Only after a component passes this checklist should it be proposed for promotion from `/draft` into canonical `/components`.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.

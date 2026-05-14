# Prototype Visual Specification

This document captures the visual and interaction contract that must be preserved when translating `getmetraly/docs/prototypes/brandbook/*` into the production `getmetraly/brandbook` package and docs site.

The prototype is the source of truth for visual tone. Existing notes inside markdown files are secondary when they conflict with the prototype.

## Source inputs

- `getmetraly/docs/prototypes/brandbook/Metraly Brandbook.html`
- `getmetraly/docs/prototypes/brandbook/tokens.css`
- `getmetraly/docs/prototypes/brandbook/app.jsx`
- `getmetraly/docs/prototypes/brandbook/design-canvas.jsx`
- `getmetraly/docs/prototypes/brandbook/tweaks-panel.jsx`
- `getmetraly/docs/prototypes/brandbook/primitives.jsx`
- `getmetraly/docs/prototypes/brandbook/form-controls.jsx`
- `getmetraly/docs/prototypes/brandbook/widgets.jsx`
- `getmetraly/docs/prototypes/brandbook/state-board.jsx`
- `getmetraly/docs/prototypes/brandbook/dashboard-editor.jsx`
- `getmetraly/docs/prototypes/brandbook/docs.jsx`

## Product personality

Metraly brandbook is a dense engineering intelligence workspace.

It should feel:

- operational;
- calm;
- dark;
- compact;
- precise;
- telemetry-first;
- production-grade rather than decorative.

It must not drift into:

- marketing landing page styling;
- large soft SaaS cards;
- generic dashboard templates;
- bright neon decoration;
- preview-only styling that is not present in `packages/ui`.

## Global canvas

The prototype shell uses a dark workspace canvas with layered surfaces.

Required hierarchy:

| Layer | Purpose | Token intent |
| --- | --- | --- |
| Canvas | Page and editor background | `--m-bg-0` |
| Structural chrome | Sidebar, topbar, section headers | `--m-bg-1` |
| Primary surface | Cards, panels, controls, widget shells | `--m-bg-2` |
| Raised / hover | Hovered rows, elevated controls, popovers | `--m-bg-3` |
| Active / pressed | Pressed controls and active chrome | `--m-bg-4` |

Rules:

- Use dark-on-dark contrast through borders, subtle elevation, and tokenized foreground color.
- Do not brighten component backgrounds to compensate for low contrast.
- Keep the visual weight low; the prototype relies on compact density, not heavy shadows.
- Body-level horizontal overflow is forbidden.

## Typography

Prototype typography uses `Inter` for UI text and `JetBrains Mono` for telemetry, metrics, and compact machine-readable metadata.

Rules:

- UI labels, body copy, tabs, buttons: `Inter`.
- Numeric metrics, deltas, IDs, timestamps, route-like breadcrumbs: `JetBrains Mono`.
- Prefer 10px, 11px, 12px, 13px, and 16px text scales for dense UI.
- Large display typography is rare and must not dominate dashboard surfaces.
- Metadata should be uppercase or letter-spaced only where the prototype uses it.

## Spacing and density

The prototype exposes density as a first-class toggle: `comfortable` and `compact`.

Required spacing model:

| Area | Comfortable intent | Compact intent |
| --- | --- | --- |
| Outer board padding | 18-24px | 12-16px |
| Card / widget internal padding | 12-16px | 8-12px |
| Dense row gap | 6-8px | 4-6px |
| Control horizontal padding | 10-12px | 8-10px |
| Toolbar gaps | 8-12px | 6-8px |
| Section gaps | 18-24px | 12-18px |

Rules:

- Controls must stay compact even on mobile.
- Responsive behavior should collapse columns before increasing component scale.
- Hover and selected states must not change layout height.
- Do not introduce vertical jumps during hover, focus, selected, dragging, or resizing states.

## Radius and borders

The prototype uses restrained radius and thin borders.

Rules:

- Small controls and row items use small radius.
- Cards, panels, widgets, and popovers use medium radius.
- Avoid large rounded SaaS surfaces unless the prototype surface clearly uses them.
- Borders are the primary separation mechanism.
- Selected states may increase border emphasis but must not change component dimensions.

## Accent and semantic color

Cyan is the operational signal. Purple is secondary depth and should be used sparingly.

Rules:

- Cyan is allowed for selected state, focus, active nav, live/new status, telemetry accents, and primary operational actions.
- Purple is allowed for secondary chart series and depth accents.
- Warning, error, success, stale, disabled, and neutral states must remain muted and tokenized.
- Do not use cyan as generic decoration.
- Do not use multiple saturated accents in the same small surface.

## Glow contract

The prototype exposes glow as a toggle. Glow is functional, not decorative.

Allowed glow usages:

- focus-visible ring;
- selected control or selected picker state;
- active navigation marker;
- live/new operational signal;
- explicit telemetry/chart accent.

Forbidden glow usages:

- idle cards;
- every icon;
- every badge;
- drop zones by default;
- repeated ornamental backgrounds.

## Pulse-wave contract

Pulse-wave is semantic.

Allowed:

- logo mark;
- live or new status marker;
- toolbar sync chip;
- chart or telemetry accent when explicitly annotated;
- selected control marker where the prototype uses it.

Forbidden in production components:

- `WidgetPickerCard` rows;
- widget library rows;
- `DashboardDropZone` idle/default/active states;
- drag handles;
- generic icons;
- repeated sidebar decoration.

This intentionally narrows exploratory prototype usage. Dense operational screens become noisy when every selectable surface pulses.

## Form controls

### Checkbox and radio

- Compact square/circle chrome.
- Label and help copy may wrap; chrome must not scale up.
- Checked/selected state uses cyan accent and tokenized focus.
- Disabled state lowers opacity and removes interactive cursor.
- Hover changes surface/border only; no movement.

### Switch

- Slim track, compact thumb.
- On state uses cyan operational signal.
- Off state remains neutral and low contrast.
- Thumb movement must be smooth and dimension-stable.

### Select

- Trigger is full-width inside its container.
- Text truncates before causing overflow.
- Popover is raised, dark, border-separated, and viewport-safe.
- Long option lists scroll internally.
- Do not introduce decorative chevrons or oversized dropdown chrome beyond the prototype tone.

### Tabs

- Tabs stay compact and may horizontal-scroll.
- Active underline or marker aligns with label text.
- Tabs must not force page overflow.
- Avoid pill-style tab redesign unless a prototype section explicitly uses it.

## Badges and state chips

State badges are compact, inline, and semantic.

Rules:

- Badges never stretch to full width.
- Badge copy may truncate before distorting layout.
- `live` and `new` may use pulse dots.
- Warning/error/stale states should communicate through muted semantic color and text, not through aggressive glow.
- Badge height must align with dense table rows and widget headers.

## Tables

Tables are first-class product surfaces, not markdown tables.

Required behavior:

- Keep real `<table>` semantics.
- Use sticky headers where applicable.
- Horizontal overflow belongs inside the table frame.
- Footer/status rows remain compact.
- Row hover uses background/border tone only and must not shift layout.
- Numeric telemetry columns use mono font and right alignment when appropriate.
- Status cells use `StateBadge` or equivalent semantic chip, not ad hoc badges.

## Cards, panels, and metric cards

Shell components own visual rhythm.

Rules:

- Use `MetralyCard`, `MetralyPanel`, `MetralyMetricCard`, `DashboardWidget`, and `MetralyChartCard` before creating local shells.
- Do not recreate border, radius, selected, hover, or glow behavior in page-local CSS.
- Metric values use mono font.
- Secondary copy should be muted and compact.
- Header slots must tolerate wrapping without breaking badges or actions.

## Widget picker

Widget picker rows are compact right-rail items on desktop and dense full-width list rows on narrow layouts.

Required states:

- default;
- hover;
- selected;
- disabled;
- dragging/new when applicable.

Rules:

- Selected state is border + background + optional selected glow.
- No pulse wave in widget rows.
- Icon slot remains compact.
- Description text must not create rail overflow.
- Disabled rows remain readable but clearly unavailable.

## Dashboard widget shell

Dashboard widgets must match the editor prototype.

Rules:

- Widget header contains drag grip, title hierarchy, optional state badge, and actions.
- Drag affordance is neutral grip dots only.
- Resize handles appear only for selected/resizing widgets.
- Widget body may scroll internally when content is dense.
- Empty, loading, stale, disconnected, and error states must preserve shell dimensions.
- Dragging state may use opacity/border changes but must not create pulse decoration.

## Dashboard toolbar

Toolbar is dense operational chrome.

Rules:

- It may wrap into multiple rows on narrow widths.
- Tabs can horizontal-scroll.
- Search, sync state, time range, and action buttons must remain reachable.
- Buttons stay compact and tokenized.
- Toolbar sync/live indicator may use semantic pulse.

## Drop zones and resize handles

Drop zones are editing affordances, not telemetry signals.

Rules:

- Default, active, and rejected drop zones remain pulse-free.
- Active state uses border and background emphasis.
- Rejected state uses semantic error/warning color without aggressive glow.
- Resize handles stay small and outside content rhythm.
- Handles do not become large mobile-only controls.

## Charts

Charts must live inside responsive chart cards or widget shells.

Rules:

- Use responsive containers.
- Reduce tick density on narrow widths.
- Keep chart content clipped to its shell.
- Use cyan for primary series and purple for secondary series.
- Chart badge/header slots must be constrained and must not force card width.
- Empty/loading/error states must preserve the chart shell contract.

## Dashboard editor composition

Desktop prototype composition:

- left sidebar;
- topbar;
- central dashboard board;
- optional right widget library rail;
- dense widgets arranged in a board/grid.

Responsive composition:

- desktop keeps board + library rail;
- tablet and mobile stack the library below the board;
- board may scroll internally;
- page body must not scroll horizontally.

## Accessibility and interaction

Rules:

- Focus-visible state is required for all interactive controls.
- Hover cannot be the only state indicator.
- Disabled state must be conveyed visually and through native/ARIA semantics.
- Tables must preserve semantic table structure.
- Icon-only buttons require accessible labels.
- Drag/drop and resize affordances must have keyboard-accessible fallbacks or documented limitations.

## Verification checklist

Every implementation pass must verify:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Manual visual smoke surfaces:

- `/components`
- `/components/forms`
- `/components/dashboard`
- `/components/charts`
- `/components/previews`
- `/editor`
- `/patterns/widget-editor`
- Storybook state boards for forms, dashboard widgets, tables, picker cards, and charts.

Viewport coverage:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## Implementation priority

1. Tokens and CSS variables.
2. Primitive control parity.
3. State coverage and badges.
4. Tables and dense data surfaces.
5. Widget picker and dashboard shell.
6. Dashboard toolbar, drop zone, and resize affordances.
7. Charts and chart card wrappers.
8. Storybook/state-board coverage.
9. Responsive smoke tests.

## Anti-regression rules

- Do not solve production gaps with preview-only CSS overrides.
- Do not reintroduce legacy hardening layers.
- Do not use markdown notes as authority when prototype behavior is visible and current.
- Do not create a second design language for mobile.
- Do not make tables/cards/widgets visually larger to hide spacing mismatch.
- Do not use pulse/glow as generic decoration.

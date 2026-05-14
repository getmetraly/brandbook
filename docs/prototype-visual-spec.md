# Prototype Visual Specification

This document captures the visual and interaction contract that must be preserved when translating `getmetraly/docs/prototypes/brandbook/*` into the production `getmetraly/brandbook` package and docs site.

The prototype is the source of truth for visual tone. Existing notes inside markdown files are secondary when they conflict with the prototype.

## Source inputs

Last inspected prototype source: `getmetraly/docs` commit `2cd9359165a7aeed050cd206c133f7b9f97568d9` (`add brandbook prototype`).

Prototype files:

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

If the prototype changes, update this section with the new commit SHA and re-run the parity audit before changing production components.

## Traceability index

| Prototype source | Primary purpose | Production target | Required proof |
| --- | --- | --- | --- |
| `tokens.css` | Core surfaces, typography, radius, shadow, focus, density and motion variables | `packages/ui/src/styles/*.css` | Token mapping table and visual smoke screenshots |
| `primitives.jsx` | Shared icons, badges, cards, pulse and low-level surfaces | `packages/ui/src/components/*`, `packages/ui/src/dashboard/*` | Storybook states and component docs |
| `form-controls.jsx` | Checkbox, radio, switch, select, tabs and control states | `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, `MetralySelect`, `MetralyTabs` | Form state board screenshots |
| `widgets.jsx` | Widget picker, widget shell, table, toolbar, drop zone and resize affordances | `WidgetPickerCard`, `DashboardWidget`, `MetralyTable`, `DashboardToolbar`, `DashboardDropZone`, `DashboardResizeHandle` | Dashboard/story state board screenshots |
| `state-board.jsx` | Exhaustive state board for prototype review | `stories/*` and `/components/*` routes | All relevant states rendered in Storybook |
| `dashboard-editor.jsx` | Realistic engineering intelligence dashboard/editor composition | `/editor`, `/components/dashboard`, dashboard primitives | Desktop/tablet/mobile screenshots |
| `docs.jsx` | Documentation tone and production handoff language | `docs/*.md`, `site/app/*` docs routes | Docs route smoke check |
| `design-canvas.jsx` | Artboard framing and review canvas | Storybook/story layout wrappers, preview routes | Visual regression framing without production restyling |
| `tweaks-panel.jsx` | Accent, glow, density, pulse and scenario toggles | CSS variables, data attributes and docs contracts | Density/glow/pulse behavior documented or intentionally removed |

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

## Token mapping requirements

Exact token values must be verified during Phase 1 of the parity audit. This table defines the minimum mapping that must exist and remain stable.

| Prototype token family | Production target | Required behavior |
| --- | --- | --- |
| `--m-bg-*` | `packages/ui/src/styles/*.css` | Canvas, chrome, cards, raised and active surfaces keep the same dark-on-dark hierarchy. |
| `--m-fg-*` | `packages/ui/src/styles/*.css` | Text hierarchy supports dense UI without brightening surfaces. |
| `--m-cyan-*` | `packages/ui/src/styles/*.css` | Cyan remains the operational signal for focus, selected, live/new and primary telemetry. |
| `--m-purple-*` | `packages/ui/src/styles/*.css` | Purple remains secondary depth and secondary chart series, not a generic accent. |
| `--m-line*` | `packages/ui/src/styles/*.css` | Thin borders separate surfaces and states without adding heavy shadows. |
| `--m-r-*` | `packages/ui/src/styles/*.css` | Radius stays restrained across controls, rows, cards, panels and popovers. |
| `--m-glow-*` | `packages/ui/src/styles/*.css` | Glow appears only for focus, selected and live/new semantics. |
| `--m-dur-*` | `packages/ui/src/styles/*.css` | Motion is short, stable and never changes layout dimensions. |
| `--m-control-*` | `packages/ui/src/styles/*.css` | Controls remain compact in both comfortable and compact density. |
| `--m-font-*` | `packages/ui/src/styles/*.css` | `Inter` is UI font; `JetBrains Mono` is telemetry/metrics/meta font. |

A token is considered incomplete when it only exists inside preview or story CSS but not in production `packages/ui` styles.

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

## Intentional divergences from prototype

These differences are intentional and must not be "fixed" back to the prototype without an explicit design decision.

| Prototype behavior | Production decision | Reason |
| --- | --- | --- |
| Widget picker rows may use pulse-like visual emphasis | `WidgetPickerCard` rows do not render `PulseWave` | Picker rows are selection affordances, not live telemetry. Pulse creates noise in dense rails. |
| Drop zones may feel animated in exploratory prototype states | `DashboardDropZone` uses border/background only | Drop zones are edit affordances, not operational signals. |
| Drag affordance can inherit surrounding accent energy | Drag handles are neutral grip dots only | Dragging must stay calm and predictable. |
| Generic selected/active surfaces could overuse glow | Glow is limited to focus, selected and live/new semantics | Prevents neon drift and preserves telemetry hierarchy. |
| Mobile could be redesigned as a separate simplified experience | Mobile keeps the same design language with fewer columns | Prevents a second design system. |
| Mobile navigation could remain a partial drawer on all narrow widths | Narrow mobile uses a full-screen navigation drawer; larger mobile/tablet keeps a side drawer | Full-screen nav prevents cramped intermediate states on `mobile1` while preserving tablet density. |
| Standalone resize handles can be useful in state boards | Full dashboard/editor scenarios do not render standalone resize handles | Resize handles are component/edit affordances and should appear only on selected/resizing widgets or isolated state examples. |

## Component implementation contracts

### Form controls

Production files:

- `packages/ui/src/components/MetralyCheckbox.tsx`
- `packages/ui/src/components/MetralyRadio.tsx`
- `packages/ui/src/components/MetralySwitch.tsx`
- `packages/ui/src/components/MetralySelect.tsx`
- `packages/ui/src/components/MetralyTabs.tsx`

Prototype references:

- `form-controls.jsx`
- `state-board.jsx`

Required:

- compact chrome;
- stable hover/focus/selected/disabled states;
- density support;
- no hover jumps;
- wrapping labels/help text without scaling controls.

Forbidden:

- oversized mobile controls;
- decorative chevrons or loud popovers;
- page-level overflow from long labels/options.

### Badges and state chips

Production files:

- `packages/ui/src/components/StateBadge.tsx`
- `packages/ui/src/components/MetralyBadge.tsx`

Prototype references:

- `primitives.jsx`
- `state-board.jsx`

Required:

- compact inline rendering;
- semantic colors;
- optional indicator;
- pulse only for `live` and `new` by default;
- truncation before layout distortion;
- full label discoverability via tooltip/title when a constrained parent truncates chip text.

Forbidden:

- full-width badges;
- aggressive glow for warning/error/stale;
- using badges as decorative pills.

### Tables

Production files:

- `packages/ui/src/components/MetralyTable.tsx`
- production table styles in `packages/ui/src/styles/*`

Prototype references:

- `widgets.jsx`
- `dashboard-editor.jsx`

Required behavior:

- keep real `<table>` semantics;
- use sticky headers where applicable;
- horizontal overflow belongs inside the table frame;
- footer/status rows remain compact;
- row hover uses background/border tone only and must not shift layout;
- numeric telemetry columns use mono font and right alignment when appropriate;
- status cells use `StateBadge` or equivalent semantic chip, not ad hoc badges.

Forbidden:

- div-based fake tables;
- markdown-like table styling;
- page-level horizontal overflow;
- row hover layout shift.

### Cards, panels, and metric cards

Production files:

- `packages/ui/src/components/MetralyCard.tsx`
- `packages/ui/src/components/MetralyPanel.tsx`
- `packages/ui/src/components/MetralyMetricCard.tsx`
- chart card wrappers from `@metraly/ui/charts`

Prototype references:

- `primitives.jsx`
- `dashboard-editor.jsx`

Required:

- shell components own visual rhythm;
- metric values use mono font;
- secondary copy stays muted and compact;
- header slots tolerate wrapping without breaking badges or actions.

Forbidden:

- page-local recreation of card borders/radius/hover/selected states;
- large soft SaaS cards that break dense dashboard tone.

### Widget picker

Production files:

- `packages/ui/src/components/WidgetPickerCard.tsx`

Prototype references:

- `widgets.jsx`
- `dashboard-editor.jsx`

Required states:

- default;
- hover;
- selected;
- disabled;
- loading;
- dragging;
- new where applicable.

Rules:

- rows are compact right-rail items on desktop;
- rows become dense full-width list items on narrow layouts;
- selected state is border + background + optional selected glow;
- no pulse wave in widget rows;
- icon slot remains compact;
- description text must not create rail overflow.

### Dashboard widget shell

Production files:

- `packages/ui/src/dashboard/DashboardWidget.tsx`
- `packages/ui/src/dashboard/DashboardResizeHandle.tsx`

Prototype references:

- `widgets.jsx`
- `dashboard-editor.jsx`

Required:

- header contains drag grip, title hierarchy, optional state badge and actions;
- drag affordance is neutral grip dots only;
- resize handles appear only for selected/resizing widgets;
- widget body may scroll internally when content is dense;
- empty, loading, stale, disconnected and error states preserve shell dimensions;
- dragging state may use opacity/border changes but must not create pulse decoration;
- footer content participates in the widget flex layout and must not be clipped at narrow widths.

### Dashboard toolbar

Production files:

- `packages/ui/src/dashboard/DashboardToolbar.tsx`

Prototype references:

- `dashboard-editor.jsx`

Required:

- dense operational chrome;
- tabs, search, sync state, time range and actions remain reachable;
- toolbar may wrap into multiple rows on narrow widths;
- tabs can horizontal-scroll;
- buttons stay compact and tokenized;
- toolbar sync/live indicator may use semantic pulse;
- toolbar content must not force the page wider than the viewport.

### Drop zones and resize handles

Production files:

- `packages/ui/src/dashboard/DashboardDropZone.tsx`
- `packages/ui/src/dashboard/DashboardResizeHandle.tsx`

Prototype references:

- `widgets.jsx`
- `dashboard-editor.jsx`

Required:

- default, active and rejected drop zones remain pulse-free;
- active state uses border and background emphasis;
- rejected state uses semantic error/warning color without aggressive glow;
- resize handles stay small and outside content rhythm;
- handles do not become large mobile-only controls;
- handles are rendered only by selected/resizing widget shells or isolated component/state-board stories, not as free-floating controls in complete dashboard/editor pages.

### Charts

Production files:

- `packages/ui/src/charts/*`

Prototype references:

- `dashboard-editor.jsx`

Required:

- use responsive containers;
- reduce tick density on narrow widths;
- keep chart content clipped to its shell;
- use cyan for primary series and purple for secondary series;
- chart badge/header slots must be constrained and must not force card width;
- empty/loading/error states must preserve the chart shell contract.

## Dashboard editor composition

Desktop prototype composition:

- left sidebar;
- topbar;
- central dashboard board;
- optional right widget library rail;
- dense widgets arranged in a board/grid.

Responsive composition:

- desktop keeps board + library rail;
- tablet uses overlay navigation and keeps widget-library access through the editor action;
- mobile collapses to a single board column;
- narrow mobile navigation is full-screen;
- widget library is a bottom sheet on mobile;
- board may scroll internally;
- page body must not scroll horizontally;
- full dashboard scenarios must not render standalone resize handles outside selected/resizing widgets.

## Storybook scenario rules

- Storybook stories should expose component behavior, not hide broken production behavior.
- Scenario-specific CSS is allowed for composing realistic pages and editor shells.
- Scenario-specific CSS must not be used as a substitute for fixing reusable `packages/ui` components.
- DOM mutation or post-render cleanup is forbidden for production-like Storybook scenarios.
- If a visual affordance should not exist in the scenario, do not render it in JSX.

## Accessibility and interaction

Rules:

- Focus-visible state is required for all interactive controls.
- Hover cannot be the only state indicator.
- Disabled state must be conveyed visually and through native/ARIA semantics.
- Tables must preserve semantic table structure.
- Icon-only buttons require accessible labels.
- Drag/drop and resize affordances must have keyboard-accessible fallbacks or documented limitations.
- Repeated table badges should not all behave as live regions unless the state is genuinely updating and important to announce.

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

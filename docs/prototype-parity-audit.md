# Prototype Parity Audit Backlog

This backlog turns `docs/prototype-visual-spec.md` into a component-by-component audit plan for bringing `getmetraly/brandbook` into full visual and behavioral alignment with `getmetraly/docs/prototypes/brandbook/*`.

The prototype remains the source of truth. Existing markdown notes are supporting context only.

## Goals

- Verify every production primitive against the prototype visual language.
- Close gaps in spacing, colors, borders, state behavior, and responsive behavior.
- Ensure Storybook and site routes demonstrate realistic product usage rather than isolated decorative demos.
- Keep all production rules in `packages/ui` and documented contracts, not in preview-only CSS layers.

## Non-goals

- Do not redesign Metraly.
- Do not introduce a second mobile-specific visual language.
- Do not edit `getmetraly/docs`, `getmetraly/metraly`, or `getmetraly/website` from this repo.
- Do not reintroduce legacy preview-hardening or temporary compatibility layers.

## Reference documents

- `docs/prototype-visual-spec.md`
- `docs/component-contract.md`
- `docs/design-principles.md`
- `docs/responsive-contract.md`
- `docs/composition-patterns.md`
- `docs/storybook-contract.md`
- `docs/site-contract.md`

## Prototype reference files

Use these as the comparison set:

- `getmetraly/docs/prototypes/brandbook/tokens.css`
- `getmetraly/docs/prototypes/brandbook/primitives.jsx`
- `getmetraly/docs/prototypes/brandbook/form-controls.jsx`
- `getmetraly/docs/prototypes/brandbook/widgets.jsx`
- `getmetraly/docs/prototypes/brandbook/state-board.jsx`
- `getmetraly/docs/prototypes/brandbook/dashboard-editor.jsx`
- `getmetraly/docs/prototypes/brandbook/docs.jsx`
- `getmetraly/docs/prototypes/brandbook/design-canvas.jsx`
- `getmetraly/docs/prototypes/brandbook/tweaks-panel.jsx`

## Audit matrix

| Area | Production target | Prototype reference | Required outcome |
| --- | --- | --- | --- |
| Tokens | `packages/ui/src/styles/*.css` | `tokens.css` | All `--m-*` surface, foreground, accent, radius, shadow, focus, density, and motion intent documented or implemented. |
| Forms | `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, `MetralySelect`, `MetralyTabs` | `form-controls.jsx` | Control chrome, spacing, focus, hover, selected, disabled, compact/comfortable density align with prototype. |
| Badges | `StateBadge`, `MetralyBadge` | `primitives.jsx`, `state-board.jsx` | Inline compact badges, semantic colors, optional pulse only for live/new. |
| Cards | `MetralyCard`, `MetralyPanel`, `MetralyMetricCard` | `primitives.jsx`, `dashboard-editor.jsx` | Shell rhythm, border, radius, padding, metric typography, hover/selected behavior match prototype. |
| Tables | `MetralyTable` | `widgets.jsx`, `dashboard-editor.jsx` | Dense table semantics, sticky headers, mono numeric columns, compact footer/status rows. |
| Picker | `WidgetPickerCard` | `widgets.jsx`, `dashboard-editor.jsx` | Compact rail card, selected state without pulse, disabled/dragging states stable. |
| Dashboard widgets | `DashboardWidget` | `widgets.jsx`, `dashboard-editor.jsx` | Header hierarchy, grip dots, state badge slot, body state handling, selected/resizing behavior. |
| Toolbar | `DashboardToolbar` | `dashboard-editor.jsx` | Dense tabs/search/actions/sync state with wrapping and no overflow. |
| Drop zone | `DashboardDropZone` | `widgets.jsx` | Active/rejected/default states use border/background only, no pulse. |
| Resize handle | `DashboardResizeHandle` | `widgets.jsx` | Small neutral handles only visible in correct selected/resizing states. |
| Charts | `@metraly/ui/charts` | `dashboard-editor.jsx` | Responsive chart cards, constrained badge slots, cyan/purple series language, clipped content. |
| Storybook | `stories/*` | `state-board.jsx` | State boards cover realistic states and viewport-safe layouts. |
| Site routes | `site/app/*` | `app.jsx`, `docs.jsx` | Routes demonstrate real composition and inherit production UI package language. |

## Required states per component family

### Controls

- default;
- hover;
- focus-visible;
- checked/selected/on;
- unchecked/off;
- disabled;
- invalid/error where applicable;
- compact density;
- comfortable density;
- narrow viewport wrapping.

### Data and telemetry surfaces

- default;
- loading;
- empty;
- stale/delayed;
- error/disconnected;
- live/new;
- warning;
- success;
- dense table row hover;
- footer/status row.

### Dashboard editing surfaces

- idle;
- hover;
- selected;
- dragging;
- drop active;
- drop rejected;
- resizing;
- disabled/unavailable;
- library open;
- library closed;
- narrow stacked editor layout.

## Component findings checklist

For each audited component, record:

```md
### ComponentName

- Prototype reference:
- Production files:
- Storybook coverage:
- Site route coverage:
- Visual parity:
  - surface:
  - border/radius:
  - spacing/density:
  - typography:
  - colors:
  - glow/pulse:
- Behavior parity:
  - hover:
  - focus-visible:
  - selected/active:
  - disabled:
  - loading/empty/error:
  - drag/drop/resize if applicable:
- Responsive parity:
  - 320:
  - 375:
  - 390:
  - 430:
  - 768:
  - 1024:
  - 1280+:
- Gaps:
- Fix plan:
- Tests/snapshots:
```

## Priority phases

### Phase 1 — Token and primitive foundation

1. Compare `tokens.css` with production `packages/ui` CSS variables.
2. Document missing aliases or missing semantic tokens.
3. Verify focus, glow, radius, motion, density, and surface hierarchy.
4. Fix or document intentional divergences.

Exit criteria:

- token gaps are listed;
- intentional divergences are explicit;
- no component depends on preview-only token rescue layers.

### Phase 2 — Forms and state chips

1. Audit checkbox, radio, switch, select, tabs.
2. Audit `StateBadge` and `MetralyBadge`.
3. Verify all states in Storybook.
4. Validate compact/comfortable density.

Exit criteria:

- forms match prototype density and interaction tone;
- badges remain compact and inline;
- `live/new` pulse remains semantic only.

### Phase 3 — Tables and data surfaces

1. Audit `MetralyTable` against prototype dense table behavior.
2. Verify sticky header, footer/status row, scroll frame, mono numeric columns.
3. Ensure table route and Storybook stories include real telemetry examples.

Exit criteria:

- table does not force page overflow;
- state cells use canonical badges;
- hover/focus behavior is stable.

### Phase 4 — Dashboard shell and editor

1. Audit `WidgetPickerCard`, `DashboardWidget`, `DashboardToolbar`, `DashboardDropZone`, `DashboardResizeHandle`.
2. Verify board + right rail desktop composition.
3. Verify stacked tablet/mobile composition.
4. Ensure drag/drop/resize affordances follow the no-pulse rule.

Exit criteria:

- widget picker no longer uses pulse;
- drop zones remain pulse-free;
- resize handles are small and state-scoped;
- dashboard editor is usable without body horizontal overflow.

### Phase 5 — Charts and realistic scenarios

1. Audit chart wrappers and chart cards.
2. Verify constrained header/badge slots.
3. Verify responsive chart sizing and tick density.
4. Add/align Storybook examples with realistic DORA/flow/CI scenarios.

Exit criteria:

- charts remain clipped to shells;
- cyan/purple series language is preserved;
- chart states are represented.

### Phase 6 — Regression gates

Run:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Manual smoke routes:

- `/components`
- `/components/forms`
- `/components/dashboard`
- `/components/charts`
- `/components/previews`
- `/editor`
- `/patterns/widget-editor`

Viewport smoke matrix:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## Definition of done

A component is prototype-aligned only when:

- its production implementation uses canonical `--m-*` tokens;
- its Storybook story shows realistic states;
- its site route usage does not rely on local visual overrides;
- hover/focus/selected/disabled states match prototype tone;
- compact and comfortable density remain usable;
- mobile behavior preserves the same design language;
- any intentional divergence is documented in `docs/prototype-visual-spec.md` or adjacent contract docs.

## First implementation candidates

Start with these because they define the most visible mismatch risk:

1. `MetralyTable`
2. `WidgetPickerCard`
3. `DashboardWidget`
4. `DashboardToolbar`
5. `MetralySelect`
6. `StateBadge`
7. chart card wrappers

## PR expectations

Every implementation PR should include:

- summary of prototype references checked;
- component list touched;
- screenshots or Storybook references when possible;
- tests run;
- explicit note for any intentional divergence.

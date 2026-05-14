# Prototype Parity Audit Backlog

This backlog turns `docs/prototype-visual-spec.md` into a component-by-component audit plan for bringing `getmetraly/brandbook` into full visual and behavioral alignment with `getmetraly/docs/prototypes/brandbook/*`.

The prototype remains the source of truth. Existing markdown notes are supporting context only.

## Goals

- Verify every production primitive against the prototype visual language.
- Close gaps in spacing, colors, borders, state behavior, and responsive behavior.
- Ensure Storybook and site routes demonstrate realistic product usage rather than isolated decorative demos.
- Keep all production rules in `packages/ui` and documented contracts, not in preview-only CSS layers.
- Make each future implementation PR executable, reviewable, and screenshot-backed.

## Non-goals

- Do not redesign Metraly.
- Do not introduce a second mobile-specific visual language.
- Do not edit `getmetraly/docs`, `getmetraly/metraly`, or `getmetraly/website` from this repo.
- Do not reintroduce legacy preview-hardening or temporary compatibility layers.
- Do not chase pixel-perfect sameness when an intentional divergence is documented in `docs/prototype-visual-spec.md`.

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

## Traceability table template

Each implementation PR must update or attach a table like this for every component it touches:

| Prototype file | Prototype surface | Production file | Storybook story | Site route | Status |
| --- | --- | --- | --- | --- | --- |
| `widgets.jsx` | `TableBoard` / dashboard table examples | `packages/ui/src/components/MetralyTable.tsx` | `stories/MetralyTable.stories.tsx` | `/components/dashboard`, `/components/previews` | `needs audit` |
| `widgets.jsx` | `WidgetPickerCard` / widget library | `packages/ui/src/components/WidgetPickerCard.tsx` | `stories/WidgetPickerCard.stories.tsx` | `/components/dashboard`, `/editor` | `needs audit` |
| `dashboard-editor.jsx` | dashboard widget shell | `packages/ui/src/dashboard/DashboardWidget.tsx` | `stories/DashboardWidget.stories.tsx` | `/editor`, `/components/dashboard` | `needs audit` |
| `dashboard-editor.jsx` | toolbar/top operational chrome | `packages/ui/src/dashboard/DashboardToolbar.tsx` | `stories/DashboardToolbar.stories.tsx` | `/editor`, `/patterns/widget-editor` | `needs audit` |
| `form-controls.jsx` | select/dropdown | `packages/ui/src/components/MetralySelect.tsx` | form/control stories | `/components/forms` | `needs audit` |
| `primitives.jsx` | state badge / operational chip | `packages/ui/src/components/StateBadge.tsx` | state badge stories | all component routes | `needs audit` |
| `dashboard-editor.jsx` | chart cards and chart widgets | `packages/ui/src/charts/*` | chart stories | `/components/charts`, `/editor` | `needs audit` |

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

## Known current gaps to verify first

These are not final bug reports until confirmed visually, but they are the first areas to inspect.

### `MetralyTable`

Confirmed strengths:

- real `<table>` semantics already exist;
- `metraly-table-frame` exists;
- `stickyHeader`, `dense`, loading, empty, footer and row markers already exist.

Likely gaps to verify:

- column contract may need `mono`, `truncate`, and `status` hints;
- table-level error/disconnected state may be missing;
- sticky header and horizontal scroll must be visually verified;
- status/footer rows must stay compact at narrow widths;
- row hover must not shift height.

### `WidgetPickerCard`

Confirmed strengths:

- selected, new, loading, dragging and disabled visual states exist;
- selected state is already pulse-free in component markup;
- compact operational icon set exists.

Likely gaps to verify:

- right-rail width contract around 300-320px;
- selected/dragging CSS must not change height;
- badge/meta slots must not overflow;
- disabled/loading rows must remain readable and compact.

### `DashboardWidget`

Confirmed strengths:

- grip-dot drag handle exists;
- selected/dragging/resizing/loading/error/empty classes exist;
- resize handles are scoped to selected/resizing widgets;
- state badge slot exists.

Likely gaps to verify:

- loading/error/empty bodies use inline styles and may need production CSS classes;
- root `role=button` can conflict with interactive children;
- long title/subtitle + badge wrapping must be tested;
- widget body internal scroll must be verified for dense content.

### `DashboardToolbar`

Confirmed strengths:

- two-row toolbar structure exists;
- tabs/search/sync/actions are present;
- sync state uses `StateBadge`.

Likely gaps to verify:

- explicit time range/filter slot may be needed;
- narrow-width wrapping must preserve reachability;
- tabs must horizontal-scroll without body overflow;
- sync badge must not stretch the controls row.

### `MetralySelect`

Confirmed strengths:

- custom trigger/listbox exists;
- controlled and uncontrolled value modes exist;
- loading/error/disabled/empty states exist.

Likely gaps to verify:

- text glyph chevron may not match prototype icon language;
- keyboard listbox behavior may be incomplete;
- click-outside/Escape close behavior may be incomplete;
- long labels/options need truncation and viewport-safe scrolling;
- ARIA active option handling should be checked.

### `StateBadge`

Confirmed strengths:

- semantic state list exists;
- `sm`/`md` sizes exist;
- `subtle`/`solid` tones exist;
- default pulse is limited to `live` and `new`.

Likely gaps to verify:

- default `role=status` may be too noisy for table-heavy screens;
- truncation in constrained slots should be tested;
- warning/error/stale tones must stay muted;
- indicator/pulse must remain semantic only.

### Chart wrappers

Likely gaps to verify:

- header and badge slots need constrained layout;
- all charts must use responsive containers;
- tooltip/legend/SVG must not escape shell;
- tick density should reduce on narrow widths;
- loading/empty/error chart states should preserve card dimensions.

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

## Per-component acceptance criteria

### `MetralyTable`

Done when:

- table keeps real `<table>` semantics;
- header remains sticky inside `.metraly-table-frame` when enabled;
- horizontal overflow is contained inside the table frame;
- body never causes page-level horizontal overflow;
- numeric telemetry columns use mono font and right alignment where applicable;
- status cells use canonical `StateBadge` or equivalent semantic chip;
- loading, empty and error/disconnected states preserve table shell dimensions;
- row hover does not change row height;
- footer/status row remains compact at 320px and 375px.

### `WidgetPickerCard`

Done when:

- default, hover, selected, disabled, loading, dragging and new states are represented;
- desktop rail usage is compact at 300-320px;
- mobile usage becomes a full-width dense row without changing visual language;
- selected state is border + background + optional glow only;
- no `PulseWave` appears in picker rows;
- long titles/descriptions truncate or wrap without rail overflow;
- loading/disabled rows remain readable.

### `DashboardWidget`

Done when:

- header keeps drag grip, title/subtitle, badge and action slots stable;
- drag handle remains neutral grip dots only;
- selected and resizing states show resize handles only when appropriate;
- loading, empty, stale, disconnected and error states preserve shell dimensions;
- dense content scrolls inside widget body when needed;
- long title/subtitle + badge layout does not break;
- root selection behavior does not conflict with nested buttons/links.

### `DashboardToolbar`

Done when:

- tabs, search, sync state, time range/filter slot and actions are reachable;
- tabs horizontal-scroll on narrow widths;
- toolbar wraps into multiple rows without body overflow;
- sync live indicator may pulse only as semantic live state;
- buttons stay compact and do not jump on hover;
- 320px and 375px layouts remain usable.

### `MetralySelect`

Done when:

- trigger is full-width inside container;
- long selected labels truncate before overflow;
- popover is raised, dark, bordered and viewport-safe;
- long option lists scroll internally;
- disabled/loading/error/empty states are represented;
- Escape/click-outside close behavior works;
- ArrowUp/ArrowDown/Enter/Space keyboard behavior works or limitation is documented;
- focus-visible state is clear and dimension-stable;
- icon treatment matches prototype stroke/icon language.

### `StateBadge`

Done when:

- badge stays compact inline-flex;
- badge never stretches to full width;
- constrained slots truncate before layout distortion;
- `live` and `new` pulse by default;
- stale/warning/error states do not use aggressive glow;
- table-heavy usage does not create excessive screen-reader live regions;
- `sm` badge height aligns with dense table rows and widget headers.

### Chart wrappers

Done when:

- charts render inside responsive containers;
- chart cards constrain title/subtitle/badge/action slots;
- badge overflow cannot widen the card;
- tooltip/legend/SVG remain clipped to the shell;
- X-axis tick density reduces on narrow widths;
- loading/empty/error states preserve shell dimensions;
- cyan is primary series and purple is secondary series.

## Screenshot and visual regression protocol

Every implementation PR that changes visual behavior must include before/after screenshots or Storybook references for the relevant surfaces.

Required screenshot set when applicable:

| Surface | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Forms state board | 1440px | 768px | 375px |
| Table dense state | 1440px | 768px | 375px |
| Dashboard editor | 1440px | 1024px | 390px |
| Widget picker rail | 1440px | 768px | 375px |
| Dashboard widget states | 1440px | 768px | 375px |
| Charts/card wrappers | 1440px | 768px | 390px |

Minimum required screenshots for first implementation PR:

- table dense/default state at 1440px;
- table narrow scroll state at 375px;
- widget picker rail at 1440px;
- widget picker narrow stacked state at 375px;
- dashboard editor at 1440px and 390px.

Do not merge visual parity PRs with only unit/type checks when the changed component has visible UI impact.

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
- any intentional divergence is documented in `docs/prototype-visual-spec.md` or adjacent contract docs;
- before/after screenshots or Storybook references exist for visible changes.

## First implementation candidates

Start with these because they define the most visible mismatch risk:

1. `MetralyTable`
2. `WidgetPickerCard`
3. `DashboardWidget`
4. `DashboardToolbar`
5. `MetralySelect`
6. `StateBadge`
7. chart card wrappers

## Recommended first implementation PR scope

Keep the first implementation PR focused:

- audit and harden `MetralyTable`;
- audit and harden `WidgetPickerCard`;
- update or add the minimum Storybook examples for these two components;
- attach desktop and mobile screenshots;
- run the full verification checklist.

Do not mix chart, toolbar and select behavior into the first implementation PR unless they are blocking the table/picker screenshots.

## PR expectations

Every implementation PR should include:

- summary of prototype references checked;
- component list touched;
- screenshots or Storybook references;
- tests run;
- explicit note for any intentional divergence;
- clear statement of what was intentionally not changed.

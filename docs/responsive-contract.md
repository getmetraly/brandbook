# Responsive Contract

The production brandbook must preserve the current dense engineering dashboard aesthetic from the prototype while remaining usable at these viewport widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## Global rules

- No route may introduce body-level horizontal overflow.
- Compression happens before visual redesign. Keep the existing tone, density, and hierarchy.
- Prefer internal scroll regions over page overflow when a surface is inherently tabular or chart-dense.
- Preserve semantic structure: tables stay tables, forms stay forms, editor rails stay ordered content, charts stay accessible SVG output.
- Responsive behavior must live in production surfaces, not preview-only wrappers or temporary hardening layers.
- Storybook scenarios may use scenario-specific composition CSS, but must not use DOM mutation, post-render cleanup, hidden rescue wrappers, or preview-only CSS to compensate for broken package components.

## Layout rules

### Docs and component pages

- Docs chrome collapses to a single-column shell on narrow widths.
- Preview stages may scroll internally for wide content, but the page shell must still fit the viewport.
- Component state boards and dense galleries should use collapsing grids instead of fixed column counts.

### Forms

- Form control boards render 3 columns on desktop, 2 on tablet, and 1 on mobile.
- Controls may wrap their supporting copy, but label/value alignment must remain compact.
- `MetralyTabs` may overflow horizontally inside their own row; the page must not overflow.

### Dashboard surfaces

- `DashboardToolbar` may wrap into multiple rows on narrow screens.
- Toolbar tabs may horizontal-scroll on mobile.
- Search, sync state, and action buttons must stay reachable without clipping.
- `WidgetPickerCard` remains compact in desktop rails and becomes a full-width list row on narrow layouts.
- `DashboardWidget` remains compact in multi-column desktop layouts and becomes full-width when the board collapses.
- `StateBadge` labels should render as much text as the available shell allows and must expose the full label via tooltip/title when truncated.
- `DashboardDropZone` keeps the current neutral edit affordance language at every width.
- `DashboardResizeHandle` is an overlay affordance for selected/resizing widgets and component state-board examples; it must not appear as standalone decoration inside a full dashboard/editor scenario.

### Tables

- `MetralyTable` keeps real table semantics at every breakpoint.
- Horizontal overflow is handled by the table frame, not by page overflow.
- Sticky headers remain active inside the table scroll region.
- Footer copy stays compact and does not force table expansion.

### Charts

- Charts must render in responsive containers.
- X-axis tick density reduces on narrow widths.
- Chart cards may reduce internal spacing on mobile, but they do not change visual language.
- Chart content must not escape its card or widget shell.

### Dashboard editor

- Desktop keeps board + widget-library rail.
- Tablet uses an overlay navigation drawer and an overlay or stacked widget library depending on available height.
- Mobile keeps the same visual language but collapses to one column.
- On narrow mobile widths, primary navigation is a full-screen drawer; partial side drawers are reserved for larger mobile/tablet widths.
- The widget library opens from the `Widgets` action and behaves as a bottom sheet on mobile.
- The editor shell owns viewport height and may use internal vertical scrolling for the board.
- The editor must not introduce body-level horizontal overflow, body-level vertical artifacts, or visible resize-handle artifacts outside selected widgets.
- Standalone resize handles are allowed in component/state-board stories only, not in the full dashboard editor scenario.

## Verification

Responsive work is not complete until these checks pass:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Manual Storybook smoke URLs for dashboard responsive work:

```text
http://localhost:6006/?path=/story/scenarios-dashboard-editor--default&globals=viewport.value:mobile1
http://localhost:6006/?path=/story/scenarios-dashboard-editor--default&globals=viewport.value:mobile2
http://localhost:6006/?path=/story/scenarios-dashboard-editor--default&globals=viewport.value:desktop
http://localhost:6006/?path=/story/scenarios-component-state-board--default
http://localhost:6006/?path=/story/components-dashboardwidget--with-footer&globals=viewport.value:mobile2
http://localhost:6006/?path=/story/components-dashboardtoolbar--default&globals=viewport.value:mobile2
```

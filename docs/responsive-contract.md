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
- `DashboardDropZone` and `DashboardResizeHandle` keep the current neutral edit affordance language at every width.

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
- Tablet and mobile stack the library below the board.
- The editor stays usable without body horizontal overflow.
- Internal board scrolling is acceptable; document-level sideways scrolling is not.

## Verification

Responsive work is not complete until these checks pass:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

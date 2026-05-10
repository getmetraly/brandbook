# Testing Strategy

Status: current QA guidance for brandbook UI hardening.

## What to test

The brandbook currently needs visual and interaction verification more than deep business logic testing.

Focus on:

- visual regression;
- spacing and collision checks;
- focus-visible behavior;
- keyboard navigation;
- disabled states;
- dashboard layout responsiveness;
- DnD affordance readability;
- chart and widget wrappers;
- `/components` baseline preservation;
- Claude Design reference integration on `/components/previews`.

## Required manual QA checklist

Before shipping a visual patch:

- `/components` is unchanged unless explicitly requested.
- the grouped preview pages render all sections.
- Hero text does not feel oversized.
- Hero pulse-wave is visible and controlled.
- Sidebar logo pulse-wave is centered.
- Toolbar controls do not collide.
- Widget picker icon, title, selected circle and state badge align.
- Checkbox/radio circles are visually strong enough.
- Toasts align pulse-wave, title and body.
- Drop targets use dashed borders.
- Default drop targets do not render pulse-wave.
- Drag handles render neutral grip dots and not pulse-wave.
- Sprint burndown ideal line is visible but secondary.
- Static content uses default cursor.
- Buttons/menu items use pointer cursor.

## Automated checks

At minimum run:

```bash
cd site
npm install
npm run build
```

Additional recommended checks:

- TypeScript check.
- CSS brace balance.
- Visual screenshots for `/components` and the grouped preview pages.
- Reduced-motion review.
- Keyboard tab sequence review.

## Automated Coverage For Preview Hardening

Jest and Testing Library should cover:

- state board renders required component groups;
- disabled controls are disabled;
- tabs expose `tablist` and selected `tab`;
- tables expose loading skeleton rows, empty copy and selected rows;
- dashboard editor preview renders toolbar, widget picker, selected widget, dragging widget, drop zone, resize handles, chart widget, table widget and disconnected widget;
- chart wrappers expose accessible labels or summarized text alternatives;
- drag handles render neutral grip dots;
- drop zones do not render pulse-wave by default;
- no visible `draft` badge text is introduced by the hardening route.

Playwright should cover:

- protected `/components` baseline loads;
- `/components/previews` loads at desktop and narrow widths;
- keyboard Tab reaches major controls;
- existing `/editor` add/remove flow remains functional.

## Visual regression strategy

Use `/components` as baseline and the grouped preview pages as candidate surfaces.

Capture screenshots for:

1. `/components` protected baseline.
2. grouped preview hero and controls.
3. grouped preview real dashboard scenario.
4. grouped preview charts and DnD.
5. grouped preview product states.
6. `/components/previews` component state board.
7. `/components/previews` Engineering Dashboard Editor scenario.
8. `/components/charts` chart wrapper grid.
9. narrow viewport for `/components/previews`.
10. reduced-motion review for chart and pulse usage.

A patch should not regress readability or collision behavior.

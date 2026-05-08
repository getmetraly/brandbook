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
- `/components` baseline preservation.

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

## Visual regression strategy

Use `/components` as baseline and the grouped preview pages as candidate surfaces.

Capture screenshots for:

1. `/components` protected baseline.
2. grouped preview hero and controls.
3. grouped preview real dashboard scenario.
4. grouped preview charts and DnD.
5. grouped preview product states.

A patch should not regress readability or collision behavior.

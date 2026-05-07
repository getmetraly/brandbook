# Phase 13 Draft Page Polish

Status: draft page correction pass

This pass applies the latest visual corrections to `/draft` while keeping `/components` unchanged as the baseline reference.

## Changes

- Centered the pulse wave inside the sidebar logo mark.
- Made the sidebar logo pulse wave heavier without enlarging the container.
- Strengthened the Widget Picker selection circle so it visually matches the thicker checkbox/radio selection language.
- Aligned the pulse wave in `Board refreshed` and `Dashboard not found` toast states.
- Reduced the hero lead text size so it no longer competes with the page title.

## Scope

Changed file:

```text
site/app/components/draft/draft-components.css
```

Unchanged file:

```text
site/app/components/page.tsx
```

## Manual QA checklist

- Sidebar logo pulse wave is visually centered inside the square mark.
- Widget picker selection circle has a thicker border and does not collide with title or status.
- Toast pulse waves align vertically with the title/copy block.
- Hero lead text is smaller than the previous phase and reads as supporting copy.
- `/components` remains unchanged.

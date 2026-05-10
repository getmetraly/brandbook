# AGENTS.md — Metraly Brandbook Operating Guide

This file defines how AI/code agents should work in `getmetraly/brandbook`.

## Repository purpose

This repository is the visual source of truth for Metraly. It contains:

- brand principles;
- design tokens;
- component guidelines;
- implementation assets;
- the Next.js brandbook site;
- protected baseline examples in `/components`;
- active preview hardening work in `site/app/components/previews`.

## Language rule

All new or updated brandbook documentation must be written in English.

## Protected surfaces

### `/components`

`site/app/components/page.tsx` is the baseline/reference page. It should not be changed unless the user explicitly asks to modify `/components`.

Allowed without approval:

- read it;
- compare against it;
- document gaps;
- reference it in reports.

Not allowed without approval:

- changing layout;
- changing examples;
- removing the `Metric source` example;
- rewriting CSS specifically for `/components`.

### Preview hardening

`site/app/components/previews/` is the active working surface for experiments, component hardening, screenshot review, state coverage and product scenario examples.

## Current design snapshot

Before editing UI or docs, read:

```text
brandbook/current-design-state.md
site/app/components/previews/README.md
design-system/components.md
design-system/micro-telemetry-primitives.md
design-system/board-edit-mode.md
```

## Visual system rules

- Dark UI is the default.
- Cyan is the primary operational signal.
- Purple is a secondary depth/accent color.
- Glow must be subtle and functional.
- Pulse-wave is a brand primitive, not decoration spam.
- Pulse-wave can be used inside logo marks, state indicators, selected controls, badges, chart accents and telemetry dividers.
- Do not place pulse-wave before drag labels such as `Drag to move`.
- Drag handles must use neutral grip dots.
- Hover states must not move elements vertically.
- Focus states must be visible.
- Disabled states must be clear and non-interactive.
- Static content should use the default cursor.
- Buttons and menu items should use pointer cursor.
- Text inputs should use text cursor.
- Resize handles should use resize cursors.

## Component hardening priorities

Work from small primitives to composite surfaces:

1. Checkbox / Radio / Switch / Dropdown / Tabs / Segmented Control.
2. StateBadge / Toast / Notification / Timeline / EmptyState / Skeleton.
3. WidgetPicker / WidgetShell / GridItem / TableRow.
4. Sidebar / Topbar / Toolbar / CommandPalette / Menus / Modal / Drawer.
5. Charts and board edit mode.
6. Real dashboard scenario.

## Required state coverage

Every component candidate should show or support the relevant states:

- default;
- hover;
- focus-visible;
- active/selected;
- disabled;
- loading;
- unread/new;
- error/destructive;
- delayed/stale/no-data for telemetry states.

## Dashboard and DnD rules

- Board edit mode must show selected, dragging, drop target, resize and full-width states.
- Drop targets should use a visible dashed cyan border and subtle tint.
- Resize affordances should sit outside content rhythm and must not cover text.
- `@dnd-kit/*` and `react-grid-layout` compatibility matters.
- Zustand state should be selector-friendly.
- Recharts must be wrapped by Metraly chart primitives before product adoption.

## Documentation update rules

When changing UI or visual direction, update the relevant `.md` docs in the same patch:

- `brandbook/current-design-state.md`
- `site/app/components/previews/README.md`
- `design-system/components.md`
- `design-system/micro-telemetry-primitives.md`
- `design-system/board-edit-mode.md`
- `framework/testing-strategy.md`
- migration notes if adoption changes

## Verification checklist

Before returning a patch/archive:

- `/components` unchanged unless explicitly requested.
- preview hardening surfaces compile conceptually and import existing components.
- CSS braces are balanced.
- No visible `draft` badges unless requested.
- No pulse before drag handles.
- Hero text, toolbar, sidebar and widget picker do not collide.
- Markdown docs are in English.
- `AGENTS.md` remains aligned with current design rules.

## Output expectations for agents

When asked to provide a patch, include complete files, not diff fragments.
When asked for a full archive, include the full project tree.
When a file should be deleted, list it in a delete list instead of deleting it silently.

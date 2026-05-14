# Site Contract

`site` is a docs and showcase host for `@metraly/ui`.

## Rules

- `site` does not define its own design system.
- `site` does not ship a competing token layer.
- `site` should import the package styles and render production primitives.
- `site` should not rely on preview-hardening overrides to establish final visuals.

## Allowed responsibilities

- host the docs portal;
- host showcase pages;
- render the dashboard editor scenario from canonical primitives;
- run tests and Storybook for the rebuilt package.

## Responsive expectations

- Docs chrome must fit the viewport without body horizontal overflow.
- Page-local CSS may manage responsive layout, but it must not fork the design language from `packages/ui`.
- Component previews may use internal scroll regions for wide content.
- `/components`, `/components/forms`, `/components/dashboard`, `/editor`, and `/patterns/widget-editor` are required responsive smoke surfaces.
- Tablet and mobile routes must remain usable without reviving legacy preview-only hardening layers.

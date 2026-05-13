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

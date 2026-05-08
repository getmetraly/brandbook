# Package Foundation Rename

## Summary

The temporary local package has been renamed and reorganized into the production package foundation:

```txt
implementation-pack/
↓
packages/ui/
```

The npm package name is now:

```txt
@metraly/ui
```

## Why

`implementation-pack` was useful as a temporary migration container, but it reads like an internal delivery artifact rather than a stable design-system package.

`@metraly/ui` is shorter, conventional for frontend consumers, and can serve the brandbook site, docs, website, and the core Metraly product.

## New structure

```txt
packages/
  ui/
    package.json
    README.md
    src/
      index.ts
      components/
        MetralyBadge.tsx
        MetralyCard.tsx
        MetralyLogo.tsx
        MetralyMetricCard.tsx
        MetralyPanel.tsx
        MetralyTable.tsx
        MetralyTelemetryLine.tsx
        StateBadge.tsx
        WidgetShell.tsx
      styles/
        metraly-card.css
        metraly-logo.css
        metraly-state-badge.css
        metraly-table.css
        metraly-theme.css
        metraly-widget-shell.css
    assets/
    migration/
```

## Import policy

Preferred component imports:

```ts
import { MetralyCard, StateBadge, WidgetShell } from "@metraly/ui";
```

Preferred style imports:

```ts
import "@metraly/ui/styles/metraly-theme.css";
```

Avoid deep relative imports from `site/` into `packages/ui/`.

## Site integration

`site/package.json` now references the package with:

```json
"@metraly/ui": "file:../packages/ui"
```

`site/next.config.mjs` transpiles:

```js
transpilePackages: ["@metraly/ui"]
```

## Test integration

Jest module aliases now resolve `@metraly/ui` to `packages/ui/src/index.ts`.

## Follow-up work

- Split dashboard-only components into `packages/ui/src/dashboard` when they become stable.
- Add `packages/ui/src/tokens` when tokens are moved from CSS-only to typed token exports.
- Add `packages/ui/src/icons` when the icon system is normalized.
- Add `packages/ui/src/charts` when Recharts wrappers are promoted from draft.

# @metraly/ui

Shared React UI package for the Metraly ecosystem.

This package turns the Metraly brandbook into reusable implementation files for the core app, website, documentation, and brandbook site.

## Package name

```txt
@metraly/ui
```

## Included

- `src/components/` — reusable React primitives and dashboard-ready components.
- `src/styles/` — CSS variables, themes, component styles and interaction primitives.
- `assets/svg/` — SVG logo marks and wordmarks.
- `assets/favicon/` — favicon-safe app icon.
- `migration/` — adoption tasks for Metraly apps and sites.

## Canonical exports

The current canonical `@metraly/ui` export surface covers the following base primitives:

- `ThemeProvider`
- `MetralyCard`
- `MetralyPanel`
- `MetralyBadge`
- `StateBadge`
- `MetralyLogo`
- `MetralyMetricCard`
- `MetralyTable`
- `MetralyTelemetryLine`
- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`
- `WidgetPickerCard`
- dashboard primitives:
  - `DashboardGrid`
  - `DashboardWidget`
  - `DashboardToolbar`
  - `DashboardEmptyState`
  - `DashboardDropZone`
  - `DashboardResizeHandle`
  - `defaultDashboardWidgetRegistry`
  - `findDashboardWidgetDefinition`

## Import policy

Prefer package-level component imports:

```ts
import { DashboardWidget, MetralyCard, StateBadge, ThemeProvider } from "@metraly/ui";
```

Application code should not import from `packages/ui/src` directly. Keep imports on the public package surface or the documented public subpaths.

Prefer style imports from the style subpath:

```ts
import "@metraly/ui/styles/metraly-theme.css";
```

Avoid deep relative imports from application code into `packages/ui`.

## Brand direction

Metraly should feel like an engineering observability product: precise, self-hosted, privacy-first and telemetry-native. The visual language is built around dark technical surfaces, electric cyan accents, angular geometry, pulse lines, metric cards and calm dashboard density.

## Adoption order

1. Install the local package with `"@metraly/ui": "file:../packages/ui"`.
2. Add `@metraly/ui` to `transpilePackages` in Next.js apps.
3. Import `@metraly/ui/styles/metraly-theme.css` at the application root.
4. Wrap the app shell in `ThemeProvider` when explicit theme switching is required.
5. Replace ad-hoc logo/pulse implementations with `MetralyLogo` or package assets.
6. Migrate common cards, badges, metric blocks and dashboard shells to package components.
7. Track rollout in `migration/brandbook-adoption-tasks.md`.

## Current design status

This package should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the grouped preview hardening design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and grouped preview pages as the canonical surface.

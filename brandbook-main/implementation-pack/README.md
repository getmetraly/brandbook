# Metraly Brandbook Implementation Pack

This pack turns the Metraly brandbook into reusable implementation files for the Metraly app, website and docs.

## Included

- `assets/svg/` — SVG logo marks and wordmarks.
- `assets/favicon/` — favicon-safe app icon.
- `tokens/` — JSON and TypeScript design tokens.
- `css/` — CSS variables, themes and utility classes.
- `tailwind/` — Tailwind preset for app and website reuse.
- `react/` — reusable React brand primitives.
- `docs/` — usage guide and acceptance checklist.
- `migration/` — adoption tasks for `getmetraly/metraly` and `getmetraly/website`.

## Brand direction

Metraly should feel like an engineering observability product: precise, self-hosted, privacy-first and telemetry-native. The visual language is built around dark technical surfaces, electric cyan accents, angular geometry, pulse lines, metric cards and calm dashboard density.

## Adoption order

1. Add `tokens/metraly.tokens.json` as the source of truth.
2. Import `css/metraly-theme.css` in both app and website.
3. Add the Tailwind preset from `tailwind/metraly.preset.ts`.
4. Replace ad-hoc logo/pulse implementations with `react/MetralyLogo.tsx` or `assets/svg/metraly-logo-horizontal.svg`.
5. Migrate common cards, badges, metric blocks and dashboard shells to the primitives in `react/`.
6. Track rollout in `migration/brandbook-adoption-tasks.md`.

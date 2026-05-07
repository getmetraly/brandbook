# Brandbook Adoption Tasks

## Phase 1 — Foundation

- [ ] Add `tokens/metraly.tokens.json` to the canonical brandbook repo.
- [ ] Import `css/metraly-theme.css` into website and app.
- [ ] Add token snapshot tests.
- [ ] Add contrast checks for primary text, secondary text, CTA and status badges.

## Phase 2 — Logo system

- [ ] Replace current ad-hoc logo SVG/CSS with `assets/svg/metraly-logo-horizontal.svg`.
- [ ] Use `assets/favicon/favicon.svg` for website and app favicons.
- [ ] Add visual tests for dark and light logo variants.
- [ ] Remove duplicated clip-path logo implementations after migration.

## Phase 3 — UI primitives

- [ ] Add `MetralyLogo.tsx`.
- [ ] Add `MetralyBadge`, `MetralyPanel`, `MetralyMetricCard` and `MetralyTelemetryLine`.
- [ ] Migrate website hero, docs nav and dashboard shell to shared primitives.
- [ ] Verify no hover animation causes button jumping.

## Phase 4 — Product/dashboard alignment

- [ ] Map existing app dashboard cards to `MetralyMetricCard`.
- [ ] Normalize board/widget panels to `MetralyPanel`.
- [ ] Use graph token colors in all chart components.
- [ ] Add lifecycle tests for create/save/fetch/render flows where dashboard components depend on persisted state.

## Phase 5 — Documentation

- [ ] Link this pack from `brandbook/README.md`.
- [ ] Add examples for app, website and docs usage.
- [ ] Document migration exceptions and intentional deviations.

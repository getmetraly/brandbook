# Metraly Brandbook Full Archive — Phase 14 Documentation Freeze

This archive contains the full `brandbook-main` project tree.

## What changed in Phase 14

- Updated repository-level documentation to describe the current near-production design state.
- Added `AGENTS.md` with instructions for AI/code agents working in the brandbook repository.
- Added `brandbook/current-design-state.md` as the canonical visual snapshot.
- Updated key design-system docs to match the current `/draft` direction.
- Updated draft component README with current component inventory and promotion rules.
- Preserved `/components` as the protected baseline.

## Important files

```text
README.md
AGENTS.md
brandbook/current-design-state.md
brandbook/README.md
design-system/components.md
design-system/micro-telemetry-primitives.md
design-system/board-edit-mode.md
design-system/charts.md
framework/testing-strategy.md
site/README.md
site/app/components/draft/README.md
```

## Local verification

```bash
cd site
npm install
npm run build
npm run dev
```

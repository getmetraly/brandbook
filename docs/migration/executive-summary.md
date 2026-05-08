# Migration Executive Summary

## What This Set Contains

This folder now contains an execution-ready migration backlog for Metraly Brandbook and the repositories it informs.

## Companion Links

- [Brandbook Migration Readiness Audit](../audits/brandbook-migration-readiness-audit.md)
- [Migration Backlog Index](./README.md)
- [Website and Metraly Component Migration Plan](./website-and-metraly-component-migration-plan.md)

## Top-Level Reading Order

1. Read the [Brandbook Migration Readiness Audit](../audits/brandbook-migration-readiness-audit.md).
2. Read the [Migration Backlog Index](./README.md).
3. Use the phase backlog files for execution details.
4. Use the [Website and Metraly Component Migration Plan](./website-and-metraly-component-migration-plan.md) for the strategic phase model.

## Current Priorities

- Freeze the baseline so brandbook remains the canonical source of truth.
- Stabilize the foundation and interaction layers in `@metraly/ui`.
- Unify the high-density surfaces that carry state and data.
- Protect the dashboard editor flow and its persistence contract.
- Align the website’s public pages with shared primitives without breaking claim-safe copy.

## Key Risks

- `react-grid-layout` typing and runtime compatibility.
- React 18 versus React 19 version drift between the app and the canonical repos.
- Visual regression coverage that is still too manual.
- Documentation drift in older migration notes.
- Over-sharing primitives into website surfaces that need editorial flexibility.

## Why The Backlogs Exist

The audit identified concrete gaps in tokens, interaction primitives, dashboard surfaces, website primitives and migration scaffolding. The phase backlogs turn those gaps into execution-ready work with clear scope, tests, acceptance criteria and risks.

## Practical Guidance

- Treat the phase files as task sources, not a narrative document.
- Execute the phases in order unless a later phase is explicitly isolated and low-risk.
- Do not change `../app` or `../website` directly as part of the brandbook backlog work.
- Keep the brandbook docs aligned with the current grouped preview surface and protected `/components` baseline.

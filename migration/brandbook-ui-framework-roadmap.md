# Aligning the brandbook and UI framework

The brandbook and the UI framework are two sides of the same coin.  The brandbook codifies visual and tonal principles, while the framework implements them in code.  Keeping these artefacts synchronised ensures that changes propagate across all Metraly surfaces.

## Shared source of truth

* **Tokens**: Both the brandbook and framework rely on the same token definitions.  When a colour or spacing value changes, update the token definition first, then regenerate the tables in the brandbook automatically.
* **Components**: The framework’s components should be considered canonical implementations of the brand guidelines.  Screenshots and usage examples from Storybook can be embedded in the brandbook to illustrate correct usage.
* **Assets**: Logo files, icons and illustrations live in the `assets/` directory of this repository.  The framework can import these assets directly.

## Change workflow

1. **Design iteration**: A designer proposes a change (e.g. new accent colour or updated logo).  They update the brandbook documentation with rationale and any mockups.
2. **Token update**: Developers adjust the token definitions in the UI framework (e.g. update the value of `--color‑primary`).  They ensure that the change is backwards compatible or provide a migration plan.
3. **Component updates**: If necessary, update component styles or variants to reflect the new design.  Add new tests and update Storybook examples.
4. **Documentation**: Regenerate brandbook tables and update guidelines.  Publish a changelog entry summarising the change and its impact.

## Synchronisation schedule

Establish a regular cadence (e.g. every two weeks) where the design and engineering teams review pending brand and UI changes.  Synchronise token values, review new components and plan upcoming work.  This prevents drift between documentation and implementation.

## Governance

Create a small cross‑functional **design system council** consisting of designers, front‑end engineers and product managers.  The council reviews proposed changes to the brandbook or UI framework, ensures they align with Metraly’s mission and approves them for inclusion.  Decisions should be documented in this repository’s issues for transparency.

By maintaining a tight feedback loop between brand and implementation, Metraly can evolve its visual identity while preserving consistency and developer productivity.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.

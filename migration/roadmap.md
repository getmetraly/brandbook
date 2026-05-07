# Migration roadmap

This roadmap outlines the chronological steps required to transition Metraly’s existing products to the new brandbook and unified UI framework.  The approach is iterative and allows for gradual adoption without blocking feature development.

## Stage 1 – Inventory & discovery

* **Identify artefacts**: Audit all repositories (`metraly`, `website`, and future `docs`) for existing components, pages and assets.  Document them in the inventory files.
* **Gather requirements**: Meet with stakeholders (product, design, engineering) to collect pain points, desired improvements and must‑have features.  Pay attention to accessibility, performance and plugin extensibility.
* **Define tokens**: Extract design tokens from `globals.css` and define missing ones (spacing, radii, shadows, motion).  Document them in `tokens.md`.

## Stage 2 – Design system foundation

* **Create brandbook**: Finalise brand philosophy, typography, colours, logos, icons and motion guidelines.  Ensure they align with the product’s privacy‑first and engineering‑first ethos【632635575803481†L8-L13】.
* **Set up UI framework repository**: Scaffold the `@metraly/ui` package with the token system, base components and utilities.
* **Build documentation site**: Use the framework itself to build the documentation for the design system and brandbook.  This dog‑fooding ensures the framework covers necessary scenarios.

## Stage 3 – Incremental adoption

* **Opt‑in migration**: Start with non‑critical pages on the marketing site or internal dashboards.  Replace existing components with their framework equivalents.  Use feature flags to toggle between old and new implementations.
* **Feedback loop**: Gather feedback from early adopters and adjust the framework.  Address gaps in components or tokens.
* **Plugin updates**: Engage plugin authors to refactor their UIs against the new framework.  Provide migration guides.

## Stage 4 – Full integration

* **Core screens**: Migrate primary dashboards, onboarding flows and settings pages.  Remove remaining references to legacy components.
* **Performance and accessibility checks**: Conduct performance profiling and accessibility audits to ensure the new system does not regress in speed or compliance.
* **Documentation and training**: Publish comprehensive guidelines for developers and designers.  Host workshops to explain the new system.

## Stage 5 – Maintenance & evolution

* **Retirement of legacy code**: Delete old CSS files and redundant components.  Archive them for historical reference.
* **Continuous improvements**: Iterate on the design system based on user feedback, new product features and evolving brand direction.
* **Governance**: Establish a design system council or maintainer group responsible for approving changes, reviewing contributions and ensuring adherence to guidelines.

Following this roadmap will align the user experience across all Metraly surfaces, reduce visual debt and set a strong foundation for future growth.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.

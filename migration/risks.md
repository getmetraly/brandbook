# Migration risks and mitigation strategies

While transitioning to a new design system and UI framework will bring long‑term benefits, it also introduces potential risks.  Identifying and mitigating these risks early will help ensure a smooth migration.

## Design and brand alignment

**Risk**: The new brandbook might diverge from existing customer expectations or internal perceptions of Metraly’s identity.

**Mitigation**: Involve stakeholders from design, product and marketing in finalising the brand elements.  Validate the new logo, colour palette and typography with users and customers through prototypes before locking them in.  Ensure the brand reflects Metraly’s positioning as a self‑hosted, privacy‑first analytics platform【632635575803481†L8-L13】.

## Technical debt and refactoring effort

**Risk**: Legacy code may be difficult to refactor into the new framework, leading to parallel code paths or regression bugs.

**Mitigation**: Adopt a phased migration (see roadmap).  Use feature flags to switch individual screens or modules to the new framework.  Allocate dedicated time for refactoring and write comprehensive tests before and after migration.  Avoid “big bang” rewrites that increase risk.

## Performance overhead

**Risk**: Introducing an additional abstraction layer (the UI framework) could bloat bundle size or slow down rendering, especially on low‑powered devices.

**Mitigation**: Tree shake unused components and icons.  Use code splitting to load heavy components (e.g. charts) only when needed.  Monitor bundle sizes and use analysis tools to identify and eliminate unused dependencies.  Cache computed token values and avoid unnecessary re‑rendering.

## Accessibility regressions

**Risk**: While migrating components, accessibility features might be inadvertently dropped (e.g. missing labels, focus traps, keyboard support).

**Mitigation**: Integrate automated accessibility tests and manual audits into the migration process (see testing strategy).  Provide accessibility checklists for contributors.  Use semantic HTML and ARIA attributes consistently.

## Team adoption and learning curve

**Risk**: Developers may continue building ad‑hoc components out of habit, leading to fragmentation.

**Mitigation**: Offer training sessions and clear documentation.  Provide examples and templates.  Encourage contributions to the framework rather than local solutions.  Establish code review rules that require justification for using custom styles or components.

## Plugin ecosystem impact

**Risk**: Third‑party plugins might not update to the new UI components, resulting in inconsistent look and feel.

**Mitigation**: Communicate the migration plan to plugin authors early.  Provide compatibility shims or wrappers to allow old plugins to run with the new framework temporarily.  Offer incentives or community support to encourage plugin updates.

By proactively addressing these risks, the Metraly team can minimise disruption and ensure that the new brandbook and UI framework deliver their intended benefits.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the grouped preview hardening design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and grouped preview pages as the canonical surface.

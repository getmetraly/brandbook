# Component Design Recipes

This document is the practical cookbook for designing and implementing Metraly framework UI components in the cleaned brandbook package.

Use it together with:

- `docs/source-of-truth.md`
- `docs/design-principles.md`
- `docs/component-contract.md`
- `docs/composition-patterns.md`
- `docs/responsive-contract.md`
- `docs/style-contract.md`

## Core design recipe

Use this process for every component or component change.

1. Start from the canonical visual reference or product need.
2. Identify whether an existing production primitive can express the surface.
3. Improve the existing primitive before creating a new one.
4. Map the surface to existing `--m-*` tokens.
5. Define states before writing CSS.
6. Define density behavior before responsive behavior.
7. Keep layout styles in CSS classes, not large inline style objects.
8. Document intentional divergence when production should differ from the visual reference.

A component is not ready when it only looks correct in one desktop state. It is ready when it behaves correctly across states, density, and viewport constraints.

## Primitive promotion policy

Classify each new visual pattern as:

```text
A — Reuse existing primitive as-is
B — Improve existing primitive using the visual reference
C — Add optional variant / slot / density to an existing primitive
D — Create a new canonical primitive because no equivalent exists
E — Keep as AppKit/product composition because it is screen-level
F — Remove dead CSS / dead wrapper / obsolete story-only code
```

Do not create parallel AppKit-only implementations of primitives that already exist.

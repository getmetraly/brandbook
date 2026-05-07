# Testing strategy for UI components

Robust testing ensures that the UI framework remains stable as it evolves.  This document outlines the recommended testing practices for Metraly’s components.

## Unit tests

Write unit tests for each component using a testing library such as React Testing Library.  Unit tests should:

- Verify that components render without crashing under various prop configurations.
- Check conditional rendering (e.g. different variants of a button or card).
- Assert that event handlers (click, change, etc.) are invoked with the correct arguments.
- Mock external dependencies (e.g. context providers) where necessary.  Follow the table‑driven testing pattern described in the project guidelines【849328462375381†L62-L70】.

Run unit tests via `make test` as part of the continuous integration pipeline【849328462375381†L60-L65】.

## Snapshot and visual regression tests

For components with significant visual complexity (cards, charts, tables), add snapshot tests or visual regression tests:

- **Snapshot tests**: Render the component with typical props and store a snapshot of the generated HTML structure.  Snapshot tests help detect unexpected changes in the DOM hierarchy.  Keep snapshots concise by using shallow rendering where possible.
- **Visual regression**: Use tools like Storybook with Chromatic or Percy to capture reference screenshots.  Visual regression tests highlight differences in colours, spacing or layout after code changes.  Run these tests when tokens or theming changes.

## Accessibility testing

Accessibility compliance is non‑negotiable.  Integrate automated accessibility tests into the pipeline:

- Use `axe-core` or `@testing-library/jest-dom` to assert that rendered components are free of common accessibility issues (e.g. missing labels, insufficient colour contrast, invalid ARIA attributes).  The components should meet or exceed WCAG 2.1 AA contrast ratios; the token system is designed to support this【913460924002922†L6-L21】.
- Test keyboard navigation by simulating Tab and arrow key presses.  Ensure that custom controls (e.g. Draggable Tweaks Panel) have proper focus management and ARIA roles.

## Integration tests

Integration tests verify that components work together within pages:

- Render a layout (e.g. dashboard) and simulate typical user flows—adding widgets, resizing panels, adjusting filters.
- Test state persistence in local storage when users adjust preferences via the Draggable Tweaks Panel.
- Ensure that data flows correctly into charts and tables.

## Manual QA

While automated tests catch many issues, manual QA remains essential.  For each release:

1. Smoke‑test major pages across supported browsers (Chrome, Firefox, Safari, Edge) and devices (desktop, tablet, mobile).
2. Verify dark and light themes, as well as high‑contrast or reduced motion modes.
3. Validate interactions with assistive technologies, such as screen readers.

By combining unit tests, visual regression, accessibility audits and manual QA, the Metraly UI framework will remain reliable and accessible even as it grows.

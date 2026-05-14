# Final Storybook QA Checklist

Status: final manual QA gate for PR `audit/metraly-ui-brandbook-plan-review`.

This checklist exists to prevent the brandbook from drifting into demo-only Storybook surfaces. A story is considered ready only when it proves the production component behavior without story-only hacks, hidden wrappers, or oversized empty canvas areas.

## Required local commands

Run these from the repository root:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
```

Expected result:

- `ui:check` passes.
- `site:typecheck` passes.
- `site:test` passes.
- `build-storybook` completes with no functional errors. Bundle-size warnings are acceptable for this pass.

Run e2e when Playwright browsers are available:

```bash
npm run test:e2e
```

If e2e fails only because Chromium is not installed, install browsers locally or in CI and re-run before merging.

## Manual Storybook routes

Use `mobile1` first, then repeat key smoke checks at tablet and desktop widths.

### 1. Component State Board

URL:

```text
http://localhost:6006/?path=/story/scenarios-component-state-board--default&globals=viewport.value:mobile1
```

Pass criteria:

- No body-level horizontal overflow.
- Form controls remain compact and readable.
- Widget picker rows do not use decorative pulse.
- Resize handles are visible only inside the isolated state-board example, not in the full dashboard/editor scenario.
- Tables scroll internally when needed.

### 2. New Component State Board

URL:

```text
http://localhost:6006/?path=/story/scenarios-new-component-state-board--default&globals=viewport.value:mobile1
```

Pass criteria:

- Board sections align to content height instead of stretching to the tallest card.
- `MetralyInput`, `MetralySelect`, `MetralyCodeBlock`, and `MetralySegmentedControl` stay inside their containers.
- `MetralyDrawer` demonstrates navigation/context panel behavior.
- `MetralyBottomSheet` demonstrates mobile utility-tray behavior.
- No story uses raw controls where a public primitive exists, unless the story explicitly documents product-only composition.

### 3. Dashboard Editor

URL:

```text
http://localhost:6006/?path=/story/scenarios-dashboard-editor--default&globals=viewport.value:mobile1
```

Pass criteria:

- Mobile navigation opens through `MetralyDrawer`.
- Mobile widget library opens through `MetralyBottomSheet`.
- The editor does not show floating/standalone resize handles outside selected widgets.
- Toolbar actions remain reachable.
- Board and widget cards stack without clipping.
- No body-level horizontal overflow.

### 4. Foundation Tokens

URL:

```text
http://localhost:6006/?path=/story/foundation-tokens--default&globals=viewport.value:mobile1
```

Pass criteria:

- Token pages use the dark brandbook canvas.
- Token grids collapse safely.
- Color, radius, typography, and spacing examples do not overflow the page shell.

### 5. Metrics Explorer Recipe

URL:

```text
http://localhost:6006/?path=/story/patterns-metrics-explorer-recipe--mobile&globals=viewport.value:mobile1
```

Pass criteria:

- Primary time range remains visible inline.
- Advanced filters use `MetralyBottomSheet` on mobile.
- Metric cards stay compact and do not exceed viewport width.
- Chart/code/table sections stay inside panels.
- The recipe still reads as a dense engineering workspace, not a simplified mobile redesign.

### 6. Auth Form Recipe

URL:

```text
http://localhost:6006/?path=/story/patterns-auth-form-recipe--mobile&globals=viewport.value:mobile1
```

Pass criteria:

- Card fits the viewport without title/header clipping.
- Inputs and code block stay inside the panel.
- SSO, loading, and invalid-credentials stories preserve the same density and hierarchy.
- Footer actions wrap cleanly.

### 7. Integration Card Recipe

URL:

```text
http://localhost:6006/?path=/story/patterns-integration-card-recipe--mobile&globals=viewport.value:mobile1
```

Pass criteria:

- Search/filter toolbar wraps without overflow.
- Integration cards stack as compact list-like cards.
- Installed, available, needs-auth, syncing, optional, and error states are visually distinct.
- Empty filter state is visible and not oversized.

### 8. Wizard Layout Recipe

URL:

```text
http://localhost:6006/?path=/story/patterns-wizard-layout-recipe--mobile&globals=viewport.value:mobile1
```

Pass criteria:

- Mobile step navigation uses `MetralyBottomSheet`.
- Step indicator remains recipe-only and compact.
- Review snapshot is visible as the next-step summary.
- Primary and secondary actions remain reachable.

### 9. Components wildcard smoke pass

Open the `Components/*` and `Primitives/*` stories from the sidebar.

Pass criteria:

- Story canvas is dark, not white.
- Component previews are not stretched to excessive height.
- Code blocks do not escape their preview cards.
- Inputs/selects/buttons remain inside their preview containers.
- Focus rings are visible and do not shift layout.

## Non-negotiable UX rules

- Fix overflow in `packages/ui` first. Story-specific CSS may only arrange layout, not repair primitive behavior.
- Do not introduce new public components during this QA pass.
- Do not add aliases to `MetralyBadge`; keep the canonical semantic variants strict.
- Do not use `MetralyDrawer` as a bottom sheet. Use `MetralyBottomSheet` for mobile utility trays.
- Do not reintroduce decorative pulse in widget picker rows, drop zones, or drag/resize affordances.
- Keep mobile as the same dense engineering workspace with fewer visible columns, not as a separate redesigned product.

## Merge readiness

This PR is ready to move from draft to review when:

- all required local commands pass;
- e2e passes locally/CI with Playwright browsers installed, or the only blocker is explicitly tracked;
- the manual Storybook routes above pass at `mobile1`;
- no story relies on preview-only CSS to compensate for a broken package component;
- PR description reflects the final scope and verification results.

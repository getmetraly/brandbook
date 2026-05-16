# Phase 1 — Validation

This pack is a source drop. Validation runs in the brandbook repo after files are copied in.

---

## Automated

Run from the brandbook root:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run storybook              # local sanity
npm run build-storybook
npm run test:e2e
```

What each is expected to do:

- `ui:check` — lint + typecheck for `packages/ui`.
- `site:typecheck` — typecheck the `site` stories using the brandbook's tsconfig.
- `site:test` — Jest / Vitest unit tests for stories that have them.
- `storybook` — boot Storybook locally for visual inspection. Confirm the 16 new story files appear under the listed `title:` paths.
- `build-storybook` — produce the static Storybook bundle. CI consumes this.
- `test:e2e` — Playwright. The MoveMenu-a11y scenario and the connector-wizard scenario are obvious candidates for new e2e coverage.

If any of the above fail because of API drift between this pack's assumptions and the brandbook's current primitives, fix the call-sites in this pack — do not redesign the brandbook primitives.

---

## Manual QA

Run the brandbook Storybook locally and confirm each item:

### Responsiveness

- 320 px width: gauges go inline; heatmap legend collapses; settings cards stack to a single column; AI provider cards drop to one per row; tokens wrap.
- 768 px: split builder canvas still has room for a 4-gauge DORA preview.
- 1024 px: BYOLLMConnectorPanel grid is 2-up.
- 1440 px: no horizontal overflow on any scenario.

### Keyboard-only navigation

- Storybook → `Dashboard / MoveMenuA11yExample` / Default story:
  - Tab once: focus lands on the first widget tile, visible cyan ring.
  - Arrow keys: widget moves. Selected widget is announced via `aria-live` foot region.
  - Tab again: focus enters the MoveMenu primitive on the focused widget. Buttons activate via Enter/Space.
- Storybook → `Charts / MetralyHeatmap` / Deploy activity:
  - Tab into the grid: a cell gets focus.
  - Arrow keys move the focus ring cell-by-cell.
  - Enter activates `onCellActivate` (if a handler is set).
- Storybook → `Source / ConnectionTestPanel` / Ready:
  - Tab to Retry: visible focus ring, primary tone.

### Focus-visible

- Every interactive control has the cyan focus ring (`--m-glow-focus`).
- No `:focus { outline: none }` without a replacement.

### Screen-reader sanity checks (VoiceOver / NVDA / Orca)

- `MetralyGauge`: announces label, value, valuetext including unit and threshold.
- `MetralyHeatmap`: announces grid rowcount/colcount and per-cell `aria-label` text.
- `TokenInput` Validating story: validation status is announced via `aria-live`.
- `SettingsSection`: heading announces at the chosen level.
- `MoveMenuA11yExample`: the foot region announces the new position after each move.

### Token leakage

- Storybook → `Source / TokenInput` / Stored:
  - The full token is **never** in the DOM. Inspect: only the masked preview is present.
  - Replace and Clear are the only actions. No copy button.
- Storybook → `Settings / AIProviderConnectorCard` / ReadyAnthropic:
  - Same — no full key in DOM.

### Pulse glyph rule

- Storybook → `Dashboard / MoveMenuA11yExample`:
  - The drag handle is the neutral grip dots from `HandlePrimitive`, NOT the pulse-wave glyph.
- Search the pack: `grep -r "polygon(0 52%" implementation-pack/packages/ui` returns no results (the brandbook's pulse glyph clip-path lives outside this pack).

### Plugin Marketplace rule

- No "Coming soon marketplace" surface anywhere in the pack. Search:
  ```bash
  grep -r -i "marketplace" implementation-pack/
  ```
  Results should be limited to (a) docs that EXPLAIN the rule and (b) story descriptions that REFER to the rule. No production component should render a disabled marketplace teaser.

### Color discipline

- `grep -r "#[0-9a-fA-F]\{3,8\}" implementation-pack/packages/ui/src/styles/` should return zero raw hex colors. Every color goes through `--m-*` tokens, `color-mix(in oklch, …)`, or `oklch(…)`.

### Light-theme rule

- The pack does NOT block Phase 1 on light-theme parity. Stories run under the dark theme only. Light theme is P3 per the approved plan.

---

## What to escalate

If any of these fail after fixing trivial call-site drift, raise:

1. Different `useRovingSelection` signature → propose adapter PR in brandbook.
2. Different `DashboardWidget` prop shape → propose either widget-shell prop alignment or update `DashboardWidgetExamples` only.
3. `StatusBadge` enum mismatch → propose enum extension in brandbook (don't fork the badge).
4. Token storage backend assumes browser autofill → confirm `data-1p-ignore` / `autocomplete="off"` are honored by the actual password manager in use.

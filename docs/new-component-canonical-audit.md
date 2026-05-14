# New Component Canonical Audit

Status: Phase UX-2 source-level audit after checking the critical Storybook references:

- `Scenarios/Component State Board` at mobile viewport
- `Scenarios/Dashboard Editor` at mobile viewport
- `Foundation/Tokens`
- `Components/*`

The canonical baseline is the existing production-like component set and the markdown contracts:

- `docs/design-principles.md`
- `docs/responsive-contract.md`
- `docs/component-contract.md`
- `docs/prototype-visual-spec.md`
- `docs/prototype-parity-audit.md`
- `docs/recipe-composition-ux-audit.md`

## Source-of-truth interpretation

The old/canonical surfaces establish the visual language:

- dense dark engineering workspace;
- `--m-bg-0` canvas, `--m-bg-1` shell chrome, `--m-bg-2` card/control surface, `--m-bg-3` hover/raised;
- cyan is the operational primary signal;
- purple is secondary depth/accent only;
- green/yellow/red are semantic state colors;
- no decorative pulse in picker rows, drop zones, drag handles, or generic controls;
- mobile preserves the same product personality and collapses layout before changing tone.

## Public API adjustments

The new components should use the same semantic vocabulary as the rest of `@metraly/ui`:

| Component | Canonical API | Compatibility aliases |
| --- | --- | --- |
| `MetralyBadge` | `primary`, `secondary`, `success`, `warning`, `error`, `info` | none |
| `MetralyMetricCard` | `primary`, `secondary`, `success`, `warning`, `error`, `info` | none |
| `MetralyNavigationTree` | `primary`, `secondary`, `success`, `warning`, `error`, `info` | `cyan`, `purple`, `ok`, `warn`, `err` |
| `MetralyCodeBlock` | `primary`, `secondary`, `success`, `warning`, `error`, `info` | `cyan`, `ok`, `warn`, `err` |
| `StateBadge` | operational states such as `live`, `ok`, `stale`, `disconnected`, `noData` | not a generic label badge |

Compatibility aliases are retained only to reduce migration risk. New stories and docs should use canonical names.

## Component decisions

### MetralyButton

Keep public API unchanged: `primary`, `secondary`, `ghost`, `neutral`, `danger`, `dashed`.

Rationale: button variants are interaction hierarchy, not semantic status. `ghost` is heavily used in old dashboard chrome and should remain.

### MetralyInput

Keep public API unchanged.

Rationale: current implementation already follows the form-control density and token model; no separate search component is needed.

### MetralySegmentedControl

Change semantics from a generic button group to `radiogroup`/`radio`.

Rationale: this component is a mutually exclusive mode/range selector, and keyboard behavior already matches radio-like selection. This improves accessibility without changing the visual contract.

### MetralyNavigationTree

Move tone values to canonical semantic names while keeping deprecated aliases.

Rationale: the component is a new public seam and should not carry old short color names as its primary API.

### MetralyCodeBlock

Move accent values to canonical semantic names while keeping deprecated aliases.

Rationale: code/status examples should use the same visual vocabulary as badges and metric cards.

### MetralyDrawer / MetralyBottomSheet

Add shared overlay focus behavior:

- focus first interactive element or the dialog container on open;
- trap `Tab` inside the overlay;
- restore focus on close;
- lock body scroll while open;
- preserve Escape and scrim close behavior.

Rationale: these components are now public overlay primitives. Storybook scenarios use them as real migration targets, so accessibility behavior must live in the component, not in preview wrappers.

## Merge / non-merge decisions

Do not merge these as public components:

- `Drawer` and `BottomSheet` stay separate. They share internal overlay behavior, but their UX purposes differ.
- `MetralyBadge` and `StateBadge` stay separate. One is a static semantic label, the other is operational state.
- `MetralyPanel`, `MetralyCard`, and `MetralyMetricCard` stay separate. They represent layout surface, actionable object, and KPI/stat block.
- `NavigationTree`, `Sidebar`, and `SegmentedControl` stay separate. They represent different navigation models.

## Verification

Local verification after this audit:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
```

`test:e2e` is still blocked in this sandbox because Playwright Chromium is not installed and the sandbox cannot download browser binaries.

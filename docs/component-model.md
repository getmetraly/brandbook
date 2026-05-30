# Component Model

Metraly's UI is built in **three layers**. Every component sits in exactly one. The
rule that keeps the system coherent: *a component never reinvents structure that a
lower layer already owns.*

```text
┌─ App Kit ─────────────────────────────────────────────┐
│  Screen-level compositions (AppDashboardScreen, …)     │
│  Assemble semantic components into product screens.    │
├─ Semantic components ─────────────────────────────────┤
│  MetralyCard, MetralyMetricCard, DashboardWidget,      │
│  MetralyInput, PluginCatalog, SettingsSection, …       │
│  Add product meaning, copy, and data binding.          │
├─ Foundations ─────────────────────────────────────────┤
│  CardShell, FieldShell, OverlayShell, StateBlock,      │
│  NavigationItemFrame, HandlePrimitive, useRoving…      │
│  Own structure, state rhythm, ARIA, overflow, focus.   │
└────────────────────────────────────────────────────────┘
                         ▲
                  Tokens (--m-*) + CSS (metraly-*)
```

## 1. Foundations

Foundations own **how a thing is built**, never **what it means**. They are the only
place that defines header/body/footer slots, focus rings, density switching, empty /
error / loading rhythm, overlay scrims and focus traps, and roving keyboard selection.

| Foundation | Owns | Composed by |
| --- | --- | --- |
| `CardShell` | Card/widget header · body · footer · overlay slots; equal height; footer pinning; overflow; density; tone; `data-state`. | `MetralyCard`, `MetralyMetricCard`, `DashboardWidget`, `WidgetPickerCard`, `PluginCatalog` cards |
| `FieldShell` | Label, helper/error text, ids, disabled/loading/error rhythm. | `MetralyInput`, `MetralySelect`, `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch` |
| `OverlayShell` | Modal/drawer frame, scrim, focus trap, body lock, Escape close. | `MetralyDrawer`, `MetralyBottomSheet`, `TraceDrawer`, `PluginReviewDrawer` |
| `StateBlock` | Empty / error / gated / no-results / loading content states. | `MetralyEmptyState`, `DashboardEmptyState`, card / table / catalog empty + error states |
| `NavigationItemFrame` | Visual nav row — icon / label / meta / marker / accent overflow. | `MetralySidebarItem`, `MetralyNavigationTree` rows |
| `HandlePrimitive` | Drag / resize / move / drop affordance look + focus + active/disabled. | `DashboardResizeHandle`, `MoveMenu`, `DashboardWidget` drag handle |
| `useRovingSelection` | Controlled/uncontrolled selection + roving arrow/Home/End focus. | `MetralyTabs`, `MetralySegmentedControl` |

## 2. Semantic components

Semantic components compose a foundation and add **product meaning** — the copy, the
status taxonomy, the data shape, the route intent. They are intentionally **not merged**
even when they look similar:

> `MetralyCard` ≠ `MetralyMetricCard` ≠ `DashboardWidget`.
> They all compose `CardShell`, but they answer different product questions and do not
> share a public API. Do not collapse them into one "flexible card".

`WidgetShell` deliberately does not exist as its own component: a dashboard widget shell
is `CardShell` + `metraly-widget-shell.css`. Reach for `DashboardWidget` (the semantic
widget) or `CardShell` directly — never author a third shell.

## 3. App Kit

`app-kit/*` are **composition examples** — full product screens (`AppDashboardScreen`,
`AppAIWorkspaceScreen`, `AppPluginsScreen`, `AppConnectorWizardScreen`, …) assembled
entirely from semantic components and foundations. They:

- add **no** new visual primitives,
- introduce **no** parallel CSS system (only `metraly-app-*` layout glue),
- exist so product teams can copy a working screen, not so the design system forks.

If an App Kit screen needs a visual element that does not exist, the element graduates
**downward** into a semantic component or foundation first, then the screen consumes it.

## Promotion policy

When evaluating any pattern (from the product, the UI kits, or a new request), classify
it before writing code:

| Class | Meaning | Action |
| --- | --- | --- |
| **A** | Reuse an existing primitive as-is. | Import it. No new code. |
| **B** | Existing primitive is visually behind a reference. | Improve the canonical primitive in place. |
| **C** | Need a new variant. | Add an optional prop / slot / density — keep backward compatibility. |
| **D** | No equivalent exists. | Create a new canonical primitive in the right layer. |
| **E** | Screen-level only. | Keep in `app-kit`, composed from primitives. |
| **F** | Dead CSS / file / component. | Remove it. |

Hard rules:

1. If a primitive exists, never create a parallel one.
2. Improve the canonical primitive rather than forking visual structure.
3. New variants are additive props, never breaking changes.
4. Screen compositions live in `app-kit` and are built from primitives.
5. Never paste raw HTML/CSS from a prototype or UI kit as a "finished" component.
6. Never copy design-tool internal files into the repo.

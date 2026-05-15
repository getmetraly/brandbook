# Metraly UI — Naming and Status Taxonomy Freeze

**Status:** Phase 1 freeze — do not use deprecated names in new code.
**Date:** 2026-05-15
**Scope:** `getmetraly/metraly/app/ui/src` + `getmetraly/brandbook`
**Related:** `metraly-ui-to-brandbook-component-plan.md`, `metraly-ui-phase-1-inventory.md`

---

## 1. Canonical product surface names

| Canonical name | Description |
|---|---|
| `Dashboard` | Main overview surface. Contains widgets, metric cards, charts. |
| `Dashboard Editor` | In-place edit mode for a dashboard. Not a separate page — a mode toggle. |
| `Dashboard Wizard` | Guided creation flow for a new dashboard. |
| `Metrics Explorer` | Metric search, chart/table inspect, save-as-widget flow. |
| `Connectors` | Integration setup, health, reconnect/retry. Replaces "Connect Sources". |
| `Plugins` | Plugin catalog and install review. Top-level surface. |
| `Plugin Marketplace` | Gated subset of Plugins. Only live when trust requirements are met. |
| `AI Workspace` | Evidence-backed AI surface. "AI Assistant" is a capability inside it, not the surface name. |
| `Settings` | Workspace, account, API keys, teams, billing, notifications, connector settings. |

---

## 2. Deprecated names

These names must not appear in new code, sidebar labels, page titles, or route keys.

| Deprecated | Replace with | Found in |
|---|---|---|
| `AI Assistant` (as surface name) | `AI Workspace` | Historical: `App.tsx` titles map, `Sidebar.tsx` label, `AIScreen.tsx` name, `features/ai-workspace/` folder |
| `Plugin Marketplace` (as top-level nav) | `Plugins` (top-level) + `Plugin Marketplace` (gated subset) | Historical: `App.tsx` titles map (`plugins`), `Sidebar.tsx` "Marketplace" label, `features/plugins/` folder |
| `Connect Sources` | `Connectors` | Historical: `App.tsx` titles map (`wizard`), `Sidebar.tsx` "Connect Sources" label |
| `Marketplace` (sidebar label) | `Plugins` | `Sidebar.tsx` sections |
| `AI Assistant` (sidebar label) | `AI Workspace` | `Sidebar.tsx` sections |
| `Board` (without distinct product model) | `Dashboard` or `Dashboard Editor` | Historical board experiment, removed from app repo on 2026-05-15 |
| `Connect Sources` (route key `wizard`) | `connectors` | Historical `App.tsx` active state |
| `AI Soon` | — | Must not appear in copy |
| `AI direction` | — | Must not appear in copy |
| `Plugin ecosystem` | — | Must not appear in copy |
| `Next`, `Then`, `Later` (as status) | Canonical status taxonomy | Check copy/docs |

---

## 3. Route / nav / title mapping matrix

Current state in `App.tsx` titles object and `Sidebar.tsx` sections vs. canonical targets:

| Route key | Current sidebar label | Current page title | Current subtitle | Canonical name | Required action | Risk |
|---|---|---|---|---|---|---|
| `overview` / `dashboard` | Overview | Overview | Last updated 2 min ago | Dashboard | Keep label; update subtitle to token/live data | Low |
| `dash-cto` | CTO | CTO Dashboard | Strategic health, DORA trends, team velocity | Dashboard (CTO) | Title + sidebar label drift (title ≠ sidebar) | Medium |
| `dash-vp` | VP Engineering | VP Engineering | Delivery health & team performance | Dashboard (VP) | OK naming; subtitle needs data | Low |
| `dash-tl` | Tech Lead | Tech Lead | CI health, PR queue & sprint progress | Dashboard (TL) | OK naming | Low |
| `dash-devops` | DevOps / SRE | DevOps / SRE | Deploy frequency, MTTR & incidents | Dashboard (DevOps) | OK naming | Low |
| `dash-ic` | My View | My Dashboard | Personal metrics & sprint tasks | Dashboard (personal) | Sidebar "My View" ≠ title "My Dashboard" — drift | Low |
| `dash-wizard` | New Dashboard | New Dashboard | Build a custom dashboard | Dashboard Wizard | Name OK; route semantics should be wizard flow | Low |
| `metrics` | Metrics Explorer | Metrics Explorer | DORA, CI/CD, PR & custom metrics | Metrics Explorer | OK | Low |
| `ai` | AI Workspace | AI Workspace | Private · On-premise inference | AI Workspace | Completed | Low |
| `plugins` | Plugins | Plugins | Browse & install integrations | Plugins | Completed | Low |
| `wizard` | Connectors | Connectors | Onboarding wizard | Connectors | Completed | Low |
| `settings` | Settings | Settings | Platform configuration | Settings | OK name; screen is placeholder only | Low |

### Shell context bugs found

**Bug 1 — `dash-cto` sidebar/title mismatch:**
- Sidebar shows: `CTO`
- Page title shows: `CTO Dashboard`
- These are close but inconsistent; the sidebar abbreviates while the title expands.
- Risk: On role-specific dashboards, a user switching between role tabs sees abbreviated sidebar but full title in topbar. Minor visual inconsistency now; would become a real context bug if role navigation were added.

**Bug 2 — `dash-ic` sidebar/title mismatch:**
- Sidebar shows: `My View`
- Page title shows: `My Dashboard`
- Two different names for the same concept in the same screen.

**Bug 3 — `App.tsx` manual routing creates title/context binding:**
- Navigation state (`active`) is a string key in component state.
- Titles are looked up from a static object: `titles[active]`.
- If any screen logic sets `active` to an unrecognized key, the topbar gets `['Metraly', '']` — the wrong name.
- There is no URL-level source of truth. The browser address bar never reflects the current screen.

**Bug 4 — AI and Plugins labeled as active/live:**
- `AI` sidebar item shows `NEW` badge (purple pill) — implies the feature is freshly launched.
- If AI capability is `Preview` or `Gated`, this badge is misleading.
- Plugins/Marketplace is presented as fully live (no gating indicator).

---

## 4. Canonical status taxonomy

Use only these status values in `StatusBadge`, `HealthPill`, and any status-bearing copy.

| Canonical status | Meaning | Current equivalent in code | Component target |
|---|---|---|---|
| `Live` | Available and operational | `installed: true` on plugins; implicit in active routes | `StatusBadge` success |
| `Preview` | User-visible but not final | — not found | `StatusBadge` info |
| `Designed` | Design exists, not production-ready | — not found | `StatusBadge` neutral/gated |
| `Planned` | Roadmap item, not operable | — not found | `StatusBadge` neutral |
| `In progress` | Implementation active | — not found | `StatusBadge` neutral |
| `Gated` | Access-controlled or trust-gated | `installed: false` (partial) | `StatusBadge` + lock icon |
| `Policy defined` | Governance documented, UI may be non-operational | — not found | `StatusBadge` neutral |
| `Benchmark pending` | AI/claim not validated | — not found | `StatusBadge` warning |
| `Coming soon` | Display alias → maps to Planned or Designed internally | — not found | Disabled CTA only |
| `Error` | Recoverable failure | — not found in status components | `StatusBadge` danger |
| `Delayed` | Sync/data not current | — not found in status components | `StatusBadge` warning |
| `No data` | Source connected but no usable data | — not found in status components | `EmptyState` variant |

---

## 5. Current status strings found in code

| String found | File | Canonical replacement | Component target |
|---|---|---|---|
| `'On track'` | `components/ui/Badge.tsx` | `Live` | `StatusBadge` |
| `'At risk'` | `components/ui/Badge.tsx` | `Delayed` | `StatusBadge` |
| `'Blocked'` | `components/ui/Badge.tsx` | `Error` (or `Gated` if access-based) | `StatusBadge` |
| `'Done'` | `components/ui/Badge.tsx` | `Live` or remove (task state, not system status) | `StatusBadge` or task-specific |
| `'Open'` | `components/ui/Badge.tsx` | Context-dependent — likely a task/PR state, not system status | `StatusBadge` or domain-specific |
| `installed: true/false` (boolean) | `features/plugins/PluginScreen.tsx` | `Live` / `Gated` | `StatusBadge` |
| `cat: 'Sources'/'AI'/'Alerts'/'Exporters'` | `features/plugins/PluginScreen.tsx` | Plugin category labels — keep as category, not status | `Badge` (label) |
| `'NEW'` badge | `components/layout/Sidebar.tsx` (AI item) | Evaluate: if AI is `Preview`, use `StatusBadge preview` | `StatusBadge` or remove |
| `'Live local instance'` | `App.tsx` (login screen) | `Live` canonical status | Inline badge → `StatusBadge` |
| `'Synthetic data'` | `App.tsx` (first-run screen) | Map to `Preview` or `Designed` | `StatusBadge` |
| `'All systems nominal'` | `components/layout/Sidebar.tsx` | `Live` (system health) | `HealthPill` |

---

## 6. Raw color violations in status/badge code

These files still need follow-up review for token conformance before migration:

| File | Violation | Required replacement |
|---|---|---|
| `components/ui/Badge.tsx` | Cleaned on 2026-05-15. Colors now come from `var(--success)`, `var(--warning)`, `var(--error)`, `var(--cyan)`, and `var(--muted)` via `color-mix(...)`. | Replace with canonical `StatusBadge` in Phase 3 |
| `App.tsx` (first-run, login screens) | Multiple `rgba()` and hex values for borders, backgrounds, colors | Convert to CSS custom property tokens |
| `features/plugins/PluginScreen.tsx` | `color: '#E8EDF5'`, `'#2684FF'`, `'#B44CFF'` etc. per plugin card | Plugin icon colors are brand-specific — evaluate token approach |

---

## 7. Navigation semantics audit

| Navigation element | Current implementation | Correct semantics | Required fix |
|---|---|---|---|
| Sidebar nav items | `<button onClick>` — keyboard-accessible but no href/link semantics | Should be `<a>` or `<Link>` with proper route | Blocked by App.tsx manual routing — fix during React Router migration |
| Pin/unpin buttons | Native `<button type="button">` | Corrected from ad hoc span-button workaround | Completed on 2026-05-15 |
| First-run choice buttons | `<button type="button">` | OK | No change needed |
| Role dashboards | All in one state machine, no URL-level differentiation | Need distinct routes | Phase 4 — App Shell migration |
| "AI Assistant" sidebar item | No indication of Gated/Preview status | Must show status indicator if feature is not fully Live | P0 fix after taxonomy decision |

---

## 8. Required naming changes — ordered by priority

### P0 (before any migration)

1. Completed: sidebar label `AI Assistant` → `AI Workspace` in `Sidebar.tsx`.
2. Completed: sidebar label `Marketplace` → `Plugins` in `Sidebar.tsx`.
3. Completed: sidebar label `Connect Sources` → `Connectors` in `Sidebar.tsx`.
4. Completed: `titles` object in `App.tsx` now uses AI Workspace / Plugins / Connectors.
5. Completed: feature folder `features/aiAssistant/` → `features/ai-workspace/`.
6. Completed: feature folder `features/marketplace/` → `features/plugins/`.
7. Rename `WizardScreen.tsx` → `ConnectorWizardScreen.tsx` (it is the connector onboarding, not a generic wizard).
8. Remove `NEW` badge from AI sidebar item until canonical status is confirmed.

### P1 (before dashboard/editor migration)

9. Fix `dash-cto` title: make sidebar and title consistent (`CTO Dashboard` in both).
10. Fix `dash-ic` title: `My Dashboard` in both sidebar and title.
11. Add `StatusBadge` for gated/preview items in sidebar if applicable.
12. Replace `Badge.tsx` status strings with canonical taxonomy.

### P2 (cleanup)

13. Rename `features/onboarding/` to `features/connectors/` once connector wizard is migrated.
14. Closed: removed abandoned `features/board/` experiment from the app repo.

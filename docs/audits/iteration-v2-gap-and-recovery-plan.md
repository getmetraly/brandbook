# Iteration v2 gap and recovery plan

> Audit date: 2026-05-31  
> Auditor: staff review (read-only pass, no code changed, no commit made)

---

## 1. Executive summary

**What happened:**  
`iteration-v2` was a nearly-complete Storybook with rich scenarios, patterns, and component stories assembled organically over the course of the design system build. When Claude Design was given access to improve components, it rewrote a significant portion of the Storybook stories from scratch using a different structural model (`storybook/stories/` groups vs the older root `stories/` directory). The rebuild introduced a cleaner Core/Shell/Dashboard/Source group taxonomy — but it silently dropped **45 story files** that existed only in `iteration-v2`.

**What main already does better:**
- Cleaner story grouping (Core, Shell, Source, Dashboard, AppKit, Charts, Settings)
- Co-located component stories (`packages/ui/src/components/*.stories.tsx`)
- `MetralyStoryFrame` harness with stable API
- Recent visual bug fixes (narrow-viewport text-wrap, leaderboard, panel framing)
- `Shell/` group with Overlay, Shell, Sidebar, Topbar stories — absent in iteration-v2

**What iteration-v2 had that main lost:**
- All `Scenarios/*` stories — these are the most important missing content
- All `Patterns/*` stories — high reuse value
- Standalone `StepRail` stories (9 states) — component exists in main with no stories
- Standalone `WizardLayout` stories (desktop/tablet/mobile, 4 connection stages)
- `Scenarios/ConnectorWizard` — full interactive wizard scenario
- `Scenarios/Component State Board` and `Scenarios/New Component State Board`
- `StickyWizardFooter`, `ReviewPanel` — no stories in main
- `MetralyBottomSheet` — no stories in main
- `Foundation/Tokens` reference page
- `Patterns/Metrics Explorer Recipe` — full desktop/tablet/mobile pattern
- `Patterns/Auth Form Recipe` — 5-state auth form
- `Patterns/Integration Card Recipe` — installed/error/syncing card states

**What's useful in `../claude` (Metraly Design System):**
- Pure component files — no stories, no Storybook.
- Component implementations are a near-mirror of `iteration-v2` components.
- Useful as a diff surface to understand what Claude Design changed vs what was there.
- `preview/` folder contains design token HTML reference pages (colors, spacing, radius, motion, typography, components).

**What's useful in `getmetraly/app/ui`:**
- Real product. Uses `@metraly/ui` (from this brandbook) via `file:` link.
- `features/dashboardWizard/` — real wizard flow with WizardScreen, WizardSidebar, WizardSettings, WidgetPicker.
- `features/onboarding/WizardScreen.tsx` — real onboarding flow.
- `features/metricsExplorer/` — real MetricsScreen, FilterPill, BreakdownTable.
- Confirms that `WizardLayout`, `StepRail`, `MetralyShell` are critical — they're used in production.

**Recovery groups to prioritize:**
1. Wizard primitives (StepRail + WizardLayout + StickyWizardFooter + ReviewPanel stories)
2. Scenarios group (ConnectorWizard, Component State Boards, AppShellRoleContext)
3. SyncProgressPanel missing states
4. Patterns group (MetricsExplorerRecipe, AuthFormRecipe, IntegrationCardRecipe)
5. Foundation/Tokens reference

---

## 2. Sources reviewed

| Source | Path | Notes |
|---|---|---|
| `main` branch | `/home/zubarev/Projects/metraly/brandbook-worktrees/brandbook-main` | Primary current state |
| `iteration-v2` branch | `/home/zubarev/Projects/metraly/brandbook` (working dir) | Older, richer stories |
| Metraly Design System (Claude Design) | `/home/zubarev/Projects/metraly/claude` | No git, no stories, component-only reference |
| Product app (`app/ui`) | `/home/zubarev/Projects/metraly/app/ui` | `"name": "metraly"`, uses `@metraly/ui` |

**Main Storybook groups confirmed:**
AppKit, Charts, Core, Dashboard, Settings, Shell, Source + co-located components in `packages/ui/src/components/`

**iteration-v2 Storybook groups:**
AppKit, Charts, Components, Dashboard, Foundation, Patterns, Primitives, Scenarios, Settings, Source

**Directories reviewed:**
`packages/ui/src/{app-kit,charts,components,dashboard,settings,shell,source,styles,wizard}` — both branches  
`storybook/stories/` (main), `stories/` (iteration-v2)  
`~/Projects/metraly/claude/packages/ui/src/`, `~/Projects/metraly/claude/preview/`  
`~/Projects/metraly/app/ui/src/features/`

---

## 3. Missing components inventory

| Component | In main | In iteration-v2 | In ../claude | In app/ui | Story in main | Recommendation | Priority |
|---|---|---|---|---|---|---|---|
| `StepRail` | ✅ code | ✅ code + stories | ✅ code | indirect | ❌ no story | Add standalone stories from iteration-v2 | P0 |
| `WizardLayout` | ✅ code | ✅ code + stories | ✅ code | ✅ used | ❌ no story | Add standalone stories from iteration-v2 | P0 |
| `StickyWizardFooter` | ✅ code | ✅ code + stories | ✅ code | ✅ used | ❌ no story | Add story from iteration-v2 | P0 |
| `ReviewPanel` | ✅ code | ✅ code + stories | ✅ code | partial | ❌ no story | Add story from iteration-v2 | P1 |
| `MetralyBottomSheet` | ✅ code | ✅ code + stories | ✅ code | ✅ used | ❌ no story | Add story from iteration-v2 | P1 |
| `TrendBadge` | ✅ code | ✅ code + stories | ✅ code | — | ❌ no story | Add story from iteration-v2 | P2 |
| `StatusBadge` | ✅ code | ✅ code + stories | ✅ code | ✅ used | partial in Core/Badges | Add dedicated story | P2 |
| `StateBadge` | ✅ code | ✅ code + stories | ✅ code | ✅ used | partial in Core/Badges | Add dedicated story or keep Core/Badges | P3 |
| `PulseMarker` | ✅ code | ✅ code + stories | ✅ code | — | ❌ no story | Add story from iteration-v2 | P2 |
| `AnswerCard` | ✅ code | ✅ code + story | ✅ code | — | ❌ no story | Add story | P2 |
| `FieldShell` | ✅ code | ✅ code + story | ✅ code | — | ❌ no story | Add story from iteration-v2 | P3 |
| `NavigationItemFrame` | ✅ code | ✅ code + story | ✅ code | — | ❌ no story | Add story from iteration-v2 | P3 |
| `MetralyCard` | ✅ code | ✅ story (Components/Cards) | ✅ code | — | ❌ no story | Add story from iteration-v2 | P2 |
| `MetralyLogo` | ✅ code | ✅ story | ✅ code | — | ❌ no story | Add story from iteration-v2 | P3 |
| `MetralyTelemetryLine` | ✅ code | ✅ story | ✅ code | — | ❌ no story | Add story from iteration-v2 | P3 |

**Notes:**
- All component APIs are present in both branches.
- `WizardLayout` API is **identical** between `main` and `iteration-v2` — stories can be ported with only import path changes.
- `StepRail` is used in `WizardLayout` — fixing StepRail stories also makes WizardLayout stories work.

---

## 4. Missing stories / states inventory

| Story / state | Component | In main | In iteration-v2 | Why it matters | Recommendation |
|---|---|---|---|---|---|
| `Queued` | SyncProgressPanel | ❌ | ✅ | Stage shown in product; missing from any main story | Add as individual story (P0) |
| `Discovering` | SyncProgressPanel | ❌ | ✅ | Initial active stage with subStage label | Add as individual story (P0) |
| `Backfilling (indeterminate)` | SyncProgressPanel | ❌ | ✅ | No totalEstimate known yet — different visual | Add as individual story (P1) |
| `Paused` | SyncProgressPanel | ❌ | ✅ | User-initiated pause with Resume CTA | Add as individual story (P0) |
| `Cancelled` | SyncProgressPanel | ❌ | ❌ | Type defined in component, no story anywhere | Add as individual story (P1) |
| `Horizontal / Middle step` | StepRail | ❌ | ✅ | Core usage state | Add from iteration-v2 (P0) |
| `Horizontal / First step` | StepRail | ❌ | ✅ | Edge case — no "done" items | Add from iteration-v2 (P0) |
| `Horizontal / Last step` | StepRail | ❌ | ✅ | Edge case — all steps done | Add from iteration-v2 (P0) |
| `Horizontal / Warning step` | StepRail | ❌ | ✅ | Warning status with `detail` text | Add from iteration-v2 (P0) |
| `Horizontal / Two steps` | StepRail | ❌ | ✅ | Minimal 2-step wizard | Add from iteration-v2 (P1) |
| `Horizontal / Mobile 390px` | StepRail | ❌ | ✅ | Horizontal scroll behavior below 560px | Add from iteration-v2 (P0) |
| `Vertical / Side rail` | StepRail | ❌ | ✅ | Documentation / side-panel mode | Add from iteration-v2 (P1) |
| `Vertical / Warning` | StepRail | ❌ | ✅ | Warning in vertical layout | Add from iteration-v2 (P1) |
| `WizardLayout / Sources (top)` | WizardLayout | ❌ | ✅ | `progressPlacement="top"` — product canonical | Add from iteration-v2 (P0) |
| `WizardLayout / Preview (top)` | WizardLayout | ❌ | ✅ | Middle step, top placement | Add from iteration-v2 (P0) |
| `WizardLayout / Review (top)` | WizardLayout | ❌ | ✅ | Final step | Add from iteration-v2 (P0) |
| `WizardLayout / Mobile` | WizardLayout | ❌ | ✅ | Bottom-sheet step rail | Add from iteration-v2 (P0) |
| `WizardLayout / Side rail` | WizardLayout | ❌ | ✅ | `progressPlacement="side"` — docs mode | Add from iteration-v2 (P1) |
| `StickyWizardFooter / variants` | StickyWizardFooter | ❌ | ✅ | Back + primary + loading states | Add from iteration-v2 (P1) |
| `ReviewPanel / overview` | ReviewPanel | ❌ | ✅ | Step review surface | Add from iteration-v2 (P1) |
| `MetralyBottomSheet / default` | MetralyBottomSheet | ❌ | ✅ | Mobile overlay pattern | Add from iteration-v2 (P1) |
| `Scenarios/ConnectorWizard` | WizardLayout+StepRail | ❌ | ✅ | Interactive multi-step scenario | Add from iteration-v2 (P0) |
| `Scenarios/Component State Board` | Many | ❌ | ✅ | Canonical form controls showcase | Add from iteration-v2 (P0) |
| `Scenarios/New Component State Board` | Many | ❌ | ✅ | Newer primitives showcase | Add from iteration-v2 (P0) |
| `Scenarios/AppShellRoleContext` | MetralyShell+Sidebar+Topbar | ❌ | ✅ | Role context alignment validation | Add from iteration-v2 (P1) |
| `Scenarios/PluginCatalog` | MetralyInput+StateBadge+etc | ❌ | ✅ | Plugin catalog placeholder scenario | Add from iteration-v2 (P1) |
| `Foundation/Tokens` | — | ❌ | ✅ | Design token reference page | Add from iteration-v2 (P2) |

---

## 5. Scenarios review

| Scenario | Status in iteration-v2 | Exists in main | Visual quality | Can be used as base | Recommendation |
|---|---|---|---|---|---|
| `Scenarios/ConnectorWizard` | Complete — 4-stage interactive wizard with real step data, source tiles, review panel | ❌ | High — realistic flow, proper mobile | ✅ Directly | Port to main as `Scenarios/ConnectorWizard` — P0 |
| `Scenarios/AIWorkspaceLayout` | Complete — chat layout with composer | Partial — main has Components/AIWorkspaceLayout | High | ✅ As reference | Enhance main story with scenario framing — P1 |
| `Scenarios/Dashboard Editor` | Complete — full dashboard editor with DashboardEditorStoryScenario | Partial — Dashboard group exists but not as Scenario | High | ✅ Directly | Evaluate merging or adding as Scenarios/ — P2 |
| `Scenarios/Component State Board` | Complete — 12 sections: forms 1-6, widget surface 7-12 | ❌ | High — comprehensive canonical states | ✅ Directly | Port to main — P0 |
| `Scenarios/New Component State Board` | Complete — 7 sections: Button, Input, Badge, SegmentedControl, NavigationTree, CodeBlock, Drawer/BottomSheet | ❌ | High — interactive, has Mobile story | ✅ Directly | Port to main — P0 |
| `Scenarios/AppShellRoleContext` | Complete — sidebar + topbar + role alignment check | ❌ | Good — documents navigation rule | ✅ Directly | Port to main — P1 |
| `Scenarios/PluginCatalog` | Complete — search + category filter + cards, 3 stories | ❌ | Good — responsive CSS in story, has empty state | ✅ Directly | Port to main — P1 |

**Note on settings-*:** `Settings/` stories in `iteration-v2` are considered too raw visually. Do NOT use them as visual base. The current `main` settings stories are better.

---

## 6. Patterns review

| Pattern | Status in iteration-v2 | Exists in main | Visual quality | Reusable value | Recommendation |
|---|---|---|---|---|---|
| `Patterns/Auth Form Recipe` | Complete — 5 states: default, loading, invalid credentials, SSO, mobile | ❌ | High — radial gradient bg, MetralyPanel composition, clean form | Very high — login screen reference | Port to main — P1 |
| `Patterns/Integration Card Recipe` | Complete — 6 integration states + search + filter, mobile story | ❌ | High — responsive CSS, all badge states, filter toolbar | High — connector/marketplace reference | Port to main — P1 |
| `Patterns/Metrics Explorer Recipe` | Complete — desktop/tablet/mobile, full shell+sidebar+topbar, metric cards, table, chart placeholder | ❌ | Very high — full page layout reference | Very high — MetricsScreen blueprint | Port to main — P1 |
| `Patterns/MetralyDrawer` | Story exists in iteration-v2 | Partial — main has Components/MetralyDrawer | Good | Medium | Keep main version, compare states — P3 |
| `Patterns/MetralyNavigationTree` | Story exists | Main has Shell/NavigationTree | Good | Medium | Keep main version — P3 |
| `Patterns/MetralyShell` | Story exists | Main has Shell/Shell | Good | Medium | Keep main version — P3 |

---

## 7. StepRail and WizardLayout review

### StepRail

**Component status:** ✅ Exists in both branches at `packages/ui/src/wizard/StepRail.tsx`  
**API:** Identical between branches  
**Story status in main:** ❌ No standalone story exists  
**Story status in iteration-v2:** ✅ `stories/StepRail.stories.tsx` — 9 stories

**iteration-v2 story inventory:**
- `HorizontalMiddleStep` — 4-step rail, second step active
- `HorizontalFirstStep` — first step active (no done items)
- `HorizontalLastStep` — last step active (all prior done)
- `HorizontalWarningStep` — warning status on step 2 with `detail: "auth failed"`
- `HorizontalTwoSteps` — minimal 2-step flow
- `HorizontalMobile` — 390px viewport, horizontal scroll test
- `VerticalRail` — `orientation="vertical"` with `footnote` prop
- `VerticalRailNoFootnote` — vertical, no footnote
- `VerticalRailWarning` — vertical warning state

**Desktop:** Component renders correctly with linear progress connectors, state icons, labels  
**Mobile (390px):** Horizontal stepper should scroll below ~560px — story explicitly tests this  

**Files needed for port:**
- `stories/StepRail.stories.tsx` → `storybook/stories/` (new group TBD, likely `Wizard/`)
- Import adapter change: `@storybook/nextjs` → `@storybook/react`
- Import path change: `../../packages/ui/src/wizard/...` → `@metraly/ui` or `../../packages/ui/src/wizard/...` (story-relative)
- No component changes needed

**Risks:** None — API is identical, story is self-contained.

---

### WizardLayout

**Component status:** ✅ Exists in both branches at `packages/ui/src/wizard/WizardLayout.tsx`  
**API:** Identical between branches (verified by source comparison)  
**Story status in main:** ❌ No standalone story. `AppConnectorWizardScreen` uses it indirectly.  
**Story status in iteration-v2:** ✅ `stories/WizardLayout.stories.tsx` — ~6 stories (very large file, ~431 lines)

**iteration-v2 story themes:**
- `SideRailReference` — `progressPlacement="side"` documentation mode
- Desktop/tablet/mobile variants across connection stages (sources, preview, configure, review)
- Includes `SourceTile`, `ConfigureStep`, `ReviewStep` render helpers inside the story file
- Uses `MetralyStoryFrame` wrapper

**Desktop:** Full wizard layout with centered header, step content, sticky footer  
**Tablet:** Responsive layout narrowing  
**Mobile:** Bottom sheet takes over for step navigation — `MetralyBottomSheet` activated  

**Files needed:**
- `stories/WizardLayout.stories.tsx` → `storybook/stories/Wizard/WizardLayout.stories.tsx`
- Same import adapter/path adjustments as StepRail

**Risks:** Story file is large (431 lines) and contains inline helper components. These helpers stay in the story file — no component API changes needed.

---

## 8. SyncProgressPanel states review

**Component in main:** `packages/ui/src/source/SyncProgressPanel.tsx`  
**SyncStage type:**
```
"queued" | "discovering" | "backfilling" | "incremental" | "paused" | "rate_limited" | "completed" | "failed" | "cancelled"
```

| State | In main story | In iteration-v2 story | In ../claude | Needed? | Notes |
|---|---|---|---|---|---|
| `queued` | ❌ | ✅ Individual story | ❌ (no stories) | Yes — P0 | Very first state a user sees; missing from main overview |
| `discovering` | ❌ | ✅ Individual story | — | Yes — P0 | Stage with `subStage` label shown |
| `backfilling` | ✅ in Overview | ✅ Individual story | — | Already covered | Overview story uses this; individual story useful too |
| `backfilling (indeterminate)` | ❌ | ✅ Individual story | — | Yes — P1 | Different visual: no progress %, just spinner |
| `incremental` | ✅ in Overview | ✅ Individual story | — | Already covered | Keep existing |
| `paused` | ❌ | ✅ Individual story | — | Yes — P0 | User-paused state with Resume CTA |
| `rate_limited` | ✅ in Overview | ✅ Individual story | — | Already covered | Keep existing |
| `completed` | ✅ in Overview | ✅ Individual story | — | Already covered | Keep existing |
| `failed` | ✅ in Overview | ✅ Individual story | — | Already covered | Keep existing |
| `cancelled` | ❌ | ❌ | — | Yes — P1 | In type definition but NO story in either branch |

**Recommendation for main:**  
Expand the existing `Source/SyncProgressPanel` stories file with individual story exports for: `Queued`, `Discovering`, `BackfillingIndeterminate`, `Paused`, and `Cancelled`. The current `Overview` story can stay — it's a good summary view. Individual stories allow Storybook's Controls panel to work per-state.

---

## 9. Page-level and navigation references

| Area | Found in main | Found in iteration-v2 | Found in app/ui | What looks better | Recommendation |
|---|---|---|---|---|---|
| App shell | ✅ `Shell/Shell` | ✅ `Patterns/MetralyShell` | ✅ used in production | Main version cleaner | Keep main |
| Sidebar / topbar | ✅ `Shell/Sidebar`, `Shell/Topbar` | ✅ `AppShellRoleContext` scenario | ✅ used in production | Iteration-v2 scenario more complete | Add AppShellRoleContext scenario — P1 |
| Settings pages | ✅ main has 3 stories | iteration-v2 settings too raw | — | Main is better | Keep main; improve separately |
| BYO LLM | ✅ `Settings/BYOLLMConnectorPanel` | ✅ (raw) | — | Main is better | Keep main |
| AI provider | ✅ `Settings/AIProviderConnectorCard` | ✅ (raw) | — | Main is better | Keep main |
| Dashboard overview | ✅ Dashboard group | ✅ `Scenarios/Dashboard Editor` | ✅ DashboardScreen | main group better structured | Add scenario if dashboard editor needs full-page reference |
| Dashboard editor | ✅ `Dashboard/WizardSplitBuilder` | ✅ `Scenarios/Dashboard Editor` | ✅ DashboardWizardScreen | Both have value | Consider adding Scenarios/Dashboard Editor — P2 |
| AI workspace | ✅ `AppKit/AppAIWorkspaceScreen` | ✅ `Scenarios/AIWorkspaceLayout` | ✅ AIScreen | Both good | Enhance AppKit story or add as Scenario — P2 |
| Connector wizard | ✅ `AppKit/AppConnectorWizardScreen` | ✅ `Scenarios/ConnectorWizard` | ✅ WizardScreen | iteration-v2 scenario more detailed | Port Scenarios/ConnectorWizard — P0 |
| Plugin catalog | ✅ `AppKit/AppPluginsScreen` | ✅ `Scenarios/PluginCatalog` | ✅ PluginScreen | Both have value | Port PluginCatalog scenario — P1 |
| Metrics Explorer | — | ✅ `Patterns/MetricsExplorerRecipe` | ✅ MetricsScreen | iteration-v2 pattern comprehensive | Port MetricsExplorer pattern — P1 |
| Auth form | — | ✅ `Patterns/Auth Form Recipe` | ✅ onboarding flow | iteration-v2 pattern polished | Port Auth Form Recipe — P1 |
| Integration cards | — | ✅ `Patterns/Integration Card Recipe` | ✅ connectors list | iteration-v2 has all badge states | Port Integration Card Recipe — P1 |
| Foundation/Tokens | — | ✅ `Foundation/Tokens` | ✅ `preview/` HTML files | iteration-v2 Storybook story useful | Add Foundation/Tokens story — P2 |

---

## 10. Do not use / do not touch

- **`Settings/*` stories from iteration-v2:** Too raw visually. Do NOT use as visual base. Current main settings stories are the correct reference.
- **`../claude` (Metraly Design System):** Reference only. No git, no stories. Do not modify. Use `preview/` HTML files and component source for design token verification.
- **`getmetraly/app/ui`:** Reference only. Confirms which components are in production. Do not port code from it directly. Do not modify.
- **Main's recent fixes:** Do not revert visual bug fixes applied to `metraly-source.css`, `metraly-settings.css`, `metraly-leaderboard.css`, `storybook/.storybook/preview.css`, and the story frame decorators.
- **Main's Shell group:** The new `Shell/Shell`, `Shell/Sidebar`, `Shell/Topbar`, `Shell/NavigationTree`, `Shell/Overlay` stories are a genuine improvement over iteration-v2's component-level coverage. Keep these.
- **Main's Core group:** The reorganized `Core/` stories (Button, Input, Forms, Badges, etc.) are cleaner than iteration-v2's `Primitives/` equivalents. Keep these.
- No `package.json` or lockfile changes.
- No broad component API rewrites.
- No wholesale copy of iteration-v2 stories — port individually, update imports, verify in Storybook.

---

## 11. Priority recovery plan

### P0 — Blocking completeness (wizard primitives + canonical scenarios + sync states)

These are missing stories for components that are **in production use** and represent core Metraly UX flows:

1. `Wizard/StepRail.stories.tsx` — 9 stories porting from iteration-v2
2. `Wizard/WizardLayout.stories.tsx` — ~6 stories porting from iteration-v2
3. `Wizard/StickyWizardFooter.stories.tsx` — porting from iteration-v2
4. `Scenarios/ConnectorWizard` — full interactive wizard scenario
5. `Scenarios/Component State Board` — canonical form controls + widget surfaces
6. `Scenarios/New Component State Board` — newer primitives showcase
7. `Source/SyncProgressPanel` — add `Queued`, `Discovering`, `Paused`, `Cancelled` individual stories

### P1 — High-impact patterns and scenarios

8. `ReviewPanel.stories.tsx`
9. `MetralyBottomSheet.stories.tsx`
10. `Scenarios/AppShellRoleContext`
11. `Scenarios/PluginCatalog`
12. `Patterns/Auth Form Recipe`
13. `Patterns/Integration Card Recipe`
14. `Patterns/Metrics Explorer Recipe`
15. `Source/SyncProgressPanel` — `BackfillingIndeterminate`, `Cancelled`

### P2 — Useful additions

16. `Foundation/Tokens` reference story
17. `Components/MetralyCard` (Components/Cards story from iteration-v2)
18. Individual `TrendBadge`, `StatusBadge`, `AnswerCard`, `PulseMarker` stories
19. `Scenarios/Dashboard Editor` or `Scenarios/AIWorkspaceLayout` enhancements

### P3 — Polish / later

20. `FieldShell`, `NavigationItemFrame`, `MetralyLogo`, `MetralyTelemetryLine` stories
21. `BoardCanvas` story (DashboardGrid canvas)
22. `Foundation/Tokens` expansion

---

## 12. Suggested patch groups

### Patch 1 — Wizard primitives recovery (**Needs Andrey decision**)

**Files to create:**
- `storybook/stories/Wizard/StepRail.stories.tsx` (from `iteration-v2/stories/StepRail.stories.tsx`)
- `storybook/stories/Wizard/WizardLayout.stories.tsx` (from `iteration-v2/stories/WizardLayout.stories.tsx`)
- `storybook/stories/Wizard/StickyWizardFooter.stories.tsx` (from `iteration-v2/stories/StickyWizardFooter.stories.tsx`)
- `storybook/stories/Wizard/ReviewPanel.stories.tsx` (from `iteration-v2/stories/ReviewPanel.stories.tsx`)
- `storybook/stories/Shell/BottomSheet.stories.tsx` (from `iteration-v2/stories/MetralyBottomSheet.stories.tsx`)

**Changes per file:**
- `@storybook/nextjs` → `@storybook/react`
- `../../packages/ui/src/wizard/...` → `@metraly/ui` (or relative from storybook root)
- No component changes

**Goal:** StepRail and WizardLayout should have standalone Storybook documentation — they are used in production.

**Decision needed:** Which Storybook group name — `Wizard/` or keep under `Components/`?

---

### Patch 2 — SyncProgressPanel missing states

**File to modify:**
- `storybook/stories/Source/SyncProgressPanel.stories.tsx`

**Add individual story exports:**
- `export const Queued: Story = { ... }`
- `export const Discovering: Story = { ... }`
- `export const BackfillingIndeterminate: Story = { ... }`
- `export const Paused: Story = { ... }`
- `export const Cancelled: Story = { ... }`

**Source:** `iteration-v2/stories/Source/SyncProgressPanel.stories.tsx` for Queued/Discovering/Paused/Cancelled logic; `Cancelled` needs to be written fresh.

**Goal:** All 9 SyncStage values are testable individually in Storybook.

---

### Patch 3 — Scenarios recovery

**Files to create:**
- `storybook/stories/Scenarios/ConnectorWizard.stories.tsx`
- `storybook/stories/Scenarios/ComponentStateBoard.stories.tsx`
- `storybook/stories/Scenarios/NewComponentStateBoard.stories.tsx`
- `storybook/stories/Scenarios/AppShellRoleContext.stories.tsx`
- `storybook/stories/Scenarios/PluginCatalog.stories.tsx`

**Goal:** Restore the scenario-level reference stories that document complete UX flows.

**Note on settings-*:** Do NOT add any old settings-* as scenarios.

---

### Patch 4 — Patterns recovery

**Files to create:**
- `storybook/stories/Patterns/AuthFormRecipe.stories.tsx`
- `storybook/stories/Patterns/IntegrationCardRecipe.stories.tsx`
- `storybook/stories/Patterns/MetricsExplorerRecipe.stories.tsx`

**Goal:** High-value full-page composition patterns with desktop/tablet/mobile coverage.

---

### Patch 5 — Foundation and component story gaps

**Files to create:**
- `storybook/stories/Foundation/Tokens.stories.tsx` (from `iteration-v2/stories/FoundationTokens.stories.tsx`)
- `storybook/stories/Components/MetralyCard.stories.tsx` (from `iteration-v2/stories/MetralyCard.stories.tsx`)
- `storybook/stories/Components/TrendBadge.stories.tsx`
- `storybook/stories/Components/StatusBadge.stories.tsx`
- `storybook/stories/Components/AnswerCard.stories.tsx`
- `storybook/stories/Components/PulseMarker.stories.tsx`
- `storybook/stories/Shell/BottomSheet.stories.tsx`

---

## 13. Questions for Andrey

1. **Wizard group name:** Should wizard stories go in a new `Wizard/` group, or stay under `Components/` (`Components/StepRail`, `Components/WizardLayout`)? iteration-v2 used `Components/StepRail` and `Components/WizardLayout`.

2. **ConnectorWizard scenario approach:** The iteration-v2 `Scenarios/ConnectorWizard` story is fully interactive (internal React state, stage switching). Should main's version also be interactive, or a static multi-story approach?

3. **Dashboard Editor scenario:** Should `Scenarios/Dashboard Editor` from iteration-v2 be added alongside the existing `Dashboard/` group in main? It uses a `DashboardEditorStoryScenario` component from a nested `scenarios/` directory.

4. **Patterns group:** Should the `Patterns/` group be added as a top-level Storybook group in main, or merged into existing groups?

5. **SyncProgressPanel `Cancelled` state:** The `"cancelled"` SyncStage is in the component type but has no story in either branch. Should a `Cancelled` story be added, and what should the UX show (just a label, or a "restart" CTA)?

6. **StepRail `warning` state and the `detail` prop:** iteration-v2 stories show `{ status: "warning", detail: "auth failed" }`. Should this be a first-class visual state in the new story?

7. **Which scenarios to NOT port?** Are there iteration-v2 scenarios that should be excluded (e.g., `Scenarios/Dashboard Editor` if it conflicts with the existing `Dashboard/WizardSplitBuilder`)?

8. **MetralyBottomSheet story group:** Should it go in `Shell/` (alongside `Shell/Overlay`) or `Components/`?

9. **Restore order:** Should Patch 1 (wizard primitives) be done before or after Patch 2 (SyncProgressPanel states)?

10. **Settings improvement timeline:** Should current `Settings/*` stories be improved after the P0/P1 patches, or left as-is until the broader migration is complete?

---

## Appendix: Migration notes

**Import adapter change required for all ported stories:**
```ts
// iteration-v2 (uses Next.js adapter)
import type { Meta, StoryObj } from "@storybook/nextjs";

// main (uses React/Vite adapter)
import type { Meta, StoryObj } from "@storybook/react";
```

**Import path change required:**
```ts
// iteration-v2 (relative from stories/ root)
import { StepRail } from "../../packages/ui/src/wizard/StepRail";

// main (package import)
import { StepRail } from "@metraly/ui";
```

**MetralyStoryFrame:** Available in both branches at `stories/_shared/MetralyStoryFrame.tsx` (iteration-v2) and `storybook/stories/_shared/MetralyStoryFrame.tsx` (main). Import path adjusts accordingly.

**CSS in stories:** Some iteration-v2 stories embed CSS via `<style>{STYLES}</style>` inside the render function. This is acceptable in story files (not production components) — keep as-is when porting.

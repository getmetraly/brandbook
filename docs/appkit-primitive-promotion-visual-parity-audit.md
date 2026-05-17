# AppKit Primitive Promotion + Visual Parity Audit

## Claude paths resolved

- `CLAUDE_ROOT`: `../claude`
- `CLAUDE_VIEWER`: `../claude/implementation-pack-viewer.html`
- `CLAUDE_APP_KIT`: `../claude/ui_kits/metraly_app`
- `CLAUDE_IMPLEMENTATION_PACK`: `../claude/implementation-pack`

## Sources reviewed

- Claude viewer: `../claude/ui_kits/metraly_app/*.jsx` + `styles.css`
- Claude app kit: `AIWorkspaceScreen.jsx`, `Sidebar.jsx`, `Topbar.jsx`, `DashboardScreen.jsx`, `Widget.jsx`
- Existing brandbook primitives: `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem`, `NavigationItemFrame`, `MetralyTopbar`, `AnswerCard`, `AIWorkspaceLayout`
- Existing brandbook shell: `MetralyShell`, `metraly-shell.css`, `metraly-navigation-tree.css`
- Existing AppKit: `AppSidebar`, `AppTopbar`, `AppAIWorkspaceScreen`, `AppDashboardScreen`, `AppPluginsScreen`, `AppConnectorWizardScreen`
- Storybook stories: all `stories/AppKit/**`

## Root cause summary

Three structural problems caused AppKit to look broken and incomplete:

1. **`AIWorkspaceLayout` relied entirely on inline styles.** Every layout rule — flex column, overflow, padding, border-radius, font — was a `style={}` prop. This made the component brittle, uncustomisable via CSS, and dependent on fallback tokens like `var(--glass)` and `var(--border)` that do not exist in the brandbook token layer. The oversized empty card and broken chat alignment traced directly here.

2. **`AnswerCard` also used all inline styles.** Evidence chips, the trace button, and the loading state were raw `style={}` objects using undefined fallback tokens.

3. **`AppSidebar` and `AppTopbar` ran parallel, competing visual systems.** `AppSidebar` emitted `metraly-app-sidebar__*` classes from `metraly-app-kit.css` instead of composing `MetralySidebar` → `MetralySidebarSection` → `MetralySidebarItem`. `AppTopbar` similarly emitted `metraly-app-topbar__*` classes instead of composing `MetralyTopbar`. The canonical shell primitives (`metraly-sidebar-item.is-active`, `metraly-topbar--compact`, etc.) were bypassed, so any improvement to the canonical primitives was invisible in AppKit.

**Secondary problems fixed:**

- `--m-r-pill` token referenced in `metraly-app-kit.css` but never defined → added to theme.
- `--m-font-display` referenced in `metraly-app-kit.css` but never defined → added as `"Space Grotesk", var(--m-font-ui)`.
- `--m-shadow-1/2/3` referenced in `metraly-shell.css` (drawer/overlay) but never defined → added to theme.

## Primitive promotion decisions

| Claude pattern | Existing primitive | Decision | Reason | Files changed |
|---|---|---|---|---|
| AI chat message log (scrollable) | `AIWorkspaceLayout` | B — improve | Primitive exists; layout was entirely inline styles | `AIWorkspaceLayout.tsx`, `metraly-ai-workspace.css` (new) |
| AI user bubble (right-aligned) | `AIWorkspaceLayout` | B — improve | Was inline `style={}` with fallback tokens | `AIWorkspaceLayout.tsx`, `metraly-ai-workspace.css` |
| AI composer input pill | `AIWorkspaceLayout` | B — improve | Was inline `style={}` multi-level nested | `AIWorkspaceLayout.tsx`, `metraly-ai-workspace.css` |
| AI quick prompt chips | `AIWorkspaceLayout` | B — improve | Was inline `style={}` | `AIWorkspaceLayout.tsx`, `metraly-ai-workspace.css` |
| Evidence chip row | `AnswerCard` | B — improve | All inline styles; no CSS classes | `AnswerCard.tsx`, `metraly-ai-workspace.css` |
| Trace/reasoning button | `AnswerCard` | B — improve | Inline style; no class | `AnswerCard.tsx`, `metraly-ai-workspace.css` |
| Sidebar active state / badge | `MetralySidebar` → `AppSidebar` | B — improve wiring | AppSidebar had parallel CSS system; now wraps canonical | `AppSidebar.tsx` |
| Sidebar brand header | `MetralySidebar` header slot | C — add slot usage | Existing slot unused; brand CSS already in app-kit | `AppSidebar.tsx` |
| Sidebar health badge | `MetralySidebar` header slot | C — add slot usage | Pre-existing CSS reused | `AppSidebar.tsx` |
| Sidebar user footer | `MetralySidebar` footer slot | C — add slot usage | Footer CSS already in app-kit; new `foot-inner` avoids double border | `AppSidebar.tsx`, `metraly-app-kit.css` |
| Topbar + search + notif + refresh | `MetralyTopbar` → `AppTopbar` | B — improve wiring | AppTopbar had parallel CSS; now wraps canonical topbar with actions slot | `AppTopbar.tsx` |
| Full-height screen layout | `metraly-app-shell__main` | C — add variant | Added `--flush` modifier for screens that manage their own scroll | `metraly-app-kit.css`, `AppAIWorkspaceScreen.tsx` |
| Dashboard screen composition | `AppDashboardScreen` | E — keep as composition | Correctly uses AppSidebar/AppTopbar; benefits from wrapper refactoring | none |
| Plugins screen composition | `AppPluginsScreen` | E — keep as composition | Same | none |
| Connector wizard composition | `AppConnectorWizardScreen` | E — keep as composition | Same | none |

## Existing components that must be reused or improved

| Existing component | Current reuse status | Required action |
|---|---|---|
| `MetralySidebar` | ✅ Now used by AppSidebar via wrapper | Complete |
| `MetralySidebarSection` | ✅ Now used by AppSidebar | Complete |
| `MetralySidebarItem` | ✅ Now used by AppSidebar | Complete |
| `NavigationItemFrame` | ✅ Used by MetralySidebarItem (unchanged) | Complete |
| `MetralyTopbar` | ✅ Now used by AppTopbar via wrapper | Complete |
| `AIWorkspaceLayout` | ✅ Improved; still used by AppAIWorkspaceScreen | Complete |
| `AnswerCard` | ✅ Improved; still used by AIWorkspaceLayout | Complete |

## Components currently duplicating primitives (before this change)

| Current component | Was duplicating | Fixed action |
|---|---|---|
| `AppSidebar` (old) | `MetralySidebar` visual system | Replaced with `MetralySidebar` wrapper |
| `AppTopbar` (old) | `MetralyTopbar` visual system | Replaced with `MetralyTopbar` wrapper |

## ProductPreview mismatch table (before this change)

| Story | Claude reference | Severity | Problem | Root cause | Fix |
|---|---|---|---|---|---|
| AppAIWorkspaceScreen/ProductPreview | `AIWorkspaceScreen.jsx` | P0 | Chat messages oversized/broken, composer misaligned | Inline styles + undefined fallback tokens | AIWorkspaceLayout CSS rewrite |
| AppAIWorkspaceScreen/ProductPreview | sidebar section | P1 | Sidebar not using canonical shell primitives | AppSidebar parallel visual system | AppSidebar wraps MetralySidebar |
| AppAIWorkspaceScreen/ProductPreview | topbar section | P1 | Topbar not using canonical shell primitives | AppTopbar parallel visual system | AppTopbar wraps MetralyTopbar |
| AppSidebar/ProductPreview | sidebar active state | P1 | Active state visual from app-kit CSS, not canonical | Missing canonical wiring | Resolved by wrapper |
| AppTopbar/ProductPreview | topbar density | P1 | Wrong height/density vs canonical | Missing canonical wiring | Resolved; uses `density="compact"` |

## AppAIWorkspaceScreen issues (before → after)

**Before:**
- `AIWorkspaceLayout` used `style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}` and similar for every sub-element
- Used undefined tokens: `var(--glass)`, `var(--border)`, `var(--text)`, `var(--muted)`, `var(--cyan)`, `var(--purple)` — all CSS fallbacks, not actual brandbook tokens
- User message bubble had incorrect border-radius application from inline style
- Composer was a multi-level inline-style nested flex container
- `AppSidebar` rendered `metraly-app-sidebar__item` classes bypassing `metraly-sidebar-item` canonical active state
- `AppTopbar` rendered `metraly-app-topbar__*` classes bypassing `metraly-topbar--compact` canonical layout
- Main area had `padding: 18px 24px 32px; overflow: auto` which conflicted with `height: 100%` inside

**After:**
- `AIWorkspaceLayout` uses `metraly-ai-workspace`, `metraly-ai-workspace__log`, `metraly-ai-workspace__message--user`, `metraly-ai-workspace__bubble`, `metraly-ai-workspace__composer`, `metraly-ai-workspace__composer-shell`, `metraly-ai-workspace__input`, `metraly-ai-workspace__prompt-row`, `metraly-ai-workspace__prompt` — all in `metraly-ai-workspace.css`
- All tokens are `--m-*` only; no undefined fallback tokens
- `AnswerCard` uses `metraly-answer-card__text`, `metraly-answer-card__evidence`, `metraly-answer-card__chip`, `metraly-answer-card__trace-btn`
- `AppSidebar` composes `MetralySidebar → MetralySidebarSection → MetralySidebarItem` → `NavigationItemFrame` — canonical active/accent/disabled states
- `AppTopbar` composes `MetralyTopbar` with actions slot containing search, bell, refresh
- Main area uses `metraly-app-shell__main--flush` for AI workspace screen (no padding, `overflow: hidden`)

## Fix plan by phase

### Phase 1 — Improve canonical primitives ✅
- Created `packages/ui/src/styles/metraly-ai-workspace.css`
- Rewrote `AIWorkspaceLayout.tsx` to use CSS classes
- Rewrote `AnswerCard.tsx` to use CSS classes
- Added `@import "./metraly-ai-workspace.css"` to `metraly-ui.css`
- Added missing tokens to `metraly-theme.css`: `--m-r-pill`, `--m-r-6`, `--m-font-display`, `--m-shadow-1/2/3`

### Phase 2 — Refactor AppKit to composition layer ✅
- `AppSidebar.tsx` → wraps `MetralySidebar + MetralySidebarSection + MetralySidebarItem`
- `AppTopbar.tsx` → wraps `MetralyTopbar` with actions slot
- `AppAIWorkspaceScreen.tsx` → uses `--flush` modifier
- Added `.metraly-app-sidebar__foot-inner` to `metraly-app-kit.css`
- Added `.metraly-app-shell__main--flush` to `metraly-app-kit.css`

### Phase 3 — Stories ✅
- Updated `AppAIWorkspaceScreen.stories.tsx` ProductPreview with clearer description

## Known limitations

- Visual parity Playwright screenshots could not be captured: Playwright's Chromium browser is not installed (`sudo` required), and the browser tool cannot connect to a local HTTP server. The Storybook build completed successfully and can be previewed by running `npm run storybook` or `npx serve site/storybook-static`.
- Dashboard-screen inline styles (`ServiceHealthTable`, `AtRiskPRList`) use undefined tokens `--m-fg` and `--m-fg-muted` — these are screen-level composition helpers, not primitives, and are lower priority.

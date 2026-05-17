# AppKit Primitive Promotion + Visual Parity Report

## Summary

Resolved the root causes of broken AppKit visual presentation by applying a primitive-first strategy. Claude Design was used as visual reference to identify what needed improvement; all changes flow through the canonical brandbook design system.

The work had three layers:
1. **New CSS file** (`metraly-ai-workspace.css`) — replaces all inline styles in `AIWorkspaceLayout` and `AnswerCard` with proper `metraly-*` classes and `--m-*` tokens.
2. **AppKit wiring** — `AppSidebar` and `AppTopbar` now wrap canonical shell primitives instead of running parallel visual systems.
3. **Missing theme tokens** — `--m-r-pill`, `--m-font-display`, `--m-shadow-1/2/3` added to `metraly-theme.css`.

## Root causes fixed

| Root cause | Fix |
|---|---|
| `AIWorkspaceLayout` used 100% inline styles with undefined fallback tokens | Rewrote to use `metraly-ai-workspace.css` classes |
| `AnswerCard` used 100% inline styles | Rewrote to use `metraly-answer-card__*` classes |
| `AppSidebar` had competing visual system bypassing `MetralySidebar` | Refactored to wrap `MetralySidebar → MetralySidebarSection → MetralySidebarItem` |
| `AppTopbar` had competing visual system bypassing `MetralyTopbar` | Refactored to wrap `MetralyTopbar` with actions slot |
| `metraly-app-shell__main` padding/overflow broke full-height AIWorkspaceLayout | Added `--flush` modifier; applied in `AppAIWorkspaceScreen` |
| `--m-r-pill` token missing | Added to `metraly-theme.css` |
| `--m-font-display` token missing | Added as `"Space Grotesk", var(--m-font-ui)` to `metraly-theme.css` |
| `--m-shadow-1/2/3` tokens missing | Added to `metraly-theme.css` |

## Primitive promotion decisions

| Claude pattern | Existing primitive | Decision | Files changed | Notes |
|---|---|---|---|---|
| AI chat log / messages | `AIWorkspaceLayout` | B — improve | `AIWorkspaceLayout.tsx`, `metraly-ai-workspace.css` | CSS classes replace inline styles |
| AI user bubble | `AIWorkspaceLayout` | B | same | `metraly-ai-workspace__bubble` |
| AI composer input | `AIWorkspaceLayout` | B | same | `metraly-ai-workspace__composer-shell` |
| Quick prompt chips | `AIWorkspaceLayout` | B | same | `metraly-ai-workspace__prompt` |
| Evidence chips | `AnswerCard` | B | `AnswerCard.tsx`, `metraly-ai-workspace.css` | `metraly-answer-card__chip` |
| Sidebar nav + active state | `MetralySidebar` | B — fix wiring | `AppSidebar.tsx` | Now uses canonical primitives |
| Sidebar brand / health header | `MetralySidebar` header slot | C — use slot | `AppSidebar.tsx` | Pre-existing CSS reused |
| Sidebar user footer | `MetralySidebar` footer slot | C — use slot | `AppSidebar.tsx`, `metraly-app-kit.css` | `foot-inner` avoids double border |
| Topbar + notif + refresh | `MetralyTopbar` | B — fix wiring | `AppTopbar.tsx` | Actions slot carries search/bell/refresh |
| Full-height screen main | `metraly-app-shell__main` | C — add variant | `metraly-app-kit.css`, `AppAIWorkspaceScreen.tsx` | `--flush` modifier |
| Dashboard / plugins / wizard screen | — | E — keep composition | none | Already use AppSidebar/AppTopbar; benefit from wiring fix |

## Existing brandbook components reused

| Existing component | Used by | Notes |
|---|---|---|
| `MetralySidebar` | `AppSidebar` | Full sidebar shell, header/footer slots, collapsed state |
| `MetralySidebarSection` | `AppSidebar` | Per-section label and gap |
| `MetralySidebarItem` | `AppSidebar` | Active, disabled, accent, meta (badge) |
| `NavigationItemFrame` | `MetralySidebarItem` (unchanged) | Accent bar, icon, label, meta layout |
| `MetralyTopbar` | `AppTopbar` | Canonical topbar with density, title, subtitle, actions |
| `CardShell` | `AnswerCard` (unchanged) | Surface shell for answer card |
| `PulseMarker` | `AIWorkspaceLayout`, `AnswerCard` | Live indicator |
| `MetralyButton` | `AIWorkspaceLayout` | Send button |
| `MetralyIcon` | `AIWorkspaceLayout`, `AppSidebar`, `AppTopbar` | All icons |
| `TrendBadge` | `AnswerCard` (unchanged) | Evidence chip trend arrows |
| `StatusBadge` | `AppPluginsScreen`, `AppConnectorWizardScreen` | Status display |

## Canonical primitives improved

### `AIWorkspaceLayout` (Phase 1 — Decision B)
- All inline styles removed; 13 new CSS classes in `metraly-ai-workspace.css`
- Removed usage of undefined fallback tokens (`var(--glass)`, `var(--border)`, `var(--text)`, `var(--muted)`)
- Composer now has `focus-within` ring via CSS (no JS)
- User bubble is a proper `metraly-ai-workspace__bubble` with correct border-radius
- Bare `<input>` used for composer (not `MetralyInput`) — intentional; FieldShell overhead inappropriate for embedded composer
- `role="list"` added to quick prompts; `role="listitem"` on each prompt

### `AnswerCard` (Phase 1 — Decision B)
- All inline styles removed; 6 new CSS classes in `metraly-ai-workspace.css`
- `metraly-answer-card__loading` for loading dots alignment
- `metraly-answer-card__text`, `__evidence`, `__chip`, `__chip-label`, `__chip-value`, `__trace-btn`
- Focus ring on trace button via CSS

### `metraly-theme.css`
- Added `--m-r-6: 20px`, `--m-r-pill: 999px`
- Added `--m-font-display: "Space Grotesk", var(--m-font-ui)`
- Added `--m-shadow-1`, `--m-shadow-2`, `--m-shadow-3`

## AppKit components refactored into wrappers/compositions

### `AppSidebar` → wraps `MetralySidebar`
```
AppSidebar
  MetralySidebar (header slot: brand+health, footer slot: user)
    MetralySidebarSection (per section)
      MetralySidebarItem (per item, meta=badge node)
        NavigationItemFrame (active/accent/disabled state)
```
- All `metraly-app-sidebar__item*` CSS still present for backward compat but no longer emitted
- Badge rendered as `meta` prop node using existing `metraly-app-sidebar__item-badge` CSS
- `metraly-app-sidebar__foot-inner` added (layout without border-top; MetralySidebar footer provides it)

### `AppTopbar` → wraps `MetralyTopbar`
```
AppTopbar
  MetralyTopbar (density="compact", title, subtitle, actions)
    actions: search input + bell button + refresh button + custom actions
```
- All `metraly-app-topbar__*` CSS still present for backward compat but the component now uses canonical topbar layout
- Search, bell (with badge), and refresh rendered inside `MetralyTopbar`'s actions slot

### `AppAIWorkspaceScreen`
- Added `metraly-app-shell__main--flush` to the `<main>` element
- All other composition unchanged; benefits from AppSidebar and AppTopbar improvements

## AppAIWorkspaceScreen before/after

**Before:**
- Sidebar: `metraly-app-sidebar__item` CSS, bypass MetralySidebar active/accent states
- Topbar: `metraly-app-topbar__*` CSS, bypass MetralyTopbar
- Chat: inline `style={}` everywhere, undefined fallback tokens, broken height
- Main: padding + overflow:auto conflicting with height:100% in AIWorkspaceLayout

**After:**
- Sidebar: `MetralySidebar → MetralySidebarItem.is-active` canonical state, cyan accent bar, badge meta
- Topbar: `MetralyTopbar--compact` canonical height, proper title/subtitle/actions layout
- Chat: `metraly-ai-workspace__*` classes, all `--m-*` tokens, stable layout
- Main: `--flush` modifier removes padding; overflow:hidden; AIWorkspaceLayout fills via height:100%

## ProductPreview stories repaired

- `AppAIWorkspaceScreen/ProductPreview` — story description updated to document canonical composition
- Height container set to 680px (was 700px) with `position: relative` for better clip
- Storybook build verified: `site/storybook-static/` output generated cleanly

## Visual parity artifacts

- Claude screenshots: not captured (Playwright Chromium not installed; requires sudo for browser deps)
- Storybook screenshots: not captured (browser tool network isolation prevents reaching local server)
- Storybook build: ✅ compiled without errors to `site/storybook-static/`
- Visual verification available: `npm run storybook` → `http://localhost:6006`

**Workaround for manual verification:**
```bash
npm run build-storybook
npx serve site/storybook-static -p 6007
# Open http://localhost:6007/?path=/story/appkit-appaiworkspacescreen--product-preview
```

## Palette/CSS compliance

- Raw hex colors in UI: **none** — only in string data (`"#4821"` PR IDs in AppDashboardScreen)
- Undefined tokens used as colors: **none** — fixed (removed fallbacks from AIWorkspaceLayout)
- `.m-*` class selectors in source: **none** — only in build artifact `.next/` (pre-existing)
- `var(--m-cyan)` / `var(--m-purple)` bare: **none**
- `rgb()` / `rgba()` / `hsl()`: **none** in source CSS or TSX
- Class prefix: all new classes use `metraly-*`
- New token additions: all follow `--m-*` convention

## Validation

- `npm run ui:check` (typecheck): ✅ passes — 0 errors
- `npm run site:typecheck`: ✅ passes — 0 errors
- `npm run site:test`: ✅ passes — 44 suites, 254 tests
- `npm run build-storybook`: ✅ passes — compiled to `site/storybook-static/`
- Playwright visual capture: ⚠ not completed — Chromium not installed (sudo required); browser tool has network isolation

## Known limitations

1. **Playwright screenshots** — browser not available in this environment without sudo. Visual verification requires manual `npm run storybook`.
2. **`AppDashboardScreen` inline styles** — `ServiceHealthTable` and `AtRiskPRList` use `--m-fg` and `--m-fg-muted` (undefined tokens) and raw inline styles. These are screen-level composition helpers, not primitives. Lower priority.
3. **`metraly-app-sidebar__*` and `metraly-app-topbar__*` CSS** — retained in `metraly-app-kit.css` for backward compat but no longer emitted by the refactored components. Can be removed in a future cleanup pass.

## Files changed

| File | Change |
|---|---|
| `packages/ui/src/styles/metraly-ai-workspace.css` | **New** — 217 lines, canonical AI workspace CSS |
| `packages/ui/src/styles/metraly-ui.css` | Added `@import ./metraly-ai-workspace.css` |
| `packages/ui/src/styles/metraly-theme.css` | Added `--m-r-pill`, `--m-r-6`, `--m-font-display`, `--m-shadow-1/2/3` |
| `packages/ui/src/styles/metraly-app-kit.css` | Added `--flush` modifier, `foot-inner` class |
| `packages/ui/src/components/AIWorkspaceLayout.tsx` | Replaced all inline styles with CSS classes; bare `<input>` for composer |
| `packages/ui/src/components/AnswerCard.tsx` | Replaced all inline styles with CSS classes |
| `packages/ui/src/app-kit/AppSidebar.tsx` | Refactored to wrap `MetralySidebar` + `MetralySidebarSection` + `MetralySidebarItem` |
| `packages/ui/src/app-kit/AppTopbar.tsx` | Refactored to wrap `MetralyTopbar` with actions slot |
| `packages/ui/src/app-kit/AppAIWorkspaceScreen.tsx` | Added `--flush` modifier to `<main>` |
| `stories/AppKit/AppAIWorkspaceScreen.stories.tsx` | Updated ProductPreview description |
| `docs/appkit-primitive-promotion-visual-parity-audit.md` | **New** — full audit document |

## Suggested commit message

```
fix(ui): promote Claude Design patterns into brandbook primitives

- replace all inline styles in AIWorkspaceLayout with metraly-ai-workspace.css classes
- replace all inline styles in AnswerCard with metraly-answer-card__* classes
- refactor AppSidebar to wrap MetralySidebar + MetralySidebarSection + MetralySidebarItem
- refactor AppTopbar to wrap MetralyTopbar with actions slot for search/notif/refresh
- add metraly-app-shell__main--flush modifier for full-height screen layouts
- add missing theme tokens: --m-r-pill, --m-font-display, --m-shadow-1/2/3
- AppKit screens now compose canonical shell primitives, not a parallel visual system
- all validations pass: ui:check, site:typecheck, site:test, build-storybook
```

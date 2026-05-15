# AI/Plugin Component Spec — P2-4

**Status:** Spec only. Implementation deferred to Phase 9.  
**Date:** 2026-05-15  
**Source of truth:** `AIScreen.tsx` and `PluginScreen.tsx` in `metraly/app/ui`

---

## Scope

These components unlock Phase 9 (AI Workspace and Plugins migration). They are
blocked on the design patterns settling in the product app. This document freezes
the API contract so Phase 9 can start from a known shape rather than reverse-
engineering the app at migration time.

---

## AI Workspace

### `AIWorkspaceLayout`

Shell layout for the AI Workspace feature. Composes `OverlayShell` for the
trace drawer and `FieldShell` for the input bar.

```tsx
interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  evidence?: EvidenceCitation[];
}

interface AIWorkspaceLayoutProps {
  messages: ChatMessage[];
  loading?: boolean;
  onSend: (text: string) => void;
  quickPrompts?: string[];
  disclaimer?: React.ReactNode;
  className?: string;
}
```

**Layout contract**:
- Full-height flex column: `messages` area (overflow-y scroll) + input bar (sticky bottom)
- `messages` area renders `AnswerCard` for assistant messages, user bubble for user messages
- Input bar: sparkles icon, text input (Enter to send), Send button, quick-prompt chips below
- Reduced-motion: disable fade-up animations
- Tokens: `--m-cyan-500` for AI accent, `var(--m-purple)` for AI identity, no raw hex

### `AnswerCard`

Structured card wrapping an assistant reply. Composes `CardShell`.

```tsx
interface EvidenceCitation {
  metricId: string;
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface AnswerCardProps {
  text: string;
  evidence?: EvidenceCitation[];
  loading?: boolean;
  onShowTrace?: () => void;
}
```

**Visual contract**:
- Text with `line-height: 1.65`, `font-size: var(--m-fs-13)`
- Evidence chips below text (optional): label + value + TrendBadge
- "Show reasoning" link triggers `onShowTrace` → opens `TraceDrawer`
- Loading state: three pulsing dots (PulseMarker × 3)

### `EvidencePanel`

Sidebar panel or inline section showing metric citations for an answer.

```tsx
interface EvidencePanelProps {
  citations: EvidenceCitation[];
  title?: string;
  className?: string;
}
```

**Visual contract**:
- Grid of `ReviewPanel`-style items: metric icon, label, value, `TrendBadge`
- Empty state: `StateBlock` with "No evidence attached"
- Inherits `CardShell` surface

### `TraceDrawer`

Drawer revealing the AI reasoning steps. Composes `OverlayShell` / `MetralyDrawer`.

```tsx
interface TraceStep {
  id: string;
  label: string;
  detail?: string;
  status: 'pending' | 'running' | 'done' | 'error';
}

interface TraceDrawerProps {
  open: boolean;
  onClose: () => void;
  steps: TraceStep[];
  title?: string;
}
```

**Behavior contract**:
- `side="right"`, width `min(480px, 100vw)`
- Steps rendered as a vertical `StepRail` (orientation="vertical") with status icons
- Running step: `PulseMarker` dot
- On close: focus restores to the trigger (OverlayShell handles this)

---

## Plugins

### `PluginCatalog`

Plugin browser. Composes `WidgetPickerList` (role=listbox) for the grid and
`FieldShell` + `MetralyInput` for search.

```tsx
interface Plugin {
  id: string;
  name: string;
  category: 'Sources' | 'Exporters' | 'AI' | 'Alerts' | string;
  description: string;
  icon: string;
  iconColor?: string;
  rating?: number;
  installCount?: string;
  installed?: boolean;
  status?: 'live' | 'preview' | 'coming-soon';
}

interface PluginCatalogProps {
  plugins: Plugin[];
  onInstall: (id: string) => void;
  onManage: (id: string) => void;
  onReview?: (id: string) => void;
  categories?: string[];
  className?: string;
}
```

**Visual contract**:
- Search input + category filter chips (`MetralyFilterBar`)
- Grid: `WidgetPickerList` wrapping `WidgetPickerCard` items
- Installed badge: `StateBadge state="live"` or `StatusBadge status="Live"`
- Preview badge: `StateBadge state="purple"`
- Install/Manage CTA: `MetralyButton`
- Empty search state: `StateBlock variant="no-results"`

### `PluginReviewDrawer`

Pre-install trust drawer. Composes `OverlayShell` / `MetralyDrawer`.

```tsx
interface PluginPermission {
  scope: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
}

interface PluginReviewDrawerProps {
  open: boolean;
  plugin: Plugin | null;
  permissions: PluginPermission[];
  onInstall: () => void;
  onClose: () => void;
}
```

**Behavior contract**:
- `side="right"`, width `min(440px, 100vw)`
- Header: plugin icon + name + `PermissionBadge` summary
- Body: `ReviewPanel` of permissions (icon = risk level, badge = `StateBadge`)
- Footer: `StickyWizardFooter` with cancel (back) + "Install" (primary)
- Focus trap via OverlayShell

### `PermissionBadge`

Compact badge summarising a plugin's permission level.

```tsx
type PermissionLevel = 'read-only' | 'write' | 'admin';

interface PermissionBadgeProps {
  level: PermissionLevel;
  size?: 'sm' | 'md';
}
```

**Visual contract**: maps to `StateBadge` tones:
- `read-only` → `state="ok"`
- `write` → `state="warning"`
- `admin` → `state="error"`

### `SigningBanner`

Banner indicating whether a plugin is signed/verified by Metraly.

```tsx
type SigningStatus = 'verified' | 'unverified' | 'community';

interface SigningBannerProps {
  status: SigningStatus;
  publisherName?: string;
}
```

**Visual contract**:
- `verified` → cyan accent, check-circle icon, "Verified by Metraly"
- `unverified` → warning accent, alert icon, "Not verified — review permissions carefully"
- `community` → neutral, "Community plugin"
- Composes `CardShell` tone: `verified` → `tone="cyan"`, `unverified` → `tone="warn"`

---

## Foundation rules

All Phase 9 implementations MUST:
1. Use `OverlayShell` for `TraceDrawer` and `PluginReviewDrawer` (focus trap, body lock, Escape)
2. Use `FieldShell` for all form inputs in the AI input bar and plugin search
3. Use `CardShell` for `AnswerCard`, `EvidencePanel`, `SigningBanner`
4. Use `StateBlock` for empty/error states
5. Use `StepRail orientation="vertical"` for trace steps
6. Use `StickyWizardFooter` for review/install footer actions
7. No raw hex colors — all tokens from `var(--m-*)`
8. Export from `packages/ui/src/index.ts` before use in app

---

## Migration note

The app currently implements equivalent behavior inline in `AIScreen.tsx` and
`PluginScreen.tsx` using raw `style={{}}`. Phase 9 replaces these with the
above brandbook components. The app `design-system/compat/brandbook-legacy.ts`
currently marks `AIInsightCard`, `InlineInsight`, and `Leaderboard` as having
no brandbook equivalent — these will be resolved when Phase 9 ships.

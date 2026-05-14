# Prototype Pixel-Perfect Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring all 12 prototype components to pixel-perfect visual and behavioral parity with the prototype screenshots and source files in `../docs/prototypes/brandbook/`.

**Architecture:** Fix the two critical zero-CSS gaps (MetralyTabs, DashboardWidget body states), close all CSS token mismatches, enhance two components with missing props, then expand Storybook stories to cover every prototype-defined state per component.

**Tech Stack:** React 19, TypeScript, CSS custom properties (`--m-*` tokens from `metraly-theme.css`), Storybook 8, `@metraly/ui` package at `packages/ui/src/`.

---

## Audit Summary — Gaps Found

### P0 — Completely Broken
| Issue | Location |
|---|---|
| `MetralyTabs` has **zero CSS** — component renders but is entirely unstyled | No `metraly-tabs` rules exist anywhere |
| `WidgetShell` uses `--m-r-3` (7 px) but prototype uses `--m-r-4` (10 px) | `metraly-widget-shell.css:8` |
| `DashboardWidget` never renders body content for loading/error/empty states — CSS changes border color but the body stays empty | `DashboardWidget.tsx` |
| `MetralySelect` has no CSS rule for open state — `[aria-expanded="true"]` border/glow missing | `metraly-forms.css` |

### P1 — Visual Gaps
| Issue | Location |
|---|---|
| `WidgetPickerCard.is-selected` missing `box-shadow: var(--m-glow-selected)` | `metraly-widget-picker.css:20` |
| `WidgetPickerCard` missing `cursor: grab` / `grabbing`, dashed dragging outline | `metraly-widget-picker.css` |
| `WidgetPickerCard` selected icon tile should be cyan bg / dark icon | `metraly-widget-picker.css` |
| `MetralyCheckbox` error ring (`box-shadow: 0 0 0 3px var(--m-err-bg)`) missing | `metraly-forms.css` |
| `MetralySwitch` purple accent CSS missing — `is-purple` class added but no rules | `metraly-forms.css` |
| `metraly-control-spinner` uses `animation: metraly-spin` (duplicate @keyframes in forms.css) — should use `m-spin` from theme | `metraly-forms.css:128` |
| `DashboardToolbar` search shows visible label text above input; prototype has inline search icon | `DashboardToolbar.tsx:79` |
| `MetralyTabs` missing `icon` prop on `MetralyTabItem` | `MetralyTabs.tsx` |
| `MetralyTabs` missing `Home`/`End` keyboard navigation | `MetralyTabs.tsx:54-65` |

### P2 — Story Coverage Gaps
| Issue |
|---|
| `MetralyForms.stories.tsx` has only one `Default` story — no individual state stories |
| `DashboardWidget.stories.tsx` — need to verify all states are covered |
| Component State Board does not match the 12-slot prototype grid |
| `StateBadge.stories.tsx` — verify `CanonicalMatrix` covers all 13 states |

---

## File Map

**Modified:**
- `packages/ui/src/styles/metraly-forms.css` — add full MetralyTabs CSS block; fix checkbox error ring; add switch purple accent; add select open state; remove duplicate `@keyframes metraly-spin`
- `packages/ui/src/styles/metraly-widget-shell.css:8` — fix border-radius `--m-r-3` → `--m-r-4`
- `packages/ui/src/styles/metraly-widget-picker.css` — add glow-selected, cursor grab/grabbing, dragging dashed outline, selected icon tile colours
- `packages/ui/src/components/MetralyTabs.tsx` — add `icon` prop, add `Home`/`End` keys
- `packages/ui/src/dashboard/DashboardWidget.tsx` — render `LoadingSkeleton` / `ErrorBody` / `EmptyBody` in body when no children
- `packages/ui/src/dashboard/DashboardToolbar.tsx` — replace visible label with visually-hidden, add inline SVG search icon
- `stories/MetralyForms.stories.tsx` — expand to all per-component state stories
- `stories/DashboardWidget.stories.tsx` — ensure all widget states are covered
- `stories/MetralyControlStates.stories.tsx` — expand Component State Board to full 12-slot prototype grid

---

## Task 1: Add MetralyTabs CSS

**Files:**
- Modify: `packages/ui/src/styles/metraly-forms.css` (append at end)

- [ ] **Step 1: Append MetralyTabs CSS block to metraly-forms.css**

Add after line 270 (the final blank line):

```css
/* ── MetralyTabs ─────────────────────────────────────────────── */

.metraly-tabs {
  display: flex;
  align-items: flex-end;
  gap: 0;
  border-bottom: 1px solid var(--m-line);
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.metraly-tabs::-webkit-scrollbar { display: none; }

.metraly-tab {
  position: relative;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--m-fg-2);
  font: inherit;
  font-family: var(--m-font-ui);
  font-size: var(--m-fs-12);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex: 0 0 auto;
  transition: color var(--m-dur-2) var(--m-ease);
}

.metraly-tab:hover:not(:disabled) {
  color: var(--m-fg-1);
}

.metraly-tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.metraly-tab.is-active {
  color: var(--m-fg-0);
}

/* selected underline */
.metraly-tab.is-active::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: -1px;
  height: 2px;
  background: var(--m-cyan-500);
  border-radius: 1px;
  box-shadow: 0 0 8px -1px var(--m-cyan-glow);
}

/* count pill */
.metraly-tab-count {
  font-family: var(--m-font-mono);
  font-size: var(--m-fs-10);
  padding: 1px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
  background: var(--m-bg-3);
  color: var(--m-fg-3);
  transition: background var(--m-dur-2) var(--m-ease), color var(--m-dur-2) var(--m-ease);
}

.metraly-tab.is-active .metraly-tab-count {
  background: var(--m-cyan-bg);
  color: var(--m-cyan-500);
}

/* tab icon */
.metraly-tab-icon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  flex: 0 0 auto;
}

/* live-pulse telemetry marker (clip-path sine wave) */
.metraly-tab-live-pulse {
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 6px;
  background: var(--m-cyan-500);
  clip-path: var(--metraly-pulse-marker-path);
  animation: m-pulse 1.6s var(--m-ease) infinite;
  opacity: 0.8;
  pointer-events: none;
}

[data-pulse="off"] .metraly-tab-live-pulse,
[data-live-pulse="off"] .metraly-tab-live-pulse {
  animation: none !important;
  opacity: 0.5 !important;
}

@media (prefers-reduced-motion: reduce) {
  .metraly-tab-live-pulse { animation: none !important; }
}

/* density */
[data-density="compact"] .metraly-tab {
  padding: 6px 10px;
}
```

- [ ] **Step 2: Run typecheck to verify no CSS-only change breaks TS**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run ui:check
```

Expected: passes (CSS changes don't affect TS).

- [ ] **Step 3: Commit**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git add packages/ui/src/styles/metraly-forms.css
git commit -m "fix(ui): add MetralyTabs CSS — underline tabs, count pills, live-pulse marker"
```

---

## Task 2: Form Controls CSS Fixes

**Files:**
- Modify: `packages/ui/src/styles/metraly-forms.css`

- [ ] **Step 1: Fix checkbox error state ring**

Find the existing error CSS block (search for `is-error`). After line 96 (`box-shadow: 0 0 0 1px var(--m-cyan-500), 0 0 10px -2px var(--m-cyan-glow);` for checked), add:

```css
.metraly-checkbox[data-state="error"] .metraly-checkbox-box {
  border-color: var(--m-err);
  box-shadow: 0 0 0 3px var(--m-err-bg);
}

.metraly-control-description.is-error,
.metraly-checkbox.is-error .metraly-control-description {
  color: var(--m-err);
}
```

- [ ] **Step 2: Fix MetralySwitch purple accent**

After the `.metraly-switch[aria-checked="true"] .metraly-switch-knob` block (around line 175), add:

```css
/* purple accent variant */
.metraly-switch-row[data-accent="purple"] .metraly-switch[aria-checked="true"] {
  border-color: var(--m-purple-500);
  background: var(--m-purple-500);
  box-shadow: 0 0 0 1px var(--m-purple-500), 0 0 10px -2px var(--m-purple-glow);
}
```

- [ ] **Step 3: Add MetralySelect open state**

After the `.metraly-select-button:disabled` block (around line 208), add:

```css
.metraly-select-button[aria-expanded="true"] {
  border-color: var(--m-cyan-500);
  box-shadow: var(--m-glow-selected);
}

.metraly-select-field.is-error .metraly-select-button {
  border-color: var(--m-err);
  box-shadow: 0 0 0 3px var(--m-err-bg);
}
```

- [ ] **Step 4: Remove duplicate @keyframes metraly-spin, align to m-spin**

In `metraly-forms.css`, the `.metraly-control-spinner` block (around lines 119-132) currently uses `animation: metraly-spin`. Replace the entire block:

Old (lines 119-132):
```css
.metraly-control-spinner {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 1.5px solid var(--m-cyan-500);
  border-top-color: transparent;
  animation: metraly-spin 0.7s linear infinite;
}

@keyframes metraly-spin {
  to {
    transform: rotate(360deg);
  }
}
```

New (remove the @keyframes, use m-spin from theme):
```css
.metraly-control-spinner {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 1.5px solid var(--m-cyan-500);
  border-top-color: transparent;
  animation: m-spin 0.7s linear infinite;
}
```

- [ ] **Step 5: Add disabled row opacity to radio + control rows**

The prototype uses `opacity: 0.45` on the full label row when disabled. Add after the `.metraly-control-spinner` block:

```css
.metraly-control-row.is-disabled,
.metraly-switch-row.is-disabled {
  opacity: 0.45;
  pointer-events: none;
}
```

- [ ] **Step 6: Run ui:check**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run ui:check
```

Expected: passes.

- [ ] **Step 7: Commit**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git add packages/ui/src/styles/metraly-forms.css
git commit -m "fix(ui): form controls CSS — error ring, switch purple, select open state, spinner dedup"
```

---

## Task 3: MetralyTabs Component Enhancements

**Files:**
- Modify: `packages/ui/src/components/MetralyTabs.tsx`

- [ ] **Step 1: Add icon prop to MetralyTabItem and render it**

Replace the current `MetralyTabItem` interface and the JSX span for tab-content:

```typescript
export interface MetralyTabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  count?: React.ReactNode;
  /** Optional SVG icon element, 12×12 viewBox recommended. */
  icon?: React.ReactNode;
}
```

In the render, inside `<span className="metraly-tab-content">`, add icon before label:

```tsx
<span className="metraly-tab-content">
  {item.icon ? <span className="metraly-tab-icon" aria-hidden="true">{item.icon}</span> : null}
  <span className="metraly-tab-label">{item.label}</span>
  {item.count !== undefined ? <span className="metraly-tab-count">{item.count}</span> : null}
  {selected && livePulse ? <span className="metraly-tab-live-pulse" aria-hidden="true" /> : null}
</span>
```

- [ ] **Step 2: Add Home/End keyboard navigation**

Replace the existing `handleKeyDown` function:

```typescript
function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
  const count = items.length;
  let next = index;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    next = (index + 1) % count;
    while (items[next].disabled && next !== index) next = (next + 1) % count;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    next = (index - 1 + count) % count;
    while (items[next].disabled && next !== index) next = (next - 1 + count) % count;
  } else if (event.key === "Home") {
    event.preventDefault();
    next = items.findIndex((item) => !item.disabled);
    if (next === -1) return;
  } else if (event.key === "End") {
    event.preventDefault();
    for (let i = count - 1; i >= 0; i--) {
      if (!items[i].disabled) { next = i; break; }
    }
  } else {
    return;
  }

  refs.current[next]?.focus();
  if (!items[next].disabled) handleSelect(items[next].value);
}
```

- [ ] **Step 3: Run ui:check**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run ui:check
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git add packages/ui/src/components/MetralyTabs.tsx
git commit -m "feat(ui): MetralyTabs — icon prop, Home/End keyboard nav"
```

---

## Task 4: Widget CSS Fixes

**Files:**
- Modify: `packages/ui/src/styles/metraly-widget-shell.css`
- Modify: `packages/ui/src/styles/metraly-widget-picker.css`
- Modify: `packages/ui/src/dashboard/DashboardWidget.tsx`

### 4a: WidgetShell border-radius

- [ ] **Step 1: Fix border-radius in metraly-widget-shell.css**

In `metraly-widget-shell.css` line 8, change:
```css
  border-radius: var(--m-r-3);
```
to:
```css
  border-radius: var(--m-r-4);
```

### 4b: WidgetPickerCard CSS gaps

- [ ] **Step 2: Fix WidgetPickerCard selected state in metraly-widget-picker.css**

Replace lines 20-23 (`.metraly-widget-picker-card.is-selected`):

```css
.metraly-widget-picker-card.is-selected {
  border-color: var(--m-cyan-500);
  background: var(--m-cyan-bg);
  box-shadow: var(--m-glow-selected);
}
```

- [ ] **Step 3: Add cursor, dragging, and icon-tile colours**

After `.metraly-widget-picker-card.is-disabled` block, add:

```css
button.metraly-widget-picker-card {
  cursor: grab;
}

button.metraly-widget-picker-card:active {
  cursor: grabbing;
}

.metraly-widget-picker-card.is-dragging {
  opacity: 0.6;
  transform: scale(0.97) rotate(-1deg);
  outline: 1px dashed var(--m-cyan-500);
  cursor: grabbing;
}

/* Selected icon tile flips to cyan bg / dark icon */
.metraly-widget-picker-card.is-selected .metraly-widget-picker-icon {
  background: var(--m-cyan-500);
  border-color: var(--m-cyan-500);
  color: var(--m-bg-0);
}
```

### 4c: DashboardWidget body states

- [ ] **Step 4: Add LoadingSkeleton, ErrorBody, EmptyBody to DashboardWidget.tsx**

Below the `DragHandle` function and before `DashboardWidget`, insert three sub-components:

```tsx
function LoadingSkeleton() {
  const bar = (w: string) => (
    <div
      style={{
        height: 10,
        width: w,
        background: "linear-gradient(90deg, var(--m-bg-3) 0%, var(--m-bg-4) 50%, var(--m-bg-3) 100%)",
        backgroundSize: "200% 100%",
        animation: "m-shimmer 1.4s linear infinite",
        borderRadius: 4,
      }}
    />
  );
  return (
    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
      {bar("60%")}
      {bar("85%")}
      {bar("45%")}
      <div style={{ flex: 1 }} />
      {bar("70%")}
    </div>
  );
}

function ErrorBody() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--m-err-bg)", color: "var(--m-err)", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--m-err)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4 L10 10 M10 4 L4 10" /></svg>
      </div>
      <div style={{ fontSize: "var(--m-fs-12)", color: "var(--m-fg-1)" }}>Source disconnected</div>
      <div style={{ fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>last sync 12m ago · retrying…</div>
      <button className="metraly-focus-ring" type="button" style={{ marginTop: 4, background: "transparent", color: "var(--m-cyan-500)", border: "1px solid var(--m-cyan-500)", padding: "4px 10px", borderRadius: "var(--m-r-2)", fontSize: "var(--m-fs-11)", fontFamily: "var(--m-font-ui)", cursor: "pointer" }}>
        Reconnect
      </button>
    </div>
  );
}

function EmptyBody() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 16, color: "var(--m-fg-3)" }}>
      <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 11 V8 M6 11 V5 M9 11 V7 M12 11 V3" strokeLinecap="round" /></svg>
      <div style={{ fontSize: "var(--m-fs-11)" }}>No telemetry in this range</div>
      <div style={{ fontSize: "var(--m-fs-10)", fontFamily: "var(--m-font-mono)" }}>0 events · widen the time window</div>
    </div>
  );
}
```

- [ ] **Step 5: Wire body content in DashboardWidget render**

In `DashboardWidget.tsx`, find `<div className="metraly-widget-shell-body">` and replace the inner `<div className="metraly-dashboard-widget-content">{children}</div>` block:

```tsx
<div className="metraly-widget-shell-body">
  {loading && !children ? (
    <LoadingSkeleton />
  ) : (state === "error" || state === "disconnected") && !children ? (
    <ErrorBody />
  ) : state === "noData" && !children ? (
    <EmptyBody />
  ) : (
    <div className="metraly-dashboard-widget-content">{children}</div>
  )}
  {(footer || canRemove) ? (
    <div className="metraly-dashboard-widget-footer">
      {footer}
      {canRemove ? (
        <button
          type="button"
          className="metraly-dashboard-widget-remove metraly-focus-ring"
          onClick={(event) => { event.stopPropagation(); onRemove?.(id!); }}
        >
          Remove
        </button>
      ) : null}
    </div>
  ) : null}
</div>
```

- [ ] **Step 6: Run ui:check**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run ui:check
```

Expected: passes.

- [ ] **Step 7: Commit**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git add packages/ui/src/styles/metraly-widget-shell.css packages/ui/src/styles/metraly-widget-picker.css packages/ui/src/dashboard/DashboardWidget.tsx
git commit -m "fix(ui): widget surfaces — shell radius, picker selected glow, DashboardWidget body states"
```

---

## Task 5: DashboardToolbar Search Fix

**Files:**
- Modify: `packages/ui/src/dashboard/DashboardToolbar.tsx`

- [ ] **Step 1: Replace visible search label with inline icon**

Find the `hasSearch` block in `DashboardToolbar.tsx` (around line 78). Replace:

```tsx
{hasSearch ? (
  <label className="metraly-dashboard-toolbar-search">
    <span>Search widgets</span>
    <input
      type="search"
      value={searchValue ?? ""}
      readOnly={!onSearchChange}
      placeholder={searchPlaceholder}
      onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
    />
  </label>
) : null}
```

With:

```tsx
{hasSearch ? (
  <label className="metraly-dashboard-toolbar-search">
    <span className="metraly-visually-hidden">Search widgets</span>
    <span className="metraly-dashboard-toolbar-search-icon" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="6.2" cy="6.2" r="3.5" />
        <path d="M9 9 L12 12" />
      </svg>
    </span>
    <input
      type="search"
      value={searchValue ?? ""}
      readOnly={!onSearchChange}
      placeholder={searchPlaceholder}
      onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
    />
  </label>
) : null}
```

- [ ] **Step 2: Add CSS for the new search layout and visually-hidden utility**

In `metraly-dashboard.css`, replace the `.metraly-dashboard-toolbar-search` block (lines 64-84):

```css
.metraly-dashboard-toolbar-search {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: min(100%, 240px);
  max-width: 360px;
  flex: 1 1 180px;
  background: var(--m-bg-2);
  border: 1px solid var(--m-line);
  border-radius: var(--m-r-2);
  height: var(--m-control-h);
  padding: 0 var(--m-pad-x);
  gap: 6px;
  transition: border-color var(--m-dur-2) var(--m-ease);
}

.metraly-dashboard-toolbar-search:focus-within {
  border-color: var(--m-cyan-500);
  box-shadow: var(--m-glow-focus);
}

.metraly-dashboard-toolbar-search-icon {
  display: inline-flex;
  color: var(--m-fg-3);
  flex: 0 0 auto;
}

.metraly-dashboard-toolbar-search input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--m-fg-0);
  font: inherit;
  font-size: var(--m-fs-12);
}

.metraly-dashboard-toolbar-row-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.375rem;
  flex-wrap: nowrap;
  min-width: 0;
}
```

Also add the visually-hidden utility (append to `metraly-theme.css` or `metraly-dashboard.css`):

```css
.metraly-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 3: Run ui:check + site:typecheck**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run ui:check && npm run site:typecheck
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git add packages/ui/src/dashboard/DashboardToolbar.tsx packages/ui/src/styles/metraly-dashboard.css packages/ui/src/styles/metraly-theme.css
git commit -m "fix(ui): DashboardToolbar search — inline icon, no visible label, flex row layout"
```

---

## Task 6: Storybook Stories Expansion

**Files:**
- Modify: `stories/MetralyForms.stories.tsx`
- Modify: `stories/DashboardWidget.stories.tsx`
- Modify: `stories/MetralyControlStates.stories.tsx`

### 6a: MetralyForms stories — all states per component

- [ ] **Step 1: Replace MetralyForms.stories.tsx with comprehensive state matrix**

```tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MetralyCheckbox, MetralyRadio, MetralySelect, MetralySwitch, MetralyTabs,
} from '@metraly/ui';

// ── helpers ────────────────────────────────────────────────────────
const SECTION = (title: string) => (
  <div style={{ fontFamily: 'var(--m-font-mono)', fontSize: 10, color: 'var(--m-fg-3)', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '4px 0 8px' }}>{title}</div>
);

const GRID = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>{children}</div>
);

const CELL = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'grid', gap: 8, padding: 12, background: 'var(--m-bg-1)', borderRadius: 'var(--m-r-3)', border: '1px solid var(--m-line)' }}>
    <div style={{ fontFamily: 'var(--m-font-mono)', fontSize: 9, color: 'var(--m-fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    {children}
  </div>
);

// ── Checkbox ───────────────────────────────────────────────────────
function CheckboxMatrix() {
  const [val, setVal] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 680 }}>
      {SECTION('MetralyCheckbox')}
      <GRID>
        <CELL label="Default"><MetralyCheckbox label="Stream metrics" /></CELL>
        <CELL label="Hover"><MetralyCheckbox label="Auto-retry" /></CELL>
        <CELL label="Focus-visible"><MetralyCheckbox label="Always-on focus" /></CELL>
        <CELL label="Checked"><MetralyCheckbox checked label="Telemetry on" /></CELL>
        <CELL label="Indeterminate"><MetralyCheckbox indeterminate label="Some sources" /></CELL>
        <CELL label="Disabled"><MetralyCheckbox checked disabled label="Locked policy" /></CELL>
        <CELL label="Loading"><MetralyCheckbox loading label="Saving…" /></CELL>
        <CELL label="Error"><MetralyCheckbox error label="Token expired" hint="Re-authenticate to continue" /></CELL>
        <CELL label="Interactive">
          <MetralyCheckbox checked={val} onChange={(e) => setVal(e.target.checked)} label="Try me" hint="Space or click" />
        </CELL>
      </GRID>
    </div>
  );
}

// ── Radio ──────────────────────────────────────────────────────────
function RadioMatrix() {
  const [val, setVal] = useState('p99');
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 680 }}>
      {SECTION('MetralyRadio')}
      <GRID>
        <CELL label="Default"><MetralyRadio name="r1" value="p50" label="p50" /></CELL>
        <CELL label="Checked"><MetralyRadio name="r2" value="p99" checked label="p99" /></CELL>
        <CELL label="Focus-visible"><MetralyRadio name="r3" value="tab" label="Tab to focus" /></CELL>
        <CELL label="Disabled"><MetralyRadio name="r4" value="med" disabled label="median (locked)" /></CELL>
        <CELL label="Error"><MetralyRadio name="r5" value="inv" error label="Invalid metric" hint="Choose a supported quantile" /></CELL>
        <CELL label="Group">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['P50','P90','P99','MAX'].map(v => (
              <MetralyRadio key={v} name="rgrp" value={v} checked={val === v} onChange={() => setVal(v)} label={v} />
            ))}
          </div>
        </CELL>
      </GRID>
    </div>
  );
}

// ── Switch ─────────────────────────────────────────────────────────
function SwitchMatrix() {
  const [on, setOn] = useState(true);
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 680 }}>
      {SECTION('MetralySwitch')}
      <GRID>
        <CELL label="Off"><MetralySwitch label="Live tail" /></CELL>
        <CELL label="On"><MetralySwitch checked label="Live tail" /></CELL>
        <CELL label="Loading"><MetralySwitch checked loading label="Applying…" /></CELL>
        <CELL label="Disabled (off)"><MetralySwitch disabled label="Read-only" /></CELL>
        <CELL label="Disabled (on)"><MetralySwitch checked disabled label="Locked" /></CELL>
        <CELL label="Purple accent"><MetralySwitch checked accent="purple" label="Beta channel" /></CELL>
        <CELL label="Interactive">
          <MetralySwitch checked={on} onClick={() => setOn(!on)} label={`Toggleable: ${on ? 'on' : 'off'}`} />
        </CELL>
      </GRID>
    </div>
  );
}

// ── Select ─────────────────────────────────────────────────────────
const SELECT_OPTS = [
  { value: '5m', label: 'Last 5 minutes' },
  { value: '1h', label: 'Last 1 hour' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
];

function SelectMatrix() {
  const [v, setV] = useState('1h');
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 680 }}>
      {SECTION('MetralySelect')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <CELL label="Default"><MetralySelect options={SELECT_OPTS} placeholder="Select range…" onChange={() => undefined} /></CELL>
        <CELL label="Value selected"><MetralySelect options={SELECT_OPTS} value="24h" onChange={() => undefined} /></CELL>
        <CELL label="Open · selected"><MetralySelect options={SELECT_OPTS} value="1h" open onChange={() => undefined} /></CELL>
        <CELL label="Loading"><MetralySelect options={SELECT_OPTS} value="1h" loading onChange={() => undefined} /></CELL>
        <CELL label="Disabled"><MetralySelect options={SELECT_OPTS} value="1h" disabled onChange={() => undefined} /></CELL>
        <CELL label="Interactive"><MetralySelect options={SELECT_OPTS} value={v} onChange={setV} /></CELL>
      </div>
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────
const DORA_ICON = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M8 1 L3 8 H7 L6 13 L11 6 H7 Z" />
  </svg>
);
const FLOW_ICON = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M2 11 L5 7 L8 9 L12 3" />
  </svg>
);

const TAB_ITEMS = [
  { value: 'dora', label: 'DORA', count: 4, icon: DORA_ICON },
  { value: 'flow', label: 'Flow', count: 6, icon: FLOW_ICON },
  { value: 'reviews', label: 'Reviews', count: 5 },
  { value: 'ci', label: 'CI', count: 3 },
  { value: 'teams', label: 'Teams' },
];

function TabsMatrix() {
  const [v, setV] = useState('dora');
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 680 }}>
      {SECTION('MetralyTabs')}
      <CELL label="Default + Counts">
        <MetralyTabs items={TAB_ITEMS} defaultValue="dora" />
      </CELL>
      <CELL label="Selected with Live Pulse">
        <MetralyTabs items={TAB_ITEMS} value={v} onValueChange={setV} livePulse />
      </CELL>
      <CELL label="Disabled Tab">
        <MetralyTabs
          items={[
            { value: 'dora', label: 'DORA', count: 4, icon: DORA_ICON },
            { value: 'flow', label: 'Flow', count: 6 },
            { value: 'reviews', label: 'Reviews', count: 5 },
            { value: 'ci', label: 'CI', count: 3 },
            { value: 'teams', label: 'Teams', disabled: true },
          ]}
          defaultValue="dora"
        />
      </CELL>
    </div>
  );
}

// ── Story exports ──────────────────────────────────────────────────
const meta: Meta = { title: 'Components/Forms', component: () => null };
export default meta;
type Story = StoryObj;

export const Checkbox: Story = { render: () => <CheckboxMatrix /> };
export const Radio: Story = { render: () => <RadioMatrix /> };
export const Switch: Story = { render: () => <SwitchMatrix /> };
export const Select: Story = { render: () => <SelectMatrix /> };
export const Tabs: Story = { render: () => <TabsMatrix /> };
export const AllControls: Story = {
  name: 'All Controls',
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <CheckboxMatrix />
      <RadioMatrix />
      <SwitchMatrix />
      <SelectMatrix />
      <TabsMatrix />
    </div>
  ),
};
```

- [ ] **Step 2: Run site:typecheck**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run site:typecheck
```

Expected: passes.

### 6b: DashboardWidget stories — all widget states

- [ ] **Step 3: Verify DashboardWidget.stories.tsx covers all states**

Read `stories/DashboardWidget.stories.tsx`. If the following named exports are missing, add them:

Required exports: `Default`, `Selected`, `Dragging`, `Resizing`, `Loading`, `Empty`, `Stale`, `Error`, `Disconnected`, `FullWidth`, `WithFooter`.

For `Loading` (shows shimmer — no children needed):
```tsx
export const Loading: Story = {
  args: { id: 'w1', title: 'MTTR', subtitle: 'DORA/MTTR', state: 'live', loading: true },
};
```

For `Error` (shows ErrorBody — no children):
```tsx
export const Error: Story = {
  args: { id: 'w1', title: 'Flaky builds', subtitle: 'METRIC/SCALAR', state: 'disconnected' },
};
```

For `Empty` (shows EmptyBody — no children):
```tsx
export const Empty: Story = {
  args: { id: 'w1', title: 'CI failure rate', subtitle: 'CI/FAIL', state: 'noData' },
};
```

### 6c: Enhance Component State Board

- [ ] **Step 4: Expand MetralyControlStates.stories.tsx to 12-slot prototype grid**

The story already exists. Ensure the `StateBoardShowcase` function renders all 12 component slots in a layout matching the prototype pages:

1. MetralyCheckbox — show Default + Checked + Error cells inline
2. MetralyRadio — show Default + Checked + Group inline
3. MetralySwitch — show Off + On + Purple inline
4. MetralySelect — show Default + Open inline
5. MetralyTabs — show Default+Counts + Selected+LivePulse
6. StateBadge — show live + stale + error + new + info + disabled
7. DashboardResizeHandle — show north + east + southeast active
8. DashboardDropZone — show idle + active + rejected
9. DashboardToolbar — show full two-row toolbar
10. MetralyTable — show default + selected row + loading + empty
11. WidgetPickerCard — show default + selected + new + disabled + dragging
12. WidgetShell (DashboardWidget) — show live + loading + stale + error/disconnected

Replace the `StateBoardShowcase` function body with:

```tsx
function StateBoardShowcase() {
  return (
    <div style={{ display: 'grid', gap: 20, padding: 16, background: 'var(--m-bg-0)', color: 'var(--m-fg-1)' }}>
      <div style={{ fontFamily: 'var(--m-font-mono)', fontSize: 10, color: 'var(--m-fg-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Component State Board · Form controls 1–6
      </div>

      {/* Row 1–6: form controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {/* 1. Checkbox */}
        <BoardSection title="1. MetralyCheckbox">
          <div style={{ display: 'grid', gap: 8 }}>
            <MetralyCheckbox label="Stream metrics" />
            <MetralyCheckbox checked label="Telemetry on" />
            <MetralyCheckbox indeterminate label="Some sources" />
            <MetralyCheckbox disabled checked label="Locked policy" />
            <MetralyCheckbox loading label="Saving…" />
            <MetralyCheckbox error label="Token expired" hint="Re-authenticate to continue" />
          </div>
        </BoardSection>

        {/* 2. Radio */}
        <BoardSection title="2. MetralyRadio">
          <div style={{ display: 'grid', gap: 8 }}>
            <MetralyRadio name="sb-r" value="p50" label="p50" />
            <MetralyRadio name="sb-r2" value="p99" checked label="p99" />
            <MetralyRadio name="sb-r3" value="inv" error label="Invalid metric" hint="Choose a supported quantile" />
            <MetralyRadio name="sb-r4" value="med" disabled label="median (locked)" />
          </div>
        </BoardSection>

        {/* 3. Switch */}
        <BoardSection title="3. MetralySwitch">
          <div style={{ display: 'grid', gap: 8 }}>
            <MetralySwitch label="Live tail" />
            <MetralySwitch checked label="Live tail" />
            <MetralySwitch checked loading label="Applying…" />
            <MetralySwitch disabled label="Read-only" />
            <MetralySwitch checked disabled label="Locked" />
            <MetralySwitch checked accent="purple" label="Beta channel" />
          </div>
        </BoardSection>

        {/* 4. Select */}
        <BoardSection title="4. MetralySelect">
          <div style={{ display: 'grid', gap: 8 }}>
            <MetralySelect options={[{ value: '1h', label: 'Last 1 hour' }, { value: '24h', label: 'Last 24 hours' }]} placeholder="Select range…" onChange={() => undefined} />
            <MetralySelect options={[{ value: '1h', label: 'Last 1 hour' }, { value: '24h', label: 'Last 24 hours' }]} value="24h" onChange={() => undefined} />
            <MetralySelect options={[{ value: '1h', label: 'Last 1 hour' }]} value="1h" loading onChange={() => undefined} />
            <MetralySelect options={[{ value: '1h', label: 'Last 1 hour' }]} value="1h" disabled onChange={() => undefined} />
          </div>
        </BoardSection>

        {/* 5. Tabs */}
        <BoardSection title="5. MetralyTabs">
          <div style={{ display: 'grid', gap: 12 }}>
            <MetralyTabs
              items={[
                { value: 'd', label: 'DORA', count: 4 },
                { value: 'f', label: 'Flow', count: 6 },
                { value: 'r', label: 'Reviews', count: 5 },
                { value: 'c', label: 'CI', count: 3 },
                { value: 't', label: 'Teams' },
              ]}
              defaultValue="d"
            />
            <MetralyTabs
              items={[
                { value: 'd', label: 'DORA', count: 4 },
                { value: 'f', label: 'Flow', count: 6 },
                { value: 'r', label: 'Reviews', count: 5 },
                { value: 'c', label: 'CI', count: 3 },
                { value: 't', label: 'Teams', disabled: true },
              ]}
              defaultValue="d"
              livePulse
            />
          </div>
        </BoardSection>

        {/* 6. StateBadge */}
        <BoardSection title="6. StateBadge">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <StateBadge state="live" />
            <StateBadge state="ok" />
            <StateBadge state="stale" label="Stale 4m" />
            <StateBadge state="error" />
            <StateBadge state="new" />
            <StateBadge state="info" />
            <StateBadge state="disabled" />
            <StateBadge state="disconnected" />
            <StateBadge state="warning" />
            <StateBadge state="success" />
            <StateBadge state="noData" />
          </div>
        </BoardSection>
      </div>

      <div style={{ fontFamily: 'var(--m-font-mono)', fontSize: 10, color: 'var(--m-fg-3)', letterSpacing: '0.04em', textTransform: 'uppercase', paddingTop: 8 }}>
        Widget surface 7–12
      </div>

      {/* Row 7–12: widget components */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>

        {/* 7. DashboardResizeHandle */}
        <BoardSection title="7. DashboardResizeHandle">
          <div style={{ position: 'relative', height: 80, background: 'var(--m-bg-1)', borderRadius: 'var(--m-r-4)', border: '1px solid var(--m-cyan-500)' }}>
            <DashboardResizeHandle direction="northwest" label="nw" active />
            <DashboardResizeHandle direction="north" label="n" active />
            <DashboardResizeHandle direction="northeast" label="ne" active />
            <DashboardResizeHandle direction="east" label="e" active />
            <DashboardResizeHandle direction="southeast" label="se" active />
            <DashboardResizeHandle direction="south" label="s" active />
            <DashboardResizeHandle direction="southwest" label="sw" active />
            <DashboardResizeHandle direction="west" label="w" active />
          </div>
        </BoardSection>

        {/* 8. DashboardDropZone */}
        <BoardSection title="8. DashboardDropZone">
          <div style={{ display: 'grid', gap: 8 }}>
            <DashboardDropZone state="idle" />
            <DashboardDropZone state="active" />
            <DashboardDropZone state="rejected" />
          </div>
        </BoardSection>

        {/* 9. DashboardToolbar */}
        <BoardSection title="9. DashboardToolbar">
          <DashboardToolbar
            tabs={[{ value: 'del', label: 'Delivery', count: 11 }, { value: 'dora', label: 'DORA', count: 4 }, { value: 'flow', label: 'Flow', count: 6 }]}
            activeTab="del"
            searchValue=""
            syncState="live"
            syncLabel="Live · 30s"
            editMode
            onToggleEdit={() => undefined}
            onAddWidget={() => undefined}
          />
        </BoardSection>

        {/* 10. MetralyTable */}
        <BoardSection title="10. MetralyTable">
          <MetralyTable
            dense
            stickyHeader
            selectedRowKeys={['auth-service']}
            columns={[
              { key: 'service', header: 'Service' },
              { key: 'p99', header: 'P99', align: 'right' },
              { key: 'status', header: 'Status' },
            ]}
            data={[
              { service: 'api-gateway', p99: '184 ms', status: <StateBadge state="live" label="Live" size="sm" /> },
              { service: 'auth-service', p99: '92 ms', status: <StateBadge state="live" label="Live" size="sm" /> },
              { service: 'billing', p99: '612 ms', status: <StateBadge state="stale" label="Stale" size="sm" /> },
              { service: 'worker-pool', p99: '—', status: <StateBadge state="error" label="Error" size="sm" /> },
            ]}
            rowKey={(r) => r.service}
          />
        </BoardSection>

        {/* 11. WidgetPickerCard */}
        <BoardSection title="11. WidgetPickerCard">
          <div style={{ display: 'grid', gap: 8 }}>
            <WidgetPickerCard title="Metric card" kind="METRIC/SCALAR" description="Single KPI with delta and sparkline." iconLabel="metric" />
            <WidgetPickerCard title="Time-series chart" kind="CHART/LINE" description="Multi-series line, p50/p99 overlay." iconLabel="chart" selected />
            <WidgetPickerCard title="Flaky builds · 7d" kind="CI/FLAKY" description="Tests retried-then-passed." iconLabel="lightning" visualState="new" />
            <WidgetPickerCard title="WIP per engineer" kind="FLOW/WIP" description="Source not connected." iconLabel="user" disabled />
            <WidgetPickerCard title="Time-series chart" kind="CHART/LINE" description="Multi-series line." iconLabel="chart" dragging />
          </div>
        </BoardSection>

        {/* 12. WidgetShell */}
        <BoardSection title="12. WidgetShell (DashboardWidget)">
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <DashboardWidget id="w1" title="Deploy frequency" subtitle="DORA/DEPLOY-FREQ" state="live" style={{ height: 120 }} />
            <DashboardWidget id="w2" title="Lead time" subtitle="DORA/LEAD-TIME" state="live" selected style={{ height: 120 }} />
            <DashboardWidget id="w3" title="Change failure ra…" subtitle="DORA/CFR" state="stale" stateLabel="Stale 4m" style={{ height: 120 }} />
            <DashboardWidget id="w4" title="CI failure rate" subtitle="CI/FAIL" state="disconnected" style={{ height: 120 }} />
            <DashboardWidget id="w5" title="MTTR" subtitle="DORA/MTTR" state="live" loading style={{ height: 120 }} />
            <DashboardWidget id="w6" title="CI failure rate" subtitle="CI/FAIL" state="noData" style={{ height: 120 }} />
          </div>
        </BoardSection>

      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run typecheck + test**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run site:typecheck && npm run site:test
```

Expected: both pass.

- [ ] **Step 6: Commit**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git add stories/MetralyForms.stories.tsx stories/DashboardWidget.stories.tsx stories/MetralyControlStates.stories.tsx
git commit -m "docs(storybook): expand form + widget stories to full prototype state coverage"
```

---

## Task 7: Validation

- [ ] **Step 1: Run all checks**

```bash
cd /home/zubarev/Projects/metraly/brandbook && npm run ui:check && npm run site:typecheck && npm run site:test && npm run build-storybook
```

Expected: all pass.

- [ ] **Step 2: Run grep checks**

```bash
# No old preview layer
grep -R "previews.css\|components/previews\|PreviewHardening\|claude-preview" /home/zubarev/Projects/metraly/brandbook --include="*.ts" --include="*.tsx" --include="*.css"

# No duplicate per-component keyframes
grep -R "@keyframes metraly-" /home/zubarev/Projects/metraly/brandbook/packages/ui/src/styles

# No hardcoded rgba in production CSS
grep -R "rgba(0,229,204\|rgba(245,158,11\|rgba(239,68,68" /home/zubarev/Projects/metraly/brandbook/packages/ui/src/styles

# Verify PulseWave not in forbidden locations
grep -R "PulseWave" /home/zubarev/Projects/metraly/brandbook/packages/ui/src/components /home/zubarev/Projects/metraly/brandbook/packages/ui/src/dashboard /home/zubarev/Projects/metraly/brandbook/stories /home/zubarev/Projects/metraly/brandbook/site/app
```

Expected: old preview layer grep = empty; duplicate keyframes grep = empty (only `m-spin` now); PulseWave grep = empty.

- [ ] **Step 3: Final commit if all pass**

```bash
cd /home/zubarev/Projects/metraly/brandbook
git log --oneline -8
```

---

## Library Integration Status

| Library | Status | Action |
|---|---|---|
| `@dnd-kit/core 6.3.1` | Installed, not used in production components | Document as gap: interactive drag stories use simulated `dragging` prop |
| `@dnd-kit/sortable 10.0.0` | Installed, not used | Same — future `WidgetPickerCard` drag-to-add wiring |
| `react-grid-layout 2.2.3` | Installed, not wired | `DashboardGrid.tsx` exists but uses CSS grid. Document as future grid engine |
| `react-resizable 3.0.5` | Installed, not wired | Future `react-grid-layout` integration |
| `recharts 3.8.1` | Installed, used in charts package (`packages/ui/src/charts/`) | Wired ✅ |
| `zustand 5.0.13` | Installed, not used | `DashboardEditorScenario` state is local `useState`; wire if scenario grows |
| `react 19.2.6` | Used ✅ | |

**Do not fake library integrations.** The dnd-kit / RGL / zustand gaps are intentionally deferred — the component API accepts `dragging`/`resizing` props so interactive scenarios can wire up later without changing the design system.

---

## Architectural Notes

**Belongs in `packages/ui`:**
- All CSS tokens, component CSS, component TSX
- `LoadingSkeleton`, `ErrorBody`, `EmptyBody` as internal sub-components of `DashboardWidget`

**Remains story-only:**
- Interactive `useState` demo wrappers (radio group, checkbox toggle, select interactive)
- The `Component State Board` showcase

**Remains site-only:**
- Documentation prose, pattern pages, foundations color/motion pages

**Next after this plan:**
1. Wire dnd-kit drag into `DashboardEditorScenario` for real drag-from-library behavior
2. Replace `DashboardGrid` CSS grid with `react-grid-layout` for resize-and-drag
3. Move `DashboardEditorScenario` state to Zustand store

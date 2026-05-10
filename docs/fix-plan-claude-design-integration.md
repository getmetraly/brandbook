# Fix Plan — Claude Design integration

Validation date: 2026-05-10  
Commit reviewed: e48ed75 "implement claude code components."  
Status: **Needs another implementation pass** (1 blocker, 2 high, 4 medium issues)

Approach: **write tests → see them fail → implement → verify → commit → step report**.  
Order: blocker → high → medium. Each step is atomic and self-contained.

---

## Step 1 — Fix build blocker: DashboardToolbar RSC serialization

**File:** `packages/ui/src/dashboard/DashboardToolbar.tsx`

**Root cause:** Line ~73–75 always creates an `onChange` arrow regardless of whether `onSearchChange` prop is passed. RSC cannot serialize a function prop into a Server Component's rendered output.

### 1a. Write tests first

File: `site/__tests__/dashboard/DashboardComponents.test.tsx`

```tsx
it('renders search input as readOnly when onSearchChange is not provided', () => {
  render(<DashboardToolbar title="Board" searchValue="" />);
  const input = screen.getByRole('searchbox');
  expect(input).toHaveAttribute('readOnly');
});

it('renders search input with handler when onSearchChange is provided', () => {
  const onSearch = jest.fn();
  render(<DashboardToolbar title="Board" searchValue="q" onSearchChange={onSearch} />);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'new' } });
  expect(onSearch).toHaveBeenCalledWith('new');
});
```

### 1b. Fix

In `DashboardToolbar.tsx`, change:

```tsx
onChange={(event) => onSearchChange?.(event.target.value)}
```

to:

```tsx
onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
```

### 1c. Verify

```bash
cd site && npm run test -- --testPathPattern=DashboardComponents
npm run build
```

Build must pass with no prerender errors.

---

## Step 2 — Remove committed zip artifacts from git

**Files:** `brandbook-metraly(2).zip`, `brandbook-metraly(2).zip:Zone.Identifier` (repo root)

### 2a. Audit check

```bash
git ls-files | grep -E '\.(zip|Zone)'
```

Must return empty after fix.

### 2b. Fix

```bash
git rm "brandbook-metraly(2).zip" "brandbook-metraly(2).zip:Zone.Identifier"
echo "*.zip" >> .gitignore
echo "*:Zone.Identifier" >> .gitignore
```

No new unit test needed — repo hygiene.

### 2c. Verify

```bash
git ls-files | grep -E '\.(zip|Zone)'
# must return empty
cat .gitignore | grep zip
```

---

## Step 3 — Fix drag handle: DashboardWidget accessible affordance

**File:** `packages/ui/src/dashboard/DashboardWidget.tsx` lines ~113–127

**Problem:** `role="button" tabIndex=0` without `onKeyDown`/`onClick` — focusable but non-functional.

### 3a. Write tests first

File: `site/__tests__/DashboardWidget.test.tsx`

```tsx
it('drag handle is presentation-only when no drag handler is provided', () => {
  render(<DashboardWidget title="Widget" state="live" />);
  const handle = document.querySelector('.metraly-widget-shell-drag-handle');
  expect(handle).toBeInTheDocument();
  expect(handle).not.toHaveAttribute('role', 'button');
  expect(handle?.getAttribute('tabindex')).not.toBe('0');
});

it('drag handle has role=button and key handler when onDragStart is provided', () => {
  const onDrag = jest.fn();
  render(<DashboardWidget title="Widget" state="live" id="w1" onDragStart={onDrag} />);
  const handle = screen.getByRole('button', { name: 'Drag to move' });
  fireEvent.keyDown(handle, { key: ' ' });
  expect(onDrag).toHaveBeenCalledWith('w1');
});
```

### 3b. Fix

Add `onDragStart?: (id: string) => void` to `DashboardWidgetProps`. In the handle JSX:

```tsx
const canDrag = Boolean(id && onDragStart);
<span
  className="metraly-widget-shell-drag-handle metraly-focus-ring"
  {...(canDrag
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-label": "Drag to move",
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onDragStart!(id!);
          }
        },
      }
    : {
        role: "presentation" as const,
        "aria-hidden": true,
      })}
>
```

### 3c. Verify

```bash
cd site && npm run test -- --testPathPattern=DashboardWidget
npm run typecheck
```

---

## Step 4 — Fix DashboardResizeHandle: gate tabIndex on active

**File:** `packages/ui/src/dashboard/DashboardResizeHandle.tsx`

**Problem:** Handle is always `tabIndex=0` even when inactive — non-functional focusable element.

### 4a. Write tests first

File: `site/__tests__/dashboard/DashboardComponents.test.tsx`

```tsx
it('inactive resize handle is not focusable', () => {
  render(<DashboardResizeHandle direction="east" label="Resize width" />);
  const handle = document.querySelector('.metraly-dashboard-resize-handle');
  expect(handle).not.toHaveAttribute('tabindex', '0');
});

it('active resize handle is focusable with correct label', () => {
  render(<DashboardResizeHandle direction="east" label="Resize width" active />);
  const handle = screen.getByRole('separator', { name: 'Resize width' });
  expect(handle).toHaveAttribute('tabindex', '0');
});
```

### 4b. Fix

```tsx
tabIndex={active ? 0 : undefined}
```

### 4c. Verify

```bash
cd site && npm run test -- --testPathPattern=DashboardComponents
```

---

## Step 5 — Confirm is-preview-hover / is-preview-focus CSS rules exist

**File:** `site/app/components/previews/previews.css`

### 5a. Audit check

```bash
grep -n "is-preview-hover\|is-preview-focus" site/app/components/previews/previews.css
```

### 5b. Fix (if missing)

Add to `previews.css`:

```css
.is-preview-hover {
  --metraly-control-bg: var(--color-hover, rgba(6, 182, 212, 0.12));
}

.is-preview-focus {
  outline: 2px solid var(--metraly-cyan);
  outline-offset: 2px;
}
```

### 5c. Verify

```bash
npm run build-storybook
```

No unit test needed — visual state board verification.

---

## Step 6 — Remove pulse-marker from claude-editor-note

**File:** `site/app/components/previews/ClaudeDesignStateBoard.tsx` line ~287

**Problem:** `metraly-pulse-marker` sits inside `[role="note"]` next to drag-handle copy — violates the spirit of "no pulse before drag labels".

### 6a. Write test first

File: `site/__tests__/preview/ClaudeDesignStateBoard.test.tsx`

Add inside the existing describe block:

```tsx
it('editor note does not contain a pulse marker', () => {
  const { container } = render(<EngineeringDashboardEditorPreview />);
  const note = container.querySelector('[role="note"]');
  expect(note?.querySelector('.metraly-pulse-marker')).not.toBeInTheDocument();
});
```

### 6b. Fix

Remove from `ClaudeDesignStateBoard.tsx`:

```tsx
<span className="metraly-pulse-marker" aria-hidden="true" />
```

### 6c. Verify

```bash
cd site && npm run test -- --testPathPattern=ClaudeDesignStateBoard
```

---

## Step 7 — aria-current on sidebar + chart state test coverage

**Files:**
- `site/app/components/previews/ClaudeDesignStateBoard.tsx` — sidebar active item
- `site/__tests__/charts/MetralyChartWrappers.test.tsx` — chart error/loading states

### 7a. Write tests first

Sidebar test (add to `ClaudeDesignStateBoard.test.tsx`):

```tsx
it('active sidebar nav item has aria-current="page"', () => {
  render(<EngineeringDashboardEditorPreview />);
  const nav = screen.getByRole('navigation');
  const active = within(nav).getByRole('button', { name: /delivery/i });
  expect(active).toHaveAttribute('aria-current', 'page');
});
```

Chart state tests (add to `MetralyChartWrappers.test.tsx`):

```tsx
it('MetralyChartCard renders error state with role=alert', () => {
  render(<MetralyChartCard title="Test" summary="summary" state="error" />);
  expect(screen.getByRole('alert')).toHaveTextContent('Chart disconnected');
});

it('MetralyChartCard renders loading state with role=status', () => {
  render(<MetralyChartCard title="Test" summary="summary" state="loading" />);
  expect(screen.getByRole('status')).toHaveTextContent('Loading chart');
});

it('MetralyChartCard renders noData state with role=status', () => {
  render(<MetralyChartCard title="Test" summary="summary" state="noData" />);
  expect(screen.getByRole('status')).toHaveTextContent('No chart data');
});
```

### 7b. Fix

`ClaudeDesignStateBoard.tsx` sidebar button:

```tsx
aria-current={item === "Delivery" ? "page" : undefined}
```

Chart component code already has correct roles — only tests were missing.

### 7c. Verify

```bash
cd site && npm run test
npm run build
npm run build-storybook
```

All must pass.

---

## Step report template

After each step, append to `docs/fix-plan-progress.md`:

```
## Step N — <title>
Date: YYYY-MM-DD
Status: done / blocked
Tests written: <file:line>
Tests result: pass / fail
Implementation: <file:line>
Build: pass / fail
Notes: ...
```

---

## Final verification checklist

Run from repo root after all steps complete:

```bash
cd site
npm run typecheck      # must pass
npm run test           # must pass, 0 failures
npm run build          # must pass, no prerender errors
npm run build-storybook  # must pass
git ls-files | grep zip  # must return empty
```

If all pass → PR is ready to merge.

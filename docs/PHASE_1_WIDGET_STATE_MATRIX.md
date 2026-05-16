# Phase 1 — Widget state matrix

Canonical `WidgetStateStatus`:

```ts
type WidgetStateStatus =
  | "ready"
  | "loading"
  | "empty"
  | "partial"
  | "stale"
  | "auth_failed"
  | "rate_limited"
  | "source_disconnected"
  | "schema_mismatch"
  | "permission_denied"
  | "formula_invalid"
  | "error";
```

For every widget-capable component the table below answers:

- **Render** — what the user sees
- **Data** — shown / partial / hidden
- **Badge** — which state primitive surfaces
- **Action** — what action (retry / help) appears
- **AI explain** — is the AI explain entrypoint allowed
- **Don't claim** — copy / visual claims that are forbidden

---

## `MetralyGauge`

| State | Render | Data | Badge | Action | AI explain | Don't claim |
|---|---|---|---|---|---|---|
| ready | Dial + value + thresholds | full | none | drilldown | yes | — |
| loading | Skeleton dial, no value | hidden | `StatusBadge "Loading"` | none | no | not a "score of zero" |
| empty | StateBlock + faded dial frame | hidden | `StatusBadge "No data"` | none | no | not "0%" or "all healthy" |
| partial | Full dial + warning copy | partial | `StatusBadge "Partial data"` | none | yes (with caveat) | not the canonical value |
| stale | Full dial + delayed copy + mono timestamp | last good | `StatusBadge "Delayed"` | none | yes (with caveat) | not "current" |
| auth_failed | StateBlock | hidden | `StatusBadge "Auth failed"` | Retry | no | not "healthy" |
| rate_limited | StateBlock | hidden | `StatusBadge "Rate limited"` | Retry | no | not a real reading |
| source_disconnected | StateBlock | hidden | `StatusBadge "Source disconnected"` | Retry | no | not "down for everyone" — only that source |
| schema_mismatch | StateBlock | hidden | `StatusBadge "Schema mismatch"` | Open metric explorer | no | not a number |
| permission_denied | StateBlock | hidden | `StatusBadge "Permission denied"` | Open source settings | no | not "no activity" |
| formula_invalid | StateBlock | hidden | `StatusBadge "Formula invalid"` | Open metric | no | not "0%" |
| error | StateBlock | hidden | `StatusBadge "Error"` | Retry / open log | no | not a fake reading |

## `MetralyHeatmap`

| State | Render | Data | Badge | Action | AI explain | Don't claim |
|---|---|---|---|---|---|---|
| ready | Cell grid + legend | full | none | drilldown / cell-activate | yes | — |
| loading | Skeleton grid via state block | hidden | `Loading` | none | no | not "no activity" |
| empty | StateBlock + faded grid | hidden | `No data` | none | no | not "all zero" — distinguish from genuinely zero cells |
| partial | Grid with sparse cells | partial | `Partial data` | none | yes (caveat) | not the canonical density |
| stale | Grid + delayed badge | last good | `Delayed` | none | yes (caveat) | not "live" |
| auth_failed | StateBlock | hidden | `Auth failed` | Retry | no | not "no incidents" |
| rate_limited | StateBlock | hidden | `Rate limited` | Retry | no | — |
| source_disconnected | StateBlock | hidden | `Source disconnected` | Retry | no | — |
| schema_mismatch | StateBlock | hidden | `Schema mismatch` | Re-validate | no | — |
| permission_denied | StateBlock | hidden | `Permission denied` | Expand scopes | no | — |
| formula_invalid | StateBlock | hidden | `Formula invalid` | Open metric | no | — |
| error | StateBlock | hidden | `Error` | Retry / open log | no | — |

## `ActivityFeed`

| State | Render | Data | Badge | Action | AI explain | Don't claim |
|---|---|---|---|---|---|---|
| ready | List + items | full | none | per-item activate | yes | — |
| loading | 5 skeleton rows | hidden | `aria-busy` | none | no | — |
| empty | StateBlock | hidden | none | — | no | not "nothing happened" — say "no events in this range" |
| partial | List + footer warning | partial | footer `Partial` | continue waiting | yes (caveat) | not the canonical count |
| stale | List + footer warning | last good | footer `Delayed` | none | yes (caveat) | not "live" |
| auth_failed | StateBlock | hidden | `Auth failed` | Retry | no | — |
| rate_limited | StateBlock | hidden | `Rate limited` | Retry | no | — |
| source_disconnected | StateBlock | hidden | `Source disconnected` | Retry | no | — |
| schema_mismatch | StateBlock | hidden | `Schema mismatch` | Re-validate | no | — |
| permission_denied | StateBlock | hidden | `Permission denied` | Expand scopes | no | — |
| formula_invalid | StateBlock | hidden | `Formula invalid` | Open metric | no | — |
| error | StateBlock | hidden | `Error` | Retry / open log | no | — |

## `InsightCard`

| State | Render | Data | Badge | Action | AI explain | Don't claim |
|---|---|---|---|---|---|---|
| ready | Full insight + evidence | full | tone badge | primary CTA | yes (when `source === "ai"`) | when AI-grounded, never present without evidence |
| loading | StateBlock | hidden | `Loading` | none | no | — |
| empty | StateBlock | hidden | `No insight yet` | none | no | not "all good" — distinguish from "no signal" |
| partial | Insight + caveat | partial | `Partial data` | primary | yes (caveat) | confidence cannot be `high` while partial |
| stale | Insight + delayed copy | last good | `Delayed` | primary | yes (caveat) | not "current" |
| auth_failed / rate_limited / source_disconnected / permission_denied / schema_mismatch / formula_invalid / error | StateBlock | hidden | matching badge | Retry / Open settings | no | not a result |

## `StateBoard`

| State | Render | Data | Badge | Action | AI explain | Don't claim |
|---|---|---|---|---|---|---|
| ready | Tile grid + summary chips | full | per-tile badges | per-tile activate | yes (per tile) | — |
| loading | StateBlock | hidden | `Loading` | none | no | — |
| empty | StateBlock | hidden | `Nothing to report` | none | no | not "all healthy" — distinguish from "no items" |
| partial | Tiles + warning copy | partial | `Partial data` | none | yes (caveat) | not the canonical health |
| stale | Tiles + delayed copy | last good | `Delayed` | none | yes (caveat) | not "current" |
| auth_failed / rate_limited / source_disconnected / permission_denied / schema_mismatch / formula_invalid / error | StateBlock | hidden | matching badge | Retry / Open settings | no | — |

## `ConnectionTestPanel` (domain-specific 8-state)

Domain enum → WidgetStateStatus mapping for cross-component reporting:

| Domain status | Maps to | UI behavior |
|---|---|---|
| not_tested | `empty` | StateBlock-like with retry CTA |
| testing | `loading` | `aria-busy`, status badge "Testing" |
| ready | `ready` | check list, badges all green |
| auth_failed | `auth_failed` | StateBlock + Retry |
| permission_denied | `permission_denied` | StateBlock + Open scopes |
| rate_limited | `rate_limited` | StateBlock + Retry |
| source_unavailable | `source_disconnected` | StateBlock + Retry |
| degraded | `partial` | check list with failed entries; CTA Retry |

## `SyncProgressPanel` (domain-specific 9-state)

| Domain stage | Maps to | UI behavior |
|---|---|---|
| queued | `loading` | indeterminate bar |
| discovering | `loading` | indeterminate bar + sub-stage |
| backfilling | `loading` / `partial` | bar with determinate progress or indeterminate |
| incremental | `ready` | live badge |
| paused | `stale` (operator-initiated) | warning badge + resume CTA |
| rate_limited | `rate_limited` | bar in warn color + retry CTA |
| completed | `ready` | live badge |
| failed | `error` | bar in err color + retry CTA |
| cancelled | `empty` | neutral badge |

---

## Cross-cutting rules

- **Loading must never look like 0%.** Skeletons, no value rendered. `aria-busy=true`.
- **Empty must never look like "everything is fine".** Empty is the absence of evidence, not a verdict.
- **Partial / stale always show the badge and the qualifier copy.** If the badge is hidden, the data must not be shown.
- **AI explain is suppressed in any non-data state.** The button is rendered only when there is data to explain.
- **Retry actions are only present where the user can actually act.** Errors that require an admin (`permission_denied`) link to scope settings, not Retry.

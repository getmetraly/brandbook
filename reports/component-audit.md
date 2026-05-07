# Component Audit and Consolidation Strategy for Metraly

This audit identifies the existing UI components, icons and layout patterns across the Metraly application.  It highlights overlap, inconsistencies and gaps, and proposes how to consolidate them into a cohesive design system.  The goal is to reduce duplication, improve reusability and ensure a consistent user experience across the product, marketing site and documentation.

## 1. Existing Components Overview

### 1.1 Chart Components

Metraly currently ships multiple bespoke chart components: **AreaChart**, **BarChart**, **Gauge**, **Heatmap** and **Sparkline**【632635575803481†L24-L47】.  These wrap Recharts primitives but each defines its own axes, colours and legends.  To avoid duplication:

* Extract a base `MetralyChart` primitive that handles tokenised colours, axes styling, tooltips, empty states and responsive behaviour.
* Build specific wrappers (`MetralyAreaChart`, `MetralyBarChart`, etc.) on top of this base to expose common props (series, thresholds, stacking).  Keep variant‑specific logic minimal.
* Centralise chart colour schemes in design tokens and map semantic roles (primary, secondary, warning) to chart lines and bars【344032000343319†L203-L221】.

### 1.2 Dashboard Components

The **DashboardRenderer** composes widgets into a responsive grid.  A separate **DraggableDashboardRenderer** adds drag‑and‑drop editing using `react-grid-layout`, and a `widgetRegistry.tsx` maps widget IDs to React components【632635575803481†L24-L47】.  Observations:

* The renderer pattern aligns with the platform’s extensibility ethos; preserve the registry but expose it as a framework plugin API so third‑party widgets can register themselves.
* Abstract grid logic into a `DashboardGrid` primitive that can be reused for plugin configuration pages or data boards.  Provide props for column count, row height, breakpoints and drag callbacks【206706482012678†L240-L283】.
* Decouple edit‑mode UI (drag handles, drop zones, resize affordances) into their own reusable components (`DragOverlay`, `DropZone`, `ResizeHandle`).

### 1.3 Layout Components

The layout folder defines the **DraggableTweaksPanel**, **Sidebar** and **Topbar**.  These are used across the app but are not abstracted for reuse【632635575803481†L24-L47】.  Recommendations:

* Create a generic `AppShell` component that composes a top bar, sidebar and content region.  Accept slots or props to customise navigation items, user menus and accent colours.
* Expose a `TweaksPanel` primitive that can host any settings or context information.  Provide drag‑to‑reposition behaviour and persist its state in local storage.  Use tokens for shadow and radii to match elevation guidelines【913460924002922†L6-L21】.
* Encapsulate responsive behaviour (collapse to drawer) using CSS logical properties for RTL support【849328462375381†L73-L79】.

### 1.4 General‑Purpose UI Components

Several components under `ui/src/components/ui` overlap in purpose:

* **AIInsightCard**, **InlineInsight** and **StatCard** all display metrics or insights.  Consolidate them into a single `InsightCard` with configurable slots for title, subtitle, metric, sparkline and CTA.
* **Badge** and **DORABadge** serve similar roles.  Create a generic `StatusBadge` with variant props (success, warning, info, error) and remove DORA‑specific styling from the base component.
* **DataTable** is the sole table component.  Define a reusable `MetralyTable` primitive with variant props for sorting, pagination and selectable rows.  Provide accessible semantics and keyboard navigation.
* **Leaderboard** replicates the table pattern for ranking items.  Implement it as a composition of `MetralyTable` with a ranking column.
* **PlaceholderScreen** is used for empty and error states.  Align its visuals with the design‑system guideline: centralised illustration, title, description and action【849328462375381†L73-L79】.
* **Widget** acts as a thin wrapper; unify it with the new `DashboardGrid` and `WidgetShell` to standardise widget padding, shadows and selection states.

### 1.5 Icons and Micro Telemetry

Metraly uses a single `Icon` component that references ~40 SVG paths grouped by domain (UI/navigation, integrations, status, analytics, Git, miscellaneous)【632635575803481†L24-L47】.  To harmonise the icon system:

* Maintain a central registry for icons; expand it only when necessary and avoid synonyms.  Follow naming conventions (lower‑camel case) and categories.
* Ensure all icons inherit colour via `currentColor` and are defined at 24 × 24 px with 1.5 px stroke【299657478959534†L71-L82】.
* Consider adopting a well‑supported external set such as Feather Icons or Font Awesome for common metaphors, while keeping proprietary symbols custom.

The **micro telemetry primitives** document introduces small animated indicators: select indicator, accordion indicator, live badge, sync state, drag indicator and telemetry divider.  These should be codified into reusable components with consistent sizes and motion tokens【849328462375381†L73-L79】.

## 2. Gaps and Duplication

* **Multiple card variants:** AIInsightCard, InlineInsight and StatCard share similar layouts.  Merge them into a single card primitive with slots and variant props.
* **Charts without a shared base:** Each chart component defines its own styling.  Extract a base chart wrapper to ensure colours, axes and tooltips align with the design system【344032000343319†L203-L221】.
* **Dashboards vs. plugin screens:** Plugin configuration pages reuse ad‑hoc layouts.  A plugin screen template should unify layout, header, tabs and action bars.
* **Layout containers:** Sidebars and top bars exist only in the app, not in the marketing site or docs.  Provide corresponding templates for those surfaces.
* **Lack of Storybook documentation:** Many components have no documented usage.  Storybook should be adopted as the source of truth for component behaviour, props and accessibility examples.
* **Accessibility gaps:** Components lack focus states, keyboard navigation and ARIA attributes.  Address these as part of the consolidation.

## 3. Consolidation Strategy

### 3.1 Define Base Primitives

Create a suite of unstyled but tokenised primitives that encapsulate universal patterns:

* `Box` and `Stack` – flexible containers with spacing props derived from the spacing scale.
* `Text` – a wrapper around typography tokens for headings, body and caption text.
* `Button` – a tokenised, accessible button with variants (primary, secondary, destructive) and icon support.
* `Card` – a container with configurable elevation (`shadowLevel`), radius and optional header/footer slots.
* `Table` – accessible table with sorting, selection and pagination built in.
* `Modal`, `Drawer`, `Popover`, `Tooltip` – overlay primitives with consistent animation and focus management.
* `FormField`, `Input`, `Select`, `Checkbox`, `Radio` – form primitives that integrate with React Hook Form or similar libraries and support i18n and RTL.

### 3.2 Compose Complex Components

Use primitives to assemble higher‑level components:

* `InsightCard` – built from `Card`, `Text`, `Badge` and `MetralySparkline` for AI insights, DORA metrics or custom analytics.
* `DashboardGrid` – a responsive grid using React Grid Layout with tokenised spacing, drag handles and drop targets; persists layouts and supports edit mode.
* `WizardScreen` – uses `Stack`, `Card` and `Button` for multi‑step flows; cross‑fades steps instead of sliding【849328462375381†L73-L79】.
* `PluginScreen` – composed of `AppShell`, `FormField` and `DashboardGrid` for plugin configuration and dashboards.
* `TelemetryIndicator` – a family of small animated accents (select, accordion, live badge) built with CSS animations governed by motion tokens【655436002110531†L62-L85】.

### 3.3 Standardise Tokens and Themes

Ensure that all components consume the design tokens defined in `tokens.md` for colours, spacing, radii, typography, shadows and motion【766331026675180†L258-L290】.  Remove any hard‑coded values.  Provide dark and light themes and support brand accents through alias tokens.

### 3.4 Integrate Accessibility

Adopt a consistent accessibility checklist:

* All interactive elements must be focusable with visible focus rings.
* Provide keyboard operation for drag‑and‑drop (`dnd-kit` guidance) and ensure screen‑reader announcements【23584703095371†L78-L180】.
* Use semantic HTML elements (`button`, `input`, `nav`, `table`) and proper ARIA roles.
* Meet WCAG contrast ratios for text and icons【299657478959534†L75-L82】.
* Support reduced‑motion preferences by disabling non‑essential animations【655436002110531†L62-L85】.

### 3.5 Document with Storybook

Set up Storybook for component documentation.  Each component should:

* Provide examples of its variants and states (default, loading, empty, error).
* Document props, events and slots with TypeScript and JSDoc comments.
* Include accessibility notes and keyboard interactions.
* Link to Figma or design artifacts when available.

## 4. Next Steps

1. **Create tokens infrastructure:** finalise the token definitions and build a Style Dictionary pipeline to generate CSS variables and TypeScript constants.
2. **Build primitives:** implement the base components (Box, Stack, Text, Button, Card, Table, Overlay, Form primitives) using tokens and accessible patterns.
3. **Refactor existing UI:** identify all usages of bespoke components in the codebase and migrate them to the new primitives.  Remove duplicate components and unify variations through props.
4. **Adopt Storybook:** integrate Storybook into the repository and begin documenting primitives and complex components.
5. **Define plugin API:** expose the widget registry and layout primitives to external plugins and provide examples.
6. **Plan incremental rollout:** coordinate with product teams to replace old components gradually, starting with internal dashboards, then marketing site, and finally documentation.

By following this consolidation strategy, Metraly can achieve a coherent, maintainable and extensible component library that serves product, marketing and documentation surfaces while adhering to the brand’s engineering‑first identity.
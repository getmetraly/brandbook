# Existing components inventory

As a first step toward a unified UI framework, it is important to understand what components already exist in the Metraly repositories.  This document summarises the components found in the `metraly` application.  Where possible, similar patterns should be extracted into reusable primitives and composite components.

## Chart components

Metraly includes several chart components located under `ui/src/components/charts`:

| Component        | Purpose                                                                             |
|------------------|-------------------------------------------------------------------------------------|
| **AreaChart**    | Renders time‑series data as stacked or single areas.  Supports multiple series and responsive resizing. |
| **BarChart**     | Displays categorical comparisons using vertical bars.  Used for counts or ranking metrics. |
| **Gauge**        | Shows a single numeric value relative to a goal or threshold (e.g. success rate).    |
| **Heatmap**      | Visualises intensity across two dimensions (e.g. day of week vs. time of day).       |
| **Sparkline**    | A compact line chart used inside stat cards or tables to hint at trends.             |

These components share underlying primitives such as axes, tooltips and colour scales.  In the framework they should be built upon common base primitives to avoid duplication.

## Dashboard components

Located in `ui/src/components/dashboard` are components responsible for rendering dashboards:

| Component                       | Description                                                                                                        |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **DashboardRenderer**           | Composes widgets into a dashboard grid based on a configuration schema.                                             |
| **DraggableDashboardRenderer**  | Extends the renderer with drag‑and‑drop editing, allowing users to rearrange widgets.                              |
| **widgetRegistry.tsx**          | A registry mapping widget identifiers to React components, used by the dashboard renderer to render the correct widget. |

These components should not be copied verbatim into other projects.  Instead, the framework can expose a generic dashboard container and plug‑in architecture.  The registry pattern is worth preserving as it aligns with the extensibility philosophy described in the Metraly README【632635575803481†L24-L47】.

## Layout components

The `ui/src/components/layout` folder defines the application shell:

| Component                 | Role                                                                                                    |
|---------------------------|----------------------------------------------------------------------------------------------------------|
| **DraggableTweaksPanel**  | A floating panel that lets users tweak settings like accent colour and density.  Saves preferences to `localStorage`. |
| **Sidebar**               | Vertical navigation containing links to dashboards, plugins and settings.  Collapsible on narrow screens. |
| **Topbar**                | Horizontal bar at the top of the app housing the logo, navigation and user menu.                         |

These are prime candidates for framework primitives—nearly every Metraly surface uses a sidebar and topbar.

## UI components

The bulk of general‑purpose components live in `ui/src/components/ui`:

| Component             | Purpose                                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| **AIInsightCard**     | Displays AI‑generated insights with a title, subtitle and call to action.                                             |
| **Badge** / **DORABadge** | Small status indicators used inside cards and tables to denote categories or DORA metrics.                           |
| **DataTable**         | Generic data table with sortable columns and pagination.  Used across dashboards.                                     |
| **InlineInsight**     | A compact component that displays an insight inline with other content.                                              |
| **Leaderboard**       | Lists items in rank order (e.g. teams or repositories) with associated metrics.                                       |
| **PlaceholderScreen** | Displays placeholder content or error messages when there is no data available.                                      |
| **SH**                | Likely a skeleton helper for showing loading states; needs to be verified.                                           |
| **StatCard**          | Shows a headline metric with optional sparkline and comparison to previous period.                                    |
| **Widget**            | A minimal wrapper for reusable dashboard widgets; used by the registry to mount the correct widget component.        |

Finally, there is a single **Icon** component in `ui/src/components/shared` that maps semantic icon names to SVG path definitions (see icons inventory).

## Observations

1. There is duplication of similar patterns: multiple card components with slightly different layouts, charts built without shared primitives, and layout containers that could be generic.  Extracting common primitives (card shell, chart axes, table scaffolding) will reduce code weight.
2. Extensibility is central to the product; the dashboard widget registry is a robust pattern that should remain.  The UI framework should allow external plugins to register new components in a type‑safe manner.
3. Many components lack formal documentation.  As part of the unification effort, each component should be catalogued in Storybook with usage examples and props documentation.
4. None of the existing components explicitly support localisation.  When extracting primitives, ensure they accept translated strings via props and use CSS logical properties to accommodate right‑to‑left layouts.  Consider adding a `LocaleSelector` component and guidelines for date/number formatting.

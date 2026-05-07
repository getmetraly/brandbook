# Layout patterns inventory

Metraly offers several high‑level layout patterns that structure pages and workflows.  These patterns should be distilled into flexible templates within the UI framework so that developers can compose new views without reinventing their own shells.

## Application shell

The primary shell consists of a **top bar**, **sidebar** and **content area**:

- **Top bar**: A horizontal strip fixed to the top of the viewport.  It contains the Metraly logo, the current workspace or product name, primary navigation items and secondary controls (e.g. profile avatar, notifications).  Use a subtle shadow (`--shadow‑md`) to separate it from the underlying content.
- **Sidebar**: A vertical navigation area placed on the left of the screen.  It lists dashboards, plugins and settings.  The sidebar collapses into an off‑canvas drawer on small screens.  Icons are placed to the left of labels, and active items are highlighted using the primary colour.
- **Content area**: Occupies the remaining horizontal space.  It hosts pages, dashboards and wizards.  The content should have a maximum width on very large screens to improve readability.

Providing a shell component in the framework avoids repetitive code and ensures consistent responsive behaviour.

## Dashboard grid

Dashboards are composed of widgets placed on a grid.  The `DashboardRenderer` reads a configuration and positions widgets accordingly.  A **drag‑and‑drop** mode (DraggableDashboardRenderer) allows users to rearrange widgets; the grid snaps to column widths and rows of equal height.  A reusable `DashboardGrid` component should expose props for column count, row height, and drag callbacks so that the same grid can power dashboards, plugin screens or other data boards.

## Wizard and onboarding screens

Metraly uses wizards for onboarding, plugin configuration and dataset selection.  The UI design notes specify that wizard screens should use compact card‑like options with a left icon, centre text and a right‑aligned checkmark indicator.  Hover states should only adjust the border/background and not shift cards vertically【849328462375381†L73-L79】.  A `WizardScreen` component should handle step progression, breadcrumbs and primary/secondary actions.

## Plugin screens

Plugins extend Metraly’s functionality.  Each plugin typically has its own configuration screen and possibly its own dashboard.  While plugin UIs vary, they should still inherit from the common application shell and use shared components.  Provide a `PluginScreen` template that includes a title, description, configuration form and a preview area.  Use the layout grid to position form sections and preview panels.

## Floating panels and overlays

The **Draggable Tweaks Panel** demonstrates a floating overlay pattern.  Such panels should:

1. Maintain a fixed width with `--radius‑md` corners and `--shadow‑lg` for separation.
2. Support both dragging via mouse and keyboard (e.g. arrow keys) with accessible grab handles.
3. Persist their position and expanded/collapsed state in `localStorage` for a consistent user experience across sessions.
4. Close when users click outside or press Escape.

Additional overlay patterns include modals, slide‑in drawers and context menus.  Provide base implementations with the appropriate tokens and animations.

## Empty and error states

Design comprehensive empty/error screens for dashboards, tables and plugin pages.  Use the `PlaceholderScreen` component to display an illustration, title and descriptive text.  Align empty states centrally and provide actionable next steps (e.g. “Add data source”).  For errors, include a helpful message and, when possible, a link to documentation or support.

By cataloguing these layouts and transforming them into reusable templates, we can build new features quickly and maintain a cohesive user experience across all Metraly surfaces.

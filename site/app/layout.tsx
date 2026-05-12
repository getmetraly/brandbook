import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./component-overrides.css";
import "./components/previews/previews.css";
import "./components/docs/docs.css";
// Import Metraly theme and component styles from @metraly/ui.  These
// styles define the design tokens and the base UI primitives used across
// the brandbook and draft dashboards.
import { ThemeProvider } from "@metraly/ui";
import "@metraly/ui/styles/metraly-theme.css";
import "@metraly/ui/styles/metraly-badge.css";
import "@metraly/ui/styles/metraly-card.css";
import "@metraly/ui/styles/metraly-metric-card.css";
import "@metraly/ui/styles/metraly-state-badge.css";
import "@metraly/ui/styles/metraly-table.css";
import "@metraly/ui/styles/metraly-forms.css";
// Import widget shell styles.  This must come after card and table styles to
// override any generic panel defaults where necessary.
import "@metraly/ui/styles/metraly-widget-shell.css";
import "@metraly/ui/styles/metraly-widget-picker.css";
import "@metraly/ui/styles/metraly-dashboard.css";
import "@metraly/ui/styles/metraly-charts.css";
import "./components/previews/claude-preview-overrides.css";
// Global styles for react-grid-layout must be imported from the root layout,
// not from a nested Client Component.
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const metadata: Metadata = {
  title: "Metraly Brandbook",
  description: "Brand, design system and implementation guide for Metraly.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider theme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}

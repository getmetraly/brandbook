import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./components/docs/docs.css";
import { ThemeProvider } from "@metraly/ui";
import "@metraly/ui/styles/metraly-theme.css";
import "@metraly/ui/styles/metraly-badge.css";
import "@metraly/ui/styles/metraly-card.css";
import "@metraly/ui/styles/metraly-button.css";
import "@metraly/ui/styles/metraly-code-block.css";
import "@metraly/ui/styles/metraly-input.css";
import "@metraly/ui/styles/metraly-metric-card.css";
import "@metraly/ui/styles/metraly-navigation-tree.css";
import "@metraly/ui/styles/metraly-logo.css";
import "@metraly/ui/styles/metraly-segmented.css";
import "@metraly/ui/styles/metraly-shell.css";
import "@metraly/ui/styles/metraly-state-badge.css";
import "@metraly/ui/styles/metraly-trend-badge.css";
import "@metraly/ui/styles/metraly-pulse-marker.css";
import "@metraly/ui/styles/metraly-table.css";
import "@metraly/ui/styles/metraly-forms.css";
import "@metraly/ui/styles/metraly-skeleton.css";
import "@metraly/ui/styles/metraly-empty-state.css";
import "@metraly/ui/styles/metraly-filter-bar.css";
// Import widget shell styles.  This must come after card and table styles to
// override any generic panel defaults where necessary.
import "@metraly/ui/styles/metraly-widget-shell.css";
import "@metraly/ui/styles/metraly-widget-picker.css";
import "@metraly/ui/styles/metraly-dashboard.css";
import "@metraly/ui/styles/metraly-charts.css";
import "@metraly/ui/styles/metraly-move-menu.css";
import "@metraly/ui/styles/metraly-wizard.css";
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

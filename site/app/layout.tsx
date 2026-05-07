import type { Metadata } from "next";
import "./globals.css";
import "./component-overrides.css";
import "./components/draft/draft-components.css";
// Import Metraly theme and card styles from the implementation pack.  These
// styles define the design tokens and the base card primitives used across
// the brandbook and draft dashboards.
import "../../implementation-pack/css/metraly-theme.css";
import "../../implementation-pack/css/metraly-card.css";
import "../../implementation-pack/css/metraly-state-badge.css";
import "../../implementation-pack/css/metraly-table.css";
// Import widget shell styles.  This must come after card and table styles to
// override any generic panel defaults where necessary.
import "../../implementation-pack/css/metraly-widget-shell.css";

export const metadata: Metadata = {
  title: "Metraly Brandbook",
  description: "Brand, design system and implementation guide for Metraly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}

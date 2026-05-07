import type { Metadata } from "next";
import "./globals.css";
import "./component-overrides.css";

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

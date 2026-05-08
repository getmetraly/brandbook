import * as React from "react";

export type ThemeMode = "dark" | "light";

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeMode;
  className?: string;
}

/**
 * Minimal brandbook theme wrapper.
 *
 * This component only sets the `data-theme` contract and the shared theme
 * class so canonical CSS variables are applied consistently. It does not own
 * theme persistence or user preference logic.
 */
export function ThemeProvider({
  children,
  theme = "dark",
  className,
}: ThemeProviderProps) {
  return (
    <div
      className={["metraly-theme", className].filter(Boolean).join(" ")}
      data-theme={theme}
    >
      {children}
    </div>
  );
}

export const MetralyThemeProvider = ThemeProvider;

export default ThemeProvider;

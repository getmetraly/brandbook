import React from "react";
import "../styles/metraly-app-kit.css";
import { MetralyIcon, metralyIconPaths, type MetralyIconName } from "../components/MetralyIcon";

export interface AppIconLibraryProps {
  /** Subset of icon names to show. Defaults to all icons in metralyIconPaths. */
  icons?: MetralyIconName[];
  /** Icon size in px. Default 20. */
  iconSize?: number;
  className?: string;
}

const ALL_ICONS = Object.keys(metralyIconPaths) as MetralyIconName[];

export function AppIconLibrary({
  icons = ALL_ICONS,
  iconSize = 20,
  className,
}: AppIconLibraryProps): React.ReactElement {
  return (
    <div className={["metraly-app-icon-library", className].filter(Boolean).join(" ")}>
      {icons.map((name) => (
        <article
          key={name}
          className="metraly-app-icon-item"
          aria-label={`${name} icon`}
        >
          <div className="metraly-app-icon-item__glyph">
            <MetralyIcon name={name} size={iconSize} aria-hidden />
          </div>
          <span className="metraly-app-icon-item__name">{name}</span>
        </article>
      ))}
    </div>
  );
}

export default AppIconLibrary;

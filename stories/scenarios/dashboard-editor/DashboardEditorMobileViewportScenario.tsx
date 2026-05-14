import * as React from "react";
import { DashboardEditorResponsiveScenario } from "./DashboardEditorResponsiveScenario";

function MobileViewportLayoutFix() {
  return (
    <style>{`
      @media (max-width: 760px) {
        .de-shell,
        .de-shell * {
          box-sizing: border-box;
        }

        .de-shell {
          width: 100%;
          max-width: 100%;
          height: 100dvh;
          max-height: 100dvh;
          min-height: 0;
          overflow: clip;
        }

        .de-main {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          overflow: clip;
        }

        .de-topbar,
        .de-content,
        .de-dashboard-grid,
        .de-grid-cell,
        .de-grid-cell > * {
          max-width: 100%;
          min-width: 0;
        }

        .de-content {
          flex: 1 1 auto;
          min-height: 0;
          overflow: clip;
          scrollbar-gutter: auto;
        }

        .de-dashboard-grid {
          width: 100%;
          overflow: clip;
        }
      }
    `}</style>
  );
}

export function DashboardEditorMobileViewportScenario() {
  return (
    <>
      <MobileViewportLayoutFix />
      <DashboardEditorResponsiveScenario />
    </>
  );
}

export default DashboardEditorMobileViewportScenario;

import * as React from "react";
import { DashboardEditorResponsiveScenario } from "./DashboardEditorResponsiveScenario";

function MobileViewportScrollbarFix() {
  return (
    <style>{`
      @media (max-width: 760px) {
        .de-shell,
        .de-main,
        .de-content {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .de-shell::-webkit-scrollbar,
        .de-main::-webkit-scrollbar,
        .de-content::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        .de-content {
          overscroll-behavior: contain;
        }
      }
    `}</style>
  );
}

export function DashboardEditorMobileViewportScenario() {
  return (
    <>
      <MobileViewportScrollbarFix />
      <DashboardEditorResponsiveScenario />
    </>
  );
}

export default DashboardEditorMobileViewportScenario;

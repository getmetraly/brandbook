import * as React from "react";
import { DashboardEditorResponsiveScenario } from "./DashboardEditorResponsiveScenario";

function removeStandaloneResizeHandles(root: HTMLElement | null) {
  root?.querySelectorAll(".de-resize-row").forEach((node) => node.remove());
}

export function DashboardEditorStoryScenario() {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    removeStandaloneResizeHandles(rootRef.current);
  });

  return (
    <div ref={rootRef}>
      <DashboardEditorResponsiveScenario />
    </div>
  );
}

export default DashboardEditorStoryScenario;

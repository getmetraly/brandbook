import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("DashboardToolbar responsive rhythm", () => {
  it("places mobile actions on the same row as the sync badge", () => {
    const css = readFileSync(
      join(__dirname, "../../../packages/ui/src/styles/metraly-dashboard.css"),
      "utf8",
    );

    expect(css).toMatch(/@media \(max-width: 640px\) \{[\s\S]*\.metraly-dashboard-toolbar-controls \{[\s\S]*display:\s*contents/s);
    expect(css).toMatch(/\.metraly-dashboard-toolbar-actions \{[\s\S]*order:\s*2/s);
    expect(css).toMatch(/\.metraly-dashboard-toolbar-sync,\s*\n\s*\.metraly-dashboard-toolbar-sync\.metraly-state-badge \{[\s\S]*order:\s*3[\s\S]*margin-left:\s*auto/s);
  });
});

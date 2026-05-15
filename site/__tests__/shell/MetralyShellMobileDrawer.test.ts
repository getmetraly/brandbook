import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("MetralyShell mobile drawer contract", () => {
  it("keeps the sidebar off-canvas until opened on mobile", () => {
    const css = readFileSync(
      join(__dirname, "../../../packages/ui/src/styles/metraly-shell.css"),
      "utf8",
    );

    expect(css).toMatch(/\.metraly-shell--mobile-drawer > \.metraly-sidebar \{[\s\S]*position:\s*fixed[\s\S]*transform:\s*translateX\(-104%\)/s);
    expect(css).toMatch(/\.metraly-shell--mobile-drawer\.is-sidebar-open > \.metraly-sidebar \{[\s\S]*transform:\s*translateX\(0\)/s);
    expect(css).toMatch(/\.metraly-shell-mobile-trigger \{[\s\S]*display:\s*none/s);
  });
});

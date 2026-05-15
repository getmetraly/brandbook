import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Metraly shell visual rhythm", () => {
  it("gives topbar breadcrumb/title copy enough vertical breathing room", () => {
    const css = readFileSync(
      join(__dirname, "../../../packages/ui/src/styles/metraly-shell.css"),
      "utf8",
    );

    expect(css).toMatch(/\.metraly-topbar--comfortable\s*\{[^}]*min-height:\s*68px/s);
    expect(css).toMatch(/\.metraly-topbar--comfortable\s*\{[^}]*padding:\s*var\(--m-3\) var\(--m-6\)/s);
  });

  it("keeps wizard body sections separated after source card rows", () => {
    const css = readFileSync(
      join(__dirname, "../../../packages/ui/src/styles/metraly-wizard.css"),
      "utf8",
    );

    expect(css).toMatch(/\.metraly-wizard-layout-body\s*\{[^}]*display:\s*grid/s);
    expect(css).toMatch(/\.metraly-wizard-layout-body\s*\{[^}]*gap:\s*14px/s);
  });
});

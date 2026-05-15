import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MetralyTabs } from "@metraly/ui";

describe("MetralyTabs", () => {
  it("wires tab ids to tabpanel ids when idBase is provided", () => {
    render(
      <MetralyTabs
        ariaLabel="Metrics sections"
        idBase="metrics"
        items={[
          { value: "overview", label: "Overview" },
          { value: "signals", label: "Signals" },
        ]}
        defaultValue="overview"
      />,
    );

    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("id", "metrics-tab-overview");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-controls", "metrics-panel-overview");
  });

  it("draws only a centered active rail on the bottom divider", () => {
    const css = readFileSync(
      join(__dirname, "../../packages/ui/src/styles/metraly-forms.css"),
      "utf8",
    );

    expect(css).toMatch(/\.metraly-tabs\s*\{[^}]*border-top:\s*0/s);
    expect(css).not.toMatch(/\.metraly-tab\.is-active::before\s*\{/);
    expect(css).toMatch(/\.metraly-tab\.is-active::after\s*\{[^}]*bottom:\s*-2px[^}]*height:\s*3px/s);
  });

  it("supports arrow-key navigation", () => {
    render(
      <MetralyTabs
        ariaLabel="Metrics sections"
        items={[
          { value: "overview", label: "Overview" },
          { value: "signals", label: "Signals" },
          { value: "history", label: "History" },
        ]}
        defaultValue="overview"
      />,
    );

    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    fireEvent.keyDown(overview, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Signals" })).toHaveAttribute("aria-selected", "true");
  });
});

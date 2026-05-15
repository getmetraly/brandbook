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

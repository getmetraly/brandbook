import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TrendBadge } from "@metraly/ui";

describe("TrendBadge", () => {
  it("renders trend value", () => {
    render(<TrendBadge direction="up" sentiment="positive" value="18%" />);
    expect(screen.getByText("18%")).toBeInTheDocument();
  });

  it("applies semantic classes", () => {
    const { container } = render(<TrendBadge direction="down" sentiment="negative" value="4%" />);
    expect(container.querySelector(".metraly-trend-badge.is-down.is-negative")).toBeInTheDocument();
  });

  it("keeps badges content-sized in canonical matrices", () => {
    const css = readFileSync(
      join(__dirname, "../../packages/ui/src/styles/metraly-trend-badge.css"),
      "utf8",
    );

    expect(css).toMatch(/\.metraly-trend-badge\s*\{[^}]*width:\s*fit-content/s);
    expect(css).toMatch(/\.metraly-trend-badge\s*\{[^}]*flex:\s*0 0 auto/s);
  });
});

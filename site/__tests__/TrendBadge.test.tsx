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
});

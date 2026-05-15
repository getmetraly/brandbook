import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PulseMarker } from "@metraly/ui";

describe("PulseMarker", () => {
  it("renders a pulsing dot marker by default", () => {
    const { container } = render(<PulseMarker ariaLabel="Live marker" />);
    const marker = screen.getByRole("status", { name: "Live marker" });
    expect(marker).toHaveAttribute("data-variant", "dot");
    expect(marker).toHaveAttribute("data-pulse", "on");
    expect(container.querySelector(".metraly-pulse-marker.is-pulsing")).toBeInTheDocument();
  });

  it("renders a static wave marker when pulse is disabled", () => {
    const { container } = render(<PulseMarker variant="wave" tone="warning" pulse={false} />);
    const marker = container.querySelector(".metraly-pulse-marker");
    expect(marker).toHaveAttribute("data-variant", "wave");
    expect(marker).toHaveAttribute("data-tone", "warning");
    expect(marker).toHaveAttribute("data-pulse", "off");
    expect(marker).toHaveClass("is-static");
  });
});

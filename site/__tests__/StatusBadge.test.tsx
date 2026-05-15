import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatusBadge } from "@metraly/ui";

describe("StatusBadge", () => {
  it.each([
    "Live",
    "Preview",
    "Designed",
    "Planned",
    "In progress",
    "Gated",
    "Policy defined",
    "Benchmark pending",
    "Coming soon",
    "Error",
    "Delayed",
    "No data",
  ] as const)("renders canonical status %s", (status) => {
    render(<StatusBadge status={status} />);
    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it("uses status label for accessibility by default", () => {
    render(<StatusBadge status="Policy defined" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Policy defined");
  });

  it("maps delayed and error states to the existing semantic state badge classes", () => {
    const { container, rerender } = render(<StatusBadge status="Delayed" />);
    expect(container.querySelector(".metraly-state-badge.is-delayed")).toBeInTheDocument();

    rerender(<StatusBadge status="Error" />);
    expect(container.querySelector(".metraly-state-badge.is-error")).toBeInTheDocument();
  });

  it("defaults pulse off for frozen product-status taxonomy", () => {
    const { container } = render(<StatusBadge status="Live" />);
    const badge = container.querySelector(".metraly-state-badge");
    expect(badge).toHaveAttribute("data-pulse", "off");
  });
});

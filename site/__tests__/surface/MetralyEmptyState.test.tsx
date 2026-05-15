import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MetralyEmptyState } from "@metraly/ui";

describe("MetralyEmptyState", () => {
  it("renders title and description", () => {
    render(<MetralyEmptyState title="No data" description="Connect a source" />);
    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.getByText("Connect a source")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(<MetralyEmptyState title="Review required" variant="gated" />);
    expect(container.querySelector(".metraly-empty-state.is-gated")).toBeInTheDocument();
  });
});

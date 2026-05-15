import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MetralyFilterBar } from "@metraly/ui";

describe("MetralyFilterBar", () => {
  it("renders filter items", () => {
    render(<MetralyFilterBar filters={[{ id: "range", label: "Range", control: <span>Last 14d</span> }]} />);
    expect(screen.getByText("Range")).toBeInTheDocument();
    expect(screen.getByText("Last 14d")).toBeInTheDocument();
  });

  it("fires reset action", () => {
    const onReset = jest.fn();
    render(<MetralyFilterBar filters={[]} onReset={onReset} />);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});

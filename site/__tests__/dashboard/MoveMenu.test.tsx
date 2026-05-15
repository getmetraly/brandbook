import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MoveMenu } from "@metraly/ui";

describe("MoveMenu", () => {
  it("calls onMove for enabled directions", () => {
    const onMove = jest.fn();
    render(<MoveMenu onMove={onMove} onCancel={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "Move right" }));
    expect(onMove).toHaveBeenCalledWith("right");
  });

  it("disables blocked directions", () => {
    render(<MoveMenu onMove={() => undefined} onCancel={() => undefined} disabledDirections={["up", "left"]} />);
    expect(screen.getByRole("button", { name: "Move up" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Move left" })).toBeDisabled();
  });
});

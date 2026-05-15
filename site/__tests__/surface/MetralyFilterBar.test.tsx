import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MetralyFilterBar } from "@metraly/ui";

describe("MetralyFilterBar", () => {
  it("renders filter items", () => {
    render(<MetralyFilterBar filters={[{ id: "range", label: "Range", control: <span>Last 14d</span> }]} />);
    expect(screen.getByText("Range")).toBeInTheDocument();
    expect(screen.getByText("Last 14d")).toBeInTheDocument();
  });

  it("keeps filter chips and trailing actions on the same visual rhythm", () => {
    const css = readFileSync(
      join(__dirname, "../../../packages/ui/src/styles/metraly-filter-bar.css"),
      "utf8",
    );

    expect(css).toMatch(/\.metraly-filter-bar__item\s*\{[^}]*min-height:\s*30px/s);
    expect(css).toMatch(/\.metraly-filter-bar__reset\s*\{[^}]*height:\s*26px/s);
    expect(css).toMatch(/\.metraly-filter-bar__actions\s*\{[^}]*align-self:\s*center/s);
    expect(css).toMatch(/\.metraly-filter-bar__item\s*\{[^}]*align-items:\s*center/s);
    expect(css).toMatch(/\.metraly-filter-bar__label\s*\{[^}]*line-height:\s*1\.2/s);
    expect(css).toMatch(/\.metraly-filter-bar__control\s*\{[^}]*align-items:\s*center[\s\S]*transform:\s*none/s);
    expect(css).toMatch(/\.metraly-filter-bar__control > :where\(span, strong, em\)\s*\{[^}]*align-items:\s*center/s);
  });

  it("centers the mobile filter bar content instead of pinning actions to the right", () => {
    const css = readFileSync(
      join(__dirname, "../../../packages/ui/src/styles/metraly-filter-bar.css"),
      "utf8",
    );

    expect(css).toMatch(/@media \(max-width:\s*767px\)\s*\{[\s\S]*\.metraly-filter-bar\s*\{[^}]*justify-content:\s*center/s);
    expect(css).toMatch(/@media \(max-width:\s*767px\)\s*\{[\s\S]*\.metraly-filter-bar__items\s*\{[^}]*justify-content:\s*center/s);
    expect(css).toMatch(/@media \(max-width:\s*767px\)\s*\{[\s\S]*\.metraly-filter-bar__actions\s*\{[^}]*justify-content:\s*center/s);
  });

  it("fires reset action", () => {
    const onReset = jest.fn();
    render(<MetralyFilterBar filters={[]} onReset={onReset} />);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});

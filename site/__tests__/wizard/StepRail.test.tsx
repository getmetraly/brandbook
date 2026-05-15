import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StepRail } from "@metraly/ui";
import type { StepRailStep } from "@metraly/ui";

const steps: StepRailStep[] = [
  { id: "source", label: "Select source", status: "done" },
  { id: "preview", label: "Preview connection", status: "current" },
  { id: "configure", label: "Configure", status: "next" },
  { id: "review", label: "Review", status: "next" },
];

describe("StepRail", () => {
  describe("horizontal orientation (default)", () => {
    it("renders a nav landmark with accessible label", () => {
      render(<StepRail steps={steps} />);
      expect(screen.getByRole("navigation", { name: "Wizard progress" })).toBeInTheDocument();
    });

    it("accepts a custom aria-label", () => {
      render(<StepRail steps={steps} ariaLabel="Onboarding steps" />);
      expect(screen.getByRole("navigation", { name: "Onboarding steps" })).toBeInTheDocument();
    });

    it("renders each step label", () => {
      render(<StepRail steps={steps} />);
      expect(screen.getByText("Select source")).toBeInTheDocument();
      expect(screen.getByText("Preview connection")).toBeInTheDocument();
      expect(screen.getByText("Configure")).toBeInTheDocument();
      expect(screen.getByText("Review")).toBeInTheDocument();
    });

    it("marks the current step with aria-current=step", () => {
      render(<StepRail steps={steps} />);
      const currentItem = document.querySelector("[data-step-status='current']");
      expect(currentItem).toHaveAttribute("aria-current", "step");
    });

    it("does not mark done or next steps as aria-current", () => {
      render(<StepRail steps={steps} />);
      const doneItem = document.querySelector("[data-step-status='done']");
      const nextItems = document.querySelectorAll("[data-step-status='next']");
      expect(doneItem).not.toHaveAttribute("aria-current");
      nextItems.forEach((el) => expect(el).not.toHaveAttribute("aria-current"));
    });

    it("renders glyphs with correct data-step-status", () => {
      render(<StepRail steps={steps} />);
      // The glyph span is aria-hidden, so we query by data attribute directly
      const glyphs = document.querySelectorAll(".metraly-wizard-step-glyph");
      expect(glyphs).toHaveLength(4);
      expect(glyphs[0]).toHaveAttribute("data-step-status", "done");
      expect(glyphs[1]).toHaveAttribute("data-step-status", "current");
    });
  });

  describe("vertical orientation", () => {
    it("renders with navigation role", () => {
      render(<StepRail steps={steps} orientation="vertical" />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders step labels in vertical mode", () => {
      render(<StepRail steps={steps} orientation="vertical" />);
      expect(screen.getByText("Select source")).toBeInTheDocument();
      expect(screen.getByText("Preview connection")).toBeInTheDocument();
    });

    it("renders step detail when provided", () => {
      const stepsWithDetail: StepRailStep[] = [
        { id: "a", label: "Step A", status: "done", detail: "GitHub" },
        { id: "b", label: "Step B", status: "current", detail: "verifying" },
      ];
      render(<StepRail steps={stepsWithDetail} orientation="vertical" />);
      expect(screen.getByText(/GitHub/)).toBeInTheDocument();
      expect(screen.getByText(/verifying/)).toBeInTheDocument();
    });

    it("renders footnote when provided", () => {
      render(
        <StepRail
          steps={steps}
          orientation="vertical"
          footnote={<span data-testid="note">layout primitive</span>}
        />
      );
      expect(screen.getByTestId("note")).toBeInTheDocument();
    });

    it("marks the current step with aria-current=step", () => {
      render(<StepRail steps={steps} orientation="vertical" />);
      const currentItem = document.querySelector(
        ".metraly-step-rail--vertical [data-step-status='current']"
      );
      expect(currentItem).toHaveAttribute("aria-current", "step");
    });
  });

  describe("warning step", () => {
    it("renders warning step with correct data-step-status", () => {
      const warningSteps: StepRailStep[] = [
        { id: "a", label: "Done", status: "done" },
        { id: "b", label: "Needs review", status: "warning" },
        { id: "c", label: "Next", status: "next" },
      ];
      render(<StepRail steps={warningSteps} />);
      const warningGlyph = document.querySelector("[data-step-status='warning']");
      expect(warningGlyph).toBeInTheDocument();
    });
  });
});

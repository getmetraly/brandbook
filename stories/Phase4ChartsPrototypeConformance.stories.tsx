import type { Meta, StoryObj } from "@storybook/react";
import ChartsPrototypeConformancePage from "../site/app/components/charts/prototype-conformance/page";

const meta: Meta<typeof ChartsPrototypeConformancePage> = {
  title: "Prototype Conformance/Phase 4 Charts",
  component: ChartsPrototypeConformancePage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Phase 4 prototype conformance examples for chart cards, sparkline states, chart wrappers, fallback states and engineering dashboard chart scenarios.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChartsPrototypeConformancePage>;

export const ChartFamilyMatrix: Story = {};

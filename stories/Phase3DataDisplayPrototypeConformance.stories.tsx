import type { Meta, StoryObj } from "@storybook/react";
import DataDisplayPrototypeConformancePage from "../site/app/components/data-display/prototype-conformance/page";

const meta: Meta<typeof DataDisplayPrototypeConformancePage> = {
  title: "Prototype Conformance/Phase 3 Data Display",
  component: DataDisplayPrototypeConformancePage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Phase 3 prototype conformance examples for MetralyTable row markers, sticky/dense contracts and board-edit composition states.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataDisplayPrototypeConformancePage>;

export const TablesAndBoardEditComposition: Story = {};

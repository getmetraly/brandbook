import type { Meta, StoryObj } from "@storybook/react";
import DashboardPrototypeConformancePage from "../site/app/components/dashboard/prototype-conformance/page";

const meta: Meta<typeof DashboardPrototypeConformancePage> = {
  title: "Prototype Conformance/Phase 2 Dashboard",
  component: DashboardPrototypeConformancePage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Phase 2 prototype conformance examples for dashboard primitives: WidgetPickerCard states, DashboardWidget header grip, resize handles, DropZone states and two-row Toolbar layout.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DashboardPrototypeConformancePage>;

export const DashboardPrimitivesAndBoardEditStates: Story = {};

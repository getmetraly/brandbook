import type { Meta, StoryObj } from "@storybook/react";
import { DashboardEditorResponsiveScenario as DashboardEditorScenario } from "./scenarios/dashboard-editor/DashboardEditorResponsiveScenario";

const meta: Meta<typeof DashboardEditorScenario> = {
  title: "Scenarios/Dashboard Editor",
  component: DashboardEditorScenario,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DashboardEditorScenario>;

export const Default: Story = {};

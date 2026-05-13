import type { Meta, StoryObj } from "@storybook/react";
import { DashboardEditorScenario } from "./scenarios/dashboard-editor/DashboardEditorScenario";

const meta: Meta<typeof DashboardEditorScenario> = {
  title: "Scenarios/Dashboard Editor",
  component: DashboardEditorScenario,
};

export default meta;
type Story = StoryObj<typeof DashboardEditorScenario>;

export const Default: Story = {};

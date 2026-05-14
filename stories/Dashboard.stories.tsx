import type { Meta, StoryObj } from "@storybook/react";
import { DashboardEditorMobileViewportScenario as DashboardEditorScenario } from "./scenarios/dashboard-editor/DashboardEditorMobileViewportScenario";

const meta: Meta<typeof DashboardEditorScenario> = {
  title: "Scenarios/Dashboard Editor",
  component: DashboardEditorScenario,
};

export default meta;
type Story = StoryObj<typeof DashboardEditorScenario>;

export const Default: Story = {};

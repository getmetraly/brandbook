import type { Meta, StoryObj } from '@storybook/react';
import TelemetryCommandPalette from '../site/app/components/previews/TelemetryCommandPalette';
import TelemetryDrawer from '../site/app/components/previews/TelemetryDrawer';
import TelemetryDragOverlay from '../site/app/components/previews/TelemetryDragOverlay';
import TelemetryModal from '../site/app/components/previews/TelemetryModal';
import TelemetryPopover from '../site/app/components/previews/TelemetryPopover';
import TelemetryTooltip from '../site/app/components/previews/TelemetryTooltip';

function OverlayPrimitivesShowcase() {
  return (
    <div style={{ display: 'grid', gap: 20, maxWidth: 720 }}>
      <TelemetryCommandPalette />
      <TelemetryDrawer />
      <TelemetryModal />
      <TelemetryPopover />
      <TelemetryTooltip />
      <TelemetryDragOverlay />
    </div>
  );
}

const meta: Meta<typeof OverlayPrimitivesShowcase> = {
  title: 'Metraly/Overlay Primitives',
  component: OverlayPrimitivesShowcase,
};

export default meta;
type Story = StoryObj<typeof OverlayPrimitivesShowcase>;

export const Default: Story = {};

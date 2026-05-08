import '@testing-library/jest-dom';
import { useTelemetryBoardStore } from '../../app/components/previews/TelemetryBoardStore';

describe('useTelemetryBoardStore', () => {
  it('exposes a selected widget and allows switching it', () => {
    const initialState = useTelemetryBoardStore.getState();

    expect(initialState.widgets).toHaveLength(2);
    expect(initialState.selectedWidgetId).toBe('flow-efficiency');

    initialState.selectWidget('review-latency');

    const nextState = useTelemetryBoardStore.getState();
    expect(nextState.selectedWidgetId).toBe('review-latency');
    expect(nextState.widgets[0]?.title).toBe('Flow efficiency');
  });
});

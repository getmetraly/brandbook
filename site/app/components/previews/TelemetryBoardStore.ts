import { create } from "zustand";

export type Widget = {
  id: string;
  title: string;
  size: "sm" | "md" | "lg";
  state: "live" | "delayed" | "disconnected";
};

type BoardState = {
  widgets: Widget[];
  selectedWidgetId?: string;
  selectWidget: (id: string) => void;
};

export const useTelemetryBoardStore = create<BoardState>((set) => ({
  widgets: [
    {
      id: "flow-efficiency",
      title: "Flow efficiency",
      size: "lg",
      state: "live",
    },
    {
      id: "review-latency",
      title: "Review latency",
      size: "md",
      state: "delayed",
    },
  ],
  selectedWidgetId: "flow-efficiency",
  selectWidget: (id) => set({ selectedWidgetId: id }),
}));

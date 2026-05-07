import { create } from "zustand";

export type DraftWidget = {
  id: string;
  title: string;
  size: "sm" | "md" | "lg";
  state: "live" | "delayed" | "disconnected";
};

type DraftBoardState = {
  widgets: DraftWidget[];
  selectedWidgetId?: string;
  selectWidget: (id: string) => void;
};

export const useTelemetryBoardStoreDraft = create<DraftBoardState>((set) => ({
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

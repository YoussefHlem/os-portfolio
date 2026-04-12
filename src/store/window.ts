import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  INITIAL_Z_INDEX,
  WINDOW_CONFIG,
  type LocationNode,
  type WindowKey,
} from "@/constants";

export type WindowData = LocationNode | null;

export type WindowConfig = {
  isOpen: boolean;
  zIndex: number;
  data: WindowData;
};

type WindowStore = {
  windows: Record<WindowKey, WindowConfig>;
  nextZIndex: number;
  openWindow: (windowKey: WindowKey, data?: WindowData) => void;
  closeWindow: (windowKey: WindowKey) => void;
  focusWindow: (windowKey: WindowKey) => void;
};

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;

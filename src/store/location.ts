import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { locations, type LocationNode } from "@/constants";

export type Location = LocationNode;

type LocationStore = {
  activeLocation: Location;
  breadcrumb: Location[];
  setActiveLocation: (location: Location) => void;
  pushLocation: (location: Location) => void;
  goBackLocation: () => void;
  resetActiveLocation: () => void;
};

const DEFAULT_LOCATION: Location = locations.work;

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    breadcrumb: [],
    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
        state.breadcrumb = [];
      }),
    pushLocation: (location) =>
      set((state) => {
        state.breadcrumb.push(state.activeLocation);
        state.activeLocation = location;
      }),
    goBackLocation: () =>
      set((state) => {
        const prev = state.breadcrumb.pop();
        if (prev) state.activeLocation = prev;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
        state.breadcrumb = [];
      }),
  })),
);

export default useLocationStore;

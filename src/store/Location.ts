import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { locations } from "@/constants";

type Location = (typeof locations)[keyof typeof locations];

type LocationStore = {
  activeLocation: Location;
  setActiveLocation: (location: Location) => void;
  resetActiveLocation: () => void;
};

const DEFAULT_LOCATION: Location = locations.work;

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;
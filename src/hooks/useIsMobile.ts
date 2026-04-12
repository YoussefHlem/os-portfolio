"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 639px)";

const subscribe = (onChange: () => void): (() => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getSnapshot = (): boolean => window.matchMedia(QUERY).matches;

const getServerSnapshot = (): boolean => false;

const useIsMobile = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useIsMobile;

"use client";

import useWindowStore from "@/store/window";
import { type WindowKey } from "@/constants";
import {
  type ComponentType,
  type FC,
  useLayoutEffect,
  useRef,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowKey,
): FC<P> => {
  const Wrapped: FC<P> = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const win = windows[windowKey];
    const ref = useRef<HTMLElement | null>(null);

    const isOpen = win?.isOpen ?? false;
    const zIndex = win?.zIndex ?? 0;

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const trigger = el.querySelector<HTMLElement>("#window-header");
      if (!trigger) return;

      const instance = Draggable.create(el, {
        trigger,
        onPress: () => focusWindow(windowKey),
      })[0];
      if (!instance) return;

      return () => instance.kill();
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    if (!isOpen) {
      return null;
    }

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;

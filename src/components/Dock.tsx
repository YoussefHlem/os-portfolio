"use client";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useMemo, useRef } from "react";
import { dockApps, type DockApp } from "@/constants";
import useWindowStore from "@/store/window";
import useIsMobile from "@/hooks/useIsMobile";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const apps = useMemo(
    () => (isMobile ? dockApps.filter((a) => a.id !== "trash") : dockApps),
    [isMobile],
  );

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon");

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" }),
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const hasOpenWindow = isMobile && Object.values(windows).some((w) => w.isOpen);

  const toggleApp = (app: DockApp) => {
    if (!app.canOpen) return;
    const win = windows[app.id];
    if (!win) return;

    if (win.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  if (hasOpenWindow) return null;

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {apps.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app)}
            >
              <img
                src={`images/${app.icon}`}
                alt={app.name}
                loading="lazy"
                className={app.canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id={"dock-tooltip"} place="top" className={"tooltip"} />
      </div>
    </section>
  );
};

export default Dock;

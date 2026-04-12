import React from "react";
import { locations, type LocationNode, type WindowKey } from "@/constants";
import useWindowStore from "@/store/window";
import clsx from "clsx";
import useLocationStore from "@/store/location";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import useIsMobile from "@/hooks/useIsMobile";

const projects: readonly LocationNode[] = locations.work?.children ?? [];

const mobileShortcuts: { id: WindowKey; name: string; icon: string }[] = [
  { id: "resume", name: "Resume", icon: "/images/pdf.png" },
  { id: "terminal", name: "Skills", icon: "/images/terminal.png" },
];

const Home: React.FC = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const isMobile = useIsMobile();

  const handleOpenProjectFinder = (project: LocationNode): void => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    if (isMobile) return;
    Draggable.create(".folder");
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="home-mobile">
        <ul>
          {mobileShortcuts.map((app) => (
            <li key={app.id} onClick={() => openWindow(app.id)}>
              <img src={app.icon} alt={app.name} />
              <p>{app.name}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id={"home"}>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => handleOpenProjectFinder(project)}
            className={clsx(
              "group folder",
              project.kind === "folder" && project.windowPosition,
            )}
          >
            <img src={"/images/folder.png"} alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;

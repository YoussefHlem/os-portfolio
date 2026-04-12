import React from "react";
import { locations, type LocationNode } from "@/constants";
import useWindowStore from "@/store/window";
import clsx from "clsx";
import useLocationStore from "@/store/location";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";

const projects: readonly LocationNode[] = locations.work?.children ?? [];

const Home: React.FC = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project: LocationNode): void => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

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

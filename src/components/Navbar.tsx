import React from "react";
import { type WindowKey, locations, navIcons, navLinks } from "@/constants";
import dayjs from "dayjs";
import useWindowStore from "@/store/window";
import useLocationStore from "@/store/location";
import { Battery, Wifi } from "lucide-react";

const NAV_LOCATION_MAP: Record<string, keyof typeof locations | undefined> = {
  Experience: "work",
  Projects: "projects",
};

const Navbar = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const hasOpenWindow = Object.values(windows).some((w) => w.isOpen);

  const toggleWindow = (key: WindowKey, name: string) => {
    const locationKey = NAV_LOCATION_MAP[name];
    if (windows[key]?.isOpen && !locationKey) {
      closeWindow(key);
    } else {
      if (locationKey) setActiveLocation(locations[locationKey]);
      openWindow(key);
    }
  };
  return (
    <>
      <nav className={"max-sm:hidden"}>
        <div>
          <img src={"/images/logo.svg"} alt="logo" />
          <p className={"font-bold"}>Youssef's Portfolio</p>

          <ul>
            {navLinks.map((item) =>
              "href" in item ? (
                <li key={item.id}>
                  <p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </p>
                </li>
              ) : (
                <li
                  key={item.id}
                  onClick={() => toggleWindow(item.type, item.name)}
                >
                  <p>{item.name}</p>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <ul>
            {navIcons.map((item) => (
              <li key={item.id}>
                <img
                  src={item.img}
                  className={"icon-hover"}
                  alt={`icon-${item.id}`}
                />
              </li>
            ))}
          </ul>

          <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
      </nav>

      <section
        id="mobile-navbar"
        className={`sm:hidden${hasOpenWindow ? " has-window" : ""}`}
      >
        <time>{dayjs().format("h:mm A")}</time>
        <div className="notch" />
        <ul>
          <li>
            <Wifi className={"icon w-6"} />
          </li>
          <li>
            <Battery className={"icon w-6"} />
          </li>
        </ul>
      </section>
    </>
  );
};

export default Navbar;

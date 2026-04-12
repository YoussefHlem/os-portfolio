import React from "react";
import { navIcons, navLinks } from "@/constants";
import dayjs from "dayjs";
import useWindowStore from "@/store/window";
import { Battery, Wifi } from "lucide-react";

const Navbar = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();

  const hasOpenWindow = Object.values(windows).some((w) => w.isOpen);

  const toggleWindow = (key: (typeof navLinks)[number]["type"]) => {
    if (windows[key]?.isOpen) {
      closeWindow(key);
    } else {
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
            {navLinks.map((item) => (
              <li key={item.id} onClick={() => toggleWindow(item.type)}>
                <p>{item.name}</p>
              </li>
            ))}
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

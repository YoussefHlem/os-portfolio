import WindowWrapper from "@/hoc/WindowWrapper";
import WindowControls from "@/components/WindowControls";
import { Search } from "lucide-react";
import {
  locations,
  type FileType,
  type LocationNode,
  type WindowKey,
} from "@/constants";
import useLocationStore from "@/store/location";
import clsx from "clsx";
import useWindowStore from "@/store/window";

// Maps a file's fileType to the window key that should open it.
// `null` means the file is opened externally (via window.open) rather
// than in an in-app window.
const FILE_WINDOW: Record<FileType, WindowKey | null> = {
  txt: "txtfile",
  img: "imgfile",
  pdf: "resume",
  url: null,
  fig: null,
};

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item: LocationNode) => {
    if (item.kind === "folder") {
      setActiveLocation(item);
      return;
    }

    if ((item.fileType === "url" || item.fileType === "fig") && item.href) {
      window.open(item.href, "_blank");
      return;
    }

    const target = FILE_WINDOW[item.fileType];
    if (target) openWindow(target, item);
  };

  const renderList = (title: string, items: readonly LocationNode[]) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActiveLocation(item);
            }}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className={"w-4"} alt={item.name} />
            <p className={"text-sm font-medium truncate"}>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"finder"} />
        <Search className={"icon"} />
      </div>

      <div className={"bg-white flex h-full"}>
        <div className={"sidebar"}>
          {renderList("Favorites", Object.values(locations))}
          {renderList("Work", locations.work.children)}
        </div>
        <ul className={"content"}>
          {activeLocation.kind === "folder" &&
            activeLocation.children.map((item) => (
              <li
                key={item.id}
                className={item.position}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;

import { useEffect, useMemo, useState } from "react";
import WindowWrapper, { useMobileWindow } from "@/hoc/WindowWrapper";
import WindowControls from "@/components/WindowControls";
import { Search } from "lucide-react";
import {
  locations,
  portfolioRoot,
  type FileType,
  type LocationNode,
  type WindowKey,
} from "@/constants";
import useLocationStore from "@/store/location";
import clsx from "clsx";
import useWindowStore from "@/store/window";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

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
  const ctx = useMobileWindow();
  const isMobile = ctx?.isMobile ?? false;

  const { openWindow } = useWindowStore();
  const {
    activeLocation,
    breadcrumb,
    setActiveLocation,
    pushLocation,
    goBackLocation,
  } = useLocationStore();

  const [viewingFile, setViewingFile] = useState<LocationNode | null>(null);

  const mobileRoot = useMemo(() => portfolioRoot, []);
  const isAtRoot =
    isMobile && activeLocation.id === mobileRoot.id && breadcrumb.length === 0;

  useEffect(() => {
    if (!isMobile) return;
    setActiveLocation(mobileRoot);
  }, [isMobile, mobileRoot, setActiveLocation]);

  useEffect(() => {
    if (!ctx || !isMobile) return;

    const title = viewingFile ? viewingFile.name : activeLocation.name;
    ctx.setTitle(title);

    ctx.setOnBack(() => {
      if (viewingFile) {
        setViewingFile(null);
        return true;
      }
      if (breadcrumb.length > 0) {
        goBackLocation();
        return true;
      }
      return false;
    });

    return () => {
      ctx.setOnBack(undefined);
      ctx.setTitle(undefined);
    };
  }, [
    ctx,
    isMobile,
    viewingFile,
    activeLocation,
    breadcrumb.length,
    goBackLocation,
  ]);

  const openItem = (item: LocationNode) => {
    if (item.kind === "folder") {
      if (isMobile) {
        pushLocation(item);
      } else {
        setActiveLocation(item);
      }
      return;
    }

    if ((item.fileType === "url" || item.fileType === "fig") && item.href) {
      window.open(item.href, "_blank");
      return;
    }

    if (isMobile) {
      // Open in-place inside the Finder window on mobile.
      setViewingFile(item);
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

  if (isMobile) {
    return (
      <div className={"finder-mobile"}>
        {!isAtRoot && !viewingFile && (
          <div className={"finder-breadcrumb"}>
            {breadcrumb.map((node, i) => (
              <span key={`${node.id}-${i}`} className={"crumb"}>
                {node.name} <span className={"sep"}>/</span>
              </span>
            ))}
            <span className={"crumb current"}>{activeLocation.name}</span>
          </div>
        )}

        {viewingFile ? (
          <FileViewer file={viewingFile} />
        ) : (
          <ul className={"finder-mobile-grid"}>
            {activeLocation.kind === "folder" &&
              activeLocation.children.map((item) => (
                <li key={item.id} onClick={() => openItem(item)}>
                  <img src={item.icon} alt={item.name} />
                  <p>{item.name}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }

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

type FileViewerProps = { file: LocationNode };

const FileViewer = ({ file }: FileViewerProps) => {
  if (file.kind !== "file") return null;

  if (file.fileType === "img" && file.imageUrl) {
    return (
      <div className={"file-viewer image"}>
        <img src={file.imageUrl} alt={file.name} />
      </div>
    );
  }

  if (file.fileType === "txt") {
    return (
      <div className={"file-viewer text"}>
        {file.image && <img src={file.image} alt={file.name} />}
        {file.subtitle && <h3>{file.subtitle}</h3>}
        {file.description?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  if (file.fileType === "pdf") {
    return (
      <div className={"file-viewer pdf"}>
        <Document file={"files/resume.pdf"}>
          <Page pageNumber={1} width={320} renderTextLayer={false} />
        </Document>
      </div>
    );
  }

  return null;
};

const FinderWindow = WindowWrapper(Finder, "finder", { title: "Portfolio" });

export default FinderWindow;

"use client";

import useWindowStore from "@/store/window";
import { type WindowKey } from "@/constants";
import {
  createContext,
  type ComponentType,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { ChevronLeft } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";

type TitleValue = string | (() => string);
type BackHandler = () => boolean;

type WindowWrapperOptions = {
  title?: TitleValue;
};

type MobileWindowCtx = {
  isMobile: boolean;
  setTitle: (value: TitleValue | undefined) => void;
  setOnBack: (handler: BackHandler | undefined) => void;
};

const MobileWindowContext = createContext<MobileWindowCtx | null>(null);

export const useMobileWindow = () => useContext(MobileWindowContext);

const resolveTitle = (value: TitleValue | undefined): string => {
  if (!value) return "";
  return typeof value === "function" ? value() : value;
};

const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowKey,
  options: WindowWrapperOptions = {},
): FC<P> => {
  const initialTitle = resolveTitle(options.title);

  const Wrapped: FC<P> = (props) => {
    const { focusWindow, closeWindow, windows } = useWindowStore();
    const win = windows[windowKey];
    const ref = useRef<HTMLElement | null>(null);
    const isMobile = useIsMobile();

    const [title, setTitleState] = useState<string>(initialTitle);
    const backRef = useRef<BackHandler | undefined>(undefined);

    const isOpen = win?.isOpen ?? false;
    const zIndex = win?.zIndex ?? 0;

    useGSAP(() => {
      if (isMobile) return;
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      );
    }, [isOpen, isMobile]);

    useGSAP(() => {
      if (isMobile) return;
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
    }, [isOpen, isMobile]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    const handleBack = useCallback(() => {
      if (backRef.current && backRef.current()) return;
      closeWindow(windowKey);
    }, [closeWindow]);

    const setTitle = useCallback((value: TitleValue | undefined) => {
      setTitleState(value === undefined ? initialTitle : resolveTitle(value));
    }, []);

    const setOnBack = useCallback((handler: BackHandler | undefined) => {
      backRef.current = handler;
    }, []);

    const ctx: MobileWindowCtx = { isMobile, setTitle, setOnBack };

    if (!isOpen) return null;

    if (isMobile) {
      return (
        <section
          id={windowKey}
          ref={ref}
          className="mobile-window"
          style={{ zIndex }}
        >
          <MobileWindowContext.Provider value={ctx}>
            <MobileChrome title={title} onBack={handleBack}>
              <Component {...props} />
            </MobileChrome>
          </MobileWindowContext.Provider>
        </section>
      );
    }

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <MobileWindowContext.Provider value={ctx}>
          <Component {...props} />
        </MobileWindowContext.Provider>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

type MobileChromeProps = {
  title: string;
  onBack: () => void;
  children: ReactNode;
};

const MobileChrome: FC<MobileChromeProps> = ({ title, onBack, children }) => {
  return (
    <div className="mobile-window-inner">
      <header className="mobile-window-header">
        <button type="button" className="mobile-back" onClick={onBack}>
          <ChevronLeft className="size-5" />
          <span>Go back</span>
        </button>
        <h2 className="mobile-title">{title}</h2>
        <span className="mobile-header-spacer" aria-hidden />
      </header>
      <div className="mobile-window-body">{children}</div>
    </div>
  );
};

export default WindowWrapper;

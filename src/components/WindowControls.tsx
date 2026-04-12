import useWindowStore from "@/store/window";
import { type WindowKey } from "@/constants";

type WindowControlsProps = {
  target: WindowKey;
};

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id={"window-controls"}>
      <div className={"close"} onClick={() => closeWindow(target)}></div>
      <div className={"minimize"}></div>
      <div className={"maximize"}></div>
    </div>
  );
};

export default WindowControls;
